
import useDesigner from "./hooks/useDesigner";
import Window from "./Window";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "react-daisyui";
import { FaSave, FaSpinner } from "react-icons/fa";
import { useTransition } from "react";
import { notify } from "@/libs/notify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SaveFormBtn = ({ id }: { id: number | null }) => {
    const { isSignedIn } = useUser();
    const { elements } = useDesigner();
    const [loading, startTransition] = useTransition();

    const updateFormContent = async () => {
        try {
            const jsonElements = JSON.stringify(elements);
            const data = { id, elements, jsonElements }
            console.log(elements);

            await fetch('/api/forms', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            notify("Your form has been saved", "success");
        } 
        catch (error) {
            notify("Something went wrong", "error");
        }
    }

    if(isSignedIn){
        return(
            <Button
                className="gap-2"
                color="neutral"
                disabled={loading}
                onClick={() => { startTransition(updateFormContent); }}
            >
                <ToastContainer />
                Save
                <FaSave className="h-4 w-4 text-blue-500 text-2xl" />
                {loading && <FaSpinner className="animate-spin" />}
            </Button>
        );
    }

    return (
        <Window
            label="Save"
            sizeButton=""
            icon={<FaSave className="h-6 w-6" />}
            title="You need to be sign for save"
            description=""
        >
            <div className="flex justify-center gap-8">
                <SignInButton>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
                        Sign In
                    </Button>
                </SignInButton>
                
                <SignUpButton>
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2">
                        Sign Up
                    </Button>
                </SignUpButton>
            </div>
        </Window>
    );
}
 
export default SaveFormBtn;