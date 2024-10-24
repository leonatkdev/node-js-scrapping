const puppeteer = require('puppeteer');

const searchEncar = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false, // Change to false to see the browser actions
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Set a common user-agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/115.0.0.0 Safari/537.36');

    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to the Encar search page with increased timeout and different waitUntil
    await page.goto('https://car.encar.com/list/car?page=1&search=%7B%22type%22%3A%22car%22%2C%22action%22%3A%22%28And.Hidden.N._.Service.EncarMeetgo._.%28C.CarType.N._.%28C.Manufacturer.%EC%95%84%EC%9A%B0%EB%94%94._.%28C.ModelGroup.A6._.Model.A6+%28C8_%29.%29%29%29%29%22%2C%22title%22%3A%22%EC%95%84%EC%9A%B0%EB%94%94+A6+%28C8%29%2819%EB%85%84%7E%ED%98%84%EC%9E%AC%29%22%2C%22toggle%22%3A%7B%7D%2C%22layer%22%3A%22%22%2C%22sort%22%3A%22MobilePriceAsc%22%7D', {
      waitUntil: 'domcontentloaded', // Changed from 'networkidle2'
      timeout: 60000, // Increased timeout to 60 seconds
    });

    await page.waitForSelector('.ItemBigImage_item__6bPnX', { timeout: 60000 });

    const results = await page.evaluate(() => {
      let listings = [];
      document.querySelectorAll('.ItemBigImage_item__6bPnX').forEach(elem => {
        const title = elem.querySelector('.ItemBigImage_name__h0biK')?.innerText || '';
        const price = elem.querySelector('.ItemBigImage_num__Fu15_')?.innerText || '';
        const link = elem.querySelector('a')?.getAttribute('href') || '';
        const details = Array.from(elem.querySelectorAll('.ItemBigImage_info__YMI5y li')).map(el => el.innerText);
        
        listings.push({
          title: title.trim(),
          price: price.trim(),
          details,
          link: link ? `${link}` : null,
        });
      });
      return listings;
    });

    console.log('Results:', results);

    await browser.close();

    return results;
  } catch (error) {
    console.error('Error scraping Encar:', error.message);
  }
};

searchEncar();

module.exports = searchEncar