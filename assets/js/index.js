var cards = [
    {
        color: "#f48fb1",
        image: "",
        value: "1",
    },
    {
        color: "#f48fb1",
        image: "",
        value: "1",
    },
    {
        color: "#9575cd",
        image: "",
        value: "2",
    },
    {
        color: "#9575cd",
        image: "",
        value: "2",
    },
    {
        color: "#42a5f5",
        image: "",
        value: "3",
    },
    {
        color: "#42a5f5",
        image: "",
        value: "3",
    },
    {
        color: "#66bb6a",
        image: "",
        value: "4",
    },
    {
        color: "#66bb6a",
        image: "",
        value: "4",
    },
    {
        color: "#ffeb3b",
        image: "",
        value: "5",
    },
    {
        color: "#ffeb3b",
        image: "",
        value: "5",
    },
    {
        color: "#fb8c00",
        image: "",
        value: "6",
    },
    {
        color: "#fb8c00",
        image: "",
        value: "6",
    },
    {
        color: "#e53935",
        image: "",
        value: "7",
    },
    {
        color: "#e53935",
        image: "",
        value: "7",
    },
    {
        color: "#a1887f",
        image: "",
        value: "8",
    },
    {
        color: "#a1887f",
        image: "",
        value: "8",
    },
];

function shuffle(a) {
    var j = 0;
    var valI = '';
    var valJ = valI;
    var l = a.length - 1;
    while (l > -1) {
        j = Math.floor(Math.random() * l);
        valI = a[l];
        valJ = a[j];
        a[l] = valJ;
        a[j] = valI;
        l = l - 1;
    }
    return a;
}

function reset_board(){
    $("#board_game").html('');
}

function generate_card(card){
    var o__html = "<div class='card' data-value='" + card.value + "'>";
    o__html += "<div class='front' style='background-color:" + card.color + "'>" + card.value + "</div>";
        o__html += "<div class='back'></div>";
    o__html += "</div>";
    return o__html;
}

function new_game() {
    reset_board();

    shuffle_cards = shuffle(cards);
    board = $("#board_game");

    for (var i in shuffle_cards) {
        board.append(generate_card(shuffle_cards[i]));
    }
}

function select_card($i__card) {
    $l__board = $("#board_game");
    $l__board.addClass("disabled");
    $l__other_card_open = $(".card.hover");
    $i__card.addClass("hover");

    // si une carte est déjà affichée
    if ($l__other_card_open.length == 1)
    {
        setTimeout(() => {
                // si la valeur est égale ; success
                if ($l__other_card_open.attr("data-value") == $i__card.attr("data-value"))
                {
                    success++;
                    $l__other_card_open.addClass("success");
                    $i__card.addClass("success");

                    check_finish();
                }
                // sinon error ; on retourne tout
                else
                {
                    error++;
                }
                
                $(".card").removeClass("hover");
                $l__board.removeClass("disabled");
            },500);
    }
    else
    {
        $l__board.removeClass("disabled");
    }
}

function check_finish(){
    if ($(".card:not(.hover):not(.success)").length === 0)
    {
        $("#congrats").css("display", "flex");
        $("#congrats span").text(success);
    }
}

var success = 0;
var error = 0;

$(document).ready(function(){
    new_game();

    $("#try_again").click(function(){
        new_game();
        $("#congrats").hide();
    });

    $("#board_game").on("click", ".card:not(.hover):not(.success)", function(){
        select_card($(this));
    });
});
