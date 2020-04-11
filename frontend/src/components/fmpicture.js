import ReactDOM from 'react-dom';
import { compose } from 'recompose';
import {
  withFetchRedirectionOn403,
  withFetchSilentAuthenticateAndRetryOn401,
} from '@axa-fr/react-oidc-fetch-core';
import { withAuthentication,withFetchToken } from '@axa-fr/react-oidc-context-fetch';
const React = require('react');
//tag::fmpicture[] 
class FMPicture extends React.Component {

    	constructor() {
            super();
            this.state = {  curPic1Meta: '',curPic1: null,picLoaded: false,containerId: ""};
  
            this.getPicName = this.getPicName.bind(this);
            this.getPic = this.getPic.bind(this);
            this.handleErrors = this.handleErrors.bind(this); 
        
        }
    	
    	 componentDidMount() {
    		 this.setState({
    		      containerId: ReactDOM.findDOMNode(this).parentNode.getAttribute("id")
    		    });
    		 
    		 this.getPicName()
    		 this.interval = setInterval(() => this.getPicName(),this.props.changeFreq);
    		 
    		
    	 }
    	 
    	 componentWillUnmount() {
    		 clearInterval(this.interval);
    	 }
     
        
        
        getPicName() { 
        	
        	let magicfetch = fetch =>
        	  compose(
        			    withFetchToken(fetch),
        			    withFetchSilentAuthenticateAndRetryOn401(),
        			    withFetchRedirectionOn403()
        			  );
        	console.log(magicfetch.props);
        	console.log(magicfetch.fetch);
        	fetch("/merlinserver/requestPictureLocation")
              .then(
            		  (response) => {
            			  if (!response.ok) { 
            				  this.setState({ 
         	        			 picLoaded: false
         	     	          }); 
//            				  console.log(response.status);
//            				  console.log(response.statusText);
//                			  if(this.interval) {
//                				  clearInterval(this.interval);
//                			  }
//               
//                	          this.props.onError();
//                	          throw new Error("Rejected 1!");
            	            } else {
//            	            	 return response.text();
            	            	 return response.json();
            	            }
            			 
            		  }, 
            		  (error) => {
            			  this.setState({ 
      	        			 picLoaded: false
      	     	          });
//            			  console.log(error);
//            			  if(this.interval) {
//            				  clearInterval(this.interval);
//            			  }
//           
//            	          this.props.onError();
//            	          reject(new Error("Rejected 2!"));
            		  }
              ).then(
    	        (result) => {
    	        	console.log( result);
    	        	this.getPic(result.path_hash);
	        		 this.setState({
	        			 curPic1Meta: result,
	        			 picLoaded: false
	     	          }); 
    	        		

    	        },
    	        // Note: it's important to handle errors here
    	        // instead of a catch() block so that we don't swallow
    	        // exceptions from actual bugs in components.
    	        (error) => {
    	        	this.setState({ 
	        			 picLoaded: false
	     	          });
//    	        	console.log(error);
//      	          clearInterval(this.interval);
//      	          this.props.onError();
    	        }
    	      ).catch(function(error) {
    	    	  this.setState({ 
	        			 picLoaded: false
	     	          });
//    	          console.log(error);
//    	          clearInterval(this.interval);
//    	          this.props.onError();
    	      });
        }
        
        getPic(path) {
        	let url = new URL("/zuulpicturearchiver/requestPicture",window.location.href),
            params = {relativePath:path}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        	fetch(url, { credentials: 'same-origin' })
        	.then(this.handleErrors)
    	      .then(res => res.blob())	 
    	      .then(
    	        (result) => {
    	        	const fileReaderInstance = new FileReader();
    	        	 fileReaderInstance.readAsDataURL(result); 
    	        	 fileReaderInstance.onload = () => {    
    	        		 this.setState({
    	        			 picLoaded: true,
    	        			 curPic1: fileReaderInstance.result 
    	     	          }); 
    	        	 }
    	        		
    	        		

    	        },
    	        // Note: it's important to handle errors here
    	        // instead of a catch() block so that we don't swallow
    	        // exceptions from actual bugs in components.
    	        (error) => {
//    	          this.setState({
//    	            isLoaded: true,
//    	            error
//    	          });
    	        }
    	      ).catch(function(error) {
//    	          console.log(error);
//    	          clearInterval(this.interval);
//    	          this.props.onError();
    	      });
        }
        
        handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }
        
        shouldComponentUpdate(nextProps, nextState)
        {
        	return nextState.picLoaded;
        }
        

      
        
        render() {  
        	
                let content2  = (<div>
            	No pic loaded
                </div>);
                if(this.state.picLoaded) { 
                
                	
                 
                	let heightDif = window.innerHeight - this.state.curPic1Meta.height;
                	let widthDif = window.innerWidth - this.state.curPic1Meta.width;
                	console.log( "Height dif: "+heightDif +", Width dif: "+widthDif);
                	
                	
                	
                	
                	 
                	
                	if(heightDif < widthDif) {
                		
                		if(this.state.curPic1Meta.isPortrait) {
                	 
                    		content2  = (<div><img src={this.state.curPic1}  onClick={this.props.onClick} style={{height:((window.innerHeight-50)+"px"), marginLeft:"28%"}}/> </div>);
                		} else {
                			content2  = (<div><img src={this.state.curPic1} onClick={this.props.onClick} style={{height:((window.innerHeight-50)+"px")}}/> </div>);
                		}
                    
                	} else {
                	 
                    		content2  = (<div><img src={this.state.curPic1} onClick={this.props.onClick} style={{width:((window.innerWidth*.9)+"px")}}/> </div>);
                  
                	}
                	
                	
                	
                } 
               

            return (
                <div className="FMPicture"> 
                    {content2}
                </div>
            );
        }
    } 

export default FMPicture;
  //end::fmpicture[]  