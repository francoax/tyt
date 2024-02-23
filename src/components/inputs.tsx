export const Input = ({type, placeholder} : { type: string, placeholder: string }) => {
  return (
    <input type={type} placeholder={placeholder} className="block mt-2 min-w-[320px] w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
  )
}

export const InputForm = ({ label, placeholder, type }: { label: string, type: string, placeholder: string }) => {
  return (
    <div>
      <label className="block text-sm text-gray-500 dark:text-gray-300">
        {label}
      </label>
      <Input placeholder={placeholder} type={type} />
    </div>
  )
}