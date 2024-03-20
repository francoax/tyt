'use client';

import { format, getMonth, lastDayOfMonth, startOfMonth } from "date-fns";
import { Input } from "../inputs";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "../buttons";
import { useState } from "react";
import toast from "react-hot-toast";
import Alert from "../alerts";
import { ERROR_STATUS } from "@/lib/constants";
import { es } from "date-fns/locale";

type Dates = {
  date_from?: Date | null,
  date_to?: Date | null
}

export default function DateFilter() {
  const firstDayOfMonth = startOfMonth(new Date())
  const lastDay = lastDayOfMonth(new Date())
  const formattedDate = format(firstDayOfMonth, 'yyyy-MM-dd')
  const formattedLastDay = format(lastDay, 'yyyy-MM-dd')

  const [dates, setDates] = useState<Dates>({ date_from: new Date(formattedDate)})

  const handleDatesFilter = () => {
    const { date_from, date_to } = dates

    if(date_to! < date_from!) {
      toast(() => (
        <Alert title={'Filtrar movie'} reason={ERROR_STATUS} description={'La fecha desde debe ser mayor.'} />
      ))
    }
  }

  return (
    <div className="flex items-center flex-wrap gap-5 mt-5">
      <Input
      name="date_from"
      type="date"
      placeholder="Seleccionar fecha"
      label="Fecha desde"
      defaultValue={formattedDate}
      helpMessage="El formato visto es mes/dia/año"
      onChange={(e) => setDates((prev) => ({...prev, date_from: e.target.valueAsDate}))}
    />
    <Input
      name="date_to"
      type="date"
      placeholder="Seleccionar fecha"
      label="Fecha hasta"
      helpMessage="El formato visto es mes/dia/año"
      defaultValue={formattedLastDay}
      onChange={(e) => setDates((prev) => ({...prev, date_to: e.target.valueAsDate}))}
    />
    <Button onClick={handleDatesFilter} type="submit" className="bg-gray-300">
      <MagnifyingGlassIcon className="w-4 inline-flex" /> Filtrar
    </Button>
    </div>
  )
}