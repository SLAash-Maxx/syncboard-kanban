const app = require('./src/app');
const config = require('./src/config');
const connectDB = require('./src/config/db');

async function start() {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`SyncBoard API listening on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
