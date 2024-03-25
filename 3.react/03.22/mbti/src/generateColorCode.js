
function generateHex(){
  let num = Math.floor(Math.random() * 256);
  let hex = num.toString(16).padStart(2, '0').toUpperCase();

  return hex;
}

export default function generateColorCode(){
  const colorCode = `#${generateHex()}${generateHex()}${generateHex()}`
  return colorCode;
}


