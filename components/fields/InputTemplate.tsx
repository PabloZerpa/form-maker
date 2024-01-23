import { useState } from "react";
import { FormElement, FormElementInstance } from "../FormElements";

interface InputTemplateProps {
    label: String;
    required: boolean;
    placeHolder: string;
    helperText: String;
    value: string | number | readonly string[] | undefined;
    error: boolean;
    type: string;
}

const InputTemplate = (
    { label, placeHolder, helperText, required, value, error, type }: InputTemplateProps, 
    element: FormElementInstance,
    fieldFormElement: FormElement,
) => {
    const [templateValue, setValue] = useState("");
    const [templateError, setError] = useState(false);
    const [submitValue, setSubmit] = useState(false);
    
    return (
        <div className="flex flex-col gap-2 w-80">
            <label htmlFor="input" className={`ml-1 text-sm ${error && "text-red-500"}`}>
                {label}
                {required ? ("*") : ("")}
            </label>

            <input 
                className={`p-3 bg-[#191E24] text-[#E0E0E0] border-solid border border-[#939393] 
                    rounded-lg outline-none ${error && "border-red-500"}`}
                type={type}
                placeholder={placeHolder}
                id="input" 
                name="input" 
                value={value}
                required 
                onChange={(e) => setValue(e.target.value)}
                onBlur={(e) => {
                    if (!submitValue) return;
                    const valid = fieldFormElement.validate(element, e.target.value);
                    setError(!valid);
                    if (!valid) return;
                }}
            />

            {helperText && (
                <label htmlFor="input" className={`ml-1 text-xs ${error && "text-red-500"}`}>{helperText}</label>
            )}
        </div>
    );
}
 
export default InputTemplate;