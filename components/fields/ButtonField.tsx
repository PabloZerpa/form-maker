"use client";

import useDesigner from "../hooks/useDesigner";
import { RiInputMethodFill } from "react-icons/ri";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const type: ElementsType = "ButtonField";

const extraAttributes = {
  title: "Button field",
  color: "",
};

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
  color: z.string().min(7).max(20),
  size: z.string().min(2).max(4),
  btnType: z.string().min(4).max(12),
});

export const ButtonFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: RiInputMethodFill,
    label: "Button",
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
  const { title, btnType } = element.extraAttributes;

  return (
    <div className="flex w-full component-preview p-4 items-center justify-start gap-2 font-sans">
      <button type={btnType} className="w-auto rounded-md bg-[#191E24] text-[#E0E0E0] p-2 transition duration-200 ease-in-out hover:bg-[#3d444c]">
        {title}
      </button>
    </div>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;

  const { title, btnType } = element.extraAttributes;

  return (
    <div className="flex w-full component-preview p-4 items-center justify-start gap-2 font-sans">
      <button type={btnType} className="w-auto rounded-md bg-[#191E24] text-[#E0E0E0] p-2 transition duration-200 ease-in-out hover:bg-[#3d444c]">
        {title}
      </button>
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [btnType, setBtnType] = useState("");

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
        color,
        size,
        btnType,
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
                <span className="label-text">Title</span>
            </div>

            <input 
                type="name" 
                name="title"
                placeholder="Button" 
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => { setTitle(e.target.value) }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                }}
            />
        </label>

        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Color</span>
            </div>

            <input 
                type="color" 
                name="color"
                placeholder="Color" 
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => { setColor(e.target.value); }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                }}
            />
        </label>

        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Size</span>
            </div>

            <select className="select select-bordered w-full max-w-xs"
                onChange={(e) => { setSize(e.target.value); }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                }}
             >
                <option disabled selected>Choose one</option>
                <option value="xs">Mini</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Big</option>
            </select>
        </label>

        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Type</span>
            </div>

            <select className="select select-bordered w-full max-w-xs"
                onChange={(e) => { setBtnType(e.target.value); }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                }}
             >
                <option disabled selected>Choose one</option>
                <option value="submit">Submit</option>
                <option value="reset">Reset</option>
            </select>
        </label>

    </form>
  );
}