import React from "react";
import IngredientFormComponent from "./IngredientFormComponent";

const IngredientSectionComponent = ({recipe, setRecipe}) => {
    return (
        <div>
            <IngredientFormComponent
                options={[
                    {
                        name: "l",
                        value: "l"
                    },
                    {
                        name: "ml",
                        value: "ml"
                    },
                    {
                        name: "kg",
                        value: "kg"
                    },
                    {
                        name: "g",
                        value: "g"
                    }
                ]}
                onChange={(ingredientsArray) => {
                    ingredientsArray.map(ingredient => ingredient.recipeName = recipe.title)
                    setRecipe({...recipe, ingredients: ingredientsArray})}
                }
                recipeTitle={recipe.title}
                initialIngredients={recipe.ingredients}/>
        </div>
    )
}

export default IngredientSectionComponent