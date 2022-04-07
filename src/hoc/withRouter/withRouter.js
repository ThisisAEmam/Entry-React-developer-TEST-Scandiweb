import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <WrappedComponent
      {...props}
      params={params}
      location={location}
      navigate={navigate}
      // etc...
    />
  );
};

export default withRouter;
