"use client";

import { Input, SelectInput } from "../inputs";
import { useFormState } from "react-dom";
import { Product, ProductDataForCreationEdition, SelectOption, ServerActionResponse } from "@/lib/definitions";
import toast from "react-hot-toast";
import Alert from "../alerts";
import { SUCCESS_STATUS } from "@/lib/constants";
import { Supplier } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { updateProductAction } from "@/lib/actions/products";
import Form from "../form";

export default function EditProductForm({ product, data } : { product: Product, data: ProductDataForCreationEdition}) {
  const initialState : ServerActionResponse = { message: '', status: '', errors: {} }

  const category : SelectOption = { label: product.category?.description!, value: product.category_id.toString()}
  const unit : SelectOption = { label: product.unit?.description!, value: product.category_id.toString()}

  let suppliers;
  if (!product.suppliers) {
    suppliers = (product.suppliers! as Array<Supplier>).map((s) : SelectOption => ({ label: s.name, value: s.id.toString()}))
  }

  const [state, formAction] = useFormState(updateProductAction, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.status && state.message) {
      toast(() => (
        <Alert title="Editar producto" reason={state.status} description={state.message} />
      ));
    }

    if (state.status === SUCCESS_STATUS) {
      router.push('/home/products');
    }
  }, [state, router]);

  return (
    <Form action={formAction} returnTo="/home/products">
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
        options={[
          { value: '2', label: 'test'},
          { value: '3', label: 'test2'},
          { value: '4', label: 'test3'},
          { value: '5', label: 'test4'},
          { value: '6', label: 'test4'},
          { value: '7', label: 'test4'},
          { value: '8', label: 'test4'},
          { value: '9', label: 'test4'},
          { value: '10', label: 'test4'},
          { value: '11', label: 'test4'},
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