import { Button } from "react-daisyui";
import { FormElements } from "./FormElements";
import { AiOutlineClose } from "react-icons/ai";
import useDesigner from "./hooks/useDesigner";

const PropertiesFormSidebar = () => {
    const { selectedElement, setSelectedElement } = useDesigner();
    if(!selectedElement) return null;

    const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;

    return (
        <div className="flex flex-col p-2">
            <div className="flex justify-between items-center">
                <p className="text-sm text-foreground/70">Element properties</p>

                <Button
                    size="sm"
                    onClick={() => { setSelectedElement(null) }}
                >
                    <AiOutlineClose />
                </Button>
            </div>
            <PropertiesForm elementInstance={selectedElement} />
        </div>
    );
}
 
export default PropertiesFormSidebar;