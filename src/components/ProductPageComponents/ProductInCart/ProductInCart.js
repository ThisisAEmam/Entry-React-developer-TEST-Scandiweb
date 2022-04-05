import React from "react";
import classes from "./ProductInCart.module.css";
import { IoAdd, IoRemoveOutline } from "react-icons/io5";
import { connect } from "react-redux";
import {
  addOneToProduct,
  subtractOneFromProduct,
} from "../../../features/productsInCartSlice";
import { isMobile } from "react-device-detect";

const mapStateToProps = (state) => {
  return {
    currency: state.currencies.selected,
  };
};

const mapDispatchToProps = {
  addOneToProduct,
  subtractOneFromProduct,
};

class ProductInCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: { label: "", symbol: "" },
      totalPrice: 0,
    };
  }

  setTotalPrice = () => {
    const price = this.props.product.prices.filter(
      (price) => price.currency.label === this.props.currency.label
    );

    if (price.length > 0) {
      const totalPrice = price[0].amount * this.props.product.amount;
      this.setState({
        ...this.state,
        totalPrice: totalPrice,
        currency: this.props.currency,
      });
    } else {
      this.setState({
        ...this.state,
        currency: this.props.currency,
      });
    }
    this.props.setCurrency({ ...this.props.currency });
  };

  componentDidMount() {
    if (Object.keys(this.props.currency).length !== 0) {
      this.setTotalPrice();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      this.setTotalPrice();
    }

    if (prevProps.product !== this.props.product) {
      this.setTotalPrice();
    }
  }

  renderAttributes = () => {
    return this.props.product.attributes.map((attr) => (
      <div
        key={attr.id}
        className={classes.attrContainer}
        style={
          isMobile
            ? { gridTemplateColumns: "1fr 1fr 1fr" }
            : {
                gridTemplateColumns: "1fr ".repeat(attr.items.length),
              }
        }
      >
        {this.retAttributesValues(attr)}
      </div>
    ));
  };

  retAttributesValues = ({ id, type, items }) => {
    if (type === "text") {
      return items.map((item) => {
        return (
          <p
            className={[
              classes.attributeValue,
              this.props.product.selectedAttr[id] === item.id &&
                classes.selectedAttrValue,
            ].join(" ")}
            key={item.id}
          >
            {item.value}
          </p>
        );
      });
    } else if (type === "swatch") {
      return items.map((item) => {
        return (
          <div
            className={[
              classes.attributeValue,
              classes.colorAttr,
              this.props.product.selectedAttr[id] === item.id &&
                classes.selectedColorAttrValue,
            ].join(" ")}
            style={{ backgroundColor: item.value }}
            key={item.id}
          ></div>
        );
      });
    }
  };

  render() {
    return (
      <div
        className={[
          classes.ProductInCart,
          this.props.cartPage && classes.inCartPage,
        ].join(" ")}
      >
        <div className={classes.leftSide}>
          <div>
            <p className={classes.brand}>{this.props.product.brand}</p>
            <p className={classes.name}>{this.props.product.name}</p>
            <p className={classes.price}>
              {this.state.currency.symbol}
              <span>{this.state.totalPrice.toFixed(2)}</span>
            </p>
          </div>
          <div className={classes.attributesContainer}>
            {this.renderAttributes()}
          </div>
        </div>
        <div className={classes.middleSide}>
          <div
            className={classes.amountIcon}
            onClick={() =>
              this.props.addOneToProduct({ id: this.props.product.id })
            }
          >
            <IoAdd />
          </div>
          <p className={classes.productAmount}>{this.props.product.amount}</p>
          <div
            className={classes.amountIcon}
            onClick={() =>
              this.props.subtractOneFromProduct({ id: this.props.product.id })
            }
          >
            <IoRemoveOutline />
          </div>
        </div>
        <div className={classes.rightSide}>
          <img src={this.props.product.gallery[0]} alt="product" />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInCart);
