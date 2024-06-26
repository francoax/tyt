"use client"

import { CATEGORIES_ROUTE, PRODUCTS_ROUTE, SUPPLIERS_ROUTE, UNITS_ROUTE, WORKPLACES_ROUTE } from "@/lib/constants";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    section: 'Inventario',
    links: [
      {
        name: "Stock",
        href: "/home"
      }
    ]
  },
  {
    section: "Productos",
    links: [
      {
        name: "Productos",
        href: PRODUCTS_ROUTE
      },
      {
        name: "Categorias",
        href: CATEGORIES_ROUTE
      },
      {
        name: "Tipo de unidades",
        href: UNITS_ROUTE
      }
    ]
  },
  {
    section: 'Proveedores',
    links: [
      {
        name: "Proveedores",
        href: SUPPLIERS_ROUTE
      }
    ]
  },
  {
    section: 'Clientes',
    links: [
      {
        name: 'Empresas',
        href: WORKPLACES_ROUTE
      }
    ]
  }
]

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      {links.map(section => (
        <div
          className="space-y-3"
          key={section.section}
        >
          <label className="px-3 text-xs text-gray-500 uppercase">{section.section}</label>
          {section.links.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={
                clsx(
                  'flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700',
                  {
                    'bg-sky-100 text-blue-600': pathname === link.href,
                  },
                )
              }
            >
              <span className="mx-2 text-sm font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      ) )}
    </>
  )
}