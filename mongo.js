const mongoose = require("mongoose");

if (process.argv.length < 5 && process.argv.length > 3) {
  console.log(
    "Please provide password, name, and number as an arg: node mongo.js <password> -NAME-  -NUMBER-"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://brandonwarner5:${password}@cluster0.6zf6h.mongodb.net/persons?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  id: Math.floor(Math.random() * 1000),
  name: name,
  number: number,
});

person.save().then((result) => {
  console.log(`added ${person.name} ${person.number} to the phonebook`);
  mongoose.connection.close();
});
