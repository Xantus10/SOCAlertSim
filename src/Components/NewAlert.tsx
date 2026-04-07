import { Button, NativeSelect, TextInput } from "@mantine/core";
import { useState } from "react";
import { severities, severityString, type PresetAlert, type Severity } from "./types/v1";


export default function NewAlert( { addFunction, closeFunction }: { addFunction: (preset: PresetAlert) => void, closeFunction: () => void } ) {
  const [newAlert, setNewAlert] = useState<PresetAlert>({severity: 1, briefdesc: '', description: '', mitre: [], eval: 'FP', fields: {}})

  return (
    <>
      <NativeSelect label='Evaluation' data={['FP', 'TP']} value={newAlert.eval} onChange={(e) => {setNewAlert({...newAlert, eval: e.currentTarget.value as 'FP' | 'TP'})}} />
      <NativeSelect label='Severity' data={severities.map((val) => ({label: severityString(val), value: val.toString()}))} value={newAlert.severity} onChange={(e) => {setNewAlert({...newAlert, severity: parseInt(e.currentTarget.value) as Severity})}} />
      <TextInput label='Brief description (name of the alert)' value={newAlert.briefdesc} onChange={(e) => {setNewAlert({...newAlert, briefdesc: e.currentTarget.value})}} />
      <TextInput label='Detailed description' value={newAlert.description} onChange={(e) => {setNewAlert({...newAlert, description: e.currentTarget.value})}} />
      <Button onClick={() => {addFunction(newAlert); closeFunction()}}>Add</Button>
    </>
  );
}
