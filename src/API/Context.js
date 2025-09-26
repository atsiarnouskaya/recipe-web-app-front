import {createContext} from "react";

export const RecipeContext = createContext({
    categories: [],
    setCategories: () => {}
});