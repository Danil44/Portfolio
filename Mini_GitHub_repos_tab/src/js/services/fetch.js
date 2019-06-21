import axios from "axios";

const url = name => ({
  owner: `https://api.github.com/users/${name}/repos`
});

const paginate = (page = 1) => ({
  next: `?page=${page}&per_page=12`
});

const mapper = data => {
  return data.map(
    ({
      name,
      description,
      fork,
      stargazers_count: stars,
      updated_at: updatedDate,
      language,
      owner,
      html_url: repoUrl
    }) => ({
      name,
      description,
      fork,
      stars,
      updatedDate,
      language,
      owner,
      repoUrl
    })
  );
};

export const fetchRepos = (name, page) => {
  return axios
    .get(url(name).owner + paginate(page).next)
    .then(({ data }) => mapper(data))
    .catch(err => console.log(err));
};
