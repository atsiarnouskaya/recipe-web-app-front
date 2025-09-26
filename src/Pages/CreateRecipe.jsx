import React, {useContext, useEffect, useState} from "react";
import useFetching from "../hooks/useFetching";
import RecipeFormComponent from "../Components/Form/RecipeFormComponent";
import RecipeService from "../API/RecipeService";
import {RecipeContext} from "../API/Context";

const CreateRecipePage = () => {

    const [recipes, setRecipes] = useState([]);

    const {categories, setCategories} = useContext(RecipeContext);

    const [saveRecipe, isSaving, recipeSavingError] = useFetching(async (recipe) => {
        const response = await RecipeService.saveRecipe(recipe)
        setRecipes([...recipes, response.data])
    })

    const [getCategories, isLoading, loadingCategoriesError] = useFetching(async () => {
        const response = await RecipeService.getAllCategories()
        console.log(response.data._embedded.categories)
        setCategories(response.data._embedded.categories.map(category => {
            return {name: category.categoryName,
                    value: category.categoryName}
        }))

    })

    const savingRecipe = (recipe) => {
        saveRecipe(recipe)
    }

    useEffect(() =>
    {getCategories()}, [])

    if (isSaving) {
        return <h3>Saving...</h3>
    }
    return (
        <RecipeFormComponent saveRecipe={savingRecipe} categories={categories} />
    )
}

export default CreateRecipePage;