const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = process.env.MONGODB_URI;

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

if (process.argv.length === 5) {
  const person = new Person({
    id: Math.floor(Math.random() * 1000),
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${person.name} ${person.number} to the phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

if (
  process.argv.length === 4 ||
  process.argv.length > 5 ||
  process.argv.length < 3
) {
  console.log(
    "Please provide password, name, and number as an arg: node mongo.js <password> <NAME> <NUMBER>"
  );
  process.exit(1);
}
