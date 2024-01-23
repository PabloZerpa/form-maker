"use client";

import { FaGlobe } from "react-icons/fa";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";

const type: ElementsType = "UrlField";

const extraAttributes = {
    label: "Url field",
    helperText: "Helper text",
    required: false,
    placeholder: "Value here...",
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
});

export const UrlFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: FaGlobe,
        label: "Url Field",
    },

    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as CustomInstance;
        if (element.extraAttributes.required) {
          return currentValue.length > 0;
        }
    
        return true;
    },
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }){
    const [fields, setFields] = useState({
        label: '',
        placeHolder: '',
        helperText: '',
        required: false,
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
          placeHolder: element.extraAttributes.placeHolder,
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
        const { label, helperText, placeHolder, required } = fields;

        updateElement(element.id, {
          ...element,
          extraAttributes: {
            label,
            helperText,
            placeHolder,
            required,
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
                    <span className="label-text">Placeholder</span>
                </div>
                <input 
                    type="name" 
                    name="placeHolder"
                    placeholder="Placeholder" 
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChanges}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                    }}
                />
                <label className="label">
                    <span className="label-text-alt text-muted-foreground text-[0.8rem]">
                        The placeholder of the field.
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
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }){
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText } = element.extraAttributes;

    return (

        <div className="flex flex-col gap-2 w-80">
            <label htmlFor="input" className="ml-1 text-sm">
                {label}
                {required ? ("*") : ("")}
            </label>

            <input 
                className="p-3 bg-[#191E24] text-[#E0E0E0] border-solid border border-[#939393] rounded-lg outline-none"
                type="url"
                placeholder={placeHolder}
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
}){
    const element = elementInstance as CustomInstance;
    const [value, setValue] = useState(defaultValue || "");
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);
    
    const { label, required, placeHolder, helperText } = element.extraAttributes;

    return (

        <div className="flex flex-col gap-2 w-80">
            <label htmlFor="input" className={`ml-1 text-sm ${error && "text-red-500"}`}>
                {label}
                {required ? ("*") : ("")}
            </label>

            <input 
                className={`p-3 bg-[#191E24] text-[#E0E0E0] border-solid border border-[#939393] 
                    rounded-lg outline-none ${error && "border-red-500"}`}
                type="url"
                pattern="https://.*" 
                placeholder={placeHolder}
                id="input" 
                name="input" 
                value={value}
                required 
                onChange={(e) => setValue(e.target.value)}
                onBlur={(e) => {
                    if (!submitValue) return;
                    const valid = UrlFieldFormElement.validate(element, e.target.value);
                    setError(!valid);
                    if (!valid) return;
                    submitValue(element.id, e.target.value);
                }}
            />

            {helperText && (
                <label htmlFor="input" className={`ml-1 text-xs ${error && "text-red-500"}`}>{helperText}</label>
            )}
        </div>
    );
}