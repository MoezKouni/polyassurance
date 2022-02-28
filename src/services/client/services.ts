import axiosInstance from "../../utils/axiosInstance";

//get clients
export const getClients = async () => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "get",
    url: `/users/client`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const getOneClient = async (id: string) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "get",
    url: `/users/client/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const createClient = async (data: any) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "post",
    url: `/users/client/new`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const updateClient = async (data: any) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "put",
    url: `/users/client/update/${data._id}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const getRecentClients = async () => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "get",
    url: `/users/client/recent/signups`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const archiveClient = async (id: string) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "put",
    url: `/users/client/archive/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};
