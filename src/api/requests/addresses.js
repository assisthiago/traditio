import axiosInstance from "@/api/instance";

const ENDPOINT = '/addresses';

export const getZipCode = (code) => {
  let endpoint = `${ENDPOINT}/zip-code/${code}/`;
  return axiosInstance.get(endpoint)
};
