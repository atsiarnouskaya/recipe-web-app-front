import React from "react";
import classes from "./AllRecipesStyle.module.css"

const AllRecipesComponent = ({recipes}) => {
    return (
        <div>
            <h2>All recipes</h2>
            <br></br>
            {recipes.map((recipe) => (
                <div key={recipe.id} className={classes.wrapper}>
                    <h2 className={classes.h2}>{recipe.title}</h2>

                    <p>{`Short description ${recipe.shortDescription}`}</p>

                    <p>{`Instructions: ${recipe.steps}`}</p>
                </div>
            ))}
        </div>
    )
}

export default AllRecipesComponent;