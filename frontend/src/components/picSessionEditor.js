import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'; 
import FormHelperText from '@material-ui/core/FormHelperText';
import {
	  Button,
	  ButtonGroup,
	  Card,
	  CardBody,
	  CardHeader,
	  Col,
	  Modal,
	  ModalBody,
	  ModalFooter,
	  ModalHeader,
	  Row,
	} from 'reactstrap';
const React = require('react');

const useStyles = makeStyles(theme => ({
	  root: {
	    display: 'flex',
	    flexWrap: 'wrap',
	  },
	  formControl: {
// margin: theme.spacing(1),
	    minWidth: 120,
	  },
	  selectEmpty: {
// marginTop: theme.spacing(2),
	  },
	}));

 
 
// const classes = useStyles();

// tag::picSessionEditor[]
class PictureSessionEditor extends React.Component {

	 
	
    	constructor() {
            super();
            this.state = { musthave: [],
            		mustHaveSource: [],
            		boosted: [],
            		boostedSource: [],
            		deboosted: [],
            		deboostedSource: [],
            		missing: [],
            		missingSource: [],
            		tags: [] };
            
  
            this.getTags = this.getTags.bind(this); 
            this.handleMustHaveChange  = this.handleMustHaveChange.bind(this);  
            this.handleBoostedChange  = this.handleBoostedChange.bind(this); 
            this.handleDeboostedChange  = this.handleDeboostedChange.bind(this);  
            this.handleMissingChange  = this.handleMissingChange.bind(this); 
            
            this.onSubmit  = this.onSubmit.bind(this);  
        }
    	
    	 componentDidMount() {
    		 this.getTags();
    		 
    		
    	 }
    	 
    	 componentWillUnmount() {
    		 
    	 }
    	 
        
        
    	 getTags() {
    			fetch("/zuulmerlinserver/getPictureTags", { credentials: 'same-origin' })
                .then(
              		  (response) => {
              			  if (!response.ok) { 
              				 
// console.log(response.status);
// console.log(response.statusText);
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
              			 
              		  }, 
              		  (error) => {
              	 
// console.log(error);
// if(this.interval) {
// clearInterval(this.interval);
// }
//             
// this.props.onError();
// reject(new Error("Rejected 2!"));
              		  }
                ).then(
      	        (result) => {
      	        	console.log( result); 
  	        		 this.setState({
  	        			tags: result,
  	        			mustHaveSource: result,
  	        			boostedSource: result,
  	        			deboostedSource: result,
  	        			missingSource: result
  	     	          }); 
      	        		

      	        },
      	        // Note: it's important to handle errors here
      	        // instead of a catch() block so that we don't swallow
      	        // exceptions from actual bugs in components.
      	        (error) => {
      	        	 
// console.log(error);
// clearInterval(this.interval);
// this.props.onError();
      	        }
      	      ).catch(function(error) {
      	    	 
// console.log(error);
// clearInterval(this.interval);
// this.props.onError();
      	      });
        } 
    	 handleMustHaveChange(event ) {
    		 
    		 let missingfilter = event.target.value.concat(this.state.boosted,this.state.deboosted);
    		 let boostedfilter = event.target.value.concat(this.state.deboosted,this.state.missing);
         	let deboostedfilter = event.target.value.concat(this.state.boosted,this.state.missing);
        	this.setState({ musthave: event.target.value,
        		missingSource:  this.state.tags.filter(tag => missingfilter.indexOf(tag) ===-1),
        		deboostedSource:  this.state.tags.filter(tag => deboostedfilter.indexOf(tag) ===-1),
        		boostedSource:  this.state.tags.filter(tag => boostedfilter.indexOf(tag) ===-1)
        	});
         	
         }
        handleBoostedChange(event ) {
        	 
        	let missingfilter = event.target.value.concat(this.state.musthave,this.state.deboosted);
        	let musthavefilter = event.target.value.concat(this.state.deboosted,this.state.missing);
        	let deboostedfilter = event.target.value.concat(this.state.musthave,this.state.missing);
       	this.setState({ boosted: event.target.value,
       		missingSource:  this.state.tags.filter(tag => missingfilter.indexOf(tag) ===-1),
       		deboostedSource:  this.state.tags.filter(tag => deboostedfilter.indexOf(tag) ===-1),
       		mustHaveSource:  this.state.tags.filter(tag => musthavefilter.indexOf(tag) ===-1)
       	});
    	
        }
        
        handleDeboostedChange(event ) {
         
	   		let missingfilter = event.target.value.concat(this.state.musthave,this.state.boosted);
	    	let musthavefilter = event.target.value.concat(this.state.boosted,this.state.missing);
	    	let boostedfilter = event.target.value.concat(this.state.musthave,this.state.missing);
	   	this.setState({ deboosted: event.target.value,
	   		missingSource:  this.state.tags.filter(tag => missingfilter.indexOf(tag) ===-1),
	   		boostedSource:  this.state.tags.filter(tag => boostedfilter.indexOf(tag) ===-1),
	   		mustHaveSource:  this.state.tags.filter(tag => musthavefilter.indexOf(tag) ===-1)
	   		});
        	
        }
        handleMissingChange(event ) {
        	let deboostedfilter = event.target.value.concat(this.state.musthave,this.state.boosted);
        	let musthavefilter = event.target.value.concat(this.state.boosted,this.state.deboosted);
        	let boostedfilter = event.target.value.concat(this.state.musthave,this.state.deboosted);
       	this.setState({ missing: event.target.value,
       		deboostedSource:  this.state.tags.filter(tag => deboostedfilter.indexOf(tag) ===-1),
       		boostedSource:  this.state.tags.filter(tag => boostedfilter.indexOf(tag) ===-1),
       		mustHaveSource:  this.state.tags.filter(tag => musthavefilter.indexOf(tag) ===-1)
       		});
       }
       
        
       
        
        handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }
        
