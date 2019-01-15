import axios from "axios";
const API_KEY = "5c114c40864415f64af8aa59512d57e54425cd8c989f2";
export const fetchURLPreview = userLink => {
  return axios
    .get(`https://api.linkpreview.net/?key=${API_KEY}&q=https://${userLink}`)
    .then(response => {
      const previewData = {
        title: response.data.title,
        description: response.data.description,
        image: response.data.image,
        url: response.data.url
      };
      return previewData;
    })
    .catch(err => console.log("Fetch error: " + err));
};
