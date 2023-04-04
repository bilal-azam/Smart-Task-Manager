const redis = require('redis');

const client = redis.createClient();
client.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = client;
