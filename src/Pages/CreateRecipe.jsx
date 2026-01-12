import React, {useState} from "react";
import useFetching from "../hooks/useFetching";
import RecipeFormComponent from "../Components/Recipe/CreateRecipeComponents/RecipeFormComponent";
import RecipeService from "../API/RecipeService";
import classes from "./Registration/RegisterPageStyle.module.css";
import Lottie from "lottie-react";
import cat from "../Utils/LottiesAnimations/loaderCat.json";

const CreateRecipePage = () => {

    const [recipes, setRecipes] = useState([]);

    const [saveRecipe, isSaving, recipeSavingError] = useFetching(async (recipe) => {
        const response = await RecipeService.saveRecipe(recipe)
        setRecipes([...recipes, response.data])
    })

    const savingRecipe = async (recipe) => {
        await saveRecipe(recipe)
    }

    if (isSaving) {
        return (
            <div className={classes.loader}>
                <Lottie animationData={cat} loop style={{ width: 150 }} />
            </div>
        )
    }
    if (recipeSavingError) {
        alert("Saving failed.")
    }

    return (
        <RecipeFormComponent saveRecipe={savingRecipe}/>
    )
}

export default CreateRecipePage;