import axiosInstance from "../../utils/axiosInstance";

//get teammembers
export const getTeam = async () => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "get",
    url: `/users/team`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

// create new teammember
export const createNewTeammember = async (data: any) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "post",
    url: `/users/team/new`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const getOneTeammember = async (id: string) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "get",
    url: `/users/team/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

export const updateTeammember = async (data: any) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "put",
    url: `/users/team/update/${data._id}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

// archive member
export const archiveTeammember = async (id: string) => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "put",
    url: `/users/team/archive/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};
