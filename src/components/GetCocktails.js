import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';

const GetCocktails = () => {

  const {cocktails, isLoading} = useSelector((state) => state.modal)
  


  if(isLoading) {
    return <div className="loading">
      <h1>Loading...</h1>
    </div>
   }


  return (
    <>
    <StyledCounter>
    <div className="miain_cock_list">
        {
          cocktails.map((cocktail) => {
            const {strCategory, strDrinkThumb, idDrink} = cocktail
           return <div className='cocktai_card' key={idDrink}>
             <img className='cocktail_img' src={strDrinkThumb} alt={strCategory} />
             <p className='cocktai_card_name'>{strCategory}</p>
           </div>
          })
        }
    </div>
    </StyledCounter>
    </>
  )
}

export default GetCocktails

const StyledCounter = styled.div`
.miain_cock_list{
  width: 90vw;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: #fff;
}
.cocktai_card {
  margin: 1%;

}
  .cocktail_img{
      width: 200px;
  }
  .cocktai_card_name{
    color: bold;
    text-align: center;
    font-size: 19px;
  }
`;