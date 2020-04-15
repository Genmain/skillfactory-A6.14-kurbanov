const numDivs = 36;
const maxHits = 10;

let hits = 0;
let missVal = 0;
let firstHitTime = 0;

function round() {
    // FIXME: надо бы убрать "target" прежде чем искать новый
    $('.target').removeClass("target");
    let divSelector = randomDivId();
    console.log(divSelector);
    $(divSelector).addClass("target");
    // TODO: помечать target текущим номером
    $('.target').text(hits + 1);
    // FIXME: тут надо определять при первом клике firstHitTime
    if (hits === 0) {
        firstHitTime = getTimestamp();
    }
    if (hits === maxHits) {
        endGame();
    }
}

function endGame() {
    // FIXME: спрятать игровое поле сначала
    $('.game-field').addClass("d-none");
    let totalPlayedMillis = getTimestamp() - firstHitTime;
    let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
    $("#total-time-played").text(totalPlayedSeconds);

    $("#win-message").removeClass("d-none");
    $("#rating").text(hits - missVal);
}

function handleClick(event) {
    // FIXME: убирать текст со старых таргетов. Кажется есть .text?
    let currentTarget = $(event.target);
    $('.miss').removeClass('miss');
    if (currentTarget.hasClass("target")) {

        hits = hits + 1;
        currentTarget.text("");
        round();
    }
    // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
    else {
        currentTarget.addClass("miss");
        missVal += 1;
    }
}

function init() {
    // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
    $("#button-start").click(function() {
        $(".game-field").click(handleClick);
        $(".btn").toggleClass("d-none");
        round();
    });
    $("#button-reload").click(function() {
        location.reload();
    });
}

$(document).ready(init);