import { getWorkplaces } from "@/lib/data/workplace"
import { Workplace } from "@/lib/definitions"
import { DeleteButton, UpdateButton } from "../buttons"
import { WORKPLACES_ROUTE } from "@/lib/constants"
import { deleteWorkplaceAction } from "@/lib/actions/workplace"

export default async function WorkplaceTable({ query } : { query: string }) {
  const workplaces = await getWorkplaces(query)
  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <Table workplaces={workplaces} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Table({
  workplaces
}: {
  workplaces: Workplace[]
}) {

  if(workplaces.length === 0) {
    return (
      <p className="text-center text-gray-700">Sin empresas por el momento.</p>
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
              Nombre
            </th>

            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Direccion
            </th>

            <th scope="col" className="relative py-3.5 px-4">
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workplaces.map(w => (
            <TableRow key={w.id} workplace={w} />
          ))}
        </tbody>
      </table>
    </>
  )
}

async function TableRow({
  workplace
}: {
  workplace: Workplace
}) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        {workplace.id}
      </td>

      <td className="px-8 py-4 text-sm text-gray-700 whitespace-nowrap">
        {workplace.name}
      </td>

      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
        {workplace.address}
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          <UpdateButton href={`${WORKPLACES_ROUTE}/${workplace.id}/edit`} />
          <DeleteButton
            id={workplace.id}
            title="Eliminar empresa"
            description={`Estas seguro que queres eliminar la empresa ${workplace.name.toLocaleUpperCase()}?`}
            deleteAction={deleteWorkplaceAction}
          />
        </div>
      </td>
    </tr>
  )
}