"use client";

import useDesigner from "../hooks/useDesigner";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { IoMdCheckbox } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "react-daisyui";

const type: ElementsType = "CheckboxField";

const extraAttributes = {
  label: "Checkbox field",
  helperText: "Helper text",
  required: false,
  options: [],
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  amount: z.number(),
  options: z.array(z.string()).default([]),
});

export const CheckboxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: IoMdCheckbox,
    label: "CheckBox Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue === "true";
    }

    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText, options } = element.extraAttributes;
  const id = `checkbox-${element.id}`;

  return (
    <div className="flex w-full component-preview p-4 items-center justify-start gap-2 font-sans">
      <div className="form-control w-full max-w-xs">
        
        <div className="grid gap-1.5 leading-none">
          <label className="label">
              <span className="label-text">
                  {label}
                  {required ? ("*") : ("")}
              </span>
          </label>

          <div className="flex gap-4">
            {options.map((option, index) => (
              <div className="flex flex-col gap-2">
                <label htmlFor={`${index}`}>{option}</label>
                <input
                  id={`${index}`}
                  type="checkbox"
                  className={`checkbox`}
                />
              </div>
            ))}
          </div>

          {helperText && (
            <label className="label">
              <span className="label-text-alt text-muted-foreground text-[0.8rem]">
                {helperText}
              </span>
            </label>
          )}

        </div>
      </div>
    </div>
  );
}

function FormComponent({ elementInstance, submitValue, isInvalid, defaultValue }: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [error, setError] = useState(false);

  const { label, required, helperText, options } = element.extraAttributes;
  const id = `checkbox-${element.id}`;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex w-full component-preview p-4 items-center justify-start gap-2 font-sans">
      <div className="form-control w-full max-w-xs">
        <div className="grid gap-1.5 leading-none">

          <label className="label" htmlFor={id}>
              <span className={`label-text ${error && "text-red-500"}`}>
                  {label}
                  {required ? ("*") : ("")}
              </span>
          </label>

          <div className="flex gap-4">
            {options.map((option, index) => (
              <div className="flex flex-col gap-2">
                <label htmlFor={`${index}`}>{option}</label>
                <input
                  id={`${index}`}
                  type="checkbox"
                  className={`checkbox`}
                />
              </div>
            ))}
          </div>

          {helperText && (
              <label className="label">
                  <span className="label-text-alt text-muted-foreground text-[0.8rem]">
                      {helperText && <p className={`text-muted-foreground text-[0.8rem]" ${error && "text-red-500"}`}>{helperText}</p>}
                  </span>
              </label>
          )}
        </div>

      </div>
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {

  const [opt, setOpt] = useState<string[]>([]);
  const [add, setAdd] = useState("");
  const [fields, setFields] = useState({
    label: '',
    helperText: '',
    required: false,
    options: [''],
  });
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      amount: element.extraAttributes.amount,
      options: element.extraAttributes.options,
    },
  });

  function handleChanges(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.name === "required"){
        setFields({
            ...fields,
           "required": !fields.required,
        });
    }
    else{
        setFields({
            ...fields,
            [e.target.name]: e.target.value,
        });
    }
  }

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges() {
    const { label, helperText, required, options } = fields;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
        options,
      },
    });
  }

  return (
      <form
        onSubmit={(e) => { e.preventDefault(); applyChanges(); }}
        className="space-y-3"
      >
        <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Label</span>
                </div>
                <input 
                    type="name" 
                    name="label"
                    placeholder="Label" 
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChanges}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                    }}
                />
                <label className="label">
                    <span className="label-text-alt text-muted-foreground text-[0.8rem]">
                        The label of the field. It will be displayed above the field
                    </span>
                </label>
          </label>

          <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Helper Text</span>
                </div>
                <input 
                    type="name" 
                    name="helperText"
                    placeholder="Helper text" 
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChanges}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                    }}
                />
                <label className="label">
                    <span className="label-text-alt text-muted-foreground text-[0.8rem]">
                        The helper text of the field. It will be displayed below the field.
                    </span>
                </label>
          </label>
          
          <label className="flex flex-col items-center gap-4 form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Options</span>
                </div>

                {fields.options && fields.options.map((option) => (
                  <div className="flex justify-center items-center gap-2 text-sm text-center bg-blue-600 text-[#E0E0E0] p-1 w-auto rounded-lg">
                    {option}
                    <div
                      onClick={() => {
                        const deleteOption = opt.filter(element => element !== option);
                        setFields({ 
                          ...fields, 
                          "options": deleteOption
                        });
                      }}
                    >
                      <FaTimes className="text-[#E0E0E0] w-4 h-4 cursor-pointer" />
                    </div>
                  </div>
                ))}

                <input 
                  type="text" 
                  placeholder=""
                  className="p-3 bg-[#191E24] text-[#E0E0E0] border-solid border border-[#939393] rounded-lg outline-none"
                  onChange={(e) => setAdd(e.target.value)}
                />

                <Button
                  variant={"outline"}
                  className="gap-2 w-24"
                  onClick={(e) => {
                    e.preventDefault();
                    opt.unshift(add);
                    setFields({ 
                      ...fields, 
                      "options": opt
                    });
                  }}
                >
                  <AiOutlinePlus />
                  Add
                </Button>

            </label>

          <label className="form-control w-full max-w-xs">

                <label className="label cursor-pointer flex flex-col">
                    <label className="label">
                        <span className="label-text">Required</span> 
                    </label>
                    
                    <input 
                        type="checkbox"
                        name="required"
                        className="toggle toggle-info" 
                        onChange={handleChanges}
                    />

                </label>
          </label>

          <Button className="w-full" type="submit">Save</Button>
      </form>
  );
}