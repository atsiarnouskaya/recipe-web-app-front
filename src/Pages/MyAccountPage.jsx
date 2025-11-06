import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../API/Context";
import RecipeService from "../API/RecipeService";
import AllRecipesComponent from "../Components/AllRecipes/AllRecipesComponent";
import AccountInfoComponent from "../Components/AccountInfo/AccountInfoComponent";

const MyAccountPage = () => {

    const {isAuth, setIsAuth, user, setUser} = useContext(AuthContext);

    const [userRecipes, setUserRecipes] = useState([]);

    const [userFavouriteRecipes, setUserFavouriteRecipes] = useState([]);

    const getUsersRecipes = async () => {
        const recipes = await RecipeService.getUsersRecipes(user.id);
        return recipes.data;
    }

    const getUserFavouriteRecipes = async () => {
        const recipes = await RecipeService.getUserFavouriteRecipes(user.id);
        return recipes.data;
    }

    useEffect(() => {
        const getRecipes = async () => {
            const recipes = await getUsersRecipes();
            const favs = await getUserFavouriteRecipes();
            setUserRecipes(recipes);
            setUserFavouriteRecipes(favs);
        }
        if (user && user.id) {
            getRecipes();
        }

    }, [user.id]);

    return (
        <div>
            <AccountInfoComponent />
            <AllRecipesComponent recipes={userRecipes} />
            <AllRecipesComponent recipes={userFavouriteRecipes} />
        </div>

    )
}

export default MyAccountPage;