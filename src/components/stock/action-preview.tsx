'use client';

import { format } from "date-fns"
import { useSearchParams } from "next/navigation";
import { ConfirmButton } from "../products/buttons";

export function DepositPreview({ unit }: { unit: string })
{
  const searchParams = useSearchParams()

  return (
    <div className="flex flex-col mt-6">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Accion
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Fecha
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Antes ({unit})
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Cantidad ({unit})
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Despues ({unit})
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Dolar a la fecha (USD$)
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Total (ARS$)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className='bg-emerald-200/50'>
                  <td className="px-4 py-4 uppercase text-sm font-medium text-gray-700 whitespace-nowrap">
                    INGRESO
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {format(Date.now(), 'dd/MM/yyyy HH:mm a')}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {searchParams.get('stock_before')}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {searchParams.get('amount_involved') ?? 0}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {searchParams.get('stock_after')}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    USD{Number.parseInt(searchParams.get('dollar_at_date') ?? '0')?.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2})}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    ARS{Number.parseInt(searchParams.get('total_price') ?? '0')?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WithdrawPreview({ unit } : { unit: string }) {
  const searchParams = useSearchParams()

  return (
    <div className="flex flex-col mt-6">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Accion
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Fecha
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Antes ({unit})
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Cantidad ({unit})
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Despues ({unit})
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
                    Estado
                  </th>
                  <th scope="col" className="relative py-3.5 px-4">
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className=''>
                  <td className="px-4 py-4 uppercase text-sm font-medium text-gray-700 whitespace-nowrap">
                    RETIRO
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {format(Date.now(), 'dd/MM/yyyy HH:mm a')}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {searchParams.get('stock_before')}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {searchParams.get('amount_involved') ?? 0}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {searchParams.get('stock_after')}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-center text-gray-700 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs text-center text-red-600 bg-red-200 rounded-full">
                      Pendiente de confirmacion
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <ConfirmButton />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WithdrawConfirmPreview({ unit }: { unit: string }) {
  const searchParams = useSearchParams()

  return (
    <div className="flex flex-col mt-6">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Accion
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Fecha
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Antes de retirar ({unit})
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Cantidad retirada ({unit})
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Usado ({unit})
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                    Despues actual ({unit})
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className='bg-orange-200/50'>
                  <td className="px-4 py-4 uppercase text-sm font-medium text-gray-700 whitespace-nowrap">
                    RETIRO
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {format(Date.now(), 'dd/MM/yyyy HH:mm a')}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {searchParams.get('stock_before')}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {searchParams.get('amount_involved') ?? 0}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {searchParams.get('real_amount_used') ?? 0}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {searchParams.get('stock_after')}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-center text-gray-700 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs text-center text-slate-600 bg-emerald-200 rounded-full">
                      Ok
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}