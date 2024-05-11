import { useSelector } from 'react-redux';
import { CheckoutForm, SectionTitle, CartTotals } from '../components/';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const loader = (store) => () => {
  // console.log(store.getState());
  // console.log(JSON.stringify(store, null, 2));

  const user = store.getState().userState.user;
  if (!user) {
    toast.warn('Debes tener iniciada la sesión');
    return redirect('/login');
  }
  return null;
};

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="grid mt-8 gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
