import { FeaturedProducts, Hero } from '../components';
import { authFetch } from '../utils';

const urlTerm = '/products?featured=true';

export const loader = async () => {
  try {
    const resp = await authFetch(urlTerm);
    const products = resp.data.data;
    console.log(products);
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
