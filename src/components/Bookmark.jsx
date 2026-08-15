import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Bookmark.css"
import bookPic from "../assets/happy-face.png";
import heart from "../assets/heart.png";
import pencil from "../assets/pencil (1).png";
import pin from "../assets/pin.png"
import pinLogo from "../assets/pin-logo.png"
import pinReal from "../assets/pin-real.png"
import goldPin from "../assets/gold-pin.png"
import pattern from "../assets/pattern.avif"
import plateColor from "../assets/palette.png"
import arrow from "../assets/circular-arrow.png"
import notes from "../assets/notes.png"
import saveLogo from "../assets/bookmark.png"
import { Link } from 'react-router-dom';
import { saveBoxColorData } from '../features/pasteSlice';
import { updateToPastes } from '../features/pasteSlice';
import { savePinnedData } from '../features/pasteSlice';
import toast from 'react-hot-toast';

const Bookmark = () => {
  
  const userData=useSelector((state)=>state.paste.userData);  
  const pastes=useSelector((state)=>{return state.paste.pastes});  

  console.log(userData);

  const bookmarkArr=[];

  for(let i=0;i<pastes.length;i++)
  {
       if(pastes[i].bookmarked==true)
       {
           bookmarkArr.push(pastes[i]);
       }
  }

  
  const [bookInput,setBookInput]=useState("");

  const filterArr=bookmarkArr.filter((paste,idx)=>{
         return  paste.title.toLowerCase().includes(bookInput.toLowerCase());
  });


  const colorsArr=["#ffffff0f","#FF9494","#7293f7","#C8FFD4","#FBF3B9","#FFB996","#CDC1FF","#FDCEDF"];
  const [selectedCard,setSelectedCard]=useState(null);
  const [colorModal,setColorModal]=useState(false);
  
  function handlePencilClick(e,myID){
        e.preventDefault();
        setColorModal(true);

        setSelectedCard(myID);        
  } 

  function handleCrossColor(){
        setColorModal(false);
  }

  const dispatch=useDispatch();
//   const [colorChangedCards,setColorChangedCards]=useState({});
  function handleColorChange(color){
        
        const newobj={...userData.myColor,[selectedCard]:color};

        dispatch(saveBoxColorData(newobj));  
  }


  function handlePin(){

       const myPaste=pastes.find((paste,idx)=>{
            return paste.id===selectedCard;
       });

    //    myPaste.pinned=!myPaste.pinned;  this is wrong
       
        if(myPaste.pinned===false)
        {
             toast.custom(
                        <div className='custom-toast-pinned'>
                            <svg style={{marginTop:"3px"}} xmlns="http://www.w3.org/2000/svg" width="23" height="23"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M17 2H7c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2v3.38l-.89.45A2 2 0 0 0 5 13.62V16c0 .55.45 1 1 1h5v3l1 2 1-2v-3h5c.55 0 1-.45 1-1v-2.38c0-.76-.42-1.45-1.11-1.79l-.89-.45V8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 13H7v-1.38l1.45-.72a1 1 0 0 0 .55-.89v-4h6v4c0 .38.21.73.55.89l1.45.72zm0-9H7V4h10z"></path>
                            </svg>
                            <span>Pinned</span>
                        </div>,
                            {
                            duration:4000,
                            }
                        );
        }
        else{
            // const newObj={...userData.pinned,[selectedCard]:{comment:"",name:""}};
            // dispatch(savePinnedData(newObj));
                 toast.custom(
                        <div className='custom-toast-pinned unpin'>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="23" height="23"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="m14.91 13.5 1.59-1.59.79.79c.39.39 1.02.39 1.41 0l3-3a.996.996 0 0 0 0-1.41l-6-6a.996.996 0 0 0-1.41 0l-3 3a.996.996 0 0 0 0 1.41l.79.79-1.59 1.59-.79-.79-6.99-7L1.3 2.7l6.29 6.29L9 10.4l.79.79 3 3 .79.79 1.41 1.41 6.29 6.29 1.41-1.41-7-7-.79-.79Zm-.71-5.29a.996.996 0 0 0 0-1.41l-.79-.79L15 4.42l4.59 4.59L18 10.6l-.79-.79a.996.996 0 0 0-1.41 0l-2.29 2.29-1.59-1.59 2.29-2.29ZM12 16.59 7.41 12l.17-.17-1.41-1.41-.88.88a.996.996 0 0 0 0 1.41L7.58 15l-5.29 5.29L3.7 21.7l5.29-5.29 2.29 2.29c.2.2.45.29.71.29s.51-.1.71-.29l.88-.88-1.41-1.41-.17.17Z"></path>
                            </svg>
                            <span>Unpinned</span>
                        </div>,
                            {
                            duration:4000,
                            }
                        )
        }
       
       dispatch(updateToPastes({...myPaste,pinned:!myPaste.pinned}));
  }


//   function handleSavePinned(myID){

//         const newObj={...userData.pinned, [myID]:{comment:pinnedComment, name:pinnedName}};
//         dispatch(savePinnedData(newObj));
//   }


  return (
    <div className='bookmark-outer-div'>


        <div className='bookmark-div'>

           <div style={{width:"90%",display:"flex",justifyContent:"start",alignItems:"center",gap:"0.8rem"}}>
                {/* <svg style={{marginTop:"5px"}} xmlns="http://www.w3.org/2000/svg" width="37" height="37"  
                fill="red" viewBox="0 0 24 24" >
                <path d="M11.29 20.66c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.3-2.28-5.85-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41zM5.21 6.16C6 5.38 7 4.99 8.01 4.99s2.01.39 2.79 1.17l.5.5c.39.39 1.02.39 1.41 0l.5-.5c1.56-1.56 4.02-1.56 5.59 0 1.56 1.57 1.56 4.02 0 5.58l-6.79 6.79-6.79-6.79a3.91 3.91 0 0 1 0-5.58Z"></path>
                </svg> */}
                <img id='book-pic' src={bookPic} alt="" />
                <p  id='bookmark-heading'>{userData.userID}'s Favourite</p>
           </div>

           
           <div style={{width:"90%",position:"relative"}}>
                <input onChange={(e)=>{setBookInput(e.target.value);}} id='bookmark-input' type="text" placeholder='Search your favourite...'/>

                <svg style={{position:"absolute",top:"12px",left:"11px"}}  xmlns="http://www.w3.org/2000/svg" width="18" height="18"  
                fill="#716f6f" viewBox="0 0 24 24" >
                <path d="M10.5 19c1.98 0 3.81-.69 5.25-1.83L20 21.42l1.41-1.41-4.25-4.25a8.47 8.47 0 0 0 1.83-5.25c0-4.69-3.81-8.5-8.5-8.5S2 5.81 2 10.5 5.81 19 10.5 19m0-15c3.58 0 6.5 2.92 6.5 6.5S14.08 17 10.5 17 4 14.08 4 10.5 6.92 4 10.5 4"></path>
                </svg>
            </div>

            <div className='bookmark-cards-div'>
                
                {
                    filterArr.map((paste,idx)=>{
                        
                        return <div className='link-div' key={paste.id}>
                                   <Link to={`/pastes/?scrollTo=${paste.id}`}>
                                        <div className='bookmark-cards' style={{backgroundColor: userData.myColor?.[paste.id] ? `${userData.myColor[paste.id]}`:"#ffffff0f"}}>
                                            
                                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"90%"}}>
                                                <div className='book-type-div'>

                                                    {   paste.type=="CODE"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                            fill="rgb(44 187 93)" viewBox="0 0 24 24" >
                                                                            <path d="M3 16c0 .34.18.67.47.85l8 5a1.01 1.01 0 0 0 1.06 0l8-5c.29-.18.47-.5.47-.85V8c0-.34-.18-.67-.47-.85l-8-5c-.32-.2-.74-.2-1.06 0l-8 5c-.29.18-.47.5-.47.85zm2-6.53 6 3.6v6.13l-6-3.75zm8 9.73v-6.13l6-3.6v5.98zM12 4.18l5.84 3.65-5.84 3.5-5.84-3.5z"></path>
                                                                            </svg> : ""  || 
                                                        paste.type=="TEXT"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                                fill="rgb(10 132 255)" viewBox="0 0 24 24" >
                                                                                <path d="M18.71 5.29a.996.996 0 0 0-1.41 0l-11 11a1 1 0 0 0-.29.71v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l11-11a.996.996 0 0 0 0-1.41l-3-3ZM9.59 19H8v-1.59l7.5-7.5 1.59 1.59zm8.91-8.91L16.91 8.5 18 7.41 19.59 9zM7 12c.26 0 .5-.15.61-.4l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61L8.84 5.15 7.61 2.38a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39L5.17 5.04 2.39 6.38c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77c.11.24.35.4.61.4Zm14.76 6.63-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                                                                                </svg> : ""  || 
                                                        paste.type=="JSON"? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="20" height="20" fill="rgb(100 210 255)" class="mr-2 hidden h-[18px] w-[18px] lg:block text-teal dark:text-dark-teal"><mask id="javascript_svg__a" width="16" height="18" x="0.8" y="0.081" maskUnits="userSpaceOnUse">
                                                                            <path d="M.8.081h16v18H.8z"></path><path d="M11.221 11.254a3.236 3.236 0 01-1.735-.314 1.135 1.135 0 01-.425-.798.175.175 0 00-.18-.174 37.413 37.413 0 00-.753 0 .167.167 0 00-.183.147 1.843 1.843 0 00.597 1.456 3.175 3.175 0 001.767.663c.67.078 1.349.049 2.01-.085a2.484 2.484 0 001.332-.714c.402-.494.521-1.16.313-1.762a1.481 1.481 0 00-.975-.864c-1.016-.356-2.114-.328-3.15-.598-.18-.055-.4-.117-.48-.306a.673.673 0 01.225-.755 2.037 2.037 0 011.071-.265 3.248 3.248 0 011.494.213c.288.169.488.456.545.783a.192.192 0 00.181.186c.25.006.498.002.749.002a.18.18 0 00.195-.132 1.92 1.92 0 00-.942-1.664 4.685 4.685 0 00-2.553-.388 2.788 2.788 0 00-1.726.69 1.712 1.712 0 00-.344 1.786 1.529 1.529 0 00.966.84c1.014.363 2.124.246 3.145.569.2.067.432.17.493.39a.782.782 0 01-.214.748 2.366 2.366 0 01-1.423.346zm4.361-6.669a6909.08 6909.08 0 00-5.934-3.336 1.336 1.336 0 00-1.298 0L2.438 4.572a1.217 1.217 0 00-.638 1.06v6.692a1.226 1.226 0 00.663 1.07c.566.306 1.116.645 1.693.931a2.441 2.441 0 002.172.06 1.678 1.678 0 00.79-1.518c.003-2.208 0-4.417.001-6.625a.173.173 0 00-.164-.201 31.753 31.753 0 00-.756 0 .167.167 0 00-.182.168c-.003 2.194.002 4.39 0 6.585 0 .31-.193.588-.485.697a1.22 1.22 0 01-.984-.132l-1.572-.884a.187.187 0 01-.107-.186V5.667a.204.204 0 01.124-.205l5.891-3.306a.204.204 0 01.232 0l5.892 3.305a.207.207 0 01.123.205v6.624a.191.191 0 01-.106.188c-1.934 1.089-3.87 2.176-5.805 3.262-.092.05-.202.133-.31.07-.508-.285-1.007-.582-1.513-.87a.163.163 0 00-.183-.012c-.222.13-.456.24-.7.326-.109.044-.244.057-.32.158.096.104.213.187.344.245l1.773 1.02a1.298 1.298 0 001.314.036c1.97-1.105 3.941-2.211 5.912-3.319a1.229 1.229 0 00.663-1.07V5.631a1.216 1.216 0 00-.618-1.046z"></path></mask><path d="M11.221 11.254a3.236 3.236 0 01-1.735-.314 1.135 1.135 0 01-.425-.798.175.175 0 00-.18-.174 37.413 37.413 0 00-.753 0 .167.167 0 00-.183.147 1.843 1.843 0 00.597 1.456 3.175 3.175 0 001.767.663c.67.078 1.349.049 2.01-.085a2.484 2.484 0 001.332-.714c.402-.494.521-1.16.313-1.762a1.481 1.481 0 00-.975-.864c-1.016-.356-2.114-.328-3.15-.598-.18-.055-.4-.117-.48-.306a.673.673 0 01.225-.755 2.037 2.037 0 011.071-.265 3.248 3.248 0 011.494.213c.288.169.488.456.545.783a.192.192 0 00.181.186c.25.006.498.002.749.002a.18.18 0 00.195-.132 1.92 1.92 0 00-.942-1.664 4.685 4.685 0 00-2.553-.388 2.788 2.788 0 00-1.726.69 1.712 1.712 0 00-.344 1.786 1.529 1.529 0 00.966.84c1.014.363 2.124.246 3.145.569.2.067.432.17.493.39a.782.782 0 01-.214.748 2.366 2.366 0 01-1.423.346zm4.361-6.669a6909.08 6909.08 0 00-5.934-3.336 1.336 1.336 0 00-1.298 0L2.438 4.572a1.217 1.217 0 00-.638 1.06v6.692a1.226 1.226 0 00.663 1.07c.566.306 1.116.645 1.693.931a2.441 2.441 0 002.172.06 1.678 1.678 0 00.79-1.518c.003-2.208 0-4.417.001-6.625a.173.173 0 00-.164-.201 31.753 31.753 0 00-.756 0 .167.167 0 00-.182.168c-.003 2.194.002 4.39 0 6.585 0 .31-.193.588-.485.697a1.22 1.22 0 01-.984-.132l-1.572-.884a.187.187 0 01-.107-.186V5.667a.204.204 0 01.124-.205l5.891-3.306a.204.204 0 01.232 0l5.892 3.305a.207.207 0 01.123.205v6.624a.191.191 0 01-.106.188c-1.934 1.089-3.87 2.176-5.805 3.262-.092.05-.202.133-.31.07-.508-.285-1.007-.582-1.513-.87a.163.163 0 00-.183-.012c-.222.13-.456.24-.7.326-.109.044-.244.057-.32.158.096.104.213.187.344.245l1.773 1.02a1.298 1.298 0 001.314.036c1.97-1.105 3.941-2.211 5.912-3.319a1.229 1.229 0 00.663-1.07V5.631a1.216 1.216 0 00-.618-1.046z"></path><path stroke-width="0.48" d="M11.221 11.254a3.236 3.236 0 01-1.735-.314 1.135 1.135 0 01-.425-.798.175.175 0 00-.18-.174 37.413 37.413 0 00-.753 0 .167.167 0 00-.183.147 1.843 1.843 0 00.597 1.456 3.175 3.175 0 001.767.663c.67.078 1.349.049 2.01-.085a2.484 2.484 0 001.332-.714c.402-.494.521-1.16.313-1.762a1.481 1.481 0 00-.975-.864c-1.016-.356-2.114-.328-3.15-.598-.18-.055-.4-.117-.48-.306a.673.673 0 01.225-.755 2.037 2.037 0 011.071-.265 3.248 3.248 0 011.494.213c.288.169.488.456.545.783a.192.192 0 00.181.186c.25.006.498.002.749.002a.18.18 0 00.195-.132 1.92 1.92 0 00-.942-1.664 4.685 4.685 0 00-2.553-.388 2.788 2.788 0 00-1.726.69 1.712 1.712 0 00-.344 1.786 1.529 1.529 0 00.966.84c1.014.363 2.124.246 3.145.569.2.067.432.17.493.39a.782.782 0 01-.214.748 2.366 2.366 0 01-1.423.346zm4.361-6.669a6909.08 6909.08 0 00-5.934-3.336 1.336 1.336 0 00-1.298 0L2.438 4.572a1.217 1.217 0 00-.638 1.06v6.692a1.226 1.226 0 00.663 1.07c.566.306 1.116.645 1.693.931a2.441 2.441 0 002.172.06 1.678 1.678 0 00.79-1.518c.003-2.208 0-4.417.001-6.625a.173.173 0 00-.164-.201 31.753 31.753 0 00-.756 0 .167.167 0 00-.182.168c-.003 2.194.002 4.39 0 6.585 0 .31-.193.588-.485.697a1.22 1.22 0 01-.984-.132l-1.572-.884a.187.187 0 01-.107-.186V5.667a.204.204 0 01.124-.205l5.891-3.306a.204.204 0 01.232 0l5.892 3.305a.207.207 0 01.123.205v6.624a.191.191 0 01-.106.188c-1.934 1.089-3.87 2.176-5.805 3.262-.092.05-.202.133-.31.07-.508-.285-1.007-.582-1.513-.87a.163.163 0 00-.183-.012c-.222.13-.456.24-.7.326-.109.044-.244.057-.32.158.096.104.213.187.344.245l1.773 1.02a1.298 1.298 0 001.314.036c1.97-1.105 3.941-2.211 5.912-3.319a1.229 1.229 0 00.663-1.07V5.631a1.216 1.216 0 00-.618-1.046z" mask="url(#javascript_svg__a)"></path>
                                                                            </svg> : "" || 
                                                        paste.type=="HTML"? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="rgb(191 90 242)" class="text-green-s dark:text-dark-green-s mr-2 hidden h-[18px] w-[18px] lg:block"><path d="M8 2a1 1 0 011 1v1.7h.877c.307 0 .565.107.783.325.218.218.325.476.325.783v.027c0 .306-.107.559-.323.767l-.002.002a1.062 1.062 0 01-.783.325H7.225c-.55 0-1.02.193-1.405.577l-.001.002a1.947 1.947 0 00-.576 1.403c0 .38.09.72.276 1.014.185.292.46.531.816.719.12.063.385.153.775.27.396.12.936.27 1.62.452 1.01.289 1.73.654 2.178 1.085h.001c.636.603.965 1.483.965 2.667 0 1.164-.408 2.155-1.228 2.984A4.15 4.15 0 019 19.126V21a1 1 0 11-2 0v-1.67H4.094c-.296 0-.55-.107-.769-.326l-.002-.002A1.017 1.017 0 013 18.235v-.027c0-.306.107-.564.325-.782.22-.22.473-.326.77-.326h3.704c.55 0 1.021-.193 1.405-.577.384-.384.577-.855.577-1.405 0-.363-.091-.687-.278-.965-.187-.278-.463-.5-.818-.674h-.002a7.78 7.78 0 00-.728-.24c-.395-.12-.948-.28-1.659-.48-1-.297-1.72-.67-2.18-1.111-.637-.63-.966-1.534-.966-2.737 0-1.163.409-2.15 1.228-2.97C5.12 5.2 5.992 4.791 7 4.714V3a1 1 0 011-1zM14.496 9.532a1 1 0 10-.992 1.736l5.48 3.132-5.48 3.132a1 1 0 10.992 1.736l5.48-3.132c1.344-.767 1.344-2.705 0-3.473l-5.48-3.131z"></path>
                                                                            </svg> : "" || 
                                                        paste.type=="CSS"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                                fill="rgb(91 64 236)" viewBox="0 0 24 24" >
                                                                                <path d="M16.41 10.41a.998.998 0 0 0 0-1.82l-4.15-1.84-1.84-4.15a.99.99 0 0 0-.91-.59c-.4-.03-.75.22-.92.58L6.74 6.6 2.56 8.61c-.35.17-.57.53-.57.92s.24.74.59.9l4.15 1.84 1.84 4.15a.998.998 0 0 0 1.82 0l1.84-4.15 4.15-1.84Zm-5.82.68L9.5 13.53l-1.09-2.44a.98.98 0 0 0-.51-.51L5.37 9.46l2.55-1.23c.21-.1.38-.27.47-.48l1.08-2.33 1.1 2.48c.1.23.28.41.51.51l2.44 1.09-2.44 1.09c-.23.1-.41.28-.51.51Zm11.01 5.3-2.77-1.23-1.23-2.77a.68.68 0 0 0-.6-.4c-.27-.02-.5.15-.61.39l-1.23 2.67-2.78 1.34c-.23.11-.38.35-.38.61s.16.49.4.6l2.77 1.23 1.23 2.77a.663.663 0 0 0 1.22 0l1.23-2.77 2.77-1.23c.24-.11.4-.35.4-.61s-.16-.5-.4-.61ZM7.76 18.63l-1.66-.74-.74-1.66a.41.41 0 0 0-.36-.24c-.16-.01-.3.09-.37.23l-.74 1.6-1.67.8c-.14.07-.23.21-.23.37s.1.3.24.36l1.66.74.74 1.66a.404.404 0 0 0 .74 0l.74-1.66 1.66-.74a.404.404 0 0 0 0-.74Z"></path>
                                                                                </svg> : "" || 
                                                        paste.type=="TYPE-SCRIPT"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                                        fill="#ffa116" viewBox="0 0 24 24" >
                                                                                        <path d="m10.04 11.29-3.2 3.21 3.2 3.21 1.42-1.42-1.8-1.79 1.8-1.79zm2.5 1.42 1.8 1.79-1.8 1.79 1.42 1.42 3.2-3.21-3.2-3.21z"></path><path d="m19.94 7.68-.03-.09a.8.8 0 0 0-.2-.29l-5-5c-.09-.09-.19-.15-.29-.2l-.09-.03a.8.8 0 0 0-.26-.05c-.02 0-.04-.01-.06-.01H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12s-.01-.04-.01-.06c0-.09-.02-.17-.05-.26ZM6 20V4h7v4c0 .55.45 1 1 1h4v11z"></path>
                                                                                        </svg> : "" || 
                                                        paste.type=="XML"? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgb(191 90 242)" class="text-green-s dark:text-dark-green-s mr-2 hidden h-[18px] w-[18px] lg:block"><path d="M8 2a1 1 0 011 1v1.7h.877c.307 0 .565.107.783.325.218.218.325.476.325.783v.027c0 .306-.107.559-.323.767l-.002.002a1.062 1.062 0 01-.783.325H7.225c-.55 0-1.02.193-1.405.577l-.001.002a1.947 1.947 0 00-.576 1.403c0 .38.09.72.276 1.014.185.292.46.531.816.719.12.063.385.153.775.27.396.12.936.27 1.62.452 1.01.289 1.73.654 2.178 1.085h.001c.636.603.965 1.483.965 2.667 0 1.164-.408 2.155-1.228 2.984A4.15 4.15 0 019 19.126V21a1 1 0 11-2 0v-1.67H4.094c-.296 0-.55-.107-.769-.326l-.002-.002A1.017 1.017 0 013 18.235v-.027c0-.306.107-.564.325-.782.22-.22.473-.326.77-.326h3.704c.55 0 1.021-.193 1.405-.577.384-.384.577-.855.577-1.405 0-.363-.091-.687-.278-.965-.187-.278-.463-.5-.818-.674h-.002a7.78 7.78 0 00-.728-.24c-.395-.12-.948-.28-1.659-.48-1-.297-1.72-.67-2.18-1.111-.637-.63-.966-1.534-.966-2.737 0-1.163.409-2.15 1.228-2.97C5.12 5.2 5.992 4.791 7 4.714V3a1 1 0 011-1zM14.496 9.532a1 1 0 10-.992 1.736l5.48 3.132-5.48 3.132a1 1 0 10.992 1.736l5.48-3.132c1.344-.767 1.344-2.705 0-3.473l-5.48-3.131z"></path>
                                                                            </svg> : "" || 
                                                        paste.type=="MARKDOWN"? <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                                                                    fill="rgb(10 132 255)" viewBox="0 0 24 24" >
                                                                                    <path d="M12.65 2.24a1 1 0 0 0-1.3 0L3.84 8.68A6.005 6.005 0 0 0 8.01 19c1.06 0 2.1-.3 3-.82V20h-3v2h8v-2h-3v-1.82c.9.52 1.94.82 3 .82 3.31 0 6-2.69 6-6 0-1.62-.67-3.19-1.88-4.36l-7.47-6.4ZM16 17c-1.25 0-2.45-.6-3.2-1.6l-.8-1.06-.8 1.06A3.999 3.999 0 0 1 4 13c0-1.09.44-2.12 1.18-2.84L12 4.32l6.77 5.8c.79.76 1.23 1.79 1.23 2.88 0 2.21-1.79 4-4 4"></path>
                                                                                    </svg> : ""
                                                    }                

                                                    <p>{paste.type[0]+ paste.type.slice(1).toLowerCase()}</p>
                                                </div>

                                                <img onClick={(e)=>{handlePencilClick(e,paste.id)}} className='heart-image' src={pencil} style={{filter: userData.myColor?.[paste.id]!="" && userData.myColor[paste.id]!="#ffffff0f" ? "drop-shadow(0px 3px 6px rgba(66, 66, 66, 0.77))":""}} alt="" />    

                                             </div>

                                            <p style={{width:"90%",fontSize:"25px",fontWeight:"500",textShadow:"0px 2px 10px #383737"}}>{paste.title}</p>
                                            <p id='content-box' style={{color: (userData.myColor?.[paste.id] && userData.myColor[paste.id]!="#ffffff0f") ? "#1a1a1a":"#eff2f699"}}>{paste.content}</p>
                                        </div>   
                                    </Link>
                                </div>           

                    })
                }
            
            </div>   

        </div>


        <div className='bookmark-row2'>

            <div className='pinned-outer-div'>
                {/* <img src={roadmap} style={{width:"100%",height:"100%",position:"absolute",top:"0px",left:"0px",opacity:"0.4"}} alt="" /> */}
                
                <div className='pinned-div'>
                                  <div style={{display:"flex",width:"98%",justifyContent:"space-between"}}>
                                        <p style={{fontFamily:"'Patrick Hand', cursive",fontWeight:"700",fontSize:"26px",color:"#3130308f"}}>Add notes...</p>
                                        <img src={pinLogo} alt="" id='pinLogo'/>
                                  </div>

                                  <p style={{color:"black",fontFamily:"'Caveat', cursive",fontWeight:"700",maxHeight:"120px",overflow:"hidden"}}>
                                        Pin important notes for quick access.
                                        Keep your favourite ideas on top.
                                        Never lose important pastes again.
                                        Your important notes, always visible.
                                        Stick your reminders here.
                                        Pinned notes stay within reach.
                                        Save what matters most.
                                        Quick access to important pastes.
                                        Pin now, find instantly later.
                                        Keep priority notes organized.
                                    </p>
                                  {/* <textarea maxLength={150} type="text" name="" id="my-pin-input"></textarea> */}
                                  <p style={{fontFamily:"'Patrick Hand', cursive",fontWeight:"700",color:"#313030af",marginBottom:"0px"}}>Williams</p>
                 </div>

                 <div className='pinned-div2'>
                                  <div style={{display:"flex",width:"98%",justifyContent:"space-between"}}>
                                        <p style={{fontFamily:"'Patrick Hand', cursive",fontWeight:"700",fontSize:"19px",color:"#313030af"}}></p>
                                        <img src={pinLogo} alt="" id='pinLogo2'/>
                                  </div>

                                  <p style={{color:"black",fontFamily:"'Caveat', cursive",fontWeight:"700",maxHeight:"120px",overflow:"hidden"}}>
                                        The client seems to want a softer font. Let's ask Dobby to adjust it
                                        
                                    </p>
                                  {/* <textarea maxLength={150} type="text" name="" id="my-pin-input"></textarea> */}
                                  <p style={{fontSize:"14px",fontFamily:"'Patrick Hand', cursive",fontWeight:"700",color:"#313030af",marginBottom:"0px",marginTop:"2rem"}}>Charlie</p>
                 </div>    

                 <p style={{textShadow:"0px 3px 7px black",color:"#acabab",position:"absolute",top:"10px",left:"250px",fontSize:"20px",fontFamily:"'Patrick Hand', cursive",display:"flex",justifyContent:"center",alignItems:"center",gap:"8px"}}>
                    <img src={notes} style={{height:"25px",width:"25px"}}/> 
                    Bubble it !
                 </p>

                 <img src={arrow} style={{opacity:"0.6",position:"absolute",top:"170px",left:"120px",height:"90px",width:"75px",transform:"rotate(90deg)"}} alt="" />

            </div>

            
            <div className='pinned-real-div'>
                {/* <img src={pattern} style={{width:"100%",height:"100%",position:"absolute",top:"0px",left:"0px",opacity:"0.2",objectFit: "cover",borderRadius:"14px"}} alt="" /> */}

                {
                    pastes.map((paste,idx)=>{
                        
                          if(paste.pinned==true)
                          {
                               return <div className='pinned-real' key={idx}>

                                <p style={{marginTop:"10px",width:"94%",height:"30px",overflow:"hidden",fontSize:"20px",fontFamily:"'Patrick Hand', cursive",fontWeight:"500"}}>{paste.title}</p>
                                <textarea value={userData.pinned?.[paste.id]?.comment || ""} 
                                          onChange={(e)=>{
                                              const newObj={...userData.pinned,
                                                [paste.id]: {...userData.pinned?.[paste.id],
                                                                comment:e.target.value}}; 
                                         dispatch(savePinnedData(newObj));                       
                                        }} name="" className='pinned-textarea' placeholder='Add note...' >
                                </textarea>
                                
                                <input value={userData.pinned?.[paste.id]?.name || ""} 
                                           onChange={(e)=>{
                                                 const newObj={...userData.pinned,
                                                    [paste.id]:{...userData.pinned?.[paste.id],name:e.target.value}};
                                                 dispatch(savePinnedData(newObj));    
                                           }} className='pinned-inp' type="text" placeholder='Name' name="" id="" />
                              

                                <img style={{filter:"drop-shadow(-9px 8px 5px black)",transform:"rotate(-8deg)",width:"20px",height:"20px",position:'absolute',top:"2px",left:"190px"}} src={pinReal} alt="" />

                               </div>
                          }

                   })
                }
            </div>


        </div>


        {   colorModal && <div onClick={handleCrossColor} className='overlay-colorBox'>

                <div className='edit-box' onClick={(e)=>{e.stopPropagation();}}>
                    
                    <div onClick={handlePin} className='pin-box'>
                        <img id='pin-photo' src={goldPin} alt="" />
                        <p style={{color:'#c0c0c0',fontSize:"14px",fontWeight:"400",textShadow:"0px 2px 6px black"}}>GoPin</p>
                    </div>
                    

                </div>    


                 <div onClick={(e)=>{e.stopPropagation()}} className='colorBox-modal'>
                      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:"-20px",gap:"6px"}}>
                        <img src={plateColor} style={{height:"20px",width:"20px"}}/>
                        <p style={{color:"#aeadad",fontSize:"14px",fontWeight:"500",textShadow:"0px 2px 6px black"}}>Paste Color</p> 
                      </div>
                      {
                        colorsArr.map((color,idx)=>{
                            return <div key={idx} className='mycolor-box' style={{backgroundColor:`${color}`,filter:`drop-shadow(0px 2px 6px ${color})`}}
                                   onClick={()=>{handleColorChange(color);}}>
                                   
                            </div>

                        })
                      }

                 </div>

        </div>


        }
        
    </div>
  )
}

export default Bookmark
