"use client";

import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
import { RiSeparator } from "react-icons/ri";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: RiSeparator,
    label: "Separator field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return (
    <div className="flex flex-col gap-2 w-full component-preview p-4 items-start justify-start font-sans">

      <label className="label">
        <span className="label-text">
            Separator field
        </span>
      </label>

      <div className="border-[1px] border-solid border-zinc-500 w-full"></div> 
    </div>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return <div className="border-[1px] border-solid border-zinc-500 rounded-full w-full"></div> ;
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return <p>No properties for this element</p>;
}