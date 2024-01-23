
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

class UserNotFoundErr extends Error {};

export async function GET(req: Request, { params }: { params: { formUrl: string } }) {
    try {
        const formUrl = params.formUrl;
        const user = await currentUser();

        if (!user) {
            throw new UserNotFoundErr();
        }

        const form = await prisma.form.update({
            select: {
              content: true,
            },
            data: {
              visits: {
                increment: 1,
              },
            },
            where: {
              shareURL: formUrl,
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


export async function PUT(req: Request, { params }: { params: { formUrl: string } }) {
  try {
      const formUrl = params.formUrl;
      const content = await req.json();

      const form = await prisma.form.update({
          data: {
            submissions: {
              increment: 1,
            },
            FormSubmissions: {
              create: {
                content,
              },
            },
          },
          where: {
            shareURL: formUrl,
            published: true,
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