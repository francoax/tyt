import Form from "@/components/categories/edit-form";
import { getCategoryById } from "@/lib/data/categories";
import { notFound } from "next/navigation";

export default async function UpdateCategoryPage(
  { params }: { params: { id: string }}
) {
  const id = params.id;
  const category = await getCategoryById(Number.parseInt(id))

  if(!category) {
    notFound()
  }

  return (
    <>
      <div>
        <h2 className="text-lg font-medium  text-gray-800">Editar categoria: {category.description.toLocaleUpperCase()}</h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>
      <Form category={category} />
    </>
  )
}