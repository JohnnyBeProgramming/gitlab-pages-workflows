import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

const cells = materialCells;
const renderers = materialRenderers;

export default function MaterialFrom({ schema, uischema, data, setData }) {
  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={data}
      renderers={renderers}
      cells={cells}
      onChange={({ data, errors }) => setData(data, errors)}
    />
  );
}
