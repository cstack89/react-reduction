import React from 'react'; 
import {
  Col,
  Label,
  Row,
} from 'reactstrap';  

import RecipeCardColumn from 'components/cookbook/RecipeCardColumn';


class CookbookByCategory extends React.Component {


	render() {  
		return(
    	<div>
	    <Row> 
	        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
	        	<Label>Main Dish</Label>
	        </Col>
	      </Row>
	    <Row>
	        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
	        		<RecipeCardColumn filterCategory={true} requiredCategory={"Main Dish"} category={category} id={id} pictureURL={pictureURL} 
	        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
	        ))}
	     </Row>
	     <Row> 
	        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
	        	<Label>Appetizers</Label>
	        </Col>
	      </Row>
	    <Row>
	        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
	        		<RecipeCardColumn filterCategory={true} requiredCategory={"Appetizer"} category={category} id={id} pictureURL={pictureURL} 
	        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
	        ))}
	     </Row>
	     <Row> 
	        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
	        	<Label>Cookies</Label>
	        </Col>
	      </Row>
		    <Row>
		        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
		        		<RecipeCardColumn filterCategory={true} requiredCategory={"Cookies"} category={category} id={id} pictureURL={pictureURL} 
		        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
		        ))}
		     </Row>
	   
	    
	    <Row> 
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
        	<Label>Other Dessert</Label>
        </Col>
      </Row>
	    <Row>
	        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
	        		<RecipeCardColumn filterCategory={true} requiredCategory={"Other Dessert"} category={category} id={id} pictureURL={pictureURL} 
	        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
	        ))}
	     </Row>
   
    
	     
	     <Row> 
	        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
	        	<Label>Soup</Label>
	        </Col>
	      </Row>
		    <Row>
		        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
		        		<RecipeCardColumn filterCategory={true} requiredCategory={"Soup"} category={category} id={id} pictureURL={pictureURL} 
		        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
		        ))}
		     </Row>
	     <Row> 
	        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
	        	<Label>Breakfast</Label>
	        </Col>
	      </Row>
		    <Row>
		        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
		        		<RecipeCardColumn filterCategory={true} requiredCategory={"Breakfast"} category={category} id={id} pictureURL={pictureURL} 
		        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
		        ))}
		     </Row>
    
		     <Row> 
		        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
		        	<Label>Side Dish</Label>
		        </Col>
		      </Row>
			    <Row>
			        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
			        		<RecipeCardColumn filterCategory={true} requiredCategory={"Side Dish"} category={category} id={id} pictureURL={pictureURL} 
			        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
			        ))}
			     </Row>
    
			     <Row> 
			        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
			        	<Label>Cake</Label>
			        </Col>
			      </Row>
				    <Row>
				        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
				        		<RecipeCardColumn filterCategory={true} requiredCategory={"Cake"} category={category} id={id} pictureURL={pictureURL} 
				        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
				        ))}
				     </Row>
				     
				     <Row> 
				        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
				        	<Label>Pie</Label>
				        </Col>
				      </Row>
					    <Row>
					        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
					        		<RecipeCardColumn filterCategory={true} requiredCategory={"Pie"} category={category} id={id} pictureURL={pictureURL} 
					        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
					        ))}
					     </Row>
	    
					     
					     <Row> 
					        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
					        	<Label>Sauce</Label>
					        </Col>
					      </Row>
						    <Row>
						        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
						        		<RecipeCardColumn filterCategory={true} requiredCategory={"Sauce"} category={category} id={id} pictureURL={pictureURL} 
						        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
						        ))}
						     </Row>
						     
						     <Row> 
						        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
						        	<Label>Seasoning</Label>
						        </Col>
						      </Row>
							    <Row>
							        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
							        		<RecipeCardColumn filterCategory={true} requiredCategory={"Seasoning"} category={category} id={id} pictureURL={pictureURL} 
							        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
							        ))}
							     </Row>
							     
							     <Row> 
							        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
							        	<Label>Drinks</Label>
							        </Col>
							      </Row>
								    <Row>
								        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
								        		<RecipeCardColumn filterCategory={true} requiredCategory={"Drinks"} category={category} id={id} pictureURL={pictureURL} 
								        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
								        ))}
								     </Row>
	    
<Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
          	<Label>Uncategorized</Label>
          </Col>
        </Row>
	    <Row>
	        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
	        		<RecipeCardColumn filterCategory={true} requiredCategory={null} category={category} id={id} pictureURL={pictureURL} 
	        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
	        ))}
	      </Row>
	     
	      
	      
	      
	      
	    </div>);
	    
    		   
     			
    	 
	}
}
export default CookbookByCategory;
//export default CookbookPage;
