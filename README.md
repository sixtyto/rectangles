# Rectangles

## Zadanie

Twoje zadanie to napisanie aplikacji renderujacej dane pobrane z serwera. Serwer zwraca dane opisujące abstrakcyjne `płótno` na którym umieszczone zostały losowo rozmieszczone różnokolorowe prostokąty. Wykorzystaj przygotowane API aby pobrać dane.

## Wymagania

1. Pobierz informację o projekcie z końcówki/init o ile użytkownik nie podał ID projektu.

2. Pobierz opis projektu /project/{id} korzystając z id projektu

3. Narysować wizualną reprezentację pobranego projektu. Można rysować zarówno SVG jak i HTML - do wyboru. Każdy element projektu jest opisany przez położenie, wymiar oraz obrót. (uwaga położenie obiektu jest zawsze definiowane względem jego środka, wymiary `width`/`height` podane w układzie lokalnym tj. nieobroconym)

4. Dla każdego elementu na scenie proszę policzyć (bez używania API DOM) i narysowac minimalny prostokąt ograniczający (bounding box)

5. Dla każdego narysowanego elementu, zaznaczyć punkt środkowy oraz informację o obrocie elementu

6. Projekt powinien być automatycznie skalowany tak aby zawsze był widoczny w całości, rownież po zmianie rozmiaru okna przeglądarki.

7. Użytkownik powinien mieć możliwosć wyrenderowania dowolnego projektu podąjac jego ID (w tym scenariuszu aplikacja powinna pominąć krok 1.)

8. Aplikacja powinna poprawnie osbługiwać błędy API
---
## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
