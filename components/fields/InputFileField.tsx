"use client";

import useDesigner from "../hooks/useDesigner";
import { FaFileUpload } from "react-icons/fa";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const type: ElementsType = "InputFileField";

const extraAttributes = {
  label: "Input File field",
  helperText: "Helper text",
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  size: z.string().min(2).max(4),
});

export const InputFileFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: FaFileUpload,
    label: "Input File",
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
  const { label, helperText, required, size } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-80">
      <label htmlFor="input" className="ml-1 text-sm">
        {label}
        {required ? ("*") : ("")}
      </label>

      <input 
        className="p-3 text-[#E0E0E0] rounded-lg outline-none"
        type="file" 
        id="input" 
        name="input" 
        required 
        readOnly
        disabled
      />

      {helperText && (
        <label htmlFor="input" className="ml-1 text-xs">{helperText}</label>
      )}
    </div>
  );
}

function FormComponent({ elementInstance, submitValue, isInvalid, defaultValue, }: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);
    
    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

  const { label, helperText, required } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-80">
      <label htmlFor="input" className={`ml-1 text-sm ${error && "text-red-500"}`}>
        {label}
        {required ? ("*") : ("")}
      </label>

      <input 
        className={`p-3 text-[#E0E0E0] rounded-lg outline-none ${error && "border-red-500"}`}
        type="file"
        id="input" 
        name="input"
        required 
      />

      {helperText && (
        <label htmlFor="input" className={`ml-1 text-xs ${error && "text-red-500"}`}>{helperText}</label>
      )}
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const [fields, setFields] = useState({
    label: '',
    helperText: '',
    required: false,
    size: '',
  });

  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();

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
  
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      size: element.extraAttributes.size,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges() {

    const { label, helperText, required, size } = fields;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
        size,
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

        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Size</span>
            </div>

            <select className="select select-bordered w-full max-w-xs"
                onChange={(e) => {
                  console.log(e.target.value)
                  setFields({
                    ...fields,
                    "size": e.target.value,
                  });
                }}
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

    </form>
  );
}