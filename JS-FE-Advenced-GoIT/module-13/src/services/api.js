import axios from "axios";
import v4 from "uuid/v4";
const API_KEY = "5c114c40864415f64af8aa59512d57e54425cd8c989f2";
export const fetchURLPreview = userLink => {
  return axios
    .get(`https://api.linkpreview.net/?key=${API_KEY}&q=https://${userLink}`)
    .then(response => {
      const previewData = {
        id: v4(),
        title: response.data.title,
        description: response.data.description,
        image: response.data.image,
        url: response.data.url
      };
      console.log('API response: ', response)
      return previewData;
    })
    .catch(err => console.log("Fetch error: " + err));
};
