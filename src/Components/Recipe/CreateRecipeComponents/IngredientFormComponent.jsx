import React, {useContext, useEffect, useState} from "react";
import SelectComponent from "../../Select/SelectComponent";
import InputComponent from "../../Input/InputComponent";
import classes from "./FormStyle.module.css";
import btn from "../../AllRecipes/AllRecipesStyle.module.css";
import Button from "../../Button/Button";
import {RecipeContext} from "../../../API/Context";
import ComboboxComponent from "../../Combobox/ComboboxComponent";
import RecipeService from "../../../API/RecipeService";
import useFetching from "../../../hooks/useFetching";
import Validation from "../../../Validation/Validation";

const IngredientFormComponent = ({options, onChange, recipeTitle, initialIngredients}) => {

    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        if (initialIngredients) {
            setIngredients(initialIngredients);
        }
    }, [initialIngredients, ingredients])

    useEffect(() => {

        const getAllCategories = async () => {
            try {
                setLoading(true);
                const allCategories = await RecipeService.getAllCategories();
                const {status, data} = allCategories;
                if (status === 200) {
                    setCategories(data)
                }
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false);
            }
        }
        getAllCategories();
    }, [])


    const addIngredient = (e) => {

        e.preventDefault();

        const newIngredient = {
            ...ingredient,
            recipeName: recipeTitle,
            id: Date.now()
        }

        const updatedIngredients = [...ingredients, newIngredient]

        setIngredients(updatedIngredients)
        onChange(updatedIngredients)

        setIngredient({
            id:"",
            ingredientName: "",
            amount: "",
            unit: "",
            categoryName: ""
        })
    }

    const deleteIngredient = (ingr) => {
        const updated = ingredients.filter(ingredient => ingredient.id !== ingr.id);

        setIngredients(updated);
        onChange(updated);
    }

    return (
        <div className={classes.ingredientsSection}>
            <h4>Ingredients</h4>
            <h6>Please add all the ingredients you need in your recipe</h6>

            {ingredients.length > 0 && (
                <div className={classes.addedList}>
                    <h5>Added ingredients</h5>
                    {ingredients.map(ing => (
                        <div className={classes.ingredientRow} key={ing.id}>
                            <span className={classes.ingredientName}>{ing.ingredientName}</span>
                            <div className={classes.amountArea}>
                                <span>{ing.amount}</span>
                                <span>{ing.unit}</span>
                            </div>
                            <button
                                className={classes.deleteBtn}
                                onClick={() => deleteIngredient(ing)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className={classes.formControls}>

                <div className={classes.inputWrapper}>
                <label htmlFor={"ingredientName"}>Ingredient name</label>
                <InputComponent
                    id="ingredientName"
                    type={"text"}
                    value={ingredient.ingredientName}
                    placeholder="e.g. Sour cream"
                    onChange={(event) => {
                        const validateIngredientName = Validation.validateTextField(event.target.value);
                        setIngredient({...ingredient, ingredientName: validateIngredientName.textField})
                        setTextFieldError({...textFieldError, ingredientName: validateIngredientName.error})
                    }}
                    style={{borderColor: textFieldError.ingredientName ? "red" : ""}}/>

                {textFieldError.ingredientName && (<span className={classes.errorMessage}>{textFieldError.ingredientName}</span>)}
                </div>

                <div className={classes.inputWrapper}>
                <label htmlFor="category">Choose or provide a category</label>
                <ComboboxComponent
                    id="category"
                    options={categories}
                    placeholder="e.g. milk"
                    value={ingredient.categoryName}
                    onChange={(event) => {
                       const validateCategory = Validation.validateTextField(event);
                       setIngredient({...ingredient, categoryName: validateCategory.textField})
                       setTextFieldError({...textFieldError, categoryName: validateCategory.error})
                    }}
                    style={{borderColor: textFieldError.categoryName ? "red" : ""}}/>

                {textFieldError.categoryName && (<span className={classes.errorMessage}>{textFieldError.categoryName}</span>)}
                </div>

                <div className={classes.inputInlineGroup}>

                    <div className={classes.inputWrapper}>
                        <label htmlFor="amount">Amount</label>
                        <InputComponent
                            id="amount"
                            type={"number"}
                            value={ingredient.amount}
                            placeholder="e.g. 5"
                            onChange={(event) => {
                                const validateAmount = Validation.validateNumberField(event.target.value);
                                setIngredient({...ingredient, amount: validateAmount.numberField})
                                setTextFieldError({...textFieldError, amount: validateAmount.error})
                                }}
                            style={{borderColor: textFieldError.amount ? "red" : ""}}/>
                        {textFieldError.amount && (<span className={classes.errorMessage}>{textFieldError.amount}</span>)}

                    </div>

                    <div className={classes.inputWrapper}>
                        <label htmlFor="unit">Choose a unit</label>
                        <SelectComponent
                            id="unit"
                            options={options}
                            defaultValue={"Choose a unit"}
                            value={ingredient.unit}
                            onChange={(event) => setIngredient({...ingredient, unit: event.target.value})}/>

                    </div>

                </div>
                </div>

            <div className={classes.addBtnWrapper}>
            <Button
                disabled={!(ingredient.categoryName && ingredient.unit && ingredient.amount && ingredient.ingredientName &&
                !textFieldError.ingredientName && !textFieldError.categoryName && !textFieldError.unit)}
                onClick={(e) => addIngredient(e)}
                className={classes.addBtn}
            >
                + Add to list
            </Button>
            </div>
        </div>
        )
}

export default IngredientFormComponent;