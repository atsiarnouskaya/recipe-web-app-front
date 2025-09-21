import React from "react";
import classes from "./ButtonStyle.module.css"

const Button = ({children, ...props}) => {
    return (
        <button className={classes.myBtn} {...props}>{children}</button>
    )
}

export default Button;

