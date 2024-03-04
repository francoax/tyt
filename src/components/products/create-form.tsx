"use client";

import { Input, SelectInput } from "../inputs";
import { useFormState } from "react-dom";
import { ProductDataForCreationEdition, ServerActionResponse } from "@/lib/definitions";
import { createProductAction } from "@/lib/actions/products";
import toast from "react-hot-toast";
import Alert from "../alerts";
import { SUCCESS_STATUS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Form from "../form";

export default function CreateProductForm({ data }: { data: ProductDataForCreationEdition }) {
  const initialState : ServerActionResponse = { message: '', status: '', errors: {} }

  const [state, formAction] = useFormState(createProductAction, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.status && state.message) {
      toast(() => (
        <Alert title="Crear producto" reason={state.status} description={state.message} />
      ));
    }

    if (state.status === SUCCESS_STATUS) {
      router.push('/home/products');
    }
  }, [state, router]);

  return (
    <Form action={formAction} returnTo="/home/products">
        <Input requiredInput={true} state={state} placeholder="Nombre producto" label="Nombre" htmlFor="name" name="name" errorFor="name-error"  />
        <SelectInput
          state={state}
          options={data.units}
          placeholder="Seleccionar tipo de unidad"
          label="Tipo de unidad"
          name="unit_id"
          htmlFor="unit_id"
          errorFor="unit_id-error"
          requiredInput={true}
        />
        <SelectInput
          state={state}
          options={data.categories}
          placeholder="Seleccionar categoria"
          label="Categoria"
          name="category_id"
          htmlFor="category_id"
          errorFor="category_id-error"
          requiredInput={true}
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