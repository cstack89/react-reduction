import FMPicture from './fmpicture';
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

// tag::mediaframe[]
class MediaFrame2 extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    		 modal: false
	    };
	    
	  }

    	
    	 componentDidMount() {  
    	 }
    	 
    	 componentWillUnmount() {
    		 
    	 }
    	     
        render() {  
        	 
            return (
            		
            		<Modal
                    isOpen={this.props.modalIsOpen}
                    toggle={this.props.toggle}
                    className="picFrameModal"
                    	contentClassName="picFrameModalContent"
                    		backdropClassName = "picFrameBackdrop"
                    	size="xl">  
                    <ModalBody onClick={this.props.toggle}>
                    	<FMPicture onError={this.props.onRequestClose}   changeFreq="20000"/> 
                    </ModalBody> 
                  </Modal>
            
            );
        }
    }

export default MediaFrame2;
  //end::mediaframe[]  