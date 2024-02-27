'use client';

import Link from "next/link";
import { Button } from "../buttons";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "../inputs";
import { StateForm } from "@/lib/definitions";
import toast from "react-hot-toast";
import Alert from "../alerts";
import { useRouter } from "next/navigation";
import { Unit } from "@prisma/client";
import { updateUnit } from "@/lib/services/units.service";

export default function Form({ unit }: { unit: Unit }) {
  const initialState : StateForm = { message: null, errors: {}, status: false}
  const [state, formAction] = useFormState(updateUnit, initialState)
  const router = useRouter()

  if(state.status && state.message) {
    toast((t) => (
      <Alert reason='success' title="Editar tipo de unidad" description={state.message!} />
    ))

    router.push('/home/units')
  }
  if(!state.status && state.message) {
    toast((t) => (
      <Alert reason='error' title="Editar tipo de unidad" description={state.message!} />
    ))
  }

  return (
    <form action={formAction} className="mt-5 p-12 rounded-md divide-gray-200 bg-gray-50">
      <div className="flex justify-start gap-5 flex-wrap">
        <Input type="hidden" name="id" htmlFor="id" defaultValue={unit.id} />
        <Input defaultValue={unit.description} requiredInput={true} placeholder="Descripcion para tipo de unidad" label="Descripcion" htmlFor="description" name="description" state={state} errorFor="description-error"  />
      </div>
      <div className="mt-8 sm:flex sm:items-center sm:justify-end">
        <div className="sm:flex sm:items-center ">
          <Link href={'/home/units'}>
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