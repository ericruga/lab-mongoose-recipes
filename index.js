const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((response) => {
      return Recipe.create({
        title:'Pizza Catalana',
        level:'UltraPro Chef',
        ingredients: ["pà", "tomàquet", "oli"],
        cuisine: 'Mediterranian',
        dishType: 'other',
        image: "https://www.eliris.cat/wp-content/uploads/2018/08/IMG_2198-copia-1024x730.jpg",
        duration: '20',
        creator: 'Erica',
        created: '2013-12-01'
      })
      //console.log(title);
    })

    .then((response) => {
      return Recipe.insertMany(data);
      //console.log('hola');
    })

    .then((response) => {
      return Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" }, 
        { duration: 100 },
        { new: true } 
      );
    })
 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
