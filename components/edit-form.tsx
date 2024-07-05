"use client"
import { saveContact } from "@/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/buttons";
import { Contact } from "@prisma/client";
import { updateContact } from "@/lib/actions";

const UpdateForm = ({contact}: {contact: Contact}) => {
  const updateContactbyId = updateContact.bind(null, contact.id)
  const [state, formAction] = useFormState(updateContactbyId, null);
  return (
    <div>
      <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">Full Name</label>
          <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Full Name..." defaultValue={ contact.name }/>        
        </div>
        <div id="name-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Phone</label>
          <input type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Phone Number..." defaultValue={ contact.phone }/>
        </div>
        <div id="phone-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.Error?.phone}</p>
        </div>
        <div id="phone-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.message}</p>
        </div>
        <SubmitButton label="Update" />
     </form>
    </div>
  )
}

export default UpdateForm;