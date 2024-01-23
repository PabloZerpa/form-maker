"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
import useDesigner from "../hooks/useDesigner";
import { LuHeading2 } from "react-icons/lu";

const type: ElementsType = "SubTitleField";

const extraAttributes = {
  title: "SubTitle field",
};

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

export const SubTitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: LuHeading2,
    label: "SubTitle field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full component-preview p-4 items-start justify-start font-sans">

      <label className="label">
        <span className="label-text">
            SubTitle field
        </span>
      </label>

      <p className="text-base">{title}</p>
    </div>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;

  const { title } = element.extraAttributes;
  return <p className="text-base">{title}</p>;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const [title, setTitle] = useState("");
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      title: element.extraAttributes.title,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges() {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title,
      },
    });
  }

  return (
    <form
        onBlur={applyChanges}
        onSubmit={(e) => { e.preventDefault(); }}
        className="space-y-3"
    >
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">SubTitle</span>
            </div>

            <input 
                type="name" 
                name="subtitle"
                placeholder="SubTitle" 
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => { setTitle(e.target.value) }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
            }}
        />
        </label>
        
    </form>
  );
}