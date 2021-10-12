const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const {descriptors,places} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp',{useNewUrlParser:true, useUnifiedTopology:true })
.then(()=>{
    console.log("Database Connected")
})
.catch(err=>{
    console.log("OH NO ERROR")
    console.log(err)
})

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for (let i=0;i<300; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price =  Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            //Your author id
            author: '615bdfdd496dcb878e789a13',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dbjlfioqk/image/upload/v1633725242/YelCamp/bnxvha8ggofael2ystwa.jpg',
                  filename: 'YelCamp/bnxvha8ggofael2ystwa',
                },
                {
                  url: 'https://res.cloudinary.com/dbjlfioqk/image/upload/v1633725256/YelCamp/wbbq0lw8qaaj1ayb1amw.jpg',
                  filename: 'YelCamp/wbbq0lw8qaaj1ayb1amw',
                }
              ],
              geometry: { 
                  type: 'Point',
                  coordinates: [
                      cities[random1000].longitude,
                      cities[random1000].latitude
                  ]
                }
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})