'use client';

import Form from "@/components/form";
import { Input, SelectInput, TextareaInput } from "@/components/inputs";
import { depositAction } from "@/lib/actions/stock";
import { SUPPLIERS_ROUTE, WORKPLACES_ROUTE } from "@/lib/constants";
import { Product, SelectOption, Workplace } from "@/lib/definitions";
import useFormHandler from "@/lib/hooks/useFormHandler";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function DepositForm(
  { product, workplaces } : { product: Product, workplaces: Workplace[] }
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

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handlePreviewDeposit = useDebouncedCallback(({input, value} : { input: string, value: string }) => {
    const params = new URLSearchParams(searchParams)

    if(value) {
      params.set(input, value)
    } else {
      params.delete(input)
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, 500)

  const suppliersOptions : SelectOption[] = product.suppliers!.map(s => ({ value: s.id.toString(), label: s.name }))
  const workplaceOptions : SelectOption[] = workplaces.map(w => ({ value: w.id.toString(), label: w.name}))

  return (
    <Form action={formAction} returnTo="/home"
      textarea={<TextareaInput
        name="description"
        htmlFor="description"
        errorFor="description"
        state={state}
        label="Descripcion"
        placeholder="Agregue una descripcion por el ingreso de stock si lo ve necesario."
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
      <Input
        name="budget_id"
        htmlFor="budget_id"
        errorFor="budget_id-error"
        state={state}
        label="Identificador de presupuesto"
        placeholder="#123"
      />
      <SelectInput
        name="supplier_vendor"
        htmlFor="supplier_vendor"
        errorFor="supplier_vendor-error"
        state={state}
        label="Proveedor comprado"
        placeholder="Seleccione el proveedor"
        options={suppliersOptions}
        helpMessage={
        <>
          Si no esta su proveedor, creelo haciendo click en <Link className="text-blue-500" href={`${SUPPLIERS_ROUTE}/create`}>Crear.</Link>
        </>
        }
        isClearable
      />
      <SelectInput
        name="workplace"
        htmlFor="workplace"
        errorFor="workplace-error"
        state={state}
        label="Empresa destinada"
        placeholder="Seleccione una empresa"
        options={workplaceOptions}
        helpMessage={
        <>
          Si no esta listada la empresa, creela haciendo click en <Link className="text-blue-500" href={`${WORKPLACES_ROUTE}/create`}>Crear.</Link>
        </>
        }
        isClearable
      />
    </Form>
  )
}