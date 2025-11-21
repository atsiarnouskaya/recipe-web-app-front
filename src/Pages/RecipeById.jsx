import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useFetching from "../hooks/useFetching";
import RecipeService from "../API/RecipeService";
import Recipe from "../Components/Recipe/Recipe";
import App from "../App";

const RecipeById = () => {
    const params = useParams()

    const router = useNavigate()

    const [recipe, setRecipe] = useState({
        title: "",
        shortDescription: "",
        steps: "",
        ingredients: [],
        username:"",
        userId:0
    });


    const [fetching, loading, error] = useFetching(async (id) => {

        const response = await RecipeService.getRecipe(id)
        setRecipe(response.data)
    });

    useEffect(() => {
        fetching(params.id);

    },[params.id])

    const [deleteRecipeFetching, deleting, deletingError] = useFetching(async (id) => {
        const response = await RecipeService.deleteRecipe(id)
    })

    const [editRecipeFetching, editing, editError] = useFetching(async (id) => {
        const response = await RecipeService.editRecipe(id)
    })

    const deleteRecipe = async (recipe) => {
        await deleteRecipeFetching(recipe.id)
        router("/allRecipes")
    }

    const editRecipe = async (recipe) => {
        await editRecipeFetching(recipe.id)
    }

    if (loading) {
        return <h3>Loading...</h3>
    }

    return (
        <div>

            <Recipe recipe={recipe} deleteRecipe={deleteRecipe} editRecipe={editRecipe} />

        </div>
    )
}
export default RecipeById;