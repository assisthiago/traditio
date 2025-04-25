import axiosInstance from "@/api/instance";

const ENDPOINT = '/auth/users';

export const postUsers = (data) => {
  let endpoint = `${ENDPOINT}/`;
  return axiosInstance.post(endpoint, data)
};
