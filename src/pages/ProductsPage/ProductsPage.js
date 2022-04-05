import React from "react";
import ProductsList from "../../containers/ProductsList/ProductsList";
import Layout from "../../hoc/Layout/Layout";
import classes from "./ProductsPage.module.css";

class ProductsPage extends React.Component {
  render() {
    return (
      <div className={classes.ProductsPage}>
        <Layout>
          <ProductsList />
        </Layout>
      </div>
    );
  }
}

export default ProductsPage;
