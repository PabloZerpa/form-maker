
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { formSchema, formSchemaType } from "@/schema/form";

class UserNotFoundErr extends Error {};

export async function GET() {
    try {
        const user = await currentUser();
        if (!user) {
            throw new UserNotFoundErr();
        }

        const stats = await prisma.form.aggregate({
            where: {
                userId: user.id,
            },
            _sum: {
                visits: true,
                submissions: true,
            },
        });

        const visits = stats._sum.visits || 0;
        const submissions = stats._sum.submissions || 0;

        let submissionRate = 0;

        if (visits > 0) {
            submissionRate = (submissions / visits) * 100;
        }

        const bounceRate = 100 - submissionRate;

        return NextResponse.json({
            visits,
            submissions,
            submissionRate,
            bounceRate,
        });

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }
}