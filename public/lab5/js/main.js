const API_KEY = "13831356-14c2a0af637ced29bdc287ad0";
const numberOfPics = 4;

const defaultSearch = ["flowers", "piano", "saxofon", "spring"];

$(function() {
  const searchNum = Math.floor(Math.random() * defaultSearch.length);

  searchPixa(null, defaultSearch[searchNum]);
});

function searchPixa(orientation, q) {
  $.ajax({
    method: "GET",
    url: "https://pixabay.com/api/",
    dataType: "json",
    data: {
      key: API_KEY,
      q: q,
      orientation: orientation || "",
      per_page: numberOfPics
    },
    success: function(result, status) {
      console.log(result);
      const pictures = result.hits;
      generatePics(pictures);
    }
  }); //ajax
}

function generatePics(pictures) {
  $("#pictures").empty(); // Removes all childnodes from pictures div
  pictures.forEach(picture => {
    $("<div></div>", {
      id: picture.id,
      class: "col-6 mt-2"
    }).appendTo("#pictures");
    $("<img />", {
      id: picture.id,
      src: picture.largeImageURL,
      class: "col-12"
    }).appendTo($(`#${picture.id}`));
    $("<p></p>", {
      html: "Likes: " + picture.likes,
      class: "text-center"
    }).appendTo(`#${picture.id}`);
  });
}

$("#search").on("click", function() {
  if (!$("#keyword").val()) {
    $("#searcherror").html("Search need an input!");
  } else {
    $("#searcherror").empty();
    const orientation = $("#orientation").val();
    const q = $("#keyword")
      .val()
      .toLowerCase()
      .trim();
    searchPixa(orientation, q);
  }
});
