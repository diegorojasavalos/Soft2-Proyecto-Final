/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var URL = "https://itesis.herokuapp.com/";
var cod = localStorage.getItem("cod");

$(document).ready(function () {
    if (cod === null) {
        window.location.href = "login.html";
    } else {
        var ciclo;
        $('select').material_select();
        $.get(URL + "alltesis/", function (data) {
            var tesis = data.tesis;
            //1= disponible para ver
            tesis.forEach(function (item, index) {
                $("#alltesis").append("<div class='col l6 m12 s12 documento' ciclo='" + item.year + "'>" +
                        "<div class='card horizontal'>" +
                        "<div class='card-image'>" +
                        "<img class='responsive-img' src='http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/book-bookmark-icon.png'>" +
                        "</div>" +
                        "<div class='card-stacked'>" +
                        "<div class='card-content'>" +
                        "<p class='flow-text'>" + item.name + "</p>" +
                        "</div>" +
                        "<div class='card-action'>" +
                        "<a href=" + item.link + ">Ver</a>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                        );
            });
        });
        $("#ciclos").change(function () {
            ciclo = $("#ciclos option:selected").text();
            var id = $(".documento").attr("id");
            $(".documento").addClass("ciclo");
            $('div[ciclo=' + ciclo + ']').removeClass("ciclo");
            if (ciclo === "Todos") {
                $(".documento").removeClass("ciclo");
            }
        });
    }
});