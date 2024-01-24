
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { formSchema } from "@/schema/form";

class UserNotFoundErr extends Error {};

export async function GET() {
    try {
        
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

        const form = await prisma.form.create({
            data: {
                userId: user.id,
                name,
                description,
            },
        });
        
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

        await prisma.form.update({
            where: {
              userId: user.id,
              id,
            },
            data: {
              content: elements,
            },
        });

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
