import React from "react";
import classes from "./AllRecipesStyle.module.css"
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";

const AllRecipesComponent = ({recipes, title}) => {
    const router = useNavigate()

    const getOptimizedImage = (publicId) => {
        const cloudName = 'dzarzvgmh';
        const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

        return `${baseUrl}/w_600,h_400,c_fill,g_auto,f_auto,q_auto/${publicId}`;
    };

    return (
        <div className={classes.container}>
            <div className={classes.recipeGrid}>

                {recipes.map((recipe) => (
                    <article key={recipe.id} className={classes.recipeCard}>

                        <div className={classes.imagePlaceholder}>
                            {recipe.publicImageId && (
                                <img src={getOptimizedImage(recipe.publicImageId)} alt="Recipe" />
                            )}

                            {!recipe.publicImageId && (
                                <span>No image :(</span>
                            )}

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