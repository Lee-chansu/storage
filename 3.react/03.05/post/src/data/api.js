async function getPost({offset=0, limit=3}){
    const query = `?offset=${offset}&limit=${limit}`
    // server에서 해당 url로 접속하면 데이터를 send해주도록 설정. json 파일
    const dataUrl = `http://localhost:4000/page${query}`
    const res = await fetch(dataUrl);
    const body = await res.json();
    return body
};

async function postPost(title, content){
    // server에서 해당 url로 접속하면 데이터를 send해주도록 설정. json 파일
    const dataUrl = 'http://localhost:4000/add'
    const data = {title, content}
    const body = JSON.stringify(data);
    const res = await fetch(dataUrl, {method : "post", body, headers : {'Content-Type' : 'application/json'}});
};

module.exports = {getPost, postPost}