        onSubmit() {
        	this.props.onSubmit("test");
        }
        
          
      
        
        render() {  
        	
                

            return (
            		<Modal
                    isOpen={this.props.modalIsOpen}
                    toggle={this.props.toggle}  >  
            		<ModalHeader toggle={this.props.toggle}>Picture Session Editor</ModalHeader>
                    <ModalBody >
                   
                    <form className="picSessionForm" autoComplete="off">
                    <Row>
                    <FormControl className="picSessionFormControl">
                      <InputLabel htmlFor="amusthave">Must Have</InputLabel>
                       
                      <Select  multiple value={this.state.musthave}
	                    onChange={this.handleMustHaveChange}
	                    input={<Input id="musthave" name="musthave" />}
	                    
	                  >
	                   {this.state.mustHaveSource.map(tag => (
	                     <MenuItem key={tag} value={tag} >
	                       {tag}
	                     </MenuItem>
	                   ))}
	                 </Select>
                    </FormControl>
                    </Row> 
                    <Row>
                    <FormControl className="picSessionFormControl" >
                    	<InputLabel htmlFor="boosted">Boosted</InputLabel>
                     
	                    <Select  multiple value={this.state.boosted}
		                    onChange={this.handleBoostedChange}
		                    input={<Input id="boosted" name="boosted" />} 
		                    
		                  >
		                   {this.state.boostedSource.map(tag => (
		                     <MenuItem key={tag} value={tag} >
		                       {tag}
		                     </MenuItem>
		                   ))}
		                 </Select>
	                  </FormControl>
	                  </Row> 
	                    <Row>
	                  <FormControl className="picSessionFormControl" >
	                  	<InputLabel htmlFor="deboosted">Should Not Have</InputLabel>
	                   
		                    <Select  multiple value={this.state.deboosted}
			                    onChange={this.handleDeboostedChange}
			                    input={<Input id="deboosted" name="deboosted" />} 
			                    
			                  >
			                   {this.state.deboostedSource.map(tag => (
			                     <MenuItem key={tag} value={tag} >
			                       {tag}
			                     </MenuItem>
			                   ))}
			                 </Select>
		                  </FormControl>
		                  </Row> 
		                    <Row>
		                  <FormControl className="picSessionFormControl" >
		                  	<InputLabel htmlFor="missing">Must Not Have</InputLabel>
		                   
			                    <Select  multiple value={this.state.missing}
				                    onChange={this.handleMissingChange}
				                    input={<Input id="missing" name="missing" />} 
				                    
				                  >
				                   {this.state.missingSource.map(tag => (
				                     <MenuItem key={tag} value={tag} >
				                       {tag}
				                     </MenuItem>
				                   ))}
				                 </Select>
			                  </FormControl>
			                  </Row>  
                  </form>
			        
			       
			        
			        
			    
			      
                    	 
                    </ModalBody> 
                    <ModalFooter>
                    <Button color="primary" onClick={this.onSubmit}>
                      Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                  </Modal>
            		
            		
               
            );
        }
    }

        export default PictureSessionEditor;
  // end::picSessionEditor[]
// <Select
// multiple
// input={<Input id="select-multiple" />}
// MenuProps={MenuProps}
// >
// {scaryAnimals.map(name => (
 // <MenuItem
 // key={name}
 // value={name}
     
// >
// {name}
// </MenuItem>
// ))}
// </Select>
