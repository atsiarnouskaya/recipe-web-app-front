import {createContext, useEffect, useState} from "react";

export const RecipeContext = createContext({
    categories: [],
    setCategories: () => {}
});


export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {

        const savedUser = localStorage.getItem("user");
        const savedAuth = localStorage.getItem("auth");
        console.log(isAuth);

        if (savedUser && savedAuth === "true") {
            setUser(JSON.parse(savedUser));
            setIsAuth(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};