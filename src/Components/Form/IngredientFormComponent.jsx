import React, {useContext, useEffect, useState} from "react";
import SelectComponent from "../Select/SelectComponent";
import InputComponent from "../Input/InputComponent";
import classes from "./FormStyle.module.css"
import Button from "../Button/Button";
import {RecipeContext} from "../../API/Context";
import ComboboxComponent from "../Combobox/ComboboxComponent";
import RecipeService from "../../API/RecipeService";
import useFetching from "../../hooks/useFetching";

const IngredientFormComponent = ({options, onChange, recipeTitle, initialIngredients}) => {

    const [ingredients, setIngredients] = useState([]);

    const [isAdded, setIsAdded] = useState(false);

    const [ingredient, setIngredient] = useState({
        id: "",
        recipeName: recipeTitle,
        ingredientName: "",
        amount: "",
        startUnit: "",
        endUnit: "",
        categoryName: "",
        adjustingFactor: ""
    })

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
        console.log("Use effect")
        if (initialIngredients) {
            console.log(initialIngredients);
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
        console.log(ingredients)

        setIngredient({
            id:"",
            ingredientName: "",
            recipeName: "",
            amount: "",
            startUnit:"",
            endUnit:"",
            categoryName: "",
            adjustingFactor: ""
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
                         {ingredient.id} {ingredient.ingredientName} {ingredient.amount} {ingredient.startUnit}
                        <Button onClick={() => deleteIngredient(ingredient)}>Delete</Button>
                        </div>
                    ))
                }


            </div>



            <InputComponent type={"text"}
                            value={ingredient.ingredientName}
                            placeholder="Ingredient name"
                            onChange={(event) => setIngredient({
                ...ingredient,
                                ingredientName: event.target.value
            })} />

            <InputComponent type={"number"}
                            value={ingredient.amount}
                            placeholder="Amount"
                            onChange={(event) => setIngredient({
                ...ingredient,
                amount: event.target.value
            })} />

            <ComboboxComponent options={categories}
                               placeholder={"Category"}
                               value={ingredient.categoryName}
                               onChange={(val) => setIngredient({
                                   ...ingredient,
                                   categoryName: val
                               })}/>

            <SelectComponent options={options}
                             defaultValue={"Choose a unit"}
                             value={ingredient.startUnit}
                             onChange={(event) => setIngredient({...ingredient, startUnit: event.target.value})}/>




            <Button onClick={(e) => addIngredient(e)}>Add ingredient</Button>
        </div>
        )
}

export default IngredientFormComponent;