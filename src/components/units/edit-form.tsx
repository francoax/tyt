'use client';

import { useFormState } from "react-dom";
import { Input } from "../inputs";
import { ServerActionResponse } from "@/lib/definitions";
import toast from "react-hot-toast";
import Alert from "../alerts";
import { useRouter } from "next/navigation";
import { Unit } from "@prisma/client";
import { updateUnitAction } from "@/lib/actions/units";
import { useEffect } from "react";
import { SUCCESS_STATUS } from "@/lib/constants";
import Form from "../form";

export default function EditUnitForm({ unit }: { unit: Unit }) {
  const initialState : ServerActionResponse = { message: '', errors: {}, status: ''}
  const [state, formAction] = useFormState(updateUnitAction, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.status && state.message) {
      toast(() => (
        <Alert title="Editar tipo de unidad" reason={state.status} description={state.message} />
      ));
    }

    if (state.status === SUCCESS_STATUS) {
      router.push('/home/units');
    }
  }, [state, router]);

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