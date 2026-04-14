const mongoose = require('mongoose');

// local MongoDB connection
const localURI = 'mongodb://127.0.0.1:27017/Week11DB';

// Atlas MongoDB connection
const atlasURI = 'mongodb+srv://jmarcial_db_user:RxKWSPxhTaK.97f@cluster0.wwfryri.mongodb.net/Week11DB?retryWrites=true&w=majority&appName=Cluster0';;

// customer schema
const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String
});

// hotel schema
const hotelSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  location: String,
  description: String
});

// amenities schema
const amenitiesSchema = new mongoose.Schema({
  pool: Boolean,
  lawn: Boolean,
  BBQ: Boolean,
  laundry: Boolean
});

// function to run CRUD for one database connection
async function runCRUD(uri, label) {
  const conn = await mongoose.createConnection(uri).asPromise();
  console.log(`Connected to ${label}`);

  // models
  const customerModel = conn.model('Customer', customerSchema);
  const hotelModel = conn.model('Hotel', hotelSchema);
  const amenitiesModel = conn.model('Amenities', amenitiesSchema);

  console.log('Customer schema ready');
  console.log('Hotel schema ready');
  console.log('Amenities schema ready');

  // delete old records
  await customerModel.deleteMany({});
  await hotelModel.deleteMany({});
  await amenitiesModel.deleteMany({});
  console.log('All old records deleted');

  // insert customer records
  await customerModel.insertMany([
    {
      firstName: 'Jonas',
      lastName: 'Marcial',
      email: 'jonas@email.com',
      phone: '808-555-1111'
    },
    {
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria@email.com',
      phone: '808-555-2222'
    },
    {
      firstName: 'David',
      lastName: 'Lee',
      email: 'david@email.com',
      phone: '808-555-3333'
    }
  ]);
  console.log('3 customer records inserted');

  // insert hotel records
  await hotelModel.insertMany([
    {
      name: 'Maui Beach Hotel',
      rating: 4,
      location: 'Kahului',
      description: 'A hotel near the beach and airport'
    },
    {
      name: 'Wailea Resort',
      rating: 5,
      location: 'Wailea',
      description: 'A luxury resort with ocean views'
    },
    {
      name: 'Hana Inn',
      rating: 3,
      location: 'Hana',
      description: 'A quiet hotel surrounded by nature'
    }
  ]);
  console.log('3 hotel records inserted');

  // insert amenities records
  await amenitiesModel.insertMany([
    {
      pool: true,
      lawn: true,
      BBQ: false,
      laundry: true
    },
    {
      pool: false,
      lawn: true,
      BBQ: true,
      laundry: true
    },
    {
      pool: true,
      lawn: false,
      BBQ: true,
      laundry: false
    }
  ]);
  console.log('3 amenities records inserted');

  // query hotel by name
  const hotelFound = await hotelModel.findOne({ name: 'Wailea Resort' });
  console.log('Hotel query result:');
  console.log(hotelFound);

  // query amenities by pool
  const amenitiesFound = await amenitiesModel.findOne({ pool: true });
  console.log('Amenities query result:');
  console.log(amenitiesFound);

  // close this connection
  await conn.close();
  console.log(`Disconnected from ${label}\n`);
}

// run for local and Atlas
async function main() {
  try {
    await runCRUD(localURI, 'local MongoDB');
    await runCRUD(atlasURI, 'Atlas MongoDB');
  } catch (error) {
    console.log('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

main();