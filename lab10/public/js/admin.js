
$(document).ready(() => {
    retreiveAuthors();

    $("#saveUpdates").on("click", function () {
        const updatedAuthor = {
            authorId: $("#authID").html(),
            firstName: $("#inputFirstName").val(),
            lastName: $("#inputLastName").val(),
            dob: $("#inputDOB").val(),
            dod: $("#inputDOD").val(),
            country: $("#inputCountry").val(),
            profession: $("#inputProfession").val(),
            portrait: $("#inputPicture").val(),
            sex: $("#inputGender").val(),
            biography: $("#inputBio").val()
        };

        updateAuthor(updatedAuthor);
    });

    // Adding eventlisteners for author in quotes
    $("#tableBod").on("click", "a", function() {
        const author = $(this)[0].id;
        if($(this)[0].innerHTML === "Update"){
            getAuthorInfo(author);
        } else {

        }
    });

});

//gets all author info that is set on page load
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

//Gets author info for populating the update modal
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

function updateAuthor(author){
    $.ajax({
        url: "/admin/author/update",
        method: "put",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(author),
        success: function(result) {
            if(result.status === "success") {
                $("#updateSuccess").html(result.message);
            } else {
                $("#failed").show();
            }
        },
        error: function(xhr, status) {
            $("#failed").show();
            console.log("error calling to POST router", status);
        },
        complete: function() {}
    });
}



//populates the table of authors on page load
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

//populates the update modal with info from the database
function populateUpdateModal(author) {
    $("#failed").hide();
    const {
        authorId,
        firstName,
        lastName,
        dob,
        dod,
        gender,
        country,
        profession,
        portrait,
        biography
    } = author;


    $("#authID").text(5);
    $("#inputFirstName").html(firstName);
    $("#inputLastName").html(lastName);
    $("#inputDOB").html(dob);
    $("#inputDOD").html(dod);
    $("#inputBio").html(biography);
    $("#inputGender").html(gender);
    $("#authorPic").attr("src", portrait);
    $("#inputCountry").html(country);
    $("#inputProfession").html(profession);
    $("#inputPicture").html(portrait);

}