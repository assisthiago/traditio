import axiosInstance from "@/api/instance";

const ENDPOINT = '/products';

function getProducts(id = null, query = {}) {
  let endpoint = ENDPOINT;
  endpoint += id !== null ? `/${id}/` : '/';
  return axiosInstance.get(endpoint, { params: { ...query, } })
};

export {
  getProducts
}
