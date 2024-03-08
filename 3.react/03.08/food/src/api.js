
const BASE_URL = 'https://learn.codeit.kr/api';

export async function getReviews({order='createdAt', offset=0, limit=10 }){
  
  const query = `order=${order}&offset=${offset}&limit=${limit}`
  const fetchUrl = `${BASE_URL}/film-reviews?${query}`

  const response = await fetch(fetchUrl);
  if(!response.ok){
    throw new Error('리뷰 불러오기 실패')
  }
  const body = await response.json();
  //console.log(fetchUrl)
  return body;
}

export async function createReview(formData) {
  const response = await fetch(`${BASE_URL}/film-reviews`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('리뷰 생성 실패');
  }
  const body = await response.json();
  return body;
}

export async function updateReview(id, formData) {
  const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('리뷰 수정 실패.');
  }
  const body = await response.json();
  return body;
}

export async function deleteReview(id){
  const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('리뷰 삭제 실패.');
  }
  const body = await response.json();
  return body;
}