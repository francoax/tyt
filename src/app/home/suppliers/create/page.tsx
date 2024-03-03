import SupplierCreateForm from "@/components/suppliers/create-form";

export default function Page() {
  return (
    <>
      <div>
        <h2 className="text-lg font-medium  text-gray-800">Nueva proveedor</h2>
        <p className="mt-1 text-sm text-gray-500">
          Los campos con <span className="text-red-500">*</span> son requeridos.
        </p>
      </div>
      <SupplierCreateForm />
    </>
  )
}