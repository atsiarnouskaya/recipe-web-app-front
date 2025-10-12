import axios from "axios";
import React from "react";

export default class RecipeService extends React.Component {
    static async getRecipes() {
        const response = await axios.get("http://localhost:8080/custom/recipes",
            {withCredentials: true});

        return response;
    }

    static async getRecipe(id) {
        const response = await axios.get(`http://localhost:8080/custom/recipe/${id}`,
            {withCredentials: true});

        return response;
    }

    static async saveRecipe(recipe) {
        const response = await axios.post("http://localhost:8080/custom/addRecipe",
            recipe,
            {withCredentials: true});

        return response;
    }

    static async getAllCategories() {
        const response = await axios.get("http://localhost:8080/categories",
            {withCredentials: true});

        return response;
    }

    static async deleteRecipe(id) {
        const response = await axios.put(`http://localhost:8080/custom/deleteRecipe/${id}`, {},
            {withCredentials: true});

        return response;
    }

    static async updateRecipe(id, recipe) {
        const response = await axios.put(`http://localhost:8080/custom/recipes/${id}`, recipe,
            {withCredentials: true});

        return response;
    }
}