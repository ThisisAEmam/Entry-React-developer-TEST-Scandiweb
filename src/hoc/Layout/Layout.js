import React from "react";
import classes from "./Layout.module.css";
import { isMobile } from "react-device-detect";

class Layout extends React.Component {
  render() {
    return (
      <div className={[classes.Layout, isMobile && classes.mobile].join(" ")}>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
