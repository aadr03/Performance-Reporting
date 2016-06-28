var express =  require('express');


var app = express();


// app.get('/', function (req,res) {
//     res.render ('./index')
// })

app.use(express.static(__dirname + '/client' ))


app.listen(8000 ,function(){
    console.log("Server running on port 8000...");
})



