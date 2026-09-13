import { CategoriesCard } from "./CategoriesCard";
import type { Category } from "@/store/mock-data";

interface Props {
  categories: Category[];
}

export const CategoriesGrid = ({ categories }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoriesCard category={category} key={category.id} />
      ))}
    </div>
  );
};
