import React from "react";
import classes from "./AllRecipesStyle.module.css"
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";


const AllRecipesComponent = ({recipes, title}) => {
    const router = useNavigate()

    return (
        <div className={classes.container}>
            <div className={classes.recipeGrid}>

                {recipes.map((recipe) => (
                    <article key={recipe.id} className={classes.recipeCard}>
                        <div className={classes.imagePlaceholder}>
                            {/* <img src={recipe.image} /> */}
                            <span>No image available</span>
                        </div>

                        <div className={classes.cardContent}>
                            <h2 className={classes.cardTitle}>{recipe.title}</h2>

                            <p className={classes.cardDescription}>{recipe.shortDescription}</p>
                        </div>

                        <div className={classes.cardFooter}>
                            <Button onClick={() => router(`/recipe/${recipe.id}`)} >More</Button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default AllRecipesComponent;