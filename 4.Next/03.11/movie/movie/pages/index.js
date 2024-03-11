import Link from "next/link";
import SearchForm from "../components/searchForm";
import Styles from "@/Styles/Home.module.css";

export default function Home() {
  return (
    <>
      <h1>영화리스트</h1>
      <p>
        <Link href="/settings">설정</Link>
      </p>
      <SearchForm />
      <ul>
        <li>
          <Link href="/movies/1">영화제목1</Link>
        </li>
        <li>
          <Link href="/movies/2">영화제목2</Link>
        </li>
        <li>
          <Link href="/movies/3">영화제목3</Link>
        </li>
      </ul>
    </>
  );
}
