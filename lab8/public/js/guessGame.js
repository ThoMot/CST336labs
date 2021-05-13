/**
 * Author: Thora Marie West Mothes & Mathias Lund Ahrn
 *
 */

const displayQ4Choices = () => {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  q4ChoicesArray = _.shuffle(q4ChoicesArray);

  for (let i = 0; i < q4ChoicesArray.length; i++) {
    $("#q4Choices").append(
      ` <input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`
    );
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
  rgb = rgb
    .substr(4)
    .split(")")[0]
    .split(sep);
  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  return "#" + r + g + b;
}

function getColorsFromRgb(rgb) {
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb
    .substr(4)
    .split(")")[0]
    .split(sep);

  return {
    r: rgb[0].trim(),
    g: rgb[1].trim(),
    b: rgb[2].trim()
  };
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
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

function getScoreInfo() {
  if (localStorage.getItem("scoreHistory")) {
    const scores = JSON.parse(localStorage.getItem("scoreHistory"));
    let attempts = scores.length;
    let scoreHistory = scores.reduce((pre, next) => {
      return pre + ", " + next;
    });
    let highscore = Math.max(...scores);

    $("#numberOfAttempts").html(`Number of attempts: ${attempts}`);
    $("#scoreTracker").html(`Score history: ${scoreHistory}`);

    if (highscore) {
      $("#highScore").html(`Current highscore: ${highscore}`);
    }
  }
}

$(document).ready(() => {
  if (window.localStorage) {
    getScoreInfo();
  }

  // Loads the answers for question 4 when the page has loaded.
  displayQ4Choices();

  // Event listeners
  //   $("button").on("click", () => {
  //     gradeQuiz();
  //   });

  $(".q5Choice").on("click", function() {
    $(".q5Choice").css("background", "");
    $(this).css("background", "rgb(255, 255, 0)");
  });

  $(".q8item").on("click", function() {
    $(".q8item").css("box-shadow", "");
    $(".q8item").attr("id", "");
    let focusColor = "rgb(255, 255, 0)";
    $(this).css("box-shadow", `inset 0px 0px 10px 1px ${focusColor}`);
    $(this).attr("id", "colorSelected");
    $("#colorz")[0].value = rgbToHex($(this).css("background-color"));
  });

  $("#colorz").on("change", function() {
    const color = $("#colorz").val();
    const colorRgb = hexToRgb(color);
    $("#colorSelected").css(
      "background",
      `rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b})`
    );
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
  };

  const wrongAnswer = index => {
    $(`#q${index}Feedback`).html("Incorrect!");
    $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
    $(`#markImg${index}`).html("<img src='img/xmark.png' alt='Xmark'>");
  };

  const scoreHandler = score => {
    // Scoreboard / tracker
    if (score < 80) {
      $("#totalScore").attr("class", "text-danger");
    }
    $("#totalScore").html(`Total Score: ${score}`);

    $("#congrats").html("");
    if (score == 100) {
      $("#congrats").html(
        "CONGRATULATIONS you got 100 points! you must be a US expert!"
      );
    }

    if (window.localStorage) {
      saveScore(score);
      getScoreInfo();
    }
  };

  $(".submit").on("click touchstart", function(e) {
    if (!isFormValid()) {
      e.preventDefault();
    } else {
      $("#validationFdbk").html("");
      const q1Response = $("#q1")
        .val()
        .toLowerCase();
      const q2Response = $("#q2").val();
      const q4Response = $("input[name=q4]:checked").val();
      const q5Response = $("#seal2").css("background-color");
      const q6Response = $("#q6").val();
      const q7Response = $("#q7").val();

      $.ajax({
        url: "/",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({
          questions: {
            q1: q1Response,
            q2: q2Response,
            q3: {
              _1: $("#Jackson").is(":checked"),
              _2: $("#Franklin").is(":checked"),
              _3: $("#Jefferson").is(":checked"),
              _4: $("#Roosevelt").is(":checked")
            },
            q4: q4Response,
            q5: q5Response,
            q6: q6Response,
            q7: q7Response,
            q8: {
              white: getColorsFromRgb($(".white").css("background-color")),
              red: getColorsFromRgb($(".red").css("background-color")),
              blue: getColorsFromRgb($(".blue").css("background-color"))
            }
          }
        }),
        dataType: "json",
        success: function(result) {
          // Step 5. Process the results by changing the HTML
          // to display the results of the quiz
          console.log("result of call to POST router", result);
          result.results.forEach(question => {
            if (question.correct) {
              rightAnswer(question.question);
            } else {
              wrongAnswer(question.question);
            }
          });

          scoreHandler(result.score);
        },
        error: function(xhr, status) {
          console.log("error calling to POST router", status);
        },
        complete: function() {}
      });
    }
  });
});
