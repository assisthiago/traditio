import axiosInstance from "@/api/instance";

const ENDPOINT = '/additional-categories';

function getAdditionalCategories({ id = null, query = {} }) {
  let endpoint = ENDPOINT;
  endpoint += id !== null ? `/${id}/` : '/';
  return axiosInstance.get(endpoint, { params: { ...query, } })
};

export {
  getAdditionalCategories
}
