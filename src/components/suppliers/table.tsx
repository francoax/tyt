import { getSuppliers } from "@/lib/data/suppliers"
import { Supplier } from "@/lib/definitions"
import { DeleteButton, UpdateButton } from "../buttons"
import { deleteSupplierAction } from "@/lib/actions/suppliers"

export default async function SuppliersTable({
  query
}: {
  query?: string
}) {

  const suppliers = await getSuppliers(query)
  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <Table suppliers={suppliers} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Table({
  suppliers
}: {
  suppliers: Supplier[]
}) {

  if(suppliers.length === 0) {
    return (
      <p className="text-center text-gray-700">Sin proveedores por el momento.</p>
    )
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Id
            </th>

            <th scope="col" className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Nombre
            </th>

            <th scope="col" className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Telefono
            </th>

            <th scope="col" className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Email
            </th>

            <th scope="col" className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Direccion
            </th>

            <th scope="col" className="relative py-3.5 px-4">
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {suppliers.map(c => (
            <TableRow key={c.id} supplier={c} />
          ))}
        </tbody>
      </table>
    </>
  )
}

async function TableRow({
  supplier
}: {
  supplier: Supplier
}) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        {supplier.id}
      </td>

      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
        {supplier.name}
      </td>

      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
        {supplier.tel}
      </td>

      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
        {supplier.email}
      </td>

      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
        {supplier.address}
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          <UpdateButton href={`/home/suppliers/${supplier.id}/edit`} />
          <DeleteButton
            id={supplier.id}
            deleteAction={deleteSupplierAction}
            title="Eliminar proveedor"
            description={`Estas seguro que queres eliminar al proveedor ${supplier.name.toLocaleUpperCase()}?`}
          />
        </div>
      </td>
    </tr>
  )
}