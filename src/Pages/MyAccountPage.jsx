import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../API/Context";
import RecipeService from "../API/RecipeService";
import AllRecipesComponent from "../Components/AllRecipes/AllRecipesComponent";
import AccountInfoComponent from "../Components/AccountInfo/AccountInfoComponent";
import Button from "../Components/Button/Button";
import classes from "../Components/AccountInfo/AccountInfoStyle.module.css"

const MyAccountPage = () => {

    const {isAuth, setIsAuth, user, setUser} = useContext(AuthContext);
    const [userRecipes, setUserRecipes] = useState([]);
    const [userFavouriteRecipes, setUserFavouriteRecipes] = useState([]);
    const [activeTab, setActiveTab] = useState("my");
    const [noRecipesFound, setNoRecipesFound] = useState(false);
    const [noFavouritesFound, setNoFavouritesFound] = useState(false);

    const getUsersRecipes = async () => {
        const recipes = await RecipeService.getUsersRecipes(user.id);
        return recipes;
    }

    const getUserFavouriteRecipes = async () => {
        const recipes = await RecipeService.getUserFavouriteRecipes(user.id);
        return recipes;
    }

    useEffect(() => {
        const getRecipes = async () => {
            const recipes = await getUsersRecipes();
            const favs = await getUserFavouriteRecipes();
            if (recipes.status === 204) {
                setNoRecipesFound(true);
            } else {
                setNoRecipesFound(false);
                setUserRecipes(recipes.data);
            }

            if (favs.status === 204) {
                console.log(favs.status);
                setNoFavouritesFound(true);
            } else {
                setNoFavouritesFound(false);
                setUserFavouriteRecipes(favs.data);
            }

        }
        if (user && user.id) {
            getRecipes();
        }

    }, [user]);

    const renderTab = () => {
        if (activeTab === "my") {
            if (noRecipesFound) {
                return <h3>No recipes found ;(</h3>
            } else {
                return <AllRecipesComponent recipes={userRecipes} title='Your recipes'/>
            }
        }
        if (activeTab === "liked") {
            if (noFavouritesFound) {
                return <h3>No liked recipes found ;(</h3>
            } else {
                return <AllRecipesComponent recipes={userFavouriteRecipes} title='Your Favourite Recipes'/>
            }
        }
    }

    return (
        <div>
            <AccountInfoComponent />
            <div className={classes.tabs}>
                <Button className={classes.tabButton} onClick={() => {setActiveTab("my");}}>My recipes</Button>
                <Button className={classes.tabButton} onClick={() => {setActiveTab("liked")}}>Liked recipes</Button>
            </div>
            {renderTab()}
        </div>

    )
}

export default MyAccountPage;