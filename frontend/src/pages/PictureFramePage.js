
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
// const {MediaFrame} = require('./components/mediaframe');
// const {PictureSessionEditor} = require('./components/picSessionEditor');

class PictureFramePage extends React.Component {
	
	constructor() {
        super();
        this.state = { show: false, 
        	     showEditor: false,
	    		 picSessions: null,
	    		 sessionToEdit: null,
	    		 tags: []
	    		 };
       
        this.onFailure = this.onFailure.bind(this); 
        this.getTags = this.getTags.bind(this); 
        this.handleShow = this.handleShow.bind(this);
        this.handleShowEditor = this.handleShowEditor.bind(this); 
        this.toggle = this.toggle.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
        this.onModalSubmit = this.onModalSubmit.bind(this);
        this.getPicSessions = this.getPicSessions.bind(this);
    }
	
	componentDidMount() {
		 this.getPicSessions();
		 this.getTags();
		 
		
	 }
	
	getTags() {
		 
		 
		fetch("/zuulmerlinserver/getPictureTags", { credentials: 'same-origin' })
        .then(
      		  (response) => {
      			  if (!response.ok) { 
      				 
// console.log(response.status);
// console.log(response.statusText);
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
      	 
// console.log(error);
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
      		 this.setState({
      			tags: result,
      			mustHaveSource: result,
      			boostedSource: result,
      			deboostedSource: result,
      			missingSource: result
   	          }); 
	        		

	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	        	 
// console.log(error);
// clearInterval(this.interval);
// this.props.onError();
	        }
	      ).catch(function(error) {
	    	 
// console.log(error);
// clearInterval(this.interval);
// this.props.onError();
	      });
} 
	
	onFailure(error) {
   	 alert(error);
   }
   
   handleShow() {
       this.setState({ show: true });
     }
   
   handleShowEditor() {
		   fetch("/zuulmerlinserver/createemptysession", { credentials: 'same-origin' })
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
// this.props.modalIsOpen= !this.props.modalIsOpen;
		 this.toggleEditor();
	 }
     

	 getPicSessions() {
			fetch("/zuulmerlinserver/getpictureframesessions", { credentials: 'same-origin' })
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
 }
	 
     
     render() {   
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
