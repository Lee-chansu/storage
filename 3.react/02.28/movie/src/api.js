export async function getReviews(){
  const res = await fetch('http://learn.codeit.kr/api/film-reviews')
  const body = await res.json()
  return body
}

//export default getReviews