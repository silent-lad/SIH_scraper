const puppeteer = require("puppeteer");

var scraper = async number => {
  try {
    console.time("init");
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    console.timeEnd("init");
    for (let i = 1; i <= number; i++) {
      console.log(`https://www.sih.gov.in/sih2019ProblemStatements?page=${i}`);

      console.time("goto");
      await page.goto(
        `https://www.sih.gov.in/sih2019ProblemStatements?page=${i}`
      );
      var scrape = await page.evaluate(() => {
        const something = document.querySelector(
          "#table_id > tbody > tr:nth-child(1) > td:nth-child(5)"
        );

        const some = document.querySelector(
          "#table_id > tbody > tr:nth-child(1) > td:nth-child(4)"
        );
        console.log(some.innerText.trim());

        return some.innerText.trim();
      });
      console.log(scrape);

      console.timeEnd("goto");
      console.time("ss");
      await page.screenshot({ path: `./ss${i}.png` });
      console.timeEnd("ss");
    }
    await browser.close();
  } catch (error) {
    console.log(error);
    await browser.close();
  }
};

scraper(1);
