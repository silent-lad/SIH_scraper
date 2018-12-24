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
    // body > div.container-fluid > div > div.intro.clearfix > div > ul > li:nth-last-child(2)
    await page.goto(`https://www.sih.gov.in/sih2019ProblemStatements?page=1`);
    await page.waitForSelector(
      "body>div.container-fluid>div>div.intro.clearfix>div>ul>li:nth-last-child(2)>a"
    );
    const pageCount = await page.evaluate(() =>
      parseInt(
        document
          .querySelector(
            "body>div.container-fluid>div>div.intro.clearfix>div>ul>li:nth-last-child(2)>a"
          )
          .innerText.trim(),
        10
      )
    );
    for (let page_no = 1; page_no <= pageCount; page_no++) {
      await page.goto(
        `https://www.sih.gov.in/sih2019ProblemStatements?page=${page_no}`
      );
      await page.waitForSelector("#table_id_info");
      const ideaCount = await page.evaluate(() =>
        parseInt(document.querySelector("#table_id_info").innerText.trim(), 10)
      );
      const modals = await page.evaluate(() =>
        document.querySelectorAll(
          "#settings > thead > tr:nth-child(1) > td >div"
        )
      );
      for (let idea = 1; idea <= ideaCount; idea++) {
        const ideaName = await page.evaluate(() =>
          document
            .querySelector(
              `#table_id > tbody > tr:nth-child(${idea}) > td:nth-child(3)`
            )
            .innerText.trim()
        );
        console.log(ideaName);
        console.log(modals[idea].innerText.trim());
      }
    }

    // var tableScraper = await page.evaluate(() => {
    //   const count = document.querySelector("#table_id_info");
    //   var ideaCount = parseInt(count.innerText.trim().slice(13, 15), 10);
    //   var list = [];
    //   console.log(ideaCount);
    //   var ex = document.querySelectorAll(
    //     "#settings > thead > tr:nth-child(1) > td >div"
    //   );

    //   for (let i = 1; i < ideaCount; i++) {
    //     console.log(ex[i].innerText.trim());
    //     let ideaOrg = document.querySelector(
    //       `#table_id > tbody > tr:nth-child(${i}) > td:nth-child(2)`
    //     );
    //     let ideaCategory = document.querySelector(
    //       `#table_id > tbody > tr:nth-child(${i}) > td:nth-child(4)`
    //     );
    //     list.unshift(ideaName.innerText.trim());
    //   }
    //   return list;
    // });
    // console.log(tableScraper);

    await browser.close();
    console.log(success("Browser Closed"));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
};

scraper();

// #settings > thead > tr: nth - child(1) > td
