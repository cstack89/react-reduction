
import Page from 'components/Page';  
import RecipeCardColumn from 'components/cookbook/RecipeCardColumn';
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
import RecipeViewer from 'components/cookbook/RecipeViewer';
import RecipeEditor from 'components/cookbook/RecipeEditor';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from "react-router-dom";

const CookbookPage = (props ) => {
	const [recipes, setRecipes] = useState([]);
//	const {fetch : authFetch } = props;
	const { oidcUser, logout, events } = useReactOidc();
	const [ loadedUser, setLoadedUser ] = useState(null); 
	const [isOpen, setIsOpen] = useState(false);
	const [activeRecipe, setActiveRecipe] = useState(null);
	const [isEditing, setEditing] = useState(false);
	const [count,setCount] = useState(0);
	const {fetch : authFetch } = props;
	let history = useHistory();

	  const toggle = () => setIsOpen(!isOpen);
	  
	  React.useEffect(() => {
	    events.addUserLoaded(addUserEvent);
	    return () => {
	      events.removeUserLoaded(addUserEvent);
	    };
	  });
	  
	  const addUserEvent = user => { 
		  console.log("User Event.");
		  console.log(`********* User Loaded :${user.profile} *********`);
		  console.log(`********* oidcUser Loaded :${oidcUser.profile} *********`);
		  if(user !== null && user !== undefined) {
			  setLoadedUser(user.profile); 
		  }
		  
	  };
	  
	  React.useEffect(() => {
		  console.log("Params effect.");
		  if(props !== undefined) {
			  if(props.match !== undefined) {
				  if(props.match.params !== undefined) {
					  if(props.match.params.id !== undefined) {
						  if(activeRecipe === null) {
							  loadRecipe2(props.match.params.id);
						  }
						  
					  } else {
						  if(activeRecipe !== null) {
							  setActiveRecipe(null);
						  }
						 
					  }
				  }else {
					  if(activeRecipe !== null) {
						  setActiveRecipe(null);
					  }
				  }
			  } else {
				  if(activeRecipe !== null) {
					  setActiveRecipe(null);
				  }
			  }
			  
		  }
		
	   }, [props.match.params]);
	  
	//This effect is done once
	  React.useEffect(() => {
		  console.log("Single effect.");  
		  
		  if(props.oidcUser && props.oidcUser.profile) {
			  let blah = JSON.stringify(props.oidcUser.profile);
			  console.log(`********* Oidcuser2 :${blah} *********`);
			  setLoadedUser(props.oidcUser.profile);
		  }
		   
		   loadRecipes();
		
	   }, []);
	
 
	 
	 
     function loadRecipes() {
    	 
    	 authFetch('/merlinserver/cookbook/getrecipes')
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
	        		setRecipes(body);
	        	}
	        	
	        })
	        .catch(e => alert(e)); 

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
   
     
     
      
      function loadRecipe(e) { 
    	  history.push("/cookbook/"+e.currentTarget.getAttribute("data-recipe-id"));
      }
      
      function loadRecipe2(recipeID) { 
    	  console.log("Recipe id: "+recipeID);
    	  
    	  authFetch('/merlinserver/cookbook/loadfullrecipe/'+recipeID)
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
	        		setActiveRecipe(body); 
	        	}
	        	
	        })
	        .catch(e => alert(e));
      }
      
      
      function editRecipe(e) {
    	  setEditing(true);
      }
      
      function doneEditing() 
      {
    	  setEditing(false);
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
      			 category:null,
      			 description:"Enter your recipe description here.",
      			 additionalNotes:"Enter your notes here.",
      			 serves: null,
      			 prepTimeMin: null,
      			 activeTimeMin: null,
      			 totalTimeMin: null,
      			 source: null,
      			 sourceURL: null,
      			 ingredients: [{group: "Main Ingredients",
			            contents:  [ ]
			 		} ], 
      			 steps: null
       			 
      		};
      	 
      	setActiveRecipe(recipe);
      	setEditing(true);
      }
      function handleTagAdd(chipToAdd) {

    	let temp = activeRecipe;
    	temp.tags.push(chipToAdd);
    	setActiveRecipe(temp);
    	saveRecipe();
	  };
      
      function handleTagDelete(chipToDelete,index) {
//  	    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  		console.log("Delete tag: " + chipToDelete);
  		let temp = activeRecipe;
  		temp.tags.splice(index,1);
		 setActiveRecipe(temp);
		 setCount(count+1);
		 saveRecipe();
  	  };
  	  
  	function updateRating(rating) {
  
		 let temp = activeRecipe;
		 console.log("New Rating: " + rating);
		 temp.rating = rating;
		 setActiveRecipe(temp);
		 setCount(count+1);
		 saveRecipe();
	  };
	  
	  function saveRecipe() {
			 
	    	console.log(activeRecipe);
	    	authFetch("/merlinserver/cookbook/saverecipe", 
					 { 
				 		method: 'POST',
				 		body: JSON.stringify(activeRecipe), 
				 	    headers: { 
				 	        'Content-Type': 'application/json'
				 	    }
					 })
	        .then(
	      		  (response) => {
	      			  if (!response.ok) { 
	      				 
							 console.log(response.status);
							 console.log(response.statusText); 
	      	            }  
	      		  }, 
	      		  (error) => {
						 console.log(error); 
	      		  }
	        ).catch(function(error) {	    	 
		    	  console.log(error);
		      });
	    }
//	  <CardText className="recipe-card-text">
//    	{description}
//    </CardText>
     return( 
    		 activeRecipe 
    		?	  isEditing ? (<RecipeEditor recipe={activeRecipe} doneEditing={doneEditing} />) 
    				: (<RecipeViewer recipe={activeRecipe} editCallback={editRecipe} handleTagAdd={handleTagAdd}
    					handleTagDelete={handleTagDelete} updateRating={updateRating} magicCount={count} />)
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
			{recipes.map(({ id,pictureURL,title,category,rating }, index) => (
	        		<RecipeCardColumn  category={category} id={id} pictureURL={pictureURL} 
	        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
	        ))}
	      </Row>
	     
	    </Page>
	    
    		   
     			
    	 
     );
}
const enhancer= compose(
		  withAuthentication(fetch)
		);

export default enhancer(CookbookPage);
//export default CookbookPage;