"use client";

import { Input, SelectInput } from "../inputs";
import { ProductDataForCreationEdition } from "@/lib/definitions";
import Form from "../form";
import useFormHandler from "@/lib/hooks";
import { createProductAction } from "@/lib/actions/products";

export default function CreateProductForm({ data }: { data: ProductDataForCreationEdition }) {
  const [state, formAction] = useFormHandler('Crear producto', '/home/products',  createProductAction)

  return (
    <Form action={formAction} returnTo="/home/products">
      <Input
        requiredInput
        state={state}
        placeholder="Nombre producto"
        label="Nombre"
        htmlFor="name"
        name="name"
        errorFor="name-error"
      />
      <SelectInput
        state={state}
        options={data.units}
        placeholder="Seleccionar tipo de unidad"
        label="Tipo de unidad"
        name="unit_id"
        htmlFor="unit_id"
        errorFor="unit_id-error"
        requiredInput
      />
      <SelectInput
        state={state}
        options={data.categories}
        placeholder="Seleccionar categoria"
        label="Categoria"
        name="category_id"
        htmlFor="category_id"
        errorFor="category_id-error"
        requiredInput
      />
      <SelectInput
        state={state}
        isMulti
        options={[
          { value: '2', label: 'test'},
          { value: '3', label: 'test2'},
          { value: '4', label: 'test3'},
          { value: '5', label: 'test4'},
        ]}
        placeholder="Seleccionar proveedores"
        label="Proveedores"
        name="suppliers"
        htmlFor="suppliers"
        errorFor="suppliers-error"
      />
    </Form>
  )
}