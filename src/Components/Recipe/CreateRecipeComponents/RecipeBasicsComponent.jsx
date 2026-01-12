import classes from "./CreateRecipeSectionsStyle.module.css";
import Validation from "../../../Validation/Validation";
import React, {useState} from "react";
import InputComponent from "../../Input/InputComponent";


const RecipeBasicsComponent = ({recipe, setRecipe}) => {

    const [textFieldError, setTextFieldError] = useState({
        title: "",
        shortDescription: ""
    });

    return (
        <div className={classes.recipeSection}>

            <h4>Recipe basics</h4>
            <h6>Please enter the title and the short description of your recipe</h6>

            <div className={classes.inputGroup}>
            <label htmlFor="title">Title</label>
            <InputComponent id="title"
                            type="text"
                            value={recipe.title}
                            placeholder="e.g. Carbonara"

                            onChange={(e) => {
                                const validateTitle = Validation.validateTextField(e.target.value, 50);
                                setTextFieldError({...textFieldError, title: validateTitle.error})
                                setRecipe({...recipe, title: validateTitle.textField});

                            }
                            }
                            style={{borderColor: textFieldError.title ? "red" : ""}}/>

            {textFieldError.title && (<span className={classes.errorMessage}>{textFieldError.title}</span>)}

            <label htmlFor="description">Short description</label>
            <InputComponent type="text"
                            id="description"
                            placeholder="e.g. Carbonara is a classic Roman pasta dish known for its incredible creaminess and rich, savory flavor."
                            value={recipe.shortDescription}

                            onChange={(e) =>
                            {
                                const validateShortDescription = Validation.validateTextField(e.target.value, 200);
                                setTextFieldError({...textFieldError, shortDescription: validateShortDescription.error})
                                setRecipe({...recipe, shortDescription: validateShortDescription.textField});
                            }
                            }
                            style={{borderColor: textFieldError.shortDescription ? "red" : ""}}/>
            {textFieldError.shortDescription && (<span className={classes.errorMessage}>{textFieldError.shortDescription}</span>)}
            </div>
        </div>
    )
}

export default RecipeBasicsComponent