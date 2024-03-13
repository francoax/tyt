import { Spinner } from "@/components/loaders";

export default function Loading() {
  return (
    <div className="container flex justify-center items-center">
      <Spinner /> Cargando...
    </div>
  )
}