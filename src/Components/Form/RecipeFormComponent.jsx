import React, {useState} from "react";
import InputComponent from "../Input/InputComponent";
import IngredientFormComponent from "./IngredientFormComponent";
import classes from "./FormStyle.module.css"
import Button from "../Button/Button";

const RecipeFormComponent = ({saveRecipe}) => {
    const [recipe, setRecipe] = useState({
        title: '',
        shortDescription: '',
        steps: '',
        ingredients: '',
    });

    return (
        <div>
            <h2>Enter your recipe here</h2>

            <form className={classes.recipeForm}>
                <InputComponent type="text"
                                placeholder="Recipe title"
                                onChange={(e) => setRecipe({...recipe, title: e.target.value})} />

                <InputComponent type="text"
                                placeholder="Description"
                                onChange={(e) => setRecipe({...recipe, shortDescription: e.target.value})} />

                <InputComponent type="text"
                                placeholder="Steps"
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
                    onChange={(ingredientsArray) => setRecipe({...recipe, ingredients: ingredientsArray})}
                    recipeTitle={recipe.title}/>


                <Button onClick={(e) => {
                    e.preventDefault();
                    saveRecipe(recipe)}
                }>Save</Button>
            </form>
        </div>
    )
}

export default RecipeFormComponent;