import './App.css';
import RecipeService from "./API/RecipeService";
import { useEffect, useState } from "react";
import useFetching from "./hooks/useFetching";
import RecipeFormComponent from "./Components/Form/RecipeFormComponent";
import AllRecipes from "./Pages/AllRecipes";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<AllRecipes/>}
                           path={"/allRecipes"}/>

                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
