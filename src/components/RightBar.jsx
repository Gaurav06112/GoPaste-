import React, { useEffect } from 'react'
import "./RightBar.css"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { saveUserData } from '../features/pasteSlice'
import toast from 'react-hot-toast'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const RightBar = () => {

  const navigate=useNavigate();

  const pastes=useSelector((state)=>{return state.paste.pastes});  
  const recArr=[];
          
          let count=0;
          for(let i=pastes.length-1;i>=0;i--)
          {
                if(pastes.length===0)
                {
                    
                }
                else if(pastes.length<5)
                {
                    recArr.push(pastes[i]);
                }
                else if(pastes.length>=5)
                {
                    if(count==5)
                    {
                        break;
                    }
                    count++;
                    recArr.push(pastes[i]);
                }
           }

         
          const userData=useSelector((state)=>{return state.paste.userData}); 
     
     
          console.log(recArr);
          console.log(userData);
          const dispatch=useDispatch();

          const [userName,setUserName]=useState(userData.userID!=""? userData.userID : "");
          const[useridModal,setUseridModal]=useState(false);
          function handleCross(){
                setUseridModal(false);
          }
          console.log(userName);
          
          const [email,setEmail]=useState(userData.email!=""? userData.email : "");
          const [emailModal,setEmailModal]=useState(false);
          function handleCross2(){
                setEmailModal(false);
          }

          const [phone,setPhone]=useState(userData.phone!=""? userData.phone : "");
          const [phoneModal,setPhoneModal]=useState(false);
          function handleCross3(){
                setPhoneModal(false);
          }
          
          const [password,setPassword]=useState(userData.password);
          const [confirmPassword,setConfirmPassword]=useState("");
          const [passModal,setPassModal]=useState(false);
          function handleCross4(){
                setPassModal(false);
          }

          const [passwordSVG,setPasswordSVG]=useState(false);
          const [confirmSVG,setConfirmSVG]=useState(false);


          useEffect(()=>{
            
            setUserName(userData.userID!=""? userData.userID : "");
            setEmail(userData.email!=""? userData.email : "");
            setPhone(userData.phone!=""? userData.phone : "");
            setPassword(userData.password);

          },[useridModal,emailModal,phoneModal,passModal]);


          function handlePassword(){
             if(password==="")
             {   
                toast.custom( 
                        <div className='empty'>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="m20.42 6.11-7.97-4c-.28-.14-.62-.14-.9 0l-7.97 4c-.31.15-.51.45-.55.79-.01.11-.96 10.76 8.55 15.01a.98.98 0 0 0 .82 0C21.91 17.66 20.97 7 20.95 6.9a.98.98 0 0 0-.55-.79ZM12 19.9C5.26 16.63 4.94 9.64 5 7.64l7-3.51 7 3.51c.04 1.99-.33 9.02-7 12.26"></path><path d="M11 7h2v6h-2zm0 8h2v2h-2z"></path>
                            </svg>
                            <span>Password cannot be empty</span>
                        </div>,
                            {
                            duration:1000,
                            }
                        );    
             }
             else if(password===confirmPassword)
             {
                  handleCross4();
                  dispatch(saveUserData({field:"password",value:password}));
             }
             else{
                    toast.custom(
                        <div className='empty'>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M11 9h2v6h-2zm0 8h2v2h-2z"></path><path d="M12.87 2.51c-.35-.63-1.4-.63-1.75 0l-9.99 18c-.17.31-.17.69.01.99.18.31.51.49.86.49h20c.35 0 .68-.19.86-.49a1 1 0 0 0 .01-.99zM3.7 20 12 5.06 20.3 20z"></path>
                            </svg>
                            <span>Passwords do not match</span>
                        </div>,
                            {
                            duration:1000,
                            }
                        );  
                }      

          }



  return (
    <div className='rightbar'>


       <div className='recent-paste-div'>

            <div>
                <p style={{color:"white",fontWeight:"500"}}>Recent Pastes</p>
                <p style={{fontSize:"12px",marginTop:"3px",color:"#A8A8A8"}} >Recently created pastes by user with details mentioned.</p>
            </div>
        
            <div>

                {recArr.map((paste,idx)=>{
                    
                    if(recArr.length==1)
                    {
                         return <Link to={`/pastes?scrollTo=${paste.id}`} key={paste.id}><div style={{border:"1px solid rgb(59, 59, 59)",borderRadius:"10px"}} className='recent-paste'>
                                
                                    { paste.type=="CODE"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="hsl(0 0% 66%)" viewBox="0 0 24 24" >
                                                            <path d="M3 16c0 .34.18.67.47.85l8 5a1.01 1.01 0 0 0 1.06 0l8-5c.29-.18.47-.5.47-.85V8c0-.34-.18-.67-.47-.85l-8-5c-.32-.2-.74-.2-1.06 0l-8 5c-.29.18-.47.5-.47.85zm2-6.53 6 3.6v6.13l-6-3.75zm8 9.73v-6.13l6-3.6v5.98zM12 4.18l5.84 3.65-5.84 3.5-5.84-3.5z"></path>
                                                            </svg> : ""  || 
                                    paste.type=="TEXT"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M18.71 5.29a.996.996 0 0 0-1.41 0l-11 11a1 1 0 0 0-.29.71v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l11-11a.996.996 0 0 0 0-1.41l-3-3ZM9.59 19H8v-1.59l7.5-7.5 1.59 1.59zm8.91-8.91L16.91 8.5 18 7.41 19.59 9zM7 12c.26 0 .5-.15.61-.4l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61L8.84 5.15 7.61 2.38a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39L5.17 5.04 2.39 6.38c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77c.11.24.35.4.61.4Zm14.76 6.63-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                                                            </svg> : ""  || 
                                    paste.type=="JSON"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M4 8c0 2.8-1.68 2.99-2.01 3v2c.1 0 2.01.03 2.01 3 0 4.74 3.27 6 5 6h1v-2h-.99C8.7 20 6 19.83 6 16c0-1.99-.67-3.25-1.5-4C5.34 11.25 6 9.99 6 8c0-3.83 2.7-3.99 3-4h1V2H9C7.27 2 4 3.26 4 8m16 0c0-4.74-3.27-6-5-6h-1v2h.99C15.3 4 18 4.17 18 8c0 1.99.67 3.25 1.5 4-.84.75-1.5 2.01-1.5 4 0 3.83-2.7 3.99-3 4h-1v2h1c1.73 0 5-1.26 5-6 0-2.8 1.68-2.99 2.01-3v-2c-.1 0-2.01-.03-2.01-3"></path>
                                                            </svg> : "" || 
                                    paste.type=="HTML"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="m16.71 16.71 4.7-4.71-4.7-4.71-1.42 1.42 3.3 3.29-3.3 3.29zm-8-1.42L5.41 12l3.3-3.29-1.42-1.42L2.59 12l4.7 4.71zM14 3l-.98-.22-2 9-2 9L10 21l.98.22 2-9 2-9z"></path>
                                                            </svg> : "" || 
                                    paste.type=="CSS"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M16.41 10.41a.998.998 0 0 0 0-1.82l-4.15-1.84-1.84-4.15a.99.99 0 0 0-.91-.59c-.4-.03-.75.22-.92.58L6.74 6.6 2.56 8.61c-.35.17-.57.53-.57.92s.24.74.59.9l4.15 1.84 1.84 4.15a.998.998 0 0 0 1.82 0l1.84-4.15 4.15-1.84Zm-5.82.68L9.5 13.53l-1.09-2.44a.98.98 0 0 0-.51-.51L5.37 9.46l2.55-1.23c.21-.1.38-.27.47-.48l1.08-2.33 1.1 2.48c.1.23.28.41.51.51l2.44 1.09-2.44 1.09c-.23.1-.41.28-.51.51Zm11.01 5.3-2.77-1.23-1.23-2.77a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39l-1.23 2.67-2.78 1.34c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77a.663.663 0 0 0 1.22 0l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61ZM7.76 18.63l-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                                                            </svg> : "" || 
                                    paste.type=="TYPE-SCRIPT"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                    fill="#A8A8A8" viewBox="0 0 24 24" >
                                                                    <path d="m10.04 11.29-3.2 3.21 3.2 3.21 1.42-1.42-1.8-1.79 1.8-1.79zm2.5 1.42 1.8 1.79-1.8 1.79 1.42 1.42 3.2-3.21-3.2-3.21z"></path><path d="m19.94 7.68-.03-.09a.8.8 0 0 0-.2-.29l-5-5c-.09-.09-.19-.15-.29-.2l-.09-.03a.8.8 0 0 0-.26-.05c-.02 0-.04-.01-.06-.01H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12s-.01-.04-.01-.06c0-.09-.02-.17-.05-.26ZM6 20V4h7v4c0 .55.45 1 1 1h4v11z"></path>
                                                                    </svg> : "" || 
                                    paste.type=="XML"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                        fill="#A8A8A8" viewBox="0 0 24 24" >
                                                        <path d="M9.71 16.29 5.41 12l4.3-4.29-1.42-1.42L2.59 12l5.7 5.71zm6 1.42 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
                                                        </svg> : "" || 
                                    paste.type=="MARKDOWN"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                fill="#A8A8A8" viewBox="0 0 24 24" >
                                                                <path d="M12.65 2.24a1 1 0 0 0-1.3 0L3.84 8.68A6.005 6.005 0 0 0 8.01 19c1.06 0 2.1-.3 3-.82V20h-3v2h8v-2h-3v-1.82c.9.52 1.94.82 3 .82 3.31 0 6-2.69 6-6 0-1.62-.67-3.19-1.88-4.36l-7.47-6.4ZM16 17c-1.25 0-2.45-.6-3.2-1.6l-.8-1.06-.8 1.06A3.999 3.999 0 0 1 4 13c0-1.09.44-2.12 1.18-2.84L12 4.32l6.77 5.8c.79.76 1.23 1.79 1.23 2.88 0 2.21-1.79 4-4 4"></path>
                                                                </svg> : ""
                                    }

                                    <p style={{fontWeight:"500",color:"white"}}>{ paste.type=="CODE"? "Code":"" || paste.type=="TEXT"? "Text":""
                                        || paste.type=="JSON"? "Json":"" || paste.type=="HTML"? "HTML":"" || paste.type=="CSS"? "CSS":""
                                        || paste.type=="TYPE-SCRIPT"? "TypeScript":"" || paste.type=="XML"? "XML":"" || paste.type=="MARKDOWN"? "Markdown":""}</p>
                                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>{paste.title}</p>

                                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                    fill="rgb(44 187 93)" viewBox="0 0 24 24" >
                                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                                    </svg>
                        </div></Link>
                    }
                    else
                    {
                        if(idx===0)
                        { 
                            return <Link to={`/pastes?scrollTo=${paste.id}`} key={paste.id}><div style={{borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}} className='recent-paste'>
                                
                                    { paste.type=="CODE"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="hsl(0 0% 66%)" viewBox="0 0 24 24" >
                                                            <path d="M3 16c0 .34.18.67.47.85l8 5a1.01 1.01 0 0 0 1.06 0l8-5c.29-.18.47-.5.47-.85V8c0-.34-.18-.67-.47-.85l-8-5c-.32-.2-.74-.2-1.06 0l-8 5c-.29.18-.47.5-.47.85zm2-6.53 6 3.6v6.13l-6-3.75zm8 9.73v-6.13l6-3.6v5.98zM12 4.18l5.84 3.65-5.84 3.5-5.84-3.5z"></path>
                                                            </svg> : ""  || 
                                    paste.type=="TEXT"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M18.71 5.29a.996.996 0 0 0-1.41 0l-11 11a1 1 0 0 0-.29.71v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l11-11a.996.996 0 0 0 0-1.41l-3-3ZM9.59 19H8v-1.59l7.5-7.5 1.59 1.59zm8.91-8.91L16.91 8.5 18 7.41 19.59 9zM7 12c.26 0 .5-.15.61-.4l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61L8.84 5.15 7.61 2.38a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39L5.17 5.04 2.39 6.38c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77c.11.24.35.4.61.4Zm14.76 6.63-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                                                            </svg> : ""  || 
                                    paste.type=="JSON"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M4 8c0 2.8-1.68 2.99-2.01 3v2c.1 0 2.01.03 2.01 3 0 4.74 3.27 6 5 6h1v-2h-.99C8.7 20 6 19.83 6 16c0-1.99-.67-3.25-1.5-4C5.34 11.25 6 9.99 6 8c0-3.83 2.7-3.99 3-4h1V2H9C7.27 2 4 3.26 4 8m16 0c0-4.74-3.27-6-5-6h-1v2h.99C15.3 4 18 4.17 18 8c0 1.99.67 3.25 1.5 4-.84.75-1.5 2.01-1.5 4 0 3.83-2.7 3.99-3 4h-1v2h1c1.73 0 5-1.26 5-6 0-2.8 1.68-2.99 2.01-3v-2c-.1 0-2.01-.03-2.01-3"></path>
                                                            </svg> : "" || 
                                    paste.type=="HTML"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="m16.71 16.71 4.7-4.71-4.7-4.71-1.42 1.42 3.3 3.29-3.3 3.29zm-8-1.42L5.41 12l3.3-3.29-1.42-1.42L2.59 12l4.7 4.71zM14 3l-.98-.22-2 9-2 9L10 21l.98.22 2-9 2-9z"></path>
                                                            </svg> : "" || 
                                    paste.type=="CSS"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M16.41 10.41a.998.998 0 0 0 0-1.82l-4.15-1.84-1.84-4.15a.99.99 0 0 0-.91-.59c-.4-.03-.75.22-.92.58L6.74 6.6 2.56 8.61c-.35.17-.57.53-.57.92s.24.74.59.9l4.15 1.84 1.84 4.15a.998.998 0 0 0 1.82 0l1.84-4.15 4.15-1.84Zm-5.82.68L9.5 13.53l-1.09-2.44a.98.98 0 0 0-.51-.51L5.37 9.46l2.55-1.23c.21-.1.38-.27.47-.48l1.08-2.33 1.1 2.48c.1.23.28.41.51.51l2.44 1.09-2.44 1.09c-.23.1-.41.28-.51.51Zm11.01 5.3-2.77-1.23-1.23-2.77a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39l-1.23 2.67-2.78 1.34c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77a.663.663 0 0 0 1.22 0l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61ZM7.76 18.63l-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                                                            </svg> : "" || 
                                    paste.type=="TYPE-SCRIPT"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                    fill="#A8A8A8" viewBox="0 0 24 24" >
                                                                    <path d="m10.04 11.29-3.2 3.21 3.2 3.21 1.42-1.42-1.8-1.79 1.8-1.79zm2.5 1.42 1.8 1.79-1.8 1.79 1.42 1.42 3.2-3.21-3.2-3.21z"></path><path d="m19.94 7.68-.03-.09a.8.8 0 0 0-.2-.29l-5-5c-.09-.09-.19-.15-.29-.2l-.09-.03a.8.8 0 0 0-.26-.05c-.02 0-.04-.01-.06-.01H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12s-.01-.04-.01-.06c0-.09-.02-.17-.05-.26ZM6 20V4h7v4c0 .55.45 1 1 1h4v11z"></path>
                                                                    </svg> : "" || 
                                    paste.type=="XML"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                        fill="#A8A8A8" viewBox="0 0 24 24" >
                                                        <path d="M9.71 16.29 5.41 12l4.3-4.29-1.42-1.42L2.59 12l5.7 5.71zm6 1.42 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
                                                        </svg> : "" || 
                                    paste.type=="MARKDOWN"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                fill="#A8A8A8" viewBox="0 0 24 24" >
                                                                <path d="M12.65 2.24a1 1 0 0 0-1.3 0L3.84 8.68A6.005 6.005 0 0 0 8.01 19c1.06 0 2.1-.3 3-.82V20h-3v2h8v-2h-3v-1.82c.9.52 1.94.82 3 .82 3.31 0 6-2.69 6-6 0-1.62-.67-3.19-1.88-4.36l-7.47-6.4ZM16 17c-1.25 0-2.45-.6-3.2-1.6l-.8-1.06-.8 1.06A3.999 3.999 0 0 1 4 13c0-1.09.44-2.12 1.18-2.84L12 4.32l6.77 5.8c.79.76 1.23 1.79 1.23 2.88 0 2.21-1.79 4-4 4"></path>
                                                                </svg> : ""
                                    }

                                    <p style={{fontWeight:"500",color:"white"}}>{ paste.type=="CODE"? "Code":"" || paste.type=="TEXT"? "Text":""
                                        || paste.type=="JSON"? "Json":"" || paste.type=="HTML"? "HTML":"" || paste.type=="CSS"? "CSS":""
                                        || paste.type=="TYPE-SCRIPT"? "TypeScript":"" || paste.type=="XML"? "XML":"" || paste.type=="MARKDOWN"? "Markdown":""}</p>
                                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>{paste.title}</p>

                                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                    fill="rgb(44 187 93)" viewBox="0 0 24 24" >
                                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                                    </svg>
                            </div></Link>

                        }
                        else if(idx=== recArr.length-1)
                        {
                            return <Link to={`/pastes?scrollTo=${paste.id}`} key={paste.id}><div style={{borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px",borderBottom:"1px solid rgb(59, 59, 59)"}} className='recent-paste'>
                                
                                    { paste.type=="CODE"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="hsl(0 0% 66%)" viewBox="0 0 24 24" >
                                                            <path d="M3 16c0 .34.18.67.47.85l8 5a1.01 1.01 0 0 0 1.06 0l8-5c.29-.18.47-.5.47-.85V8c0-.34-.18-.67-.47-.85l-8-5c-.32-.2-.74-.2-1.06 0l-8 5c-.29.18-.47.5-.47.85zm2-6.53 6 3.6v6.13l-6-3.75zm8 9.73v-6.13l6-3.6v5.98zM12 4.18l5.84 3.65-5.84 3.5-5.84-3.5z"></path>
                                                            </svg> : ""  || 
                                    paste.type=="TEXT"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M18.71 5.29a.996.996 0 0 0-1.41 0l-11 11a1 1 0 0 0-.29.71v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l11-11a.996.996 0 0 0 0-1.41l-3-3ZM9.59 19H8v-1.59l7.5-7.5 1.59 1.59zm8.91-8.91L16.91 8.5 18 7.41 19.59 9zM7 12c.26 0 .5-.15.61-.4l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61L8.84 5.15 7.61 2.38a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39L5.17 5.04 2.39 6.38c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77c.11.24.35.4.61.4Zm14.76 6.63-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                                                            </svg> : ""  || 
                                    paste.type=="JSON"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M4 8c0 2.8-1.68 2.99-2.01 3v2c.1 0 2.01.03 2.01 3 0 4.74 3.27 6 5 6h1v-2h-.99C8.7 20 6 19.83 6 16c0-1.99-.67-3.25-1.5-4C5.34 11.25 6 9.99 6 8c0-3.83 2.7-3.99 3-4h1V2H9C7.27 2 4 3.26 4 8m16 0c0-4.74-3.27-6-5-6h-1v2h.99C15.3 4 18 4.17 18 8c0 1.99.67 3.25 1.5 4-.84.75-1.5 2.01-1.5 4 0 3.83-2.7 3.99-3 4h-1v2h1c1.73 0 5-1.26 5-6 0-2.8 1.68-2.99 2.01-3v-2c-.1 0-2.01-.03-2.01-3"></path>
                                                            </svg> : "" || 
                                    paste.type=="HTML"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="m16.71 16.71 4.7-4.71-4.7-4.71-1.42 1.42 3.3 3.29-3.3 3.29zm-8-1.42L5.41 12l3.3-3.29-1.42-1.42L2.59 12l4.7 4.71zM14 3l-.98-.22-2 9-2 9L10 21l.98.22 2-9 2-9z"></path>
                                                            </svg> : "" || 
                                    paste.type=="CSS"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M16.41 10.41a.998.998 0 0 0 0-1.82l-4.15-1.84-1.84-4.15a.99.99 0 0 0-.91-.59c-.4-.03-.75.22-.92.58L6.74 6.6 2.56 8.61c-.35.17-.57.53-.57.92s.24.74.59.9l4.15 1.84 1.84 4.15a.998.998 0 0 0 1.82 0l1.84-4.15 4.15-1.84Zm-5.82.68L9.5 13.53l-1.09-2.44a.98.98 0 0 0-.51-.51L5.37 9.46l2.55-1.23c.21-.1.38-.27.47-.48l1.08-2.33 1.1 2.48c.1.23.28.41.51.51l2.44 1.09-2.44 1.09c-.23.1-.41.28-.51.51Zm11.01 5.3-2.77-1.23-1.23-2.77a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39l-1.23 2.67-2.78 1.34c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77a.663.663 0 0 0 1.22 0l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61ZM7.76 18.63l-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                                                            </svg> : "" || 
                                    paste.type=="TYPE-SCRIPT"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                    fill="#A8A8A8" viewBox="0 0 24 24" >
                                                                    <path d="m10.04 11.29-3.2 3.21 3.2 3.21 1.42-1.42-1.8-1.79 1.8-1.79zm2.5 1.42 1.8 1.79-1.8 1.79 1.42 1.42 3.2-3.21-3.2-3.21z"></path><path d="m19.94 7.68-.03-.09a.8.8 0 0 0-.2-.29l-5-5c-.09-.09-.19-.15-.29-.2l-.09-.03a.8.8 0 0 0-.26-.05c-.02 0-.04-.01-.06-.01H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12s-.01-.04-.01-.06c0-.09-.02-.17-.05-.26ZM6 20V4h7v4c0 .55.45 1 1 1h4v11z"></path>
                                                                    </svg> : "" || 
                                    paste.type=="XML"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                        fill="#A8A8A8" viewBox="0 0 24 24" >
                                                        <path d="M9.71 16.29 5.41 12l4.3-4.29-1.42-1.42L2.59 12l5.7 5.71zm6 1.42 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
                                                        </svg> : "" || 
                                    paste.type=="MARKDOWN"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                fill="#A8A8A8" viewBox="0 0 24 24" >
                                                                <path d="M12.65 2.24a1 1 0 0 0-1.3 0L3.84 8.68A6.005 6.005 0 0 0 8.01 19c1.06 0 2.1-.3 3-.82V20h-3v2h8v-2h-3v-1.82c.9.52 1.94.82 3 .82 3.31 0 6-2.69 6-6 0-1.62-.67-3.19-1.88-4.36l-7.47-6.4ZM16 17c-1.25 0-2.45-.6-3.2-1.6l-.8-1.06-.8 1.06A3.999 3.999 0 0 1 4 13c0-1.09.44-2.12 1.18-2.84L12 4.32l6.77 5.8c.79.76 1.23 1.79 1.23 2.88 0 2.21-1.79 4-4 4"></path>
                                                                </svg> : ""
                                    }

                                    <p style={{fontWeight:"500",color:"white"}}>{ paste.type=="CODE"? "Code":"" || paste.type=="TEXT"? "Text":""
                                        || paste.type=="JSON"? "Json":"" || paste.type=="HTML"? "HTML":"" || paste.type=="CSS"? "CSS":""
                                        || paste.type=="TYPE-SCRIPT"? "TypeScript":"" || paste.type=="XML"? "XML":"" || paste.type=="MARKDOWN"? "Markdown":""}</p>
                                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>{paste.title}</p>

                                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                    fill="rgb(44 187 93)" viewBox="0 0 24 24" >
                                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                                    </svg>
                            </div></Link>
                        }
                        else{
                            
                            return <Link to={`/pastes?scrollTo=${paste.id}`} key={paste.id}><div className='recent-paste'>
                                
                                    { paste.type=="CODE"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="hsl(0 0% 66%)" viewBox="0 0 24 24" >
                                                            <path d="M3 16c0 .34.18.67.47.85l8 5a1.01 1.01 0 0 0 1.06 0l8-5c.29-.18.47-.5.47-.85V8c0-.34-.18-.67-.47-.85l-8-5c-.32-.2-.74-.2-1.06 0l-8 5c-.29.18-.47.5-.47.85zm2-6.53 6 3.6v6.13l-6-3.75zm8 9.73v-6.13l6-3.6v5.98zM12 4.18l5.84 3.65-5.84 3.5-5.84-3.5z"></path>
                                                            </svg> : ""  || 
                                    paste.type=="TEXT"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M18.71 5.29a.996.996 0 0 0-1.41 0l-11 11a1 1 0 0 0-.29.71v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l11-11a.996.996 0 0 0 0-1.41l-3-3ZM9.59 19H8v-1.59l7.5-7.5 1.59 1.59zm8.91-8.91L16.91 8.5 18 7.41 19.59 9zM7 12c.26 0 .5-.15.61-.4l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61L8.84 5.15 7.61 2.38a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39L5.17 5.04 2.39 6.38c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77c.11.24.35.4.61.4Zm14.76 6.63-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                                                            </svg> : ""  || 
                                    paste.type=="JSON"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M4 8c0 2.8-1.68 2.99-2.01 3v2c.1 0 2.01.03 2.01 3 0 4.74 3.27 6 5 6h1v-2h-.99C8.7 20 6 19.83 6 16c0-1.99-.67-3.25-1.5-4C5.34 11.25 6 9.99 6 8c0-3.83 2.7-3.99 3-4h1V2H9C7.27 2 4 3.26 4 8m16 0c0-4.74-3.27-6-5-6h-1v2h.99C15.3 4 18 4.17 18 8c0 1.99.67 3.25 1.5 4-.84.75-1.5 2.01-1.5 4 0 3.83-2.7 3.99-3 4h-1v2h1c1.73 0 5-1.26 5-6 0-2.8 1.68-2.99 2.01-3v-2c-.1 0-2.01-.03-2.01-3"></path>
                                                            </svg> : "" || 
                                    paste.type=="HTML"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="m16.71 16.71 4.7-4.71-4.7-4.71-1.42 1.42 3.3 3.29-3.3 3.29zm-8-1.42L5.41 12l3.3-3.29-1.42-1.42L2.59 12l4.7 4.71zM14 3l-.98-.22-2 9-2 9L10 21l.98.22 2-9 2-9z"></path>
                                                            </svg> : "" || 
                                    paste.type=="CSS"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                            fill="#A8A8A8" viewBox="0 0 24 24" >
                                                            <path d="M16.41 10.41a.998.998 0 0 0 0-1.82l-4.15-1.84-1.84-4.15a.99.99 0 0 0-.91-.59c-.4-.03-.75.22-.92.58L6.74 6.6 2.56 8.61c-.35.17-.57.53-.57.92s.24.74.59.9l4.15 1.84 1.84 4.15a.998.998 0 0 0 1.82 0l1.84-4.15 4.15-1.84Zm-5.82.68L9.5 13.53l-1.09-2.44a.98.98 0 0 0-.51-.51L5.37 9.46l2.55-1.23c.21-.1.38-.27.47-.48l1.08-2.33 1.1 2.48c.1.23.28.41.51.51l2.44 1.09-2.44 1.09c-.23.1-.41.28-.51.51Zm11.01 5.3-2.77-1.23-1.23-2.77a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39l-1.23 2.67-2.78 1.34c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77a.663.663 0 0 0 1.22 0l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61ZM7.76 18.63l-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                                                            </svg> : "" || 
                                    paste.type=="TYPE-SCRIPT"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                    fill="#A8A8A8" viewBox="0 0 24 24" >
                                                                    <path d="m10.04 11.29-3.2 3.21 3.2 3.21 1.42-1.42-1.8-1.79 1.8-1.79zm2.5 1.42 1.8 1.79-1.8 1.79 1.42 1.42 3.2-3.21-3.2-3.21z"></path><path d="m19.94 7.68-.03-.09a.8.8 0 0 0-.2-.29l-5-5c-.09-.09-.19-.15-.29-.2l-.09-.03a.8.8 0 0 0-.26-.05c-.02 0-.04-.01-.06-.01H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12s-.01-.04-.01-.06c0-.09-.02-.17-.05-.26ZM6 20V4h7v4c0 .55.45 1 1 1h4v11z"></path>
                                                                    </svg> : "" || 
                                    paste.type=="XML"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                        fill="#A8A8A8" viewBox="0 0 24 24" >
                                                        <path d="M9.71 16.29 5.41 12l4.3-4.29-1.42-1.42L2.59 12l5.7 5.71zm6 1.42 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
                                                        </svg> : "" || 
                                    paste.type=="MARKDOWN"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                fill="#A8A8A8" viewBox="0 0 24 24" >
                                                                <path d="M12.65 2.24a1 1 0 0 0-1.3 0L3.84 8.68A6.005 6.005 0 0 0 8.01 19c1.06 0 2.1-.3 3-.82V20h-3v2h8v-2h-3v-1.82c.9.52 1.94.82 3 .82 3.31 0 6-2.69 6-6 0-1.62-.67-3.19-1.88-4.36l-7.47-6.4ZM16 17c-1.25 0-2.45-.6-3.2-1.6l-.8-1.06-.8 1.06A3.999 3.999 0 0 1 4 13c0-1.09.44-2.12 1.18-2.84L12 4.32l6.77 5.8c.79.76 1.23 1.79 1.23 2.88 0 2.21-1.79 4-4 4"></path>
                                                                </svg> : ""
                                    }

                                    <p style={{fontWeight:"500",color:"white"}}>{ paste.type=="CODE"? "Code":"" || paste.type=="TEXT"? "Text":""
                                        || paste.type=="JSON"? "Json":"" || paste.type=="HTML"? "HTML":"" || paste.type=="CSS"? "CSS":""
                                        || paste.type=="TYPE-SCRIPT"? "TypeScript":"" || paste.type=="XML"? "XML":"" || paste.type=="MARKDOWN"? "Markdown":""}</p>
                                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>{paste.title}</p>

                                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                    fill="rgb(44 187 93)" viewBox="0 0 24 24" >
                                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                                    </svg>
                            </div></Link>
                        }

                    }

                })}



                {/* <div style={{borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}} className='recent-paste'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="hsl(0 0% 66%)" viewBox="0 0 24 24" >
                    <path d="M3 16c0 .34.18.67.47.85l8 5a1.01 1.01 0 0 0 1.06 0l8-5c.29-.18.47-.5.47-.85V8c0-.34-.18-.67-.47-.85l-8-5c-.32-.2-.74-.2-1.06 0l-8 5c-.29.18-.47.5-.47.85zm2-6.53 6 3.6v6.13l-6-3.75zm8 9.73v-6.13l6-3.6v5.98zM12 4.18l5.84 3.65-5.84 3.5-5.84-3.5z"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"white"}}>Code</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>React Notes n</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>
                <div className='recent-paste'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M18.71 5.29a.996.996 0 0 0-1.41 0l-11 11a1 1 0 0 0-.29.71v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l11-11a.996.996 0 0 0 0-1.41l-3-3ZM9.59 19H8v-1.59l7.5-7.5 1.59 1.59zm8.91-8.91L16.91 8.5 18 7.41 19.59 9zM7 12c.26 0 .5-.15.61-.4l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61L8.84 5.15 7.61 2.38a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39L5.17 5.04 2.39 6.38c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77c.11.24.35.4.61.4Zm14.76 6.63-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"white"}}>Text</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>DSA (Data Structure And Algorithms)</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>
                <div className='recent-paste'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M4 8c0 2.8-1.68 2.99-2.01 3v2c.1 0 2.01.03 2.01 3 0 4.74 3.27 6 5 6h1v-2h-.99C8.7 20 6 19.83 6 16c0-1.99-.67-3.25-1.5-4C5.34 11.25 6 9.99 6 8c0-3.83 2.7-3.99 3-4h1V2H9C7.27 2 4 3.26 4 8m16 0c0-4.74-3.27-6-5-6h-1v2h.99C15.3 4 18 4.17 18 8c0 1.99.67 3.25 1.5 4-.84.75-1.5 2.01-1.5 4 0 3.83-2.7 3.99-3 4h-1v2h1c1.73 0 5-1.26 5-6 0-2.8 1.68-2.99 2.01-3v-2c-.1 0-2.01-.03-2.01-3"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"white"}}>Json</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>Gaurav Kanojia Prep</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>
                <div className='recent-paste'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="m16.71 16.71 4.7-4.71-4.7-4.71-1.42 1.42 3.3 3.29-3.3 3.29zm-8-1.42L5.41 12l3.3-3.29-1.42-1.42L2.59 12l4.7 4.71zM14 3l-.98-.22-2 9-2 9L10 21l.98.22 2-9 2-9z"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"white"}}>HTML</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>my html file</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>
                <div className='recent-paste'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="m10.04 11.29-3.2 3.21 3.2 3.21 1.42-1.42-1.8-1.79 1.8-1.79zm2.5 1.42 1.8 1.79-1.8 1.79 1.42 1.42 3.2-3.21-3.2-3.21z"></path><path d="m19.94 7.68-.03-.09a.8.8 0 0 0-.2-.29l-5-5c-.09-.09-.19-.15-.29-.2l-.09-.03a.8.8 0 0 0-.26-.05c-.02 0-.04-.01-.06-.01H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12s-.01-.04-.01-.06c0-.09-.02-.17-.05-.26ZM6 20V4h7v4c0 .55.45 1 1 1h4v11z"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"white"}}>TypeScript</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>My FILE learning</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>
                <div className='recent-paste'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M12.65 2.24a1 1 0 0 0-1.3 0L3.84 8.68A6.005 6.005 0 0 0 8.01 19c1.06 0 2.1-.3 3-.82V20h-3v2h8v-2h-3v-1.82c.9.52 1.94.82 3 .82 3.31 0 6-2.69 6-6 0-1.62-.67-3.19-1.88-4.36l-7.47-6.4ZM16 17c-1.25 0-2.45-.6-3.2-1.6l-.8-1.06-.8 1.06A3.999 3.999 0 0 1 4 13c0-1.09.44-2.12 1.18-2.84L12 4.32l6.77 5.8c.79.76 1.23 1.79 1.23 2.88 0 2.21-1.79 4-4 4"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"white"}}>MarkDown</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>My Markdown notes</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>
                <div className='recent-paste'>
                   <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M9.71 16.29 5.41 12l4.3-4.29-1.42-1.42L2.59 12l5.7 5.71zm6 1.42 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"white"}}>XML</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>Nikita XML</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>
                <div style={{borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px",borderBottom:"1px solid rgb(59, 59, 59)"}} className='recent-paste'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M16.41 10.41a.998.998 0 0 0 0-1.82l-4.15-1.84-1.84-4.15a.99.99 0 0 0-.91-.59c-.4-.03-.75.22-.92.58L6.74 6.6 2.56 8.61c-.35.17-.57.53-.57.92s.24.74.59.9l4.15 1.84 1.84 4.15a.998.998 0 0 0 1.82 0l1.84-4.15 4.15-1.84Zm-5.82.68L9.5 13.53l-1.09-2.44a.98.98 0 0 0-.51-.51L5.37 9.46l2.55-1.23c.21-.1.38-.27.47-.48l1.08-2.33 1.1 2.48c.1.23.28.41.51.51l2.44 1.09-2.44 1.09c-.23.1-.41.28-.51.51Zm11.01 5.3-2.77-1.23-1.23-2.77a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39l-1.23 2.67-2.78 1.34c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77a.663.663 0 0 0 1.22 0l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61ZM7.76 18.63l-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"white"}}>CSS</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>CSS notebook Live</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div> */}
            </div>


            <div style={{marginTop:"20px"}}>
                <p style={{color:"white",fontWeight:"500"}}>General Settings</p>
                <p style={{fontSize:"12px",marginTop:"3px",color:"#A8A8A8"}} >You can log in using your email, phone number, or UserId.</p>
            </div>


            <div>

                <div style={{borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}} className='recent-paste' onClick={()=>{setUseridModal(true)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  width="17" height="17"  
                    fill="#A8A8A8">
                    <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/>
                    </svg>
                    <p style={{fontWeight:"500",color:"white"}}>GoPaste ID</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px",overflow:"hidden"}}>{userData.userID}</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>

                <div className='recent-paste' onClick={()=>{setEmailModal(true)}}>
                    <svg style={{marginLeft:"1px"}} width="16" height="16"  
                    fill="#A8A8A8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" className="svg-inline--fa fa-envelope absolute h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em] left-1/2 top-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#A8A8A8" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"white"}}>Email</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px",overflow:"hidden"}}>{userData.email}</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>

                <div className='recent-paste' onClick={()=>{setPhoneModal(true)}}>
                    <svg style={{marginLeft:"1px"}} width="16" height="16"  
                    fill="#A8A8A8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" className="svg-inline--fa fa-phone absolute h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em] left-1/2 top-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="#A8A8A8" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"white"}}>Phone Number</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px",overflow:"hidden"}}>{userData.phone}</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>

                <div style={{borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px",borderBottom:"1px solid rgb(59, 59, 59)"}} className='recent-paste' onClick={()=>{setPassModal(true)}}>
                    <svg style={{marginLeft:"1px"}} width="15" height="15"  
                    fill="#A8A8A8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key" className="svg-inline--fa fa-key absolute h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em] left-1/2 top-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="#A8A8A8" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"white",marginLeft:"1px"}}>Password</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px"}}>{password!=""? "Set":"Not Set"}</p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>

            </div>




            <div style={{marginTop:"8px"}}>
                {/* <p style={{color:"white",fontWeight:"500"}}>Danger Zone</p>  */}
                <p style={{fontSize:"12px",marginTop:"3px",color:"#A8A8A8"}} >Clicking will remove all the pastes data created by user.</p>
            </div>


            <div>
                <div style={{border:"1px solid rgb(59, 59, 59)",borderRadius:"10px"}} className='recent-paste'>
                    <svg width="16" height="16"  
                    fill="#F75C59" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash" className="svg-inline--fa fa-trash absolute h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em] left-1/2 top-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="#F75C59" d="M177.1 48h93.7c2.7 0 5.2 1.3 6.7 3.6l19 28.4h-145l19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1c-18.7 0-36.2 9.4-46.6 24.9L93.8 80H80.1 32 24C10.7 80 0 90.7 0 104s10.7 24 24 24H35.6L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3H324.6c33.5 0 61.3-25.9 63.8-59.3L412.4 128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H367.9 354.2zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8H123.4c-8.4 0-15.3-6.5-16-14.8L83.7 128H364.3z"></path>
                    </svg>
                    <p style={{fontWeight:"500",color:"#F75C59",marginLeft:"1px"}}>Delete Pastes</p>
                    <p style={{fontSize:"12px",color:"#A8A8A8",maxWidth:"150px",overflow:"hidden"}}></p>

                    <svg style={{position:"absolute",left:"265px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="#A8A8A8" viewBox="0 0 24 24" >
                    <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
                    </svg>
                </div>
            </div>


           


           

           { 
                useridModal && <div className='overlay-userid' onClick={handleCross}>
                    
                    <div className='userid-modal' onClick={(e)=>{e.stopPropagation()}}>

                        <div style={{width:"92%",display:"flex",gap:"10px",marginBottom:"6px"}}>
                            {/* <img id='userid-photo' src={"https://assets.leetcode.com/users/avatars/avatar_1644651796.png"} alt="" /> */}
                            <p style={{color:"white",fontSize:"18px",fontWeight:"500"}}>Update Your GoPaste ID</p>
                        </div>

                         
                        <div style={{width:"92%",display:"flex",flexDirection:"column",gap:"8px"}}>
                            <p className='detail-para'>Please provide your GoPaste UserID for better management.</p>
                            <input onChange={(e)=>{setUserName(e.target.value)}} value={userName} className='input-stye' type="text" autoComplete='username' name="" placeholder='GoPaste ID'/>
                            <p style={{color:" rgb(151, 150, 150)",fontSize:"12px"}}>Only one change is allowed every 90 days.</p>
                        </div>

                        <div className='button-div-2'>
                            <button className='cancel-btn2' onClick={()=>{handleCross()}}>Cancel</button>
                            <button onClick={()=>{dispatch(saveUserData({field:"userID",value:userName})); handleCross();}} className='save-btn'>Save Changes</button>
                        </div>

                    </div>

                </div>

            }


            { 
                emailModal && <div className='overlay-userid' onClick={handleCross2}>
                    
                        <div className='userid-modal' onClick={(e)=>{e.stopPropagation()}}>

                            <div style={{width:"92%",display:"flex",gap:"10px",marginBottom:"6px"}}>
                                {/* <img id='userid-photo' src={"https://assets.leetcode.com/users/avatars/avatar_1644651796.png"} alt="" /> */}
                                <p style={{color:"white",fontSize:"18px",fontWeight:"500"}}>Manage your email</p>
                            </div>

                            
                            <div style={{width:"92%",display:"flex",flexDirection:"column",gap:"8px"}}>
                                <p className='detail-para'>This email will be used for user login and management.</p>
                                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className='input-stye' type="email" autoComplete='email' name="" placeholder='Email Address'/>
                                <p style={{color:" rgb(151, 150, 150)",fontSize:"12px"}}>Primary email keeps your account secure and can’t be removed.</p>
                            </div>

                            <div className='button-div-2'>
                                <button className='cancel-btn2' onClick={()=>{handleCross2()}}>Cancel</button>
                                <button onClick={()=>{dispatch(saveUserData({field:"email",value:email})); handleCross2();}} className='save-btn'>Save Changes</button>
                            </div>

                        </div>

                </div>

            }


            { 
                phoneModal && <div className='overlay-userid' onClick={handleCross3}>
                    
                        <div className='userid-modal' onClick={(e)=>{e.stopPropagation()}}>

                                <div style={{width:"92%",display:"flex",gap:"10px",marginBottom:"6px"}}>
                                    {/* <img id='userid-photo' src={"https://assets.leetcode.com/users/avatars/avatar_1644651796.png"} alt="" /> */}
                                    <p style={{color:"white",fontSize:"18px",fontWeight:"500"}}>Add Phone Number</p>
                                </div>

                                
                                <div style={{width:"92%",display:"flex",flexDirection:"column",gap:"8px"}}>
                                    <p className='detail-para'>Provide number for user login credentials purpose.</p>
                                    <input onChange={(e)=>{setPhone(e.target.value)}} value={phone} className='input-stye' type="tel" autoComplete='tel' maxLength={10} name="" placeholder='Phone Number'/>
                                    <p style={{color:" rgb(151, 150, 150)",fontSize:"12px"}}>Receive updates via text messages.</p>
                                </div>

                                <div className='button-div-2'>
                                    <button className='cancel-btn2' onClick={()=>{handleCross3()}}>Cancel</button>
                                    <button onClick={()=>{dispatch(saveUserData({field:"phone",value:phone})); handleCross3();}} className='save-btn'>Save Changes</button>
                                </div>

                        </div>

                </div>

            }


            { 
                passModal && <div className='overlay-userid' onClick={handleCross4}>
                    
                    <div style={{height:"299px"}} className='userid-modal' onClick={(e)=>{e.stopPropagation()}}>

                                <div style={{width:"92%",display:"flex",gap:"10px",marginBottom:"6px"}}>
                                    {/* <img id='userid-photo' src={"https://assets.leetcode.com/users/avatars/avatar_1644651796.png"} alt="" /> */}
                                    <p style={{color:"white",fontSize:"18px",fontWeight:"500"}}>Set Password</p>
                                </div>

                                
                                <div style={{position:"relative",width:"92%",display:"flex",flexDirection:"column",gap:"8px"}}>
                                    <p className='detail-para'>Please provide a strong password.</p>
                                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className="input-stye" type={passwordSVG? "text":"password"} name="" placeholder='Enter Password'/>
                                    {/* <p style={{color:" rgb(151, 150, 150)",fontSize:"14px"}}>Receive updates via text messages.</p> */}
                                   
                                    {
                                        passwordSVG ?
                                        <svg onClick={()=>{setPasswordSVG(!passwordSVG)}} style={{position:"absolute",top:"37px",left:"435px",cursor:"pointer"}}  xmlns="http://www.w3.org/2000/svg" width="22" height="22"  
                                        fill="white" viewBox="0 0 24 24" >
                                        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path>
                                        </svg>      
                                        : <svg onClick={()=>{setPasswordSVG(!passwordSVG)}} style={{position:"absolute",top:"37px",left:"435px",cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="22" height="22"  
                                        fill="white" viewBox="0 0 24 24" >
                                        <path d="M12 17c-5.35 0-7.42-3.84-7.93-5 .2-.46.65-1.34 1.45-2.23l-1.4-1.4c-1.49 1.65-2.06 3.28-2.08 3.31-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68.91 0 1.73-.1 2.49-.26l-1.77-1.77c-.24.02-.47.03-.72.03Zm9.95-4.68c.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68-1.84 0-3.36.39-4.61.97L2.71 1.29 1.3 2.7l4.32 4.32 1.42 1.42 2.27 2.27 3.98 3.98 1.8 1.8 1.53 1.53 4.68 4.68 1.41-1.41-4.32-4.32c2.61-1.95 3.55-4.61 3.56-4.65m-7.25.97c.19-.39.3-.83.3-1.29 0-1.64-1.36-3-3-3-.46 0-.89.11-1.29.3l-1.8-1.8c.88-.31 1.9-.5 3.08-.5 5.35 0 7.42 3.85 7.93 5-.3.69-1.18 2.33-2.96 3.55z"></path>
                                        </svg>
                                     }

                                </div>

                                <div style={{position:"relative",width:"92%",display:"flex",flexDirection:"column",gap:"8px"}}>
                                    <p className='detail-para'>Confirm password.</p>
                                    <input onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmPassword} className='input-stye' type={confirmSVG ? "text":"password"} name="" placeholder='Re-Enter Password'/>
                                    <p style={{color:" rgb(151, 150, 150)",fontSize:"12px"}}>At least 8 characters with a mix of letters and numbers, no special characters.</p>

                                    {
                                        confirmSVG?
                                          <svg onClick={()=>{setConfirmSVG(!confirmSVG)}} style={{position:"absolute",top:"37px",left:"435px",cursor:"pointer"}}  xmlns="http://www.w3.org/2000/svg" width="22" height="22"  
                                        fill="white" viewBox="0 0 24 24" >
                                        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path>
                                        </svg>      
                                        : <svg onClick={()=>{setConfirmSVG(!confirmSVG)}} style={{position:"absolute",top:"37px",left:"435px",cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="22" height="22"  
                                        fill="white" viewBox="0 0 24 24" >
                                        <path d="M12 17c-5.35 0-7.42-3.84-7.93-5 .2-.46.65-1.34 1.45-2.23l-1.4-1.4c-1.49 1.65-2.06 3.28-2.08 3.31-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68.91 0 1.73-.1 2.49-.26l-1.77-1.77c-.24.02-.47.03-.72.03Zm9.95-4.68c.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68-1.84 0-3.36.39-4.61.97L2.71 1.29 1.3 2.7l4.32 4.32 1.42 1.42 2.27 2.27 3.98 3.98 1.8 1.8 1.53 1.53 4.68 4.68 1.41-1.41-4.32-4.32c2.61-1.95 3.55-4.61 3.56-4.65m-7.25.97c.19-.39.3-.83.3-1.29 0-1.64-1.36-3-3-3-.46 0-.89.11-1.29.3l-1.8-1.8c.88-.31 1.9-.5 3.08-.5 5.35 0 7.42 3.85 7.93 5-.3.69-1.18 2.33-2.96 3.55z"></path>
                                        </svg>       
                                    }

                                </div>

                                <div className='button-div-2'>
                                    <button className='cancel-btn2' onClick={()=>{handleCross4()}}>Cancel</button>
                                    <button onClick={()=>{handlePassword();}} className='save-btn'>Save Changes</button>
                                </div>

                        </div>

                </div>

            }

            



       </div>
        
    </div>
  )
}

export default RightBar
