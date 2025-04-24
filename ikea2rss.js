const { chromium } = require("playwright");
const cheerio = require("cheerio");
const RSS = require("rss");
const fs = require("fs");


(async () => {
  try {
    // Launch Playwright and open a new browser page
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Navigate to the target website
    const targetURL = "https://www.ikea.com/es/es/stores/events/ikea-malaga/"; 
    await page.goto(targetURL);

    const ikeaEventCSSSelector = ".sc-dAlyuH.gwQaZn";

    // Wait for the dynamic content to load
    // Adjust the selector to match the element that indicates the content has loaded
    await page.waitForSelector(ikeaEventCSSSelector, { timeout: 10000 });
    

    // Extract the HTML content after the content has loaded
    const html = await page.content();

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);


    // Extract the desired data using CSS selectors
    const feedItems = [];
    $(ikeaEventCSSSelector).each((index, element) => {
      const title = $(element).find("h3").text().trim();
      const link = "https://www.ikea.com" + $(element).attr("href");
      const date = $(element).find(".sc-dcJsrY.bVNDBq").text().trim();
      const description = $(element).find(".sc-hmdomO.cvoKHo").text().trim();
      const image = $(element).find("img").attr("src");
      feedItems.push({ title, link, description, date, image });
    });

    //console.log(feedItems[0]);


    // Generate the RSS feed
    const feed = new RSS({
        title: "Eventos Ikea Málaga",
        description: "Eventos de la tienda de Ikea Málaga",
        feed_url: targetURL,
        site_url: targetURL,
        });
    
        feedItems.forEach((item) => {
        feed.item({
            title: item.title,
            description: item.date + "/n/n" + item.description,
            url: item.link,
            // date: new Date(), let's try if it works without a date
            custom_elements: [
                { "media:content": { _attr: { url: item.image, type: "image/png" } } },
              ],
        });
    });

    // Write the RSS feed to a file
    const rssOutput = feed.xml({ indent: true });
    fs.writeFileSync("feed/feed.xml", rssOutput);

    console.log("RSS feed has been generated and saved at 'feed/feed.xml'");


    // Step 6: Close the browser
    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
})();