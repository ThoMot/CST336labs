$(document).ready(() => {
  listAuthors();
  listGenders();
  listCategories();

  $("#genderSearch").on("click", function() {
    const genderValue = $("#genderSelect").val();
    if (genderValue !== "default") {
      searchGender(genderValue);
    }
  });

  // Adding eventlisteners for author in quotes
  $("#quotesDiv").on("click", "a", function() {
    //console.log($(this)[0].text);
    const authorName = $(this)[0].text;
    getAuthorInfo(authorName);
  });

  $("#keywordSearch").on("click", function() {
    const keywordValue = $("#keyword").val();
    if (keywordValue !== "") {
      searchKeyword(keywordValue.trim());
    } else {
      $("#keyword").attr("placeholder", "Please input a search word");
    }
  });

  $("#authorSearch").on("click", function() {
    const authorValue = $("#authorSelect").val();
    if (authorValue !== "default") {
      searchAuthor(authorValue);
    }
  });

  $("#categorySearch").on("click", function() {
    const categoryValue = $("#categorySelect").val();
    if (categoryValue !== "default") {
      searchCategory(categoryValue);
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
    success: function(result) {
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
    error: function(xhr, status) {
      console.log("error calling to POST router", status);
    },
    complete: function() {}
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
    data: JSON.stringify({
      gender: genderValue
    }),
    success: function(result) {
      $("#quotesDiv").empty();
      result.forEach(qt => {
        displayQuote(qt.author, qt.quote);
      });
    },
    error: function(xhr, status) {
      console.log("error calling to POST router", status);
    },
    complete: function() {}
  });
}

function searchKeyword(keyword) {
  $.ajax({
    url: "/keywordSearch",
    method: "post",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      keyword: keyword
    }),
    success: function(result) {
      $("#quotesDiv").empty();
      if (result.error === 1) {
        displayError(result.message);
      } else {
        result.forEach(qt => {
          displayQuote(qt.author, qt.quote);
        });
      }
    },
    error: function(xhr, status) {
      console.log(xhr);
      console.log(status);
    },
    complete: function() {}
  });
}

function searchAuthor(authorValue) {
  $.ajax({
    url: "/authorSearch",
    method: "post",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      author: authorValue
    }),
    success: function(result) {
      $("#quotesDiv").empty();
      result.forEach(qt => {
        displayQuote(qt.author, qt.quote);
      });
    },
    error: function(xhr, status) {
      console.log("error calling to POST router", status);
    },
    complete: function() {}
  });
}

function getAuthorInfo(authorName) {
  $.ajax({
    url: "/allAuthorInfo",
    method: "post",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      authorName: authorName
    }),
    success: function(result) {
      console.log(result);
      updateModal(result[0]);
    },
    error: function(xhr, status) {
      console.log("error calling to POST router", status);
    },
    complete: function() {}
  });
}

function searchCategory(categoryValue) {
  $.ajax({
    url: "/categorySearch",
    method: "post",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      category: categoryValue
    }),
    success: function(result) {
      $("#quotesDiv").empty();
      result.forEach(qt => {
        displayQuote(qt.author, qt.quote);
      });
    },
    error: function(xhr, status) {
      console.log("error calling to POST router", status);
    },
    complete: function() {}
  });
}

function displayQuote(author, quote) {
  const quoteResult = `<div class="card my-2">
            <div class="card-body">
                <div class="card-title">
                    Author: <a href="#" class="event" data-toggle="modal" data-target="#exampleModal">${author}</a>
                </div>
            <hr align="left" width="40%">
                ${quote}
            </div>
        </div>`;
  $("#quotesDiv").append(quoteResult);
}

function displayError(message) {
  const quoteResult = `<div class="card my-2">
      <div class="card-body">
        ${message}
      </div>
    </div>`;
  $("#quotesDiv").append(quoteResult);
}

function updateModal(author) {
  console.log(author);
  $(".card-list").empty();
  const {
    name,
    dob,
    dod,
    sex,
    profession,
    country,
    portrait,
    biography
  } = author;

  const birth = new Date(dob);
  const death = new Date(dod);

  $("#card-title").text(`${name}`);
  $(".card-list").append(
    `<li>Date of birth: ${birth.getDate() +
      "-" +
      birth.getMonth() +
      "-" +
      birth.getFullYear()}`
  );
  $(".card-list").append(
    `<li>Date of death: ${death.getDate() +
      "-" +
      death.getMonth() +
      "-" +
      death.getFullYear()}`
  );
  $(".card-list").append(`<li>Gender: ${sex === "M" ? "Male" : "Female"}`);
  $(".card-list").append(`<li>Profession: ${profession}`);
  $(".card-list").append(`<li>Country: ${country}`);
  $("#card-img").attr("src", `${portrait}`);
  $("#card-img").attr("alt", `portrait of ${name}`);
  $(".card-text").text(`${biography}`);
}
