import React from "react";
import {Link} from "react-router-dom";
import classes from "./NavbarStyle.module.css";

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <Link className={classes.link} to={"/allRecipes"}>All recipes</Link>
            <Link className={classes.link} to={"/createRecipe"}>Create Recipe</Link>

        </div>
    )
}

export default Navbar;