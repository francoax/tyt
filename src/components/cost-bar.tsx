'use client';

import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function OverallCostBar() {
  const p = 20192
  return (
    <div className="w-full bg-emerald-300/40 rounded-lg p-3 mb-5 text-lg">
      <ul className="w-full flex items-center flex-wrap justify-center md:justify-start [&_li]:mx-8 font-medium">
        <li className="capitalize">
          {format(new Date(), 'MMMM', { locale: es })}: USD{p.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2})}
        </li>
        <li>
          Anual: USD{p.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2})}
        </li>
      </ul>
    </div>
  )
}