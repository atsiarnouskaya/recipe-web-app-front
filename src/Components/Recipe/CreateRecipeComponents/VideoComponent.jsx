import {useState} from "react";
import InputComponent from "../../Input/InputComponent";
import Validation from "../../../Validation/Validation";
import classes from "./CreateRecipeSectionsStyle.module.css"

const VideoComponent = ({recipe, setRecipe}) => {

    const [videoError, setVideoError] = useState("");
    return (
        <div className={classes.recipeSection}>
            <h4>Extras (optional)</h4>
            <h6>Here you can enter a YouTube video link</h6>

            <label htmlFor="video">YouTube video</label>

            <div className={classes.inputGroup}>
                <InputComponent
                    type="url"
                    value={recipe.videoURL}
                    placeholder="Recipe video"
                    style = {{borderColor: videoError ? "red":""}}
                    onChange={(e) => {
                        const validUrl = Validation.youtubeURLValidation(e.target.value);
                            setRecipe({...recipe, videoURL: validUrl.url});
                            setVideoError(validUrl.error);
                    }}/>

                {videoError && <span className={classes.errorMessage}>{videoError}</span>}
            </div>

            {!videoError && recipe.videoURL && (
                <iframe
                    src={recipe.videoURL.replace("watch?v=", "embed/")}
                    className={classes.videoPreview}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Recipe Video Preview"
                />)}
        </div>
    )
}

export default VideoComponent