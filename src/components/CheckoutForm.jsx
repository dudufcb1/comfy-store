import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { authFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';
import { data } from 'autoprefixer';
import { logoutUser } from '../features/user/userSlice';

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    // console.log(store);
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;
    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };
    try {
      const response = await authFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      store.dispatch(clearCart());
      queryClient.removeQueries(['orders']);
      toast.success('Orded placer successfully');
      return redirect('/orders');
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          'please double check your credentials'
      );
      if (error.response.status === 401 || 403) {
        store.dispatch(logoutUser());
        return redirect('/login');
      }

      return null;
    }
  };
const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput label="First Name" name="name" type="text" />
      <FormInput label="Address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="Placer your order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
