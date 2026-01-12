import React, {useEffect} from "react";
import RecipeFormComponent from "../CreateRecipeComponents/RecipeFormComponent";
import {useState} from "react";
import {useParams} from "react-router-dom";
import useFetching from "../../../hooks/useFetching";
import RecipeService from "../../../API/RecipeService";
import classes from "../../../Pages/Registration/RegisterPageStyle.module.css";
import Lottie from "lottie-react";
import cat from "../../../Utils/LottiesAnimations/loaderCat.json";

const EditRecipe = () => {

    const [editRecipe, setEditRecipe] = useState({
        title: '',
        shortDescription: '',
        steps: '',
        ingredients: '',
    });

    const {id} = useParams();

    const [recipe, loading, error] = useFetching(async (id) => {
        const response = await RecipeService.getRecipe(id)
        setEditRecipe(response.data)
    })

    const [updateRecipe, updating, updatingError] = useFetching(async (id, recipe) => {
        const response = await RecipeService.updateRecipe(id, recipe)
        setEditRecipe(response.data)
    })


    useEffect(() => {
        recipe(id)
    }, [])

    return (
        <div>
            {updating && (
                <div className={classes.loader}>
                    <Lottie animationData={cat} loop style={{ width: 150 }} />
                </div>
            )}
            <RecipeFormComponent initialRecipe={editRecipe} saveRecipe={(recipe) => updateRecipe(id, recipe)} />
        </div>
    )
}

export default EditRecipe;