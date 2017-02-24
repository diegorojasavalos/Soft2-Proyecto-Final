/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var URL = "https://itesis.herokuapp.com/";
var cod = localStorage.getItem("cod");
var profesor = localStorage.getItem("profesor");

$(document).ready(function () {
    if (cod === null) {
        window.location.href = "login.html";
    } else {
        $('.modal').modal();
        var tamañoFooter = $("footer").css("height");
        $(".flotante1").css("margin-bottom", tamañoFooter);
        var id = $(".btn-floating").attr("id");
        $.get(URL + "getDocentes/", function (data) {
            var docentes = data.docentes;
            docentes.forEach(function (item, index) {
                if (item.type === 3) {
                    $("#asesores").append("<option value='" + item.cod + "'>" + item.name + "</option>");
                }
            });
            $('select').material_select();
        });
        $.get(URL + "alltesis/", function (data) {
            var titulo;
            var desc;
            var existe;
            var link;
            var tesis = data.tesis;
            tesis.forEach(function (item, index) {
                if (item.alumno === cod) {
                    existe = true;
                    titulo = item.name;
                    desc = item.desc;
                    link = item.link;
                }
                if (item.asesor === undefined) {
                    $("#asesor").text("El asesor aún no ha aceptado");
                }
            });
            if (existe) {
                $(".btn-floating").attr("id", "edit");
                $(".btn-floating").attr("href", "#");
                $(".btn-floating").children().text("mode_edit");
                $("#noHay").addClass("oculto");
                $("#siHay").removeClass("oculto");
            }
            $("#title").text(titulo);
            $("#desc").text(desc);
            $("#link").attr("href", link);
            $('select').material_select();
        });
        $("#btn2").click(function () {
            var ACCESS_TOKEN = "957NesrUISAAAAAAAAAAMVRus44-AFW-ec0OFMDhXgrbm8macTcaJvjc8G7bGaez";
            var SHARED_LINK = "https://www.dropbox.com/s/tlrm3g8rbtibm3i/casi.json?dl=0";
            var dbx = new Dropbox({accessToken: ACCESS_TOKEN});
            dbx.sharingGetSharedLinkFile({url: SHARED_LINK})
                    .then(function (data) {
                        console.log(data);
                        console.log(data.fileBlob);
                        var downloadUrl = URL.createObjectURL(data.fileBlob);
                        console.log(downloadUrl);
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
        });
        var path = "";
        $(".agregar").click(function () {
            var obj = {};
            var titulo = $("#titulo").val();
            var descripcion = $("#descripcion").val();
            var asesor = $("#asesores option:selected").val();
            console.log(asesor);
            var tesis = $("#doc")[0].files[0];
            obj = {
                name: titulo,
                alumno: cod,
                desc: descripcion,
                docente: {
                    profesor: {
                        cod: profesor
                    },
                    asesor:{
                        cod: asesor
                    }
                },
                year: "2016-2",
                link: "https://www.dropbox.com/s/a0zznxs591fff4g/casi.json?dl=0"
            };
            $.ajax({
                type: "POST",
                url: URL + "addTesis/",
                processData: false,
                contentType: 'application/json',
                data: JSON.stringify(obj),
                success: function (r) {
                    //1=correcto, 0=incorrecto
                    if (r.cod === 1) {
                        Materialize.toast("Se agregó tesis", 1000, 'rounded', function () {
                            window.location.reload();
                        });
                    } else {
                        console.log("casi");
                    }
                }});
            //uploadFile();
        });
        function uploadFile() {
            var ACCESS_TOKEN = "957NesrUISAAAAAAAAAAMVRus44-AFW-ec0OFMDhXgrbm8macTcaJvjc8G7bGaez";
            var dbx = new Dropbox({accessToken: ACCESS_TOKEN});
            var tesis = $("#doc")[0].files[0];
            var file = tesis;
            dbx.filesUpload({path: '/Pruebita/' + file.name, contents: file})
                    .then(function (response) {
                        console.log(response);
                        path = response.path_display;
                        console.log(path);
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            return false;
        }
    }
});