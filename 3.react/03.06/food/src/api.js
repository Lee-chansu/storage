export async function getReviews(){
    const response = await fetch('https://learn.codeit.kr/api/film-reviews');
    const body = await response.json();
    return body;
}