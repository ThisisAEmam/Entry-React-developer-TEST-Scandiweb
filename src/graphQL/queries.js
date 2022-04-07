import { gql } from "@apollo/client";

const fetchCategoriesQuery = gql`
  query {
    categories {
      name
    }
  }
`;

const fetchCurrenciesQuery = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

const fetchCategoryProductsQuery = gql`
  query FetchCategoryProducts($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        inStock
        gallery
        description
        brand
        category
        attributes {
          id
          name
          type
          items {
            id
            value
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

const fetchProductQuery = gql`
  query FetchProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      brand
      category
      attributes {
        id
        name
        type
        items {
          id
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;

export {
  fetchCategoriesQuery,
  fetchCategoryProductsQuery,
  fetchCurrenciesQuery,
  fetchProductQuery,
};
