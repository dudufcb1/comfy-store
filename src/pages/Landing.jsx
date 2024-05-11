import { FeaturedProducts, Hero } from '../components';
import { authFetch } from '../utils';

const urlTerm = '/products?featured=true';

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => authFetch(urlTerm),
};
export const loader = (queryClient) => async () => {
  try {
    const resp = await queryClient.ensureQueryData(featuredProductsQuery);
    const products = resp.data.data;
    // console.log(products);
    return { products };
  } catch (error) {
    console.log(error);
  }
};
const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
