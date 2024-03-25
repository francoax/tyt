import { Button, ReturnButton, UpdateButton } from "@/components/buttons"
import Pagination from "@/components/pagination"
import ProductDetail, { StockMovements } from "@/components/products/detail"
import { PRODUCTS_ROUTE } from "@/lib/constants"
import { getProductById, hasPendingWithdraws } from "@/lib/data/products"
import { getAmountOfMovementsByProduct } from "@/lib/data/stock"
import { notFound } from "next/navigation"

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { page?: string, from: string, to: string  }}) {
  const { id } = params
  const product = await getProductById(Number.parseInt(id), true)

  if(!product) {
    notFound()
  }
  const hasPending = await hasPendingWithdraws(product.id)

  const currentPage = Number(searchParams?.page) || 1

  const from = searchParams.from
  const to = searchParams.to

  return (
    <>
      <ReturnButton href={PRODUCTS_ROUTE}>
        Volver
      </ReturnButton>
      <div className="sm:flex sm:flex-col sm:justify-between mt-5">
        <div className="flex gap-5 items-center">
          <h2 className="text-lg font-medium  text-gray-800">
            Detalle del producto: <span className="text-blue-400">{product?.name.toUpperCase()}</span>
          </h2>
          <UpdateButton href={`${PRODUCTS_ROUTE}/${product.id}/edit`} />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Informacion acerca del producto y sus movimientos de stock.
        </p>
        { hasPending === 1 &&
          <p className="mt-5 px-3 py-1 text-sm text-center text-red-600 bg-red-200 rounded-full">
            Retiro pendiente de confirmacion
          </p>
        }
      </div>
      <ProductDetail product={product as any} />
      <StockMovements product_id={product.id} unit={product.unit.description} currentPage={currentPage} dates={{from, to}}/>
    </>
  )
}