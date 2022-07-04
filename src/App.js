import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import GetCocktails from "./components/GetCocktails";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import { getCocktails } from "./features/cart/modelSlice";



function App() {
 const {cartItems, isLoading}  = useSelector((state) => state.cart)
 const {isOpen}  = useSelector((state) => state.modal)
//  console.log(isOpen);
   const dispatch = useDispatch()

   useEffect(() =>{
    dispatch(calculateTotals())
  }, [cartItems])
  
  
  useEffect(() =>{
    dispatch(getCartItems())
    dispatch(getCocktails())
   },[])


   if(isLoading) {
    return <div className="loading">
      <h1>Loading...</h1>
    </div>
   }




  return <main>
   {isOpen && <Modal />} 
    <Navbar />
    <CartContainer />
    <GetCocktails />
  </main>
}
export default App;
