'use client';

import { addDays, format, formatISO, lastDayOfMonth, startOfMonth } from "date-fns";
import { Input } from "../inputs";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../buttons";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Alert from "../alerts";
import { ERROR_STATUS } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";

type Dates = {
  date_from: Date,
  date_to: Date
}

const getDatesOfCurrentMonth = (): Dates => {
  const firstDay = startOfMonth(new Date())
  const lastDay = lastDayOfMonth(new Date())

  return {
    date_from: firstDay,
    date_to: lastDay
  }
}

export default function DateFilter() {
  const [dates, setDates] = useState<Dates>(getDatesOfCurrentMonth())

  const [clearFilter, setClearFilter] = useState(false)

  const pathname = usePathname()
  const { replace } = useRouter()

  const updateUrl = (params: any) => {
    params.set('from', format(dates.date_from, 'yyyy-MM-dd'))
    params.set('to', format(dates.date_to, 'yyyy-MM-dd'))

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    const params = new URLSearchParams()

    updateUrl(params)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDatesFilter = () => {
    const params = new URLSearchParams()
    const { date_from, date_to } = dates


    if(date_to < date_from) {
      toast(() => (
        <Alert title={'Filtrar fechas'} reason={ERROR_STATUS} description={'La fecha desde debe ser mayor.'} />
        ))
      return
    }

    setClearFilter(true)

    updateUrl(params)
  }

  const handleResetFilter = () => {
    setClearFilter(false)

    const params = new URLSearchParams()
    const datesCurrentMonth = getDatesOfCurrentMonth()

    setDates(datesCurrentMonth)

    params.set('from', format(datesCurrentMonth.date_from, 'yyyy-MM-dd'))
    params.set('to', format(datesCurrentMonth.date_to, 'yyyy-MM-dd'))

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center flex-wrap gap-5 mt-5">
      <Input
        name="date_from"
        type="date"
        placeholder="Seleccionar fecha"
        label="Fecha desde"
        value={format(dates.date_from, 'yyyy-MM-dd')}
        helpMessage="El formato visto es mes/dia/año"
        onChange={(e) => setDates((prev) => ({...prev, date_from: addDays(new Date(e.target.valueAsDate?.toLocaleDateString()!), 1)}))}
      />
      <Input
        name="date_to"
        type="date"
        placeholder="Seleccionar fecha"
        label="Fecha hasta"
        helpMessage="El formato visto es mes/dia/año"
        value={format(dates.date_to, 'yyyy-MM-dd')}
        onChange={(e) => setDates((prev) => ({...prev, date_to: addDays(new Date(e.target.valueAsDate?.toLocaleDateString()!), 1)}))}
      />
      <Button onClick={handleDatesFilter} type="submit" className="bg-gray-300">
        <MagnifyingGlassIcon className="w-4 inline-flex" /> Filtrar
      </Button>
      {
        clearFilter && (
          <Button onClick={handleResetFilter} type="button" className="bg-gray-300">
            <XMarkIcon className="w-4 inline-flex" /> Limpiar filtro
          </Button>
        )
      }
    </div>
  )
}