import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'; 
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  
	  Col, 
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
            this.state = {  
            		mustHaveSource: [], 
            		boostedSource: [], 
            		deboostedSource: [], 
            		missingSource: [],     
            		sessionModel: null
            	};
            
  
            
            this.handleMustHaveChange  = this.handleMustHaveChange.bind(this);  
            this.handleBoostedChange  = this.handleBoostedChange.bind(this); 
            this.handleDeboostedChange  = this.handleDeboostedChange.bind(this);  
            this.handleMissingChange  = this.handleMissingChange.bind(this); 
            this.handleInputChange = this.handleInputChange.bind(this); 
            this.onSubmit  = this.onSubmit.bind(this);  
        }
    	
    	 componentDidMount() {
    		 
    		 if(this.props.sessionModel !== null) {
 	        	console.log(this.props.sessionModel);
 	        	let deboostedfilter = [];
 	        	let musthavefilter = [];
 	        	let boostedfilter = [];
 	        	let missingfilter = []; 
 	        	if(this.props.sessionModel.missingTags !== null) {
 	        		let tmissing=this.props.sessionModel.missingTags;
 	        		deboostedfilter.concat(tmissing);
 	        		musthavefilter.concat(tmissing);
 	        		boostedfilter.concat(tmissing); 
 	        	}
 	        	if(this.props.sessionModel.deboostedTags !== null) {
 	        		let tdeboosted= this.props.sessionModel.deboostedTags;
 	        		missingfilter.concat(tdeboosted);
 	        		musthavefilter.concat(tdeboosted);
 	        		boostedfilter.concat(tdeboosted); 
 	        	}
 	        	if(this.props.sessionModel.mustHaveTags !== null) {
 	        		let tmusthave= this.props.sessionModel.mustHaveTags; 
 	        		missingfilter.concat(tmusthave);
 	        		deboostedfilter.concat(tmusthave);
 	        		boostedfilter.concat(tmusthave); 
 	        	}
 	        	if(this.props.sessionModel.boostedTags !== null) {
 	        		let tboosted= this.props.sessionModel.boostedTags; 
 	        		missingfilter.concat(tboosted);
 	        		deboostedfilter.concat(tboosted);
 	        		musthavefilter.concat(tboosted); 
 	        	} 
 	        	this.setState({    
 	           		deboostedSource:  this.props.tags.filter(tag => deboostedfilter.indexOf(tag) ===-1),
 	           		boostedSource:  this.props.tags.filter(tag => boostedfilter.indexOf(tag) ===-1),
 	           		mustHaveSource:  this.props.tags.filter(tag => musthavefilter.indexOf(tag) ===-1),
 	           		missingSource:  this.props.tags.filter(tag => missingfilter.indexOf(tag) ===-1),    
 	           		sessionModel: this.props.sessionModel
 	           	});
 	        }
    		
    	 }
    	 
    	 componentWillUnmount() {
    		 
    	 }
    	 
        
        
    	 
    	 handleMustHaveChange(event ) {
    		 
    		 let missingfilter = event.target.value.concat(this.state.sessionModel.boostedTags,this.state.sessionModel.deboostedTags);
    		 let boostedfilter = event.target.value.concat(this.state.sessionModel.deboostedTags,this.state.sessionModel.missingTags);
         	let deboostedfilter = event.target.value.concat(this.state.sessionModel.boostedTags,this.state.sessionModel.missingTags);
        	this.setState({  
        		sessionModel: {
                    ...this.state.sessionModel,
                    mustHaveTags: event.target.value
                   },
        		missingSource:  this.props.tags.filter(tag => missingfilter.indexOf(tag) ===-1),
        		deboostedSource:  this.props.tags.filter(tag => deboostedfilter.indexOf(tag) ===-1),
        		boostedSource:  this.props.tags.filter(tag => boostedfilter.indexOf(tag) ===-1)
        	});
         	
         }
        handleBoostedChange(event ) {
        	 
        	let missingfilter = event.target.value.concat(this.state.sessionModel.mustHaveTags,this.state.sessionModel.deboostedTags);
        	let musthavefilter = event.target.value.concat(this.state.sessionModel.deboostedTags,this.state.sessionModel.missingTags);
        	let deboostedfilter = event.target.value.concat(this.state.sessionModel.mustHaveTags,this.state.sessionModel.missingTags);
       	this.setState({   
       		sessionModel: {
                ...this.state.sessionModel,
                boostedTags: event.target.value
               },
       		missingSource:  this.props.tags.filter(tag => missingfilter.indexOf(tag) ===-1),
       		deboostedSource:  this.props.tags.filter(tag => deboostedfilter.indexOf(tag) ===-1),
       		mustHaveSource:  this.props.tags.filter(tag => musthavefilter.indexOf(tag) ===-1)
       	});
    	
        }
        
        handleDeboostedChange(event ) {
         
	   		let missingfilter = event.target.value.concat(this.state.sessionModel.mustHaveTags,this.state.sessionModel.boostedTags);
	    	let musthavefilter = event.target.value.concat(this.state.sessionModel.boostedTags,this.state.sessionModel.missingTags);
	    	let boostedfilter = event.target.value.concat(this.state.sessionModel.mustHaveTags,this.state.sessionModel.missingTags);
	   	this.setState({  
	   		sessionModel: {
                ...this.state.sessionModel,
                deboostedTags: event.target.value
               },
	   		missingSource:  this.props.tags.filter(tag => missingfilter.indexOf(tag) ===-1),
	   		boostedSource:  this.props.tags.filter(tag => boostedfilter.indexOf(tag) ===-1),
	   		mustHaveSource:  this.props.tags.filter(tag => musthavefilter.indexOf(tag) ===-1)
	   		});
        	
        }
        handleMissingChange(event ) {
        	let deboostedfilter = event.target.value.concat(this.state.sessionModel.mustHaveTags,this.state.sessionModel.boostedTags);
        	let musthavefilter = event.target.value.concat(this.state.sessionModel.boostedTags,this.state.deboosted);
        	let boostedfilter = event.target.value.concat(this.state.sessionModel.mustHaveTags,this.state.deboosted);
        	this.setState({ 
        		sessionModel: {
	                ...this.state.sessionModel,
	                missingTags: event.target.value
	               },
     
	       		deboostedSource:  this.props.tags.filter(tag => deboostedfilter.indexOf(tag) ===-1),
	       		boostedSource:  this.props.tags.filter(tag => boostedfilter.indexOf(tag) ===-1),
	       		mustHaveSource:  this.props.tags.filter(tag => musthavefilter.indexOf(tag) ===-1)
       		});
       }
       
        
       
        
        handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }
        
        onSubmit(event ) {
        	this.props.onSubmit(this.state.sessionModel);
        	event.preventDefault();
        }
        
        handleInputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            this.setState({
            	sessionModel: {
                    ...this.state.sessionModel,
                    [name]: value
                   }
            
              
            });
          }
      
        render() {  
        	
        	if(this.state.sessionModel) {
                

            return (
            		<Dialog open={this.props.modalIsOpen} onClose={this.props.toggle} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Picture Session Editor</DialogTitle>
            		
                    <DialogContent>
                   
                    <form className="picSessionForm" autoComplete="off" onSubmit={this.onSubmit}>
                    <Row>
                    <Col md={6} sm={6} xs={12} className="mb-3">
	                    <FormControl className="picSessionFormControl">
	                      <InputLabel htmlFor="amusthave">Must Have</InputLabel>
	                       
	                      <Select  multiple value={this.state.sessionModel.mustHaveTags}
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
	                    </Col>
	                    <Col md={6} sm={6} xs={12} className="mb-3">
		                    <FormControl className="picSessionFormControl" >
	                    		<InputLabel htmlFor="boosted">Boosted</InputLabel>
	                     
			                    <Select  multiple value={this.state.sessionModel.boostedTags}
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
	                    </Col>
                    </Row> 
                    <Row>
                    <Col md={6} sm={6} xs={12} className="mb-3">
                    <FormControl className="picSessionFormControl" >
                  	<InputLabel htmlFor="deboosted">Should Not Have</InputLabel>
                   
	                    <Select  multiple value={this.state.sessionModel.deboostedTags}
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
                    </Col>
                    <Col md={6} sm={6} xs={12} className="mb-3">
                    <FormControl className="picSessionFormControl" >
                  	<InputLabel htmlFor="missing">Must Not Have</InputLabel>
                   
	                    <Select  multiple value={this.state.sessionModel.missingTags}
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
                    </Col>
                    
                    
                	
            			
                   
	                  </Row> 
	                    <Row>
	                    <Col md={3} sm={3} xs={6} className="mb-3">
	                    <label>
		                    Boost Old:
		                    <input
		                      name="boostOld"
		                      type="checkbox"
		                      checked={this.state.sessionModel.boostOld} 
	                    	  onChange={this.handleInputChange}/>
		                  </label>
	                    </Col>
	                    <Col md={3} sm={3} xs={6} className="mb-3">
	                    <label>
		                    Boost New:
		                    <input
		                      name="boostNew"
		                      type="checkbox"
		                      checked={this.state.sessionModel.boostNew}  
	                    	  onChange={this.handleInputChange}/>
		                  </label>
	                    </Col>
	                    <Col md={3} sm={3} xs={6} className="mb-3">
	                    <label>
		                    Boost Unseen:
		                    <input
		                      name="boostUnseen"
		                      type="checkbox"
		                      checked={this.state.sessionModel.boostUnseen} 
	                          onChange={this.handleInputChange}/>
		                  </label>
	                    </Col>
	                    <Col md={3} sm={3} xs={6} className="mb-3">
	                    <label>
		                    Boost Not Seen Recently:
		                    <input
		                      name="boostNotSeenRecently"
		                      type="checkbox"
		                      checked={this.state.sessionModel.boostNotSeenRecently}
	                    	  onChange={this.handleInputChange}/>
		                  </label>
	                    </Col>
	                     
	            		
	                 
		                  </Row> 
		                    <Row>
			                    <Col md={6} sm={6} xs={12} className="mb-3"> 
				                    <InputLabel htmlFor="interval">Interval</InputLabel>
				                    
				                    <Input type="number" name="interval" id="intervalBx" placeholder="seconds">{this.state.sessionModel.interval} </Input>
				                  </Col>
			                    <Col md={6} sm={6} xs={12} className="mb-3"> 
			                    </Col>
		                 
			                  </Row>  
			                  <Row>
			                    <Col md={6} sm={6} xs={12} className="mb-3">
			                    	<Button  type="submit"    > 
			                    	Submit
			                    	</Button>
				                 </Col>
			                    <Col md={6} sm={6} xs={12} className="mb-3">
			                    <Button color="secondary" onClick={this.props.toggle}>
			                      Cancel
			                    </Button>
			                    </Col>
		                 
			                  </Row>  
                  </form>
			          
                    	 
                    </DialogContent>  
                  </Dialog>
            		
            		
               
            ); 
	                    }
	                    else {
	                    	return (
	                    			<label>loading </label>
	                    			
	                    			);
	                    }
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
