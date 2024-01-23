
"use client"
import { Form } from "@prisma/client";
import { useEffect, useState } from "react";
import { Loading } from "react-daisyui";
import FormBuilder from "@/components/FormBuilder";

function BuilderPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState<Form>();
  const { id } = params;

  async function getFormById(id: string){

    const res = await fetch(`http://localhost:3000/api/forms/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    setForm(data);
  };

  useEffect(() => {
    getFormById(id);
  }, []);

  if (!form) {
    return <Loading size="lg" className="text-blue-600" />
  }
  return (
    <FormBuilder form={form} />
  );
}

export default BuilderPage;