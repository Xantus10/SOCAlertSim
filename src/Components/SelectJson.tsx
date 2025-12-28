import { useState, useEffect } from "react";
import { Button, Modal, Text, FileInput, TextInput, NativeSelect } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useSetJson } from "./JsonContext";


function SelectJson() {
  const setJson = useSetJson();
  
  const [disc, discController] = useDisclosure(false);

  const [github, setGithub] = useState<string>("");
  const gitlist = ["", "first.json"];

  const [url, setUrl] = useState("");

  const [finp, setFinp] = useState<File | null>(null);

  async function LoadJson(what: 'git' | 'url' | 'file') {
    if (what === 'file') {
      let cont = await finp?.text();
      if (cont) setJson(JSON.parse(cont));
      setFinp(null);
      discController.close();
      return;
    }

    let requrl = (what === 'url') ? url : `json/${github}`;
    let res = await fetch(requrl);
    if (res) {
      setJson(await JSON.parse(await res.text()));
    }
    setGithub("");
    setUrl("");
    discController.close();
  }

  useEffect(() => {
    if (github) LoadJson('git');
  }, [github]);

  useEffect(() => {
    if (finp) LoadJson('file');
  }, [finp])

  return (<>
    <Button onClick={discController.open}>JSON</Button>
    <Modal opened={disc} onClose={discController.close} withinPortal={false} title="Select JSON" >
      <Text>From github (Preset)</Text>
      <NativeSelect data={gitlist} value={github} onChange={(e) => {setGithub(e.currentTarget.value)}} />
      <Text>From URL</Text>
      <TextInput value={url} onChange={(e) => {setUrl(e.currentTarget.value)}} placeholder="https://example.com/tryit.json" />
      <Button onClick={() => LoadJson('url')} >Load</Button>
      <Text>From Local file</Text>
      <FileInput value={finp} onChange={(e) => {setFinp(e)}} placeholder="local.json" />
    </Modal>
  </>);
}



export default SelectJson;