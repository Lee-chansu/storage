import { useRouter } from "next/router";

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <h1>Movie 상세페이지</h1>
      <p>{id}번째 movie</p>
    </>
  );
}
