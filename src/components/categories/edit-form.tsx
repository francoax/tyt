'use client';

import { updateCategoryAction } from "@/lib/actions/categories";
import { Input } from "../inputs";
import { Category } from "@prisma/client";
import Form from "../form";
import useFormHandler from "@/lib/hooks";
import { CATEGORIES_ROUTE } from "@/lib/constants";

export default function EditCategoryForm({ category }: { category: Category }) {
  const [state, formAction] = useFormHandler('Editar categoria', CATEGORIES_ROUTE,  updateCategoryAction)

  return (
    <Form action={formAction} returnTo={CATEGORIES_ROUTE}>
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