# SIH_scraper

## Description

This is a script which scrapes Smart India Hackathon(SIH) website for all the ideas and saves the result in json format in sih.json .

## Technology Used

- Node.js
- Puppeteer
- Chromium

## Installation and setup

- Make sure you have Node.js installed on your system. [Click Here](https://nodejs.org/en/) for installation.
- Then follow the following steps.

```
npm install
```

- This may take a few while as it also downloads Chromium browser.
- Now to run the script:-

```
node app.js
```

- Wait for it to completely scrape the file.

## Installation and setup for vue app to scroll over the ideas

- I hope you have Node.js installed
- Then open /display in your terminal or cmd.
- After that -

```
npm i -g serve

serve -S dist
```

- You should have the website running on the port given on terminal..
- Some points to keep in mind:-
  - There are 2 input fields:-
    - One is for searching among the ideas via description or title or organisation
    - Second is for determining number of ideas you want to see on a single page.
  - I have only shown some fields for test purpose.
  - Pardon my CSS.
