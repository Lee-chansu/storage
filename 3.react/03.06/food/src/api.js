export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 10,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/api/film-reviews?${query}`
  );
  const body = await response.json();
  return body;
}

export async function postReviews() {
  
}
