
/**
 * Created by Andres Carmona Gil on 26/08/2015.
 */
'use strict';
var fs=require('fs')
var FileTGD=require('../index')

fs.readFile('C:\\Users\\negrero\\workspace\\tachograph-structure\\C_E10858690E000002_E_20150809_2121.TGD',
//fs.readFile('path/file.tgd',
    function (err, data) {
    if (err) {
        return console.log(err);
    }
        /*
    fileTGD(data,function(err,result){
        if (err){
            console.log(err)
        }else{
            console.log(result)
        }
    });
    */
     var fileTGD=new FileTGD()
        fileTGD.lib('./lib-java')
        fileTGD.parse(data,null,null,function(err,data){
            if(err){
                console.log(err)
            }else{
                var json=JSON.parse(data)
                json.cardBlockFile.tachos.activity.forEach(function(e){
                    if (e.registration==null && e.cardNumber==null)
                            console.log()
                })
                console.log(data)
            }


        })

});