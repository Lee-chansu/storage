const BASE_URL = "https://learn.codeit.kr/api";
export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 10,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const fetchURL = `${BASE_URL}/film-reviews?${query}`;
  const response = await fetch(fetchURL);
  const body = await response.json();
  return body;
}

export async function createReview(formData) {
  const response = await fetch(`${BASE_URL}/film-reviews`, {
    mehtod: "POST",
    body: formData,
  });
  if (!response) {
    throw new Error("리뷰를 생성 실패ㅋㅋ");
  }
  const body = await response.json();
  return body;
}
