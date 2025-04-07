
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/recipeApi";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryCard from "@/components/recipe/CategoryCard";

const Categories = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center animate-fade-in">
        <h1 className="text-4xl font-serif font-medium mb-4">Recipe Categories</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore recipes by category and discover new dishes from around the world
        </p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Failed to load categories. Please try again later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories?.map((category, index) => (
            <CategoryCard key={category.idCategory} category={category} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
