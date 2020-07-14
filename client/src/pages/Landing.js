import React, {useState, useEffect} from 'react';
//import centerImage from '../assets/front_center.JPG';
import facebookIcon from '../assets/icons/icons8-facebook-128.png';
import instagramIcon from '../assets/icons/icons8-instagram-128.png';
import { connect } from 'react-redux';
import { createCheckout, getStock } from '../redux/actions/storeActions';
import { Link } from 'react-router-dom';

const Landing = ({createCheckout, getStock, store}) => {

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.title = "Sol & Co - Welcome";

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
        <div id="center_image_container"></div>
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
          <p>Sol & Co not only serves to be transparent and ethical in production, but we strive to nurture and care for our earth. At So l& Co we vow to be responsible and loving to the environment, so every product is made out of 100% recycled materials. Our Wilder Pant has been crafted by recycling fishnets and plastic waste found in oceans around the world to make the nylon in our pants.<br/><br/>Sol & Co exists to empower and love everyone who purchases our clothing by listening and loving each woman and her body type. We have done the unthinkable but creating a brand that merges business professional and athletic wear. As Sol & Co grows, we dedicate our time to hearing our customers and crafting clothing they ask for. We design products for every body-type and any other desire women might wish to see in the fashion industry.</p>
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
      <div id="sixth_page_content">
        <div id="left"></div>
        <div id="right">
          <h1>Our Story</h1>
          <p>Sol & Co was created to break the norms in the fashion industry by being transparent throughout our entire process. We empower locals by teaching them sewing basics and the fundamentals of running and sustaining a business. Our current hubs or “trade schools” are located from Southeast Asia to Central America and serve as a safe place for individuals to work with exceptional wages and a loving community.<br/><br/>We go to impoverished nations to bring jobs and hope in communities that need it the most. In the Sol & Co locations, we bring in women who have been living in extreme poverty to teach them how to sew and provide jobs for them and their families. We have started small to help eradicate big-time manufacturers and the injustices that occur in them. With a dream and a sewing machine, we now employ 20+ women who were previously stuck in the vicious cycle of poverty. </p>
        </div>
      </div>
      <div id="fourth_page_content">
        <div id="left">
          <h1>Meet the Founder</h1>
          <p>Hey you guys, I am Lexi Grisanti! I founded Sol & Co out of a deep desire of my heart to serve women around the world.<br/><br/>In 2017, I lived in various developing countries around the world witnessing joblessness among women and a lack of morality in the manufacturing industry. My heart broke over the working conditions in factories, the trash that so commonly filled the streets, and hopelessness among women desperate to provide for their families.<br/><br/>From living in refugee camps to fish farming in Cambodia, I witnessed poverty and joblessness in many different ways. I was heartbroken that I would go back to my regular life and the people I shared a life with would remain in the vicious cycle of poverty. Influenced by these dire conditions, Sol & Co was born.<br/><br/>Fueled by my passion for change, art, creativity, and my active yet professional lifestyle I created a brand that fulfilled all these desires. </p>
        </div>
        <div id="right">
          
        </div>
      </div>
      <div id="fifth_page_content">
        <div id="left">
          <h1 id="title">Newsletter</h1>
          <p id="desc">Subscribe to our newsletter for encouraging stories and product updates!</p>
          <div id="subscribe_container">
            <input type="email" placeholder="Email Address"></input>
            <button>SUBSCRIBE</button>
          </div>
        </div>
        <div id="right">
          <h1 id="title">Stories</h1>
          <p id="desc">Read about how Sol &amp; Co is impacting the world beyond fashion</p>
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