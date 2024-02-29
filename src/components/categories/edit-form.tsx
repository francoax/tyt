'use client';

import Link from "next/link";
import { Button } from "../buttons";
import { useFormState, useFormStatus } from "react-dom";
import { updateCategory } from "@/lib/services/categories.service";
import { Input } from "../inputs";
import { ServerActionResponse } from "@/lib/definitions";
import toast from "react-hot-toast";
import Alert from "../alerts";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { useEffect } from "react";
import { SUCCESS_STATUS } from "@/lib/constants";

export default function Form({ category }: { category: Category }) {
  const initialState : ServerActionResponse = { message: '', errors: {}, status: ''}
  const [state, formAction] = useFormState(updateCategory, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.status && state.message) {
      toast(() => (
        <Alert title="Editar categoria" reason={state.status} description={state.message} />
      ));
    }

    if (state.status === SUCCESS_STATUS) {
      router.push('/home/categories');
    }
  }, [state.status, state.message, router]);

  return (
    <form action={formAction} className="mt-5 p-12 rounded-md divide-gray-200 bg-gray-50">
      <div className="flex justify-center sm:justify-start flex-wrap">
        <Input type="hidden" name="id" htmlFor="id" defaultValue={category.id} />
        <Input defaultValue={category.description} requiredInput={true} placeholder="Descripcion para categoria" label="Descripcion" htmlFor="description" name="description" state={state} errorFor="description-error"  />
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