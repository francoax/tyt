'use client';

import { Input } from "../inputs";
import { createUnitAction } from "@/lib/actions/units";
import Form from "../form";
import useFormHandler from "@/lib/hooks";

export default function CreateUnitForm() {
  const [state, formAction] = useFormHandler('Crear categoria', '/home/categories',  createUnitAction)

  return (
    <Form action={formAction} returnTo="/home/units">
      <Input
        requiredInput
        placeholder="Descripcion para tipo de unidad"
        label="Descripcion"
        htmlFor="description"
        name="description"
        state={state}
        errorFor="description-error"
      />
    </Form>
  )
}