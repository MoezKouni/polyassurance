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

export const getAllDemandes = async () => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "get",
    url: `/demandes/all`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const getRecentDemandes = async () => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "get",
    url: `/demandes/recent`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const getOneDemande = async (id: string) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "get",
    url: `/demandes/demande/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const changeStatusDemande = async (data: any) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "put",
    url: `/demandes/status/${data.id}`,
    data: { status: data.status },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const getDemandesByUser = async (id: string) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "get",
    url: `/demandes/user/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};
