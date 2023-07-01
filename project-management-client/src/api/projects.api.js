import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

const setAuthorizationHeaders = () => {
  // set JWT token in the headers for every request in this file
  axios.interceptors.request.use(config => {
    // retrieve the JWT token from the local storage
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      config.headers = { Authorization: `Bearer ${storedToken}` };
    }

    return config;
  });
};

setAuthorizationHeaders();

// self calling function
// (() => {
//   // set JWT token in the headers for every request in this file
//   axios.interceptors.request.use(config => {
//     // retrieve the JWT token from the local storage
//     const storedToken = localStorage.getItem('authToken');

//     if (storedToken) {
//       config.headers = { Authorization: `Bearer ${storedToken}` };
//     }

//     return config;
//   });
// })();

export const getAllProjects = () => {
  return axios.get(`${baseURL}/projects`);
};

export const getProject = id => {
  return axios.get(`${baseURL}/projects/${id}`);
};

export const addProject = project => {
  return axios.post(`${baseURL}/projects`, project);
};

export const updateProject = updatedProject => {
  return axios.put(`${baseURL}/projects/${updatedProject._id}`, updatedProject);
};

export const deleteProject = id => {
  return axios.delete(`${baseURL}/projects/${id}`);
};

export const addTask = task => {
  return axios.post(`${baseURL}/tasks`, task);
};

export const upload = uploadData => {
  return axios.post(`${baseURL}/upload`, uploadData);
};
