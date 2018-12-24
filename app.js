const puppeteer = require("puppeteer");
const chalk = require("chalk");
var fs = require("fs");

// MY OCD of colorful console.logs for debugging
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: false });

    // open a new page
    var page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36"
    );

    // enter url in page
    await page.goto(`https://www.sih.gov.in/sih2019ProblemStatements?page=1`);
    await page.waitForSelector(
      "body>div.container-fluid>div>div.intro.clearfix>div>ul>li:nth-last-child(2)>a"
    );

    // Get number of pages to scrape
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

    // List to store all the ideaList(object)
    var ideaList = [];

    // For Loop for each page
    for (let page_no = 1; page_no <= pageCount; page_no++) {
      // goto to the page we have to scrape
      await page.goto(
        `https://www.sih.gov.in/sih2019ProblemStatements?page=${page_no}`,
        { timeout: 3000000 }
      );
      await page.waitForSelector("#table_id_info");

      // get number of ideas on the page
      const ideaCount = await page.evaluate(() =>
        parseInt(
          document
            .querySelector("#table_id_info")
            .innerText.trim()
            .slice(13, 15),
          10
        )
      );

      // For loop to iterate on each idea on the given page
      for (var idea = 1; idea <= ideaCount; idea++) {
        // evaluate function to access dom in open browser
        const ideaName = await page.evaluate(idea => {
          // Idea object to hold all the idea info eg:- title,description,organisation
          var ideaObject = {};

          // Getting title of the idea
          ideaObject.title = document
            .querySelector(
              `#table_id > tbody > tr:nth-child(${idea}) > td:nth-child(3)`
            )
            .innerText.trim();

          // Getting organisation of the idea
          ideaObject.organisation = document
            .querySelector(
              `#table_id > tbody > tr:nth-child(${idea}) > td:nth-child(2)`
            )
            .innerText.trim();

          // Getting category of the idea
          ideaObject.category = document
            .querySelector(
              `#table_id > tbody > tr:nth-child(${idea}) > td:nth-child(4)`
            )
            .innerText.trim();

          // Getting idea technology bucket
          ideaObject.bucket = document
            .querySelector(
              `#table_id > tbody > tr:nth-child(${idea}) > td:nth-child(6)`
            )
            .innerText.trim();

          // Getting complexity of the idea
          ideaObject.complexity = document
            .querySelector(
              `#table_id > tbody > tr:nth-child(${idea}) > td:nth-child(7)`
            )
            .innerText.trim();

          // TRICKY 1:- getting the description inside the pop-up modal
          var modalDescriptions = document.querySelectorAll(
            "#settings > thead > tr:nth-child(1) > td >div"
          );
          if (typeof modalDescriptions[idea - 1] != "undefined") {
            ideaObject.description = modalDescriptions[
              idea - 1
            ].innerText.trim();
          }

          // TRICKY 2:- getting the youtube link inside the pop-up modal
          var modalYoutube = document.querySelectorAll(
            "#settings > thead > tr:nth-child(5) > td >a"
          );
          if (typeof modalYoutube[idea - 1] != "undefined") {
            ideaObject.youtubeLink = modalYoutube[idea - 1].innerText.trim();
          }

          // return the Idea
          return ideaObject;
        }, idea); // Passing the idea to our evaluate function to be used in our browser

        // Pushing the idea in the ideaList
        ideaList.push(ideaName);
      }
    } //END of both for-loops

    // Writing the ideaList inside a json file
    fs.writeFile("sih.json", JSON.stringify(ideaList), function(err) {
      if (err) throw err;
      console.log("Saved!");
    });

    // Closing our headless browser
    await browser.close();
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();
