import Validation from "../../../Validation/Validation";
import {useState} from "react";
import classes from "./CreateRecipeSectionsStyle.module.css"


const RecipeStepsComponent = ({recipe, setRecipe}) => {

    const [stepsFieldError, setStepsFieldError] = useState();
    return (
        <div className={classes.recipeSection}>
            <h4>Cooking steps</h4>
            <h6>Provide instructions for your recipe</h6>

            <label htmlFor="steps">Instructions</label>
            <textarea className={classes.textareaField}
                      id="steps"
                      placeholder="Steps"
                      value={recipe.steps}
                      onChange={(e) =>
                      {
                          const validateSteps = Validation.validateTextField(e.target.value, 2000);
                          setStepsFieldError(validateSteps.error)
                          setRecipe({...recipe, steps: validateSteps.textField})}
                      }
                      style={{borderColor: stepsFieldError ? "red" : ""}}/>
            {stepsFieldError && (<span className={classes.errorMessage}>{stepsFieldError}</span>)}

        </div>
    )
}

export default RecipeStepsComponent;