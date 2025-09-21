import classes from "../Components/AllRecipes/AllRecipesStyle.module.css";
import React, {useEffect, useState} from "react";
import useFetching from "../hooks/useFetching";
import RecipeService from "../API/RecipeService";

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    const [fetchRecipes, isLoading, error] = useFetching(async () => {
        const response = await RecipeService.getRecipes()
        console.log(response.data)
        setRecipes(response.data)
    })

    useEffect(() => {
        fetchRecipes();
    }, []);

    if (isLoading) return <h3>Loading...</h3>;

    return (
        <div>
            <h2>All recipes</h2>
            <br></br>
            {recipes.map((recipe) => (
                <div key={recipe.id} className={classes.wrapper}>
                    <h2 className={classes.h2}>{recipe.title}</h2>

                    <p>{`Short description ${recipe.shortDescription}`}</p>

                    <p>{`Instructions: ${recipe.steps}`}</p>
                </div>
            ))}
        </div>
    )
}

export default AllRecipes