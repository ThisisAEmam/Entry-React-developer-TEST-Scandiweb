import { ApolloClient, InMemoryCache } from "@apollo/client";

import * as queries from "./queries";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

const fetchCurrenciesAPI = async () => {
  const result = await client.query({ query: queries.fetchCurrenciesQuery });
  return result;
};

const fetchCategoriesAPI = async () => {
  const result = await client.query({ query: queries.fetchCategoriesQuery });
  return result;
};

const fetchCategoryProductsAPI = async (category) => {
  const result = await client.query({
    query: queries.fetchCategoryProductsQuery,
    variables: { title: category },
  });
  return result;
};

const fetchProductAPI = async (id) => {
  const result = await client.query({
    query: queries.fetchProductQuery,
    variables: { id: id },
  });
  return result;
};

export {
  fetchCurrenciesAPI,
  fetchCategoriesAPI,
  fetchCategoryProductsAPI,
  fetchProductAPI,
};
