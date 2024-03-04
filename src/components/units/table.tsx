import { Unit } from "@/lib/definitions"
import { getUnits } from "@/lib/data/units"
import { DeleteButton, UpdateButton } from "../buttons"
import { deleteUnitAction } from "@/lib/actions/units"

export default async function UnitsTable({
  query
}: {
  query?: string
}) {

  const units = await getUnits(query)
  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <Table units={units} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Table({
  units
}: {
  units: Unit[]
}) {

  if(units.length === 0) {
    return (
      <p className="text-center text-gray-700">Sin tipos de unidades por el momento.</p>
    )
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Id
            </th>

            <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Descripcion
            </th>

            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Productos incluidos
            </th>

            <th scope="col" className="relative py-3.5 px-4">
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {units.map(u => (
            <TableRow key={u.id} unit={u} />
          ))}
        </tbody>
      </table>
    </>
  )
}

async function TableRow({
  unit
}: {
  unit: Unit
}) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        {unit.id}
      </td>

      <td className="px-8 py-4 text-sm text-gray-700 whitespace-nowrap">
        {unit.description}
      </td>

      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
        {unit.total_products}
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          <UpdateButton href={`/home/units/${unit.id}/edit`} />
          <DeleteButton
            id={unit.id}
            title="Eliminar tipo de unidad"
            description={`Estas seguro que queres eliminar el tipo de unidad ${unit.description.toLocaleUpperCase()}?`}
            deleteAction={deleteUnitAction}
          />
        </div>
      </td>
    </tr>
  )
}