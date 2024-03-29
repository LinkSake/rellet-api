const express = require("express"),
  app = express(),
  mongoose = require('mongoose')
require('dotenv').config();

app.listen(8000, function () {
  console.clear();
  console.log("-> You're up on port 8000!");
});

/*set db*/
mongoose.Promise = Promise
async function run() {
  await mongoose.connect(process.env.MONGODB_URI, {
    autoReconnect: true,
    reconnectTries: 1000000,
    reconnectInterval: 3000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  })
  console.log("-> Mongo it's online!")
}
run().catch(error => console.error(error))

/*Plugings*/
app.use(require('cors')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

/*Routes*/
app.use('/',require("./routes/sessionRoutes"));
app.use('/categories', require("./routes/categoryRoutes"));
app.use('/user', require("./routes/userRoutes"));
app.use('/accounts', require("./routes/accountRoutes"));
app.use('/budget', require("./routes/budgetRoutes"));
app.use('/transaction', require("./routes/transactionRoutes"));

module.exports = app
