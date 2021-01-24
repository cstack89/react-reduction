import React from 'react'; 
import {
  Col,
  Label,
  Row,
} from 'reactstrap';  

import RecipeCardColumn from 'components/cookbook/RecipeCardColumn';


class CookbookByRating extends React.Component {


	render() {  
		return(
    	<div>
    	<Row> 
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
        	<Label>Unrated</Label>
        </Col>
      </Row>
	    <Row>
	        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
	        		<RecipeCardColumn filterRating={true} requiredRating={0} category={category} id={id} pictureURL={pictureURL} 
	        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
	        ))}
	     </Row>
	    <Row> 
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
        	<Label>5*</Label>
        </Col>
      </Row>
	    <Row>
	        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
	        		<RecipeCardColumn filterRating={true} requiredRating={5} category={category} id={id} pictureURL={pictureURL} 
	        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
	        ))}
	     </Row>
	     <Row> 
	        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
	        	<Label>4*</Label>
	        </Col>
	      </Row>
		    <Row>
		        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
		        		<RecipeCardColumn filterRating={true} requiredRating={4} category={category} id={id} pictureURL={pictureURL} 
		        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
		        ))}
		     </Row>
	   
	    
	    <Row> 
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
        	<Label>3*</Label>
        </Col>
      </Row>
	    <Row>
	        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
	        		<RecipeCardColumn filterRating={true} requiredRating={3} category={category} id={id} pictureURL={pictureURL} 
	        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
	        ))}
	     </Row>
   
    
	     <Row> 
	        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
	        	<Label>2*</Label>
	        </Col>
	      </Row>
		    <Row>
		        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
		        		<RecipeCardColumn filterRating={true} requiredRating={2} category={category} id={id} pictureURL={pictureURL} 
		        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
		        ))}
		     </Row>
    
		     <Row> 
		        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
		        	<Label>1*</Label>
		        </Col>
		      </Row>
			    <Row>
			        {this.props.recipes.map(({ id,pictureURL,title,category,rating }, index) => (
			        		<RecipeCardColumn filterRating={true} requiredRating={1} category={category} id={id} pictureURL={pictureURL} 
			        			title={title} rating={rating} index={index} loadRecipe={this.props.loadRecipe}/>
			        ))}
			     </Row>
	     
	      
	      
	      
	      
	    </div>);
	    
    		   
     			
    	 
	}
}
export default CookbookByRating;
//export default CookbookPage;
