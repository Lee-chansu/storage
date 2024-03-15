export default function formatedDate(timestamp){
    const date = new Date(timestamp)
    return date.toLocaleDateString("ko-KR")
}