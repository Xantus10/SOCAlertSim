import { Button, Group, Menu, Stack, TextInput, NativeSelect } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { SHA256 } from "crypto-js";

import type { PresetAlert as PresetAlertV1, V1Json as Json, Alert, AlertEval } from "../Components/types/v1";
import { MutableAlert } from "../Components/AlertDisplays/v1";

type Presets = {[key: string]: PresetAlertV1[]}


export default function Creator() {

  const [preset, setPreset] = useState<Presets>({});

  async function fetchPresets() {
    let res = await fetch("presets.json");
    if (res) {
      setPreset(await JSON.parse(await res.text()));
    }
  }
  useEffect(() => {
    fetchPresets();
  }, [])

  function appendPreset(preset: PresetAlertV1) {
    let {eval: evalValue, ...raw} = preset;
    let neweval = (evalValue === 'FP') ? '0' : '1';
    setEvals((old) => ([...old, parseInt(neweval) as AlertEval]));
    setExercise((old) => ({...old, alerts: [...old.alerts, {...raw, id: old.alerts.length+1, timestamp: Math.round(Date.now()/1000)}]}))
  }

  function changeField(id: Alert['id'], field: keyof Alert['fields'], value: Alert['fields'][keyof Alert['fields']]) {
    setExercise((old) => ({...old, alerts: old.alerts.map((val) => (val.id === id) ? {...val, fields: Object.fromEntries(Object.entries(val.fields).map((fld) => (fld[0] === field) ? [field, value] : fld))} : val)}))
  }

  const [exercise, setExercise] = useState<Json>({name: "", version: 1, alerts: [], ec: "full", salt: SHA256(Date.now().toString()).toString(), solution: []});
  const [evals, setEvals] = useState<AlertEval[]>([]);
  type ECH = 'None' | 'Partial' | 'Full';
  const [ech, setEch] = useState<ECH>('Full');

  useEffect(() => {
    if (ech === 'Full') {
      let salt = SHA256(Date.now().toString()).toString()
      let sols: string[] = [];
      evals.forEach((val, ix) => {sols.push((ix === 0) ? SHA256(salt + val.toString()).toString() : SHA256(sols[ix-1] + val.toString()).toString())});
      setExercise((old) => ({...old, ec: 'full', salt: salt, solution: sols}));
    } else if (ech === 'Partial') {
      setExercise((old) => ({...old, ec: 'partial', salt: '', solution: SHA256(evals.map((val) => val.toString()).join()).toString()}));
    } else {
      setExercise((old) => ({...old, ec: 'none', salt: '', solution: ''}));
    }
  }, [evals, ech])

  function exportAnswers() {
    const blob: Blob = new Blob([JSON.stringify(exercise)], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const name = `${(exercise.name.length > 0) ? exercise.name : 'exercise'}.json`;
    a.download = name;

    document.body.appendChild(a);
    a.click();
    notifications.show({message: `Answers exported to ${name}`});
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  return (
    <>
      <Group align="flex-start" m="1rem">
      <Stack pt="1rem">
        {
          Object.entries(preset).map(([category, alerts], ix) => {
            return (
              <Menu position="right-start" key={ix}>
                <Menu.Target>
                  <Button>{category}</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  {
                    alerts.map((alert, ix) => {
                      return (
                        <Menu.Item onClick={() => appendPreset(alert)} key={ix}>
                          <Button fullWidth>{`${alert.eval} - ${alert.briefdesc}`}</Button>
                        </Menu.Item>
                      );
                    })
                  }
                </Menu.Dropdown>
              </Menu>
            );
          })
        }
      </Stack>
      <Stack m={30} p={30} bd={"solid 1px white"} w="85vw">
        <Button onClick={exportAnswers}>Export</Button>
        <TextInput label="Name of the exercise" value={exercise.name} onChange={(e) => setExercise({...exercise, name: e.currentTarget.value})} />
        <NativeSelect label="Error checking" data={['None', 'Partial', 'Full']} value={ech} onChange={(e) => {setEch(e.currentTarget.value as ECH)}} />
        {
          exercise.alerts.map((val, ix) => <MutableAlert alertData={val} evaluation={evals[ix]} changeField={changeField} key={ix} />)
        }
      </Stack>
    </Group>
    </>
  );
}
