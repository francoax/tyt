'use client';

import { Input } from "../inputs";
import { createUnitAction } from "@/lib/actions/units";
import Form from "../form";
import useFormHandler from "@/lib/hooks";
import { UNITS_ROUTE } from "@/lib/constants";

export default function CreateUnitForm() {
  const [state, formAction] = useFormHandler('Crear tipo de unidad', UNITS_ROUTE,  createUnitAction)

  return (
    <Form action={formAction} returnTo={UNITS_ROUTE}>
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