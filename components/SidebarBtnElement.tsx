import { Button } from "react-daisyui";
import { FormElement } from "./FormElements";
import { useDraggable } from "@dnd-kit/core";

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
    const { label, icon:Icon } = formElement.designerBtnElement;
    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerBtnElement: true,
        },
    })
    return (
        <Button
            ref={draggable.setNodeRef}
            className={`mask mask-hexagon-2 flex flex-col gap-2 h-[100px] w-[120px] cursor-grab ${draggable.isDragging && "ring-2 ring-blue-600"}`}
            {...draggable.listeners}
            {...draggable.attributes}
        >
            <Icon className="h-8 w-8 text-blue-500 cursor-grap" />
            <p className="text-xs">{label}</p>
        </Button>
    );
}
 
export function SidebarBtnElementDragOverLay ({ formElement }: { formElement: FormElement }) {
    const { label, icon:Icon } = formElement.designerBtnElement;
    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerBtnElement: true,
        },
    })
    return (
        <Button
            ref={draggable.setNodeRef}
            className="mask mask-hexagon-2 flex flex-col gap-2 h-[100px] w-[120px] cursor-grab"
        >
            <Icon className="h-8 w-8 text-blue-600 cursor-grap" />
            <p className="text-xs">{label}</p>
        </Button>
    );
}

export default SidebarBtnElement;


 
