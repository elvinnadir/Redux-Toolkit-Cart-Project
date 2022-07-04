import React from 'react';
import CartItem from './CartItem';
// useSelector 
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../features/cart/modelSlice';
import {  getCartItems } from '../features/cart/cartSlice';



const CartContainer = () => {
    // destructure from cart
  const { cartItems, total, amount } = useSelector((state) => state.cart);

//   useDispatch 
const dispatch = useDispatch()

  if (amount < 1) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header style={{textAlign: "center"}}>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
          <button type='button' className="btn clear-btn" 
          onClick={() => dispatch(getCartItems())}>
           Refresh
           </button>
        </header>
      </section>
    );
  }


  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className='btn clear-btn' 
        onClick={() => dispatch(openModal())}>clear cart</button>
      </footer>
    </section>
  );
};

export default CartContainer;