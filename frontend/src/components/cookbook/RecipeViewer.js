import Page from 'components/Page';
import IngredientComponent from './IngredientComponent';
import React, { useState,useEffect } from 'react'; 
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
import { useReactOidc,withOidcUser,OidcSecure } from '@axa-fr/react-oidc-context'; 
import Rating from '@material-ui/lab/Rating';
import ChipInput from 'material-ui-chip-input';
import NoSleep from 'nosleep.js';


 
// tag::mediaframe[]
const RecipeViewer = (props) => { 
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const { oidcUser, logout, events } = useReactOidc();
	const [loadedUser, setLoadedUser ] = useState(null); 
	const [cooking,setCooking] = useState(false);
	const [hours,setHours]= useState(0);
	const [minutes,setMinutes]=useState(0);
	const [seconds,setSeconds]=useState(0);
	const noSleep = new NoSleep();
	
	useEffect(() => {
	    let interval = null;
	    if (cooking) {
	      interval = setInterval(() => {
	    	  let tempSeconds = seconds + 1;
	    	  if(tempSeconds === 60) {
	    		  tempSeconds = 0;
	    		  let tempMinutes = minutes + 1;
	    		  if(tempMinutes === 60) {
	    			  tempMinutes = 0;
	    			  setHours(hours + 1);
	    		  }
	    		  setMinutes(tempMinutes);
	    	  }
	        setSeconds(tempSeconds);
	      }, 1000);
	    } else if (!cooking && (seconds !== 0 || minutes !== 0)) {
	    	setSeconds(0);
	    	setMinutes(0);
	    	setHours(0);
	      clearInterval(interval);
	    }
	    return () => clearInterval(interval);
	  }, [cooking, seconds,minutes,hours]);
	
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
	React.useEffect(() => {
		if(props.oidcUser && props.oidcUser.profile) {
			   
			  setLoadedUser(props.oidcUser.profile);
		  }
	 
					
	}, []);
	
	function startCooking() {
		noSleep.enable();
		setCooking(true);
	}
	function stopCooking() {
		noSleep.disable();
		setCooking(false);
	}
    	

        return (
        		
        		<Page title={props.recipe.title} breadcrumbs={[{ name: 'cookbook', active: true }]}>
			    <div>
			      <Navbar color="light" light expand="md"> 
			        <NavbarToggler onClick={toggle} />
			        <Collapse isOpen={isOpen} navbar>
			          <Nav className="mr-auto" navbar>
			          	{cooking ? 
			        	  (
			        	<div>		  
			        	<NavItem>
			          		<NavLink  onClick={stopCooking}>Stop Cooking</NavLink>
			              </NavItem> 
			              	<Label>{hours}:{minutes}:{seconds}</Label> 
			              	</div>
			        	  ) :
			            	  (<NavItem>
				          		<NavLink  onClick={startCooking}>Start Cooking</NavLink>
					           </NavItem>
			            	)
			              } 
			        	  <NavItem>
			        	  {loadedUser && 
				        	  <NavItem>
			              		<NavLink  onClick ={props.editCallback}>Edit Recipe</NavLink>
				              </NavItem>
				              } 
			              </NavItem>
			              
			               
			          </Nav> 
			        </Collapse>
			      </Navbar>
			    </div>
		 
			    <Row>
		        <Col md={12} sm={12} xs={12} className="mb-3">
		        <Card>
			      <CardBody> 
				     <div className="recipe_top">
						<div> 
							<img src={props.recipe.pictureURL} width="50%"/>
						</div>
						<span >{props.recipe.description}</span> 
					</div>
					 <div >
					 
					 {loadedUser ? (
							 <ChipInput
							  label="Tags"
							  value={props.recipe.tags}
							  onAdd={props.handleTagAdd}
							  onDelete={props.handleTagDelete}
							/> 
				          ) : 
						(
								<ChipInput
								 label="Tags"
								  value={props.recipe.tags}
								  readOnly="true"
								/>
						)
				     }
					 			 
					</div>
					
					
					
					<div className="recipe_wrapper"> 
						<ul className="recipe_about">
							<li>
								<span className="label">Yield:</span>
								<span className="info">{props.recipe.serves}</span>
							</li>
							<li>
								<span className="label">Prep Time:</span>
								<span className="info">{props.recipe.prepTimeMin}</span>
							</li>
							<li>
								<span className="label">Active Time:</span>
								<span className="info">{props.recipe.activeTimeMin}</span>
							</li>
							<li>
								<span className="label">Total Time:</span>
								<span className="info">{props.recipe.totalTimeMin}</span>
							</li>
							<li>
								<span className="label">Rating:</span>
								{loadedUser ? (
									<Rating name="ratingInput" id="ratingInput" size="small"
							          value={props.recipe.rating} onChange={(event, newValue) => {
							        	  props.updateRating(newValue);
							          }}/>
							          ) : 
									(
									<Rating name="ratingInput" id="ratingInput" size="small"
							          value={props.recipe.rating} readOnly/>
									)
							     }
								
							</li>
							<li>
								<span className="label">Source:</span>
								<a href={props.recipe.sourceURL} target="_blank">{props.recipe.source}</a>
							</li>
							<li>
								<span className="label">Category:</span>
								<span className="info">{props.recipe.category}</span>
							</li>
						</ul>
						<div className="recipe-ingredients"> 
							<h2>Ingredients</h2>
							{props.recipe.ingredients.map((value, index) => (
									<div>
									<h4>{value.group}</h4>
									<ul>   
									{value.contents.map(({ amount,measurement,ingredient }, index) => (
											<IngredientComponent amount={amount} measurement={measurement} ingredient={ingredient}/>
											
										 
										))}	 
									
									</ul>
									</div>
							    ))}
						 
						</div>
						<div className="recipe-procedures"> 
							<h2>Directions</h2>
							<div className="content" dangerouslySetInnerHTML={{__html: props.recipe.steps}}></div> 
						</div>
					</div>
					
					<div className="recipe-bottom"> 
						<h2>Notes</h2>
						<span className="info">{props.recipe.additionalNotes}</span> 
					</div>
			      </CardBody>
			    </Card>
		        </Col>
		        </Row>
			     
			    </Page> 	 
        
        );
        
    }

export default withOidcUser(RecipeViewer);
  //end::mediaframe[]  