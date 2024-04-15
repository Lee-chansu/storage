// 클라이언트에서 서버로 요청보내는 fetch를 작성

const BASE_URL = "http://localhost:4000/";

export async function updatePost(id, formData) {
  const response = await fetch(`${BASE_URL}/edit/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("수정 실패");
  }
  const body = await response.json();
  return body;
}

export async function deletePost(id) {
  const response = await fetch(`${BASE_URL}/edit${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("삭제 실패");
  }
  const body = await response.json();
  return body;
}
