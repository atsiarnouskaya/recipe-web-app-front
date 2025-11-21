import classes from "../Components/AllRecipes/AllRecipesStyle.module.css";
import React, {useEffect, useState} from "react";
import useFetching from "../hooks/useFetching";
import RecipeService from "../API/RecipeService";
import AllRecipesComponent from "../Components/AllRecipes/AllRecipesComponent";

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    const [fetchRecipes, isLoading, error] = useFetching(async () => {
        const response = await RecipeService.getRecipes()
        setRecipes(response.data)
    })

    useEffect(() => {
        fetchRecipes().then();
    }, []);

    if (isLoading) return <h3>Loading...</h3>;

    return (
        <AllRecipesComponent recipes={recipes} title='All recipes'/>

    )
}

export default AllRecipes