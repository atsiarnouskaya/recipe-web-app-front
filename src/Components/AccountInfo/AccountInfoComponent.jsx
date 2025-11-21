import {useContext} from "react";
import {AuthContext} from "../../API/Context";
import classes from "./AccountInfoStyle.module.css"

const AccountInfoComponent = () => {

    const {user} = useContext(AuthContext);

    if (!user) {
        return null;
    }

    return (
        <div className={classes.profileContainer}>
            <h1 className={classes.profileHeader}>Hello, {user.username}!</h1>
            <p className={classes.profileHeader}>Here you can find your own recipes, edit them or delete,
                and your favourite recipes.</p>
        </div>
    )
}

export default AccountInfoComponent;