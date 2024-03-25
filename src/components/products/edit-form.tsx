"use client";

import { Input, SelectInput } from "../inputs";
import { Product, ProductDataForCreationEdition, SelectOption } from "@/lib/definitions";
import { Supplier } from "@prisma/client";
import { updateProductAction } from "@/lib/actions/products";
import Form from "../form";
import useFormHandler from "@/lib/hooks/useFormHandler";
import { PRODUCTS_ROUTE } from "@/lib/constants";

export default function EditProductForm({ product, data } : { product: Product, data: ProductDataForCreationEdition}) {
  const [state, formAction] = useFormHandler('Editar producto', PRODUCTS_ROUTE,  updateProductAction)

  const category : SelectOption = { label: product.category?.description!, value: product.category_id.toString()}
  const unit : SelectOption = { label: product.unit?.description!, value: product.unit?.id.toString()!}

  let suppliers : SelectOption[] = [];
  if(product.suppliers) {
    suppliers = product.suppliers.map(s => ({ label: s.name, value: s.id.toString() }))
  }

  return (
    <Form action={formAction} returnTo={PRODUCTS_ROUTE}>
      <Input className="hidden" type="hidden" name="id" htmlFor="id" defaultValue={product.id} />
      <Input
        state={state}
        defaultValue={product.name}
        requiredInput
        placeholder="Nombre producto"
        label="Nombre"
        htmlFor="name"
        name="name"
        errorFor="name-error"
      />
      <SelectInput
        state={state}
        defaultValue={category}
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
        defaultValue={unit}
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
        isMulti
        defaultValue={suppliers}
        options={data.suppliers}
        placeholder="Seleccionar proveedores"
        label="Proveedores"
        name="suppliers"
        htmlFor="suppliers"
        errorFor="suppliers-error"
      />
    </Form>
  )
}