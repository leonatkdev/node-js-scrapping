const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape Mobile.de
const searchMobileDe = async () => {
  try {
    // Replace with dynamic query params if needed
    const url = `https://car.encar.com/list/car?page=1&search=%7B%22type%22%3A%22car%22%2C%22action%22%3A%22%28And.Hidden.N._.Service.EncarMeetgo._.%28C.CarType.N._.%28C.Manufacturer.%EC%95%84%EC%9A%B0%EB%94%94._.%28C.ModelGroup.A6._.Model.A6+%28C8_%29.%29%29%29%29%22%2C%22title%22%3A%22%EC%95%84%EC%9A%B0%EB%94%94+A6+%28C8%29%2819%EB%85%84%7E%ED%98%84%EC%9E%AC%29%22%2C%22toggle%22%3A%7B%7D%2C%22layer%22%3A%22%22%2C%22sort%22%3A%22MobilePriceAsc%22%7D`; 
    
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    let results = [];


    $('.ItemBigImage_item__6bPnX').each((i, elem) => {
      const title = $(elem).find('.ItemBigImage_name__h0biK').text().trim();
      const price = $(elem).find('.ItemBigImage_num__Fu15_').text().trim();
      const link = $(elem).find('a').attr('href');

      const carInfo = $(elem).find('.ItemBigImage_info__YMI5y li').map((index, el) => $(el).text()).get(); // Gets list of car details (year, km, fuel type, etc.)

      results.push({
        title,
        price: `${price}만원`,  // Adding the currency symbol (Korean Won - ₩)
        details: carInfo,
        link: link ? link : null  // Add full link if available
      });
    });

    // Display the results in the terminal
    console.log('Results:', results);
    
    return results;

  } catch (error) {
    console.error('Error fetching from Mobile.de:', error);
    return [];
  }
};

// Call the function to trigger scraping and display the results
searchMobileDe();
