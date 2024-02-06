const { request } = require("express");

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res =>res.text())
    .then(result => {
        const user = JSON.parse(result); //JSON 데이터를 JavaScript 객체로 바꿔주는 역할
        console.log(user.length)
        user.forEach(el => {
            console.log(el)
        });
    })

// 어떤 사용자들의 정보를 json형태의 파일로 가져온 것
/*
    JavaScript Object Notation의 약자
    - 자바스크립트 문법과 거의 비슷하다.
    - 데이터 베이스로도 활용이 가능하다.
    - JSON은 자바스크립트로부터 비롯된 데이터 포맷이지만,
    그 탄생 목적은 언어나 환경에 종속되지 않고,
    언제 어디서든 사용할 수 있는 데이터 포맷이 되는 것.

    다른 점
    - 모든 값도 ""(쌍따옴표)로 묶어준다.
    -프로퍼티(key) : "" 묶어주기
    - 객체의 요소로 메서드/함수 들어갈 수 없다.
    - json에서 표현할 수 없는 값 - undefined, NaN, Infinity 사용x 
    - 주석 추가 불가능
    참고 내용
    
*/

/*
요청 (request) - 메소드(method)
- 데이터 조회 : GET -> GET Request
- 데이터 추가 : POST -> POST Request
- 데이터 수정 : PUT -> PUT Request
- 데이터 조회 : DELETE -> DELETE Request

    보통 - GET(정보요청), DELETE(삭제요청)은 body가 필요 없음 - Head만 사용한다.
    
    Request
    - Head : request에 대한 부가정보
    - Body : 실제 데이터를 담는 부분(객체의 형태)
    
    app.post('/add', (req,res)=>{
        const {name,age} req.body
    })
    
    */
    [{
        "id" : 1,
        "name" : "Leanne"
    }]

/*
    Serializtion (직렬화)
    - 자바스크립트 객체를 string 타입의 JSON데이터로 전환
    - JSON.stringify(객체)

    Deserialization (역직렬화)
    - JSON데이터를 자바스크립트 객체로 변환
    - JSON.parse(json 객체)
*/


    const obj = {x:1, y:2}                  //객체
    const jsonString = JSON.stringify(obj)  //JSON형태의 String(직렬화)
    const obj2 = JSON.parse(jsonString)     //JSON -> object로 (역직렬화)

    // console.log(typeof obj, obj)
    // console.log(typeof jsonString, jsonString)
    // console.log(typeof obj2, obj2)

    // fetch('https://learn.codeit.kr/api/members')
    // .then(res => res.text())
    // .then(result => {
    //     const user = result
    //     console.log(JSON.parse(result))
    // }) 

    
    fetch('https://learn.codeit.kr/api/members')
    .then(res => res.text())
    .then(result => {const user = result}) //생략을 해줘도 자동으로 parse를 해준다.

/*
    상태코드 Status Code
    - 요청과 응답처리에 대한 상태를 숫자코드로 나타내는 것
    - 404 오류 : 해당하는 내용을 찾을 수 없다.

    Status Code는 각각 그에 대응되는 상태메시지(Status Message)를 갖고 있다.
    ex) 200 - Ok
        404 - Not Foud
    
    상태코드는 100~500번까지
    (1) 100번대
    - 서버가 클라리언트 정보성 응답(Informational response)을 줄 때 사용되는 상태 코드
    - 100 Continue :
        클라이언트가 서버에게 계속 request를 보내도 괜찮은지 물어봤을 때,
        계속 request를 보내도 괜찮다고 알려주는 상태코드
        ex) 용량이 큰 파일을 body에 담아 업로드 하려고 할 때, 서버에게 미리 괜찮은지 물어봄.

    - 101 Switching Protocols
        클라이언트가 프로토콜을 바꾸자는 request를 보냈을 때,
        서버가 '그래요, 그 프로토콜로 전환하겠습니다'라는 뜻을 나타낼 때 쓰이는 상태 코드

    (2) 200번대 코드
    클라이언트의 리퀘스트가 성공 처리되었음을 의미
    - 200 ok : 성공적으로 처리 - 포괄적으로 사용됨
    - 201 created : 리퀘스트의 내용대로 리소스가 잘 생성되었다는 뜻
                    POST 리퀘스트가 성공한 경우에 200번 대신 201번이 올 수도 있음
    - 202 Accepted : 리퀘스트의 내용이 잘 접수되었다. 당장 처리X, 언젠가 처리할께!,
                    리퀘스트를 모아서 한번에 실행하는 서버일 경우

    (3) 300번대
    클라이언트의 리퀘스트가 아직 처리되지 않았고,
    리퀘스트 처리를 원하면 클라이언트 측의 추가적ㅇ니 작업이 필요함을 의미
    - 301 Moved Permanently : 리소스 위치 변경되었음
    - 302 Found - 리소스 위치 일시적으로 바뀜
    - 304 Not Modified - 리소스 변경 없음

    (4) 400번대
    리퀘스트를 보내는 클라이언트 쪽에 문제가 있음을 의미
    - 400 Bad Request : 리퀘스트에 문제가 있다. (ex. 문법 오류 등인 경우)
    - 401 Unauthorized : 아직 신원이 확인되지 않은 사용자로부터 리퀘스트를 처리 할 수 없음
    - 403 Forbidden : 사용자의 신원이 확인됨, but 리소스의 접근 권한이 없는 사용자라서 리퀘스트를 할 수 없음
    - 404 Not Found : use1이 나타내는 리소스 찾을 수 없음
    - 413 Payload Too Large
    - 429 Too Many Requests

    (5) 500번대
    서버 쪽의 문제로 인해 리퀘스트를 정상적으로 처리할 수 없음을 의미하는 상태 코드들입니다.
    - 500 Internal Server Error : 현재 알 수 없는 서버 내의 에러로 인해 리퀘스트를 처리할 수 없음
    - 503 Service Unavailable : 현재 서버 점검중이거나, 트래픽 폭주 등으로 인해 서비스를 제공할 수 없음.
*/

