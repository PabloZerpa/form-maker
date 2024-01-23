import { ReactNode, useCallback, useRef } from "react";
import { Button, Modal } from "react-daisyui";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
    label: string;
    sizeButton: string;
    icon: ReactNode;
    title: string;
    description: string;
    children: ReactNode;
}


const Window = ({ label, sizeButton, icon, title, description, children  }: ModalProps) => {
    const ref = useRef<HTMLDialogElement>(null);
    const handleShow = useCallback(() => { ref.current?.showModal() }, [ref]);

    return (
        <div className="font-sans">
            <Button 
                className={`w-${sizeButton ? sizeButton : 'auto'}`}
                onClick={handleShow}
            >
                {label} 
                <div className="text-2xl text-blue-500">{icon}</div>
            </Button>
            <Modal ref={ref} className={label=="Save" ? ``: `max-w-4xl` } >
                <form method="dialog">
                    <Button size="sm" color="ghost" shape="circle" className="absolute right-2 top-2 text-2xl">
                        <FaTimes />
                    </Button>
                </form>
                <Modal.Header className="text-center font-bold">{title}</Modal.Header>
                { description && <Modal.Body>{description}</Modal.Body>}

                {children}

            </Modal>
        </div>
    );
}
 
export default Window;