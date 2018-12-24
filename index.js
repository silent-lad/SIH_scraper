const puppeteer = require("puppeteer");
const chalk = require("chalk");

const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const success = chalk.keyword("green");

// var scraper = async number => {
//   try {
console.time("init");
puppeteer.launch().then(browser => {
  browser
    .newPage()
    .then(page => {
      page
        .goto(`https://www.sih.gov.in/sih2019ProblemStatements?page=1`, {
          waitUntill: "networkIdle2"
        })
        .then(() => {
          page.content().then(res => {
            // console.log(res);
            browser.close().then(() => {
              console.log(success("Browser Closed"));
            });
          });
        });
    })
    .catch(err => {
      console.log(err);
      browser.close().then(() => {
        console.log(error("Browser Closed"));
      });
    });
});

// 8285679306  brijendra singh

// const page = await browser.newPage();
// console.timeEnd("init");

// await page.goto(`https://www.sih.gov.in/sih2019ProblemStatements?page=1`, {
//   waitUntill: "networkIdle2"
// });

// var html = await page.content();

// console.log(html);

// await browser.close();
//   for (let i = 1; i <= number; i++) {
//     console.log(`https://www.sih.gov.in/sih2019ProblemStatements?page=${i}`);

//     console.time("goto");
//     await page.goto(
//       `https://www.sih.gov.in/sih2019ProblemStatements?page=${i}`,
//       {
//         waitUntill: "networkIdle2"
//       }
//     );

//     var scrape = await page.evaluate(() => {
//       const something = document.querySelector(
//         "#table_id > tbody > tr:nth-child(1) > td:nth-child(5)"
//       );

//       const some = document.querySelector(
//         "#table_id > tbody > tr:nth-child(1) > td:nth-child(4)"
//       );
//       console.log(some.innerText.trim());

//       return some.innerText.trim();
//     });
//     console.log(scrape);

//     console.timeEnd("goto");
//     console.time("ss");
//     await page.screenshot({ path: `./ss${i}.png` });
//     console.timeEnd("ss");
//   }
//   await browser.close();
// } catch (error) {
//   console.log(error);
//   await browser.close();
// }
// };

// scraper(1);
