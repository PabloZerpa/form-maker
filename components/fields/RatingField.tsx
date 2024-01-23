"use client";

import useDesigner from "../hooks/useDesigner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { FaStar } from "react-icons/fa";

const type: ElementsType = "RatingField";

const extraAttributes = {
  label: "Rating field",
  helperText: "Rating",
  amount: 5,
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  amount: z.number(),
  required: z.boolean().default(false),
});

export const RatingFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: FaStar,
    label: "Rating Field",
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
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText, amount } = element.extraAttributes;

  return (

    <div className="flex flex-col gap-2 w-80">
      <label htmlFor="input" className={`ml-1 text-sm`}>
        {label}
        {required ? ("*") : ("")}
      </label>

    <div className="App">
      {[...Array(Number(amount))].map((star, index) => {
        const currentRating = index + 1;
        
        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              className="hidden"
              value={currentRating}
            />
            <span className={`star mr-2 text-4xl cursor-pointer`}>
              ★
            </span>
          </label>
        );
      })}
    </div>

      {helperText && (
        <label htmlFor="input" className={`ml-1 text-xs`}>Rating: {helperText}</label>
      )}
    </div>
  );
}

function FormComponent({elementInstance,submitValue,isInvalid,defaultValue,}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {

  const element = elementInstance as CustomInstance;
  const { label, required, helperText, amount } = element.extraAttributes;
  const [error, setError] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-2 w-80">
        <label htmlFor="input" className={`ml-1 text-sm ${error && "text-red-500"}`}>
          {label}
          {required ? ("*") : ("")}
        </label>

        <div className="App">
          {[...Array(Number(amount))].map((star, index) => {
            const currentRating = index + 1;

            return (
              <label key={index}>
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className="hidden"
                  value={currentRating}
                  onChange={() => setRating(currentRating)}
                />
                <span
                  className={`star mr-2 text-4xl cursor-pointer`}
                  style={{ color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9", }}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                >
                  ★
                </span>
              </label>
            );
          })}
        </div>

      {helperText && (
        <label htmlFor="input" className={`ml-1 text-xs ${error && "text-red-500"}`}>{rating}</label>
      )}
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const [fields, setFields] = useState({
    label: '',
    helperText: '',
    amount: 5,
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
      amount: element.extraAttributes.amount,
      required: element.extraAttributes.required,
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
    const { label, helperText, required, amount } = fields;

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
                <span className="label-text">Amount Star</span>
            </div>
            <input 
                type="number" 
                name="amount"
                placeholder="3, 5, 10" 
                className="input input-bordered w-full max-w-xs"
                onChange={handleChanges}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                }}
            />
            <label className="label">
                <span className="label-text-alt text-muted-foreground text-[0.8rem]">
                    Amount star for rating
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
}