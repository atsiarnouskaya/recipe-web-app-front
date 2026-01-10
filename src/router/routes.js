import AllRecipes from "../Pages/AllRecipes";
import CreateRecipe from "../Pages/CreateRecipe";
import RecipeById from "../Pages/RecipeById";
import EditRecipe from "../Components/Recipe/Editing/EditRecipe";
import LoginPage from "../Pages/Login/LoginPage";
import RegisterPage from "../Pages/Registration/RegisterPage";
import RegistrationSuccess from "../Components/Registration/RegistrationSuccess";
import MyAccountPage from "../Pages/MyAccountPage";
import VerifyEmailPage from "../Pages/EmailVerification/VerifyEmailPage";

export const privateRoutes = [
    {path: '/allRecipes', component: <AllRecipes/>},
    {path: '/createRecipe', component: <CreateRecipe/>},
    {path: '/recipe/:id', component: <RecipeById />},
    {path: 'recipes/:id/edit', component: <EditRecipe />},
    {path: '/me', component: <MyAccountPage />},
]

export const publicRoutes = [
    {path: '/login', component: <LoginPage/>},
    {path: '/register', component: <RegisterPage/>},
    {path: '/verifyEmail', component: <VerifyEmailPage/>},
    {path: '/register-success', component: <RegistrationSuccess />}
]