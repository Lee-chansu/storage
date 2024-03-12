export default function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString('ko-KR');
}
