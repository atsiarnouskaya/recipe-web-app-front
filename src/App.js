import './App.css';
import RecipeService from "./API/RecipeService";
import { useEffect, useState } from "react";
import useFetching from "./hooks/useFetching";
import RecipeFormComponent from "./Components/Form/RecipeFormComponent";
import AllRecipesComponent from "./Components/AllRecipes/AllRecipesComponent";

function App() {
    const [recipes, setRecipes] = useState([]);

    const [fetchRecipes, isLoading, error] = useFetching(async () => {
        const response = await RecipeService.getRecipes()
        console.log(response.data)
        setRecipes(response.data)
    })

    const [saveRecipe, isSaving, recipeSavingError] = useFetching(async (recipe) => {
        const response = await RecipeService.saveRecipe(recipe)
        console.log(response.data)
        setRecipes([...recipes, response.data])
        fetchRecipes()
    })

    const savingRecipe = (recipe) => {
        saveRecipe(recipe)
    }


    useEffect(() => {
        fetchRecipes();
    }, []);

    if (isLoading) return <h2>Загрузка...</h2>;

    return (
        <div className="App">

            <AllRecipesComponent recipes={recipes} />
            <RecipeFormComponent saveRecipe={savingRecipe} />

        </div>
    );
}

export default App;
