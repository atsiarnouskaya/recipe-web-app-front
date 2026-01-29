import classes from "./CreateRecipeSectionsStyle.module.css";
import Validation from "../../../Validation/Validation";
import React, {useState} from "react";
import InputComponent from "../../Input/InputComponent";
import Dropzone from "react-dropzone";


const RecipeBasicsComponent = ({recipe, setRecipe}) => {

    const [textFieldError, setTextFieldError] = useState({
        title: "",
        shortDescription: ""
    });

    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        const imageOnDrop = acceptedFiles[0];
        setRecipe({...recipe, image: imageOnDrop});
        setImage(imageOnDrop);

        const objectURL = URL.createObjectURL(imageOnDrop);
        setPreview(objectURL);
    }

    return (
        <div className={classes.recipeSection}>

            <h4>Recipe basics</h4>
            <h6>Please enter the title and the short description of your recipe</h6>
            <h6>Also add a picture if you want. If not - a default image will be used</h6>

            <div className={classes.inputGroup}>
            <label htmlFor="title">Title</label>
            <InputComponent id="title"
                            type="text"
                            value={recipe.title}
                            placeholder="e.g. Carbonara"

                            onChange={(e) => {
                                const validateTitle = Validation.validateTextField(e.target.value, 50);
                                setTextFieldError({...textFieldError, title: validateTitle.error})
                                setRecipe({...recipe, title: validateTitle.textField});

                            }
                            }
                            style={{borderColor: textFieldError.title ? "red" : ""}}/>

            {textFieldError.title && (<span className={classes.errorMessage}>{textFieldError.title}</span>)}

            <label htmlFor="description">Short description</label>
            <InputComponent type="text"
                            id="description"
                            placeholder="e.g. Carbonara is a classic Roman pasta dish known for its incredible creaminess and rich, savory flavor."
                            value={recipe.shortDescription}

                            onChange={(e) =>
                            {
                                const validateShortDescription = Validation.validateTextField(e.target.value, 200);
                                setTextFieldError({...textFieldError, shortDescription: validateShortDescription.error})
                                setRecipe({...recipe, shortDescription: validateShortDescription.textField});
                            }
                            }
                            style={{borderColor: textFieldError.shortDescription ? "red" : ""}}/>
            {textFieldError.shortDescription && (<span className={classes.errorMessage}>{textFieldError.shortDescription}</span>)}
            </div>

            {!image && (
                <Dropzone onDrop={onDrop} maxFiles={1} accept={{
                'image/jpeg': [],
                'image/png': []
            }}>
                {({getRootProps, getInputProps}) => (
                     <div className={classes.dropzone}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Click me to upload a file!</p>
                        </div>
                     </div>
                )}
            </Dropzone>)}


            {preview && (
                <div>
                    <h6>Here is a preview!</h6>
                    <img src={preview} alt="preview" className={classes.imgPreview}/>
                </div>
            )}

        </div>
    )
}

export default RecipeBasicsComponent