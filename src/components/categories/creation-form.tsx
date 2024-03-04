'use client';

import { useFormState } from "react-dom";
import { createCategoryAction } from "@/lib/actions/categories";
import { Input } from "../inputs";
import { ServerActionResponse } from "@/lib/definitions";
import toast from "react-hot-toast";
import Alert from "../alerts";
import { SUCCESS_STATUS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Form from "../form";


export default function CreateCategoryForm() {
  const initialState : ServerActionResponse = { message: '', status: '', errors: {}}
  const [state, formAction] = useFormState(createCategoryAction, initialState)

  const router = useRouter()

  useEffect(() => {
    if (state.status && state.message) {
      toast(() => (
        <Alert title="Crear categoria" reason={state.status} description={state.message} />
      ));
    }

    if (state.status === SUCCESS_STATUS) {
      router.push('/home/categories');
    }
  }, [state, router]);

  return (
    <Form action={formAction} returnTo="/home/categories">
      <Input
        requiredInput={true}
        placeholder="Descripcion para categoria"
        label="Descripcion"
        htmlFor="description"
        name="description"
        state={state}
        errorFor="description-error"
      />
    </Form>
  )
}