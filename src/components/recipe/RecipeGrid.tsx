
import { Recipe } from "@/services/recipeApi";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
  emptyMessage?: string;
}

const RecipeGrid = ({ recipes, emptyMessage = "No recipes found." }: RecipeGridProps) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} index={index} />
      ))}
    </div>
  );
};

export default RecipeGrid;
