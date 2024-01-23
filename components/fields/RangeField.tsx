"use client";

import { FaSlidersH } from "react-icons/fa";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";

const type: ElementsType = "RangeField";

const extraAttributes = {
    label: "Range field",
    required: false,
    min: "0",
    max: "100",
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    required: z.boolean().default(false),
    min: z.string().min(0).max(100),
    max: z.string().min(1).max(10000),
    size: z.string().min(2).max(4),
});

export const RangeFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: FaSlidersH,
        label: "Range Field",
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
        min: '',
        max: '',
        size: '',
        required: false,
    });

    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
          label: element.extraAttributes.label,
          required: element.extraAttributes.required,
          min: element.extraAttributes.min,
          max: element.extraAttributes.max,
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
        const { label, required, min, max, size } = fields;

        updateElement(element.id, {
          ...element,
          extraAttributes: {
            label,
            required,
            size,
            min, max,
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
                    <span className="label-text">Min Range</span>
                </div>
                <input 
                    type="number" 
                    name="min"
                    placeholder="0,1,5,10" 
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChanges}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                    }}
                />
                <label className="label">
                    <span className="label-text-alt text-muted-foreground text-[0.8rem]">
                        Minimun value of the range
                    </span>
                </label>
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Max Range</span>
                </div>
                <input 
                    type="number" 
                    name="max"
                    placeholder="10,100,500,3000" 
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChanges}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                    }}
                />
                <label className="label">
                    <span className="label-text-alt text-muted-foreground text-[0.8rem]">
                        Maximum value of the range
                    </span>
                </label>
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Size</span>
                </div>

                <select className="select select-bordered w-full max-w-xs"
                    onChange={(e) => { setFields({...fields, 'size': e.target.value }) }}
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
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }){
    const element = elementInstance as CustomInstance;
    const { label, required, min, max } = element.extraAttributes;

    return (

        <div className="flex flex-col gap-2 w-80">
            <label htmlFor="input" className="ml-1 text-sm">
                {label}
                {required ? ("*") : ("")}
            </label>

            <input 
                className="p-3 bg-[#191E24] text-[#E0E0E0] border-solid border border-[#939393] rounded-lg outline-none"
                type="range" 
                id="input-range" 
                name="input-range" 
                min={min}
                max={max}
                step={10}
                disabled
            />

            {min && (
                <label className="label">
                    <span className="label-text-alt text-muted-foreground text-[0.8rem]">
                        {min}
                    </span>
                </label>
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
    const [rangeValue, setRangeValue] = useState("");
    const [value, setValue] = useState(defaultValue || "");
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);
    
    const { label, required, min, max } = element.extraAttributes;

    return (

        <div className="flex flex-col gap-2 w-80">
            <label htmlFor="input" className="ml-1 text-sm">
                {label}
                {required ? ("*") : ("")}
            </label>

            <input 
                className="p-3 bg-[#191E24] text-[#E0E0E0] border-solid border border-[#939393] rounded-lg outline-none"
                type="range" 
                id="input-range" 
                name="input-range" 
                min={min}
                max={max}
                step={10}
                list="tickmarks"
                onChange={(e) => setRangeValue(e.target.value)}
            />

            <datalist id="tickmarks">
                <option value="0" label="0"></option>
                <option value="25" label="25"></option>
                <option value="50" label="50"></option>
                <option value="75" label="75"></option>
                <option value="100" label="100"></option>
            </datalist>

            {rangeValue && (
                <label className="label">
                    <span className="label-text-alt text-muted-foreground text-[0.8rem]">
                        {rangeValue && <p className={`text-muted-foreground text-[0.8rem]" ${error && "text-red-500"}`}>{rangeValue}</p>}
                    </span>
                </label>
            )}
        </div>
    );
}