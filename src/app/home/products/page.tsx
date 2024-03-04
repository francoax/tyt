import { CreateButton } from "@/components/buttons";
import Search from "@/components/search";
import { Spinner, TableLoading } from "@/components/loaders";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductsTable from "@/components/products/table";
import { getAmountOfProducts } from "@/lib/data/products";
import { PRODUCTS_ROUTE } from "@/lib/constants";
import { SearchDropdown } from "@/components/products/search-dropdown";

export const metadata: Metadata = {
  title: 'Productos'
}

export default function Page({
  searchParams
}: {
  searchParams?: {
    query?: string,
    category?: string
  }
}) {
  const query = searchParams?.query || ''
  const categoryQuery = searchParams?.category || ''

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
          <CreateButton href={`${PRODUCTS_ROUTE}/create`}>
            Nueva producto
          </CreateButton>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 items-center">
        <Search placeholder="Buscar por nombre" />
        <SearchDropdown placeholder="Buscar por categoria" />
      </div>
      <Suspense key={query + categoryQuery} fallback={<TableLoading />}>
        <ProductsTable query={query} categoryQuery={categoryQuery} />
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