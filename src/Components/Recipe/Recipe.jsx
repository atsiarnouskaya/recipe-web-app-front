import React, {useState} from "react";
import classes from "../AllRecipes/AllRecipesStyle.module.css";
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";

const Recipe = ({recipe, deleteRecipe, editRecipe}) => {

    const router = useNavigate();

    return (
        <div>
            <div key={recipe.id} className={classes.wrapper}>
                <h2 className={classes.h2}>{recipe.title}</h2>

                <p>{`${recipe.shortDescription}`}</p>


                <p>{`Ingredients: ${recipe.ingredients.map(ingr => ingr.ingredientName).join(", ")}`}</p>

                <p>{`Instructions: ${recipe.steps}`}</p>
            </div>

            <div className={classes.buttonRow}>
                <Button className={classes.cardButton} onClick={() => deleteRecipe(recipe)}>Delete</Button>
                <Button className={classes.cardButton} onClick={() => router(`/recipes/${recipe.id}/edit`)}>Edit</Button>
            </div>
        </div>
    )
}

export default Recipe;