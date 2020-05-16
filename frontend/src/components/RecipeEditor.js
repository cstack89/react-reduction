import Page from 'components/Page';
import React, { useState,useCallback } from 'react'; 
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
import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';
import { useReactOidc,withOidcUser,OidcSecure } from '@axa-fr/react-oidc-context'; 
import { compose, withProps,lifecycle } from 'recompose';
import { Editor } from '@tinymce/tinymce-react';
import Input from '@material-ui/core/Input'; 
import InputLabel from '@material-ui/core/InputLabel'; 
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
	  root: {
	    width: '100%',
	  },
	  heading: {
	    fontSize: theme.typography.pxToRem(15),
	    flexBasis: '33.33%',
	    flexShrink: 0,
	  },
	  secondaryHeading: {
	    fontSize: theme.typography.pxToRem(15),
	    color: theme.palette.text.secondary,
	  },
	}));

// tag::mediaframe[]
const RecipeEditor = (props) => {
	
	const classes = useStyles();
	  const [expanded, setExpanded] = React.useState(false);

	  const handleChange = (panel) => (event, isExpanded) => {
	    setExpanded(isExpanded ? panel : false);
	  };

	const {fetch : authFetch } = props;
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const { oidcUser, logout, events } = useReactOidc();   
	const [pictureURL, setPictureURL] = useState(props.recipe.pictureURL);
	const [title, setTitle] = useState(props.recipe.title);
	const [rating, setRating] = useState(props.recipe.rating);
	const [tags, setTags] = useState(props.recipe.tags);
	const [description, setDescription] = useState(props.recipe.description);
	const [additionalNotes, setAdditionalNotes] = useState(props.recipe.additionalNotes);
	const [serves, setServes] = useState(props.recipe.serves);
	const [prepTimeMin, setPrepTimeMin] = useState(props.recipe.prepTimeMin);
	const [activeTimeMin, setActiveTimeMin] = useState(props.recipe.activeTimeMin);
	const [totalTimeMin, setTotalTimeMin] = useState(props.recipe.totalTimeMin);
	const [source, setSource] = useState(props.recipe.source);
	const [sourceURL, setSourceURL] = useState(props.recipe.sourceURL);
	const [ingredients, setIngredients] = useState(props.recipe.ingredients);
	const [steps, setSteps] = useState(props.recipe.steps);
	
	
	
	
	React.useEffect(() => {
//		setPictureURL(props.recipe.pictureURL);
		
	}, []);
	
	function saveRecipe() {
		console.log(steps);
		console.log(pictureURL);
    	let recipe = {
     			 id: props.recipe.id,
     			 title:title, 
     			 timeCreated: props.recipe.timeCreated, 
     			 lastMade: props.recipe.lastMade,
     			 rating:rating,
     			 tags:tags,
     			 pictureURL:pictureURL,
     			 description:description,
     			 additionalNotes:additionalNotes,
     			 serves: serves,
     			 prepTimeMin: prepTimeMin,
     			 activeTimeMin: activeTimeMin,
     			 totalTimeMin: totalTimeMin,
     			 source: source,
     			 sourceURL: sourceURL,
     			 ingredients: ingredients, 
     			 steps: steps
      			 
     		};
    	console.log(recipe);
    }
	
	function submitForm(e)   {
  	  e.preventDefault();
  	  const data = new FormData(e.target);
//  	  , 
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
	            	 return response.text();
	            	
	            }
	        }) .then(function(body) {
	        	if(body !== undefined) {
	        		console.log( body); 
	        		setPictureURL(body);
	        	}
	        	
	        })
	        .catch(e => alert(e));
    }
    
    function uploadPic(blobInfo, success, failure)   {
  	 let  data = new FormData();
  	    data.append('image', blobInfo.blob(), blobInfo.filename());
  	   
//  	  , 
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
    	
    function updateIngredientSection(event) {
    	let temp = ingredients;
    	const group = event.currentTarget.getAttribute("data-ingredient-group");
    	let inner = temp.get(group);
    	temp.delete(group);
    	temp.set(event.target.value,inner);
    	setIngredients(temp);
    }
 
 

    return (
        		
        <Page title="Recipe Editor" breadcrumbs={[{ name: 'cookbook', active: true }]}>
	      <div>
		      <Navbar color="light" light expand="md"> 
		        <NavbarToggler onClick={toggle} />
		        <Collapse isOpen={isOpen} navbar>
		          <Nav className="mr-auto" navbar>
		          
		        	  <NavItem>
		        	  
		  	        	  <NavItem>
		              		<NavLink  onClick ={saveRecipe}>Save Recipe</NavLink>
		  	              </NavItem>
		  	               
		              </NavItem>
		               
		          </Nav> 
		        </Collapse>
		      </Navbar>
		    </div>
	        <Row>
		      <Col md={6} sm={6} xs={12} className="mb-3">
			        <form onSubmit={submitForm}> 
			             
			                <label>Main Image</label>
			                <input type="file" name="image" id="exampleFile" />
		                
			            <button type="submit">Upload Image</button>
		            </form> 
		      </Col>
		    </Row> 
		    <Row>
		      <Col lg={3} md={6} sm={6} xs={12} className="mb-3"> 
		      	<InputLabel htmlFor="titleInput">Title</InputLabel>
		      	<Input  name="titleInput" id="titleInput" placeholder="title placeholder" value={title} 
		      		onChange={(event)=>{setTitle(event.target.value)}}/> 
		      </Col>
		      <Col lg={3} md={6} sm={6} xs={12} className="mb-3"> 
		      	<InputLabel htmlFor="sourceURLInput">URL</InputLabel>
		      	<Input type="url" name="sourceURLInput" id="sourceURLInput" placeholder="url placeholder" value={sourceURL} 
		      		onChange={(event)=>{setSourceURL(event.target.value)}}/> 
		      </Col>
		      <Col lg={3} md={6} sm={6} xs={12} className="mb-3"> 
		      	<InputLabel htmlFor="ratingInput">rating</InputLabel>
		      	<Rating name="ratingInput" id="ratingInput"
		          value={rating}
		          onChange={(event, newValue) => {
		        	  setRating(newValue);
		          }}
		        /> 
		      </Col>
		      <Col lg={6} md={6} sm={6} xs={12} className="mb-3"> 
		      
			      
			      {[...props.recipe.ingredients].map((entry,index) => {
				      return (
				    		  <ExpansionPanel expanded={expanded === entry[0]} onChange={handleChange(entry[0])}>
						        <ExpansionPanelSummary
						          expandIcon={<ExpandMoreIcon />}
						          aria-controls="panel1bh-content"
						          id="panel1bh-header"
						        >
						        	<Input  name="groupInput"index id="groupInput"index data-ingredient-group={entry[0]} placeholder="Group" value={entry[0]}
						        		onChange={updateIngredientSection}/>  
						        </ExpansionPanelSummary>
						        <ExpansionPanelDetails>
						        <div> 
									<ul>   
									{entry[1] && entry[1].map(({ amount,measurement,ingredient }, innerIndex) => (
											<li>
												<Input  name="amountInput"innerIndex id="amountInput"innerIndex placeholder="Amount" value={amount} /> 
												<Input  name="measurementInput"innerIndex id="measurementInput"innerIndex placeholder="Measurement" value={measurement} /> 
												<Input  name="ingredientInput"innerIndex id="ingredientInput"innerIndex placeholder="Ingredient" value={ingredient} /> 
									      		 
											</li>   
										))
									}
									 
									
									</ul>
								</div>
						        </ExpansionPanelDetails>
						      </ExpansionPanel>
				    		  
				    		  
				    		  
				    		  
								
							);
				    })}
		      </Col>
		      	
		      	
		      	
		      	  
		    </Row> 
		    
		    
		    <Row>
		        <Col md={12} sm={12} xs={12} className="mb-3">
		        <Editor
		         value={steps}
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
		         onEditorChange={(content, editor)=>{setSteps(content)}}
		       />
		        </Col>
	        </Row>
			     
	     </Page>
        		
        	 
        
    );
        
}
const enhancer= compose(
		  withAuthentication(fetch)
		);
export default enhancer(RecipeEditor);
  //end::mediaframe[]  