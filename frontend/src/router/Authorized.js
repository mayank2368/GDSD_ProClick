/*
 * Contributor:  Tarmah Bin Iqbal
 */

import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../redux/slices/auth";
import { selectUserRole } from "../redux/slices/auth";
import { renderDashboards } from "../utils";

export const Authorized = ({ component: RouteComponent, Role: Role }) => {
  const { isLoggedIn } = useSelector(selectUser);
  const role = useSelector(selectUserRole);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate(`/signin`);
    else if (Role && Role != role) navigate(renderDashboards(role));
  }, [isLoggedIn, role]);

  return <RouteComponent />;
};
