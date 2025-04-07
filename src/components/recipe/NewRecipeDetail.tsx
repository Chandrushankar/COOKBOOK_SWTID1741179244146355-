
import React from "react";
import { cn } from "@/lib/utils";
import AuthButton from "@/components/auth/AuthButton";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import styles from "./RecipeDetail.module.css";

interface Ingredient {
  name: string;
  quantity: string | number;
}

interface RecipeDetailProps {
  title: string;
  tags: string[];
  procedure: string;
  ingredients: Ingredient[];
  youtubeUrl: string;
  backgroundImage?: string;
}

const NewRecipeDetail: React.FC<RecipeDetailProps> = ({
  title,
  tags,
  procedure,
  ingredients,
  youtubeUrl,
  backgroundImage = "/lovable-uploads/4f2954db-108f-4b64-98fa-36ba334126b7.png",
}) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: videoRef, isVisible: videoVisible } = useScrollAnimation<HTMLDivElement>();

  // Format the YouTube URL to be embeddable
  const getEmbedUrl = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[7].length === 11 ? match[7] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className={styles.recipeContainer}>
      <div 
        className={styles.backgroundImage} 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="text-gray-700 hover:text-primary text-sm">
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-500">/</span>
                  <a href="/recipes" className="text-gray-700 hover:text-primary text-sm">
                    Recipes
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="text-gray-500 text-sm">
                    {title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          <AuthButton />
        </div>
        
        <div 
          ref={headerRef}
          className={cn(
            styles.fadeIn,
            headerVisible ? styles.visible : styles.hidden
          )}
        >
          <div className={styles.contentCard}>
            <h1 className={styles.title}>{title}</h1>
            
            <div className="flex flex-wrap mb-6">
              {tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div 
                ref={contentRef}
                className={cn(
                  styles.fadeIn,
                  contentVisible ? styles.visible : styles.hidden
                )}
              >
                <h2 className={styles.sectionTitle}>Procedure</h2>
                <p className={styles.procedureText}>
                  {procedure}
                </p>
                
                <div 
                  ref={videoRef}
                  className={cn(
                    styles.fadeIn,
                    videoVisible ? styles.visible : styles.hidden
                  )}
                >
                  <h2 className={styles.sectionTitle}>Video Tutorial</h2>
                  <div className={styles.videoWrapper}>
                    <iframe
                      src={getEmbedUrl(youtubeUrl)}
                      title="Recipe Video Tutorial"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
              
              <div 
                className={cn(
                  styles.fadeIn,
                  contentVisible ? styles.visible : styles.hidden
                )}
              >
                <div className={styles.ingredientsCard}>
                  <h2 className={styles.sectionTitle}>Ingredients</h2>
                  <ul className={styles.ingredientsList}>
                    {ingredients.map((ingredient, index) => (
                      <li key={index} className={styles.ingredientItem}>
                        <span className={styles.ingredientName}>
                          {index + 1} - {ingredient.name}
                        </span>
                        <span className={styles.ingredientQuantity}>
                          {ingredient.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRecipeDetail;
