import React from "react";
import classes from "./Recipe.module.css"

const IngredientsBlockComponent = ({ingredients}) => {
    return (
        <div>

            <h3 className={classes.h3}>🛒 For this recipe you will need:</h3>
            <div className={classes.ingredientList}>
            {ingredients.map(ingr =>
                <div className={classes.ingredientItem} key={ingr.id}>
                    <span className={classes.ingName}> {ingr.ingredientName} </span>
                    <span className={classes.ingAmount}> {ingr.amount} {ingr.unit}</span>
                </div>)}
            </div>

        </div>
    )
}

export default IngredientsBlockComponent;