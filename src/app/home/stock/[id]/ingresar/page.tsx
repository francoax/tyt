'use client'

import Form from "@/components/form"
import { Input } from "@/components/inputs"
import { DepositPreview } from "@/components/stock/action-preview"

export default function Page({ params }: { params: { id: string }}) {
  const { id } = params
  return (
    <>
      <p>{id}</p>
      <div>
        <h2 className="text-lg font-medium  text-gray-800">Ingresar stock para el producto</h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>
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
      <h2 className="text-lg font-medium  text-gray-800">Previsualizacion</h2>
      <DepositPreview />
    </>
  )
}