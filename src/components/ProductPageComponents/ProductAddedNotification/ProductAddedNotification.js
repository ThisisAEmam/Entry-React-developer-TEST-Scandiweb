import React from "react";
import { connect } from "react-redux";
import classes from "./ProductAddedNotification.module.css";
import { setProductAddedNotification } from "../../../features/productAddedNotifSlice";
import { CSSTransition } from "react-transition-group";
import { IoCloseOutline } from "react-icons/io5";
import "./transitions.css";

const mapStateToProps = (state) => {
  return {
    productAddedNotification: state.productAddedNotification,
  };
};

const mapDispatchToProps = {
  setProductAddedNotification,
};

class ProductAddedNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      show: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.productAddedNotification !== this.props.productAddedNotification
    ) {
      const prps = { ...this.props.productAddedNotification };
      if (prps.show) {
        this.setState(prps);
        setTimeout(() => {
          this.props.setProductAddedNotification({ name: "", show: false });
        }, 3500);
      } else {
        this.setState(prps);
      }
    }
  }

  closeHandler = () => {
    this.props.setProductAddedNotification({ name: "", show: false });
  };

  render() {
    return (
      <CSSTransition
        in={this.state.show}
        timeout={1000000000}
        classNames="notification-transition"
      >
        <div className={classes.ProductAddedNotification}>
          <p className={classes.text}>
            {this.state.name} has been added to your bag.
          </p>
          <div className={classes.xIcon} onClick={this.closeHandler}>
            <IoCloseOutline />
          </div>
          <div
            className={[
              classes.progressBar,
              this.state.show && classes.animate,
            ].join(" ")}
          ></div>
        </div>
      </CSSTransition>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductAddedNotification);
