export const sliceText = (text: string, length: number = 100) => {
  let sliced = text.slice(0, length);
  if (sliced.length < text.length) {
    sliced += "...";
  }
  return sliced;
};
