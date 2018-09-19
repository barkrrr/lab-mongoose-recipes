'use strict'

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Clean database (this will take time)

Recipe.remove({})
.then(() => {
  console.log('db clean')
})
.catch(() => {
  console.log('There is a problem')
});

// Create one recipe

Recipe.create({ title: 'Late Night Pizza', level: 'Easy Peasy', ingredients: ['2 cups of flour', '1 can of chopped tomatoes', '1 ball of fresh mozzarella cheese', '1 handfull of fresh basil leaves', 'a pinch of salt'] })

const Recipe = mongoose.model('Recipe', recipeSchema);


// ----- Create recipe database form file-----

Recipe.insertMany(data)
  .then((results) => {
    console.log(results)
  })
  .catch((error) => {
    console.log(error);
  });

//---- Update one Recipe ----

Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: {duration: 100} }, {new: true})
  .then(() => {
    console.log('successfully changed the time');
  })
  .catch(() => {
    console.log('Something went wrong, error');
  });

//--- Delete one recipe -----

Recipe.deleteOne({ title: 'Carrot Cake' })
.then(() => {
  console.log('Successfully deleted carrot cake');
  mongoose.connections.close();
})
.catch(() =>{
  console.log('Something went wrong while deleting');
});

// --- Export recipes---

module.exports = Recipe;

