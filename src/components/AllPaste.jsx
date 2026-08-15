import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./AllPaste.css"
import { removeFromPastes } from '../features/pasteSlice';
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import twitterLogo from "../assets/twitter-logo.avif"
import watsappLogo from "../assets/watsapp-logo.avif"
import facebookLogo from "../assets/facebook-logo.png"
import telegramLogo from "../assets/telegram-logo.png"
import notebookLogo from "../assets/notebook-logo.png"



const AllPaste = (props) => {

    const [searchParams,setSearchParams] = useSearchParams();
    const scrollTo = searchParams.get("scrollTo");
  
    useEffect(()=>{
  
     if(scrollTo!=null){
  
        const ele = document.getElementById(scrollTo);
  
        if(ele!=null){
  
           ele.scrollIntoView({
              behavior:"smooth",
              block:"center"
           });
  
        }
  
     }
  
     },[scrollTo]);



  const pastes=useSelector((state)=>{return state.paste.pastes});  
  const dispatch=useDispatch();  
  const [searchTerm,setSearchTerm]=useState('');  
  const [showShare,setShowShare]=useState(false);
  const [inputLink,setInputLink]=useState("");



  const filteredPastes=pastes.filter((paste)=>{

    return paste.title.toLowerCase().includes(searchTerm.toLowerCase());

  });


  const navigate=useNavigate();
  const [passwordPage,setPasswordPage]=useState(false);
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
 
  const [selectedPaste,setSelectedPaste]=useState({});
  function handleViewMode(e,view,myId,path){

       e.preventDefault();

       setSelectedPaste({mode:view,
                         ID:myId,
                         myPath:path, 
                        });

       if(view==="Private")
       {
           setPasswordPage(true);

       }
       else if(view==="Public"){
           
          if(path==="edit")
          {
             navigate(`/?pasteId=${myId}`);

          }
          else if(path==="view")
          {
             navigate(`/pastes/${myId}`);
          }
           
       }
  }

   function handleCross2(){
     setPasswordPage(false);
     setPassword("");
  }

  function handlePassword(){
      if(password==="")
      {
          toast.custom(
          <div className='custom-toast-pass'>
            <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
            fill="currentColor" viewBox="0 0 24 24" >
            <path d="M11 9h2v6h-2zm0 8h2v2h-2z"></path><path d="M12.87 2.51c-.35-.63-1.4-.63-1.75 0l-9.99 18c-.17.31-.17.69.01.99.18.31.51.49.86.49h20c.35 0 .68-.19.86-.49a1 1 0 0 0 .01-.99zM3.7 20 12 5.06 20.3 20z"></path>
            </svg>
            <span>Password Required!</span>
          </div>,
            {
              duration:1000,
            }
         );
      } 
      else if(password==="12345")
      {
            setPassword("");
            setPasswordPage(false);
            if(selectedPaste.myPath==="edit")
            {
                navigate(`/?pasteId=${selectedPaste.ID}`);
            }
            else if(selectedPaste.myPath==="view")
            {
                navigate(`/pastes/${selectedPaste.ID}`);  
            }      
      } 
      else{
         toast.custom(
          <div className='custom-toast-pass'>
           <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
            fill="currentColor" viewBox="0 0 24 24" >
            <path d="M11 7h2v6h-2zm0 8h2v2h-2z"></path><path d="M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10m0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8"></path>
            </svg>
              <span>Invalid Password</span>
          </div>,
           {
            duration:1000,
           }
         );
         
         setPassword("");
      }
  }


  function handleShare(pasteId){
      
      setShowShare(true);
      // setInputLink(`http://localhost:5173/pastes/${pasteId}`);
      setInputLink(`${window.location.origin}/pastes/${pasteId}`);

  }

  function handleCross(){
      setShowShare(false);
  }

  function handleLinkCopy(){
    navigator.clipboard.writeText(inputLink);
    toast.custom(
      <div className='custom-toast'>
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
            fill="currentColor" viewBox="0 0 24 24" >
            <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
            </svg>
              <span>Link Copied</span>
          </div>,
           {
            duration:1000,
           }
    );
  }


  function handleDelete(pasteId){
      
     dispatch(removeFromPastes(pasteId));
  } 

  function handleCopy(content){
    navigator.clipboard.writeText(content);

    // toast("Copied Successfully");

    toast.custom(
       <div className='custom-toast'>
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
            fill="currentColor" viewBox="0 0 24 24" >
            <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
            </svg>
              <span>Paste Copied</span>
          </div>,

           {
            duration:1000,
          }
    );

  }
  


  return (
    <div className='paste-body'>
         <div className='paste-comp-div'>

         <div style={{position:'relative'}} >
            <svg style={{position:"absolute",top:"12px",left:"11px"}}  xmlns="http://www.w3.org/2000/svg" width="18" height="18"  
            fill="#686767" viewBox="0 0 24 24" >
            <path d="M10.5 19c1.98 0 3.81-.69 5.25-1.83L20 21.42l1.41-1.41-4.25-4.25a8.47 8.47 0 0 0 1.83-5.25c0-4.69-3.81-8.5-8.5-8.5S2 5.81 2 10.5 5.81 19 10.5 19m0-15c3.58 0 6.5 2.92 6.5 6.5S14.08 17 10.5 17 4 14.08 4 10.5 6.92 4 10.5 4"></path>
            </svg>

            <input type="text" id="search-paste-inp" placeholder='Search your paste here...' value={searchTerm} 
            onChange={(e)=>{setSearchTerm(e.target.value)}} />
         </div>
        

        
        <div className='paste-item-div'>

          <div className='paste-heading-div'>
            <p id='paste-heading'>All Pastes</p>
          </div>

            {  filteredPastes.length!=0 ? filteredPastes.map((paste,idx)=>{

                    return <div id={paste.id} className='cards' key={paste.id}>

                          <div className='card-detail'>
                              <div className='my-paste-heading'>
                                  { 
                                    paste.pasteMode==="Private"? <svg  xmlns="http://www.w3.org/2000/svg" width="37" height="37"  
                                    /*fill="#0022ff"*/  fill='#1e75f7'  viewBox="0 0 24 24" >
                                    <path d="M6 22h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5S7 4.24 7 7v2H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2M9 7c0-1.65 1.35-3 3-3s3 1.35 3 3v2H9zm-3 4h12v9H6z"></path>
                                    </svg> : <svg  style={{marginTop:"4px"}} xmlns="http://www.w3.org/2000/svg" width="33" height="33"  
                                        fill="#48e8bb" /*fill="#48e8bb"  fill="#73f382"  fill='#ffad20'*/   viewBox="0 0 24 24" >
                                      <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"></path>
                                    </svg>
                                  }

                                  <p style={{fontSize:"36px",fontWeight:"600",color:"white"}}>{paste.title}</p> 
                                   {
                                       paste.bookmarked ? <svg style={{marginTop:"8px",marginLeft:"10px",filter:"drop-shadow(0px 0px 8px rgb(255, 195, 0))"}} fill="#ff9100" width="24" height="24" aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="svg-inline--fa fa-star absolute h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em] left-1/2 top-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                          <path style={{filter:"dropShadow(0px 0px 8px rgb(255, 191, 0))"}} /*fill="#ff9100"*/ d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path>
                                                          </svg> : ""
                                   }
                              </div>

                              <div className={`content-text-div ${paste.pasteMode}`}><p style={{fontSize:"14px",color:"#b3b0b0"}}>{paste.content}</p></div>
                          </div>
                          {/* color:"#c5c4c4" */}
          
                        
            
                          <div className='card-features-div'>
                              <div className='card-buttons'>

                                <Link onClick={(e)=>{handleViewMode(e,paste.pasteMode,paste.id,"edit")}} to={`/?pasteId=${paste.id}`}><button className='my-buttons btn1'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                                fill="white" viewBox="0 0 24 24" >
                                <path d="m17.71 7.29-3-3a.996.996 0 0 0-1.41 0l-11.01 11A1 1 0 0 0 2 16v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l11-11a.996.996 0 0 0 0-1.41ZM5.59 18H4v-1.59l7.5-7.5 1.59 1.59zm8.91-8.91L12.91 7.5 14 6.41 15.59 8zM11 18h11v2H11z"></path>
                                </svg></button></Link>

                                <Link onClick={(e)=>{handleViewMode(e,paste.pasteMode,paste.id,"view")}} to={`/pastes/${paste.id}`}><button className='my-buttons btn2'><svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                                fill="white" viewBox="0 0 24 24" >
                                <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path>
                                </svg>
                                  </button></Link>

                                <button className='my-buttons btn3' onClick={()=>{handleShare(paste.id)}}><svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                                fill="white" viewBox="0 0 24 24" >
                                <path d="M5.5 15.5c1.07 0 2.02-.5 2.67-1.26l6.87 3.87c-.01.13-.04.26-.04.39 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5c-1.07 0-2.02.5-2.67 1.26l-6.87-3.87c.01-.13.04-.26.04-.39s-.02-.26-.04-.39l6.87-3.87C16.47 8.5 17.42 9 18.5 9 20.43 9 22 7.43 22 5.5S20.43 2 18.5 2 15 3.57 15 5.5c0 .13.02.26.04.39L8.17 9.76A3.48 3.48 0 0 0 5.5 8.5C3.57 8.5 2 10.07 2 12s1.57 3.5 3.5 3.5m13 1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5m0-13c.83 0 1.5.67 1.5 1.5S19.33 7 18.5 7 17 6.33 17 5.5 17.67 4 18.5 4m-13 6.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S4 12.83 4 12s.67-1.5 1.5-1.5"></path>
                                </svg></button>  
                                

                                <button className='my-buttons btn4' onClick={()=>{handleCopy(paste.content)}}><svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                                fill='white' viewBox="0 0 24 24" >
                                <path d="M20 2H10c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 12H10V4h10z"></path><path d="M14 20H4V10h2V8H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2h-2z"></path>
                                </svg>
                                </button>


                                <button className='my-buttons btn5' onClick={()=>{handleDelete(paste.id)}}><svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                                fill="white" viewBox="0 0 24 24" >
                                <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                                </svg>
                                </button>

                              </div>



                              <div className='card-date'>

                                <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="22"  
                                fill="white" viewBox="0 0 24 24" >
                                <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M5 20V8h14V6v14z"></path><path d="M13.28 12.59 12 10l-1.28 2.59-2.72.23 2.12 2.12L9.18 18 12 16.12 14.82 18l-.94-3.06L16 12.82z"></path>
                                </svg>

                                <p>{ new Date(paste.pasteDate).toLocaleDateString(
                                  "en-GB",{
                                    day:"numeric",
                                    month:"long",
                                    year:"numeric",
                                  })
                                }</p>

                              </div>


                              {/* className='card-content-type'     */}
                              <div className={`card-content-type ${paste.type}`}>
                                {paste.type}
                              </div>


                          </div>

                    </div>

                    })

                    :

                    <div className='cards empty-cards'>
                         <p>No Paste Found.</p>
                    </div>
            }

        </div>

          
    </div>



      {
        passwordPage && <div className='passOverlay' onClick={handleCross2}>
            
            <div className='pass-modal' onClick={(e)=>{e.stopPropagation()}}>
                
              <svg id='cross-sym' style={{position:"absolute",left:"320px",top:"10px",cursor:"pointer"}}
               onClick={handleCross2}
               xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
              fill="#A1A1AA" viewBox="0 0 24 24" >
              <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
              </svg>
                
               
                <p className='private-row1'>
                
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M6 22h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5S7 4.24 7 7v2H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2M9 7c0-1.65 1.35-3 3-3s3 1.35 3 3v2H9zm-3 4h12v9H6z"></path>
                    </svg>

                    <span style={{fontWeight:"500",textShadow:"5px 4px 16px black"}}>Private Paste</span> 

                </p>


                <p className='desc-pass'>This is a private paste and requires password for authentication. Please enter the password to unlock the vault.</p>
               
            
               <div style={{position:"relative",width:"90%"}}>

                  <svg style={{position:"absolute",top:"12px",left:"11px"}} xmlns="http://www.w3.org/2000/svg" width="18" height="18"  
                  fill="grey" viewBox="0 0 24 24" >
                  <path d="M6 22h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5S7 4.24 7 7v2H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2M9 7c0-1.65 1.35-3 3-3s3 1.35 3 3v2H9zm-3 4h12v9H6z"></path>
                  </svg>
                   
                  <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  type={showPassword ? "text" : "password"} name="" id="private-row3-inp" placeholder='Password'/>
                  {
                      showPassword ?
                      <svg onClick={()=>{setShowPassword(!showPassword)}} style={{position:"absolute",top:"10px",left:"275px",cursor:"pointer"}}  xmlns="http://www.w3.org/2000/svg" width="22" height="22"  
                      fill="white" viewBox="0 0 24 24" >
                      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path>
                      </svg>
                      :
                      <svg onClick={()=>{setShowPassword(!showPassword)}} style={{position:"absolute",top:"10px",left:"275px",cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="22" height="22"  
                      fill="white" viewBox="0 0 24 24" >
                      <path d="M12 17c-5.35 0-7.42-3.84-7.93-5 .2-.46.65-1.34 1.45-2.23l-1.4-1.4c-1.49 1.65-2.06 3.28-2.08 3.31-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68.91 0 1.73-.1 2.49-.26l-1.77-1.77c-.24.02-.47.03-.72.03Zm9.95-4.68c.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68-1.84 0-3.36.39-4.61.97L2.71 1.29 1.3 2.7l4.32 4.32 1.42 1.42 2.27 2.27 3.98 3.98 1.8 1.8 1.53 1.53 4.68 4.68 1.41-1.41-4.32-4.32c2.61-1.95 3.55-4.61 3.56-4.65m-7.25.97c.19-.39.3-.83.3-1.29 0-1.64-1.36-3-3-3-.46 0-.89.11-1.29.3l-1.8-1.8c.88-.31 1.9-.5 3.08-.5 5.35 0 7.42 3.85 7.93 5-.3.69-1.18 2.33-2.96 3.55z"></path>
                      </svg>
                  }
               </div>
               

               <div className='private-row4'>
                <button onClick={()=>{handlePassword()}} id='continue-btn'>Continue</button>
                <button onClick={()=>{handleCross2()}} id='cancel-btn'>Cancel</button>
               </div>

               <div className='private-row5'>
                <img id="noteLogo" src={notebookLogo} alt="" />
                <p style={{fontSize:"13px",color:"WHITE",fontFamily:"'Typo Round Regular Demo', sans-serif",marginTop:"3px"}}>GoPaste</p>
               </div>
               

            </div>

        </div>

      }




      {
        showShare &&  <div className='overlay' onClick={handleCross}>
           
           <div className='share-modal' onClick={(e)=>{e.stopPropagation()}}>

            <div style={{position:"relative",width:"92%",height:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <h4 style={{color:"white",fontSize:"18px"}}>Share link</h4>
              <svg id='cross-sym' style={{position:"absolute",left:"394px",top:"-3px",cursor:"pointer"}}
               onClick={handleCross}
               xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
              fill="#A1A1AA" viewBox="0 0 24 24" >
              <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
              </svg>
            </div>
            

            <p style={{paddingRight:"86px",fontSize:"15px",color:"#A1A1AA"}}>Anyone who has this link will be able to view this.</p>
             
             <div className='share-inp-div'>
                <input value={inputLink} readOnly type="text" name="" id="share-inp"/>
                <button className='copy-btn' onClick={handleLinkCopy} ><svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18"  
                fill="white" viewBox="0 0 24 24" >
                <path d="M20 2H10c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 12H10V4h10z"></path><path d="M14 20H4V10h2V8H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2h-2z"></path>
                </svg></button>
             </div>

             <div className='share-link-options-div'>

                <a href="https://x.com/"><img className='share-img-logo' src={twitterLogo} alt="" /></a>
                <a href="https://web.telegram.org/a/"><img className='share-img-logo' src={telegramLogo} alt="" /></a>
                <a href="https://web.whatsapp.com/"><img className='share-img-logo' src={watsappLogo} alt="" /></a>
                <a href="https://www.facebook.com/"><img className='share-img-logo' src={facebookLogo} alt="" /></a>
              
             </div>
             
             

           </div>

        </div>
      }


    </div>
  )
}

export default AllPaste
