"use client"

import { Button } from "../buttons"
import { useState } from "react"

export default function StockTable() {
  return (
    <section className="container">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800">Lista de stock</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
              2 productos
            </span>
            <span className="px-3 py-1 text-xs text-red-600 bg-red-200 rounded-full">
              2 retiros pendientes
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Detalle de cada producto con su stock actual.
          </p>
        </div>
        <div className="flex items-center mt-4 gap-x-3">
          <Button>
            Retirar
          </Button>
          <Button primary={true}>
            Ingresar
          </Button>
        </div>
      </div>
      <div className="mt-6 md:flex md:items-center md:justify-between">
        <div className="relative flex items-center mt-4 md:mt-0">
          <span className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400">
              <path stroke-linecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input type="text" placeholder="Buscar por nombre de producto" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Table() {
  const [show, setShow] = useState(false)
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Producto
            </th>

            <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              <div className="relative">
                <button onClick={() => setShow(!show)} className="relative flex items-center gap-3 z-10 p-2 text-gray-700 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 focus:ring focus:outline-none">
                    Categoria
                  <svg className="w-5 h-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                  {show &&
                    <div
                      onClickCapture={() => setShow(false)}
                      className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl"
                    >
                      <a href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"> your profile </a>
                    </div>
                  }
              </div>
            </th>

            <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Unidad
            </th>

            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Stock Actual
            </th>

            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Ultimo movimiento
            </th>

            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
              Estado
            </th>

            <th scope="col" className="relative py-3.5 px-4">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <TableRow />
          <TableRow />
          <TableRow />
        </tbody>
      </table>
    </>
  )
}

function TableRow() {
  return (
    <tr>
      <td className="px-8 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        Fibra monomodo
      </td>

      <td className="px-8 py-4 text-sm text-gray-700 whitespace-nowrap">
        Fibra optica
      </td>

      <td className="px-8 py-4 text-sm text-gray-700 whitespace-nowrap">
        Metros
      </td>

      <td className="px-4 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
        1500 metros
      </td>

      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
        12/02/2024
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-2">
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
            OK
          </span>
          <span className="px-3 py-1 text-xs text-red-600 bg-red-200 rounded-full">
            Pendiente de confirmacion
          </span>
        </div>
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
        </div>
      </td>
    </tr>
  )
}