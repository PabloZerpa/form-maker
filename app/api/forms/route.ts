
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { formSchema } from "@/schema/form";

class UserNotFoundErr extends Error {};

export async function GET() {
    try {
        console.log('QUE PASO!');
        
        const user = await currentUser();
        if (!user) {
            throw new UserNotFoundErr();
        }

        const forms = await prisma.form.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        console.log(forms);

        return NextResponse.json(forms);

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }
}

export async function POST(req: Request) {
    try {
        console.log('QUE PASO!');
        const data = await req.json();

        const validation = formSchema.safeParse(data);
        if (!validation.success) {
            throw new Error("form not valid");
        }

        const user = await currentUser();
        if (!user) {
            throw new UserNotFoundErr();
        }

        const { name, description } = data;
        console.log(name, description);

        const form = await prisma.form.create({
            data: {
                userId: user.id,
                name,
                description,
            },
        });

        console.log(form);
        
        if (!form) {
            throw new Error("something went wrong");
        }

        return NextResponse.json(form.id);
        
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }
}

export async function PUT(request: Request) {
    try {
        const { id, jsonElements } = await request.json();
        const elements: string = jsonElements;

        const user = await currentUser();
        if (!user) {
            throw new UserNotFoundErr();
        }
        
        console.log(id);
        console.log(elements);

        await prisma.form.update({
            where: {
              userId: user.id,
              id,
            },
            data: {
              content: elements,
            },
        });

        console.log('form');
        return NextResponse.json(id);
        
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }
}
