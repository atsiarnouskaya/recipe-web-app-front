import React from "react";
import RecipeFormComponent from "../../Form/RecipeFormComponent";
import {useState} from "react";
import {useParams} from "react-router-dom";
import useFetching from "../../../hooks/useFetching";
import RecipeService from "../../../API/RecipeService";


const EditRecipe = () => {

    const [editRecipe, setEditRecipe] = useState({
        title: '',
        shortDescription: '',
        steps: '',
        ingredients: '',
    });

    const {id} = useParams();

    const [recipe, loading, error] = useFetching(async () => {
        const response = await RecipeService.getRecipe(id)
        setEditRecipe(recipe)
    })


    return (
        <div>
            <RecipeFormComponent initialRecipe={recipe} />
        </div>
    )
}

export default EditRecipe;