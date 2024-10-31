
const puppeteer = require("puppeteer");

let browser, page;
let manufacturers = [];

// const manufacturersObj = [
//   { englishName: 'Hyundai', originalKey: '현대' },
//   { englishName: 'Genesis', originalKey: '제네시스' },
//   { englishName: 'Kia', originalKey: '기아' },
//   { englishName: 'Chevrolet (GM Daewoo)', originalKey: '쉐보레(GM대우)' },
//   { englishName: 'Renault Korea (Samsung)', originalKey: '르노코리아(삼성)' },
//   { englishName: 'KG Mobility (SsangYong)', originalKey: 'KG모빌리티(쌍용)' },
//   { englishName: 'Other Manufacturers', originalKey: '기타 제조사' },
//   { englishName: 'BMW', originalKey: 'BMW' },
//   { englishName: 'GMC', originalKey: 'GMC' },
//   { englishName: 'Nissan', originalKey: '닛산' },
//   { englishName: 'Daihatsu', originalKey: '다이하쯔' },
//   { englishName: 'Dodge', originalKey: '닷지' },
//   { englishName: 'Toyota', originalKey: '도요타' },
//   { englishName: 'Dongfeng Sokon', originalKey: '동풍소콘' },
//   { englishName: 'Lamborghini', originalKey: '람보르기니' },
//   { englishName: 'Land Rover', originalKey: '랜드로버' },
//   { englishName: 'Lexus', originalKey: '렉서스' },
//   { englishName: 'MG Rover', originalKey: 'MG로버' },
//   { englishName: 'Lotus', originalKey: '로터스' },
//   { englishName: 'Rolls-Royce', originalKey: '롤스로이스' },
//   { englishName: 'Renault', originalKey: '르노' },
//   { englishName: 'Lincoln', originalKey: '링컨' },
//   { englishName: 'Maserati', originalKey: '마세라티' },
//   { englishName: 'Maybach', originalKey: '마이바흐' },
//   { englishName: 'Mazda', originalKey: '마쯔다' },
//   { englishName: 'McLaren', originalKey: '맥라렌' },
//   { englishName: 'Mercury', originalKey: '머큐리' },
//   { englishName: 'Mini', originalKey: '미니' },
//   { englishName: 'Mitsubishi', originalKey: '미쯔비시' },
//   { englishName: 'Mitsuoka', originalKey: '미쯔오까' },
//   { englishName: 'Mercedes-Benz', originalKey: '벤츠' },
//   { englishName: 'Bentley', originalKey: '벤틀리' },
//   { englishName: 'Volvo', originalKey: '볼보' },
//   { englishName: 'Bugatti', originalKey: '부가티' },
//   { englishName: 'BAIC Yinxiang', originalKey: '북기은상' },
//   { englishName: 'Buick', originalKey: '뷰익' },
//   { englishName: 'Saab', originalKey: '사브' },
//   { englishName: 'Scion', originalKey: '사이언' },
//   { englishName: 'Saturn', originalKey: '새턴' },
//   { englishName: 'Chevrolet', originalKey: '쉐보레' },
//   { englishName: 'Smart', originalKey: '스마트' },
//   { englishName: 'Subaru', originalKey: '스바루' },
//   { englishName: 'Suzuki', originalKey: '스즈키' },
//   { englishName: 'Citroën/DS', originalKey: '시트로엥/DS' },
//   { englishName: 'Audi', originalKey: '아우디' },
//   { englishName: 'Alfa Romeo', originalKey: '알파 로메오' },
//   { englishName: 'Aston Martin', originalKey: '애스턴마틴' },
//   { englishName: 'Acura', originalKey: '어큐라' },
//   { englishName: 'Opel', originalKey: '오펠' },
//   { englishName: 'Oldsmobile', originalKey: '올즈모빌' },
//   { englishName: 'Isuzu', originalKey: '이스즈' },
//   { englishName: 'Infiniti', originalKey: '인피니티' },
//   { englishName: 'Jaguar', originalKey: '재규어' },
//   { englishName: 'Jeep', originalKey: '지프' },
//   { englishName: 'Cadillac', originalKey: '캐딜락' },
//   { englishName: 'Koenigsegg', originalKey: '코닉세그' },
//   { englishName: 'Chrysler', originalKey: '크라이슬러' },
//   { englishName: 'Tesla', originalKey: '테슬라' },
//   { englishName: 'Pagani', originalKey: '파가니' },
//   { englishName: 'Ferrari', originalKey: '페라리' },
//   { englishName: 'Ford', originalKey: '포드' },
//   { englishName: 'Porsche', originalKey: '포르쉐' },
//   { englishName: 'Foton', originalKey: '포톤' },
//   { englishName: 'Volkswagen', originalKey: '폭스바겐' },
//   { englishName: 'Pontiac', originalKey: '폰티악' },
//   { englishName: 'Polestar', originalKey: '폴스타' },
//   { englishName: 'Peugeot', originalKey: '푸조' },
//   { englishName: 'Fiat', originalKey: '피아트' },
//   { englishName: 'Hummer', originalKey: '험머' },
//   { englishName: 'Honda', originalKey: '혼다' },
//   { englishName: 'BYD', originalKey: 'BYD' },
//   { englishName: 'Other Imported Cars', originalKey: '기타 수입차' }
// ];

