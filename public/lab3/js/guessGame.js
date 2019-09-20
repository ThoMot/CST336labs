const displayQ4Choices = () => {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);

    for (let i = 0; i < q4ChoicesArray.length; i++) {
        $("#q4Choices")
            .append(` <input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`)
    }
};

$(document).ready(() => {
    // Loads the answers for question 4 when the page has loaded.
    displayQ4Choices();
    // Event listener
    $("button").on("click", () => {
        gradeQuiz();
    });

    $(".q5Choice").on("click", function () {
        $(".q5Choice").css("background", "");
        $(this).css("background", "rgb(255, 255, 0)");
    });

    let score = 0;

    const isFormValid = () => {
        let isValid = true;
        if ($("#q1").val() === "") {
            isValid = false;
            $("#validationFdbk").html("Question 1 was not answered");
        }
        return isValid;
    };

    const rightAnswer = index => {
        $(`#q${index}Feedback`).html("Correct!");
        $(`#q${index}Feedback`).attr("class", "bg-success text-white");
        $(`#markImg${index}`).html("<img src='img/checkmark.png'>");
        score += 20;
    };

    const wrongAnswer = index => {
        $(`#q${index}Feedback`).html("Incorrect!");
        $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
        $(`#markImg${index}`).html("<img src='img/xmark.png'>");
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

        $("#totalScore").html(`Total Score: ${score}`);
    };
});