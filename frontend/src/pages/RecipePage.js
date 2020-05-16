
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
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';  
import MaterialTable from 'material-table';
import { compose, withProps,lifecycle } from 'recompose';
import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';
import { useReactOidc,withOidcUser } from '@axa-fr/react-oidc-context'; 
import { Editor } from '@tinymce/tinymce-react';

const RecipePage = (props) => {
	 
	const {fetch : authFetch } = props;
	const { oidcUser, logout, events } = useReactOidc();
	const { profile } = oidcUser; 
	  
//	  React.useEffect(() => {
//	    events.addUserLoaded(addUserEvent);
//	    return () => {
//	      events.removeUserLoaded(addUserEvent);
//	    };
//	  });
	  
	  React.useEffect(() => {
	
		
	   }, []);
	
 
	
	 
     
	
	 
 
      function submitForm(e)   {
    	  e.preventDefault();
    	  const data = new FormData(e.target);
//    	  , 
//	 	    headers: { 
//	 	        'Content-Type': 'application/json'
//	 	    }
    	// This "fetch" manage more than the orginal fetch
		  authFetch('/merlinserver/uploadPicture', 
					 { 
		 		method: 'POST',
		 		body: data
			 })
	        .then(function(response) {
	        	if (!response.ok) { 
       				 
					 console.log(response.status);
					 console.log(response.statusText); 
 	            } else {
 	            	// return response.text();
 	            	console.log( response);
 	            }
	        }) 
	        .catch(e => alert(e));
      }
      
      function uploadPic(blobInfo, success, failure)   {
    	 let  data = new FormData();
    	    data.append('image', blobInfo.blob(), blobInfo.filename());
    	   
//    	  , 
//	 	    headers: { 
//	 	        'Content-Type': 'application/json'
//	 	    }
    	// This "fetch" manage more than the orginal fetch
		  authFetch('/merlinserver/uploadPicture', 
					 { 
		 		method: 'POST',
		 		body: data
			 })
	        .then(function(response) {
	        	if (!response.ok) { 
       				 
					 console.log(response.status);
					 console.log(response.statusText); 
					 failure("error: "+response.statusText)
 	            } else {
 	            	 return response.text();
 	            	
 	            }
	        }) .then(function(body) {
	        	if(body !== undefined) {
	        		console.log( body);   
 	            	success(body);
	        	}
	        	
	        })
	        .catch(e => alert(e));
      }
   
      function handleEditorChange(content, editor) 
      {
    	  console.log('Content was updated:', content);
      }
      
//      <Form> 
//      <FormGroup>
//          <Label for="exampleFile">File</Label>
//          <Input type="file" name="image" id="exampleFile" />
//      </FormGroup>  
//      <Button type="submit">Upload Image</Button>
//    </Form> 
  
      
//      <Row>
//      <Col md={6} sm={6} xs={12} className="mb-3">
//	        <form onSubmit={submitForm}> 
//	             
//	                <label  >File</label>
//	                <input type="file" name="image" id="exampleFile" />
//                
//	            <button type="submit">Upload Image</button>
//            </form> 
//      </Col>
//    </Row> 
     return( 
    	
		
	    <Page title="Recipes" breadcrumbs={[{ name: 'recipes', active: true }]}>
	      
	      <Row>
	        <Col md={12} sm={12} xs={12} className="mb-3">
		        <Editor
		         initialValue="<p>This is the initial content of the editor</p>"
		         init={{
		           height: 500,
		           menubar: false,
		           images_upload_handler: uploadPic,
		           plugins: [
		             'advlist autolink lists link image charmap print preview anchor',
		             'searchreplace visualblocks code fullscreen',
		             'insertdatetime media table paste code help wordcount'
		           ],
		           toolbar:
		             'undo redo | link image | formatselect | bold italic backcolor | \
		             alignleft aligncenter alignright alignjustify | \
		             bullist numlist outdent indent | removeformat | help'
		         }}
		         onEditorChange={handleEditorChange}
		       />
	        </Col>
	      </Row> 
	    </Page>
     			
    	 
     );
}
const enhancer= compose(
		  withAuthentication(fetch)
		);

export default enhancer(RecipePage);
