export const getDotSeparatedDate = (datetime: number) => {
  const date = new Date(datetime);
  return date.toLocaleString("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const getTime = (datetime: number) => {
  const date = new Date(datetime);
  return date.toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  });
};
