const BaseUrl = "https://learn.codeit.kr/api";

export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 10,
}) {
  const query = `?order=${order}&offset=${offset}&limit=${limit}`;
  const fetchUrl = `${BaseUrl}/film-reviews${query}`;

  const response = await fetch(fetchUrl);
  if (!response.ok) {
    throw new Error("리뷰 불러오기 실패");
  }

  const body = response.json();
  return body;
}
