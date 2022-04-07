import React from "react";
import { connect } from "react-redux";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import { fetchCurrencies } from "./features/currenciesSlice";
import { fetchCategories } from "./features/categoriesSlice";
import Navbar from "./containers/Navbar/Navbar";
import CartPage from "./pages/CartPage/CartPage";
import ProductAddedNotification from "./components/ProductPageComponents/ProductAddedNotification/ProductAddedNotification";

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies,
    categories: state.categories,
    products: state.products,
  };
};

const mapDispatchToProps = {
  fetchCategories,
  fetchCurrencies,
};

class App extends React.Component {
  componentDidMount() {
    if (!this.props.currencies.data.length > 0) {
      this.props.fetchCurrencies();
    }

    if (!this.props.categories.data.length > 0) {
      this.props.fetchCategories();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <ProductAddedNotification />
        <Routes>
          <Route exact path="/" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
