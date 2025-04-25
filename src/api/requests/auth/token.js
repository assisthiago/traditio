import axiosInstance from "@/api/instance";

const ENDPOINT = '/auth/token';

export const postLogin = (data) => {
  let endpoint = `${ENDPOINT}/login/`;
  return axiosInstance.post(endpoint, data);
};

export const postLogout = () => {
  let endpoint = `${ENDPOINT}/logout/`;
  return axiosInstance.post(endpoint);
};
