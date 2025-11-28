import classes from "../Components/AllRecipes/AllRecipesStyle.module.css";
import React, {useEffect, useState} from "react";
import useFetching from "../hooks/useFetching";
import RecipeService from "../API/RecipeService";
import AllRecipesComponent from "../Components/AllRecipes/AllRecipesComponent";

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [noRecipesFound, setNoRecipesFound] = useState(false);

    const [fetchRecipes, isLoading, error] = useFetching(async () => {
        const response = await RecipeService.getRecipes()
        if(response.status === 204) {
            setNoRecipesFound(true);
        } else {
            setRecipes(response.data)
            setNoRecipesFound(false);
        }

    })

    useEffect(() => {
        fetchRecipes().then();
    }, []);

    if (isLoading) return <h3>Loading...</h3>;
    if (noRecipesFound) return <h3>No recipes found ;(</h3>;

    return (
        <AllRecipesComponent recipes={recipes} title='All recipes'/>
    )
}

export default AllRecipes