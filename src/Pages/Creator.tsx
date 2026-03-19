import { Button, Group, Menu, Stack } from "@mantine/core";
import { useState, useEffect } from "react";

import type { PresetAlert as AlertV1, V1Json } from "../Components/types/v1";

type Presets = {[key: string]: AlertV1[]}


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

  const [exercise, setExercise] = useState<V1Json>();

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
                      <Menu.Item>
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
        
      </Stack>
    </Group>
  );
}
