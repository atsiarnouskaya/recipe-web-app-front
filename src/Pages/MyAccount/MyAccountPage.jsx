import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../API/Context";
import RecipeService from "../../API/RecipeService";
import AllRecipesComponent from "../../Components/AllRecipes/AllRecipesComponent";
import AccountInfoComponent from "../../Components/AccountInfo/AccountInfoComponent";
import Button from "../../Components/Button/Button";
import classes from "../../Components/AccountInfo/AccountInfoStyle.module.css"
import {ReactComponent as Cooking} from "../../Utils/SVGs/cooking2.svg";

const MyAccountPage = () => {

    const {user} = useContext(AuthContext);
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
                return (
                    <div className={classes.noRecipes}>
                        <h3>No recipes found 😢</h3>
                        <Cooking
                            width={400}
                            height={400}/>
                    </div>
                )

            } else {
                return <AllRecipesComponent recipes={userRecipes} title='Your recipes'/>
            }
        }
        if (activeTab === "liked") {
            if (noFavouritesFound) {
                return (
                    <div className={classes.noRecipeWrapper}>
                        <div className={classes.noRecipes}>
                            <h3>No liked recipes found 😢. Let's cook something!</h3>
                            <Cooking
                                width={400}
                                height={400}/>
                        </div>
                    </div>
                )
            } else {
                return <AllRecipesComponent recipes={userFavouriteRecipes} title='Your Favourite Recipes'/>
            }
        }
    }

    return (
        <div className={classes.profileContainer}>
            <AccountInfoComponent addedRecipesAmount={userRecipes.length} likedRecipesAmount={userFavouriteRecipes.length}/>
            <div className={classes.tabs}>
                <Button
                    className={`${classes.tabButton} ${activeTab === 'my' ? classes.activeTab : ''}`}
                    onClick={() => {setActiveTab("my");}}>My recipes</Button>
                <Button
                    className={`${classes.tabButton} ${activeTab === 'liked' ? classes.activeTab : ''}`}
                    onClick={() => {setActiveTab("liked")}}>Liked recipes</Button>
            </div>
            {renderTab()}
        </div>

    )
}

export default MyAccountPage;