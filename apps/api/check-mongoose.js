const mongoose = require('mongoose');

async function test() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect('mongodb://127.0.0.1:27017/injaazh', {
    serverSelectionTimeoutMS: 5000
  });
  console.log('Connected. readyState:', mongoose.connection.readyState);
  
  const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
  
  console.log('Creating document...');
  const doc = await TestModel.create({ name: 'hello' });
  console.log('Created doc:', doc._id);
  
  console.log('Finding document...');
  const found = await TestModel.findOne({ name: 'hello' });
  console.log('Found doc:', found._id);
  
  await mongoose.disconnect();
  console.log('Done.');
}

test().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
