const API_KEY = "13831356-14c2a0af637ced29bdc287ad0";

// Code for retrieving data from pixabay
//   $.ajax({
//     method: "GET",
//     url: `https://pixabay.com/api/?key=${API_KEY}&q=sun`,
//     dataType: "json",
//     data: {},
//     success: function(result, status) {
//       console.log(result);
//     }
//   }); //ajax

$(function() {
  $.ajax({
    method: "GET",
    url: `https://pixabay.com/api/?key=${API_KEY}&q=sun`,
    dataType: "json",
    data: {},
    success: function(result, status) {
      console.log(result);
      const pictures = result.hits;
      generatePics(pictures);
    }
  }); //ajax
});

function generatePics(pictures) {
  pictures.forEach(picture => {
    // $("<div></div>", {
    //   id: "likes",
    //   class: "row"
    // }).appendTo("#pictures");
    // $(`<p>Likes: ${picture.likes}</p>`, {
    //   class: "col-6"
    // }).appendTo("#likes");
    // $("<div></div>", {
    //   id: "picrow",
    //   class: "row"
    // }).appendTo("#likes");
    // $("<div></div>", {
    //   id: picture.id,
    //   class: "row"
    // }).appendTo("#pictures");
    // $("<p></p>", {
    //   html: "Likes: " + picture.likes
    // }).appendTo(`#${picture.id}`);

    $("<div></div>", {
      id: picture.id,
      class: "col-6 mt-2"
    }).appendTo("#pictures");
    $("<img />", {
      id: picture.id,
      src: picture.largeImageURL,
      width: 300,
      class: "col-12"
    }).appendTo($(`#${picture.id}`));
    $("<p></p>", {
      html: "Likes: " + picture.likes,
      class: "text-center"
    }).appendTo(`#${picture.id}`);
  });
  //$("<label for='1867285'>asdasd</label>").appendTo($("#pictures"));
}
