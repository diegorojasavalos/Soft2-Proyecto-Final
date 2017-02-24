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
    if (nombre === null) {
        window.location.href = "login.html";
    } else {
        $('.collapsible').collapsible();
        $(".button-collapse").sideNav();
        $("#asesor").html("Asesor: " + nombre);
        $("#logout").click(function () {
            localStorage.removeItem("cod");
            localStorage.removeItem("fullname");
            window.location.href = "login.html";
        });
        $.get(URL + "alltesis/", function (data) {
            var tesis = data.tesis;
            //1= con asesor, 2=sin asesor
            tesis.forEach(function (item, index) {
                if (item.docente.asesor.cod === cod) {
                    if (item.status === 2) {
                        $("#solicitudes").append("<tr>" +
                                "<td>" + item.alumno + "</td>" +
                                "<td>" + item.name + "</td>" +
                                "<td><a href='" + item.link + "'>Ver Tesis</a></td>" +
                                "<td>" +
                                "<a class='waves-effect waves-light btn green darken-4 aceptar' id = '" + item.alumno + "'><i class = 'material-icons'>done</i></a>" +
                                "<a class='waves-effect waves-light btn red darken-1 rechazar' id = '" + item.alumno + "'><i class='material-icons'>clear</i></a>" +
                                "</td>" +
                                "</tr>"
                                );
                    }
                }
            });
            $(".aceptar").bind("click", function () {
                console.log("hola");
                var id = $(this).attr("id");
                var obj = {
                    codalum: id,
                    status: 1,
                    asesor: nombre,
                    name: cod
                };
                $.ajax({
                    type: "POST",
                    url: URL + "addAsesor/",
                    processData: false,
                    contentType: 'application/json',
                    data: JSON.stringify(obj),
                    success: function (r) {
                        //1=correcto, 2=incorrecto
                        if (r.cod === 1) {
                            //1=bien, 2=mal
                            Materialize.toast(r.msg, 3000, 'rounded');
                            window.location.reload();
                        } else {
                            Materialize.toast('No se pudó actualizar', 3000, 'rounded');
                        }
                    }});
            });
            $(".rechazar").bind("click", function () {
                var id = $(this).attr("id");
                var obj = {
                    codalum: id,
                    status: 0,
                    asesor: nombre,
                    name: cod
                };
                $.ajax({
                    type: "POST",
                    url: URL + "addAsesor/",
                    processData: false,
                    contentType: 'application/json',
                    data: JSON.stringify(obj),
                    success: function (r) {
                        //1=correcto, 2=incorrecto
                        if (r.cod === 1) {
                            //1=bien, 2=mal
                            Materialize.toast(r.msg, 3000, 'rounded');
                            window.location.reload();
                        } else {
                            Materialize.toast('No se pudó actualizar', 3000, 'rounded');
                        }
                    }});
            })
        });

    }
});