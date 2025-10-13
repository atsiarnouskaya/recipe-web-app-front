import classes from "./Recipe.module.css"

const InstructionsBlockComponent = ({instructions}) => {
    return (

            <div className={classes.section}>
                <div className={classes.instructionsTitle}>Instructions:</div>
                <div className={classes.instructions}>
                    {instructions}
                </div>
            </div>

    )
}

export default InstructionsBlockComponent;