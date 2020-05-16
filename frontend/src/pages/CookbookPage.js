
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
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';  
import MaterialTable from 'material-table';
import { compose, withProps,lifecycle } from 'recompose';
import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';
import { useReactOidc,withOidcUser,OidcSecure } from '@axa-fr/react-oidc-context'; 
import { Editor } from '@tinymce/tinymce-react';
import RecipeViewer from 'components/RecipeViewer';
import RecipeEditor from 'components/RecipeEditor';

const CookbookPage = (props ) => {
	const [recipes, setRecipes] = useState([]);
//	const {fetch : authFetch } = props;
	const { oidcUser, logout, events } = useReactOidc();
	const [ loadedUser, setLoadedUser ] = useState(null); 
	const [isOpen, setIsOpen] = useState(false);
	const [activeRecipe, setActiveRecipe] = useState(null);
	const [isEditing, setEditing] = useState(false);

	  const toggle = () => setIsOpen(!isOpen);
	  
	  React.useEffect(() => {
	    events.addUserLoaded(addUserEvent);
	    return () => {
	      events.removeUserLoaded(addUserEvent);
	    };
	  });
	  
	  const addUserEvent = user => { 
		  console.log(`********* User Loaded :${user.profile} *********`);
		  console.log(`********* oidcUser Loaded :${oidcUser.profile} *********`);
		  if(user !== null && user !== undefined) {
			  setLoadedUser(user.profile); 
		  }
		  
	  };
	  
	//This effect is done once
	  React.useEffect(() => {
		  
		  
		  if(props.oidcUser && props.oidcUser.profile) {
			  let blah = JSON.stringify(props.oidcUser.profile);
			  console.log(`********* Oidcuser2 :${blah} *********`);
			  setLoadedUser(props.oidcUser.profile);
		  }
		   
		   loadRecipes();
		
	   }, []);
	
 
	
	 
     function loadRecipes() {
    	 let localRecipes = [];
//    	 How do we show ingredient and step groups?
    	 
    	 //TODO replace with fetch
    	 let recipe = {
    			 id: "d4ca3b9c-9c92-4d2f-923f-31a7d893140f",
    			 title:"My First Recipe", 
    			 timeCreated:1585734654000, 
    			 lastMade:1588153854000,
    			 rating:4,
    			 tags:["main dish","quick","crockpot"],
    			 pictureURL:"merlinserver/retrievepicture/lizer_cookie.jpg",
    			 description:"Here is a description of my recipe.",
    			 additionalNotes:"Things to note.",
    			 serves: 4,
    			 prepTimeMin: 20,
    			 activeTimeMin: 50,
    			 source: "Sally",
    			 sourceURL: "https://sally.com",
    			 ingredients: [{amount:1, measurement:"tsp",ingredient:"love"},{amount:2, measurement:"cups",ingredient:"attention"}],
    			 steps: ["Whisk the stuff","Bake"]
     			 
    			 
    				 };
    	 localRecipes.push(recipe);
    	 setRecipes(localRecipes);
     }
	
	 
 
      function submitForm(e)   {
    	  e.preventDefault();
    	  const data = new FormData(e.target);
//    	  , 
//	 	    headers: { 
//	 	        'Content-Type': 'application/json'
//	 	    }
    	// This "fetch" manage more than the orginal fetch
		  fetch('/merlinserver/uploadPicture', 
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
		  fetch('/merlinserver/uploadPicture', 
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
      
      function loadRecipe(e) {
    	  const recipeID = e.currentTarget.getAttribute("data-recipe-id");
    	  console.log("Recipe id: "+recipeID);
    	  
    	//TODO replace with fetch
     	 let recipe = {
     			 id: "d4ca3b9c-9c92-4d2f-923f-31a7d893140f",
     			 title:"My First Recipe", 
     			 timeCreated:1585734654000, 
     			 lastMade:1588153854000,
     			 rating:4,
     			 tags:["main dish","quick","crockpot"],
     			 pictureURL:"merlinserver/retrievepicture/lizer_cookie.jpg",
     			 description:"Here is a description of my recipe.",
     			 additionalNotes:"Things to note.",
     			 serves: 4,
     			 prepTimeMin: 20,
     			 activeTimeMin: 50,
     			 totalTimeMin: 240,
     			 source: "Sally",
     			 sourceURL: "https://sally.com",
     			 ingredients: new Map([
     				  ["Crust", [
          				 {amount:1, measurement:"tsp",ingredient:"crust love"},
         				 {amount:2, measurement:"cups",ingredient:"crust attention"}
         				 ]],
     				  ["Pie", [
          				 {amount:1, measurement:"tsp",ingredient:"love"},
         				 {amount:2, measurement:"cups",ingredient:"attention"}
         				 ]]
     				]), 
     			 steps: ["Whisk the stuff","Bake"]
      			 
     		};
     	 
     	setActiveRecipe(recipe);
      }
      
      function editRecipe(e) {
    	  setEditing(true);
      }
      
      function addRecipe() {
    	  console.log("Should be adding recipe");
    	  let recipe = {
      			 id: null,
      			 title:"New Recipe", 
      			 timeCreated: Date.now(), 
      			 lastMade: null,
      			 rating:0,
      			 tags:[],
      			 pictureURL:null,
      			 description:"Enter your recipe description here.",
      			 additionalNotes:"Enter your notes here.",
      			 serves: null,
      			 prepTimeMin: null,
      			 activeTimeMin: null,
      			 totalTimeMin: null,
      			 source: null,
      			 sourceURL: null,
      			 ingredients: new Map([ ]), 
      			 steps: null
       			 
      		};
      	 
      	setActiveRecipe(recipe);
      	setEditing(true);
      }
      
      
     return( 
    		 activeRecipe 
    		?	  isEditing ? (<RecipeEditor recipe={activeRecipe}   />) 
    				: (<RecipeViewer recipe={activeRecipe} editCallback={editRecipe}  />)
                 : 
		
	    <Page title="Cookbook" breadcrumbs={[{ name: 'cookbook', active: true }]}>
	    <div>
	      <Navbar color="light" light expand="md"> 
	        <NavbarToggler onClick={toggle} />
	        <Collapse isOpen={isOpen} navbar>
	          <Nav className="mr-auto" navbar>
	          {loadedUser && 
	        	  <NavItem>
              		<NavLink  onClick={addRecipe}>Add Recipe</NavLink>
	              </NavItem>
	              } 
	          </Nav> 
	        </Collapse>
	      </Navbar>
	    </div>
 
	    
			<Row>
	        {recipes.map(({ id,pictureURL,title,description }, index) => (
	          <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
	        
	            <Card className="flex-row" tag="a" data-recipe-id={id} onClick={loadRecipe} style={{ cursor: "pointer" }}>
		            <CardImg
		              className="card-img-left"
		              src={pictureURL}
		              style={{ width: 'auto', height: 150 }}
		            />
		            <CardBody>
		              <CardTitle>{title}</CardTitle>
		              <CardText>
		              	{description}
		              </CardText>
		            </CardBody>
		          </Card>
	          </Col>
	          
	          
	        ))}
	      </Row>
	     
	    </Page>
	    
    		   
     			
    	 
     );
}
const enhancer= compose(
		  withAuthentication(fetch)
		);

export default withOidcUser(CookbookPage);
//export default CookbookPage;
