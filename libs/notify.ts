
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const notify = (label: string, type: string) => {
    if(type === "success"){
      toast.success(label, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else if(type === "error"){
      toast.error(label, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
}