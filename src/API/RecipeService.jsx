import axios from "axios";
import React from "react";

export default class RecipeService extends React.Component {
    static async getRecipes() {
        const response = await axios.get("http://localhost:8080/custom/recipes");

        return response;
    }

    static async getRecipe(id) {
        const response = await axios.get(`http://localhost:8080/custom/recipe/${id}`);

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

    static async getAllCategories() {
        const response = await axios.get("http://localhost:8080/categories");

        return response;
    }

    static async deleteRecipe(id) {
        const response = await axios.put(`http://localhost:8080/custom/deleteRecipe/${id}`);

        return response;
    }

    static async updateRecipe(id, recipe) {
        const response = await axios.put(`http://localhost:8080/custom/recipes/${id}`, recipe);

        return response;
    }
}