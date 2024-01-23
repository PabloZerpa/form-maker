
"use client"
import React, { useEffect, useState } from "react";
import { FormElementInstance } from "@/components/FormElements";
import { Form } from "@prisma/client";
import { Loading } from "react-daisyui";
import FormSubmitComponent from "@/components/FormSubmitComponent";

function SubmitPage({ params }: { params: { formUrl: string }; }) {

    const { formUrl } = params;
    const [form, setForm] = useState<Form>();

    async function getFormByUrl(formUrl: string){
      
      const res = await fetch(`http://localhost:3000/api/forms/url/${formUrl}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await res.json();
      setForm(data);
      console.log(data); 
    };
    
      useEffect(() => {
        getFormByUrl(formUrl);
      }, []);
    

    if (!form) {
        // throw new Error("form not found");
        return <Loading size="lg" className="text-blue-600" />
    }

    const formContent = JSON.parse(form.content) as FormElementInstance[];

    return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
}

export default SubmitPage;