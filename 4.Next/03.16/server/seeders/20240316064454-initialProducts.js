"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: 9,
          name: "화이트 코드잇 스웨트셔츠",
          englishName: "White Codeit Sweatshirt",
          brand: "코드잇",
          productCode: "PK3434",
          price: 31900,
          salePrice: 26900,
          starRating: 4,
          starRatingCount: 1345,
          likeCount: 17,
          point: 1614,
          imgUrl:
            "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codeitmall/product-09.png",
        },
        {
          id: 8,
          name: "아이보리 코드잇 후디 스웨트셔츠",
          englishName: "Ivory Codeit Hooded Sweatshirt",
          brand: "코드잇",
          productCode: "ZW5516",
          price: 42900,
          salePrice: 36900,
          starRating: 4.3,
          starRatingCount: 1590,
          likeCount: 213,
          point: 2214,
          imgUrl:
            "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codeitmall/product-08.png",
        },
        {
          id: 7,
          name: "핑크 코드잇 티셔츠",
          englishName: "Pink Codeit T-Shirt",
          brand: "코드잇",
          productCode: "HU7051",
          price: 15900,
          salePrice: 14290,
          starRating: 3.1,
          starRatingCount: 1330,
          likeCount: 87,
          point: 858,
          imgUrl:
            "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codeitmall/product-07.png",
        },
        {
          id: 6,
          name: "다크 그레이 코드잇 후디 스웨트셔츠",
          englishName: "Dark Gray Codeit Sweatshirt",
          brand: "코드잇",
          productCode: "ZS9499",
          price: 42900,
          salePrice: 36900,
          starRating: 4.4,
          starRatingCount: 1408,
          likeCount: 221,
          point: 2214,
          imgUrl:
            "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codeitmall/product-06.png",
        },
        {
          id: 5,
          name: "옐로우 코드잇 스웨트셔츠",
          englishName: "Yellow Codeit Sweatshirt",
          brand: "코드잇",
          productCode: "QK2266",
          price: 31900,
          salePrice: 26900,
          starRating: 4,
          starRatingCount: 1687,
          likeCount: 153,
          point: 1614,
          imgUrl:
            "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codeitmall/product-05.png",
        },
        {
          id: 4,
          name: "그린 코드잇 스웨트셔츠",
          englishName: "Green Codeit Sweatshirt",
          brand: "코드잇",
          productCode: "BN3024",
          price: 31900,
          salePrice: 26900,
          starRating: 4.6,
          starRatingCount: 1373,
          likeCount: 78,
          point: 1614,
          imgUrl:
            "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codeitmall/product-04.png",
        },
        {
          id: 3,
          name: "퍼플 코드잇 후디 스웨트셔츠",
          englishName: "Purple Codeit Hooded Sweatshirt",
          brand: "코드잇",
          productCode: "VW0589",
          price: 42900,
          salePrice: 36900,
          starRating: 3.4,
          starRatingCount: 1515,
          likeCount: 72,
          point: 2214,
          imgUrl:
            "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codeitmall/product-03.png",
        },
        {
          id: 2,
          name: "라임 코드잇 후디 스웨트셔츠",
          englishName: "Lime Codeit Hooded Sweatshirt",
          brand: "코드잇",
          productCode: "HG1015",
          price: 42900,
          salePrice: 36900,
          starRating: 3.5,
          starRatingCount: 1782,
          likeCount: 224,
          point: 2214,
          imgUrl:
            "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codeitmall/product-02.png",
        },
        {
          id: 1,
          name: "그린 코드잇 티셔츠",
          englishName: "Green Codeit T-Shirt",
          brand: "코드잇",
          productCode: "WB7219",
          price: 15900,
          salePrice: 14290,
          starRating: 4.9,
          starRatingCount: 1003,
          likeCount: 225,
          point: 858,
          imgUrl:
            "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codeitmall/product-01.png",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
