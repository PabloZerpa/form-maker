
import { FaEye } from "react-icons/fa";
import { FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import Window from "./Window";

function PreviewDialogBtn() {
  const { elements } = useDesigner();

  return (
    <Window
      label="Preview"
      sizeButton=""
      icon={<FaEye className="h-6 w-6" />}
      title="Preview"
      description=""
    >
      <div className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">Form preview</p>
          <p className="text-sm text-muted-foreground">This is how your form will look like to your users.</p>
        </div>
        
        <div 
          className=" flex flex-col flex-grow items-center justify-center 
          p-4 overflow-y-auto"
        >
          <div className="max-w-[620px] flex flex-col gap-8 flex-grow border-2 border-solid border-blue-500 h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements?.map((element) => {
              
              const FormComponent = FormElements[element.type].formComponent;
              return <FormComponent key={element.id} elementInstance={element} />;
            })}
          </div>
        </div>

      </div>
    </Window>
  );
}

export default PreviewDialogBtn;