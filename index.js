const express = require('express')
const app = express()
const port = 5000;
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const fs = require('node:fs')
const cors = require('cors');
const allowed_cores = require('./allowed_cores')
//getting origins from database

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://users:indra222@cluster0.ujnr2uh.mongodb.net/WebSocket');

const UserSchema = new mongoose.Schema({
  allowed: Array,
  o: String
});
const userModel = mongoose.model('admin', UserSchema);




async function originfinder() {
  

  
  const origin = await (await userModel.find({ o: "1" }).exec()).pop()
  
  // if (allowed_cores.cores !== origin.allowed) {
    // console.log(origin.allowed);
    let data = { "cores": origin.allowed }
    // console.log(allowed_cores.cores, origin.allowed); 
    fs.writeFileSync('./allowed_cores.json',JSON.stringify(data));
  // }

  

  return origin.allowed
  
}
originfinder()
// addressFinder()
// routs


app.set("trust proxy", 1);


const routes = require('./rts');
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  // res.render("Access-Control-Allow-Private-Network", "true");
  // res.render('Access-Control-Allow-Credentials', 'true')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

// origins()


app.use( 
  cors({
    origin: allowed_cores.cores,
    credentials: true
  }));



app.use(urlencodedParser)
// app.use(cookieParser());



app.use(routes)
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})