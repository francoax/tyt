import NotFoundComponent from "@/components/not-found";
import { UNITS_ROUTE } from "@/lib/constants";

export default function NotFound() {
  return (
    <NotFoundComponent message="No pudo encontrarse el tipo de unidad solicitado." href={UNITS_ROUTE} />
  )
}