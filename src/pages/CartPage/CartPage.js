import React from "react";
import { connect } from "react-redux";
import Layout from "../../hoc/Layout/Layout";
import classes from "./CartPage.module.css";
import ProductInCart from "../../components/ProductPageComponents/ProductInCart/ProductInCart";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    products: state.productsInCart,
  };
};

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currency: { label: "", symbol: "" },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setState({ ...this.state, products: this.props.products });
    }
  }

  getCurrency = (currency) => {
    this.setState({ ...this.state, currency: { ...currency } });
  };

  calcTotalPrice = () => {
    let totalPrice = 0;
    if (this.state.currency.label !== "") {
      this.props.products.forEach((product) => {
        const price = product.prices.filter(
          (price) => price.currency.label === this.state.currency.label
        );
        totalPrice += price[0].amount * product.amount;
      });
    }
    return totalPrice.toFixed(2);
  };

  render() {
    return (
      <Layout>
        <div className={classes.CartPage}>
          <h3 className={classes.header}>Cart</h3>
          {this.props.products.length !== 0 ? (
            <>
              <div className={classes.products}>
                {this.props.products.map((product) => (
                  <ProductInCart
                    cartPage
                    product={product}
                    key={product.cartId}
                    setCurrency={this.getCurrency}
                  />
                ))}
              </div>
              <div className={classes.btnAndPriceContainer}>
                <div className={classes.totalPrice}>
                  <p>Total:</p>
                  <p className={classes.price}>
                    {this.state.currency.symbol}
                    {this.calcTotalPrice()}
                  </p>
                </div>
                <button className={classes.checkoutBtn}>Check out</button>
              </div>
            </>
          ) : (
            <div className={classes.noProducts}>
              <img src="/images/empty_box.svg" alt="empty" />
              <p>Your bag is empty.</p>
              <Link to="/">
                <button>Browse Products</button>
              </Link>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, null)(CartPage);
