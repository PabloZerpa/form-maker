"use client";

import { Form } from "@prisma/client";
import { useEffect, useState } from "react";
import { Badge, Button, Card, Skeleton } from "react-daisyui";
import { FaEdit, FaEye, FaWpforms, FaArrowRight } from "react-icons/fa";
import { formatDistance } from "date-fns";
import Link from "next/link";

function FormCards() {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getForms(){
        const res = await fetch('http://localhost:3000/api/forms', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setForms(data);
        setLoading(false);
        return data;
    }

    useEffect(() => {
        getForms();
    }, []);

    return (
        <>
            {loading ? 
                (
                    <div className="flex flex-wrap gap-8 w-[960px]">
                        <Skeleton className="w-64 h-56"></Skeleton>
                        <Skeleton className="w-64 h-56"></Skeleton>
                        <Skeleton className="w-64 h-56"></Skeleton>
                    </div>
                ) : 
                (
                    <div className="flex flex-wrap md:justify-start justify-center md:items-start items-center gap-8 w-[960px]">
                        {forms?.map((form: Form) => (
                            <FormCard key={form.id} form={form} />
                        ))}
                    </div>
                )
            }

        </>
    );
}
 
function FormCard({ form }: { form: Form }){
    return(
        <Card className="bg-slate-900 w-64 h-56" >
            <Card.Body>
                <Card.Title tag="h2">
                    {form.name}
                </Card.Title>
                <div className="flex justify-between">
                    {formatDistance(form.createdAt, new Date(), {
                        addSuffix: true,
                    })}
                    {form.published && (
                        <span className="flex items-center gap-2">
                            <FaEye className="text-muted-foreground" />
                        <span>{form.visits.toLocaleString()}</span>
                            <FaWpforms className="text-muted-foreground" />
                        <span>{form.submissions.toLocaleString()}</span>
                        </span>
                    )}
                </div>

                {!form.published && <Badge color="error">Draft</Badge>}
                {form.published && <Badge color="success">Published</Badge>}

                <p>{form.description || "No description"}</p>

                <Card.Actions className="justify-center">
                    {form.published && (
                        <Button color="primary" className="" >
                            <Link href={`/forms/${form.id}`} className="flex gap-1">
                                Submissions <FaArrowRight />
                            </Link>
                        </Button>
                    )}
                    {!form.published && (
                        <Button color="primary">
                            <Link href={`/builder/${form.id}`} className="" >
                                <div className="flex gap-1">
                                    Edit form <FaEdit />
                                </div>
                            </Link>
                        </Button>
                    )}
                </Card.Actions>
                
            </Card.Body>
        </Card>
    );
}

export default FormCards;