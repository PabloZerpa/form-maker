
"use client"
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import FormLinkShare from "@/components/FormLinkShare";
import { StatsCards } from "@/components/Stats";
import VisitBtn from "@/components/VisitBtn";
import { Form, FormSubmissions } from "@prisma/client";
import { format } from "date-fns";
import { ReactNode, useEffect, useState } from "react";
import { Badge, Checkbox, Loading } from "react-daisyui";

interface FormWithSubmissions {
  id: number;
  userId: string;
  createdAt: Date;
  published: boolean;
  name: string;
  description: string;
  content: string;
  visits: number;
  submissions: number;
  shareURL: string;
  FormSubmissions: FormSubmissions[]
}

function FormDetailsPage({ params }: { params: { id: string } }) {

  const { id } = params;
  const [form, setForm] = useState<Form>();
  const [visits, setVisits] = useState(0);
  const [submissions, setSubmissions] = useState(0);
  let submissionRate = 0;
  let bounceRate;

  async function getFormById(id: string){

    const res = await fetch(`http://localhost:3000/api/forms/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await res.json();
    setForm(data);
    setVisits(data.visits)
    setSubmissions(data.submissions);

    if (visits > 0)
      submissionRate = (submissions / visits) * 100;

    bounceRate = 100 - submissionRate;
  };

  useEffect(() => {
    getFormById(id);
  }, []);

  if (!form) {
    return <Loading size="lg" className="text-blue-600" />
  }

  return (
    <>
      <div className="py-10 border-b border-muted">

        <div className="flex justify-between gap-12 container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
        
      </div>

      <StatsCards />

      <div className="container pt-10">
        <SubmissionsTable id={16} />
      </div>
    </>
  );
};

export default FormDetailsPage;

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

const rows: Row[] = [];

function SubmissionsTable({ id }: { id: number }) {
  const [form, setForm] = useState<FormWithSubmissions>();
  let formElements: FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  async function getSubmissionsById(id: number){
    
    const res = await fetch(`http://localhost:3000/api/forms/submissions/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await res.json();
    setForm(data);

  };

  useEffect(() => {
    getSubmissionsById(id);

    if(form){

      formElements = JSON.parse(form.content) as FormElementInstance[];
  
      formElements.forEach((element) => {
        switch (element.type) {
          case "TextField":
          case "NumberField":
          case "TextAreaField":
          case "DateField":
          case "SelectField":
          case "CheckboxField":
            columns.push({
              id: element.id,
              label: element.extraAttributes?.label,
              required: element.extraAttributes?.required,
              type: element.type,
            });
            break;
          default:
            break;
        }
  
      });
      
      form.FormSubmissions.forEach((submission) => {
        const content = JSON.parse(submission.content);
        rows.push({
          ...content,
          submittedAt: submission.createdAt,
        });
      });
    }
    
  }, []);

  if (!form) {
    <Loading size="lg" className="text-blue-600" />
  }

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>

      <button onClick={() => {}}>Columns</button>

      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {columns.map((column, index) => (
                  <th key={index} scope="col" className="px-6 py-3">
                    {column.label}
                  </th>
                ))}
              </thead>
              <tbody>

                {columns.map((column, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {/* <RowCell key={column.id} type={column.type} value={rows[column.id]} />

                    <td className="text-muted-foreground text-right">
                      {formatDistance(rows.submittedAt, new Date(), { addSuffix: true })}
                    </td> */}
                  </tr>
                ))}

              </tbody>
          </table>
      </div>

    </>
  );
}


function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;

  switch (type) {
    case "DateField":
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    case "CheckboxField":
      const checked = value === "true";
      node = <Checkbox checked={checked} disabled />;
      break;
  }

  return <div>{node}</div>;
}