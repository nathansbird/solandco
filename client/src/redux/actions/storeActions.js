import * as types from "../constants";

export const getStock = (client) => async dispatch => {
  try{
    const res = await client.product.fetchByHandle("the-wilder-pant");
    
    dispatch({
      type: types.LOAD_SUCCEED,
      payload: res.variants
    });

  }catch(err) {
    dispatch({
      type: types.LOAD_FAIL
    });
  }
}

export const createCheckout = (client) => async dispatch => {
  try{
    const res = await client.checkout.create();
    
    dispatch({
      type: types.CHECKOUT_CREATED,
      payload: res
    });

  }catch(err) {
    dispatch({
      type: types.LOAD_FAIL
    });
  }
}

export const saveToCart = (item) => async dispatch => {
  dispatch({
    type: types.ITEM_ADDED,
    payload: item
  });
}