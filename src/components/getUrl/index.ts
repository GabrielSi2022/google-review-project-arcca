import puppeteer, { Page } from "puppeteer";

async function getUrl() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const urlPage =
    "https://www.google.com/maps/place/Nema+-+Visconde+de+Piraj%C3%A1+%7C+Padaria+de+Fermenta%C3%A7%C3%A3o+Natural/@-22.9841517,-43.2154292,17z/data=!3m2!4b1!5s0x9bd50757e02857:0x35aa6a9b37f5d532!4m6!3m5!1s0x9bd58a0cdc1487:0x4c1eb56d62eb469b!8m2!3d-22.9841517!4d-43.2128543!16s%2Fg%2F11j20tdp78?entry=ttu";

  await page.goto(urlPage);

  function delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async function waitForSelectorWithDelay(
    page: Page,
    selector: string,
    timeout: number = 1000
  ) {
    try {
      await page.waitForSelector(selector, { timeout });
      await new Promise((resolve) => setTimeout(resolve, timeout)); // Aguarda um tempo adicional após o carregamento do seletor
    } catch (error) {
      throw new Error(`Timeout ao aguardar o seletor: ${selector}`);
    }
  }

  async function scrollPage(page: Page) {
    const selector = "[data-review-id]";
    await waitForSelectorWithDelay(page, selector);
    await page.evaluate(() => {
      const reviews = document.querySelector("[data-review-id]");
      if (reviews) reviews.scrollTo(0, 5000);
    });
  }

  await page.waitForNavigation();
  await page.click("[jslog^='145620']");
  await page.waitForNavigation();
  await page.click("[jslog^='59550']");
  await page.waitForNavigation();
  await page.waitForSelector("div.fxNQSd:nth-child(2)");

  await page.click("div.fxNQSd:nth-child(1)");
  await page.click("div.fxNQSd:nth-child(2)");

  await scrollPage(page);
  await scrollPage(page);
  await scrollPage(page);
}

getUrl();

// Launch the browser and open a new blank page

// Navigate the page to a URL

//   // Set screen size
//   await page.setViewport({ width: 1080, height: 1024 });

//   // Type into search box
//   await page.type(".devsite-search-field", "automate beyond recorder");

//   // Wait and click on first result
//   const searchResultSelector = ".devsite-result-item-link";
//   await page.waitForSelector(searchResultSelector);
//   await page.click(searchResultSelector);

//   // Locate the full title with a unique string
//   const textSelector = await page.waitForSelector(
//     "text/Customize and automate"
//   );
//   const fullTitle = await textSelector?.evaluate((el) => el.textContent);

//   // Print the full title
//   console.log('The title of this blog post is "%s".', fullTitle);
