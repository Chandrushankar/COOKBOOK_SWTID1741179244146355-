
import { Link } from "react-router-dom";
import { Category } from "@/services/recipeApi";
import { Card, CardContent } from "@/components/ui/card";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 opacity-0 translate-y-8",
        isVisible && "opacity-100 translate-y-0",
        "delay-[" + index * 100 + "ms]"
      )}
    >
      <Link to={`/search?category=${category.strCategory}`}>
        <Card className="overflow-hidden hover-rotate">
          <div className="aspect-square relative overflow-hidden">
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h3 className="text-xl font-serif font-medium text-center mb-2">
                {category.strCategory}
              </h3>
              <p className="text-sm text-white/80 text-center line-clamp-2">
                {category.strCategoryDescription.split(". ")[0]}
              </p>
            </div>
          </div>
          <CardContent className="p-4 text-center">
            <span className="text-sm font-medium">
              Browse {category.strCategory} Recipes
            </span>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CategoryCard;
