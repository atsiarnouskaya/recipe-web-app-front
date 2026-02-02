import React, {useContext, useEffect, useState} from "react";
import classes from "./Recipe.module.css";
import Button from "../Button/Button";
import RecipeService from "../../API/RecipeService";
import {useNavigate} from "react-router-dom";
import IngredientsBlockComponent from "./IngredientsBlockComponent";
import InstructionsBlockComponent from "./InstructionsBlockComponent";
import {AuthContext} from "../../API/Context";

const Recipe = ({recipe, deleteRecipe, editRecipe}) => {

    const router = useNavigate();
    const {user} = useContext(AuthContext);
    const [heartActive, setHeartActive] = useState(false);
    const [favouriteRecipes, setFavouriteRecipes] = useState([]);

    const getOptimizedImage = (publicId) => {
        const cloudName = 'dzarzvgmh';
        const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

        return `${baseUrl}/w_600,h_400,c_fill,g_auto,f_auto,q_auto/${publicId}`;
    };

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
        <div className={classes.recipeContainer}>

                <div className={classes.headerSection}>
                    <h2 className={classes.recipeTitle}>{recipe.title}</h2>
                    <p className={classes.recipeDescription}>{`${recipe.shortDescription}`}</p>
                    <div className={classes.metaInfo}>
                        <Button
                            className={`${classes.likeBtn} ${heartActive ? classes.liked : ''}`}
                            onClick={async (e) => {
                                e.preventDefault();
                                const response = await RecipeService.likeRecipe(recipe.id, heartActive);
                                if (response.status === 200) {
                                    setHeartActive(!heartActive);
                                }
                        } }> <
                            span className={classes.heartIcon}></span>
                            {heartActive ? 'Liked' : 'Like'}
                        </Button>
                    </div>
                </div>

            <div className={classes.contentWrapper}>
                <div className={classes.mediaColumn}>
                    <div className={classes.imagePlaceholder}>
                        {recipe.publicImageId && (
                            <img src={getOptimizedImage(recipe.publicImageId)} alt="Recipe" />
                        )}

                    </div>
                    {recipe.videoURL && (
                        <iframe
                            src={recipe.videoURL.replace("watch?v=", "embed/")}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Recipe Video Preview"
                            className={classes.videoPreview}
                        />

                    )}
                </div>

                <div className={classes.detailsColumn}>
                    <IngredientsBlockComponent ingredients={recipe.ingredients} />
                    <InstructionsBlockComponent instructions={recipe.steps} />
                </div>
            </div>



            {recipe.username === user.username
                &&
            <div className={classes.actionButtons}>
                <Button className={classes.deleteButton} onClick={() => deleteRecipe(recipe)}>Delete</Button>
                <Button className={classes.editButton} onClick={() => router(`/recipes/${recipe.id}/edit`)}>Edit</Button>
            </div>
            }
        </div>
    )
}

export default Recipe;