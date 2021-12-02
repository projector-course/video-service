/* strValue: string | undefined */
function strToInteger(strValue) {
  const number = Number(strValue);
  const integer = parseInt(strValue, 10);
  return number === integer ? number : undefined;
}

module.exports = { strToInteger };
