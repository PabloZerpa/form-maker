
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

interface ListElements {
    name: string;
    element: JSX.Element;
};

const elements: Array<ListElements> = [
    {   name: 'title field', element: <SidebarBtnElement formElement={FormElements.TitleField} /> },
    {   name: 'subTitle field', element: <SidebarBtnElement formElement={FormElements.SubTitleField} /> },
    {   name: 'paragraph field', element: <SidebarBtnElement formElement={FormElements.ParagraphField} /> },
    {   name: 'separator field', element: <SidebarBtnElement formElement={FormElements.SeparatorField} /> },
    {   name: 'text field', element: <SidebarBtnElement formElement={FormElements.TextField} /> },
    {   name: 'number field', element: <SidebarBtnElement formElement={FormElements.NumberField} /> },
    {   name: 'textArea field', element: <SidebarBtnElement formElement={FormElements.TextAreaField} /> },
    {   name: 'date field', element: <SidebarBtnElement formElement={FormElements.DateField} /> },
    {   name: 'time field', element: <SidebarBtnElement formElement={FormElements.TimeField} /> },
    {   name: 'inputFile field', element: <SidebarBtnElement formElement={FormElements.InputFileField} /> },
    {   name: 'select field', element: <SidebarBtnElement formElement={FormElements.SelectField} /> },
    {   name: 'email field', element: <SidebarBtnElement formElement={FormElements.EmailField} /> },
    {   name: 'url field', element: <SidebarBtnElement formElement={FormElements.UrlField} /> },
    {   name: 'phone field', element: <SidebarBtnElement formElement={FormElements.PhoneField} /> },
    {   name: 'password field', element: <SidebarBtnElement formElement={FormElements.PasswordField} /> },
    {   name: 'pin field', element: <SidebarBtnElement formElement={FormElements.PinField} /> },
    {   name: 'check field', element: <SidebarBtnElement formElement={FormElements.CheckboxField} /> },
    {   name: 'radio field', element: <SidebarBtnElement formElement={FormElements.RadioField} /> },
    {   name: 'range field', element: <SidebarBtnElement formElement={FormElements.RangeField} /> },
    {   name: 'rating field', element: <SidebarBtnElement formElement={FormElements.RatingField} /> },
    {   name: 'button field', element: <SidebarBtnElement formElement={FormElements.ButtonField} /> },
];

const FormElementsSidebar = () => {
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState<ListElements[]>([]);

    const OnSearch = () => {
        const data = elements.filter((item) => item.name.includes(search.toLocaleLowerCase()));
        setSearchData(data);
    }

    return (
        <div>
            <p className="text-sm text-foreground/70">Drag and drop elements</p>
            <div className="divider"></div> 

            <div className="relative">
                <FaSearch className="w-4 h-4 text-blue-600 absolute top-4 left-2" />
                <input 
                    type="text" 
                    name="search"
                    placeholder="Text, Button, Rating" 
                    className="input input-bordered input-md w-full max-w-xs pl-8"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={OnSearch}
                />
            </div>
            <div className="divider"></div> 

            {!search && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
                    <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Layout elements</p>
                    <SidebarBtnElement formElement={FormElements.TitleField} />
                    <SidebarBtnElement formElement={FormElements.SubTitleField} />
                    <SidebarBtnElement formElement={FormElements.ParagraphField} />
                    <SidebarBtnElement formElement={FormElements.SeparatorField} />
        
                    <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Form elements</p>
                    <SidebarBtnElement formElement={FormElements.TextField} />
                    <SidebarBtnElement formElement={FormElements.NumberField} />
                    <SidebarBtnElement formElement={FormElements.TextAreaField} />
                    <SidebarBtnElement formElement={FormElements.DateField} />
                    <SidebarBtnElement formElement={FormElements.TimeField} />
                    <SidebarBtnElement formElement={FormElements.InputFileField} />
                    <SidebarBtnElement formElement={FormElements.SelectField} />
                    <SidebarBtnElement formElement={FormElements.EmailField} />
                    <SidebarBtnElement formElement={FormElements.UrlField} />
                    <SidebarBtnElement formElement={FormElements.PhoneField} />
                    <SidebarBtnElement formElement={FormElements.PasswordField} />
                    <SidebarBtnElement formElement={FormElements.PinField} />
                    <SidebarBtnElement formElement={FormElements.CheckboxField} />
                    <SidebarBtnElement formElement={FormElements.RadioField} />
                    <SidebarBtnElement formElement={FormElements.RangeField} />
                    <SidebarBtnElement formElement={FormElements.RatingField} />
                    <SidebarBtnElement formElement={FormElements.ButtonField} />
                </div> )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
                {search && 
                    searchData.map((item, index) => {
                        return(
                            <div key={index}>{item.element}</div>
                        );
                    })
                }
            </div>

        </div>
    );
}
 
export default FormElementsSidebar;