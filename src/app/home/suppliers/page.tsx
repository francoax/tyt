import { CreateButton } from "@/components/buttons";
import Search from "@/components/search";
import { Spinner, TableLoading } from "@/components/loaders";
import { Metadata } from "next";
import { Suspense } from "react";
import SuppliersTable from "@/components/suppliers/table";
import { getAmountOfSuppliers } from "@/lib/data/suppliers";

export const metadata: Metadata = {
  title: 'Proveedores'
}

export default async function CategoriesPage({
  searchParams
}: {
  searchParams?: {
    query?: string
  }
}) {
  const query = searchParams?.query || ''

  return (
    <section className="container">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800">Lista de proveedores</h2>
            <Suspense fallback={<Spinner />}>
              <TotalSuppliers />
            </Suspense>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Detalle de cada proveedor vigente.
          </p>
        </div>
        <div className="flex items-center mt-4 gap-x-3">
          <CreateButton href={'/home/suppliers/create'}>
            Nueva proveedor
          </CreateButton>
        </div>
      </div>
      <Search placeholder="Buscar por nombre" />
      <Suspense key={query} fallback={<TableLoading />}>
        <SuppliersTable />
      </Suspense>
    </section>
  )
}

async function TotalSuppliers() {
  const amountSuppliers = await getAmountOfSuppliers()
  return (
    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
      {amountSuppliers} proveedores
    </span>
  )
}