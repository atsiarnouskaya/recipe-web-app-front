import React, {useContext, useEffect} from "react";
import RecipeFormComponent from "../../Form/RecipeFormComponent";
import {useState} from "react";
import {useParams} from "react-router-dom";
import useFetching from "../../../hooks/useFetching";
import RecipeService from "../../../API/RecipeService";
import {RecipeContext} from "../../../API/Context";


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

    const {categories, setCategories} = useContext(RecipeContext);

    const [getCategories, isLoading, loadingCategoriesError] = useFetching(async () => {
        const response = await RecipeService.getAllCategories()
        setCategories(response.data._embedded.categories.map(category => {
            return {name: category.categoryName,
                    value: category.categoryName}
        }))

    })

    useEffect(() => {
        recipe(id)
        getCategories()
    }, [])

    return (
        <div>
            <RecipeFormComponent initialRecipe={editRecipe} saveRecipe={(recipe) => updateRecipe(id, recipe)} />
        </div>
    )
}

export default EditRecipe;