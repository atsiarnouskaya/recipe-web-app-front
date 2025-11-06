import {useContext} from "react";
import {AuthContext} from "../../API/Context";
import classes from "./AccountInfoStyle.module.css"

const AccountInfoComponent = () => {

    const {user} = useContext(AuthContext);

    if (!user) {
        return null;
    }

    return (
        <div>
            <h2 className={classes.h2}>Hello, {user.username}!</h2>
            <h3 className={classes.h3}>Here you can find your own recipes, edit them or delete,
                and your favourite recipes.</h3>
        </div>
    )
}

export default AccountInfoComponent;