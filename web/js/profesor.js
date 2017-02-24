/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var URL = "https://itesis.herokuapp.com/";
var nombre = localStorage.getItem("fullname");
var cod = localStorage.getItem("cod");

$(document).ready(function () {
    console.log(cod);
    if (cod === null) {
        window.location.href = "login.html";
    } else {
        var tamañoFooter = $("footer").css("height");
        $(".alumnos").css("margin-bottom", tamañoFooter);
        $('.collapsible').collapsible();
        $('select').material_select();
        $(".button-collapse").sideNav();
        $("#profesor").html("Profesor: " + nombre);

        $("#logout").click(function () {
            localStorage.removeItem("cod");
            localStorage.removeItem("fullname");
            window.location.href = "login.html";
        });
        $.get(URL + "alltesis/", function (data) {
            var tesis = data.tesis;
            //1= disponible para ver
            tesis.forEach(function (item, index) {
                $("#alltesis").append("<div class='col l4 m6 s12 documento' ciclo='" + item.year + "' profesor='" + item.docente.profesor.cod + "'>" +
                        "<div class='card sticky-action'>" +
                        "<div class='card-image waves-effect waves-block waves-light'>" +
                        "<img class='activator' src='http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/book-bookmark-icon.png'>" +
                        "</div>" +
                        "<div class='card-action'>" +
                        "<span class='card-title activator grey-text text-darken-4 truncate'>" + item.name + "<i class='material-icons right'>more_vert</i></span>" +
                        "<p class='truncate'><a href='" + item.link + "'>Ver Tesis</a></p>" +
                        "</div>" +
                        "<div class='card-reveal'>" +
                        "<span class='card-title grey-text text-darken-4'>" + item.name + "<i class='material-icons right'>close</i></span>" +
                        "<p>" + item.desc + "</p>" +
                        "<p>Alumno: " + item.alumno + "</p>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                        );
            });
        });
        $("#ciclos").change(function () {
            ciclo = $("#ciclos option:selected").text();
            $(".documento").addClass("ciclo");
            $('div[ciclo=' + ciclo + ']').removeClass("ciclo");
            if (ciclo === "Todos") {
                $(".documento").removeClass("ciclo");
            }
        });
        $("#misalumnos").change(function () {
            ciclo = $("#misalumnos option:selected").text();
            $(".documento").addClass("ciclo");
            $('div[profesor=' + cod + ']').removeClass("ciclo");
            if (ciclo === "Todos") {
                $(".documento").removeClass("ciclo");
            }
        });
    }
});