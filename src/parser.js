const parseXml = (data) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(data, 'application/xml').documentElement;
  if (parsedData.querySelector('parsererror')) {
    console.log('d');
    return new Error();
  }
  return parsedData;
};

export default parseXml;
