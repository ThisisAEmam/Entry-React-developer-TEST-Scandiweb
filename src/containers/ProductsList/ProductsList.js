import React from "react";
import { connect } from "react-redux";
import ProductCard from "../../components/ProductPageComponents/ProductCard/ProductCard";
import { fetchCategoryProductsAPI } from "../../graphQL/api";
import classes from "./ProductsList.module.css";

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.categories.selected,
    currency: state.currencies.selected,
  };
};

class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      products: [],
      currency: {},
    };
  }

  componentDidMount() {
    if (this.props.selectedCategory.length !== 0) {
      this.fetchProducts(this.props.selectedCategory);
    }
    if (Object.keys(this.props.currency).length !== 0) {
      this.setCurrency();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCategory !== this.props.selectedCategory) {
      this.fetchProducts(this.props.selectedCategory);
    }

    if (prevProps.currency !== this.props.currency) {
      this.setCurrency();
    }
  }

  fetchProducts = (category) => {
    fetchCategoryProductsAPI(category).then((res) => {
      this.setState({
        ...this.state,
        category: category,
        products: res.data.category.products,
      });
    });
  };

  setCurrency = () => {
    this.setState({
      ...this.state,
      currency: this.props.currency,
    });
  };

  render() {
    return (
      <div className={classes.ProductsListContainer}>
        <h1 className={classes.categoryName}>
          Category: {this.state.category}
        </h1>
        <div className={classes.ProductsList}>
          {this.state.currency.label &&
            this.state.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={this.state.currency}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ProductsList);
