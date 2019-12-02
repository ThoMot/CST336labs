
$(document).ready(() => {
    retreiveAuthors();

    // Adding eventlisteners for author in quotes
    $("#tableBod").on("click", "a", function() {
        const author = $(this)[0].id;
        if($(this)[0].innerHTML === "Update"){
            getAuthorInfo(author);
        } else {

        }
    });

});


function retreiveAuthors() {
    $.ajax({
        url: "/admin/authors",
        method: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $("#tableBod").empty();
            result.authors.forEach(author => {
                displayAuthors(author.authorId, author.firstName, author.lastName, author.dob, author.dod);
            });
        },
        error: function (xhr, status) {
            console.log("error calling to POST router", status);
        },
        complete: function () {
        }
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
            populateUpdateModal(result);
        },
        error: function(xhr, status) {
            console.log("error calling to POST router", status);
        },
        complete: function() {}
    });
}


function displayAuthors(id, first, last, dob, dod) {
    const authResult = `
        <tr>
        <td>${id}</td>
        <td>${first}</td>
        <td>${last}</td>
        <td>${dob}</td>
        <td>${dod}</td>
        <td><a href="" class="btn btn-primary" data-toggle="modal" id="${id}" data-target="#modalUpdate">Update</a></td>
        <td><button class="btn btn-danger" name="${id}">Delete</button></td>
    </tr>
    `;
    $("#tableBod").append(authResult);
}

function populateUpdateModal(id, firstName, lastName, dob, dod, bio, pic, country, profession) {
    $("#authID").text(`${id}`);
    $("#inputFirstName").attr("placeholder", `${firstName}`);
    $("#inputLastName").attr("placeholder", `${lastName}`);
    $("#inputDOB").attr("placeholder", `${dob}`);
    $("#inputDOD").attr("placeholder", `${dod}`);
    $("#inputBio").attr("placeholder", `${bio}`);
    $("#authorPic").attr("src", pic);
    $("#inputCountry").attr("placeholder", `${country}`);
    $("#inputProfession").attr("placeholder", `${profession}`);
    $("#inputPicture").attr("placeholder", `${pic}`);

}