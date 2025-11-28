import React, {useContext, useEffect, useState} from "react";
import SelectComponent from "../Select/SelectComponent";
import InputComponent from "../Input/InputComponent";
import classes from "./FormStyle.module.css";
import btn from "../AllRecipes/AllRecipesStyle.module.css";
import Button from "../Button/Button";
import {RecipeContext} from "../../API/Context";
import ComboboxComponent from "../Combobox/ComboboxComponent";
import RecipeService from "../../API/RecipeService";
import useFetching from "../../hooks/useFetching";
import Validation from "../../Validation/Validation";

const IngredientFormComponent = ({options, onChange, recipeTitle, initialIngredients}) => {

    const [ingredients, setIngredients] = useState([]);

    const [isAdded, setIsAdded] = useState(false);

    const [ingredient, setIngredient] = useState({
        id: "",
        recipeName: recipeTitle,
        ingredientName: "",
        amount: "",
        unit: "",
        categoryName: ""
    })

    const [textFieldError, setTextFieldError] = useState({
        ingredientName: "",
        categoryName: "",
        amount: ""
    });

    const {categories, setCategories} = useContext(RecipeContext);

    const [fetching, isLoading, error] = useFetching(async () => {
            const response = await RecipeService.getAllCategories()

            setCategories(response.data._embedded.categories.map(category => {
                return {name: category.categoryName,
                        value: category.categoryName}
            }))
        }
    );

    useEffect(() => {
        if (initialIngredients) {
            setIngredients(initialIngredients);
            setIsAdded(true);
        }
    }, [initialIngredients])


    const addIngredient = (e) => {

        setIsAdded(true);
        e.preventDefault();

        const newIngredient = {
            ...ingredient,
            id: Date.now()
        }

        setIngredients([...ingredients, newIngredient])

        onChange([...ingredients, newIngredient])

        setIngredient({
            id:"",
            ingredientName: "",
            recipeName: "",
            amount: "",
            unit: "",
            categoryName: ""
        })

        fetching();
    }

    const deleteIngredient = (ingr) => {
        const updated = ingredients.filter(ingredient => ingredient.id !== ingr.id);

        if (updated.length === 0) {
            setIsAdded(false);
        }

        setIngredients(updated);
        onChange(updated);
    }

    return (
        <div className={classes.ingredientsSection}>

            <div>
                {isAdded && <h4>Added ingredients</h4>}

                {ingredients.map(ingredient =>
                    (
                        <div className={classes.ingredientRow} key={ingredient.id}>
                            <span className={classes.ingredientName}>{ingredient.ingredientName}</span>
                            <span className={classes.amount}>{ingredient.amount}</span>
                            <span className={classes.unit}>{ingredient.unit}</span>
                        <Button className={btn.cardButton} onClick={() => deleteIngredient(ingredient)}>Delete</Button>
                        </div>
                    ))
                }


            </div>

            <InputComponent type={"text"}
                            value={ingredient.ingredientName}
                            placeholder="Ingredient name"
                            onChange={(event) => {
                                const validateIngredientName = Validation.validateTextField(event.target.value);
                                setIngredient({...ingredient, ingredientName: validateIngredientName.textField})
                                setTextFieldError({...textFieldError, ingredientName: validateIngredientName.error})}}
                            style={{borderColor: textFieldError.ingredientName ? "red" : ""}}/>

            {textFieldError.ingredientName && (<span className={classes.errorMessage}>{textFieldError.ingredientName}</span>)}

            <ComboboxComponent options={categories}
                               placeholder={"Category"}
                               value={ingredient.categoryName}
                               onChange={(event) => {
                                   const validateCategory = Validation.validateTextField(event);
                                   setIngredient({...ingredient, categoryName: validateCategory.textField})
                                   setTextFieldError({...textFieldError, categoryName: validateCategory.error})}}
                               style={{borderColor: textFieldError.categoryName ? "red" : ""}}/>

            {textFieldError.categoryName && (<span className={classes.errorMessage}>{textFieldError.categoryName}</span>)}

            <InputComponent type={"number"}
                            value={ingredient.amount}
                            placeholder="Amount"
                            onChange={(event) => {
                                const validateAmount = Validation.validateNumberField(event.target.value);
                                setIngredient({...ingredient, amount: validateAmount.numberField})
                                setTextFieldError({...textFieldError, amount: validateAmount.error})}}
                            style={{borderColor: textFieldError.amount ? "red" : ""}}/>
            {textFieldError.amount && (<span className={classes.errorMessage}>{textFieldError.amount}</span>)}


            <SelectComponent options={options}
                             defaultValue={"Choose a unit"}
                             value={ingredient.unit}
                             onChange={(event) => setIngredient({...ingredient, unit: event.target.value})}/>


            <Button disabled={!(ingredient.categoryName && ingredient.unit && ingredient.amount && ingredient.ingredientName)} onClick={(e) => addIngredient(e)}>Add ingredient</Button>
        </div>
        )
}

export default IngredientFormComponent;