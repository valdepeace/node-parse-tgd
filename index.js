/**
 * Created by Andres Carmona Gil on 26/08/2015.
 */
    'use strict'

var java = require("java");
java.classpath.push("commons-lang3-3.1.jar");
java.classpath.push("commons-io.jar");
java.classpath.push("./lib-java/lib-tgd.jar");
java.classpath.push("./lib-java/jackson-annotations-2.5.1.jar");
java.classpath.push("./lib-java/jackson-core-2.5.1.jar");
java.classpath.push("./lib-java/jackson-databind-2.5.1.jar");



module.exports = function(buffer) {
    buffer.toByteArray = function () {
        return Array.prototype.slice.call(this, 0)
    };
    // Recupero el array de bytes del buffer
    var bytes=bufffer.toByteArray();
    // Construyo el array de bytes de javascript a java
    var arraybyte=java.newArray("byte",bytes);
    //instancio la clase
    var filetgd=java.newInstanceSync("org.tacografo.file.FileBlockTGD");
    java.newInstance("org.tacografo.file.FileBlockTGD",function(err,filetgd){});
    // Importo la instancia de la clase para usarla
    var FileTGD=java.import("org.tacografo.file.FileBlockTGD");
    // La Instancio para que llame al constructor con el array de bytes java
    var tgd=new FileTGD(arraybyte);
    // por fin llamo al metodo getjson
    var parseo=JSON.parse(tgd.getJsonSync());

    return parseo
};