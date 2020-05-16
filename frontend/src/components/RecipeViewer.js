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
import { useReactOidc,withOidcUser,OidcSecure } from '@axa-fr/react-oidc-context'; 


// tag::mediaframe[]
const RecipeViewer = (props) => {

	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const { oidcUser, logout, events } = useReactOidc();
	const [ loadedUser, setLoadedUser ] = useState(null); 
	
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
    	

        return (
        		
        		<Page title={props.recipe.title} breadcrumbs={[{ name: 'cookbook', active: true }]}>
			    <div>
			      <Navbar color="light" light expand="md"> 
			        <NavbarToggler onClick={toggle} />
			        <Collapse isOpen={isOpen} navbar>
			          <Nav className="mr-auto" navbar>
			          
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
							<img src={props.recipe.pictureURL} width="95"/>
						</div>
						<span >{props.recipe.description}</span> 
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
								<span className="info">{props.recipe.rating}</span>
							</li>
							<li>
								<span className="label">Source:</span>
								<a href={props.recipe.sourceURL} target="_blank">{props.recipe.source}</a>
							</li>
						</ul>
						<div className="recipe-ingredients"> 
							<h2>Ingredients</h2>
							{[...props.recipe.ingredients].map((entry) => {
							      return (
											<div>
											<h4>{entry[0]}</h4>
											<ul>   
											{entry[1].map(({ amount,measurement,ingredient }, index) => (
													<li>
														{amount} {measurement} {ingredient}
													</li>   
												))}	 
											
											</ul>
											</div>
										);
							    })}
							
						 
						</div>
						<div className="recipe-procedures"> 
							<h2>Directions</h2>
							<ol className="recipe-procedures-list">
								{props.recipe.steps.map((value, index) => (
									<li className="recipe-procedure"> 
										<div className="recipe-procedure-number"> {index} </div> 
										<div className="recipe-procedure-text">
											<p>
												{value}
											</p>
										</div> 
									</li>
							    ))}	 
							</ol>
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