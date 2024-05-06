import { ProductGrid } from '../components';
import SectionTitle from './SectionTitle';

const FeaturesProducts = () => {
  return (
    <div className="pt-24">
      <SectionTitle text="Featured products"></SectionTitle>
      <ProductGrid />
    </div>
  );
};

export default FeaturesProducts;
