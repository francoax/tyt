'use client';

import Form from "@/components/form";
import { Input } from "@/components/inputs";
import useFormHandler from "@/lib/hooks";

export default function DepositForm() {
  // const [state, formAction] = useFormHandler()
  return (
    <Form action='' returnTo="/home">
      <Input
        requiredInput
        label="Cantidad"
        placeholder="100 paquetes..."
      />
      <Input
        requiredInput
        label="Dolar a la fecha (USD$)"
        placeholder="USD$1,000"
      />
      <Input
        requiredInput
        label="Total por ingreso (ARS$)"
        placeholder="ARS$100.000"
      />
    </Form>
  )
}