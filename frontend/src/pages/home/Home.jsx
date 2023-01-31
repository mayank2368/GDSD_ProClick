/*
 * Contributor:  Tarmah Bin Iqbal
 */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserRole } from "../../redux/slices/auth";
import { renderDashboards } from "../../utils";

function Home() {
  const role = useSelector(selectUserRole);
  let navigate = useNavigate();

  useEffect(() => {
    let newPage = renderDashboards(role);
    if (newPage) navigate(newPage);
  }, [role]);

  return <div>HOME</div>;
}

export default Home;
