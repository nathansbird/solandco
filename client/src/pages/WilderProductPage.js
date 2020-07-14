import React, {useState, useEffect} from 'react';
import facebookIcon from '../assets/icons/icons8-facebook-128.png';
import instagramIcon from '../assets/icons/icons8-instagram-128.png';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStock, createCheckout, saveToCart } from '../redux/actions/storeActions';

const WilderProductPage = ({getStock, createCheckout, saveToCart, store}) => {

  const [hidden, setHidden] = useState(true);

  const [color, setColor] = useState("Black");
  const [size, setSize] = useState("S");

  const [favorite, setFavorite] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    saveToCart({variantId: selectedId(), quantity: 1});
  }

  const buyNow = () => {
    store.client.checkout.addLineItems(store.checkout.id, {variantId: selectedId(), quantity: 1}).then((res) => {
      let win = window.open(res.webUrl, '_blank');
      win.focus();
    });
  }

  const navBack = () => {
    setHidden(true);
    setTimeout(() => {
      setRedirect(true);
    }, 1300);
  }

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    window.scrollTo(0, 0);
    document.title = "Sol & Co - The Wilder Pant";
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    getStock(store.client);
    createCheckout(store.client);

    setTimeout(() => {
      setHidden(false);
    }, 300);
  }, []);

  const isInStock = (id) => {
    if(!store.loading){
      return store.inventory.filter((item) => item.id == id).filter((item) => item.available).length > 0;
    }

    return true;
  }

  const getPrice = (id) => {
    if(!store.loading){
      return store.inventory.filter((item) => item.id == id)[0].price;
    }

    return "--";
  };

  const selectedId = () => {
    if(!store.loading){
      return store.inventory.filter((item) => item.color == color).filter((item) => item.size == size)[0].id;
    }

    return null;
  }

  const openShopify = () => {
    store.client.checkout.addLineItems(store.checkout.id, store.cart).then((res) => {
      let win = window.open(res.webUrl, '_blank');
      win.focus();
    });
  }

  return (
    <>
      {redirect && <Redirect to="/"/>}
      <div id="wilder_product_page">
        <div id="page_content">
          <div id="top_div">
            <div id="div1" className={hidden ? "hidden" : ""}>
              <div id="navbar">
                <div id="back_nav">
                  <i onClick={navBack} className="material-icons">chevron_left</i>
                  <p onClick={navBack}>BACK</p>
                </div>
                <div id="cart_indicator" className={store.cart.length > 0 ? "" : "gone"} onClick={openShopify}>
                  <i className="material-icons cart_button">shopping_cart</i>
                  <p id="number_indicator">{store.cart.length}</p>
                </div>
              </div>

              <div id="wp_background_container">
                <div></div>
                <h1 id="wp_background_1" style={{color: color == "Green" ? "rgba(0, 50, 0, 0.2)" : "rgba(220, 204, 181, 1.0)"}}>SOL</h1>
                <h1 id="wp_background_2" style={{color: color == "Green" ? "rgba(0, 50, 0, 0.2)" : "rgba(220, 204, 181, 1.0)"}}>&amp;</h1>
                <h1 id="wp_background_3" style={{color: color == "Green" ? "rgba(0, 50, 0, 0.2)" : "rgba(220, 204, 181, 1.0)"}}>CO</h1>
              </div>

              <div id="wp_description_container">
                <h1>Wilder Pant</h1>
                <p>The Wilder Pant is a jogger that blurs the lines of a business professional and activewear style. It is quick-dry, ethically produced, culturally sensitive, and made from 100% recycled materials.<br/><br/>The lightweight material makes it easy to work out in, yet the style makes business meetings and daily life a breeze. It is fair trade manufactured, Bluesign Certified, and Global Recycled Standard Certified.</p>
              </div>

              <div id="wp_social_container">
                <a href="https://www.facebook.com/thesolandco" target="_blank"><img id="wp_social_facebook" src={facebookIcon}></img></a>
                <a href="https://www.instagram.com/thesolandco/" target="_blank"><img id="wp_social_instagram" src={instagramIcon}></img></a>
              </div>
            </div>
            <div id="div2">
              <div id="black_product_image" className={hidden || color != "Black" ? "hidden" : ""}></div>
              <div id="green_product_image" className={hidden || color != "Green" ? "hidden" : ""}></div>
            </div>
          </div>
          
          <div id="div3" className={hidden ? "hidden" : ""}>
            <div id="options_upper">
              <div id="size_container">
                <div id="sizes_upper">
                  <p className={"size_item " + (size == "XS" ? "selected" : "") } onClick={() => {setSize("XS")}}>XS</p>
                  <p className={"size_item " + (size == "S" ? "selected" : "")} onClick={() => {setSize("S")}}>S</p>
                  <p className={"size_item " + (size == "M" ? "selected" : "")} onClick={() => {setSize("M")}}>M</p>
                  <p className={"size_item " + (size == "L" ? "selected" : "")} onClick={() => {setSize("L")}}>L</p>
                </div>
                <div id="sizes_lower">
                  <p className={"size_item " + (size == "XL" ? "selected" : "")} onClick={() => {setSize("XL")}}>XL</p>
                  <p className={"size_item " + (size == "XXL" ? "selected" : "")} onClick={() => {setSize("XXL")}}>XXL</p>
                  <p className={"size_item " + (size == "3XL" ? "selected" : "")} onClick={() => {setSize("3XL")}}>3XL</p>
                </div>
              </div>
              <div id="details_container">
                <p id="pricing">${getPrice(selectedId())}</p>
                <div id="details_actions">
                  {isInStock(selectedId()) ? 
                  <div id="buttom_column">
                    <button id="add_to_cart" onClick={addToCart}>Add To Cart</button>
                    <button id="buy_now" onClick={buyNow}>Buy Now</button>
                  </div>
                  : <button id="add_to_cart" className="out">Out Of Stock</button>}
                  
                  <button id="favorite" onClick={() => {setFavorite(!favorite)}}><i className="material-icons">{favorite ? "favorite" : "favorite_border"}</i></button>
                </div>
              </div>
            </div>
            <div id="options_lower">
              <p id="description">The Wilder Pant<br/>{color} Color</p>
              <div id="product_image" className={color.toLowerCase()}>
                <div id="product_small_green"></div>
                <div id="product_small_black"></div>
              </div>
              <div id="color_picker">
                <div id="black_color_picker" className={color == "Black" ? "active" : ""} onClick={() => {setColor("Black")}}></div>
                <div id="green_color_picker" className={color == "Green" ? "active" : ""} onClick={() => {setColor("Green")}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  store: state.store
});

export default connect(mapStateToProps, {getStock, createCheckout, saveToCart})(WilderProductPage);