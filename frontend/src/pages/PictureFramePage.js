
import Page from 'components/Page';  
import React from 'react'; 
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
	} from '@axa-fr/react-oidc-fetch-core';
import { useReactOidc } from '@axa-fr/react-oidc-context';
// const {MediaFrame} = require('./components/mediaframe');
// const {PictureSessionEditor} = require('./components/picSessionEditor');

class PictureFramePage extends React.Component {
	
	constructor() {
        super();
        this.state = { show: false, 
        	     showEditor: false,
	    		 picSessions: null,
	    		 sessionToEdit: null,
	    		 tags: [],
	    		 columns: [
	    		      { title: 'Name', field: 'name' },
	    		      { title: 'Surname', field: 'surname' },
	    		      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
	    		      {
	    		        title: 'Birth Place',
	    		        field: 'birthCity',
	    		        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
	    		      },
	    		    ]
	    		 };
       
        this.onFailure = this.onFailure.bind(this);  
        this.handleShow = this.handleShow.bind(this);
        this.handleShowEditor = this.handleShowEditor.bind(this); 
        this.toggle = this.toggle.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
        this.onModalSubmit = this.onModalSubmit.bind(this);  
        this.getUserTest2 = this.getUserTest2.bind(this); 
    }
	
 
	
	 componentDidMount() {  
		
	 }

		const { oidcUser } = useReactOidc();
		const { profile } = oidcUser;
	
	getUserTest2() {
		 let enhance = fetch => {
  	  compose(
  			    withFetchToken(fetch),
  			    withFetchSilentAuthenticateAndRetryOn401(),
  			    withFetchRedirectionOn403()
  			  )};
		 
  			let test = withAuthentication(() => fetch("/test/me")
  			.then(function(response) {
			         console.log(response.status);
			         console.log(response.statusText);
			         return response.text();
			    })
			    .then(function(body) {
			       console.log( body); 
			    })
			    .catch(e => alert(e))
  		);
  			
  			 let enhance2 = 
  			  	  compose(
  			  			    withFetchToken(fetch),
  			  			    withFetchSilentAuthenticateAndRetryOn401(),
  			  			    withFetchRedirectionOn403()
  			  			  );
  			 
  			let enhance3 = () =>
			  	  compose(
			  			    withFetchToken(fetch),
			  			    withFetchSilentAuthenticateAndRetryOn401(),
			  			    withFetchRedirectionOn403()
			  			  );
  			
  			let test2 = withAuthentication(fetch);
  			let test3 = enhance(fetch);
  			let test4 = enhance2(fetch);
  			console.log(fetch);
  			console.log(enhance);
  			console.log(enhance2);
  			console.log(enhance3);
  			console.log(test);
  			console.log(test2);
  			console.log(test3);
  			console.log(test4);
  			
  		
  		  console.log(oidcUser);
  		  console.log(profile);
  			
//  			test4("/test/me")
//  		  			.then(function(response) {
//  				         console.log(response.status);
//  				         console.log(response.statusText);
//  				         return response.text();
//  				    })
//  				    .then(function(body) {
//  				       console.log( body); 
//  				    })
//  				    .catch(e => alert(e))
//  	  		;
	}
	
	
	onFailure(error) {
   	 alert(error);
   }
   
   handleShow() {
       this.setState({ show: true });
     }
   
   handleShowEditor() {
		   fetch("/merlinserver/createemptysession", { credentials: 'same-origin' })
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
	  		 this.setState({
	  			 sessionToEdit: result,
	  			showEditor: true
		          });         		
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

 
     toggle() {
 	    this.setState(prevState => ({
 	    	show: !prevState.show
 	    }));
 	  }
     
     toggleEditor() {
    	 
  	    this.setState(prevState => ({
  	    	showEditor: !prevState.showEditor
  	    }));
	}
     
     
     
     
     onModalSubmit(theVar) {
		 console.log(theVar); 
		 fetch("/merlinserver/savepictureframesession", 
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
		 this.toggleEditor();
	 }
     
     
     render() {   
    	 let that = this;
    	 const enhanceFetch = compose(
  	   			  withAuthentication(fetch),
  	   		withProps(props => ({
  			    handleClick: e => {
  			      e.preventDefault();
  			    },
  			  })),
  	   		lifecycle({
  	   	    componentWillMount() {
  	   	      // This "fetch" manage more than the orginal fetch
  	   	      this.props.fetch('/merlinserver/getpictureframesessions')
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
  	   	      
  	   	      
		  	   	 this.props.fetch('/merlinserver/getPictureTags')
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
			        		//this works but causes an infinite loop...
//				        	that.setState({
//				      			tags: body,
//				      			mustHaveSource: body,
//				      			boostedSource: body,
//				      			deboostedSource: body,
//				      			missingSource: body
//				   	          });
			        	}
			        	
			        })
			        .catch(e => alert(e));
  	   	    }
  	   	  }));
  	   			
