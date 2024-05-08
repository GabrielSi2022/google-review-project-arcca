import puppeteer, { Page } from "puppeteer";

export async function getUrl(urlPage: string) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  let links: string[] = [];

  await page.goto(urlPage);

  page.on("response", async (response) => {
    const urlResponse = response.url();

    if (urlResponse.includes("listugcposts")) {
      links.push(urlResponse);
    }
  });

  const nameBusiness = await page.$eval("h1", (item) => item.textContent);
  await page.waitForNavigation();
  await page.click("[jslog^='145620']");
  await page.waitForNavigation();

  await page.click("[jslog^='59550']");
  await page.waitForSelector("#action-menu");
  await page.click("[vet^='25740']");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await page.evaluate(() => {
    const reviews = document.querySelector("[jslog^='26354']") as HTMLElement;
    if (reviews) reviews.scrollTo(0, reviews.scrollHeight + 5000);
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.evaluate(() => {
    const reviews = document.querySelector("[jslog^='26354']") as HTMLElement;
    if (reviews) reviews.scrollTo(0, reviews.scrollHeight + 5000);
  });

  let selectItem = "";

  if (links) {
    if (links.length > 1) {
      selectItem = links[1];
    } else {
      selectItem = links[0];
    }
  }
  await page.close();

  return {
    id: "123333",
    nameBusiness,
    addressMap: urlPage,
    addressReview: selectItem,
  };
}
