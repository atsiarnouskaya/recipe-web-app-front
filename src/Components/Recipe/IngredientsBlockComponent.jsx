import React from "react";
import classes from "./Recipe.module.css"

const IngredientsBlockComponent = ({ingredients}) => {
    return (
        <div>

            <h5 className={classes.ingredientsTitle}>For this recipe you will need:</h5>

            {ingredients.map(ingr =>
                <div className={classes.ingredientsGrid} key={ingr.id}>
                    <span> {ingr.ingredientName} </span>
                    <span> {ingr.amount} </span>
                    <span> {ingr.unit} </span>
                </div>)}


        </div>
    )
}

export default IngredientsBlockComponent;