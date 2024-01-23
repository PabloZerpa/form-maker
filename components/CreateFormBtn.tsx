"use client";

import { useState } from "react";
import { FaFileMedical } from "react-icons/fa";
import { Button } from "react-daisyui";
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import { notify } from "@/libs/notify";
import 'react-toastify/dist/ReactToastify.css';
import Window from "./Window";

function CreateFormBtn() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function onSubmit(e: React.SyntheticEvent){
    try {
      e.preventDefault();
      const data = { name: name, description: description };
  
      const res = await fetch('/api/forms', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await res.json();
      notify("Form created successfully", "success");
      router.push(`/builder/${response}`);
      
    } catch (error) {
      notify("Something went wrong, please try again later", "error")
    }
  }
  
  return (
    <Window
      label="Create new form"
      sizeButton="44"
      icon={<FaFileMedical />}
      title="Create Form"
      description="Create a new form to start collecting responses"
    >
      <ToastContainer />
      <form onSubmit={(e) => {onSubmit(e)}} className="flex flex-col gap-4">

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input 
            type="name" 
            placeholder="" 
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setName(e.target.value)} 
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea 
            className="textarea textarea-bordered h-24" 
            placeholder=""
            onChange={(e) => setDescription(e.target.value)} 
          ></textarea>
        </label>

        <Button 
          color="primary" 
          type="submit" 
          className="w-full mt-4" 
        >
          Create
        </Button>

      </form>
    </Window>


  );
}

export default CreateFormBtn;