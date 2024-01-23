
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

class UserNotFoundErr extends Error {};

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const user = await currentUser();

        if (!user) {
            throw new UserNotFoundErr();
        }

        const form = await prisma.form.findUnique({
            where: {
              userId: user.id,
              id,
            },
            include: {
              FormSubmissions: true,
            },
        });

        return NextResponse.json(form);

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }
};