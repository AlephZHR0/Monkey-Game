document.getElementById("play").addEventListener("click", function() {
var lista = document.getElementById("listaDificuldades");
if (lista.style.display === "none") {
    lista.style.display = "block";
} else {
    lista.style.display = "none";
}
});

explicacao = function() {
    window.location.href="Explicação/explicacao.html";
}

creditos = function() {
    window.location.href = "Creditos/creditos.html";
}

easy = function() {
    window.location.href = "Jogo/game.html?rows=3&cols=3";
}

medium = function() {
    window.location.href = "Jogo/game.html?rows=4&cols=4";
}

hard = function() {
    window.location.href = "Jogo/game.html?rows=5&cols=5";
}

monkey = function() {
    window.location.href = "Jogo/game.html?rows=5&cols=8";
}