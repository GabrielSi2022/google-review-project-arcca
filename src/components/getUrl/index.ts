import puppeteer, { Page } from "puppeteer";

async function getUrl(urlPage: string) {
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

  const title = await page.$eval("h1", (item) => item.textContent);
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
    title,
    url: urlPage,
    link: selectItem,
  };
}
const urlPage =
  "https://www.google.com/maps/place/Nema+-+Visconde+de+Piraj%C3%A1+%7C+Padaria+de+Fermenta%C3%A7%C3%A3o+Natural/@-22.9841517,-43.2154292,17z/data=!3m2!4b1!5s0x9bd50757e02857:0x35aa6a9b37f5d532!4m6!3m5!1s0x9bd58a0cdc1487:0x4c1eb56d62eb469b!8m2!3d-22.9841517!4d-43.2128543!16s%2Fg%2F11j20tdp78?entry=ttu";

getUrl(urlPage);
