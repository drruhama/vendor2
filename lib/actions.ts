"use server";

import { error } from "console";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const ContactSchema = z.object({
    name: z.string().min(6),
    phone: z.string().min(11),
});

export const saveContact = async (prevState: any, formData: FormData) => {
    const validatedFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.contact.create({
            data: {
                name: validatedFields.data.name,
                phone: validatedFields.data.phone,
            }
        });
    } catch (error) {
        return {
            message: "Failed to create contact bro"
        };
    }
    revalidatePath("/contacts");
    redirect("/contacts");
}; 

export const updateContact = async (id: string, prevState: any, formData: FormData) => {
    const validatedFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.contact.update({
            data: {
                name: validatedFields.data.name,
                phone: validatedFields.data.phone,
            }, where: {id}
        });
    } catch (error) {
        return {
            message: "Failed to udate contact bro"
        };
    }
    revalidatePath("/contacts");
    redirect("/contacts");
}; 

export const deleteContact = async (id: string) => {
    try {
        await prisma.contact.delete({
             where: {id}
        });
    } catch (error) {
        return {
            message: "Failed to delete contact bro"
        };
    }
    revalidatePath("/contacts");
}; 