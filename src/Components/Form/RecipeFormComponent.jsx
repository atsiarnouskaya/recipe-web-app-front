import React, {useState, useEffect} from "react";
import InputComponent from "../Input/InputComponent";
import IngredientFormComponent from "./IngredientFormComponent";
import classes from "./FormStyle.module.css"
import Button from "../Button/Button";

const RecipeFormComponent = ({saveRecipe, initialRecipe}) => {
    const [recipe, setRecipe] = useState(
        initialRecipe || {
        title: '',
        shortDescription: '',
        steps: '',
        ingredients: [],
    });

    useEffect(() => {
        if (initialRecipe) {
            setRecipe(initialRecipe);
            console.log(initialRecipe);
        }
    }, [initialRecipe]);

    return (
        <div>


            <form className={classes.form}>

                <h2 className={classes.h2}>Enter your recipe here</h2>

                <InputComponent type="text"
                                value={recipe.title}
                                placeholder="Recipe title"
                                onChange={(e) => setRecipe({...recipe, title: e.target.value})} />

                <InputComponent type="text"
                                placeholder="Description"
                                value={recipe.shortDescription}
                                onChange={(e) => setRecipe({...recipe, shortDescription: e.target.value})} />

                <textarea className={classes.textarea}
                          placeholder="Steps"
                          value={recipe.steps}
                          onChange={(e) => setRecipe({...recipe, steps: e.target.value})} />

                <IngredientFormComponent options={[
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


                <Button
                    disabled = {! (recipe.title && recipe.ingredients.length > 0 && recipe.steps && recipe.shortDescription)}
                    onClick={(e) => {
                    e.preventDefault();
                    saveRecipe(recipe)
                    console.log(recipe)
                    }
                }>Save</Button>
            </form>
        </div>
    )
}

export default RecipeFormComponent;