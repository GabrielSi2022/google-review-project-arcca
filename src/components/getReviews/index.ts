import axios from "axios";

async function fetchReviews(storeNumber: number): Promise<any[]> {
  const query = findQueryByStoreNumber(storeNumber);
  let paginationToken: any = null;
  let responsesList: any[] = [];
  let response: any;
  let structuredResponse: any[] = [];
  const reviews: any[] = [];

  let maxPages = 3;
  do {
    const paginatedQuery = insertStringIntoString(query, paginationToken);
    try {
      response = await axios.get(paginatedQuery);
      structuredResponse = parseResponse(response.data);
      if (structuredResponse.length < 1) break;
      responsesList.push(structuredResponse);
      paginationToken = structuredResponse[1];
      maxPages--;
    } catch (error) {
      console.error("Erro ao buscar reviews:", error);
      break;
    }
  } while (maxPages > 0 && paginationToken !== null);

  for (const responseUnit of responsesList) {
    const reviewArray = responseUnit[2];
    for (const reviewUnit of reviewArray) {
      const review = {
        classification: reviewUnit[0][2][0][0],
        text: reviewUnit[0][2][15]
          ? reviewUnit[0][2][15][0][0].replace(/\n$/g, "").replace(/\n/g, " ")
          : null,
        answer: reviewUnit[0][3][14]
          ? reviewUnit[0][3][14][0][0].replace(/\n$/g, "").replace(/\n/g, " ")
          : null,
      };
      reviews.push(review);
    }
  }

  return reviews;
}

function insertStringIntoString(
  originalString: string,
  insertedString: string | null
): string {
  if (insertedString !== null && insertedString !== undefined) {
    const index = originalString.indexOf("!2s") + 3;
    return (
      originalString.slice(0, index) +
      insertedString +
      originalString.slice(index)
    );
  } else {
    return originalString;
  }
}

function parseResponse(jsonString: string): any[] {
  const cleanedJson = jsonString.replace(/^\)\]\}\'/, "");
  return JSON.parse(cleanedJson);
}

function findQueryByStoreNumber(storeNumber: number): string {
  const storeUrls: Record<number, string> = {
    0: "https://www.google.com/maps/rpc/listugcposts?authuser=0&hl=en&gl=br&pb=!1m7!1s0x74fd59ec2fcc94d%3A0x3e3a1e157cd365d4!3s!6m4!4m1!1e1!4m1!1e3!2m2!1i10!2s!5m2!1s7MnvZeKSBtGU5OUP7sK5sA0!7e81!8m5!1b1!2b1!3b1!5b1!7b1!11m6!1e3!2e1!3sen!4sbr!6m1!1i2!13m1!1e2",
    1: "https://www.google.com/maps/rpc/listugcposts?authuser=0&hl=en&gl=br&pb=!1m7!1s0x9bd5b81cec9b05%3A0xc9b595f28b3ca216!3s!6m4!4m1!1e1!4m1!1e3!2m2!1i10!2s!5m2!1snLfvZYyyCoHS1sQPxZSTiAw!7e81!8m5!1b1!2b1!3b1!5b1!7b1!11m6!1e3!2e1!3sen!4sbr!6m1!1i2!13m1!1e2",
  };

  return storeUrls[storeNumber] || "";
}

async function postReviews(reviews: any[]) {
  try {
    // Faz uma solicitação POST para enviar as revisões coletadas para o servidor
    const response = await axios.post(
      "http://localhost:3000/reviews/create",
      reviews
    );
    console.log("Resposta do servidor:", response.data);
  } catch (error) {
    console.error("Erro ao enviar revisões para o servidor:", error);
  }
}

async function main() {
  const storeNumber = 0; // Número da loja desejada
  const reviews = await fetchReviews(storeNumber);

  console.log(reviews);
  for (const review of reviews) {
    await postReviews(review);
  }
}

main();
