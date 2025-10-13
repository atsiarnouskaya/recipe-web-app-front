import React, {useState} from "react";
import classes from "./Recipe.module.css";
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";
import IngredientsBlockComponent from "./IngredientsBlockComponent";
import InstructionsBlockComponent from "./InstructionsBlockComponent";

const Recipe = ({recipe, deleteRecipe, editRecipe}) => {

    const router = useNavigate();

    return (
        <div>
            <div key={recipe.id} className={classes.recipeCard}>
                <h2 className={classes.recipeTitle}>{recipe.title}</h2>

                <p className={classes.description}>{`${recipe.shortDescription}`}</p>

                <IngredientsBlockComponent ingredients={recipe.ingredients} />

                <InstructionsBlockComponent instructions={recipe.steps} />
            </div>

            <div className={classes.actions}>
                <Button className={classes.button} onClick={() => deleteRecipe(recipe)}>Delete</Button>
                <Button className={classes.button} onClick={() => router(`/recipes/${recipe.id}/edit`)}>Edit</Button>
            </div>
        </div>
    )
}

export default Recipe;