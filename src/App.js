import './App.css';
import AllRecipes from "./Pages/AllRecipes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRecipe from "./Pages/CreateRecipe";
import Navbar from "./Components/Navigation/Navbar";
import RecipeById from "./Pages/RecipeById"
import EditRecipe from "./Components/Recipe/Editing/EditRecipe"
import LoginPage from "./Pages/LoginPage"
import {AuthContext, AuthProvider, RecipeContext} from "./API/Context";
import {useState, useEffect} from "react";
import RegisterPage from "./Pages/RegisterPage";
import RegistrationSuccess from "./Components/Registration/RegistrationSuccess";
import AppRouterComponent from "./Components/AppRouter/AppRouterComponent";


function App() {

    const [categories, setCategories] = useState([]);

    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState({
        id: 0,
        username: ""
    });


    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsLoading(false)

    }, [])

    return (
        <div className="App">

            <RecipeContext.Provider value={{categories, setCategories}}>
                <AuthProvider>
                <BrowserRouter>

                    <Navbar />

                    <AppRouterComponent />

                </BrowserRouter>
                </AuthProvider>
            </RecipeContext.Provider>

        </div>
    );
}

export default App;
