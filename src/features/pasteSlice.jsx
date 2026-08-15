import { createSlice } from "@reduxjs/toolkit";
import "./pasteSlice.css";
import toast from "react-hot-toast";

export const pasteSlice=createSlice(
    {
        name:'paste',
        initialState:{
            pastes : localStorage.getItem("key") ? JSON.parse(localStorage.getItem("key")) : [] ,
            userData : localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {userID:"",email:"",phone:"",password:"",myColor:{},pinned:{}}
        },
        reducers:{
            addToPastes:(state,action)=>{

                const myPaste=action.payload;
                state.pastes.push(myPaste);
                localStorage.setItem("key",JSON.stringify(state.pastes));

                // toast("Paste Created Successfully");
                 toast.custom(
                    <div className='custom-toast-create'>
                       <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M13 10h-2v3H8v2h3v3h2v-3h3v-2h-3z"></path><path d="m19.94 7.68-.03-.09a.8.8 0 0 0-.2-.29l-5-5c-.09-.09-.19-.15-.29-.2l-.09-.03a.8.8 0 0 0-.26-.05c-.02 0-.04-.01-.06-.01H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12s-.01-.04-.01-.06c0-.09-.02-.17-.05-.26ZM6 20V4h7v4c0 .55.45 1 1 1h4v11z"></path>
                        </svg>
                        <span>Paste Created Successfully</span>
                   </div>
                   ,
                   {
                    duration:1000,
                   }
                   );

            },
            updateToPastes:(state,action)=>{
                
                //this is also corect but it is not good because it will run further after finding the condition . And break doesnt work in forEach so we will use findIndex() because it breaks itself after finding the condition and returns the index.
                // const myPaste=action.payload;

                // state.pastes.forEach((ele,idx)=>{
                //         if(ele.id===myPaste.id)
                //         {
                //            state.pastes[idx]=myPaste;
                //         }
                // });

                // localStorage.setItem("key",JSON.stringify(state.pastes));
                 
                // toast("Paste Updated Succesfully");


                const myPaste=action.payload;

                const idx=state.pastes.findIndex((ele)=>{

                   return ele.id===myPaste.id
                   
                });

                if(state.pastes[idx].pinned == myPaste.pinned)
                {
                    toast.custom(
                    <div className='custom-toast-update'>
                        <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
                        </svg>
                        <span>Paste Updated Succesfully</span>
                   </div>
                        ,
                            {
                            duration:1000,
                        }
                   );
                     
                }

               if(idx!=-1)
               {
                   state.pastes[idx]=myPaste;
                   localStorage.setItem("key",JSON.stringify(state.pastes));

                  // toast("Paste Updated Succesfully");
               }
            },
            resetAllPastes:(state,action)=>{
                   
                   state.pastes=[];
                   localStorage.removeItem("key");
            },
            removeFromPastes:(state,action)=>{

                   const myPasteID=action.payload;
                   
                   const idx=state.pastes.findIndex((ele)=>{
                        return ele.id===myPasteID;
                   });

                   if(idx!=-1)
                   {
                      state.pastes.splice(idx,1);
                      localStorage.setItem("key",JSON.stringify(state.pastes));
                    //   toast("Removed From Pastes Successfully");
                      toast.custom(
                        <div className='custom-toast-delete'>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path>
                            </svg>
                            <span>Removed From Pastes Successfully</span>
                        </div>,
                            {
                            duration:1000,
                            }
                        );
                   }
            },
            saveUserData:(state,action)=>{

                const {field,value}=action.payload;

                state.userData[field]=value;
                localStorage.setItem("userData",JSON.stringify(state.userData));

                 if(field==="userID")
                 {
                    toast.custom(
                        <div className='custom-toast-delete userToast'>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="22"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M19.07 4.93a9.9 9.9 0 0 0-3.18-2.14 10.12 10.12 0 0 0-7.79 0c-1.19.5-2.26 1.23-3.18 2.14S3.28 6.92 2.78 8.11A9.95 9.95 0 0 0 1.99 12h2c0-1.08.21-2.13.63-3.11.4-.95.98-1.81 1.72-2.54.73-.74 1.59-1.31 2.54-1.71 1.97-.83 4.26-.83 6.23 0 .95.4 1.81.98 2.54 1.72.17.17.33.34.48.52L16 9.01h6V3l-2.45 2.45c-.15-.18-.31-.36-.48-.52m.3 10.18c-.4.95-.98 1.81-1.72 2.54-.73.74-1.59 1.31-2.54 1.71-1.97.83-4.26.83-6.23 0-.95-.4-1.81-.98-2.54-1.72-.17-.17-.33-.34-.48-.52l2.13-2.13H2v6l2.45-2.45c.15.18.31.36.48.52.92.92 1.99 1.64 3.18 2.14 1.23.52 2.54.79 3.89.79s2.66-.26 3.89-.79c1.19-.5 2.26-1.23 3.18-2.14s1.64-1.99 2.14-3.18c.52-1.23.79-2.54.79-3.89h-2c0 1.08-.21 2.13-.63 3.11Z"></path>
                            </svg>
                            <span>UserID Updated</span>
                        </div>,
                            {
                            duration:1000,
                            }
                        );
                 }     
                 else if(field==="email")
                 {
                    toast.custom(
                        <div className='custom-toast-delete userToast'>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="22"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M19.07 4.93a9.9 9.9 0 0 0-3.18-2.14 10.12 10.12 0 0 0-7.79 0c-1.19.5-2.26 1.23-3.18 2.14S3.28 6.92 2.78 8.11A9.95 9.95 0 0 0 1.99 12h2c0-1.08.21-2.13.63-3.11.4-.95.98-1.81 1.72-2.54.73-.74 1.59-1.31 2.54-1.71 1.97-.83 4.26-.83 6.23 0 .95.4 1.81.98 2.54 1.72.17.17.33.34.48.52L16 9.01h6V3l-2.45 2.45c-.15-.18-.31-.36-.48-.52m.3 10.18c-.4.95-.98 1.81-1.72 2.54-.73.74-1.59 1.31-2.54 1.71-1.97.83-4.26.83-6.23 0-.95-.4-1.81-.98-2.54-1.72-.17-.17-.33-.34-.48-.52l2.13-2.13H2v6l2.45-2.45c.15.18.31.36.48.52.92.92 1.99 1.64 3.18 2.14 1.23.52 2.54.79 3.89.79s2.66-.26 3.89-.79c1.19-.5 2.26-1.23 3.18-2.14s1.64-1.99 2.14-3.18c.52-1.23.79-2.54.79-3.89h-2c0 1.08-.21 2.13-.63 3.11Z"></path>
                            </svg>
                            <span>Email Updated</span>
                        </div>,
                            {
                            duration:1000,
                            }
                        );
                 }
                 else if(field==="phone")
                 {
                    toast.custom(
                        <div className='custom-toast-delete userToast'>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="22"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M19.07 4.93a9.9 9.9 0 0 0-3.18-2.14 10.12 10.12 0 0 0-7.79 0c-1.19.5-2.26 1.23-3.18 2.14S3.28 6.92 2.78 8.11A9.95 9.95 0 0 0 1.99 12h2c0-1.08.21-2.13.63-3.11.4-.95.98-1.81 1.72-2.54.73-.74 1.59-1.31 2.54-1.71 1.97-.83 4.26-.83 6.23 0 .95.4 1.81.98 2.54 1.72.17.17.33.34.48.52L16 9.01h6V3l-2.45 2.45c-.15-.18-.31-.36-.48-.52m.3 10.18c-.4.95-.98 1.81-1.72 2.54-.73.74-1.59 1.31-2.54 1.71-1.97.83-4.26.83-6.23 0-.95-.4-1.81-.98-2.54-1.72-.17-.17-.33-.34-.48-.52l2.13-2.13H2v6l2.45-2.45c.15.18.31.36.48.52.92.92 1.99 1.64 3.18 2.14 1.23.52 2.54.79 3.89.79s2.66-.26 3.89-.79c1.19-.5 2.26-1.23 3.18-2.14s1.64-1.99 2.14-3.18c.52-1.23.79-2.54.79-3.89h-2c0 1.08-.21 2.13-.63 3.11Z"></path>
                            </svg>
                            <span>Phone Number Updated</span>
                        </div>,
                            {
                            duration:1000,
                            }
                        );
                 }
                 else if(field==="password")
                 {
                    toast.custom(
                        <div className='custom-toast'>
                           <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="m20.42 6.11-7.97-4c-.28-.14-.62-.14-.9 0l-7.97 4c-.31.15-.51.45-.55.79-.01.11-.96 10.76 8.55 15.01a.98.98 0 0 0 .82 0C21.91 17.66 20.97 7 20.95 6.9a.98.98 0 0 0-.55-.79ZM12 19.9C5.26 16.63 4.94 9.64 5 7.64l7-3.51 7 3.51c.04 1.99-.33 9.02-7 12.26"></path><path d="m11 12.59-1.29-1.3-1.42 1.42 2.71 2.7 4.71-4.7-1.42-1.42z"></path>
                            </svg>
                            <span>Successfully Changed</span>
                        </div>,
                            {
                            duration:1000,
                            }
                        ); t
                }

            },
            saveBoxColorData:(state,action)=>{

                const colorObj=action.payload;

                state.userData.myColor=colorObj;

                localStorage.setItem("userData",JSON.stringify(state.userData));

                toast.custom(
                        <div className='custom-toast-delete saved'>
                            <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M13 6h-2v3H8v2h3v3h2v-3h3V9h-3z"></path><path d="M18 2H6c-1.1 0-2 .9-2 2v17c0 .36.19.69.5.86.31.18.69.18 1 0l6.5-3.72 6.5 3.72c.15.09.32.13.5.13s.35-.04.5-.14a1 1 0 0 0 .5-.86V4c0-1.1-.9-2-2-2m0 8v9.28l-5.5-3.15a.98.98 0 0 0-.99 0l-5.5 3.15V4h12v6Z"></path>
                            </svg>
                            <span>Saved</span>
                        </div>,
                            {
                            duration:1000,
                            }
                        );

            },
            savePinnedData:(state,action)=>{
                
                const myObj=action.payload;

                state.userData.pinned=myObj;

                localStorage.setItem("userData",JSON.stringify(state.userData));
            }
        }
    });

    export const {addToPastes,updateToPastes,resetAllPastes,removeFromPastes,saveUserData,saveBoxColorData,savePinnedData}=pasteSlice.actions;
    export default pasteSlice.reducer;