const app = require('./src/app');
const config = require('./src/config');

app.listen(config.port, () => {
  console.log(`SyncBoard API listening on http://localhost:${config.port}`);
});
