import React from "react";
import classes from "./AllRecipesStyle.module.css"
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";


const AllRecipesComponent = ({recipes}) => {
    const router = useNavigate()

    return (
        <div >
            <h2>All recipes</h2>
            <br></br>
            {recipes.map((recipe) => (
                <div key={recipe.id} className={classes.wrapper}>
                    <h2 className={classes.h2}>{recipe.title}</h2>

                    <p>{`Short description ${recipe.shortDescription}`}</p>
                    <div className={classes.buttonRow}>
                        <Button className={classes.cardButton} onClick={() => router(`/recipe/${recipe.id}`)} >More</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllRecipesComponent;