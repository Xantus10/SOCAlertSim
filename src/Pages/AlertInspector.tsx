import { Group, Box, Text } from "@mantine/core"
import { useState } from "react";

import SelectJson from "../Components/SelectJson";
import type { JsonSchema } from "../Components/types/JsonSchema";

import { AlertsDisplay as ADv1 } from "../Components/AlertDisplays/v1";
import { AlertsDisplay as ADv2 } from "../Components/AlertDisplays/v2";


export default function AlertInspector() {
  const [json, setJson] = useState<JsonSchema | null>(null)
  
  return (
    <>
      <Group p="1rem" align="flex-start" m="1rem">
        <Box>
          <SelectJson setJson={setJson} />
        </Box>
        <Box m={30} p={30} bd={"solid 1px white"} w="85vw">
          {
            (!json) ?
              <Text size="lg">Please select a JSON</Text>
            :
            (json.version === 1) ?
              <ADv1 json={json} />
            :
            (json.version === 2) ?
              <ADv2 json={json} />
            :
              <Text size="lg">Unrecognized json!</Text>
          }
        </Box>
      </Group>
    </>
  );
}
