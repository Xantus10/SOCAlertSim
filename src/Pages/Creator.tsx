import { Button, Group, Menu, Stack, TextInput } from "@mantine/core";
import { useState, useEffect } from "react";
import { SHA256 } from "crypto-js";

import type { PresetAlert as PresetAlertV1, JsonECfull, Alert, AlertEval } from "../Components/types/v1";
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
    setExercise((old) => ({...old, alerts: [...old.alerts, {...raw, id: old.alerts.length+1, timestamp: Math.round(Date.now()/1000)}], solution: [...old.solution, SHA256(old.solution[old.solution.length-1] + neweval).toString()]}))
  }

  function changeField(id: Alert['id'], field: keyof Alert['fields'], value: Alert['fields'][keyof Alert['fields']]) {
    setExercise((old) => ({...old, alerts: old.alerts.map((val) => (val.id === id) ? {...val, fields: Object.fromEntries(Object.entries(val.fields).map((fld) => (fld[0] === field) ? [field, value] : fld))} : val)}))
  }

  const [exercise, setExercise] = useState<JsonECfull>({name: "", version: 1, alerts: [], ec: "full", salt: SHA256(Date.now().toString()).toString(), solution: []});
  const [evals, setEvals] = useState<AlertEval[]>([]);

  return (
    <Group p="1rem" align="flex-start">
      <Stack>
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
        <TextInput label="Name of the exercise" value={exercise.name} onChange={(e) => setExercise({...exercise, name: e.currentTarget.value})} />
        {
          exercise.alerts.map((val, ix) => <MutableAlert alertData={val} evaluation={evals[ix]} changeField={changeField} key={ix} />)
        }
      </Stack>
    </Group>
  );
}
