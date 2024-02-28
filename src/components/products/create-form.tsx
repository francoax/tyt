"use client";

import Link from "next/link";
import { Input, SelectInput } from "../inputs";
import { Button } from "../buttons";
import { useFormStatus } from "react-dom";
import { ProductDataForCreation } from "@/lib/definitions";

export default function Form({ data }: { data: ProductDataForCreation }) {
  return (
    <form action={''} className="mt-5 p-12 rounded-md divide-gray-200 bg-gray-50">
      <div className="flex justify-start gap-5 flex-wrap">
        <Input requiredInput={true} placeholder="Nombre producto" label="Nombre" htmlFor="name" name="name" errorFor="name-error"  />
        <SelectInput
          options={data.units}
          placeholder="Seleccionar tipo de unidad"
          label="Tipo de unidad"
          name="unit_id"
          htmlFor="unit_id"
          errorFor="unit_id-error"
          requiredInput={true}
        />
        <SelectInput
          options={data.categories}
          placeholder="Seleccionar categoria"
          label="Categoria"
          name="category_id"
          htmlFor="category_id"
          errorFor="category_id-error"
          requiredInput={true}
        />
        <SelectInput
          isMulti
          options={[]}
          placeholder="Seleccionar proveedores"
          label="Proveedores"
          name="suppliers"
          htmlFor="suppliers"
          errorFor="suppliers-error"
        />
      </div>
      <div className="mt-8 sm:flex sm:items-center sm:justify-end">
        <div className="sm:flex sm:items-center ">
          <Link href={'/home/products'}>
            <Button type="button">
              Cancelar
            </Button>
          </Link>
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button primary={true} type="submit" disabled={pending} aria-disabled={pending}>
      Aceptar
    </Button>
  )
}