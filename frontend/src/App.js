import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout'; 
import AuthModalPage from 'pages/AuthModalPage';
import AuthPage from 'pages/AuthPage'; 
import LinksPage from 'pages/LinksPage';
import PictureFramePage2 from 'pages/PictureFramePage2'; 
import CookbookPage from 'pages/CookbookPage';   
// pages
import DashboardPage from 'pages/DashboardPage';  
import WikiPage from 'pages/WikiPage';  
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
	              path="/tiddlywiki"
	              layout={MainLayout}
	              component={WikiPage}
	            /> 
	            <LayoutRoute
	              exact
	              path="/pictureframe"
	              layout={MainLayout}
	              component={withOidcSecure(PictureFramePage2)}
	            /> 
	            <LayoutRoute 
	              exact
	              path="/cookbook"
	              layout={MainLayout}
	              component={CookbookPage}
	            /> 
	            <LayoutRoute 
	              path="/cookbook/:id"
	              layout={MainLayout}
	              component={CookbookPage}
	            />
	            
	            <LayoutRoute 
	              exact
	              path="/cookbookbycategory"
	              layout={MainLayout}
	            	component={props => (
		                <CookbookPage {...props} filterByCategory={true} />
		              )}
	            /> 
	            <LayoutRoute 
	              path="/cookbookbycategory/:id"
	              layout={MainLayout}
	            	component={props => (
		                <CookbookPage {...props} filterByCategory={true} />
		              )}
	            />
	            <LayoutRoute  
	              exact
	              path="/cookbookbyrating"
	              layout={MainLayout}
	            component={props => (
		                <CookbookPage {...props} filterByRating={true} />
		              )}
	            /> 
	            <LayoutRoute 
	              path="/cookbookbyrating/:id"
	              layout={MainLayout}
	              component={props => (
		                <CookbookPage {...props} filterByRating={true} />
		              )}
	            />
	            
	            
	            
	            
	            <LayoutRoute
	              exact
	              path="/links"
	              layout={MainLayout}
	              component={LinksPage}
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
