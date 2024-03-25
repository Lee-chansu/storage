import styles from "./MbtiSelect.module.css";

const optionGroups = [[
   { value: "E", label: "외향형" }, { value: "I", label: "내향형" },],
  [{ value: "S", label: "감각형" }, { value: "N", label: "직관형" },],
  [{ value: "T", label: "사고형" }, { value: "F", label: "감정형" },],
  [{ value: "J", label: "판단형" }, { value: "P", label: "인식형" },],
];

function MBTIOption({ selected, label, value, onClick }) {
  // {fontWeight : 'bold'}

  const className = `${styles.mbtiOption} ${selected ? styles.selected : ""}`;

  return (
    <div className={className} onClick={onClick}>
      <span className={className} onClick={onClick}>
        {value}
      </span>
      {label}
    </div>
  );
}

function MBTIOptionGroup({ options, value, onChange }) {
  return (
    <div>
      {options.map(option => {
        return (
          <MBTIOption
            key={option.value}
            selected={option.value === value}
            label={option.label}
            value={option.value}
            onClick={() => onChange(option.value)}
          />
        );
      })}
    </div>
  );
}

export default function MBTISelect({ value = "ESTJ", onChange }) {
  function handleChangeAt(val, position) {
    const nextValue =
      value.slice(0, position) + val + value.slice(position + 1);
    onChange(nextValue);
  }

  return (
    <div>
      {optionGroups.map((options, index) => (
        <MBTIOptionGroup
          key={`${options[0].value}-${options[1].value}`}
          value={value[index]}
          options={options}
          onChange={val => handleChangeAt(val, index)}
        />
      ))}
    </div>
  );
}
