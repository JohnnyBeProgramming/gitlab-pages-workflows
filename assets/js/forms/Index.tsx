import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";

import MaterialFrom from "./renderers/material-ui";

export default function GenerateFrom({ schema, uischema, data, onData }) {
  const [captured, setData] = useState(data);
  const onChange = (values: any, errors: any[]) => {
    setData(values);
    onData && onData(values, errors);
  };

  if (uischema) {
    return (
      <MaterialFrom
        schema={schema}
        uischema={uischema}
        data={captured}
        setData={onChange}
      />
    );
  }

  let props = { data: captured, setData: onChange };
  if (schema) props = { ...props, ...{ schema } };
  if (uischema) props = { ...props, ...{ uischema } };
  return <MaterialFrom {...props} />;
}
