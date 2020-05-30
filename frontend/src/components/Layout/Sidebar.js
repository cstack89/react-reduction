import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import { FaGithub, FaImages,FaWikipediaW } from 'react-icons/fa';
import {
  MdAccountCircle,
  MdArrowDropDownCircle,
  MdBorderAll,
  MdBrush,
  MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdNotificationsActive,
  MdPages,
  MdRadioButtonChecked,
  MdSend,
  MdStar,
  MdTextFields,
  MdViewCarousel,
  MdViewDay,
  MdViewList,
  MdWeb,
  MdWidgets,
  MdRestaurantMenu,
  MdLink,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { AuthenticationContext } from '@axa-fr/react-oidc-context';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};




const pageContents = [
  { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
  {
    to: '/login-modal',
    name: 'login modal',
    exact: false,
    Icon: MdViewCarousel,
  },
];


const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
    		 <AuthenticationContext.Consumer>
	          {props => {
	            return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                Reduction <FaGithub />
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
	          <NavItem key={0} className={bem.e('nav-item')}>
	          	<BSNavLink
		            id={`navItem-dashboard-0`}
		            className="text-uppercase"
		            tag={NavLink}
		            to={'/'}
		            activeClassName="active"
		            exact={true}
		          >
	            <MdDashboard className={bem.e('nav-item-icon')} />
	            <span className="">dashboard</span>
	          </BSNavLink>
	        </NavItem>
	        <NavItem key={1} className={bem.e('nav-item')}>
	          	<BSNavLink
		            id={`navItem-cookbook-1`}
		            className="text-uppercase"
		            tag={NavLink}
		            to={'/cookbook'}
		            activeClassName="active"
		            exact={true}
		          >
	            <MdRestaurantMenu className={bem.e('nav-item-icon')} />
	            <span className="">cookbook</span>
	          </BSNavLink>
	        </NavItem>
	        <NavItem key={2} className={bem.e('nav-item')}>
          	<BSNavLink
	            id={`navItem-cookbookbycategory-2`}
	            className="text-uppercase"
	            tag={NavLink}
	            to={'/cookbookbycategory'}
	            activeClassName="active"
	            exact={true}
	          >
            <MdRestaurantMenu className={bem.e('nav-item-icon')} />
            <span className="">Cookbook By Category</span>
          </BSNavLink>
        </NavItem>
        <NavItem key={3} className={bem.e('nav-item')}>
	      	<BSNavLink
	            id={`navItem-cookbookbyrating-3`}
	            className="text-uppercase"
	            tag={NavLink}
	            to={'/cookbookbyrating'}
	            activeClassName="active"
	            exact={true}
	          >
	        <MdRestaurantMenu className={bem.e('nav-item-icon')} />
	        <span className="">Cookbook By Rating</span>
	      </BSNavLink>
	    </NavItem>
            {props.oidcUser || !props.isEnabled ? (
                <React.Fragment>
	                <NavItem key={4} className={bem.e('nav-item')}>
		            	<BSNavLink
		                  id={`navItem-pictureframe-4`}
		                  className="text-uppercase"
		                  tag={NavLink}
		                  to={'/pictureframe'}
		                  activeClassName="active"
		                  exact={false}
		                >
		                  <FaImages className={bem.e('nav-item-icon')} />
		                  <span className="">pictureframe</span>
		                </BSNavLink>
		            </NavItem>

            
	                <NavItem className={bem.e('nav-item')} onClick={props.logout} >
		              <BSNavLink className={bem.e('text-uppercase')}>
		                <div className="d-flex">
		                  <MdExtension className={bem.e('nav-item-icon')} />
		                  <span className=" align-self-start">Logout</span>
		                </div>
		              </BSNavLink>
		           </NavItem> 
	          </React.Fragment>
             
            ) : (
                <NavItem  className={bem.e('nav-item')} onClick={props.login} >
   	              <BSNavLink className={bem.e('text-uppercase')}>
   	                <div className="d-flex">
   	                  <MdExtension className={bem.e('nav-item-icon')} />
   	                  <span className=" align-self-start">Login</span>
   	                </div>
   	              </BSNavLink>
   	            </NavItem>  
            )}
            <NavItem key={3} className={bem.e('nav-item')}>
	          	<BSNavLink
		            id={`navItem-wiki-3`}
		            className="text-uppercase"
		            tag={NavLink}
		            to={'/tiddlywiki'}
		            activeClassName="active"
		            exact={true}
		          >
	            <FaWikipediaW className={bem.e('nav-item-icon')} />
	            <span className="">wiki</span>
	          </BSNavLink>
	        </NavItem>
	        <NavItem key={4} className={bem.e('nav-item')}>
	          	<BSNavLink
		            id={`navItem-links-4`}
		            className="text-uppercase"
		            tag={NavLink}
		            to={'/links'}
		            activeClassName="active"
		            exact={true}
		          >
	            <MdLink className={bem.e('nav-item-icon')} />
	            <span className="">links</span>
	          </BSNavLink>
	        </NavItem>
	     
            

       

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Pages')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span className="">Pages</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPages
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPages}>
              {pageContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          </Nav>
        </div>
      </aside>
	            );
	          }}
	        </AuthenticationContext.Consumer>
    );
  }
}

export default Sidebar;
