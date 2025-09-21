import React, {useState} from "react";
import SelectComponent from "../Select/SelectComponent";
import InputComponent from "../Input/InputComponent";
import classes from "./FormStyle.module.css"
import Button from "../Button/Button";

const IngredientFormComponent = ({options, onChange, recipeTitle}) => {

    const [ingredients, setIngredients] = useState([]);

    const [ingredient, setIngredient] = useState({
        id: "",
        recipeName: recipeTitle,
        name: "",
        amount: "",
        startUnit:"",
        endUnit:"",
        category: "",
        adjustingFactor: ""
    })


    const addIngredient = (e) => {

        e.preventDefault();

        const newIngredient = {
            ...ingredient,
            id: Date.now()
        }

        setIngredients([...ingredients, newIngredient])

        onChange([...ingredients, newIngredient])

        setIngredient({
            id:"",
            name: "",
            recipeName: recipeTitle,
            amount: "",
            startUnit:"",
            endUnit:"",
            category: "",
            adjustingFactor: ""
        })
    }

    const deleteIngredient = (ingr) => {
        setIngredients(ingredients.filter(ingredient => ingredient.id !== ingr.id))
    }

    return (
        <div className={classes.ingredientsSection}>

            <div>
                <h4>Добавленные ингредиенты</h4>

                {ingredients.map(ingredient =>
                    (
                        <div className={classes.ingredientRow}>
                         {ingredient.id} {ingredient.name} {ingredient.amount} {ingredient.startUnit}
                        <Button onClick={() => deleteIngredient(ingredient)}>Delete</Button>
                        </div>
                    ))
                }


            </div>



            <InputComponent type={"text"}
                            value={ingredient.name}
                            placeholder="Ingredient name"
                            onChange={(event) => setIngredient({
                ...ingredient,
                name: event.target.value
            })} />

            <InputComponent type={"number"}
                            value={ingredient.amount}
                            placeholder="Amount"
                            onChange={(event) => setIngredient({
                ...ingredient,
                amount: event.target.value
            })} />

            <InputComponent type={"text"}
                            value={ingredient.category}
                            placeholder="Category"
                            onChange={(event) => setIngredient({
                                ...ingredient,
                                category: event.target.value
                            })} />

            <SelectComponent options={options}
                             defaultValue={"Choose a unit"}
                             value={ingredient.startUnit}
                             onChange={(event) => setIngredient({...ingredient, unit: event.target.value})}/>

            <Button onClick={addIngredient}>Add ingredient</Button>
        </div>
        )
}

export default IngredientFormComponent;