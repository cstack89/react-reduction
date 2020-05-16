import ReactDOM from 'react-dom'; 
	import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';
	import React, { useState } from 'react'; 
//tag::fmpicture[] 
const FMPicture2 = (props) => {

	const [nextPic1Meta, setNextPic1Meta] = useState('');
	const [curPic1Meta, setCurPic1Meta] = useState('');
	const [curPic1, setCurPic1] = useState(null);
	const [picLoaded, setPicLoaded] = useState(false);
	const [containerId, setContainerID] = useState("");
	  const [width, setWidth] = React.useState(window.innerWidth);
	  const [height, setHeight] = React.useState(window.innerHeight);
	  const [curPicCont, setCurPicCont] = useState(null);
	const {fetch : authFetch } = props;


    		
	 React.useEffect(() => {
//   		      containerId: ReactDOM.findDOMNode(this).parentNode.getAttribute("id")
		 
//		 window.addEventListener("resize", () => {
//			 setWidth(window.innerWidth);
//			 setHeight(window.innerHeight);
//		 });
		 
//		 console.log(props.picCounter);
		 getPicNameWithSession();
		
		  }, [props.picCounter]);
    	 

	 
          
        
        function getPicNameWithSession() { 
        	authFetch("/merlinserver/requestPictureLocation/withSession", 
       			 { 
       		 		method: 'POST',
       		 		body: JSON.stringify(props.PicSession), 
       		 	    headers: { 
       		 	        'Content-Type': 'application/json'
       		 	    }
       			 })
              .then(
            		  (response) => {
            			  if (!response.ok) { 
//                	    	  setPicLoaded(false); // This used to be uncommented
//            				  console.log(response.status);
//            				  console.log(response.statusText);
//                			  if(this.interval) {
//                				  clearInterval(this.interval);
//                			  }
//               
//                	          this.props.onError();
//                	          throw new Error("Rejected 1!");
            	            } else {
//            	            	 return response.text();
            	            	 return response.json();
            	            }
            			 
            		  }, 
            		  (error) => {
//            	    	  setPicLoaded(false); // This used to be uncommented
//            			  console.log(error);
//            			  if(this.interval) {
//            				  clearInterval(this.interval);
//            			  }
//           
//            	          this.props.onError();
//            	          reject(new Error("Rejected 2!"));
            		  }
              ).then(
    	        (result) => {
    	        	console.log( result);
    	        	setNextPic1Meta(result);
    	        	
    	        	getPic(result);
	        	
    	        	
//	    	    	  setPicLoaded(false); // This used to be uncommented
    	        		

    	        },
    	        // Note: it's important to handle errors here
    	        // instead of a catch() block so that we don't swallow
    	        // exceptions from actual bugs in components.
    	        (error) => {
//      	    	  setPicLoaded(false); // This used to be uncommented
//    	        	console.log(error);
//      	          clearInterval(this.interval);
//      	          this.props.onError();
    	        }
    	      ).catch(function(error) {
    	    	
//    	    	  setPicLoaded(false); // This used to be uncommented
//    	          console.log(error);
//    	          clearInterval(this.interval);
//    	          this.props.onError();
    	      });
        }
       function getPicName() { 
        	
			authFetch("/merlinserver/requestPictureLocation")
              .then(
            		  (response) => {
            			  if (!response.ok) { 
//                	    	  setPicLoaded(false); // This used to be uncommented
//            				  console.log(response.status);
//            				  console.log(response.statusText);
//                			  if(this.interval) {
//                				  clearInterval(this.interval);
//                			  }
//               
//                	          this.props.onError();
//                	          throw new Error("Rejected 1!");
            	            } else {
//            	            	 return response.text();
            	            	 return response.json();
            	            }
            			 
            		  }, 
            		  (error) => {
//            	    	  setPicLoaded(false); // This used to be uncommented
//            			  console.log(error);
//            			  if(this.interval) {
//            				  clearInterval(this.interval);
//            			  }
//           
//            	          this.props.onError();
//            	          reject(new Error("Rejected 2!"));
            		  }
              ).then(
    	        (result) => {
    	        	console.log( result);
    	        	setNextPic1Meta(result);
    	        	
    	        	getPic(result);
	        	
    	        	
//	    	    	  setPicLoaded(false); // This used to be uncommented
    	        		

    	        },
    	        // Note: it's important to handle errors here
    	        // instead of a catch() block so that we don't swallow
    	        // exceptions from actual bugs in components.
    	        (error) => {
//      	    	  setPicLoaded(false); // This used to be uncommented
//    	        	console.log(error);
//      	          clearInterval(this.interval);
//      	          this.props.onError();
    	        }
    	      ).catch(function(error) {
    	    	
//    	    	  setPicLoaded(false); // This used to be uncommented
//    	          console.log(error);
//    	          clearInterval(this.interval);
//    	          this.props.onError();
    	      });
        }
        
       function getPic(picMetadata) {
    	   
        	let url = new URL("/merlinserver/requestPicture",window.location.href),
            params = {relativePath:picMetadata.path_hash}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        	authFetch(url, { 
        		 headers: {
        			  'Accept': 'image/jpeg',
        		      'Content-Type': 'image/jpeg' 
        		    },
        		credentials: 'same-origin' })
//        	.then(this.handleErrors)
    	      .then(res => res.blob())	 
    	      .then(
    	        (result) => {
    	        	const fileReaderInstance = new FileReader();
    	        	 fileReaderInstance.readAsDataURL(result); 
    	        	 fileReaderInstance.onload = () => {    
//    	        		    setCurPic1Meta(nextPic1Meta);
//    	        			setCurPic1(fileReaderInstance.result );
    	        		 let heightDif = (window.innerHeight - picMetadata.height);
    	        		 let widthDif = (window.innerWidth - picMetadata.width);
//    	        		 console.log("height diff: " + heightDif);
//    	        		 console.log("width diff: " + widthDif);
    	        			
    	        			
    	        			if(heightDif < widthDif) {
    	        				if( picMetadata.isPortrait ) {
    	        					console.log("Portrait");
    	        					setCurPicCont(<img src={fileReaderInstance.result}  onClick={props.onClick} style={{height:((window.innerHeight-50)+"px"), marginLeft:"28%"}}/>);
    	        				}else {
    	        					console.log("Not Portrait");
    	        					setCurPicCont(<img src={fileReaderInstance.result} onClick={props.onClick} style={{height:((window.innerHeight-50)+"px")}}/>);
    	        				}
    	        			} else {
    	        				console.log("Small width");
    	        				setCurPicCont(<img src={fileReaderInstance.result} onClick={props.onClick} style={{width:((window.innerWidth*.9)+"px")}}/>);
	                   	        
    	        			}			
    	        			
    	        			setPicLoaded(true);
    	        			
   
    	        	 }
    	        		
    	        		

    	        },
    	        // Note: it's important to handle errors here
    	        // instead of a catch() block so that we don't swallow
    	        // exceptions from actual bugs in components.
    	        (error) => {
//    	          this.setState({
//    	            isLoaded: true,
//    	            error
//    	          });
    	        }
    	      ).catch(function(error) {
//    	          console.log(error);
//    	          clearInterval(this.interval);
//    	          this.props.onError();
    	      });
        }
        
//        function handleErrors(response) {
//            if (!response.ok) {
//                throw Error(response.statusText);
//            }
//            return response;
//        }
        
      

        
       return(
        	

    	picLoaded 
    	? (     	
    			 <div className="FMPicture">
		   	        <div>
		   	        	{curPicCont}
		   	        </div>
		        </div>
         ) : (
             <div className="FMPicture"> 
                <div>
            	   No pic loaded
                </div>
              </div>
          )
         );
        
    } 

export default withAuthentication(fetch)(FMPicture2)
  //end::fmpicture[]  