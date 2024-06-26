import axios from "axios";
import { Reviews } from "../../entities/reviews";
import { Business } from "../../entities/business";
import { ListOutputDtoBusiness } from "../../services/business/business.service";
import { CreateOutputDtoReviews } from "../../services/reviews/reviews.service";

async function fetchReviews(url: string): Promise<any[]> {
  let paginationToken: any = null;
  let responsesList: any[] = [];
  let response: any;
  let structuredResponse: any[] = [];
  const reviews: any[] = [];

  do {
    const paginatedQuery = insertTokenIntoQuery(url, paginationToken);
    try {
      response = await axios.get(paginatedQuery);
      structuredResponse = parseResponse(response.data);
      if (structuredResponse.length < 1) break;
      responsesList.push(structuredResponse);
      paginationToken = structuredResponse[1];
    } catch (error) {
      console.error("Erro ao buscar reviews:", error);
      break;
    }
  } while (paginationToken !== null);

  for (const responseUnit of responsesList) {
    const reviewArray = responseUnit[2];
    for (const reviewUnit of reviewArray) {
      const review = {
        reviewsId: reviewUnit[0][0],
        classification: reviewUnit[0][2][0][0],
        userId: reviewUnit[0][1][4][0][13],
        userName: reviewUnit[0][1][4][0][4],
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

function insertTokenIntoQuery(
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

async function getBusiness() {
  try {
    const {
      data,
    }: {
      data: { business: { props: { id: string; addressReview: string } }[] };
    } = await axios.get("http://localhost:3000/business");

    const { business } = data;

    const urls = business.map(({ props }) => {
      return {
        id: props.id,
        url: props.addressReview,
      };
    });

    return urls;
  } catch (error) {
    console.error("Erro ao listar as empresas:", error);
  }
}

async function postReviews(reviewsItens: Reviews, businessId: string) {
  try {
    // Faz uma solicitação POST para enviar as revisões coletadas para o servidor
    const { data } = await axios.post("http://localhost:3000/reviews/create", {
      ...reviewsItens,
      businessId,
    });

    const { reviews } = data as CreateOutputDtoReviews;

    return reviews;
  } catch (error) {
    console.error("Erro ao enviar revisões para o servidor:", error);
  }
}

export async function getReviews() {
  const businessUrls = await getBusiness();

  let total = 0;

  if (businessUrls) {
    await Promise.all(
      businessUrls.map(async (item) => {
        const reviewsUrl = await fetchReviews(item.url);
        for (const review of reviewsUrl) {
          await postReviews(review, item.id);
          total++;
        }
      })
    );
  }

  return { total };
}
