import { CreateButton } from "@/components/buttons";
import Search from "@/components/search";
import { Spinner, TableLoading } from "@/components/loaders";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductsTable from "@/components/products/table";
import { getAmountOfProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: 'Productos'
}

export default function Page({
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
            <h2 className="text-lg font-medium text-gray-800">Lista de productos</h2>
            <Suspense fallback={<Spinner />}>
              <TotalProducts />
            </Suspense>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Detalle de cada producto vigente.
          </p>
        </div>
        <div className="flex items-center mt-4 gap-x-3">
          <CreateButton href={'/home/products/create'}>
            Nueva producto
          </CreateButton>
        </div>
      </div>
      <Search placeholder="Buscar por producto" />
      <Suspense key={query} fallback={<TableLoading />}>
        <ProductsTable query={query} />
      </Suspense>
    </section>
  )
}

async function TotalProducts() {
  const amountProducts = await getAmountOfProducts()
  return (
    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
      {amountProducts} productos
    </span>
  )
}