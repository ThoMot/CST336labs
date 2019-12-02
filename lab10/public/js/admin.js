
$(document).ready(() => {
    retreiveAuthors();

    $('#button1').on('click', function() {
        $('#openModal').show();
    });

    // Adding eventlisteners for author in quotes
    $("#tableBod").on("click", "button", function() {
        const author = $(this)[0].name;
        if($(this)[0].innerHTML === "Update"){
            //console.log($(this)[0].name)
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


function displayAuthors(id, first, last, dob, dod) {
    const authResult = `
        <tr>
        <td>${id}</td>
        <td>${first}</td>
        <td>${last}</td>
        <td>${dob}</td>
        <td>${dod}</td>
        <td><button class="btn btn-secondary" name="${id}">Update</button></td>
        <td><button class="btn btn-secondary" name="${id}">Delete</button></td>
    </tr>
    `;
    $("#tableBod").append(authResult);
}