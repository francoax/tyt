'use client';

import Form from "@/components/form";
import { Input, SelectInput, TextareaInput } from "@/components/inputs";
import { depositAction } from "@/lib/actions/stock";
import { Product, SelectOption } from "@/lib/definitions";
import useFormHandler from "@/lib/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function DepositForm(
  { product } : { product: Product }
) {
  const [state, formAction] = useFormHandler(
    'Ingresat stock',
    '/home',
    depositAction
  )

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [stockAfter, setStockAfter] = useState<number>(product.stock)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    params.set('stock_before', product.stock.toString())
    const amount = Number.parseInt(params.get('amount_involved') ?? '0')
    params.set('stock_after', (amount + product.stock).toString())
    setStockAfter(amount + product.stock)

    replace(`${pathname}?${params.toString()}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handlePreviewDeposit = useDebouncedCallback(({input, value} : { input: string, value: string }) => {
    const params = new URLSearchParams(searchParams)

    if(value) {
      params.set(input, value)
    } else {
      params.delete(input)
    }

    replace(`${pathname}?${params.toString()}`)
  }, 500)

  const suppliersOptions : SelectOption[] = product.suppliers!.map(s => ({ value: s.id.toString(), label: s.name }))

  return (
    <Form action={formAction} returnTo="/home"
      textarea={<TextareaInput
        name="description"
        htmlFor="description"
        errorFor="description"
        state={state}
        label="Descripcion"
        placeholder="Agregue una descripcion para explicar el ingreso de stock si lo ve necesario."
      />}
    >
      <Input className="hidden" defaultValue={product.id} type="hidden" name="product_id" htmlFor="product_id" />
      <Input className="hidden" defaultValue={product.stock} type="hidden" name="stock_before" htmlFor="stock_before" />
      <Input className="hidden" defaultValue={stockAfter} type="hidden" name="stock_after" htmlFor="stock_after" />
      <Input
        name="amount_involved"
        htmlFor="amount_involved"
        errorFor="amount_involved-error"
        state={state}
        requiredInput
        label="Cantidad"
        placeholder={`100 ${product.unit?.description}`}
        onChange={(e) => handlePreviewDeposit({input: 'amount_involved', value: e.target.value})}
      />
      <Input
        name="dollar_at_date"
        htmlFor="dollar_at_date"
        errorFor="dollar_at_date-error"
        state={state}
        requiredInput
        label="Dolar a la fecha (USD$)"
        placeholder="USD$1,000"
        onChange={(e) => handlePreviewDeposit({input: 'dollar_at_date', value: e.target.value})}
      />
      <Input
        name="total_price"
        htmlFor="total_price"
        errorFor="total_price-error"
        state={state}
        requiredInput
        label="Total por ingreso (USD$)"
        placeholder="USD$10,000"
        onChange={(e) => handlePreviewDeposit({input: 'total_price', value: e.target.value})}
      />
      <SelectInput
        name="supplier_vendor"
        htmlFor="supplier_vendor"
        errorFor="supplier_vendor-error"
        state={state}
        label="Proveedor comprado"
        placeholder="Seleccione el proveedor"
        options={suppliersOptions}
      />
      <SelectInput
        name="workplace"
        htmlFor="workplace"
        errorFor="workplace-error"
        state={state}
        label="Lugar destinado"
        placeholder="Seleccione un lugar"
      />
      <Input
        name="budget_number"
        htmlFor="budget_number"
        errorFor="budget_number-error"
        state={state}
        label="Numero de presupuesto"
        placeholder="#123"
      />
    </Form>
  )
}