export const set = value => {
  localStorage.setItem("url-note", JSON.stringify(value));
};
export const get = () => {
  const data = localStorage.getItem("url-note");
  return data ? JSON.parse(data) : null;
};
