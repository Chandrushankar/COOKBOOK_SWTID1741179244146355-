
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Recipe } from "@/services/recipeApi";

interface RecipeIngredientsProps {
  recipe: Recipe;
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({ recipe }) => {
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">No ingredients available for this recipe.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <ul className="space-y-4">
          {recipe.ingredients.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
              <div>
                <span className="font-medium">{item.ingredient}</span>
                {item.measure && (
                  <span className="text-muted-foreground"> - {item.measure}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecipeIngredients;
