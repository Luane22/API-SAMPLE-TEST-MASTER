const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const { MONGO_URI } = process.env;

const packageJson = require('./package.json');
process.env.VERSION = packageJson.version;

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

process.env.HUBSPOT_ACCESS_TOKEN = 'pat-na1-b8c2452a-ccff-4827-8368-2cc4f6038bb9';

mongoose
  .connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('✅ MongoDB connected successfully!');

    require('./Domain');

    require('./worker')();
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  });

process.env.instance = 'app';

require('./server');
