import './App.css';
import AllRecipes from "./Pages/AllRecipes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRecipe from "./Pages/CreateRecipe";
import Navbar from "./Components/Navigation/Navbar";
import RecipeById from "./Pages/RecipeById"
import EditRecipe from "./Components/Recipe/Editing/EditRecipe"
import {RecipeContext} from "./API/Context";
import {useState} from "react";


function App() {

    const [categories, setCategories] = useState([]);

    return (
        <div className="App">

            <RecipeContext.Provider value={{categories, setCategories}}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route element={<AllRecipes/>}
                               path={"/allRecipes"}/>

                        <Route element={<CreateRecipe />}
                               path={"/createRecipe"}/>

                        <Route element={<RecipeById />}
                               path={"/recipe/:id"}/>

                        <Route element={<EditRecipe />}
                               path={"recipes/:id/edit"}/>

                    </Routes>
                </BrowserRouter>
            </RecipeContext.Provider>

        </div>
    );
}

export default App;
