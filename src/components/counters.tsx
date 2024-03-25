import { getAmountOfProducts } from "@/lib/data/products"
import { getAmountOfPendingWithdraws } from "@/lib/data/stock"

export async function WithdrawsPendingCounter() {

  const withdrawsPending = await getAmountOfPendingWithdraws()

  if(withdrawsPending === 0) {
    return null
  }

  return (
    <span className="px-3 py-1 text-xs text-red-600 bg-red-200 rounded-full">
      {withdrawsPending} retiros pendientes
    </span>
  )
}

export async function ProductsCounter() {
  const productsAmount = await getAmountOfProducts()

  if(productsAmount === 0) {
    return null
  }

  return (
    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
      {productsAmount} productos
    </span>
  )
}