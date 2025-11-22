import React, {useState, useEffect} from "react";
import InputComponent from "../Input/InputComponent";
import IngredientFormComponent from "./IngredientFormComponent";
import classes from "./FormStyle.module.css"
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";
import Validation from "../../Validation/Validation";

const RecipeFormComponent = ({saveRecipe, initialRecipe}) => {
    const [recipe, setRecipe] = useState(
        initialRecipe || {
        title: '',
        shortDescription: '',
        steps: '',
        ingredients: [],
        videoURL:'',
    });

    const [videoError, setVideoError] = useState("");

    useEffect(() => {
        if (initialRecipe) {
            setRecipe(initialRecipe);
            console.log(initialRecipe);
        }
    }, [initialRecipe]);

    const navigate = useNavigate();

    let isValid = false;

    return (
        <div>


            <form className={classes.form}>

                <h2 className={classes.h2}>Enter your recipe here</h2>

                <InputComponent type="text"
                                value={recipe.title}
                                placeholder="Recipe title"
                                onChange={(e) => setRecipe({...recipe, title: e.target.value})} />

                <InputComponent type="text"
                                placeholder="Description"
                                value={recipe.shortDescription}
                                onChange={(e) => setRecipe({...recipe, shortDescription: e.target.value})} />

                <textarea className={classes.textarea}
                          placeholder="Steps"
                          value={recipe.steps}
                          onChange={(e) => setRecipe({...recipe, steps: e.target.value})} />

                <IngredientFormComponent options={[
                    {
                        name: "l",
                        value: "l"
                    },
                    {
                        name: "ml",
                        value: "ml"
                    },
                    {
                        name: "kg",
                        value: "kg"
                    },
                    {
                        name: "g",
                        value: "g"
                    }
                    ]}
                    onChange={(ingredientsArray) => {
                        ingredientsArray.map(ingredient => ingredient.recipeName = recipe.title)
                        setRecipe({...recipe, ingredients: ingredientsArray})}
                    }
                    recipeTitle={recipe.title}
                    initialIngredients={recipe.ingredients}/>

                <InputComponent
                    type="url"
                    value={recipe.videoURL}
                    placeholder="Recipe video"
                    style = {{borderColor: isValid ? "red":""}}
                    onChange={(e) => {
                        const validUrl = Validation.youtubeURLValidation(e.target.value);

                        if (!validUrl.error) {
                            setRecipe({...recipe, videoURL: validUrl.url});
                            setVideoError("Enter a valid YouTube link");
                        } else {
                            setRecipe({...recipe, videoURL: validUrl.url});
                            setVideoError("");
                        }
                    }}/>
                {videoError && <p style={{color: "red"}}>{videoError}</p>}
                {!videoError && recipe.videoURL && (
                    <iframe
                        src={recipe.videoURL.replace("watch?v=", "embed/")}
                        className="w-full h-480 rounded-lg"
                        allowFullScreen
                    />
                )}


                <Button
                    disabled = {! (recipe.title && recipe.ingredients.length > 0 && recipe.steps && recipe.shortDescription)}
                    onClick={async (e) => {
                    e.preventDefault();
                    await saveRecipe(recipe);
                    navigate("/allRecipes");
                    }
                }
                >Save</Button>
            </form>
        </div>
    )
}

export default RecipeFormComponent;