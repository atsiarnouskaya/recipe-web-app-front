import axios from "axios";
import React from "react";

export default class RecipeService extends React.Component {
    static async getRecipes() {
        const response = await axios.get("http://localhost:8080/custom/recipes");

        return response;
    }

    static async saveRecipe(recipe) {
        const response = await axios.post("http://localhost:8080/custom/addRecipe",
            recipe,
            {auth: {
                username: "nastya",
                password: "root"
        }});

        return response;
    }
}