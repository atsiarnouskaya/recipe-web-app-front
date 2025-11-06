import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import classes from "./NavbarStyle.module.css";
import Button from "../Button/Button";
import AuthService from "../../API/AuthService";
import {AuthContext} from "../../API/Context";

const Navbar = () => {

    const {isAuth, setIsAuth, user, setUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const logout = async () => {
        await AuthService.logout();
        setIsAuth(false)
        setUser(null)
        localStorage.setItem("auth", "false");
        localStorage.removeItem("user");
        navigate("/login")
    }

    if (!isAuth) {
        return null;
    }

    return (
        <div className={classes.navbar}>
            <Link className={classes.link} to={"/allRecipes"}>All recipes</Link>
            <Link className={classes.link} to={"/createRecipe"}>Create Recipe</Link>
            <Link className={classes.link} to={"/me"}>My Profile</Link>
            <Button className={classes.navbarBtn} onClick={() => logout()}>Logout</Button>

        </div>
    )
}

export default Navbar;