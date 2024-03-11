import { useRouter } from "next/router";

export default function Movie() {
  const router = useRouter();
  const { q } = router.query;
  return (
    <>
      <h1>Movie 상세페이지</h1>
      <p>{q}번째 movie</p>
    </>
  );
}
