import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAction } from "../../redux/user/userState";
import { logoutUser } from "../../services/user.services";
import React from "react";

function LogoutButton({ className, children, onClickCallback }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // const { mutate, isLoading } = useMutation({
  //   mutationFn: () => logoutUser(),
  //   onError: () => {
  //     toast.error('Internal Server Error');
  //   },
  //   onSuccess: () => {
  //     // queryClient.refetchQueries(['user-status']);
  //     // dispatch(userAction.logout());
  //     onClickCallback();
  //     navigate('/');
  //   },
  // });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("status");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <button
      type="button"
      className={`${className}`}
      // disabled={isLoading}
      // onClick={() => mutate()}
      onClick={() => handleLogout()}
    >
      {children}
    </button>
  );
}

export default LogoutButton;
