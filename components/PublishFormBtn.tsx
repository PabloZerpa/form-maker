
import { useRouter } from "next/navigation";
import { useCallback, useRef, useTransition } from "react";
import { Alert, Button, Modal } from "react-daisyui";
import { FaArrowAltCircleUp, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { notify } from "@/libs/notify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PublishFormBtn = ({ id }: { id: number }) => {
    const ref = useRef<HTMLDialogElement>(null);
    const handleShow = useCallback(() => {ref.current?.showModal();}, [ref]);
    
    const [loading, startTransition] = useTransition();
    const router = useRouter();

    async function publishForm() {
        try {
          const res = await fetch(`/api/forms/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
          });

          notify("Your form is now available to the public", "success");
          router.refresh();
        } 
        catch (error) {
          notify("Something went wrong", "error");
        }
    }

    return (
      <>
        <ToastContainer />
        <Button className="gap-2" color="neutral" onClick={handleShow}>
          Publish
          <FaArrowAltCircleUp className="h-4 w-4 text-blue-500 text-2xl" />
        </Button>


        <Modal ref={ref} className="bg-transparent shadow-none" >
          <Alert icon={<FaExclamationTriangle className="h-8 w-8 text-amber-500" />}>
            <div className="flex flex-col gap-4">

              <div>
                <h3 className="font-bold">Are you absolutely sure?</h3>
                <div className="text-xs">
                  This action cannot be undone. After publishing you will not be able to edit this form.
                </div>
              </div>

              <div className="space-x-1 flex justify-center items-center gap-4">
                <form method="dialog">
                  <Button size="sm" color="error">Cancel</Button>
                </form>

                <Button 
                  size="sm" 
                  color="info"
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    startTransition(publishForm);
                  }}
                >
                  Proceed {loading && <FaSpinner className="animate-spin" />}
                </Button>
              </div>

            </div>
          </Alert>
        </Modal>
      </>
    );
}
 
export default PublishFormBtn;