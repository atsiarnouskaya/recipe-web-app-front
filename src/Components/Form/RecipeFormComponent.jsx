import React, {useContext, useState, useEffect} from "react";
import InputComponent from "../Input/InputComponent";
import IngredientFormComponent from "./IngredientFormComponent";
import classes from "./FormStyle.module.css"
import Button from "../Button/Button";
import {RecipeContext} from "../../API/Context";

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
            <h2>Enter your recipe here</h2>

            <form className={classes.form}>
                <InputComponent type="text"
                                value={recipe.title}
                                placeholder="Recipe title"
                                onChange={(e) => setRecipe({...recipe, title: e.target.value})} />

                <InputComponent type="text"
                                placeholder="Description"
                                value={recipe.shortDescription}
                                onChange={(e) => setRecipe({...recipe, shortDescription: e.target.value})} />

                <InputComponent type="text"
                                placeholder="Steps"
                                value={recipe.steps}
                                onChange={(e) => setRecipe({...recipe, steps: e.target.value})} />

                <IngredientFormComponent options={[
                    {
                        name: "ml",
                        value: "ml"
                    },
                    {
                        name: "l",
                        value: "l"
                    },
                    {
                        name: "kg",
                        value: "kg"
                    }
                    ]}
                    onChange={(ingredientsArray) => {
                        ingredientsArray.map(ingredient => ingredient.recipeName = recipe.title)
                        setRecipe({...recipe, ingredients: ingredientsArray})}
                    }
                    recipeTitle={recipe.title}
                    initialIngredients={recipe.ingredients}/>


                <Button onClick={(e) => {
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