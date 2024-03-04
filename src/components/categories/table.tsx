import { getCategories } from "@/lib/data/categories"
import { Category } from "@/lib/definitions"
import { DeleteButton, UpdateButton } from "../buttons"
import { deleteCategoryAction } from "@/lib/actions/categories"
import { CATEGORIES_ROUTE } from "@/lib/constants"

export default async function CategoriesTable({
  query
}: {
  query?: string
}) {

  const categories = await getCategories(query)
  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <Table categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Table({
  categories
}: {
  categories: Category[]
}) {

  if(categories.length === 0) {
    return (
      <p className="text-center text-gray-700">Sin categorias por el momento.</p>
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
          {categories.map(c => (
            <TableRow key={c.id} category={c} />
          ))}
        </tbody>
      </table>
    </>
  )
}

async function TableRow({
  category
}: {
  category: Category
}) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        {category.id}
      </td>

      <td className="px-8 py-4 text-sm text-gray-700 whitespace-nowrap">
        {category.description}
      </td>

      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
        {category.total_products}
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          <UpdateButton href={`${CATEGORIES_ROUTE}/${category.id}/edit`} />
          <DeleteButton
            id={category.id}
            deleteAction={deleteCategoryAction}
            title="Eliminar categoria"
            description={`Estas seguro que queres eliminar la categoria ${category.description.toLocaleUpperCase()}?`}
          />
        </div>
      </td>
    </tr>
  )
}