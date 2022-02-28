import axiosInstance from "../../utils/axiosInstance";

//load user
export const loadUser = async () => {
  let token = localStorage.getItem("token");
  return await axiosInstance({
    method: "get",
    url: `/auth/profile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res: any) => res.data);
};

//load user
// export const loadUserFirstLogin = async (token: string, push: (x: string) => void) => {
//     localStorage.setItem("token", token)
//     return await axiosInstance({
//       method: "get",
//       url: `/auth/profile`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res: any) => {
//       if(res.data.first_login){
//         push("/bienvenue")
//       } else {
//         push("/tableau-de-bord")
//       }
//     return res.data
//     });
// };

// Login user
export const loginUser = async (data: { email: string; password: string }) => {
  return await axiosInstance({
    method: "post",
    url: `/auth/login`,
    data,
  }).then((res: any) => res.data);
};

// Register user
export const registerUser = async (data: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
}) => {
  return await axiosInstance({
    method: "post",
    url: `/auth/register`,
    data,
  }).then((res: any) => res.data);
};

// Register user
// export const verifyEmail = async (verification_token: string) => {
//   let token = localStorage.getItem("token");
//   return await axiosInstance({
//     method: "get",
//     url: `/auth/verify?token=${verification_token}`,
//     headers:{
//       Authorization: `Bearer ${token}`
//     }
//   }).then((res: any) => res.data);
// };
// // Register user
// export const sendVerifyEmail = async () => {
//   let token = localStorage.getItem("token");
//   return await axiosInstance({
//     method: "get",
//     url: `/auth/send-verify-link`,
//     headers:{
//       Authorization: `Bearer ${token}`
//     }
//   }).then((res: any) => res.data);
// };

// // enter email to reset password
// export const sendResetPwdEmail = async (email: string) => {
//   return await axiosInstance({
//     method: "post",
//     url: `/auth/reset-email`,
//     data: {email}
//   }).then((res: any) => res.data);
// };

// // reset password
// export const resetPassword = async (data: {token: string, password: string}) => {
//   return await axiosInstance({
//     method: "post",
//     url: `/auth/reset-password`,
//     data,
//   }).then((res: any) => res.data);
// };

// Logout User
export const logout = (push: (path: string) => void) => {
  localStorage.removeItem("token");
  push("/");
  loadUser()
};

// export const saveExtraInfo = async (data: any) => {
//   let token = localStorage.getItem("token");
//   return await axiosInstance({
//     method: "put",
//     url: `/auth/extra-info`,
//     data,
//     headers:{
//       Authorization: `Bearer ${token}`
//     }
//   }).then((res: any) => res.data);
// }
