import Image from "next/image";

export default function Test() {
  return (
    // Image 크기 - 이미지 최적화 때문에 width, height가 필수  (부모요소엔 position 속성 필수)
    // 부모요소를 만들고, 부모요소에 사이즈를 지정하고,
    // Image에 fill, objectFilt : cover 적용
    <div style={{ position: "relative", width: "50%", height: "200px" }}>
      <Image
        fill
        src="/img/product-06.png"
        alt="상품이미지"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
