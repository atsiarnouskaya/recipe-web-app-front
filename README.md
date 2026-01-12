# Recipe web-application frontend (wersja po polsku)
To jest frontend mojego pet-projectu — aplikacji webowej z przepisami.
Oferuje m.in.:

- Rejestrację (z potwierdzeniem email poprzez wysyłanie kodu weryfikacyjnego) i logowanie

- Dodawanie własnych przepisów poprzez formularz

- Edytowanie i usuwanie **wyłącznie swoich** przepisów

- Lajkowanie i dislajkowanie przepisów

- Stronę konta z Twoimi dodanymi oraz polubionymi przepisami

## Endpoints
Tu są umieszczone endpointy, z których korzysta moja aplikacja.
#### Auth

```http
POST /signup - rejestracja użytkownika ({username, password})
POST /signin - logowanie użytkownika ({username, password})
POST /logout - wylogowanie ({})
```

#### Weryfikacja adresu email

```http
POST /verify - weryfikacja kodu ({email, verificationCode})
POST /resendVerificationCode - ponowne wysłanie ({email})
```

#### Recipes

```http
GET /custom/recipes - pobranie wszystkich przepisów z bazy
GET /custom/recipe/${id} - pobranie przepisu o id == id
GET /custom/recipes/${userId} - pobranie przepisów użytkownika o id == userId
GET /categories - pobranie wszystkich kategorii z bazy
GET /custom/${userId}/favRecipes - pobranie ulubionych przepisów użytkownika o id == userId
POST /custom/addRecipe - dodanie nowego przepisu ({recipe object})
PUT /custom/deleteRecipe/${id} - miękkie usunięcie przepisu (zmiana flagi w bazie) o id == id
PUT /custom/recipes/${id} - aktualizacja przepisu o id == id
PUT /custom/fav - polubienie lub usunięcie polubienia przepisu ({recipeId, mode (like or dislike)})
```

## Uruchamianie lokalnie

Zanim odpalisz projekt, upewnij się, że backend oraz baza danych są już postawione i działają.

Sklonuj repo

```bash
  git clone https://github.com/atsiarnouskaya/recipe-web-app-front.git
```

Wejdź do katalogu projektu

```bash
  cd recipe-web-app-front
```

Zainstaluj zależności

```bash
  npm install
```

Odpal lokalny serwer

```bash
  npm run start
```
Wejdź na http://localhost:3000, żeby zobaczyć aplikację w przeglądarce.

## Dalsze kroki
- Możliwość dodawania obrazów do przepisów. (Jest to zrobione na frontendzie, lecz nie na backendzie,
a więc zrobiłam No image available na ten moment.)
- Folder przepisów, które użytkownik spróbował przygotować z możliwością dodania własnych komentarzy
dotyczących czasu, smaku itd.
- Sortowanie według składników.

## Autor

- [@atsiarnouskaya](https://github.com/atsiarnouskaya)

# Recipe web-application frontend (in English)

This is a frontend part of my pet-project Recipe web-application. 

Main features include:

- User registration (with email verification via a verification code) and login

- Adding custom recipes through a form

- Editing and deleting only your own recipes

- Liking and disliking recipes

- User profile page with added and liked recipes


## Endpoints

Below are the endpoints used by the application.

#### Auth

```http
POST /signup  - user registration ({ username, password })
POST /signin  - user login ({ username, password })
POST /logout  - user logout ({})
```

#### Email Verification

```http
POST /verify - verify email address ({ email, verificationCode })
POST /resendVerificationCode - resend verification code ({ email })

```

#### Recipes

```http
GET /custom/recipes - get all recipes from a db
GET /custom/recipe/${id} - get recipe with id == id
GET /custom/recipes/${userId} - get users with id == userId recipes
GET /categories - get all categories from a db
GET /custom/${userId}/favRecipes - get users with id == userId favourite recipes
POST /custom/addRecipe - add a new recipe ({recipe object})
PUT /custom/deleteRecipe/${id} - soft delete (change a flag in a db) of recipe with id == id
PUT /custom/recipes/${id} - updating a recipe with id == id
PUT /custom/fav - liking or disliking a recipe ({recipeId, mode (like or dislike)})
```

## Run Locally

Before running this project please make sure the backend and database are already set up and running.

Clone the repository:

```bash
  git clone https://github.com/atsiarnouskaya/recipe-web-app-front.git
```

Go to the project directory

```bash
  cd recipe-web-app-front
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
Open http://localhost:3000 to view it in your browser.

## Future Improvements

- Ability to upload images for recipes.
(Currently implemented on the frontend only, backend support is missing, so a “No image available” placeholder is used.)

- A folder for recipes the user has already tried, with the option to add personal notes
(e.g. preparation time, taste, improvements).

- Ingredient-based sorting and filtering.

## Author

- [@atsiarnouskaya](https://github.com/atsiarnouskaya)

