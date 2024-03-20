"use client";

import { SM_DEPOSIT, SM_WITHDRAW } from "@/lib/constants";
import { Product, StockMovement } from "@/lib/definitions";
import clsx from "clsx";
import { format } from "date-fns";
import { ConfirmWithdrawButton } from "../stock/buttons";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "../buttons";
import Modal from "../modal";
import { useState } from "react";

export default function ProductDetail({ product }: { product: Product}) {
  return (
    <section className="flex items-center justify-between sm:justify-evenly flex-wrap gap-5 mt-5 p-6 rounded-md divide-gray-200 bg-gray-50">
      <div>
        <span className="mt-4 text-lg font-normal text-gray-500">ID</span>
        <p className="mt-2 text-blue-500 uppercase">{product.id}</p>
      </div>
      <div>
        <span className="mt-4 text-lg font-normal text-gray-500">Nombre</span>
        <p className="mt-2 text-blue-500 uppercase">{product.name}</p>
      </div>
      <div>
        <span className="mt-4 text-lg font-normal text-gray-500">Categoria</span>
        <p className="mt-2 text-blue-500 uppercase">{product.category?.description}</p>
      </div>
      <div>
        <span className="mt-4 text-lg font-normal text-gray-500">Unidad</span>
        <p className="mt-2 text-blue-500 uppercase">{product.unit?.description}</p>
      </div>
      <div>
        <span className="mt-4 text-lg font-normal text-gray-500">Proveedores</span>
        {product.suppliers?.length === 0 &&
          <p className="mt-2 text-sm text-gray-500">Sin Proveedores</p>
        }
        {product.suppliers?.map((s, k) => (
          <p key={k} className="mt-2 text-blue-500 capitalize">{s.name}</p>
        ))}
      </div>
    </section>
  )
}

export function StockMovements({ product }: { product: Product }) {
  return (
    <>
      <div id="movimientos">
        <h2 className="mt-5 text-lg font-medium text-gray-800">
          Movimientos de stock
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Aquellos retiros que esten pendientes, seran marcados como. Una vez confirmado, se podra volver a retirar.
        </p>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <StockMovementsTable movements={product.stock_movements!} unit={product.unit?.description!}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


function StockMovementsTable({ movements, unit }: { movements: StockMovement[], unit: string }) {

  if(movements.length === 0) {
    return (
      <p className="text-center text-gray-700">Sin movimientos de stock por el momento.</p>
    )
  }

  return (
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
            Cantidad
          </th>
          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
            Usado
          </th>
          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
            Dolar a la fecha (USD$)
          </th>
          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
            Total (USD$)
          </th>

          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
            Estado
          </th>

          <th scope="col" className="relative py-3.5 px-4">
          </th>
          <th scope="col" className="relative py-3.5 px-4">
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {movements.map((m, k) => (
          <TableRow key={k} movement={m} unit={unit} />
        ))}
      </tbody>
    </table>
  )
}

function TableRow({ movement, unit }: { movement: StockMovement, unit: string }) {
  const actions = {
    DEPOSIT: 'Ingreso',
    WITHDRAW: 'Retiro'
  }

  const dollar_at_date = movement.dollar_at_date
    ?
      <>
        USD{movement.dollar_at_date?.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2})}
      </>
    :
      '-'
  const total_price = movement.total_price
    ?
      <>
        USD{movement.dollar_at_date?.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2})}
      </>
    :
      '-'

  const isPending = movement.type_action === SM_WITHDRAW && movement.real_amount_used === null

  const state = () => {
    if(isPending) {
      return (
        <>
          <span className="px-3 py-1 text-xs text-center text-red-600 bg-red-200 rounded-full">
            Pendiente de confirmacion
          </span>
        </>
      )
    } else {
      return (
        <>
          <span className="px-3 py-1 text-xs text-center text-slate-600 bg-emerald-200 rounded-full">
            Ok
          </span>
        </>
      )
    }
  }

  const [show, showModal] = useState(false)

  return (
    <>
      <tr className={clsx(
        {
          'bg-emerald-200/50' : movement.type_action === SM_DEPOSIT
        },
        {
          'bg-orange-200/50': movement.type_action === SM_WITHDRAW && (movement.real_amount_used !== null)
        }
      )}>
        <td className="px-4 py-4 uppercase text-sm font-medium text-gray-700 whitespace-nowrap">
          {actions[movement.type_action]}
        </td>

        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          {format(movement.date_action, 'dd/MM/yyyy HH:mm a')}
        </td>

        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          {movement.amount_involved} {unit}
        </td>

        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          {movement.real_amount_used !== null ? <> {movement.real_amount_used} {unit}</> : '-' }
        </td>

        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          {dollar_at_date}
        </td>

        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          {total_price}
        </td>

        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          {state()}
        </td>

        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          {isPending && <ConfirmWithdrawButton productId={movement.product_id} movementId={movement.id} />}
        </td>

        <td className="text-sm font-medium text-gray-700 whitespace-nowrap">
          <Button onClick={() => showModal(true)} primary type="button" className="transition-colors duration-200 hover:text-gray-200 focus:outline-none">
            <div className="flex">
              Mas info <InformationCircleIcon className="w-5 text-gray-50" />
            </div>
          </Button>
        </td>
      </tr>

      <Modal
        title={`${actions[movement.type_action]} del dia ${format(movement.date_action, 'dd/MM/yyyy HH:mm a')}`}
        show={show}
      >
        <div className="space-y-3">
          <div className="max-w-lg text-wrap">
            <span className="text-gray-700 font-medium">Descripcion</span>
            <p>
              {movement.description ?? "No especificado"}
            </p>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Identificador de presupuesto</span>
            <p>
              {movement.budget_id ?? "No especificado"}
            </p>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Proveedor comprado</span>
            <p>
              {movement.supplier?.name ?? "No especificado"}
            </p>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Empresa destinada</span>
            <p>
              {movement.workplace?.name ?? "No especificado"}
            </p>
          </div>
          <div>
            <span className="text-gray-700 font-medium">Movimiento de stock</span>
            <div className="flex items-center gap-5 flex-wrap">
              <p>
                Antes: {movement.stock_before} {unit}
              </p>
              <p>
                Despues: {movement.stock_after} {unit}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 p-4">
          <Button type="button" onClick={() => showModal(false)}>
            Cerrar
          </Button>
        </div>
      </Modal>
    </>
  )
}