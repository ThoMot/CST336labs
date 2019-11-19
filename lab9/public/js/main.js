$(document).ready(() => {
  listAuthors();
  listGenders();
  listCategories();

  $("#genderSearch").on("click", function () {
    const genderValue = $("#genderSelect").val();
    if(genderValue !== "default") {
      searchGender(genderValue);
    }
  });

  $("#keywordSearch").on("click", function () {
    const keywordValue = $("#keyword").val();
    if(keywordValue !== ""){
      searchKeyword(keywordValue);
    } else {
      $("#keyword").attr("placeholder", "Please input a search word");
    }
  });

  $("#authorSearch").on("click", function () {
    const authorValue = $("#authorSelect").val();
    if(authorValue !== "default") {
      searchAuthor(authorValue);
    }
  });
});

function listAuthors() {
$.ajax({
    url: "/authors",
    method: "get",
    contentType: "application/json",
    dataType: "json",
    success: function(result) {
      console.log(result);
      result.forEach(author => {
        $("#authorSelect").append(
            `<option value=${author.lastName}>${author.firstName} ${author.lastName}</option>`
        );
      });
    },
    error: function(xhr, status) {
      console.log("error calling to POST router", status);
    },
    complete: function() {}
  });
}

function listGenders() {
  $.ajax({
    url: "/genders",
    method: "get",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
      console.log(result);
      result.forEach(gender => {
        if (gender.sex === "F") {
          $("#genderSelect").append(
              `<option value=${gender.sex}>Female</option>`
          );
        } else if (gender.sex === "M") {
          $("#genderSelect").append(
              `<option value=${gender.sex}>Male</option>`
          );
        }
      });
    },
    error: function (xhr, status) {
      console.log("error calling to POST router", status);
    },
    complete: function () {
    }
  });
}

function listCategories() {
  $.ajax({
    url: "/categories",
    method: "get",
    contentType: "application/json",
    dataType: "json",
    success: function(result) {
      console.log(result);
       result.forEach(category => {
        $("#categorySelect").append(
           `<option value=${category.category}>${category.category}</option>`
         );
       });
    },
    error: function(xhr, status) {
      console.log("error calling to POST router", status);
    },
    complete: function() {}
  });
}

function searchGender(genderValue) {
  $.ajax({
    url: "/genderSearch",
    method: "post",
    contentType: "application/json",
    dataType: "json",
    data: genderValue,
    success: function (result) {
      result.forEach(qt => {
        displayQuote(qt.author, qt.quote);
      });
    },
    error: function (xhr, status) {
      console.log("error calling to POST router", status);
    },
    complete: function () {
    }
  });
}

function searchKeyword(keyword) {
  $.ajax({
    url: "/keywordSearch",
    method: "post",
    contentType: "application/json",
    dataType: "json",
    data: keyword,
    success: function (result) {
      result.forEach(qt => {
        displayQuote(qt.author, qt.quote);
      });
    },
    error: function (xhr, status) {
      console.log("error calling to POST router", status);
    },
    complete: function () {
    }
  });
}

function searchAuthor(authorValue) {
  $.ajax({
    url: "/authorSearch",
    method: "post",
    contentType: "application/json",
    dataType: "json",
    data: authorValue,
    success: function (result) {
      result.forEach(qt => {
        displayQuote(qt.author, qt.quote);
      });
    },
    error: function (xhr, status) {
      console.log("error calling to POST router", status);
    },
    complete: function () {
    }
  });
}


function displayQuote(author, quote) {
  const quoteResult =
        `<div class="card my-2">
            <div class="card-body">
                <div class="card-title">
                    Author: ${author}
                </div>
            <hr align="left" width="40%">
                ${quote}
            </div>
        </div>`;
  $("#quotesDiv").append(quoteResult);
}

