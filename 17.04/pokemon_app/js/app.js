"use strict"

window.onload = function () {
    const appElement = document.getElementById('app');
    const BASE_URL = "https://pokeapi.co/api/v2";

    (function () {
        window.onhashchange = function () {
            if (window.location.hash === "") {
                buildPokemonsList();
            }
        }
    })();

    if (window.location.hash === "") {
        buildPokemonsList();
    }

    initRoutes();

    function initRoutes() {
        new Router([
            new Route('index', "index.html", true),
            new Route('about', "about.html")
        ]);
    }

    function getPokemonsList() {
        return fetch(BASE_URL + "/pokemon?limit=20")
            .then(response => response.json());
    }


    function buildPokemonsList() {
        const listElement = document.createElement('ol');
        appElement.appendChild(listElement);
        getPokemonsList().then(res => {
            res.results.forEach(pokemon => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = "#about/" + pokemon.name;
                link.innerHTML = pokemon.name;
                link.addEventListener('click', () => getDetails(pokemon.name));
                listItem.appendChild(link);
                listElement.appendChild(listItem);
            })
        });
    }

    function getDetails(name) {
        let url = name;
        if (!name) {
            url = window.location.hash.replace(/.*\//, "");
        }
        fetch(BASE_URL + "/pokemon/" + url)
            .then(response => {
                return response.json();
            })
            .then(res => {
                buildPokemonDetails(res);
            });

    }

    function buildPokemonDetails(details) {
        const pokemonDetails = document.createElement('div');

        const template = `<div>
                            <h2>${details.name}</h2>
                            <img src="${details.sprites.front_default}">
                            <p>${details.weight}</p>
                        </div>`;
        pokemonDetails.innerHTML = template;
        appElement.appendChild(pokemonDetails);
    }

}
