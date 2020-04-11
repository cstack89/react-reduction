import FMPicture2 from './fmpicture2';
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
import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';
import React, { useState } from 'react'; 

// tag::mediaframe[]
const MediaFrame2 = (props) => {

	const [modal, setModal] = useState(false);
	const [count, setCount] = useState(0);

	React.useEffect(() => {

		let interval = setInterval(() => {
			setCount(Math.random());
//			console.log(count);
		}
		,"20000");
		
		return function cleanup() {
			 clearInterval(interval);
		};
					
	}, []);
    	     
        
        return (
        		
        	<Modal isOpen={props.modalIsOpen} toggle={props.toggle} size="xl"
                className="picFrameModal" contentClassName="picFrameModalContent" backdropClassName = "picFrameBackdrop" >  
                <ModalBody onClick={props.toggle}>
                	<FMPicture2 onError={props.onRequestClose}   picCounter={count}/> 
                </ModalBody> 
            </Modal>
        
        );
        
    }

export default MediaFrame2;
  //end::mediaframe[]  