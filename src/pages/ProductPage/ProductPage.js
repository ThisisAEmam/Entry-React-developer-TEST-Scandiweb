import React from "react";
import { connect } from "react-redux";
import { fetchProductAPI } from "../../graphQL/api";
import Layout from "../../hoc/Layout/Layout";
import withRouter from "../../hoc/withRouter/withRouter";
import classes from "./ProductPage.module.css";
import { addProductToCart } from "../../features/productsInCartSlice";
import { setProductAddedNotification } from "../../features/productAddedNotifSlice";
import ProductGallery from "../../components/ProductPageComponents/ProductGallery/ProductGallery";
import { isMobile } from "react-device-detect";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const mapStateToProps = (state) => {
  return {
    currency: state.currencies.selected,
    productsInCart: state.productsInCart,
  };
};

const mapDispatchToProps = {
  addProductToCart,
  setProductAddedNotification,
};

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      desc: "",
      prices: [],
      price: [],
      images: [],
      selectedAttr: {},
      addedToCart: false,
      notSelectedAttr: {},
    };
  }

  componentDidMount() {
    const id = this.props.params.id;
    fetchProductAPI(id).then((res) => {
      const product = res.data.product;
      const price = product.prices.filter(
        (price) => price.currency.label === this.props.currency.label
      );
      const notSelectedAttr = {};
      product.attributes.forEach((attr) => {
        notSelectedAttr[attr.id] = false;
      });
      const idx = this.props.productsInCart.findIndex(
        (obj) => obj.id === product.id
      );
      if (idx !== -1) {
        this.setState({
          ...this.state,
          product: product,
          desc: product.description,
          prices: product.prices,
          price: [...price],
          images: product.gallery,
          addedToCart: true,
          selectedAttr: { ...this.props.productsInCart[idx].selectedAttr },
          notSelectedAttr: { ...notSelectedAttr },
        });
      } else {
        this.setState({
          ...this.state,
          product: product,
          desc: product.description,
          prices: product.prices,
          price: [...price],
          images: product.gallery,
          notSelectedAttr: { ...notSelectedAttr },
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currency !== this.props.currency &&
      this.state.prices.length > 0
    ) {
      const price = this.state.prices.filter(
        (price) => price.currency.label === this.props.currency.label
      );
      this.setState({
        ...this.state,
        price: [...price],
      });
    }

    if (prevProps.productsInCart !== this.props.productsInCart) {
      const idx = this.props.productsInCart.findIndex(
        (obj) => obj.id === this.state.product.id
      );
      if (idx === -1) {
        const notSelectedAttr = {};
        this.state.product.attributes.forEach((attr) => {
          notSelectedAttr[attr.id] = false;
        });
        this.setState({
          ...this.state,
          addedToCart: false,
          selectedAttr: {},
          notSelectedAttr: { ...notSelectedAttr },
        });
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      product: {},
      prices: [],
      price: [],
      images: [],
      selectedAttr: {},
      addedToCart: false,
      notSelectedAttr: {},
    });
  }

  attributeSelectHandler = (attrId, itemId) => {
    const selectedAttr = { ...this.state.selectedAttr };
    const notSelectedAtt = { ...this.state.notSelectedAttr };
    if (attrId in selectedAttr) {
      console.log(attrId);
      if (selectedAttr[attrId] === itemId) {
        delete selectedAttr[attrId];
      } else {
        notSelectedAtt[attrId] = false;
        selectedAttr[attrId] = itemId;
      }
    } else {
      notSelectedAtt[attrId] = false;
      selectedAttr[attrId] = itemId;
    }
    this.setState({
      ...this.state,
      selectedAttr: selectedAttr,
      notSelectedAttr: notSelectedAtt,
    });
  };

  retAttributesValues = ({ id, type, items }) => {
    if (type === "text") {
      return items.map((item) => {
        return (
          <p
            className={[
              classes.attributeValue,
              id in this.state.selectedAttr &&
              this.state.selectedAttr[id] === item.id
                ? classes.selectedAttrValue
                : null,
            ].join(" ")}
            key={item.id}
            onClick={() => this.attributeSelectHandler(id, item.id)}
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
              id in this.state.selectedAttr &&
              this.state.selectedAttr[id] === item.id
                ? classes.selectedColorAttrValue
                : null,
            ].join(" ")}
            style={{ backgroundColor: item.value }}
            key={item.id}
            onClick={() => this.attributeSelectHandler(id, item.id)}
          ></div>
        );
      });
    }
  };

  addBtnClickHandler = () => {
    const attrError = [];
    this.state.product.attributes.forEach((attr) => {
      if (this.state.selectedAttr[attr.id] === undefined) {
        attrError.push(attr.id);
      }
    });
    if (attrError.length > 0) {
      const notSelectedAtt = { ...this.state.notSelectedAttr };
      attrError.forEach((attr) => {
        notSelectedAtt[attr] = true;
      });
      this.setState({
        ...this.state,
        notSelectedAttr: { ...notSelectedAtt },
      });
    } else {
      this.setState({ ...this.state, addedToCart: true });
      this.props.addProductToCart({
        ...this.state.product,
        selectedAttr: this.state.selectedAttr,
      });
      this.props.setProductAddedNotification({
        name: this.state.product.name,
        show: true,
      });
    }
  };

  render() {
    return (
      <Layout>
        <div className={classes.ProductPage}>
          <div className={classes.leftSide}>
            <ProductGallery images={this.state.images} />
          </div>
          <div className={classes.rightSide}>
            <h2 className={classes.brand}>{this.state.product.brand}</h2>
            <p className={classes.name}>{this.state.product.name}</p>
            {this.state.product.attributes &&
              this.state.product.attributes.map((attr) => {
                return (
                  <div className={classes.sectionContainer} key={attr.id}>
                    <h3
                      className={[
                        classes.sectionTitle,
                        this.state.notSelectedAttr[attr.id] &&
                          classes.notSelectedAttr,
                      ].join(" ")}
                    >
                      {attr.name}:{" "}
                      {this.state.notSelectedAttr[attr.id] && (
                        <span>(Please select a value first).</span>
                      )}
                    </h3>
                    <div
                      className={classes.attribute}
                      style={
                        isMobile
                          ? { gridTemplateColumns: "1fr 1fr 1fr" }
                          : {
                              gridTemplateColumns: "1fr ".repeat(
                                attr.items.length
                              ),
                            }
                      }
                    >
                      {this.retAttributesValues(attr)}
                    </div>
                  </div>
                );
              })}
            <div
              className={[
                classes.sectionContainer,
                classes.priceContainer,
              ].join(" ")}
            >
              <h3 className={classes.sectionTitle}>Price:</h3>
              <p className={classes.price}>
                {this.props.currency.symbol}
                {this.state.price.length > 0 && this.state.price[0].amount}
              </p>
            </div>
            <div className={classes.btnContainer}>
              {this.state.product.inStock === false ? (
                <button
                  className={[classes.addToCartBtn, classes.outOfStockBtn].join(
                    " "
                  )}
                >
                  Out Of Stock
                </button>
              ) : (
                <button
                  className={classes.addToCartBtn}
                  onClick={this.addBtnClickHandler}
                >
                  Add to Cart
                </button>
              )}
            </div>
            <div className={classes.description}>
              {parse(DOMPurify.sanitize(this.state.desc))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductPage));
