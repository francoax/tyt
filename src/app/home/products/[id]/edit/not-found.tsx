import NotFoundComponent from "@/components/not-found";

export default function NotFound() {
  return (
    <NotFoundComponent message="No pudo encontrarse el producto solicitado." href="/home/products" />
  )
}