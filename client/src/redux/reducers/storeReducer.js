import * as types from '../constants.js';

const initialState = {
  loading: true,
  inventory: [],
  cart: []
}

export default function(state = initialState, action){
  const { type, payload } = action;
  switch(type){
    case types.CLIENT_CREATED:
      return {
        ...state,
        client: action.payload,
      }
    case types.CHECKOUT_CREATED:
      return {
        ...state,
        checkout: action.payload,
      }
    case types.ITEM_ADDED:
      return {
        ...state,
        cart: [...state.cart, payload]
      }
    case types.LOAD_SUCCEED:
      const result = payload.map((item) => {
        const {
          title,
          available,
          price,
          id
        } = item

        return {
          size: title.split('/')[0].trim(),
          color: title.split('/')[1].trim(),
          available,
          price,
          id
        }
      });
      
      return {
        ...state,
        inventory: result,
        loading: false
      }
    case types.LOAD_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}