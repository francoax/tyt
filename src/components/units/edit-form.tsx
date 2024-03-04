'use client';

import { Input } from "../inputs";
import { Unit } from "@prisma/client";
import { updateUnitAction } from "@/lib/actions/units";
import Form from "../form";
import useFormHandler from "@/lib/hooks";

export default function EditUnitForm({ unit }: { unit: Unit }) {
const [state, formAction] = useFormHandler('Crear categoria', '/home/categories',  updateUnitAction)

  return (
    <Form action={formAction} returnTo="/home/units">
      <Input type="hidden" name="id" htmlFor="id" defaultValue={unit.id} />
      <Input
        defaultValue={unit.description}
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