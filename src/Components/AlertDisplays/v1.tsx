import { useEffect, useState } from "react";
import { Stack, Grid, Tooltip, Title, Paper, Button, Group, Text, Table, NativeSelect, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { FaEdit, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { SHA256 } from "crypto-js";

import { severityString, severityColor, type Alert, type V1Json, type JsonECpart, type JsonECfull } from "../types/v1";


export type AlertEval = -1 | 0 | 1;

export function alertEvalString(e: AlertEval) {
  switch (e) {
    case -1:
      return 'Not evaluated';
    case 0:
      return 'False positive';
    case 1:
      return 'True positive';
    default:
      return 'Undefined';
  }
}

export function alertEvalColor(e: AlertEval) {
  switch (e) {
    case -1:
      return 'inherit';
    case 0:
      return 'red';
    case 1:
      return 'green';
    default:
      return 'inherit';
  }
}


interface GetFuncRet {
  /**
   * Id of the alert
   */
  id: Alert['id'];

  /**
   * Evaluation of the alert
   */
  ev: AlertEval;

  /**
   * Analysts comment
   */
  com: string;
};

const evals: AlertEval[] = [-1, 0, 1];

export function SingleAlert( { alertData, seval, setEval, ta, setTa } : {alertData: Alert, seval: AlertEval, setEval: (e: AlertEval)=>void, ta: string, setTa: (s: string)=>void} ) {
  const { id, timestamp, severity, briefdesc, description, fields } = alertData;
  
  const [detailsDisc, detailsDiscController] = useDisclosure(false);
  const [editDisc, editDiscController] = useDisclosure(false);
  


  return (
    <Paper bg={"dark.6"} bd={`solid 1px ${severityColor(severity)}`} key={id}>
      <Grid align="center" ta="center" p={15}>
        <Grid.Col span={1}>{id}</Grid.Col>
        <Grid.Col span={2}>{new Date(timestamp).toLocaleString()}</Grid.Col>
        <Grid.Col span={1} ta={'left'}>{severityString(severity)}</Grid.Col>
        <Grid.Col span={4} ta={'left'}>{briefdesc}</Grid.Col>
        <Grid.Col span={2} c={alertEvalColor(seval)}>{alertEvalString(seval)}</Grid.Col>
        <Grid.Col span={2}>
          <Group justify="space-around">
            <Button onClick={editDiscController.toggle}><FaEdit /></Button>
            <Button onClick={detailsDiscController.toggle}>{ (detailsDisc) ? <IoIosArrowUp /> : <IoIosArrowDown />}</Button>
          </Group>
          </Grid.Col>
      </Grid>
      <Stack display={(detailsDisc) ? "inherit" : "none"} p={15}>
        <Title order={4}>Description</Title>
        <Text>{description}</Text>
        <Table data={{body: Object.entries(fields)}} />
      </Stack>
      <Stack display={(editDisc) ? "inherit" : "none"} p={15}>
        <Title order={4}>Evaluate</Title>
        <NativeSelect value={seval} data={evals.map((val) => {return {label: alertEvalString(val), value: val.toString()}})} onChange={(e) => setEval(parseInt(e.currentTarget.value) as AlertEval)} />
        <Title order={4}>Analyst comment</Title>
        <Textarea value={ta} onChange={(e) => setTa(e.currentTarget.value)} rows={5} />
      </Stack>
    </Paper>
  );
}


export function AlertsDisplay( { json }: {json: V1Json} ) {
  const [sevals, setEvals] = useState<{[id: Alert['id']]: AlertEval}>(Object.fromEntries(json.alerts.map((v) => [v.id, -1])));
  const [tas, setTas] = useState<{[id: Alert['id']]: string}>(Object.fromEntries(json.alerts.map((v) => [v.id, ""])));

  function setEval(id: number, e: AlertEval) {
    setEvals({...sevals, [id]: e});
  }

  function setTa(id: number, s: string) {
    setTas({...tas, [id]: s});
  }

  useEffect(() => {
    setEvals(Object.fromEntries(json.alerts.map((v) => [v.id, -1])));
    setTas(Object.fromEntries(json.alerts.map((v) => [v.id, ""])));
  }, [json])


  function exportAnswers() {
    const res: GetFuncRet[] = json.alerts.map((val) => {return {id: val.id, ev: sevals[val.id], com: tas[val.id]}});

    const blob: Blob = new Blob([JSON.stringify(res)], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const name = 'export.json';
    a.download = name;

    document.body.appendChild(a);
    a.click();
    notifications.show({message: `Answers exported to ${name}`});
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }


  let pec = <></>;
  let fec = <></>;

  
  function checkAnswersPart() {
    let s: string[] = [];
    Object.entries(sevals).forEach((v) => {s[parseInt(v[0])] = v[1].toString()});

    if ((json as JsonECpart).solution === SHA256(s.join("")).toString()) {
      notifications.show({message: "Correct!", color: "green", icon: <FaCheckCircle />});
    } else {
      notifications.show({message: "Inorrect!", color: "red", icon: <FaExclamationTriangle />});
    }
  }

  function checkAnswersFull(reveal: boolean) {
    let prev = (json as JsonECfull).salt;
    
    let s: {s: string; ix: Alert['id']}[] = [];
    Object.entries(sevals).forEach((v) => {s[parseInt(v[0])] = {s: v[1].toString(), ix: parseInt(v[0])}});

    s = s.filter((v) => v !== undefined);

    for (let i=0; i<s.length; i++) {
      prev = SHA256(prev + s[i].s).toString();
      if (prev !== (json as JsonECfull).solution[i]) {
        notifications.show({message: (reveal) ? `Mistake at alert ${s[i].ix}` : "Inorrect!", color: "red", icon: <FaExclamationTriangle />});
        return;
      }
    }
    notifications.show({message: "Correct!", color: "green", icon: <FaCheckCircle />});
  }

  if ('ec' in json) {
    pec = <Button onClick={checkAnswersPart}>Check</Button>
    if (json.ec === 'full') {
      pec = <Button onClick={() => checkAnswersFull(false)}>Check</Button>
      fec = <Button onClick={() => checkAnswersFull(true)}>Reveal solution</Button>
    }
  }

  return (
    <Stack gap={10}>
      <Group justify="space-between">
        <Title order={3}>{json.name}</Title>
        <Group>
          <Tooltip label="Export your answers">
            <Button onClick={exportAnswers}>Export</Button>
          </Tooltip>
            {pec}
            {fec}
        </Group>
      </Group>
      <Grid align="center" ta="center" p={5}>
        <Grid.Col span={1} bd={"solid 1px white"}>ID</Grid.Col>
        <Grid.Col span={2} bd={"solid 1px white"}>Timestamp</Grid.Col>
        <Grid.Col span={1} bd={"solid 1px white"}>Severity</Grid.Col>
        <Grid.Col span={4} bd={"solid 1px white"}>Brief description</Grid.Col>
        <Grid.Col span={2} bd={"solid 1px white"}>Status</Grid.Col>
      </Grid>
      {json.alerts.map((val) => (<SingleAlert alertData={val} seval={sevals[val.id]} setEval={(e: AlertEval) => setEval(val.id, e)} ta={tas[val.id]} setTa={(s: string) => setTa(val.id, s)} />))}
    </Stack>
  );
}
