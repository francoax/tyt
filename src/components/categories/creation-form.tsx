'use client';

import Link from "next/link";
import { Button } from "../buttons";
import { useFormState, useFormStatus } from "react-dom";
import { createCategory } from "@/lib/services/categories.service";
import { Input } from "../inputs";
import { StateForm } from "@/lib/definitions";
import toast from "react-hot-toast";
import Alert from "../alerts";
import { useRouter } from "next/navigation";

export default function Form() {
  const initialState : StateForm = { message: null, errors: {}, status: false}
  const [state, formAction] = useFormState(createCategory, initialState)
  const router = useRouter()

  if(state.status && state.message) {
    toast((t) => (
      <Alert reason='success' title="Crear categoria" description={state.message!} />
    ))

    router.push('/home/categories')
  }
  if(!state.status && state.message) {
    toast((t) => (
      <Alert reason='error' title="Crear categoria" description={state.message!} />
    ))
  }

  return (
    <form action={formAction} className="mt-5 p-12 rounded-md divide-gray-200 bg-gray-50">
      <div className="flex justify-center sm:justify-start flex-wrap">
        <Input requiredInput={true} placeholder="Descripcion para categoria" label="Descripcion" htmlFor="description" name="description" state={state} errorFor="description-error"  />
      </div>
      <div className="mt-8 sm:flex sm:items-center sm:justify-end">
        <div className="flex gap-5 justify-center sm:items-center ">
          <Link href={'/home/categories'}>
            <Button type="button">
              Cancelar
            </Button>
          </Link>
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button primary={true} type="submit" disabled={pending} aria-disabled={pending}>
      Aceptar
    </Button>
  )
}