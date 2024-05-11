import { formatPrice, generarOpciones } from '../utils';
import { removeItem, editItem } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({ cartItem }) => {
  const { cartID, title, price, image, amount, company, productColor } =
    cartItem;
  const dispatch = useDispatch();

  const removeItemFromTheCart = () => {
    dispatch(removeItem({ cartID }));
  };
  const handleAmount = (e) => {
    dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
  };

  // console.log(cartItem);
  return (
    <article
      key={cartID}
      className="mb-12 flex flex-column gap-y-4 sm:flex-row flex-wrap border-b border-b-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg object-cover"
      />
      {/* INFO */}
      {/* Se le dio un width para que las letras no rompan el diseño */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium">{title}</h3>
        {/* COMPANY */}
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>
        {/* COLOR */}
        <p className="mt-2 text-sm capitalize flex items-center gap-x-2">
          color:{' '}
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            value={amount}
            onChange={handleAmount}
          >
            {generarOpciones(amount + 10)}
          </select>
        </div>
        {/* REMOVE */}
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={removeItemFromTheCart}
        >
          Remove
        </button>
      </div>
      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
