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
import ChipInput from 'material-ui-chip-input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
	const [category, setCategory] = useState(props.recipe.category); 
	const [changeCount, setChangeCount] = useState(0);
	const [tagChangeCount, setTagChangeCount] = useState(0);
	const categories = ["Appetizer","Main Dish","Drinks","Breakfast","Side Dish","Sauce","Seasoning","Cookies","Cake","Pie","Other Dessert","Soup"];
	
	
	React.useEffect(() => {
//		setPictureURL(props.recipe.pictureURL);
		
	}, []);
	
	function saveRecipe() {
	 
    	let recipe = {
     			 id: props.recipe.id,
     			 title:title, 
     			 timeCreated: props.recipe.timeCreated, 
     			 lastMade: props.recipe.lastMade,
     			 rating:rating,
     			 tags:tags,
     			 category:category,
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
    	authFetch("/merlinserver/cookbook/saverecipe", 
				 { 
			 		method: 'POST',
			 		body: JSON.stringify(recipe), 
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
    	props.doneEditing();
    }
	
	function submitForm(e)   {
  	  e.preventDefault();
  	  const data = new FormData(e.target);
//  	  , 
//	 	    headers: { 
//	 	        'Content-Type': 'application/json'
//	 	    }
  	// This "fetch" manage more than the orginal fetch
		  authFetch('/merlinserver/cookbook/uploadPicture', 
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
		  authFetch('/merlinserver/cookbook/uploadPicture', 
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
    	const groupIndex = parseInt(event.currentTarget.getAttribute("data-ingredient-group-index"));
    	if(groupIndex !== undefined && groupIndex >= 0) {
    		let group = temp[groupIndex];
//    		console.log("Old group: "+ group.group);
    		group.group = event.target.value; 
    		temp[groupIndex] = group;
    		setIngredients(temp);
    		setChangeCount(changeCount+1);
    	}   	
    }
    
    function addIngredientSection(event) {
    	let temp = ingredients; 
    	temp.push({group: null,
	            contents:  [ ]
	 		});
    	setIngredients(temp);
    	   	
    }
    
    function removeIngredientSection(index) {
    	let temp = ingredients;
    	temp.splice(index,1);
    	setIngredients(temp);
    	setChangeCount(changeCount+1);
    }
    
    function addIngredient(index) {
    	let temp = ingredients; 
    	let group = temp[index]; 
    	group.contents.push({});
    	temp[index] = group;
    	setIngredients(temp);
    	setChangeCount(changeCount+1);
    	   	
    }
    
    function removeIngredient(index,innerIndex) {
    	let temp = ingredients;
    	let group = temp[index]; 
    	group.contents.splice(innerIndex,1);
    	temp[index] = group;
    	setIngredients(temp);
    	setChangeCount(changeCount+1);
    }
    
    
    
    
    function updateIngredientAmount(event) {
    	let temp = ingredients;
    	const groupIndex = parseInt(event.currentTarget.getAttribute("data-ingredient-group-index"));
    	const subGroupIndex = parseInt(event.currentTarget.getAttribute("data-ingredient-subgroup-index"));
    	 
		let group = temp[groupIndex]; 
		let row = group.contents[subGroupIndex];
		row.amount = event.target.value; 
		group.contents[subGroupIndex] = row;		
		temp[groupIndex] = group;
		setIngredients(temp);
		setChangeCount(changeCount+1);
    		   	
    }
    
    function updateIngredientMeasurement(event) {
    	let temp = ingredients;
    	const groupIndex = parseInt(event.currentTarget.getAttribute("data-ingredient-group-index"));
    	const subGroupIndex = parseInt(event.currentTarget.getAttribute("data-ingredient-subgroup-index"));
    	 
		let group = temp[groupIndex]; 
		let row = group.contents[subGroupIndex];
		row.measurement = event.target.value; 
		group.contents[subGroupIndex] = row;		
		temp[groupIndex] = group;
		setIngredients(temp);
		setChangeCount(changeCount+1);
    		   	
    }
    
    
    function updateIngredientIngredient(event) {
    	let temp = ingredients;
    	const groupIndex = parseInt(event.currentTarget.getAttribute("data-ingredient-group-index"));
    	const subGroupIndex = parseInt(event.currentTarget.getAttribute("data-ingredient-subgroup-index"));
    	 
		let group = temp[groupIndex]; 
		let row = group.contents[subGroupIndex];
		row.ingredient = event.target.value; 
		group.contents[subGroupIndex] = row;		
		temp[groupIndex] = group;
		setIngredients(temp);
		setChangeCount(changeCount+1);
    		   	
    }
    
    function handleTagDelete(chipToDelete,index) {
//	    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
		console.log("Delete tag: " + chipToDelete);
		let group = tags;
		group.splice(index,1);
		setTags(group); 
		setTagChangeCount(tagChangeCount+1); 
	  };
	  
	  function handleTagAdd(chipToDelete) {
//		    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
			console.log("Adding tag: " + chipToDelete);
			let group = tags;
			group.push(chipToDelete);
			setTags(group); 
		  };
		  
		  function handleCategoryChange(event) {
			  setCategory(event.target.value);
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
		      	<InputLabel htmlFor="titleInput">Title</InputLabel>
		      	<Input  name="titleInput" id="titleInput" placeholder="title placeholder" value={title} width="100%" style={{width:"100%"}}
		      		onChange={(event)=>{setTitle(event.target.value)}}/> 
		      </Col>
		      	<Col md={6} sm={6} xs={12} className="mb-3">
		        <form onSubmit={submitForm}> 
		             <div>
		                <label>Main Image</label>
		                <input type="file" name="image" id="exampleFile" />  
		                <button type="submit">Upload Image</button>
		            </div>
	            </form> 
	      </Col>
		    </Row> 
		    <Row>
		      <Col md={12} sm={12} xs={12} className="mb-3">
		      <ChipInput
				  label="Tags"
				  value={tags}
				  onAdd={handleTagAdd}
				  onDelete={handleTagDelete}
				/> 
		      </Col>
		    </Row>
		    <Row>
		    	
			    <Col md={6} sm={6} xs={12} className="mb-3">
			        <InputLabel htmlFor="descriptionInput">Description</InputLabel>
			      	<Input  name="descriptionInput" id="descriptionInput" placeholder="notes placeholder" multiline="true" value={description} 
			      	style={{width:"100%"}} onChange={(event)=>{setDescription(event.target.value)}}/> 
		        </Col>
		     <Col xl={2} lg={3} md={6} sm={6} xs={12} className="mb-3"> 
		      	<InputLabel htmlFor="sourceInput">Source</InputLabel>
		      	<Input  name="sourceInput" id="sourceInput" placeholder="source placeholder" value={source} 
		      		onChange={(event)=>{setSource(event.target.value)}}/> 
		      </Col>
		      <Col xl={2} lg={3} md={6} sm={6} xs={12} className="mb-3"> 
		      	<InputLabel htmlFor="sourceURLInput">URL</InputLabel>
		      	<Input type="url" name="sourceURLInput" id="sourceURLInput" placeholder="url placeholder" value={sourceURL} 
		      		onChange={(event)=>{setSourceURL(event.target.value)}}/> 
		      </Col>
		      <Col xl={2} lg={3} md={6} sm={6} xs={12} className="mb-3"> 
		      	<InputLabel htmlFor="ratingInput">Rating</InputLabel>
		      	<Rating name="ratingInput" id="ratingInput"
		          value={rating}
		      	inputProps={{'data-counter':tagChangeCount}}
		          onChange={(event, newValue) => {
		        	  setRating(newValue);
		          }}
		        /> 
		      </Col>
		     <Col xl={2} lg={3} md={6} sm={6} xs={12} className="mb-3"> 
		      	<InputLabel htmlFor="servesInput">Serves</InputLabel>
		      	<Input name="servesInput" id="servesInput" placeholder="serves placeholder" value={serves} 
		      		onChange={(event)=>{setServes(event.target.value)}}/> 
		      </Col>
		      <Col xl={2} lg={3} md={6} sm={6} xs={12} className="mb-3"> 
		      	<InputLabel htmlFor="prepInput">Prep Time</InputLabel>
		      	<Input name="prepInput" id="prepInput" placeholder="prep placeholder" value={prepTimeMin} 
		      		onChange={(event)=>{setPrepTimeMin(event.target.value)}}/> 
		      </Col>
	      	 <Col xl={2} lg={3} md={6} sm={6} xs={12} className="mb-3"> 
		      	<InputLabel htmlFor="activeInput">Active Time</InputLabel>
		      	<Input name="activeInput" id="activeInput" placeholder="active placeholder" value={activeTimeMin} 
		      		onChange={(event)=>{setActiveTimeMin(event.target.value)}}/> 
		      </Col>
		      <Col xl={2} lg={3} md={6} sm={6} xs={12} className="mb-3"> 
		      	<InputLabel htmlFor="totalInput">Total Time</InputLabel>
		      	<Input name="totalInput" id="totalInput" placeholder="total placeholder" value={totalTimeMin} 
		      		onChange={(event)=>{setTotalTimeMin(event.target.value)}}/> 
		      </Col>
		      	<Col xl={2} lg={3} md={6} sm={6} xs={12} className="mb-3"> 
		      	<InputLabel htmlFor="categoryInput">Category</InputLabel>
		      	<Select  value={category} onChange={handleCategoryChange}
	                input={<Input id="categoryInput" name="categoryInput" />}
	                
	              >
	               {categories.map(cat => (
	                 <MenuItem key={cat} value={cat} >
	                   {cat}
	                 </MenuItem>
	               ))}
	             </Select>
	             
		    
		      </Col>

    			
		       
		    </Row> 
		    <Row>
		        <Col md={12} sm={12} xs={12} className="mb-3">
		        <InputLabel >Ingredients</InputLabel>
			      {ingredients.map((value, index) => ( 
		    		  <ExpansionPanel expanded={expanded === value.group} onChange={handleChange(value.group)}>
				        <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header" >
				        	<Input  name={"groupInput"+index} id={"groupInput"+index} 
				        		inputProps={{'data-ingredient-group-index':index,'data-counter':changeCount}} placeholder="Group" 
				        		value={value.group} onChange={updateIngredientSection}/>  
				        	<Button onClick={addIngredientSection}>+</Button>
				        	<Button onClick={(event)=>{removeIngredientSection(index);}}>-</Button>
				        </ExpansionPanelSummary>
				        <ExpansionPanelDetails>
				        <div> 
							<ul>   
							{value.contents && value.contents.map(({ amount,measurement,ingredient }, innerIndex) => (
									<li>
										<Input  name={"amountInput"+"_"+index+"_"+innerIndex} id={"amountInput"+"_"+index+"_"+innerIndex} 
										inputProps={{'data-ingredient-group-index':index,'data-ingredient-subgroup-index':innerIndex,'data-counter':changeCount}}
										placeholder="Amount" value={amount} onChange={updateIngredientAmount}/> 
										<Input  name={"measurementInput"+"_"+index+"_"+innerIndex} 
											id={"measurementInput"+"_"+index+"_"+innerIndex} placeholder="Measurement" 
											inputProps={{'data-ingredient-group-index':index,'data-ingredient-subgroup-index':innerIndex,'data-counter':changeCount}}
											value={measurement} onChange={updateIngredientMeasurement}/> 
										<Input  name={"ingredientInput"+"_"+index+"_"+innerIndex} 
											id={"ingredientInput"+"_"+index+"_"+innerIndex} placeholder="Ingredient" 
											inputProps={{'data-ingredient-group-index':index,'data-ingredient-subgroup-index':innerIndex,'data-counter':changeCount}}
											value={ingredient} onChange={updateIngredientIngredient}/> 
										<Button onClick={()=>{removeIngredient(index,innerIndex);}}>-</Button> 
							      		 
									</li>   
								))
							}
							<li>
								<Button onClick={()=>{addIngredient(index);}}>+</Button> 
							</li>  
							 
							
							</ul>
						</div>
				        </ExpansionPanelDetails>
				      </ExpansionPanel> 
				    ))}
		        </Col>
	        </Row>
		    <Row>
		        <Col md={12} sm={12} xs={12} className="mb-3">
		        <InputLabel htmlFor="notesInput">Notes</InputLabel>
		      	<Input  name="notesInput" id="notesInput" placeholder="notes placeholder" multiline="true" value={additionalNotes} 
		      		style={{width:"100%"}} onChange={(event)=>{setAdditionalNotes(event.target.value)}}/> 
		        </Col>
	        </Row>
		    
		    <Row>
		        <Col md={12} sm={12} xs={12} className="mb-3">
		        <Editor
		         value={steps}
		         initialValue={steps}
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