
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
import RecipeViewer from 'components/cookbook/RecipeViewer';
import RecipeEditor from 'components/cookbook/RecipeEditor';
import RecipeCardColumn from 'components/cookbook/RecipeCardColumn';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from "react-router-dom";

const CookbookByCategoryPage = (props ) => {
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
    	  history.push("/cookbookbycategory/"+e.currentTarget.getAttribute("data-recipe-id"));
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
//	  
     return( 
    		 activeRecipe 
    		?	  isEditing ? (<RecipeEditor recipe={activeRecipe} doneEditing={doneEditing} />) 
    				: (<RecipeViewer recipe={activeRecipe} editCallback={editRecipe} handleTagAdd={handleTagAdd}
    					handleTagDelete={handleTagDelete} updateRating={updateRating} magicCount={count} />)
                 : 
		
	    <Page title="Cookbook" breadcrumbs={[{ name: 'cookbookbycategory', active: true }]}>
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
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
        	<Label>Main Dish</Label>
        </Col>
      </Row>
	    <Row>
	        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
	        		<RecipeCardColumn filterCategory={true} requiredCategory={"Main Dish"} category={category} id={id} pictureURL={pictureURL} 
	        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
	        ))}
	     </Row>
	     <Row> 
	        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
	        	<Label>Cookies</Label>
	        </Col>
	      </Row>
		    <Row>
		        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
		        		<RecipeCardColumn filterCategory={true} requiredCategory={"Cookies"} category={category} id={id} pictureURL={pictureURL} 
		        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
		        ))}
		     </Row>
	   
	    
	    <Row> 
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
        	<Label>Other Dessert</Label>
        </Col>
      </Row>
	    <Row>
	        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
	        		<RecipeCardColumn filterCategory={true} requiredCategory={"Other Dessert"} category={category} id={id} pictureURL={pictureURL} 
	        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
	        ))}
	     </Row>
   
    
	     
	     <Row> 
	        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
	        	<Label>Soup</Label>
	        </Col>
	      </Row>
		    <Row>
		        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
		        		<RecipeCardColumn filterCategory={true} requiredCategory={"Soup"} category={category} id={id} pictureURL={pictureURL} 
		        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
		        ))}
		     </Row>
	     <Row> 
	        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
	        	<Label>Breakfast</Label>
	        </Col>
	      </Row>
		    <Row>
		        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
		        		<RecipeCardColumn filterCategory={true} requiredCategory={"Breakfast"} category={category} id={id} pictureURL={pictureURL} 
		        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
		        ))}
		     </Row>
    
		     <Row> 
		        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
		        	<Label>Side Dish</Label>
		        </Col>
		      </Row>
			    <Row>
			        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
			        		<RecipeCardColumn filterCategory={true} requiredCategory={"Side Dish"} category={category} id={id} pictureURL={pictureURL} 
			        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
			        ))}
			     </Row>
    
			     <Row> 
			        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
			        	<Label>Cake</Label>
			        </Col>
			      </Row>
				    <Row>
				        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
				        		<RecipeCardColumn filterCategory={true} requiredCategory={"Cake"} category={category} id={id} pictureURL={pictureURL} 
				        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
				        ))}
				     </Row>
				     
				     <Row> 
				        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
				        	<Label>Pie</Label>
				        </Col>
				      </Row>
					    <Row>
					        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
					        		<RecipeCardColumn filterCategory={true} requiredCategory={"Pie"} category={category} id={id} pictureURL={pictureURL} 
					        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
					        ))}
					     </Row>
	    
					     
					     <Row> 
					        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
					        	<Label>Sauce</Label>
					        </Col>
					      </Row>
						    <Row>
						        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
						        		<RecipeCardColumn filterCategory={true} requiredCategory={"Sauce"} category={category} id={id} pictureURL={pictureURL} 
						        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
						        ))}
						     </Row>
						     
						     <Row> 
						        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
						        	<Label>Seasoning</Label>
						        </Col>
						      </Row>
							    <Row>
							        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
							        		<RecipeCardColumn filterCategory={true} requiredCategory={"Seasoning"} category={category} id={id} pictureURL={pictureURL} 
							        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
							        ))}
							     </Row>
							     
							     <Row> 
							        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
							        	<Label>Drinks</Label>
							        </Col>
							      </Row>
								    <Row>
								        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
								        		<RecipeCardColumn filterCategory={true} requiredCategory={"Drinks"} category={category} id={id} pictureURL={pictureURL} 
								        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
								        ))}
								     </Row>
	    
<Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
          	<Label>Uncategorized</Label>
          </Col>
        </Row>
	    <Row>
	        {recipes.map(({ id,pictureURL,title,category,rating }, index) => (
	        		<RecipeCardColumn filterCategory={true} requiredCategory={null} category={category} id={id} pictureURL={pictureURL} 
	        			title={title} rating={rating} index={index} loadRecipe={loadRecipe}/>
	        ))}
	      </Row>
	     
	      
	      
	      
	      
	    </Page>
	    
    		   
     			
    	 
     );
}
const enhancer= compose(
		  withAuthentication(fetch)
		);

export default enhancer(CookbookByCategoryPage);
//export default CookbookPage;
