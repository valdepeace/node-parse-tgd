/**
 * Created by Andres Carmona Gil on 26/08/2015.
 */
'use strict'

var java_default = require("java");
var path = require("path");



/*
 * module.exports
 * Export callback json of file tachograf
 */
module.exports = function () {
    var module = {}

    module.lib = function(lib){
        var java_lib = require("java");
        java_lib.classpath.push(path.resolve(lib, "./lib-java/lib-tgd.jar"));
        java_lib.classpath.push(path.resolve(lib, "./lib-java/jackson-annotations-2.5.1.jar"));
        java_lib.classpath.push(path.resolve(lib, "./lib-java/jackson-core-2.5.1.jar"));
        java_lib.classpath.push(path.resolve(lib, "./lib-java/jackson-databind-2.5.1.jar"));
        module.javalib = java_lib
    }
    module.parse = function (buffer, organizationId, filename, callback) {
        if (module.javalib){
            var java = module.javalib
        }else{
            java_default.classpath.push(path.resolve(__dirname, "./lib-java/lib-tgd.jar"));
            java_default.classpath.push(path.resolve(__dirname, "./lib-java/jackson-annotations-2.5.1.jar"));
            java_default.classpath.push(path.resolve(__dirname, "./lib-java/jackson-core-2.5.1.jar"));
            java_default.classpath.push(path.resolve(__dirname, "./lib-java/jackson-databind-2.5.1.jar"));
            java_default.classpath.push("commons-lang3-3.1.jar");
            java_default.classpath.push("commons-io.jar");
            var java = java_default
        }
        buffer.toByteArray = function () {
            return Array.prototype.slice.call(this, 0)
        };
        // Recupero el array de bytes del buffer
        var bytes = buffer.toByteArray();
        // Construyo el array de bytes de javascript a java
        var arraybyte = java.newArray("byte", bytes);

        if (typeof organizationId == 'String' && typeof filename == 'String') {
            java.newInstance("org.tacografo.file.FileTGD", arraybyte, organizationId, filename, function (err, instancia) {
                if (err) {
                    callback("Error build instance " + err)
                } else {
                    java.callMethod(instancia, "getJson", function (err, result) {
                        if (err) {
                            callback("Error getJson " + err)
                        } else {
                            callback(null, result)
                        }
                    });
                }
            });
        } else {
            java.newInstance("org.tacografo.file.FileTGD", arraybyte, function (err, instancia) {
                if (err) {
                    callback("Error build instance " + err)
                } else {
                    java.callMethod(instancia, "getJson", function (err, result) {
                        if (err) {
                            callback("Error getJson " + err)
                        } else {
                            callback(null, result)
                        }
                    });


                }
            });
        }

    };
    return module

}
