
import Page from 'components/Page';  
import React, { useState } from 'react'; 
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import MediaFrame from 'components/mediaframe';
import MediaFrame2 from 'components/MediaFrame2';
import PictureSessionEditor from 'components/picSessionEditor';
import MaterialTable from 'material-table';
import { compose, withProps,lifecycle } from 'recompose';
import { withAuthentication,withFetchToken } from '@axa-fr/react-oidc-context-fetch';
import {
	  withFetchRedirectionOn403,
	  withFetchSilentAuthenticateAndRetryOn401,
	  fetchToken
	} from '@axa-fr/react-oidc-fetch-core';
import { useReactOidc,withOidcUser } from '@axa-fr/react-oidc-context';
// const {MediaFrame} = require('./components/mediaframe');
// const {PictureSessionEditor} = require('./components/picSessionEditor');

const PictureFramePage2 = (props) => {
	const [showEditor, setShowEditor] = useState(false);
	const [show, setShow] = useState(false);
	const [sessionToEdit, setSessionToEdit] = useState(null);
	const [tags, setTags] = useState(null);
	const [picSessions, setPicSessions] = useState(null); 
	
	
	const {fetch : authFetch } = props;
	const { oidcUser, logout, events } = useReactOidc();
	const { profile } = oidcUser;
	const addUserEvent = user => console.log(`********* User Loaded :${user.profile} *********`);
	  
	  React.useEffect(() => {
	    events.addUserLoaded(addUserEvent);
	    return () => {
	      events.removeUserLoaded(addUserEvent);
	    };
	  });
	  
	  React.useEffect(() => {
	
			
			
			// This "fetch" manage more than the orginal fetch
		  authFetch('/merlinserver/getpictureframesessions')
			        .then(function(response) {
			        	if (!response.ok) { 
		       				 
							 console.log(response.status);
							 console.log(response.statusText);
							// if(this.interval) {
							// clearInterval(this.interval);
							// }
							//              
							// this.props.onError();
							// throw new Error("Rejected 1!");
	     	            } else {
	     	            	// return response.text();
	     	            	 return response.json();
	     	            }
			        })
			        .then(function(body) {
			        	if(body !== undefined) {
			        		console.log( body); 
			        	}
			        	
			        })
			        .catch(e => alert(e));
	 	      
	 	      
		  authFetch('/merlinserver/getPictureTags')
		        .then(function(response) {
		        	if (!response.ok) { 
	      				 
						 console.log(response.status);
						 console.log(response.statusText);
						// if(this.interval) {
						// clearInterval(this.interval);
						// }
						//              
						// this.props.onError();
						// throw new Error("Rejected 1!");
	  	            } else {
	  	            	// return response.text();
	  	            	 return response.json();
	  	            }
		        })
		        .then(function(body) {
		        	if(body != undefined) {
		        		console.log( body); 
		        		setTags(body);
//		        		setMustHaveSource(body);
		        		//this works but causes an infinite loop...
//			        	that.setState({
//			      			tags: body,
//			      			mustHaveSource: body,
//			      			boostedSource: body,
//			      			deboostedSource: body,
//			      			missingSource: body
//			   	          });
		        	}
		        	
		        })
		        .catch(e => alert(e));
			
		  }, []);
	
 
	
	 
 
	
	function onFailure(error) {
   	 alert(error);
   }
   
   function handleShow() {
	   setShow(true); 
     }
   
  function handleShowEditor() {
	  authFetch("/merlinserver/createemptysession", { credentials: 'same-origin' })
	       .then(
	 		  (response) => {
	 			  if (!response.ok) { 
	 				 
						 console.log(response.status);
						 console.log(response.statusText);
						// if(this.interval) {
						// clearInterval(this.interval);
						// }
						//              
						// this.props.onError();
						// throw new Error("Rejected 1!");
	 	            } else {
	 	            	// return response.text();
	 	            	 return response.json();
	 	            }
	 			 
	 		  }, 
	 		  (error) => {
	 	 
					 console.log(error);
					// if(this.interval) {
					// clearInterval(this.interval);
					// }
					//          
					// this.props.onError();
					// reject(new Error("Rejected 2!"));
			  }).then(
	      (result) => {
	      	console.log( result); 
	      	setSessionToEdit(result);
	      	setShowEditor(true);
	  	      		
			},
	      // Note: it's important to handle errors here
	      // instead of a catch() block so that we don't swallow
	      // exceptions from actual bugs in components.
	      (error) => {
	      	 
				console.log(error);
				// clearInterval(this.interval);
				// this.props.onError();
			}).catch(function(error) {
							    	 
			console.log(error);
			// clearInterval(this.interval);
			// this.props.onError();
	    }); 
     }

 
   function  toggle() {
	   setShow(!show); 
 	  }
     
    function toggleEditor() {
    	 setShowEditor(!showEditor); 
	}
     
     
     
     
  function   onModalSubmit(theVar) {
		 console.log(theVar); 
		 authFetch("/merlinserver/savepictureframesession", 
				 { 
			 		method: 'POST',
			 		body: JSON.stringify(theVar),
			 		credentials: 'same-origin', 
			 	    headers: { 
			 	        'Content-Type': 'application/json'
			 	    }
				 })
         .then(
       		  (response) => {
       			  if (!response.ok) { 
       				 
						 console.log(response.status);
						 console.log(response.statusText);
						// if(this.interval) {
						// clearInterval(this.interval);
						// }
						//              
						// this.props.onError();
						// throw new Error("Rejected 1!");
       	            } else {
       	            	// return response.text();
       	            	 return response.json();
       	            }
       			 
       		  }, 
       		  (error) => {
       	 
					 console.log(error);
					// if(this.interval) {
					// clearInterval(this.interval);
					// }
					//          
					// this.props.onError();
					// reject(new Error("Rejected 2!"));
       		  }
         ).then(
	        (result) => {
	        	console.log( result); 
// this.setState({
// tags: result,
// mustHaveSource: result,
// boostedSource: result
// });
//	        		

	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	        	 
console.log(error);
// clearInterval(this.interval);
// this.props.onError();
	        }
	      ).catch(function(error) {
	    	 
console.log(error);
// clearInterval(this.interval);
// this.props.onError();
	      });
		 toggleEditor();
	 }
     

 
 
   
  
  
     return( 
    	
   			
   			
    	 showEditor ?
    	 
    			    <Page title="PictureFrame" breadcrumbs={[{ name: 'pictureframe', active: true }]}>
    			      <Row>
    			        <Col md={6} sm={6} xs={12} className="mb-3">
		    			     <button onClick={handleShow} className="button">
		    			        Show Picture
		    			    </button>
		    			     <button onClick={handleShowEditor} className="button">
		    			        Launch Session Editor
		    			    </button>

		    				
    			        </Col>
    			        
    			        
    			    
    			      </Row> 
    			        
    			       <Row>
    			        <Col md={12} sm={12} xs={12} className="mb-3">
    			        	<MediaFrame2  modalIsOpen={show}  toggle={toggle} />
    			        	
    			            <PictureSessionEditor modalIsOpen={showEditor}  onSubmit={onModalSubmit} sessionModel={sessionToEdit} toggle={toggleEditor} tags={tags} />
    		    			      
    			        	
    			        </Col>
    			       
    			        </Row> 
    			      
    			 
    			    </Page>
    			  
    	 :
    		
     			    <Page title="PictureFrame" breadcrumbs={[{ name: 'pictureframe', active: true }]}>
     			      <Row>
     			        <Col md={6} sm={6} xs={12} className="mb-3">
 		    			     <button onClick={handleShow} className="button">
 		    			        Show Picture
 		    			    </button>
 		    			     <button onClick={handleShowEditor} className="button">
 		    			        Launch Session Editor
 		    			    </button>
 		    			     		    			        
		    			 
     			        </Col>
     			        
     			        
     			    
     			      </Row> 
     			        
     			       <Row>
     			        <Col md={12} sm={12} xs={12} className="mb-3">
     			        	<MediaFrame2  modalIsOpen={show}  toggle={toggle} />
     			       
     			        </Col>
     			       
     			        </Row> 
     			      
     			 
     			    </Page>
     			
    	 
     );
}
const enhancer= compose(
		  withAuthentication(fetch)
		);

export default enhancer(PictureFramePage2);
