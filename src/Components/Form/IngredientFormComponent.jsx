import React, {useState} from "react";
import SelectComponent from "../Select/SelectComponent";
import InputComponent from "../Input/InputComponent";
import classes from "./FormStyle.module.css"
import Button from "../Button/Button";

const IngredientFormComponent = ({options, onChange, recipeTitle, categories}) => {

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
    }

    const deleteIngredient = (ingr) => {
        const ingredientsFilteredArray = ingredients.filter(ingredient => ingredient.id !== ingr.id)

        if (ingredientsFilteredArray.length === 0) {
            setIsAdded(false);
        }
        setIngredients(ingredientsFilteredArray)

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

            {/*<InputComponent type={"text"}
                            value={ingredient.category}
                            placeholder="Category"
                            onChange={(event) => setIngredient({
                                ...ingredient,
                                category: event.target.value
                            })} />*/}

            <SelectComponent options={categories}
                             defaultValue={"Choose a category"}
                             value={ingredient.categoryName}
                             onChange={(event) => setIngredient({
                                 ...ingredient,
                                 categoryName: event.target.value
                             })} />


            <SelectComponent options={options}
                             defaultValue={"Choose a unit"}
                             value={ingredient.startUnit}
                             onChange={(event) => setIngredient({...ingredient, startUnit: event.target.value})}/>


            <Button onClick={(e) => addIngredient(e)}>Add ingredient</Button>
        </div>
        )
}

export default IngredientFormComponent;