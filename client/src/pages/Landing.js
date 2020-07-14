import React, {useState, useEffect} from 'react';
import centerImage from '../assets/front_center.JPG';
import facebookIcon from '../assets/icons/icons8-facebook-128.png';
import instagramIcon from '../assets/icons/icons8-instagram-128.png';
import { connect } from 'react-redux';
import { createCheckout, getStock } from '../redux/actions/storeActions';
import { Link } from 'react-router-dom';

const Landing = ({createCheckout, getStock, store}) => {

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', (e) => {setScroll(window.scrollY > 5)});
    getStock(store.client);
    createCheckout(store.client);

    setTimeout(() => {
      setHidden(false);
    }, 300);
  }, []);

  const [scrolled, setScroll] = useState(false);

  const openShopify = () => {
    store.client.checkout.addLineItems(store.checkout.id, store.cart).then((res) => {
      let win = window.open(res.webUrl, '_blank');
      win.focus();
    });
  }

  return (
    <div id="landing_page" className={(scrolled ? "scrolled" : "") + " " + (hidden ? "hidden" : "")}>
      <div id="navbar">
        <i className="material-icons cart_button gone">menu</i>
        <h1 id="page_title">Sol & Co</h1>
        <div id="cart_indicator" onClick={openShopify}>
          <i className={store.cart.length > 0 ? "material-icons cart_button" : "material-icons cart_button gone"}>shopping_cart</i>
          <p id="number_indicator">{store.cart.length}</p>
        </div>
      </div>
      <div id="first_page_content">
        <div id="bottom_half"></div>
        <div id="center_image_container">
          <img id="center"/>
          {/*<h1 id="welcome_text">ETHICAL<br/>CLOTHING</h1>*/}
        </div>
        {/*<div id="right_image_container"></div>*/}
        {/*<div id="left_image_container"></div>*/}
        <div id="center_text_container">
          <h1 id="welcome_text"></h1>
        </div>
        <div id="scroll_text">
          <p id="title">SCROLL</p>
          <div id="line"></div>
        </div>
        <div id="hashtag_container">
          <p>#LIVEBRIGHT</p>
        </div>
        <div id="social_container">
          <a href="https://www.facebook.com/thesolandco" target="_blank"><img id="wp_social_facebook" src={facebookIcon}></img></a>
          <a href="https://www.instagram.com/thesolandco/" target="_blank"><img id="wp_social_instagram" src={instagramIcon}></img></a>
        </div>
      </div>
      <div id="second_page_content">
        <div id="left"></div>
        <div id="right">
          <h1>Our Mission</h1>
          <p>The Sol &amp; Co vision is to love and empower every human we come in contact with.<br/><br/>We desire for each of our customers to feel comfortable, confident and loved in our clothing.<br/><br/>We desire for the people making our clothing to feel empowered, cared for, and seen at all times.<br/><br/>We desire to eliminate waste in manufacturing and see our earth looking its best.</p>
        </div>
      </div>
      <div id="third_page_content">
        <div id="left">
          <div>
            <h1>THE<br/>WILDER<br/>PANT</h1>
            <Link to="/wilder"><p><span>SHOP NOW<i className="material-icons">navigate_next</i></span></p></Link>
          </div>
        </div>
        <div id="right"></div>
      </div>
      <div id="fourth_page_content">
        <div id="left">
          <h1>About Us</h1>
          <p>This is a paragraph about Lexi, Kyla, and everything it took to get Sol &amp; Co to where it is today. In addition to having no meaning, this paragraph was written by Nathan, a developer.<br/><br/>Since he is not a <i>legitimate</i> member of the team, these words should probably not be regarded as an accurate representation of the Sol &amp; Co story. So if, this isn't the <i>real</i> Sol &amp; Co story, what is? Well, that's for another time.</p>
        </div>
        <div id="right">
          
        </div>
      </div>
      <div id="fifth_page_content">
        <div id="left">
          <h1 id="title">Newsletter</h1>
          <p id="desc">Subscribe to our newsletter for<br/>encouraging stories and product updates!</p>
          <div id="subscribe_container">
            <input type="email" placeholder="Email Address"></input>
            <button>SUBSCRIBE</button>
          </div>
        </div>
        <div id="right">
          <h1 id="title">Stories</h1>
          <p id="desc">Read about how Sol &amp; Co is<br/>impacting the world beyond fashion</p>
          <a href="/blogs/a-voice-to-the-voiceless/a-voice-for-the-voiceless"><p><span>READ BLOG<i className="material-icons">navigate_next</i></span></p></a>
        </div>
      </div>
      <div id="footer">
        <p>© 2020 <span>Sol &amp; Co.</span> All rights reserved.</p>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  store: state.store
});

export default connect(mapStateToProps, {createCheckout, getStock})(Landing);