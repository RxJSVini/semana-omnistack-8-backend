const mongoose = require('mongoose');

module.exports = {
    init(){
        mongoose.connect('mongodb://localhost:27017/tindev',(error) =>{
            if(error){
                console.log(error)
            }
            console.log("MongoDB, Conectado!")
        })
    }
}