/*
    Content-Type 헤더
    - 재 리퀘스트 또는 리스폰스의 바디에 들어 있는 데이터가 어떤 타입인지 알려줌
    1. 주 타입이 text인 경우(텍스트)
    - 일반 텍스트 : text/plain
    - CSS 코드 : text/css
    - HTML 코드 : text/html
    - JavaScript 코드 : text/javascript ...


    2. 주 타입이 image인 경우(이미지)
    - image/bmp : bmp 이미지
    - image/gif : gif 이미지
    - image/png : png 이미지 ...

    3. 주 타입이 audio인 경우(오디오)
    - audio/mp4 : mp4 오디오
    - audio/ogg : ogg 오디오 ...

    4. 주 타입이 video인 경우(비디오)
    - video/mp4 : mp4 비디오
    - video/H264 : H264 비디오 ...

    1~4번에 해당하지 않는 것들 -> application

    5. 주 타입이 application인 경우
    - application/json : JSON 데이터
    - application/octet-stream : 확인되지 않은 바이너리 파일 ...
        - 바이너리 파일 = 0,1로 구성된 파일
            -텍스트 파일이 아닌 것을 바이너리 파일이라고 한다.
            텍스트 변환 x - 비디오, 이미지, 오디오

            png, mp4, .. 이것 이외의 확장자들은
            application/octet-stream을 사용한다.

    Content-Type 헤더는 왜 필요한가?
    - Content-Type 헤더가 존재하면, 바디의 데이터를 직접 호출해서 그 타입을 확인하지 않아도 된다.
        = Content-type만으로 파일 종류를 알 수 있다.
*/

/*
    1) JSON
    {
        "name" : "홍길동",
        "age" : 30
        "hobbies" : ["game", "reading"]

}

    2)XML
    <person>
        <name>홍길동</name>
        <age>30</age>
        <hobbies>
            <value>game</value>
            <value>reading</value>
        </hobbies>
    </person>

    3) Form 태그에서 사용되는 타입들

    <form></form> 사이에 들어가는 값들
    - form 태그를 사용하면 자바스크립트 코드 없이 오로지 html만으로도 리퀘스트 보내는 것 가능

    (1)application/x-www/form-unlencoded 타입

    (쿼리스트링)
    id=6&name=JSON&age=34&department=engineering

    {
        "id" : 6,
        "name" : "JSON",
        "age" : 34,
        "department" : "engineering"
    }

아래와 같은 특수문자들은 URL에서 특별한 용도를 갖고 있는 문자들임
이런 특수문자들이 각자 자신의 원래 용도가 아닌
다른 용도로 사용되는 경우 Percent Encoding 사용
이런 기호들이 URL에서 본래의 용도로 사용되는 게 아니라, 어떤 데이터를 나타내기 위해 사용된다.
왜? Percent Encoding이 필요한가?
    -> 그건 바로 URL에 대한 해석 오류를 방지하기 위해

:	: %3A
/	: %2F
?	: %3F
#	%23
[	%5B
]	%5D
@	%40
!	%21
$	%24
&	%26
(공백) %27
''  %20

(1) 'URL 안에서 미리 정해진 용도를 가진 특수문자를 다른 용도로 사용'
(2) '영어와 숫자'를 제외한 다른 나라 문자를 나타낼 때는 - Percent Encoding 사용한다.

2) multipart/form-data 타입
- 여러종류의 데이터를 하나로 합친 데이터

*/