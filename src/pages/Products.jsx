import { Filters, ProductsContainer, PaginationContainer } from '../components';
import { authFetch } from '../utils';

const url = '/products';
const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;
  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? '100000',
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => authFetch(url, { queryParams }),
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    try {
      /* const params = new URL(request.url).searchParams;
    const search = params.get('search');
    console.log(search); */
      // const paramObject = new URL(request.url);
      // console.log(paramObject.searchParams.toString());

      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);
      // console.log(url, { params });

      const resp = await queryClient.ensureQueryData(allProductsQuery(params));
      return { products: resp.data.data, meta: resp.data.meta, params };
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
