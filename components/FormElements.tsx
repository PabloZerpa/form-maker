import { ButtonFieldFormElement } from "./fields/ButtonField";
import { CheckboxFieldFormElement } from "./fields/CheckboxField";
import { DateFieldFormElement } from "./fields/DateField";
import { EmailFieldFormElement } from "./fields/EmailField";
import { InputFileFieldFormElement } from "./fields/InputFileField";
import { NumberFieldFormElement } from "./fields/NumberField";
import { ParagprahFieldFormElement } from "./fields/ParagraphField";
import { PasswordFieldFormElement } from "./fields/PasswordField";
import { PhoneFieldFormElement } from "./fields/PhoneField";
import { PinFieldFormElement } from "./fields/PinField";
import { RadioFieldFormElement } from "./fields/RadioField";
import { RangeFieldFormElement } from "./fields/RangeField";
import { RatingFieldFormElement } from "./fields/RatingField";
import { SelectFieldFormElement } from "./fields/SelectField";
import { SeparatorFieldFormElement } from "./fields/SeparatorField";
import { SpacerFieldFormElement } from "./fields/SpacerField";
import { SubTitleFieldFormElement } from "./fields/SubTitleField";
import { TextAreaFormElement } from "./fields/TextAreaField";
import { TextFieldFormElement } from "./fields/TextField";
import { TimeFieldFormElement } from "./fields/TimeField";
import { TitleFieldFormElement } from "./fields/TitleField";
import { UrlFieldFormElement } from "./fields/UrlField";

export type ElementsType = "TextField"| "TitleField" | "SubTitleField" | "ParagraphField" 
| "SeparatorField" | "SpacerField" | "NumberField" | "TextAreaField" | "DateField"
| "SelectField" | "CheckboxField" | "RadioField" | "ButtonField" | "InputFileField"
| "TimeField" | "EmailField" | "UrlField" | "PasswordField" | "PhoneField" | "PinField" 
| "RangeField" | "RatingField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };

    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: SubmitFunction;
        isInvalid?: boolean;
        defaultValue?: string;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;

    validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
}

type FormElementsType = {
    [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagprahFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    NumberField: NumberFieldFormElement,
    TextAreaField: TextAreaFormElement,
    DateField: DateFieldFormElement,
    SelectField: SelectFieldFormElement,
    CheckboxField: CheckboxFieldFormElement,
    ButtonField: ButtonFieldFormElement,
    InputFileField: InputFileFieldFormElement,
    RadioField: RadioFieldFormElement,
    TimeField: TimeFieldFormElement,
    EmailField: EmailFieldFormElement,
    UrlField: UrlFieldFormElement,
    PasswordField: PasswordFieldFormElement,
    PhoneField: PhoneFieldFormElement,
    PinField: PinFieldFormElement,
    RangeField: RangeFieldFormElement,
    RatingField: RatingFieldFormElement,
};

export const Code = {
    
}