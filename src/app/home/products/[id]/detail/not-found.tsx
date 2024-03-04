import NotFoundComponent from "@/components/not-found";
import { PRODUCTS_ROUTE } from "@/lib/constants";

export default function NotFound() {
  return (
    <NotFoundComponent message="No pudo encontrarse el producto solicitado." href={PRODUCTS_ROUTE} />
  )
}