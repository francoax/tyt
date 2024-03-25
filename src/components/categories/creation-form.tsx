'use client';

import { createCategoryAction } from "@/lib/actions/categories";
import { Input } from "../inputs";
import Form from "../form";
import useFormHandler from "@/lib/hooks/useFormHandler";
import { CATEGORIES_ROUTE } from "@/lib/constants";


export default function CreateCategoryForm() {
  const [state, formAction] = useFormHandler('Crear categoria', CATEGORIES_ROUTE,  createCategoryAction)

  return (
    <Form action={formAction} returnTo={CATEGORIES_ROUTE}>
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