import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AlertPage from 'pages/AlertPage';
import AuthModalPage from 'pages/AuthModalPage';
import AuthPage from 'pages/AuthPage';
import BadgePage from 'pages/BadgePage';
import ButtonGroupPage from 'pages/ButtonGroupPage';
import ButtonPage from 'pages/ButtonPage';
import CardPage from 'pages/CardPage';
import PictureFramePage2 from 'pages/PictureFramePage2';
import ChartPage from 'pages/ChartPage';
// pages
import DashboardPage from 'pages/DashboardPage';
import DropdownPage from 'pages/DropdownPage';
import FormPage from 'pages/FormPage';
import InputGroupPage from 'pages/InputGroupPage';
import ModalPage from 'pages/ModalPage';
import ProgressPage from 'pages/ProgressPage';
import TablePage from 'pages/TablePage';
import TypographyPage from 'pages/TypographyPage';
import WidgetPage from 'pages/WidgetPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.scss';

import { AuthenticationProvider, oidcLog, InMemoryWebStorage } from '@axa-fr/react-oidc-context';
import CustomCallback from './pages/CustomCallback';
import oidcConfiguration from './AuthConfiguration';
import { withOidcSecure } from '@axa-fr/react-oidc-context';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
	
	constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, show: false};
        
//        this.logout = this.logout.bind(this);
//        this.login = this.login.bind(this);
        this.onFailure = this.onFailure.bind(this); 

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.testAuth = this.testAuth.bind(this);

      
    
    }
	
	 componentDidMount() { 
		 this.testAuth();
		  	
	 }
	 
	 componentWillUnmount() {
//		 clearInterval(this.interval);
	 }
	 
	 testAuth() {
		 fetch("/admin/user" , { credentials: 'same-origin' })
	      .then( res => { console.log(res); 
	      return res.json();
	      })
	      .then(
	        (result) => {
	        	if(result.name)
	        		{ 
	        		 this.setState({
	        			 isAuthenticated: true, user: result
	     	          }); 
	        		}

	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	        	 
	        }
	      );
	    }
	 
	 onFailure(error) {
    	 alert(error);
    }
	 
	 handleShow() {
//	        this.setState({ show: true });
	      }

	      handleHide() {
//	    	  this.setState({isAuthenticated: false, user: null})
//	        this.testAuth();
	      }
	
  render() {
    return (
		<AuthenticationProvider
	      configuration={oidcConfiguration}
	      loggerLevel={oidcLog.DEBUG}
	      isEnabled={true}
	      callbackComponentOverride={CustomCallback}
	      UserStore={InMemoryWebStorage}
	    >
	      <BrowserRouter basename={"/"}>
	          <Switch>
	            <LayoutRoute
	              exact
	              path="/login"
	              layout={EmptyLayout}
	              component={props => (
	                <AuthPage {...props} authState={STATE_LOGIN} />
	              )}
	            />
	            <LayoutRoute
	              exact
	              path="/signup"
	              layout={EmptyLayout}
	              component={props => (
	                <AuthPage {...props} authState={STATE_SIGNUP} />
	              )}
	            />
	            <LayoutRoute
	              exact
	              path="/login-modal"
	              layout={MainLayout}
	              component={AuthModalPage}
	            />
	            <LayoutRoute
	              exact
	              path="/"
	              layout={MainLayout}
	              component={DashboardPage}
	            />
	            <LayoutRoute
	              exact
	              path="/buttons"
	              layout={MainLayout}
	              component={ButtonPage}
	            />
	            <LayoutRoute
	              exact
	              path="/cards"
	              layout={MainLayout}
	              component={withOidcSecure(CardPage)}
	            />
	            <LayoutRoute
	              exact
	              path="/pictureframe"
	              layout={MainLayout}
	              component={withOidcSecure(PictureFramePage2)}
	            />
	            <LayoutRoute
	              exact
	              path="/widgets"
	              layout={MainLayout}
	              component={WidgetPage}
	            />
	            <LayoutRoute
	              exact
	              path="/typography"
	              layout={MainLayout}
	              component={TypographyPage}
	            />
	            <LayoutRoute
	              exact
	              path="/alerts"
	              layout={MainLayout}
	              component={AlertPage}
	            />
	            <LayoutRoute
	              exact
	              path="/tables"
	              layout={MainLayout}
	              component={TablePage}
	            />
	            <LayoutRoute
	              exact
	              path="/badges"
	              layout={MainLayout}
	              component={BadgePage}
	            />
	            <LayoutRoute
	              exact
	              path="/button-groups"
	              layout={MainLayout}
	              component={ButtonGroupPage}
	            />
	            <LayoutRoute
	              exact
	              path="/dropdowns"
	              layout={MainLayout}
	              component={DropdownPage}
	            />
	            <LayoutRoute
	              exact
	              path="/progress"
	              layout={MainLayout}
	              component={ProgressPage}
	            />
	            <LayoutRoute
	              exact
	              path="/modals"
	              layout={MainLayout}
	              component={ModalPage}
	            />
	            <LayoutRoute
	              exact
	              path="/forms"
	              layout={MainLayout}
	              component={FormPage}
	            />
	            <LayoutRoute
	              exact
	              path="/input-groups"
	              layout={MainLayout}
	              component={InputGroupPage}
	            />
	            <LayoutRoute
	              exact
	              path="/charts"
	              layout={MainLayout}
	              component={ChartPage}
	            />
	            <LayoutRoute
	              exact
	              path="/register"
	              layout={MainLayout}
	              component={AuthPage}
	            />   
	            <Redirect to="/" />
	          </Switch> 
	      </BrowserRouter>
      </AuthenticationProvider>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
