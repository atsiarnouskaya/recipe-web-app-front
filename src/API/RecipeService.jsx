import axios from "axios";
import React from "react";

export default class RecipeService extends React.Component {
    static async getRecipes() {
        const response = await axios.get("http://localhost:8080/custom/recipes",
            {withCredentials: true});

        return response;
    }

    static async getUsersRecipes(userId) {
        const response = await axios.get(`http://localhost:8080/custom/recipes/${userId}`,
            {withCredentials: true})
        return response;
    }

    static async getUserFavouriteRecipes(userId) {
        const response = await axios.get(`http://localhost:8080/custom/${userId}/favRecipes`,
            {withCredentials: true});
        return response;
    }

    static async getRecipe(id) {
        const response = await axios.get(`http://localhost:8080/custom/recipe/${id}`,
            {withCredentials: true});

        return response;
    }

    static async saveRecipe(recipe) {
        const formData = new FormData();
        const recipeBlob = new Blob([JSON.stringify({
            title: recipe.title,
            shortDescription: recipe.shortDescription,
            steps: recipe.steps,
            ingredients: recipe.ingredients,
            videoURL: recipe.videoURL
        })], { type: 'application/json' });

        formData.append("recipeJSON", recipeBlob);
        if (recipe.image) {
            formData.append("image", recipe.image);
        }
        const response = await axios.post("http://localhost:8080/custom/addRecipe",
            formData,
            {withCredentials: true});

        return response;
    }

    static async getAllCategories() {
        const response = await axios.get("http://localhost:8080/custom/categories",
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

    static async likeRecipe(recipeId, mode) {
        const response = await axios.put(`http://localhost:8080/custom/fav`, {recipeId:recipeId, isLiked:mode},
            {withCredentials: true});
        return response;
    }
}