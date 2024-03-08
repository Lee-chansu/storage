function LocaleSelect({value, setLocale}) {
  const handleChange = e => setLocale(e.target.value);

  return (
    <select value={value} onChange={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}

export default LocaleSelect;
