/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {

  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;


  sails.getInvalidIdMsg = function (opts) {

    if (opts.id && isNaN(parseInt(opts.id))) {
        return "Primary key specfied is invalid (incorrect type).";
    }

    if (opts.fk && isNaN(parseInt(opts.fk))) {
        return "Foreign key specfied is invalid (incorrect type).";
    }

    return null;        // falsy

}

  await Person.createEach([
    { "eventName": "Research Clusters", "shortDescription": "Creative Media/Practice Health and Drug Discovery", "fullDescription": "Research Clusters  Creative Media/Practice Health and Drug Discovery Data Analytics and Artificial Intelligence", "imageURL": "https://www.hkbu.edu.hk/eng/main/images/227x151_clusters.jpg", "organizer": "Justice League", "eventDate": "10/24/2018", "time": "15:00", "age": 333, "createdAt": 1540487135350, "updatedAt": 1540487135350, "id": 56, "name": "", "_id": 56 },
    { "eventName": "Talent100", "shortDescription": "HKBU's Global Search for 100 Faculty Members", "fullDescription": "Talent100  HKBU's Global Search for 100 Faculty Members", "imageURL": "https://www.hkbu.edu.hk/eng/main/images/t100-227x148.jpg", "organizer": "Avengers", "eventDate": "10/31/2018", "time": "16:00", "age": 666, "createdAt": 1540487200409, "updatedAt": 1540487200409, "id": 57, "name": "", "_id": 57 },
    { "eventName": "HKBU Horizons", "shortDescription": "Showcases HKBU’s academic expertise and community engagement", "fullDescription": "HKBU Horizons  Showcases HKBU’s academic expertise and community engagement", "imageURL": "https://www.hkbu.edu.hk/eng/main/images/2018issue3_horizon.jpg", "organizer": "Justice League", "eventDate": "10/31/2018", "time": "17:00", "age": 777, "createdAt": 1540487257806, "updatedAt": 1540487257806, "id": 58, "name": "", "_id": 58 },
    { "eventName": "Knowledge", "shortDescription": "Jao Tsung-I Academy of Sinology launches Library of Sinology publication series", "fullDescription": "The Jao Tsung-I Academy of Sinology has launched a new book series. The Library of Sinology, which is published by the German academic publishing powerhouse De Gruyter, features both original and cutting-edge studies from eminent Western Sinologists and young scholars. The series exclusively focuses on Classical Chinese Studies with an overarching interdisciplinary bent.", "imageURL": "https://www.hkbu.edu.hk/eng/main/images/achieve_2017.png", "organizer": "Avengers", "eventDate": "10/29/2018", "time": "19:00", "age": 888, "createdAt": 1540487334941, "updatedAt": 1540487334941, "id": 59, "name": "", "_id": 59 },

  ]);

  if (await User.count() > 0) {
    return done();
  }

  const hash = await sails.bcrypt.hash('123456', saltRounds);
  await User.createEach([
    { "username": "admin", "password": hash, role: "admin" },
    { "username": "boss", "password": hash, role: "visitor" },
    { "username": "student", "password": hash, role: "student" },
    { "username": "student1", "password": hash, role: "student" }

  ]);



  const a = await User.findOne({ username: "admin" });
  const e1 = await Person.findOne({ eventName: "Research Clusters" });
  const e2 = await Person.findOne({ eventName: "Talent100" });

  await User.addToCollection(a.id, 'participate').members([e1.id, e2.id]);




  return done(); 

};
