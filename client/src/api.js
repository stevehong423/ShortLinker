export const getUrls = () =>
  fetch("http://localhost:5000").then((res) => res.json());
