import FMPicture from './fmpicture';
import Modal from 'react-modal';
const React = require('react');
//const {FMPicture} = require('./fmpicture'); 


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    	maxWidth:"95%",
    	maxHeight:"95%"
  }
};

//Modal.setAppElement('#react');
//tag::mediaframe[] 
class MediaFrame extends React.Component {

    	constructor() {
            super();
           
      
    	    this.afterOpenModal = this.afterOpenModal.bind(this);
    	     
        
        }
    	
    	 componentDidMount() { 
    
    	 }
    	 
    	 componentWillUnmount() {
    		 
    	 }
    	 
     

    		  afterOpenModal() {
    		    // references are now sync'd and can be accessed.
    		    //this.subtitle.style.color = '#f00';
    		  }

    	 
    	      
        
        render() {  
        	 
               

            return (
            		<Modal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.props.onRequestClose}
                    style={customStyles}
                    contentLabel="Media Frame"
                      className="Modal"
                      overlayClassName="Overlay"
                  >

            		<FMPicture onError={this.props.onRequestClose} changeFreq="20000"/> 
                  </Modal>
            		
            		
            		
            		
   
            );
        }
    }

export default MediaFrame;
  //end::mediaframe[]  