import classes from "./AllRecipesPageStyle.module.css"
import React, {useEffect, useState} from "react";
import cat from "../../Utils/LottiesAnimations/loaderCat.json"
import RecipeService from "../../API/RecipeService";
import AllRecipesComponent from "../../Components/AllRecipes/AllRecipesComponent";
import Lottie from "lottie-react";
import {ReactComponent as NoRecipes} from "../../Utils/SVGs/recipeBook.svg";
import Button from "../../Components/Button/Button";
import {useNavigate} from "react-router-dom";

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [noRecipesFound, setNoRecipesFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const getAllRecipes = async () => {
            try {
                setLoading(true);
                const response = await RecipeService.getRecipes();
                const {data, status} = response

                if (status === 204) {
                    setNoRecipesFound(true);
                    setLoading(false);
                } else {
                    setNoRecipesFound(false);
                    setRecipes(data)
                    setLoading(false);
                }
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        getAllRecipes();
    }, []);

    const navigateToCreateRecipe = () => {
        navigate("/createRecipe");
    }

    if (loading && !error) return (
        <div className={classes.centerWrapper}>
            <Lottie animationData={cat} loop={true} size={100} />
        </div>
        )

    if (error) return (
        <div className={classes.centerWrapper}>
            <div className={classes.testArea}>
                <h2>Something went wrong...</h2>
            </div>
        </div>
    )

    if (!error && !loading && noRecipesFound) return (
        <div className={classes.noRecipeWrapper}>
            <div className={classes.testArea}>
                <h2>No recipes yet :(</h2>
                <h2>Start by adding your first recipe!</h2>
            </div>
            <Button onClick={(e) => {
                e.preventDefault();
                navigateToCreateRecipe();
            }}>
                Add recipe</Button>
            <NoRecipes
                width={400}
                height={400}
                onClick={(e) => {
                e.preventDefault();
                navigateToCreateRecipe();
            }}/>
        </div>)


    return (
        <AllRecipesComponent recipes={recipes} title='All recipes'/>
    )
}

export default AllRecipes