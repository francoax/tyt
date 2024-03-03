'use client';

import { useFormState } from "react-dom";
import Form from "../form";
import { Input } from "../inputs";
import { ServerActionResponse } from "@/lib/definitions";
import { createSupplierAction } from "@/lib/actions/suppliers";
import toast from "react-hot-toast";
import Alert from "../alerts";
import { useRouter } from "next/navigation";
import { SUCCESS_STATUS } from "@/lib/constants";
import { useEffect } from "react";

export default function SupplierCreateForm() {
  const router = useRouter()

  const initialState : ServerActionResponse = { message: '', status: '', errors: {}}
  const [state, formAction] = useFormState(createSupplierAction, initialState)

  useEffect(() => {
    if (state.status && state.message) {
      toast(() => (
        <Alert title="Crear proveedor" reason={state.status} description={state.message} />
      ));
    }

    if (state.status === SUCCESS_STATUS) {
      router.push('/home/suppliers');
    }
  }, [state, router]);

  return (
    <Form action={formAction} returnTo="/home/suppliers">
      <Input
        placeholder="Nombre"
        state={state}
        requiredInput
        name="name"
        htmlFor="name"
        errorFor="name-error"
        label="Nombre"
      />
      <Input
        placeholder="Telefono"
        state={state}
        name="tel"
        htmlFor="tel"
        errorFor="tel-error"
        label="Telefono"
      />
      <Input
        placeholder="example@gmail.com"
        state={state}
        name="email"
        htmlFor="email"
        errorFor="email-error"
        label="Email"
      />
      <Input
        placeholder="Direccion"
        state={state}
        name="address"
        htmlFor="address"
        errorFor="address-error"
        label="Direccion"
      />
    </Form>
  )
}