import NotFoundComponent from "@/components/not-found";
import { CATEGORIES_ROUTE } from "@/lib/constants";

export default function NotFound() {
  return (
    <NotFoundComponent message="No pudo encontrarse la categoria solicitada." href={CATEGORIES_ROUTE} />
  )
}