  			const ButtonFetch = ({ handleClick }) => (
  	   			  <button onClick={handleClick} type="button">
  	   			    Test 0
  	   			  </button>
  	   			);
  	   			
  	   	 
  	   	     const ButtonFetchEnhance = enhanceFetch(ButtonFetch);
    	 
    	 
   			
   			const enhanceFetch1 = compose(
   	   			  withAuthentication(fetch),
   	   		withProps(props => ({
   			    handleClick: e => {
   			      e.preventDefault();
   			      props
   			        .fetch('/test/me')
   			        .then(function(response) {
   			         console.log(response.status);
   			      console.log(response.statusText);
   			   return response.text();
   			        })
   			        .then(function(body) {
   			        	console.log( body); 
   			        })
   			        .catch(e => alert(e));
   			    },
   			  })),
   	   		lifecycle({
   	   	    componentWillMount() {
   	   	      // This "fetch" manage more than the orginal fetch
   	   	      this.props
   			        .fetch('/test/me')
   			        .then(function(response) {
   			         console.log(response.status);
   			      console.log(response.statusText);
   			   return response.text();
   			        })
   			        .then(function(body) {
   			        	console.log( body); 
   			        })
   			        .catch(e => alert(e));
   	   	    }
   	   	  }));
   	   			
   			const ButtonFetch1 = ({ handleClick }) => (
   	   			  <button onClick={handleClick} type="button">
   	   			    Test 1
   	   			  </button>
   	   			);
   	   			
   	   	 
   	   	     const ButtonFetchEnhance1 = enhanceFetch1(ButtonFetch1); 
   			
   			
    	 if(this.state.showEditor) {
    	 return (
    			    <Page title="PictureFrame" breadcrumbs={[{ name: 'pictureframe', active: true }]}>
    			      <Row>
    			        <Col md={6} sm={6} xs={12} className="mb-3">
		    			     <button onClick={this.handleShow} className="button">
		    			        Show Picture
		    			    </button>
		    			     <button onClick={this.handleShowEditor} className="button">
		    			        Launch Session Editor
		    			    </button>

		    				
    			        </Col>
    			        
    			        
    			    
    			      </Row> 
    			        
    			       <Row>
    			        <Col md={12} sm={12} xs={12} className="mb-3">
    			        	<MediaFrame2  modalIsOpen={this.state.show}  toggle={this.toggle} />
    			        	
    			            <PictureSessionEditor modalIsOpen={this.state.showEditor}  onSubmit={this.onModalSubmit} sessionModel={this.state.sessionToEdit} toggle={this.toggleEditor} tags={this.state.tags} />
    		    			      
    			        	
    			        </Col>
    			       
    			        </Row> 
    			      
    			 
    			    </Page>
    			  );
    	 } else {
    		 return (
     			    <Page title="PictureFrame" breadcrumbs={[{ name: 'pictureframe', active: true }]}>
     			      <Row>
     			        <Col md={6} sm={6} xs={12} className="mb-3">
 		    			     <button onClick={this.handleShow} className="button">
 		    			        Show Picture
 		    			    </button>
 		    			     <button onClick={this.handleShowEditor} className="button">
 		    			        Launch Session Editor
 		    			    </button>
 		    			     
 		    			       <ButtonFetchEnhance />
 		    			       <ButtonFetchEnhance1 />
 		    			       
	    			        <button onClick={this.getUserTest2} className="button">
		    			        Test 2
		    			    </button>
		    			        
		    			 
     			        </Col>
     			        
     			        
     			    
     			      </Row> 
     			        
     			       <Row>
     			        <Col md={12} sm={12} xs={12} className="mb-3">
     			        	<MediaFrame2  modalIsOpen={this.state.show}  toggle={this.toggle} />
     			       
     			        </Col>
     			       
     			        </Row> 
     			      
     			 
     			    </Page>
     			  );
    	 }
     }
}
 

export default PictureFramePage;
