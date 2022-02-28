import axiosInstance from "../../utils/axiosInstance";

export const getPermissions = async () => {
    let token = localStorage.getItem("token");
    return await axiosInstance({
      method: "get",
      url: `/permission`,
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res: any) => res.data);
};