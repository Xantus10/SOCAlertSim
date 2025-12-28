import { Box, Text } from "@mantine/core";

import { useJson } from "../Components/JsonContext";

import { AlertsDisplay as ADv1 } from "../Components/AlertDisplays/v1";


function AlertInspector() {
  const json = useJson();

  if (!json) {
    return (
      <>
        <Text size="lg">Please select a JSON</Text>
      </>
    );
  }

  return (
    <Box m={30} p={30} bd={"solid 1px white"} miw="80vw">
      {
        (json.version === 1) ?
          <ADv1 json={json} />
        :
          <Text size="lg">Unrecognized json!</Text>
      }
    </Box>
  );
}

export default AlertInspector;