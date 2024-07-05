"use client"
import Link from "next/link"
import { useFormStatus } from "react-dom";
import { IoAddSharp, IoPencil, IoTrashOutline } from "react-icons/io5"
import { clsx } from "clsx";
import { deleteContact } from "@/lib/actions";

export const CreateButton = () => {
    return (
        <Link 
       href="/contacts/create"
       className="inline-flex items-center space-x-1 text-white bg-blue-700 hover:bg-blue-800 px-5 py-[9px] rounded-sm text-sm">
        <IoAddSharp size={20} />
        Create
    </Link>
    );    
};

export const EditButton = ({id}:{id:string}) => {
    return (
        <Link 
       href={`/contacts/edit/${id}`}
       className="rounded-sm border p-1 hover:bg-gray-100">
        <IoPencil size={20} />
    </Link>
    );    
};
export const DeleteButton = ({id}:{id:string}) => {
    const deleteContactbyId = deleteContact.bind(null, id)
    return (
        <form action={ deleteContactbyId }>
            <button className="rounded-sm border p-1 hover:bg-gray-100">
            <IoTrashOutline size={20} />
            </button>
        </form>
    );    
};

export const SubmitButton = ({label}:{label: string}) => {
    const { pending } = useFormStatus();
    const ubahStyle = clsx("text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-3 text-center",
        {
            "opacity-50 cursor-progress" : pending
        }
    );
    return (
        <button type="submit" className={ ubahStyle } disabled={ pending }>
            {label === "Save"? (
                <span>{pending?"Saving...":"Save"}</span>
            ):(
                <span>{pending?"Updating...":"Update"}</span>
            )}
        </button>
    )
}s