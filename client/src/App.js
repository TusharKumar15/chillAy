import { Home } from './components/home';
import { BSignup} from './components/Bussiness/signup';
import { CSignup } from './components/Customer/signup';
import { CLogin } from './components/Customer/login';
import { FoodMenu } from './components/Bussiness/items';
import { Orders } from './components/Bussiness/orders';
import {Routes, Route} from 'react-router-dom';
import { ProtectedRouteB } from './components/Bussiness/protect';
import { ProtectedRouteC } from './components/Customer/protect';
import { Eateries } from './components/Customer/shop_list';
import { Menu } from './components/Customer/menu';
import { YourOrders } from './components/Customer/yourOrders';
import fb from './components/images/fb_icon.jpg';
import tw from './components/images/twitter_icon.jpg';
import yt from './components/images/youtube_icon.jpg';
import ig from './components/images/insta_icon.jpg';
import li from './components/images/li_icon.jpg';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path = "/" element = {<Home/>} />
        <Route exact path = "/business_signup" element = {<BSignup/>} />
        <Route exact path = "/customer_signup" element = {<CSignup/>} />
        <Route exact path = "/customer_login" element = {<CLogin/>} />
        <Route exact path = "/food_menu" element = {<ProtectedRouteB routePath="/food_menu" component = {FoodMenu}/>} />
        <Route exact path = "/orders" element = {<Orders/>} />
        <Route exact path = "/eateries" element = {<ProtectedRouteC routePath="/eateries" component = {Eateries}/>} />
        <Route exact path = "/eateries/menu/:shop_id" element = {<Menu/>} />
        <Route exact path = "/your_orders" element = {<YourOrders/>} />
      </Routes>
      <div style={{height: "200px", backgroundColor: "#231f20", color: "white", marginTop: "350px"}}>
        <div style={{display: "flex", justifyContent: "center"}}><h3>Contact us</h3></div>
        <div style={{display: "flex", justifyContent: "space-around", padding: "300px", paddingBottom: "30px", paddingTop:"30px"}}>
          <div className='sm_icons'><img src={fb} width="50px"></img></div>
          <div className='sm_icons'><img src={tw} width="50px"></img></div>
          <div className='sm_icons'><img src={ig} width="50px"></img></div>
          <div className='sm_icons'><img src={yt} width="50px"></img></div>
          <div className='sm_icons'><img src={li} width="50px"></img></div>
        </div>
      </div>
    </div>
  );
}

export default App;
