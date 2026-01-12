import React, {useState, useEffect} from "react";
import classes from "./FormStyle.module.css"
import Button from "../../Button/Button";
import {useNavigate} from "react-router-dom";
import RecipeBasicsComponent from "./RecipeBasicsComponent";
import RecipeStepsComponent from "./RecipeStepsComponent";
import VideoComponent from "./VideoComponent";
import IngredientSectionComponent from "./IngredientSectionComponent";

const RecipeFormComponent = ({saveRecipe, initialRecipe}) => {
    const [recipe, setRecipe] = useState(
        initialRecipe || {
        title: '',
        shortDescription: '',
        steps: '',
        ingredients: [],
        videoURL:'',
    });

    useEffect(() => {
        if (initialRecipe) {
            setRecipe(initialRecipe);
        }
    }, [initialRecipe]);

    const navigate = useNavigate();

    return (
        <div className={classes.pageContainer}>
            <form className={classes.form} onSubmit={async (e) => {
                e.preventDefault();
                await saveRecipe(recipe);
                navigate("/allRecipes");
            }}>

                <h2 className={classes.h2}>Create a new recipe</h2>

                <div className={classes.columnsWrapper}>

                    <div className={classes.mainColumn}>
                        <RecipeBasicsComponent recipe={recipe} setRecipe={setRecipe}></RecipeBasicsComponent>
                        <RecipeStepsComponent setRecipe={setRecipe} recipe={recipe}></RecipeStepsComponent>
                        <VideoComponent setRecipe={setRecipe} recipe={recipe}></VideoComponent>
                    </div>

                    <aside className={classes.sideColumn}>
                        <IngredientSectionComponent recipe={recipe} setRecipe={setRecipe}></IngredientSectionComponent>
                    </aside>

                </div>

                <div className={classes.buttonWrapper}>

                    <Button
                        type="submit"
                        disabled = {!(recipe.title && recipe.ingredients.length > 0 && recipe.steps && recipe.shortDescription)}
                    >Save</Button>

                </div>
            </form>
        </div>
    )
}

export default RecipeFormComponent;