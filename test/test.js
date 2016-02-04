
/**
 * Created by Andres Carmona Gil on 26/08/2015.
 */
'use strict';
var fs=require('fs')
var fileTGD=require('../index')

fs.readFile('C:\\Users\\negrero\\workspace\\tachograph-structure\\76e.TGD',
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
        fileTGD(data,null,null,function(err,data){
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }


        })

});