const puppeteer = require("puppeteer");
const chalk = require("chalk");

const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const success = chalk.keyword("green");

var scraper = async () => {
  try {
    let data;
    var browser = await puppeteer.launch({ headless: false });
    var page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36"
    );
    await page.goto(`https://www.sih.gov.in/sih2019ProblemStatements?page=1`);
    await page.waitForSelector("#table_id_info");
    // document.querySelector("#settings > thead > tr:nth-child(1) > td > div");
    var tableScraper = await page.evaluate(() => {
      const count = document.querySelector("#table_id_info");
      var ideaCount = parseInt(count.innerText.trim().slice(13, 15), 10);
      var list = [];
      console.log(ideaCount);
      //   for (let i = 1; i < ideaCount; i++) {
      let ideaName = document.querySelectorAll(
        `#settings > thead > tr:nth-child(1) > td > div`
      );
      for (let i = 1; i < ideaCount; i++) {
        list.unshift(ideaName[i--].innerText.trim());
      }
      // let ideaOrg = document.querySelector(
      //   `#table_id > tbody > tr:nth-child(${i}) > td:nth-child(2)`
      // );
      // let ideaCategory = document.querySelector(
      //   `#table_id > tbody > tr:nth-child(${i}) > td:nth-child(4)`
      // );
      // list.unshift(ideaName.innerText.trim());
      //   }
      return list;
    });
    console.log(tableScraper);

    // const cells = await page.$$(
    //   "#table_id > tbody > tr:nth-child(1) > td:nth-child(4)"
    // );

    // console.log(cells.length());

    // for (const cell of cells) {
    //   console.log(cell);
    // }

    // await browser.close();
    console.log(success("Browser Closed"));
  } catch (err) {
    console.log(error(err));
    // await browser.close();
    console.log(error("Browser Closed"));
  }
};

scraper();
