'use client';

import { createCategoryAction } from "@/lib/actions/categories";
import { Input } from "../inputs";
import Form from "../form";
import useFormHandler from "@/lib/hooks";


export default function CreateCategoryForm() {
  const [state, formAction] = useFormHandler('Crear categoria', '/home/categories',  createCategoryAction)

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