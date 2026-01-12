import classes from "./Recipe.module.css"

const InstructionsBlockComponent = ({instructions}) => {
    return (

            <div className={classes.stepList}>
                <h3 className={classes.h3}>👨‍🍳 Instructions:</h3>
                <div className={classes.stepText}>
                    {instructions}
                </div>
            </div>

    )
}

export default InstructionsBlockComponent;