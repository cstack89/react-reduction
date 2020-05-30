
import MathJax from 'react-mathjax-preview';
const Fraction = require('fractional').Fraction;
const React = require('react');
const math = require('mathjs');




//tag::mediaframe[] 
class IngredientComponent extends React.Component {

    	constructor() {
            super();
            this.getText = this.getText.bind(this);
        }
    	
    	getText(newAmount,measurement, ingredient) {
    		let tempStr = newAmount.toString();
    		let ind = tempStr.indexOf(".");
    		if(ind < 0) {
    			return tempStr + " " +measurement +  " " + ingredient;;
    		} 
    		let whole = 0;
    		let decimal = 0.0;
    		if(ind > 0) {
    			 whole = parseInt(tempStr.substring(0,ind));
        		 decimal = parseFloat(tempStr.substring(ind));
    		} else {
    			decimal = parseFloat(tempStr);
    		}
    		
    		 
			let newAmountStr = "";
			if(decimal > .32 && decimal < .34) {
				let temp = math.fraction(1,3);
				temp = math.add(whole, temp);
				console.log(temp); 
				newAmountStr= temp.toLatex(true);
				
			} else if(decimal > .65 && decimal < .67) {
				let temp = math.fraction(2,3);
				temp = math.add(whole, temp);
				console.log(temp); 
				newAmountStr= temp.toLatex(true);
			} else {
				let temp = math.fraction(newAmount); 
				newAmountStr= temp.toLatex(true);
			}
			newAmountStr = '$'+newAmountStr+"$ "+measurement +  " " + ingredient;
			console.log(newAmountStr);
			
			
			return  newAmountStr;
    	}
         
    	
   render() {  

           
    		if(this.props.amount) {
    			let newAmount = this.getText(this.props.amount,this.props.measurement,this.props.ingredient);
    			
    			 return (
    					 <li>
    					 	<MathJax math={newAmount} />  
						</li>
    			 );
    		} else {
    			return(
    			<li>
					{this.props.amount} {this.props.measurement} {this.props.ingredient}  
				</li>  );
	        }	
    }
}

export default IngredientComponent;
  //end::mediaframe[]  