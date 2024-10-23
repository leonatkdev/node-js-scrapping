const axios = require("axios")
const cron  = require("node-cron")

const url = ''

// Schedule the scraper to run every hour
cron.schedule('0 * * * *', () => {
    console.log('Checking for new products at', new Date().toLocaleString());
    checkForNewProducts();
  });