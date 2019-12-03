$(document).ready(() => {
  $("#modalLoginForm")
    .modal("show")
    .on("hidden.bs.modal", function(e) {
      window.location.href = "/";
    });

  $("#login").on("click", () => {
    login();
  });

  $("#loginfdbk").hide();
});

function login() {
  $.ajax({
    url: "/login",
    method: "post",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      username: $("#username").val(),
      password: $("#password").val()
    }),
    success: function(result) {
      if (result.successful) {
        window.location.href = "/admin";
      } else {
        $("#loginmsg").html(result.message);
        $("#loginfdbk").show();
      }
    },
    error: function(err, xhr) {
      console.log("Error", err);
    },
    complete: function() {}
  });
}
