const parseXml = (data) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(data, 'application/xml').documentElement;
  return parsedData;
};

export default parseXml;
