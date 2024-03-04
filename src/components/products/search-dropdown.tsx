'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getCategories } from "@/lib/data/categories";
import { Category } from "@/lib/definitions";
import { SelectInput } from "../inputs";

export function SearchDropdown({
  placeholder
}: {
  placeholder: string
}) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getCategories().then((list) => setCategories(list))
  }, [])

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setValue] = useState(searchParams.get('category')?.toString() || '')

  const handleSearch = useDebouncedCallback((term?: { label: string, value: string}) => {
    const params = new URLSearchParams(searchParams)

    if(term) {
      params.set('category', term.value)
    } else {
      params.delete('category')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 500)

  return (
    <div className="sm:mt-3">
      <SelectInput
        placeholder={placeholder}
        isClearable={inputValue}
        instanceId={'categories-dropdown'}
        defaultValue={inputValue ? { label: inputValue!, value: inputValue!} : []}
        options={categories.map(c => ({ label: c.description, value: c.description }))}
        onChange={(e: any) => {
          handleSearch(e as { label: string, value: string}),
          setValue(e?.value)
        }}
      />
    </div>
  )
}