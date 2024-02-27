import { getCategories } from "@/lib/services/categories.service"
import { Category } from "@/lib/definitions"
import { DeleteCategory, UpdateCategory } from "./buttons"

export default async function CategoriesTable() {

  const categories = await getCategories()
  return (
    <>
      <div className="mt-6 md:flex md:items-center md:justify-between">
        <div className="relative flex items-center mt-4 md:mt-0">
          <span className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input type="text" placeholder="Buscar por nombre de categoria" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
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
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
              Id
            </th>

            <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
              Descripcion
            </th>

            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
              Productos incluidos
            </th>

            <th scope="col" className="relative py-3.5 px-4">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
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
      <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
        {category.id}
      </td>

      <td className="px-8 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
        {category.description}
      </td>

      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
        {category.total_products}
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          <UpdateCategory id={category.id} />
          <DeleteCategory id={category.id} />
        </div>
      </td>
    </tr>
  )
}