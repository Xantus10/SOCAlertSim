import { useState } from "react";
import { Stack, Grid, Title, Paper, Button, Group, Text, Table, NativeSelect, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { severityString, severityColor, type Alert, type Json } from "../types/v1";


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


export function SingleAlert( { id, timestamp, severity, briefdesc, description, fields } : Alert ) {
  const evals: AlertEval[] = [-1, 0, 1];
  const [seval, setEval] = useState<AlertEval>(-1);
  const [detailsDisc, detailsDiscController] = useDisclosure(false);
  const [editDisc, editDiscController] = useDisclosure(false);
  const [ta, setTa] = useState("");

  console.log(detailsDisc);

  return (
    <Paper bg={"dark.6"} bd={`solid 1px ${severityColor(severity)}`}>
      <Grid align="center" ta="center" p={15}>
        <Grid.Col span={1}>{id}</Grid.Col>
        <Grid.Col span={2}>{new Date(timestamp).toLocaleString()}</Grid.Col>
        <Grid.Col span={1} ta={'left'}>{severityString(severity)}</Grid.Col>
        <Grid.Col span={4} ta={'left'}>{briefdesc}</Grid.Col>
        <Grid.Col span={2} c={alertEvalColor(seval)}>{alertEvalString(seval)}</Grid.Col>
        <Grid.Col span={2}>
          <Group justify="space-around">
            <Button onClick={editDiscController.toggle}>Edit</Button>
            <Button onClick={detailsDiscController.toggle}>{(detailsDisc) ? "Less" : "More"}</Button>
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


export function AlertsDisplay( { json }: {json: Json} ) {

  return (
    <Stack gap={10}>
      <Title order={3}>{json.name}</Title>
      <Grid align="center" ta="center" p={5}>
        <Grid.Col span={1} bd={"solid 1px white"}>ID</Grid.Col>
        <Grid.Col span={2} bd={"solid 1px white"}>Timestamp</Grid.Col>
        <Grid.Col span={1} bd={"solid 1px white"}>Severity</Grid.Col>
        <Grid.Col span={4} bd={"solid 1px white"}>Brief description</Grid.Col>
        <Grid.Col span={2} bd={"solid 1px white"}>Status</Grid.Col>
      </Grid>
      {json.alerts.map((val) => <SingleAlert {...val} key={val.id} />)}
    </Stack>
  );
}
