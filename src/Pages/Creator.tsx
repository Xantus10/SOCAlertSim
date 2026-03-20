import { Button, Group, Menu, Stack, TextInput } from "@mantine/core";
import { useState, useEffect } from "react";
import { SHA256 } from "crypto-js";

import type { PresetAlert as PresetAlertV1, JsonECfull } from "../Components/types/v1";

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
    setExercise((old) => ({...old, alerts: [...old.alerts, {...raw, id: old.alerts.length+1, timestamp: Math.round(Date.now()/1000)}], solution: [...old.solution, SHA256(old.solution[old.solution.length-1] + neweval).toString()]}))
  }

  const [exercise, setExercise] = useState<JsonECfull>({name: "", version: 1, alerts: [], ec: "full", salt: SHA256(Date.now().toString()).toString(), solution: []});

  return (
    <Group p="1rem" align="flex-start">
      <Stack>
        {
          Object.entries(preset).map(([category, alerts]) => {
            return (
              <Menu>
                <Menu.Target>
                  <Button>{category}</Button>
                </Menu.Target>
                {
                  alerts.map((alert) => {
                    return (
                      <Menu.Item onClick={() => appendPreset(alert)}>
                        <Button fullWidth>{`${alert.eval} - ${alert.briefdesc}`}</Button>
                      </Menu.Item>
                    );
                  })
                }
              </Menu>
            );
          })
        }
      </Stack>
      <Stack m={30} p={30} bd={"solid 1px white"} w="85vw">
        <TextInput label="Name of the exercise" value={exercise?.name} onChange={(e) => setExercise((old) => ({...old, name: e.currentTarget.value}))} />
      </Stack>
    </Group>
  );
}
