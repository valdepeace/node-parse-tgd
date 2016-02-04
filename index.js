/**
 * Created by Andres Carmona Gil on 26/08/2015.
 */
'use strict'

var java = require("java");
var path = require("path");


java.classpath.push("commons-lang3-3.1.jar");
java.classpath.push("commons-io.jar");
java.classpath.push("./lib-java/lib-tgd.jar");
java.classpath.push(path.resolve(__dirname, "./lib-java/lib-tgd.jar"));
java.classpath.push(path.resolve(__dirname, "./lib-java/jackson-annotations-2.5.1.jar"));
java.classpath.push(path.resolve(__dirname, "./lib-java/jackson-core-2.5.1.jar"));
java.classpath.push(path.resolve(__dirname, "./lib-java/jackson-databind-2.5.1.jar"));

/*
 * module.exports
 * Export callback json of file tachograf
 */

var file=function(buffer,organizationId,filename,callback) {

    buffer.toByteArray = function () {
        return Array.prototype.slice.call(this, 0)
    };
    // Recupero el array de bytes del buffer
    var bytes = buffer.toByteArray();
    // Construyo el array de bytes de javascript a java
    var arraybyte = java.newArray("byte", bytes);

    if(typeof organizationId=='String'&& typeof filename=='String'){
        java.newInstance("org.tacografo.file.FileTGD", arraybyte,organizationId,filename, function (err, instancia) {
            if (err) {
                callback( "Error build instance " + err)
            } else {
                java.callMethod(instancia, "getJson", function (err, result) {
                    if (err) {
                        callback("Error getJson " + err)
                    } else {
                        callback(null, JSON.parse(result))
                    }
                });
            }
        });
    }else{
        java.newInstance("org.tacografo.file.FileTGD", arraybyte, function (err, instancia) {
            if (err) {
                callback( "Error build instance " + err)
            } else {
                java.callMethod(instancia, "getJson", function (err, result) {
                    if (err) {
                        callback("Error getJson " + err)
                    } else {
                        var obj=JSON.parse(result)
                        callback(null, obj)
                    }
                });


            }
        });
    }

};



module.exports = file;