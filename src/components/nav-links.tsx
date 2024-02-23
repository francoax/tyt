"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    section: 'Inventario',
    links: [
      {
        name: "Stock",
        href: "/home/stock"
      }
    ]
  },
  {
    section: "Productos",
    links: [
      {
        name: "Lista de productos",
        href: "/home/items"
      },
      {
        name: "Categorias",
        href: "/home/categories"
      },
      {
        name: "Tipo de unidades",
        href: "/home/units"
      }
    ]
  },
  {
    section: 'Proveedores',
    links: [
      {
        name: "Lista de proveedores",
        href: "/home/suppliers"
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
          <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">{section.section}</label>
          {section.links.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={
                clsx(
                  'flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
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