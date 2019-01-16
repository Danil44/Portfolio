export const set = value => {
  localStorage.setItem("chart-item", JSON.stringify(value));
};

export const get = () => {
  const data = localStorage.getItem("chart-item");
  return data ? JSON.parse(data) : null;
};
