const handlePhone = (zoneCode: string, number: string) => {
  console.log("zone", zoneCode);
  console.log("number", number);
  return zoneCode + number;
};

export { handlePhone };
