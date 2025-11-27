import React, {useContext, useEffect, useState} from "react";
import classes from "./Recipe.module.css";
import Button from "../Button/Button";
import RecipeService from "../../API/RecipeService";
import {useNavigate} from "react-router-dom";
import IngredientsBlockComponent from "./IngredientsBlockComponent";
import InstructionsBlockComponent from "./InstructionsBlockComponent";
import {AuthContext} from "../../API/Context";
import Heart from "react-heart";

const Recipe = ({recipe, deleteRecipe, editRecipe}) => {

    const router = useNavigate();
    const {user} = useContext(AuthContext);
    const [heartActive, setHeartActive] = useState(false);
    const [favouriteRecipes, setFavouriteRecipes] = useState([]);

    useEffect(() => {
        const getLikedRecipes = async () => {
            const response = await RecipeService.getUserFavouriteRecipes(user.id);
            if (response.status === 200) {
                setFavouriteRecipes(response.data);
            }
        }
        getLikedRecipes();
    }, []);

    useEffect(() => {
        if (favouriteRecipes.length > 0) {
            if (favouriteRecipes.some((fav) => fav.id === recipe.id)) {
                setHeartActive(true);
            }
        }
    }, [favouriteRecipes, recipe.id]);

    return (
        <div>
            <div key={recipe.id} className={classes.recipeCard}>

                <div className={classes.headerRow}>
                    <h2 className={classes.recipeTitle}>{recipe.title}</h2>
                    <Button  className={`${classes.likeBtn} ${heartActive ? classes.liked : ''}`}  onClick={async (e) => {
                        e.preventDefault();
                        const response = await RecipeService.likeRecipe(recipe.id, heartActive);
                        if (response.status === 200) {

                            setHeartActive(!heartActive);
                        }
                    } }> like</Button>
                </div>





                <p className={classes.description}>{`${recipe.shortDescription}`}</p>

                <IngredientsBlockComponent ingredients={recipe.ingredients} />

                <InstructionsBlockComponent instructions={recipe.steps} />

                {recipe.videoURL && (
                    <iframe
                        src={recipe.videoURL.replace("watch?v=", "embed/")}
                        allowFullScreen
                    />

                )}
            </div>



            {recipe.username === user.username
                &&
            <div className={classes.actions}>
                <Button className={classes.button} onClick={() => deleteRecipe(recipe)}>Delete</Button>
                <Button className={classes.button} onClick={() => router(`/recipes/${recipe.id}/edit`)}>Edit</Button>
            </div>
            }
        </div>
    )
}

export default Recipe;