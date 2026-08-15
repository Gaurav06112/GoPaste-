import React from 'react'
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useRef ,useState} from 'react';
import "./ViewPaste.css"
import toast from 'react-hot-toast';

const ViewPaste = () => {

  const {id}=useParams();  

  const pastes=useSelector((state)=>{return state.paste.pastes});

  const idx=pastes.findIndex((paste)=>{

    return paste.id===id;

  });
   
  
  const lineRef=useRef(null);
  const textAreaRef=useRef(null);
  const lines=pastes[idx].content.split("\n").length; 
  
  
  
  function handleCopyClick(){
     navigator.clipboard.writeText(pastes[idx].content);

    //  toast.success("Copied to Clipboard",{
    //   className:"custom-toast",});
        
        toast.custom(
          <div className='custom-toast'>
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
            fill="currentColor" viewBox="0 0 24 24" >
            <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
            </svg>
              <span>Copied to Clipboard</span>
          </div>
          ,
          {
            duration:1000,
          }
        );
   }




  return (
      <div id='home-div'>

              <div id='home-input-row'>

                  <svg style={{position:"absolute",top:"7px",left:"10px"}}  xmlns="http://www.w3.org/2000/svg" width="22" height="22"  
                  fill="#949393" viewBox="0 0 24 24" >
                  <path d="M18.5 2h-12C4.57 2 3 3.57 3 5.5V21c0 .35.18.67.47.85s.66.2.97.04l5.55-2.78 5.55 2.78a.997.997 0 0 0 1.45-.89v-8h4c.55 0 1-.45 1-1V5.5c0-1.93-1.57-3.5-3.5-3.5ZM15 19.38l-4.55-2.28a1 1 0 0 0-.89 0l-4.55 2.28V5.5c0-.83.67-1.5 1.5-1.5h8.85c-.22.46-.35.96-.35 1.5v13.88ZM20 11h-3V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path>
                  </svg>

                  <input id='my-title-inp-view' type="text" value={pastes[idx].title} disabled/>
                  <Link to={`/?pasteId=${id}`}><button id='create-btn'>Add To Paste</button></Link>
              </div>


             <div className='myTextArea-outer-div'>

                <div className='myTextArea-design'>
                  
                    <div className='text-circle-div'>
                      <div className='text-circle' style={{backgroundColor:"#FF5F57"}}></div>
                      <div className='text-circle' style={{backgroundColor:"#fbd92e"}}></div>
                      <div className='text-circle' style={{backgroundColor:"#2DC842"}}></div>
                    </div>

                    <svg style={{cursor:'pointer'}} onClick={handleCopyClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                    fill='white' 
                    viewBox="0 0 24 24" >
                    <path d="M20 2H10c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 12H10V4h10z"></path><path d="M14 20H4V10h2V8H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2h-2z"></path>
                    </svg>
                    
                </div>


                <div className='line-number-outer-div'>
                    
                    <div ref={lineRef} className='line-number-div-view'>

                      {
                        Array.from({length:lines},(_,i)=>{
                          return <div key={i}>{i+1}</div>
                        })
                      }

                    </div>


                    <textarea ref={textAreaRef} value={pastes[idx].content} id="myTextArea-view" placeholder='Write your Content...' onChange={(e)=>{setValue(e.target.value)}} disabled></textarea>
                </div>

            </div>
        
          </div>
  )
}

export default ViewPaste
