import { Filters, ProductsContainer, PaginationContainer } from '../components';
import { authFetch } from '../utils';

const url = '/products';
export const loader = async ({ request }) => {
  try {
    const resp = await authFetch(url);

    return { products: resp.data.data, meta: resp.data.meta };
  } catch (error) {
    console.log(error);
  }
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
