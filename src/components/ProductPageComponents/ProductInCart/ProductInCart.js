import React from "react";
import classes from "./ProductInCart.module.css";
import { IoAdd, IoRemoveOutline } from "react-icons/io5";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";
import { connect } from "react-redux";
import {
  addOneToProduct,
  subtractOneFromProduct,
  modifyProductInCart,
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
  modifyProductInCart,
};

class ProductInCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: { label: "", symbol: "" },
      totalPrice: 0,
      imageIdx: 0,
    };
  }

  setTotalPrice = () => {
    const price = this.props.product.prices.filter(
      (price) => price.currency.label === this.props.currency.label
    );

    if (price.length > 0) {
      const totalPrice = price[0].amount;
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
      <div key={attr.id} className={classes.attributeContainer}>
        <h3 className={classes.attributeName}>{attr.name}:</h3>
        <div
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
            onClick={() => this.attributeValueSelect(id, item.id)}
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
            onClick={() => this.attributeValueSelect(id, item.id)}
          ></div>
        );
      });
    }
  };

  attributeValueSelect = (attrId, itemId) => {
    if (this.props.product.selectedAttr[attrId] !== itemId) {
      const attributes = {};
      attributes[attrId] = itemId;
      this.props.modifyProductInCart({
        cartId: this.props.product.cartId,
        attributes: attributes,
      });
    }
  };

  imageArrowClickHandler = (type) => {
    const numImages = this.props.product.gallery.length;
    const currentIdx = this.state.imageIdx;
    let idx = currentIdx;
    if (type === "back") {
      idx = currentIdx - 1;
      if (idx === -1) {
        idx = numImages - 1;
      }
    } else {
      idx = currentIdx + 1;
      if (idx === numImages) {
        idx = 0;
      }
    }
    this.setState({ ...this.state, imageIdx: idx });
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
          </div>
          <p className={classes.price}>
            {this.state.currency.symbol}
            <span>{this.state.totalPrice.toFixed(2)}</span>
          </p>
          {this.props.product.attributes.length > 0 && (
            <div className={classes.attributesContainer}>
              {this.renderAttributes()}
            </div>
          )}
        </div>
        <div className={classes.middleSide}>
          <div
            className={classes.amountIcon}
            onClick={() =>
              this.props.addOneToProduct({ cartId: this.props.product.cartId })
            }
          >
            <IoAdd />
          </div>
          <p className={classes.productAmount}>{this.props.product.amount}</p>
          <div
            className={classes.amountIcon}
            onClick={() =>
              this.props.subtractOneFromProduct({
                cartId: this.props.product.cartId,
              })
            }
          >
            <IoRemoveOutline />
          </div>
        </div>
        <div className={classes.rightSide}>
          {this.props.cartPage && this.props.product.gallery.length > 1 && (
            <div
              className={[classes.imgArrow, classes.backArrow].join(" ")}
              onClick={() => this.imageArrowClickHandler("back")}
            >
              <TiChevronLeft />
            </div>
          )}
          <img
            src={this.props.product.gallery[this.state.imageIdx]}
            alt="product"
          />
          {this.props.cartPage && this.props.product.gallery.length > 1 && (
            <div
              className={[classes.imgArrow, classes.forwardArrow].join(" ")}
              onClick={() => this.imageArrowClickHandler("forward")}
            >
              <TiChevronRight />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInCart);
