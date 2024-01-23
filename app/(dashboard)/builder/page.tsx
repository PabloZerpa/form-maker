
"use client"

import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Input } from "react-daisyui";
import PreviewDialogBtn from "@/components/PreviewDialogBtn";
import Designer from "@/components/Designer";
import DragOverlayWrapper from "@/components/DragOverlayWrapper";
import SaveFormBtn from "@/components/SaveFormBtn";
import CodeBlock from "@/components/CodeBlock";

function BuilderPage() {

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
          distance: 10,
        },
      });
      
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
          delay: 300,
          tolerance: 5,
        },
    });
    
    const sensors = useSensors(mouseSensor, touchSensor);
  
    
    return (
      <DndContext sensors={sensors}>
        <main className="flex flex-col w-full">
          <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
            
            <div className="truncate font-medium">
              <span className="font-medium text-muted-foreground mr-2">Form:</span>
              <Input type="text" placeholder="Form Title" />
            </div>

            <PreviewDialogBtn />

            <div className="flex items-center gap-2">
              <CodeBlock />
              <SaveFormBtn id={null} />
            </div>
          </nav>

          <div 
            className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px]">
            <Designer />
          </div>

        </main>
        <DragOverlayWrapper />
      </DndContext>
    );
}
export default BuilderPage;