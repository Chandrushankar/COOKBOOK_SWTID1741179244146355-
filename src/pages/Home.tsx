
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRandomRecipes, getAllCategories, Category, Recipe } from "@/services/recipeApi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import RecipeGrid from "@/components/recipe/RecipeGrid";
import CategoryCard from "@/components/recipe/CategoryCard";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative h-[70vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/f40c39f4-6ff5-470e-ab87-c469e9c66875.png" 
          alt="Food background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Quick & Easy Recipes
          </h1>
          <p className="text-xl text-white mb-12">
            Find recipes based on ingredients you already have at home
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-black bg-opacity-60 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Meals</h3>
              <p className="text-gray-200">Ready in 30 minutes or less</p>
            </div>
            
            <div className="bg-black bg-opacity-60 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ingredient Check</h3>
              <p className="text-gray-200">Search by what's in your kitchen</p>
            </div>
            
            <div className="bg-black bg-opacity-60 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Follow</h3>
              <p className="text-gray-200">Simple step-by-step guides</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link to="/search?time=30">30-Min Meals</Link>
            </Button>
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link to="/search?ingredients=5">5 Ingredients</Link>
            </Button>
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link to="/search?dish=one-pot">One Pot</Link>
            </Button>
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link to="/search?level=beginner">Beginner Friendly</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedRecipes = () => {
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["randomRecipes"],
    queryFn: () => getRandomRecipes(6),
  });
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Recipes</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </header>
        
        {isLoading ? (
          <div className="text-center">Loading featured recipes...</div>
        ) : !recipes || recipes.length === 0 ? (
          <div className="text-center">
            <p className="mb-4">Unable to fetch recipes from the server. Showing sample recipes instead.</p>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recipes.slice(0, 3).map((recipe) => (
              <Link 
                key={recipe.idMeal} 
                to={`/recipe/${recipe.idMeal}`}
                className="group block overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={recipe.strMealThumb} 
                    alt={recipe.strMeal} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                    {recipe.strMeal}
                  </h3>
                  <div className="flex text-gray-600 text-sm gap-4">
                    <span className="flex items-center gap-1">
                      <span>⏱️</span> 30 mins
                    </span>
                    <span className="flex items-center gap-1">
                      <span>👨‍👩‍👧‍👦</span> 4 servings
                    </span>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                      UC
                    </div>
                    <span className="ml-2 text-sm text-gray-600">Unknown Chef</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const CategorySection = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse Categories</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-video w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.slice(0, 6).map((category) => (
              <Link 
                key={category.idCategory}
                to={`/search?category=${category.strCategory}`}
                className="relative group overflow-hidden rounded-lg shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.strCategory}</h3>
                  <p className="text-sm opacity-90">View All Recipes</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            asChild
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <Link to="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedRecipes />
      <CategorySection />
    </div>
  );
};

export default Home;
