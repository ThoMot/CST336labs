
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
        url: "/authors",
        method: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $("#tableBod").empty();
            result.forEach(auth => {
                displayAuthors(auth.id, auth.first, auth.last, auth.DOB, auth.DOD);
            });
        },
        error: function (xhr, status) {
            console.log("error calling to POST router", status);
        },
        complete: function () {
        }
    });
}


function displayAuthors(id, first, last, DOB, DOD) {
    const authResult = `
        <tr>
        <td>${id}</td>
        <td>${first}</td>
        <td>${last}</td>
        <td>${DOB}</td>
        <td>${DOD}</td>
        <td><button class="btn btn-secondary" name="${id}">Update</button></td>
        <td><button class="btn btn-secondary" name="${id}">Delete</button></td>
    </tr>
    `;
    $("#tableBod").append(authResult);
}