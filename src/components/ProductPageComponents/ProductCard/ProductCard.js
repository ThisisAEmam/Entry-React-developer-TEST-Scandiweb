import React from "react";
import classes from "./ProductCard.module.css";
import { FiShoppingCart } from "react-icons/fi";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import "./transitions.css";
import { isMobile } from "react-device-detect";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.product,
      currency: this.props.currency,
      hovered: false,
    };
    this.btnRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      this.setState({ ...this.state, currency: this.props.currency });
    }
  }

  hoverHandler = (state) => {
    if (!isMobile) {
      this.setState({ ...this.state, hovered: state });
    }
  };

  touchHandler = (state) => {
    if (isMobile) {
      if (state) {
        this.setState({ ...this.state, hovered: state });
      } else {
        setTimeout(() => {
          this.setState({ ...this.state, hovered: state });
        }, 1000);
      }
    }
  };

  render() {
    return (
      <div
        className={[
          classes.ProductCard,
          !this.state.inStock && classes.outOfStock,
          isMobile && classes.mobile,
        ].join(" ")}
        onMouseEnter={() => this.hoverHandler(true)}
        onMouseLeave={() => this.hoverHandler(false)}
        onTouchStart={() => this.touchHandler(true)}
        onTouchEnd={() => this.touchHandler(false)}
      >
        <div className={classes.previewImage}>
          <img src={this.state.gallery[0]} alt="Preview" />
          {!this.state.inStock && (
            <div className={classes.outOfStockOverlay}>
              <p>Out of Stock</p>
            </div>
          )}
          <CSSTransition
            timeout={1000000}
            in={this.state.hovered}
            classNames="hover-transition"
          >
            <Link
              to={`/products/${this.state.id}`}
              className={classes.cartIcon}
              ref={this.btnRef}
            >
              <FiShoppingCart />
            </Link>
          </CSSTransition>
        </div>
        <div className={classes.text}>
          <p className={classes.brand}>{this.state.brand}</p>
          <p className={classes.name}>{this.state.name}</p>
          <p className={classes.price}>
            {this.state.currency.symbol}
            {
              this.state.prices.filter(
                (price) => price.currency.label === this.state.currency.label
              )[0].amount
            }
          </p>
        </div>
        {/* {this.state.addedToCart && (
          <AddedToCartNotification name={this.state.name} />
        )} */}
      </div>
    );
  }
}

export default ProductCard;
