"use client";

import { CreatableSelectInput, Input, SelectInput } from "../inputs";
import { ProductDataForCreationEdition, SelectOption } from "@/lib/definitions";
import Form from "../form";
import useFormHandler from "@/lib/hooks/useFormHandler";
import { createProductAction } from "@/lib/actions/products";
import { PRODUCTS_ROUTE } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
import { SuppliersSchema } from "@/lib/validations";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const nameField = SuppliersSchema.omit(
  { id: true, address: true, email: true, tel: true, name: true }
  )
  .extend(
    { name: z.optional(z.string().regex(RegExp("^[a-zA-Zs ]+$")).nullable()) }
  )

export default function CreateProductForm({ data }: { data: ProductDataForCreationEdition }) {
  const [state, formAction] = useFormHandler('Crear producto', PRODUCTS_ROUTE,  createProductAction)

  const [selectedOptions, setSelectedOption] = useState<SelectOption[]>();
  const [touched, setTouched] = useState(false);

  const optionMessage = useRef('')
  const labelIndexed = useRef(data.suppliers.reduce((acc: { [key: string]: string }, opt: SelectOption) => {
      acc[opt.label] = opt.label
      return acc
    }, {}));

  const checkIfValid = useDebouncedCallback((inputValue: string) => {
    if(labelIndexed.current[inputValue]) {
      optionMessage.current = 'El proveedor ya existe.'
      return false
    }

    if(inputValue) {
      const validated = nameField.safeParse({ name: inputValue })

      if(!validated.success) {
        optionMessage.current = 'El nombre es invalido para crear.'
        return false
      }

      if(validated.success) {
        return true
      }
    }

  }, 500)

  return (
    <Form action={formAction} returnTo={PRODUCTS_ROUTE}>
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
      <CreatableSelectInput
        onChange={setSelectedOption}
        onFocus={() => setTouched(true)}
        isValidNewOption={(inputValue: string) => touched ? checkIfValid(inputValue) : true}
        noOptionsMessage={({ inputValue }: { inputValue: string }) => inputValue === '' ? 'Sin opciones' : optionMessage.current }
        formatCreateLabel={((value: string) => `Crear nuevo proveedor ${value}` )}
        state={state}
        isMulti
        options={data.suppliers}
        value={selectedOptions}
        placeholder="Seleccionar proveedores"
        label="Proveedores"
        helpMessage="Ingresar nombre de proveedor si se desea crear."
        name="suppliers"
        htmlFor="suppliers"
        errorFor="suppliers-error"
      />
    </Form>
  )
}