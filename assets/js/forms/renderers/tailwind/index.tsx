import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  JsonFormsStyleContext,
  vanillaCells,
  vanillaRenderers,
} from "@jsonforms/vanilla-renderers";

import { SelectControl, SelectTester } from "./Select";
import { Group, groupTester } from "./Group";

const cells = vanillaCells
const renderers = [
  ...vanillaRenderers,

  // Register some custom renderers
  { tester: SelectTester, renderer: SelectControl },
  //{ tester: groupTester, renderer: Group }
];

const styleContextValue = {
  styles: [
    {
      name: "control",
      classNames: "my-5",
    },
    {
      name: "control.input",
      classNames:
        "w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out font-sans",
    },
    {
      name: "control.select",
      classNames:
        "w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out appearance-none",
    },
    {
      name: "control.label",
      classNames:
        "block uppercase tracking-wide text-gray-700 text-xs font-bold pb-4",
    },
    {
      name: "array.button",
      classNames: "custom-array-button",
    },
    {
      name: "control.validation",
      classNames: "text-red-500 font-normal mt-2 text-xs",
    },
    {
      name: "vertical.layout",
      classNames:
        "block uppercase tracking-wide text-gray-700 text-s font-bold mb-2",
    },
    {
      name: "group.layout",
      classNames: "accordion-item bg-white",
    },
    {
      name: "group.label",
      classNames:
        "accordion-button relative flex w-full py-4 transition focus:outline-none block uppercase tracking-wide text-gray-700 text-s font-bold pb-4",
    },
  ],
};

export default function TailwindFrom({ schema, uischema, data, setData }) {
  //console.log(renderers);
  return (
    <JsonFormsStyleContext.Provider value={styleContextValue}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={cells}
        onChange={({ data }) => setData(data)}
      />
    </JsonFormsStyleContext.Provider>
  );
}
