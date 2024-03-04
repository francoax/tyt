'use client';

import { useFormState } from "react-dom";
import { updateCategoryAction } from "@/lib/actions/categories";
import { Input } from "../inputs";
import { ServerActionResponse } from "@/lib/definitions";
import toast from "react-hot-toast";
import Alert from "../alerts";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { useEffect } from "react";
import { SUCCESS_STATUS } from "@/lib/constants";
import Form from "../form";

export default function EditCategoryForm({ category }: { category: Category }) {
  const initialState : ServerActionResponse = { message: '', errors: {}, status: ''}
  const [state, formAction] = useFormState(updateCategoryAction, initialState)
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
  }, [state, router]);

  return (
    <Form action={formAction} returnTo="/home/categories">
      <Input type="hidden" name="id" htmlFor="id" defaultValue={category.id} />
      <Input
        defaultValue={category.description}
        requiredInput={true}
        placeholder="Descripcion para categoria"
        label="Descripcion"
        htmlFor="description"
        name="description"
        state={state}
        errorFor="description-error"  />
    </Form>
  )
}