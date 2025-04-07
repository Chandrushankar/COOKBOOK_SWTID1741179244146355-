
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface RecipeInstructionsProps {
  instructions: string[];
}

const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({ instructions }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <ol className="space-y-6 list-decimal list-inside">
          {instructions.map((step, index) => (
            <li key={index} className="text-muted-foreground">
              <span className="text-foreground font-medium">{`Step ${index + 1}: `}</span>
              {step}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default RecipeInstructions;
