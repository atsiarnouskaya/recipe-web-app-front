import {useContext} from "react";
import {AuthContext} from "../../API/Context";
import classes from "./AccountInfoStyle.module.css"

const AccountInfoComponent = ({likedRecipesAmount, addedRecipesAmount}) => {

    const {user} = useContext(AuthContext);

    if (!user) {
        return null;
    }

    return (
        <div className={classes.header}>
            <h1>Hello, {user.username}!</h1>
            <p>Here you can find your own recipes, edit them or delete,
                and your favourite recipes.</p>
            <p>You have created {addedRecipesAmount} recipes and liked {likedRecipesAmount} recipes!</p>
        </div>
    )
}

export default AccountInfoComponent;