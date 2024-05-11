import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const CartItemsList = () => {
  const { cartItems } = useSelector((state) => state.cartState);
  return (
    <>
      {cartItems.map((cartItem) => {
        return <CartItem key={cartItem.cartID} cartItem={cartItem} />;
      })}
    </>
  );
};

export default CartItemsList;
