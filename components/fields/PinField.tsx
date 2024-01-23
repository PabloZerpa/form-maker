"use client";

import { BsThreeDots } from "react-icons/bs";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";

const type: ElementsType = "PinField";

const extraAttributes = {
    label: "Pin field",
    helperText: "Helper text",
    required: false,
    amount: 4,
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    amount: z.number(),
});

export const PinFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: BsThreeDots,
        label: "Pin Field",
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
        amount: 4,
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
          amount: element.extraAttributes.amount,
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
        const { label, helperText, amount, required } = fields

        updateElement(element.id, {
          ...element,
          extraAttributes: {
            label,
            helperText,
            amount,
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
                    type="text" 
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
                    <span className="label-text">Pin Amount</span>
                </div>
                <input 
                    type="number" 
                    name="amount"
                    min={4}
                    placeholder="Pin Amount" 
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChanges}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                    }}
                />
                <label className="label">
                    <span className="label-text-alt text-muted-foreground text-[0.8rem]">
                        min 4
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
    const { label, required, amount, helperText } = element.extraAttributes;

    const pinAmount = () => {
        let pins = [];
        for (let i = 1; i <= Number(amount); i++) {
          pins.push(
            <input 
                className="w-14 p-2 bg-[#191E24] text-[#E0E0E0] border-solid border border-[#939393] rounded-lg outline-none" 
                type="password" 
                maxLength={1} 
            />
        );
        }
        return pins;
    };

    return (
        <div className="flex flex-col gap-2 w-80">
            <label htmlFor="input" className="ml-1 text-sm">
                {label}
                {required ? ("*") : ("")}
            </label>

            <div className="flex flex-col gap-2">
                <form className="flex gap-2">
                    {pinAmount()}
                </form>
            </div>

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
    const { label, required, amount, helperText } = element.extraAttributes;
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);
    
    const pinAmount = () => {
        let pins = [];
        for (let i = 1; i <= Number(amount); i++) {
          pins.push(
            <input 
                className="w-14 p-2 bg-[#191E24] text-[#E0E0E0] border-solid border border-[#939393] rounded-lg outline-none" 
                type="password" 
                maxLength={1} 
                onPaste={(e) => {
                    const paste = e.clipboardData.getData('text');
                    e.currentTarget.value = paste[i] || '';
                }}
            />
          );
        }
        return pins;
    };

    return (

        <div className="flex flex-col gap-2 w-80">
            <label htmlFor="input" className={`ml-1 text-sm ${error && "text-red-500"}`}>
                {label}
                {required ? ("*") : ("")}
            </label>

            <div className="flex flex-col gap-2">
                <form className="flex gap-2">
                    {pinAmount()}
                </form>
            </div>

            {helperText && (
                <label htmlFor="input" className={`ml-1 text-xs ${error && "text-red-500"}`}>{helperText}</label>
            )}
        </div>
    );
}