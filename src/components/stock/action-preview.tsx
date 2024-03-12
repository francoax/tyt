import { format } from "date-fns"

export function DepositPreview(
//   {
//   amount,
//   dollar_at_date,
//   total_price
// }: {
//   amount: string,
//   dollar_at_date: string,
//   total_price: string
// }
)
{
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
                    Cantidad
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
                    {format(new Date(), 'dd/MM/yyyy HH:MM a')}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {/* {unit} */}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {/* {dollar_at_date} */}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {/* {total_price} */}
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