// import axios, { AxiosResponse } from "axios";
// import { Reviews } from "../../entities/reviews";

// interface Review {
//   classification: number;
//   userId: string;
//   userName: string;
//   text: string | null;
//   answer: string | null;
// }

// async function fetchReviews(storeIdentifier: number): Promise<Review[]> {
//   const query = findQueryByStoreIdentifier(storeIdentifier);
//   let paginationToken: string | null = null;
//   const reviews: Review[] = [];

//   try {
//     let remainingPages = 3;
//     do {
//       const paginatedQuery = insertTokenIntoQuery(query, paginationToken);
//       const response = await axios.get(paginatedQuery);
//       const structuredResponse = parseResponse(response.data);
//       if (structuredResponse.length === 0) break;
//       reviews.push(...extractReviews(structuredResponse));
//       paginationToken =
//         structuredResponse[structuredResponse.length - 1].paginationToken;
//       remainingPages--;
//     } while (remainingPages > 0 && paginationToken !== null);

//     return reviews;
//   } catch (error) {
//     console.error("Erro ao buscar reviews:", error);
//     return [];
//   }
// }

// function insertTokenIntoQuery(
//   originalQuery: string,
//   token: string | null
// ): string {
//   return token ? originalQuery.replace(/(!2s)/, `$1${token}`) : originalQuery;
// }

// function parseResponse(response: any): any[] {
//   const cleanedJson = response.replace(/^\)\]\}\'/, "");
//   return JSON.parse(cleanedJson);
// }

// function extractReviews(response: any[]): Review[] {
//   const reviews: Review[] = [];
//   for (const responseUnit of response) {
//     const reviewArray = responseUnit[2];
//     for (const reviewUnit of reviewArray) {
//       const [classificationData, userData, textData, answerData] = reviewUnit;
//       const review: Review = {
//         classification: classificationData[0][2][0][0],
//         userId: userData[0][1][4][0][13],
//         userName: userData[0][1][4][0][4],
//         text:
//           textData?.[0]?.[0]?.replace(/\n$/g, "").replace(/\n/g, " ") || null,
//         answer:
//           answerData?.[0]?.[0]?.replace(/\n$/g, "").replace(/\n/g, " ") || null,
//       };
//       reviews.push(review);
//     }
//   }
//   return reviews;
// }

// function findQueryByStoreIdentifier(storeIdentifier: number): string {
//   const storeUrls: Record<number, string> = {
//     0: "https://www.google.com.br/maps/rpc/listugcposts?authuser=0&hl=pt-BR&gl=br&pb=!1m8!1s0x94b64399cc827d1d%3A0xcfd43c9cb0e9088c!3s!6m4!4m1!1e1!4m1!1e3!9b0!2m2!1i10!2sCAESdkNBRVFGQnBTUTJkblNVRm9TVUZIUVVWcFFVRnZlRU5CUlZOTFVXOUxRVVF0WDNremIxbEpabDlmWDNoSlVVMURjbU5GU0RVMU9EWkhlbU5JVDFkQlFVRkJRVUp2U2w5bGRWRkJiMWxGYmxOMWFVZEJRV2xCUVE%3D!5m2!1soMA4ZryrBdHe1sQPiJ6PiA0!7e81!8m5!1b1!2b1!3b1!5b1!7b1!11m6!1e3!2e1!3spt-BR!4sbr!6m1!1i2!13m1!1e1",
//     1: "https://www.google.com/maps/rpc/listugcposts?authuser=0&hl=en&gl=br&pb=!1m7!1s0x9bd5b81cec9b05%3A0xc9b595f28b3ca216!3s!6m4!4m1!1e1!4m1!1e3!2m2!1i10!2s!5m2!1snLfvZYyyCoHS1sQPxZSTiAw!7e81!8m5!1b1!2b1!3b1!5b1!7b1!11m6!1e3!2e1!3sen!4sbr!6m1!1i2!13m1!1e2",
//   };

//   return storeUrls[storeIdentifier] || "";
// }

// async function main() {
//   const storeIdentifier = 1; // Número da loja desejada
//   const reviews = await fetchReviews(storeIdentifier);

//   console.log(reviews);
// }

// main();