const manufacturersObj = [
  { englishName: 'Toyota', originalKey: '도요타' },
  { englishName: 'Volkswagen', originalKey: '폭스바겐' },
  { englishName: 'Hyundai', originalKey: '현대' },
  { englishName: 'Ford', originalKey: '포드' },
  { englishName: 'Nissan', originalKey: '닛산' },
  { englishName: 'Honda', originalKey: '혼다' },
  { englishName: 'Chevrolet', originalKey: '쉐보레' },
  { englishName: 'Kia', originalKey: '기아' },
  { englishName: 'Mercedes-Benz', originalKey: '벤츠' },
  { englishName: 'BMW', originalKey: 'BMW' },
  { englishName: 'Audi', originalKey: '아우디' },
  { englishName: 'Lexus', originalKey: '렉서스' },
  { englishName: 'Mazda', originalKey: '마쯔다' },
  { englishName: 'Jeep', originalKey: '지프' },
  { englishName: 'Porsche', originalKey: '포르쉐' },
  { englishName: 'Tesla', originalKey: '테슬라' },
  { englishName: 'Subaru', originalKey: '스바루' },
  { englishName: 'Land Rover', originalKey: '랜드로버' },
  { englishName: 'Mitsubishi', originalKey: '미쯔비시' },
  { englishName: 'Cadillac', originalKey: '캐딜락' }
];


// Initialize browser and scrape manufacturers
const initBrowser = async () => {
  browser = await puppeteer.launch({
    headless: false, // Keep the browser visible for testing
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
  );
  await page.setViewport({ width: 1280, height: 800 });

  // Navigate to the manufacturer page
  await page.goto(
    "https://m.encar.com/ca/search.do#!%7B%22type%22%3A%22car%22%2C%22action%22%3A%22(And.Hidden.N._.Service.EncarMeetgo._.CarType.A.)%22%2C%22toggle%22%3A%7B%7D%2C%22layer%22%3A%22optManufact%22%2C%22sort%22%3A%22ModifiedDate%22%7D",
    {
      waitUntil: "domcontentloaded",
      timeout: 100000,
    }
  );

  // Wait for manufacturers to load and scrape them
  await page.waitForSelector(
    "li[data-bind*=\"visible: Metadata.CarType == 'N'\"] > a .txt_item",
    { timeout: 100000 }
  );

  // Pass manufacturersObj to page.evaluate and return the data directly
  // manufacturers = await page.evaluate((manufacturersMap) => {
  //   return Array.from(
  //     document.querySelectorAll(
  //       "li[data-bind*=\"visible: Metadata.CarType == 'N'\"] > a .txt_item"
  //     )
  //   ).map((el) => {
  //     const originalKey = el.innerText.trim();
  //     return {
  //       englishName: manufacturersMap[originalKey] || "Unknown",
  //       originalKey: originalKey,
  //     };
  //   });
  // }, manufacturersObj);

  // console.log('manufacturers', manufacturers)

  // return manufacturers;
};

// Function to click a manufacturer
const clickManufacturer = async (manufacturer) => {
  if (!page) {
    console.log('', "Browser is not initialized. Call initBrowser() first.");
    await initBrowser();
  }

  // Find and click on the manufacturer
  await page.evaluate((manufacturer) => {
    const element = Array.from(
      document.querySelectorAll(
        "li[data-bind*=\"visible: Metadata.CarType == 'N'\"] > a .txt_item"
      )
    ).find((el) => el.innerText.trim() === manufacturer);
    if (element) element.click();
  }, manufacturer);
};

// Expose async function to get manufacturers
// const getManufacturers = async () => {
//   if (manufacturers.length === 0) {
//     await initBrowser(); // Ensure data is fetched if not already
//   }
//   return manufacturers;
// };

module.exports = {
  initBrowser,
  clickManufacturer,
  // getManufacturers,
  manufacturersObj
};