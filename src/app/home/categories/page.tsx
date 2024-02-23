import CategoryCreationForm from "@/components/categories/creation-form";
import CategoriesTable from "@/components/categories/table";
import Modal from "@/components/modal";

export default function CategoriesPage() {
  return (
    <div>
      <CategoriesTable />
      <CategoryCreationForm />
    </div>
  )
}