import axiosInstance from "@/api/instance";

const ENDPOINT = '/product-categories';

function getProductCategories(id = null, query = {}) {
  let endpoint = ENDPOINT;
  endpoint += id !== null ? `/${id}/` : '/';
  return axiosInstance.get(endpoint, { params: { ...query, } })
};

export {
  getProductCategories
}
