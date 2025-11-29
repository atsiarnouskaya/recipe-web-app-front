# Recipe web-application frontend (wersja po polsku)
To jest frontend mojego pet-projectu — aplikacji webowej z przepisami.
Oferuje m.in.:

- Rejestrację i logowanie

- Dodawanie własnych przepisów poprzez formularz

- Edytowanie i usuwanie wyłącznie swoich przepisów — jeśli nie jesteś autorem, nie masz takiej opcji

- Lajkowanie i dislajkowanie przepisów

- Stronę konta z Twoimi dodanymi oraz polubionymi przepisami

## Endpoints

#### Auth

```http
    POST /signup - rejestracja użytkownika ({username, password})
    POST /signin - logowanie użytkownika ({username, password})
    POST /logout - wylogowanie ({})
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


## Autor

- [@atsiarnouskaya](https://github.com/atsiarnouskaya)

# Recipe web-application frontend (in English)

This is a frontend part of my pet-project Recipe web-application. It provides with functionalities as:



- Signing up and signing in
- Adding your own recipes using a form
- Editing or deleting only your own recipes! If you are not the authoer you won't be able to delete a recipe
- Liking and disliking
- Your account page with recipes you have added and liked




## Endpoints

#### Auth

```http
    POST /signup - signing up ({username, password})
    POST /signin - signing in ({username, password})
    POST /logout - loging out ({})
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

Before running this project please ensure you have backend part and a db running

Clone the project

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


## Author

- [@atsiarnouskaya](https://github.com/atsiarnouskaya)

