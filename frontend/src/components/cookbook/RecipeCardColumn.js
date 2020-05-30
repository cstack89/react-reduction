import {
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from 'reactstrap';  
import Rating from '@material-ui/lab/Rating';
const React = require('react'); 


class RecipeCardColumn extends React.Component {

    	
   render() {  

           if(this.props.filterCategory) {
	        	 if(this.props.requiredCategory === this.props.category) {
	      			 
	      			 return (
	  					 <Col key={this.props.index} xl={4} lg={6} md={6} sm={12} xs={12} className="mb-3">
	  			          	
	  			            <Card className="flex-row" tag="a" data-recipe-id={this.props.id} onClick={this.props.loadRecipe} 
	  			            	style={{ cursor: "pointer", height:"160px"}}>
	  				            <CardImg
	  				              className="card-img-left"
	  				              src={this.props.pictureURL}
	  				              style={{ width: 'auto', height: 150 }}
	  				            />
	  				            <CardBody>
	  				              <CardTitle className="recipe-card-title">{this.props.title}</CardTitle>
	  				              <Rating name="ratingInput" id="ratingInput" size="small" value={this.props.rating} readOnly/>  
	  				              <CardText className="recipe-card-text">
	  				                Category: {this.props.category}
	  				              </CardText>
	  				            </CardBody>
	  				          </Card>
	  			          </Col>
	      			 );
	      		} else {
	      			return( null );
	  	        }	
           } else if(this.props.filterRating) {
        	   if(this.props.requiredRating === this.props.rating) {
	      			 
	      			 return (
	  					 <Col key={this.props.index} xl={4} lg={6} md={6} sm={12} xs={12} className="mb-3">
	  			          	
	  			            <Card className="flex-row" tag="a" data-recipe-id={this.props.id} onClick={this.props.loadRecipe} 
	  			            	style={{ cursor: "pointer", height:"160px"}}>
	  				            <CardImg
	  				              className="card-img-left"
	  				              src={this.props.pictureURL}
	  				              style={{ width: 'auto', height: 150 }}
	  				            />
	  				            <CardBody>
	  				              <CardTitle className="recipe-card-title">{this.props.title}</CardTitle>
	  				              <Rating name="ratingInput" id="ratingInput" size="small" value={this.props.rating} readOnly/>  
	  				              <CardText className="recipe-card-text">
	  				                Category: {this.props.category}
	  				              </CardText>
	  				            </CardBody>
	  				          </Card>
	  			          </Col>
	      			 );
	      		} else {
	      			return( null );
	  	        }
           } else {
        	   return (
	  					 <Col key={this.props.index} xl={4} lg={6} md={6} sm={12} xs={12} className="mb-3">
	  			          	
	  			            <Card className="flex-row" tag="a" data-recipe-id={this.props.id} onClick={this.props.loadRecipe} 
	  			            	style={{ cursor: "pointer", height:"160px"}}>
	  				            <CardImg
	  				              className="card-img-left"
	  				              src={this.props.pictureURL}
	  				              style={{ width: 'auto', height: 150 }}
	  				            />
	  				            <CardBody>
	  				              <CardTitle className="recipe-card-title">{this.props.title}</CardTitle>
	  				              <Rating name="ratingInput" id="ratingInput" size="small" value={this.props.rating} readOnly/>  
	  				              <CardText className="recipe-card-text">
	  				                Category: {this.props.category}
	  				              </CardText>
	  				            </CardBody>
	  				          </Card>
	  			          </Col>
	      			 );
           }
    		
    }
}

export default RecipeCardColumn;