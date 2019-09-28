/**
 * Author: Thora Marie West Mothes & Mathias Lund Ahrn
 *
 */

const displayQ4Choices = () => {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);

    for (let i = 0; i < q4ChoicesArray.length; i++) {
        $("#q4Choices")
            .append(` <input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`)
    }
};

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function rgbToHex(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length === 1)
        r = "0" + r;
    if (g.length === 1)
        g = "0" + g;
    if (b.length === 1)
        b = "0" + b;

    return "#" + r + g + b;
}

function getColorsFromRgb(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    return {
        r: rgb[0].trim(),
        g: rgb[1].trim(),
        b: rgb[2].trim(),
    }
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function validateRedColor(redAnswer) {
    let correct = 0;
    if(redAnswer.r > 250) {
        correct++;
    }
    if(redAnswer.g < 50) {
        correct++;
    }
    if(redAnswer.b < 50) {
        correct++;
    }
    return correct === 3;
}

function validateWhiteColor(whiteAnswer) {
    let correct = 0;
    if(whiteAnswer.r > 250) {
        correct++;
    }
    if(whiteAnswer.g > 250) {
        correct++;
    }
    if(whiteAnswer.b > 250) {
        correct++;
    }
    return correct === 3;
}

function validateBlueColor(blueAnswer) {
    let correct = 0;
    if(blueAnswer.r < 50) {
        correct++;
    }
    if(blueAnswer.g < 60) {
        correct++;
    }
    if(blueAnswer.b > 250) {
        correct++;
    }
    return correct === 3;
}

function saveScore(score) {
    let scoreHistory = [];
    if (localStorage.length === 0) {
        scoreHistory.push(score);
    } else {
        scoreHistory = JSON.parse(localStorage.getItem("scoreHistory"));
        scoreHistory.push(score);
    }
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));
}

function getHighscore() {
    let highscore;
    let scoreHistory = [];
    if (localStorage.getItem("scoreHistory")) {
        scoreHistory = JSON.parse(localStorage.getItem("scoreHistory"));
        highscore = Math.max(...scoreHistory);
    }
    if(highscore) {
        $("#highScore").html(`Current highscore: ${highscore}`);
    }
}

$(document).ready(() => {

    if (window.localStorage) {
        getHighscore();
    }

    // Variables
    let score = 0;

    // Loads the answers for question 4 when the page has loaded.
    displayQ4Choices();

    // Event listeners
    $("button").on("click", () => {
        gradeQuiz();
    });

    $(".q5Choice").on("click", function () {
        $(".q5Choice").css("background", "");
        $(this).css("background", "rgb(255, 255, 0)");
    });

    $(".q8item").on("click", function () {
        $(".q8item").css("box-shadow", "");
        $(".q8item").attr("id", "");
        let focusColor = "rgb(255, 255, 0)";
        $(this).css("box-shadow", `inset 0px 0px 10px 1px ${focusColor}`);
        $(this).attr("id", "colorSelected");
        $("#colorz")[0].value = rgbToHex($(this).css("background-color"));
    });

    $("#colorz").on("change", function () {
        const color = $("#colorz").val();
        const colorRgb = hexToRgb(color);
        $("#colorSelected").css("background", `rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b})`);
    });

    // Input validation
    const isFormValid = () => {
        let isValid = true;
        if ($("#q1").val() === "") {
            isValid = false;
            $("#validationFdbk").html("Question 1 was not answered");
        }
        return isValid;
    };

    // Game functions
    const rightAnswer = index => {
        $(`#q${index}Feedback`).html("Correct!");
        $(`#q${index}Feedback`).attr("class", "bg-success text-white");
        $(`#markImg${index}`).html("<img src='img/checkmark.png' alt='Checkmark'>");
        score += 12.5;
    };

    const wrongAnswer = index => {
        $(`#q${index}Feedback`).html("Incorrect!");
        $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
        $(`#markImg${index}`).html("<img src='img/xmark.png' alt='Xmark'>");
    };

    const gradeQuiz = () => {
        $("validationFdbk").html("");
        if (!isFormValid()) {
            return;
        }

        score = 0;
        let q1Response = $("#q1").val().toLowerCase();
        let q2Response = $("#q2").val();
        let q4Response = $("input[name=q4]:checked").val();
        let q6Response = $("#q6").val();
        let q7Response = $("#q7").val();

        // Question 1
        if (q1Response === "sacramento") {
            rightAnswer(1);
        } else {
            wrongAnswer(1);
        }

        // Question 2
        if (q2Response === "mo") {
            rightAnswer(2);
        } else {
            wrongAnswer(2);
        }

        // Question 3
        if ($("#Jefferson").is(":checked") && $("#Roosevelt").is(":checked") && !$("#Jackson").is(":checked") && !$("#Franklin").is(":checked")) {
            rightAnswer(3);
        } else {
            wrongAnswer(3);
        }

        // Question 4
        if (q4Response === "Rhode Island") {
            rightAnswer(4);
        } else {
            wrongAnswer(4);
        }

        // Question 5
        const correctAnswer = "rgb(255, 255, 0)";
        if ($("#seal2").css("background-color") === correctAnswer) {
            rightAnswer(5);
        } else {
            wrongAnswer(5);
        }

        //Question 6
        if(q6Response == 4){
            rightAnswer(6);
        } else {
            wrongAnswer(6);
        }

        if(q7Response == 0){
            rightAnswer(7);
        } else {
            wrongAnswer(7);
        }

        // Question 8
        const redAnswer = getColorsFromRgb($(".red").css("background-color"));
        const blueAnswer = getColorsFromRgb($(".blue").css("background-color"));
        const whiteAnswer = getColorsFromRgb($(".white").css("background-color"));
        if(validateRedColor(redAnswer) && validateBlueColor(blueAnswer) && validateWhiteColor(whiteAnswer)) {
            rightAnswer(8);
        } else {
            wrongAnswer(8);
        }


        // Scoreboard / tracker
        if (score < 80) {
            $("#totalScore").attr("class", "text-danger");
        }
        $("#totalScore").html(`Total Score: ${score}`);

        $("#congrats").html("");
        if(score == 100){
            $("#congrats").html("CONGRATULATIONS you got 100 points! you must be a US expert!")
        }

        if (window.localStorage) {
            saveScore(score);
            getHighscore();
        }
    };
});