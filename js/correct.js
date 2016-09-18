var on_load = function () {

    //PUBLIC VARS:
    p_button = $("#pause_button").click(button_clicked);
    n_button = $("#new_button").click(button_clicked);
    text_area = $("#input_text");

    given_word = $("#text_array");
    time = $("#time_elapsed");
    wpm = $("#wpm");
    chars = $("#chars");
    errors = $("#errors");

    $("#input_text").val("Press 'NEW' button to start!");
    $("#input_text").prop('disabled', true);

    new_flag = false;

    start_new();

}

var button_clicked = function (e) { //BUTTONS CLICKED
    if (e.target.id == "new_button") {
        start_new();
        $("#instructions").text("Please type the given Sentence");
        $("#instructions_2").text("*Remember to treat uppercase letters!");
        text_area.prop('disabled', false);
        text_area.val("");
        given_word.show();

        if (new_flag == false) {
            myVar = setInterval(byTime, 1000);
            new_flag = true;
        }
    }
    if (e.target.id == "pause_button") {
        clearInterval(myVar);
        if ($("#pause_button").val() === "Pause") {
            $("#pause_button").attr("value", "Resume");
            text_area.prop('disabled', true);
        } else {
            myVar = setInterval(byTime, 1000);
            $("#pause_button").attr("value", "Pause");
            text_area.prop('disabled', false);
        }
    }
}

var start_new = function () { //RESETS ALL DATA FOR A NEW GAME

    //RESET VARS:
    min = 0;
    sec = 0;
    wpm_counter = 0;
    c_length = 0;

    t = min + ":" + sec + "0";

    //    $("#time_elapsed").text(t);
    time.text(t);
    wpm.text(wpm_counter);
    //    $("#errors").text(errors);
    chars.text(c_length);

    //RESET TEXTS:
    words = ["Ned Nott was shot and Sam Shott was not",
         "Betty and Bob brought back blue balloons from the big bazaar",
         "he crow flew over the river with a lump of raw liver",
         "Fred fed Ted bread while Ted fed Fred bread",
         "If Stu chews shoes should Stu choose the shoes he chews"];


    random = Math.floor(Math.random() * 5);
    given_word.text(words[random]);
    given_word.hide();

    text_area.prop('disabled', true);

}


var byTime = function () { //TIME FOR STATS FILL

    //TIME:
    sec++;
    if (sec === 60) {
        sec = 0;
        min++;
    }
    if (min === 60) {
        sec = 0;
        min = 0;
    }
    var t = min + ":" + sec;

    //TIME ELAPSED:
    time.text(t);


    text_area_length = text_area.val().length;

    //WORD PER MINUTE:
    wpm_calc = (text_area_length / 5) / (sec / 60 + min);
    wpm_calc.toFixed(2);
    wpm.text(wpm_calc);

    //CHAR TYPED:
    chars.text(text_area_length);


    //ERROR & HIGHLIGHT:
    var given_arr = words[random].split(" ");
    var typed_arr = text_area.val().split(" ");
    var err = 0;

    $("#text_array").empty();
    for (var i = 0; i < given_arr.length; i++) {
        var id = "word" + i;

        if (i == given_arr.length - 1)
            $("#text_array").append($("<span id=" + id + ">").text(given_arr[i]));
        else
            $("#text_array").append($("<span id=" + id + ">").text(given_arr[i] + " "));
    }

    for (var i = 0; i < given_arr.length && i < typed_arr.length; i++) {

        if (typed_arr == "")
            break;

        var id = "#word" + i;
        if (typed_arr[i] != given_arr[i]) {
            for (var j = 0; j < typed_arr[i].length && j < given_arr[i].length; j++) {
                if (typed_arr[i][j] != given_arr[i][j]) {
                    err++;
                    $(id).addClass("highlight");

                }
            }
            if (typed_arr[i].length > given_arr[i].length) {
                err += typed_arr[i].length - given_arr[i].length;
                $(id).addClass("highlight");
            }
        } else {
            $(id).removeAttr("class");
        }
    }

    err = (err / text_area.val().length) * 100;
    if (!isFinite(err))
        err = 0;

    err = err.toFixed(2);
    error = "Error: " + err + "%";
    errors.text(error);
}