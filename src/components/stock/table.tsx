import { getDataForStockTable } from "@/lib/data/stock"
import { DetailProduct } from "../products/buttons"
import { StockDataFormatted } from "@/lib/definitions"
import { format } from "date-fns"
import { hasPendingWithdraws } from "@/lib/data/products"

export default async function StockTable() {
  const dataTable = await getDataForStockTable()

  if(dataTable.length === 0) {
    return (
      <p>Sin productos por el momento...</p>
    )
  }


  return (
    <table className="min-w-full divide-y divide-gray-200 ">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
            Producto
          </th>

          <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
            Stock Actual
          </th>

          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
            Ultimo movimiento
          </th>

          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
            Estado
          </th>

          <th scope="col" className="relative py-3.5 px-4">
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {dataTable.map((data, key) => (
          <TableRow stockProduct={data} key={key} />
        ))}
      </tbody>
    </table>
  )
}

function TableRow({
  stockProduct
}: {
  stockProduct: StockDataFormatted
}) {
  return (
    <tr>
      <td className="px-8 capitalize py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        {stockProduct.product_name}
      </td>

      <td className="px-8 capitalize py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
        {stockProduct.actual_stock}
      </td>

      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
        {stockProduct.last_movement ? format(stockProduct.last_movement, 'dd/mm/yyyy HH:MM a') : 'Sin registros...'}
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center justify-center gap-x-2">
          {stockProduct.hasPendingWithdraws
          ?
          <span className="px-3 py-1 text-xs text-red-600 bg-red-200 rounded-full">
            Pendiente de confirmacion
          </span>
          :
          <span className="px-3 py-1 text-xs text-emerald-600 bg-emerald-100 rounded-full">
            OK
          </span>
          }
        </div>
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          <DetailProduct id={stockProduct.product_id} />
        </div>
      </td>
    </tr>
  )
}