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
        user = {
            cod: cod
        };

        $.ajax({
            type: "POST",
            url: URL + "infoUser/",
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: function (r) {
                //1=usuario bien, 2=usuario mal
                if (r.cod === 1) {
                    $("#name").text(r.user.name);
                    $("#lastname").text(r.user.lastname);
                    $("#career").text(r.user.fac);
                    $("#code").text(cod);
                }
            }});

        $("#cambiar").click(function () {
            var pass = $("#password").val();
            var newpass1 = $("#newpass1").val();
            var newpass2 = $("#newpass2").val();
            if (newpass1 !== newpass2) {
                Materialize.toast('Las contraseñas no coinciden', 3000, 'rounded');
            } else {
                change = {
                    cod: cod,
                    pwd: pass,
                    npwd: newpass1
                };
                $.ajax({
                    type: "POST",
                    url: URL + "changePwd/",
                    processData: false,
                    contentType: 'application/json',
                    data: JSON.stringify(change),
                    success: function (r) {
                        //1=cambió, 2=no cambió
                        if (r.cod === 1) {
                            Materialize.toast(r.msg, 3000, 'rounded', function () {
                                window.location.reload();
                            });
                        } else {
                            Materialize.toast('No se pudo cambiar la contraseña', 3000, 'rounded');
                        }
                    }});
            }
        });
    }
});