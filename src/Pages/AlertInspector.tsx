import { Box, Text, Group } from "@mantine/core";

import SelectJson from "../Components/SelectJson";
import { useJson } from "../Components/JsonContext";

import { AlertsDisplay as ADv1 } from "../Components/AlertDisplays/v1";
import { AlertsDisplay as ADv2 } from "../Components/AlertDisplays/v2";


function AlertInspector() {
  const json = useJson();

  return (
    <Group p="1rem" align="flex-start">
      <Box>
        <SelectJson />
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
  );
}

export default AlertInspector;