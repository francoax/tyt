import NotFoundComponent from "@/components/not-found";
import { WORKPLACES_ROUTE } from "@/lib/constants";

export default function NotFound() {
  return (
    <NotFoundComponent href={WORKPLACES_ROUTE} message="No pudo encontrarse la empresa solicitada." />
  )
}