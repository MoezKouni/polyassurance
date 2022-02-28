import axiosInstance from "../../utils/axiosInstance";

export const createDemande = async (data: any) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "post",
    url: `/demandes/new`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const uploadDocuments = async (data: any) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "post",
    url: `/documents/upload`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};
