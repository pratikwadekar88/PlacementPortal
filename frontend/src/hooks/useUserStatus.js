import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../redux/store";
import { userAction } from "../redux/user/userState";
import { getUserStatus } from "../services/user.services";
import React from "react";

const useUserStatus = () => {
  const dispatch = useAppDispatch();

  // const { isLoading, isError } = useQuery(["user-status"], async () => {
  //   const data = await getUserStatus();

  //   if (data.isLoggedIn && data.user) {
  //     dispatch(userAction.loginUser({ user: data.user }));
  //   } else {
  //     dispatch(userAction.logout());
  //   }

  //   return data;
  // });
  const { isLoading, isError } = useQuery({
    queryKey: ["user-status"],
    queryFn: async () => {
      const data = await getUserStatus();

      if (data.isLoggedIn && data.user) {
        dispatch(userAction.loginUser({ user: data.user }));
      } else {
        dispatch(userAction.logout());
      }

      return data;
    },
  });

  return { isLoading, isError };
};

export default useUserStatus;
