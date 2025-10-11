import React, {useContext} from "react";
import {Link} from "react-router-dom";
import classes from "./NavbarStyle.module.css";
import Button from "../Button/Button";
import AuthService from "../../API/AuthService";
import {AuthContext} from "../../API/Context";

const Navbar = () => {

    const {isAuth, setIsAuth, user, setUser} = useContext(AuthContext);

    const logout = () => {
        const response = AuthService.logout();
        setIsAuth(false)
    }

    return (
        <div className={classes.navbar}>
            <Link className={classes.link} to={"/allRecipes"}>All recipes</Link>
            <Link className={classes.link} to={"/createRecipe"}>Create Recipe</Link>
            <Button onClick={() => logout}>Logout</Button>

        </div>
    )
}

export default Navbar;