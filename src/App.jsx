import {createBrowserRouter,RouterProvider} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import AllPaste from "./components/AllPaste"
import ViewPaste from "./components/ViewPaste"
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import notebookLogo from "./assets/notebook-logo.png"
import RightBar from "./components/RightBar";
import toast from "react-hot-toast";
import Bookmark from "./components/Bookmark";


function App() {

  const [bookmark,setBookmark]=useState(false);

  const [open,setOpen]=useState(false);
  const [selected,setSelected]=useState("CODE");
  const options=["CODE","TEXT","JSON","HTML","CSS","TYPE-SCRIPT","XML","MARKDOWN"];

  const [open2,setOpen2]=useState(false);
  const [selected2,setSelected2]=useState("1 Month");
  const options2=["1 Month","1 Year","Never"];

  const [open3,setOpen3]=useState(false);
  const [selected3,setSelected3]=useState("Public");
  const options3=["Public","Private"];

  const pastes=useSelector((state)=>{return state.paste.pastes});
  const m=new Map();

  let pubCount=0;
  let privCount=0;
  let bookmarkedCount=0;

  
  pastes.forEach((val,idx)=>{
      if(val.pasteMode==="Public")
      {
            pubCount++;
      }
      else if(val.pasteMode==="Private")
      {
            privCount++;
      }

      if(val.bookmarked==true)
      {
            bookmarkedCount++;
      }
  })     

  pastes.forEach((val,idx)=>{

    if(m.get(val.type)===undefined)
    {
        m.set(val.type,1);
    }
    else{
        m.set(val.type,m.get(val.type)+1);
    }

  })


  function handleBookmarkClick(){

              setBookmark(!bookmark);
              if(bookmark)
              { 
                toast.custom(
                          <div className='custom-toast-pass'>
                         <svg  xmlns="http://www.w3.org/2000/svg" width="23" height="23"  
                          fill="currentColor" viewBox="0 0 24 24" >
                          <path d="M20 3H6.69a2 2 0 0 0-1.87 1.3l-2.76 7.35c-.04.11-.06.23-.06.35v2c0 1.1.9 2 2 2h5.61l-1.12 3.37c-.2.61-.1 1.28.27 1.8.38.52.98.83 1.62.83h1.61c.3 0 .58-.13.77-.36l4.7-5.64h2.53c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-4 11.64L11.53 20h-1.15l1.56-4.68a1.01 1.01 0 0 0-.95-1.32h-7v-1.82L6.68 5h9.31v9.64Zm4-.64h-2V5h2z"></path>
                          </svg>
                              <span style={{marginTop:"0px"}}>Removed From Favourite</span>
                          </div>,
                          {
                            duration:1000,
                          }                     
                            )
              }
              else{
                    toast.custom(
                    <div className='custom-toast-pass'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="23" height="23"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M20 8h-5.61l1.12-3.37c.2-.61.1-1.28-.27-1.8-.38-.52-.98-.83-1.62-.83h-1.61c-.3 0-.58.13-.77.36L6.54 8H4.01c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13.31a2 2 0 0 0 1.87-1.3l2.76-7.35c.04-.11.06-.23.06-.35v-2c0-1.1-.9-2-2-2ZM6 19H4v-9h2zm14-7.18L17.31 19H8V9.36L12.47 4h1.15l-1.56 4.68a1.01 1.01 0 0 0 .95 1.32h7v1.82Z"></path>
                    </svg>
                        <span style={{marginTop:"3px"}}>Added To Favourite</span>
                    </div>,
                    {
                      duration:1000,
                    }                     
                    ) 
                  }
  }
  

  const router=createBrowserRouter([
  {
    path:"/",
    element:
    <div>

      <Navbar/>


      
      <div style={{display:"flex",flexDirection:"column",backgroundColor:"rgb(19, 19, 19)"}}>
          <div style={{position:"relative",display:"flex",justifyContent:"start",alignItems:"center",gap:"3px",paddingLeft:"60px", paddingTop:"12px",backgroundColor:"rgb(19, 19, 19)"}}>
              <img id="dash-logo" src={notebookLogo} alt="" />
              <p style={{color:"white",fontSize:"22px",fontFamily:"'Typo Round Regular Demo', sans-serif",marginTop:"13px"}}>GoPaste</p>
             
              <p style={{color:"#3f3f3f",marginLeft:"15px",marginTop:"7px"}}>|</p>
              <p style={{color:"#9f9f9f",marginLeft:"15px",marginTop:"11px"}}>Dashboard </p>
              <svg  style={{marginTop:"13px",marginLeft:"5px"}} xmlns="http://www.w3.org/2000/svg" width="23" height="23"  
              fill="#9f9f9f" viewBox="0 0 24 24" >
              <path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
              </svg>
              <p style={{color:"#dedcdc",marginTop:"12px",paddingLeft:"3px"}}>Home</p>
             
          
             <div onClick={handleBookmarkClick} 
              id="bookmark-div" style={{position:"absolute",top:"26px",left:"92.55%",display:"flex",gap:"6px",cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center"}} >    
             
              {/* check the className of this svg . the class is added dynamically.please see */}
              <svg id="bookmark-logo" fill="#ff9100" width="24" height="24" aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className={`${bookmark? "bookmark":""} svg-inline--fa fa-star absolute h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em] left-1/2 top-1/2`} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path className={bookmark? `bookmark`:``} /*fill="#ff9100"*/ d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path>
              </svg>

              <p id="bookmark-para" className={bookmark? "bookmark1":""} style={{fontWeight:"500",fontFamily:"'Typo Round Regular Demo', sans-serif"}}>Favourite</p>
             </div>

          </div>


        <div className="dash-line"></div>
       </div>


      

      <div className="home-outer-div">

        <div className="home-inp-div">
          
          <div id="control-heading-div">
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
            fill="hsl(180 74% 42%)" viewBox="0 0 24 24" >
            <path d="M8.5 1.5C6.92 1.5 5.6 2.56 5.16 4H2v2h3.16c.43 1.44 1.76 2.5 3.34 2.5s2.9-1.06 3.34-2.5H22V4H11.84A3.495 3.495 0 0 0 8.5 1.5m0 5C7.67 6.5 7 5.83 7 5s.67-1.5 1.5-1.5S10 4.17 10 5s-.67 1.5-1.5 1.5m0 9c-1.58 0-2.9 1.06-3.34 2.5H2v2h3.16c.43 1.44 1.76 2.5 3.34 2.5s2.9-1.06 3.34-2.5H22v-2H11.84a3.495 3.495 0 0 0-3.34-2.5m0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m8-12c-1.58 0-2.9 1.06-3.34 2.5H2v2h11.16c.43 1.44 1.76 2.5 3.34 2.5s2.9-1.06 3.34-2.5H22v-2h-2.16a3.495 3.495 0 0 0-3.34-2.5m0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"></path>
            </svg>
            <span id="control-heading">Paste Controls</span>
          </div>



          <div className="custom-select">

             <div className="select-box" onClick={()=>{ setOpen(!open);}}>
                
                <p>{selected}</p>

                <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18"  
                fill="grey" viewBox="0 0 24 24" >
                <path d="m12 15.41 5.71-5.7-1.42-1.42-4.29 4.3-4.29-4.3-1.42 1.42z"></path>
                </svg>

             </div>

              <div className={`options-box op-position1 ${open?`show1`:""}`}>

                {

                  options.map((val,idx)=>{

                  return <div key={idx} className="my-options" onClick={()=>{
                    setSelected(val); 
                    setOpen(!open)}}>
                         {val}
                  </div>

                   })
                }
              </div>
             



             <div className="select-box" onClick={()=>{setOpen2(!open2);}}>

                <p>{selected2}</p>
                <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18"  
                fill="grey" viewBox="0 0 24 24" >
                <path d="m12 15.41 5.71-5.7-1.42-1.42-4.29 4.3-4.29-4.3-1.42 1.42z"></path>
                </svg>

             </div>

             <div className={`options-box op-position2 ${open2 ? `show1`:""}`}  >

                  {
                     options2.map((val,idx)=>{

                      return <div className="my-options" key={idx} onClick={()=>{
                        setSelected2(val);
                        setOpen2(!open2);
                      }}>
                             {val}
                      </div>

                     })
                  }

             </div>




             <div className="select-box" onClick={()=>{setOpen3(!open3);}}>

                <p>{selected3}</p>
                <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18"  
                fill="grey" viewBox="0 0 24 24" >
                <path d="m12 15.41 5.71-5.7-1.42-1.42-4.29 4.3-4.29-4.3-1.42 1.42z"></path>
                </svg>

             </div>

             <div className={`options-box op-position3 ${open3 ? `show1`:""}`}  >

                  {
                     options3.map((val,idx)=>{

                      return <div className="my-options" key={idx} onClick={()=>{
                        setSelected3(val);
                        setOpen3(!open3);
                      }}>
                             {val}
                      </div>

                     })
                  }

             </div>

          </div>

          <div id="divide-line"></div>


          <div id="control-heading-div2">
            <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="25"  
            fill="#ffa116" viewBox="0 0 24 24" >
            <path d="M3 15h2v6H3zm4-2h2v8H7zm4-1h2v9h-2zm4 1h2v8h-2zm4-5h2v13h-2z"></path><path d="m19.21 2.38-4.87 6.21-5-4-6.13 7.79 1.58 1.24 4.87-6.21 5 4 6.13-7.79z"></path>
            </svg>
            {/* <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="25"  
            fill="#ffa116" viewBox="0 0 24 24" >
            <path d="M21 7h-5V3c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v8H3c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1M4 13h4v7H4zm6-1V4h4v16h-4zm10 8h-4V9h4z"></path>
            </svg> */}
            <span id="control-heading">Paste Stats</span>
          </div>


          <div className="paste-stats-div">
             <p className="heading-paste-type"><span id="dot"> </span> Paste Type</p>

             <div className="type-count-div">
               {
                 Array.from(m).map(([key,value])=>{
                  return <div className="paste-count-div" key={key}>
                              <div className="paste-type-div" key={key}>
                                  {key.toLowerCase()}
                              </div>
                              <div style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#eff2f67f"}}><p style={{fontSize:"13px"}}>x</p><p style={{fontSize:"14px"}}>{value}</p></div>
                          </div>
                 })  
              }          
             </div>
             
          </div>


          <div className="paste-stats-div">
             <p className="heading-paste-type"><span className="dot2"> </span> Paste Summary</p>
             
             <div className="type-count-div">
                  <div className="paste-count-div">
                              <div className="paste-type-div">
                                  Total Pastes
                              </div>
                              <div style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#eff2f67f"}}><p style={{fontSize:"13px"}}>x</p><p style={{fontSize:"14px"}}>{pastes.length}</p></div>
                          </div>

             </div>

             <div className="type-count-div">
                  <div className="paste-count-div">
                              <div className="paste-type-div">
                                  Bookmarked Pastes
                              </div>
                              <div style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#eff2f67f"}}><p style={{fontSize:"13px"}}>x</p><p style={{fontSize:"14px"}}>{bookmarkedCount}</p></div>
                          </div>

             </div>

             <div className="type-count-div">
                  <div className="paste-count-div">
                              <div className="paste-type-div">
                                  Public Pastes
                              </div>
                              <div style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#eff2f67f"}}><p style={{fontSize:"13px"}}>x</p><p style={{fontSize:"14px"}}>{pubCount}</p></div>
                          </div>

             </div>

             <div className="type-count-div">
                  <div className="paste-count-div">
                              <div className="paste-type-div">
                                  Private Pastes
                              </div>
                              <div style={{display:"flex",justifyContent:"center",alignItems:"center",color:"#eff2f67f"}}><p style={{fontSize:"13px"}}>x</p><p style={{fontSize:"14px"}}>{privCount}</p></div>
                          </div>

             </div>
             
          </div>



        </div>

        
        <Home selected={selected} setSelected={setSelected}
              selected3={selected3} setSelected3={setSelected3}
              bookmark={bookmark} setBookmark={setBookmark}/>

        <RightBar/>      

      </div>
    </div>

  },
  {
    path:"/pastes",
    element:
    <div>
      <Navbar/>
      <div className="paste-outer-div">
        <AllPaste/>
      </div>
    </div>
  },
  {
    path:"/pastes/:id",
    element:
    <div>
      <Navbar/>
      <div className="viewPaste-outer-div">
         <ViewPaste/>
      </div>
    </div>
  },
  {
    path:"/bookmark",
    element:
      <div style={{color:"white"}}>

          <Navbar/>

          <div style={{display:"flex",flexDirection:"column",backgroundColor:"rgb(26, 26, 26)"}}>
              <div style={{position:"relative",display:"flex",justifyContent:"start",alignItems:"center",gap:"3px",paddingLeft:"60px", paddingTop:"12px",backgroundColor:"rgb(26, 26, 26)"}}>
                  <img id="dash-logo" src={notebookLogo} alt="" />
                  <p style={{color:"white",fontSize:"22px",fontFamily:"'Typo Round Regular Demo', sans-serif",marginTop:"13px"}}>GoPaste</p>
                  
                  <p style={{color:"#3f3f3f",marginLeft:"15px",marginTop:"7px"}}>|</p>
                  <p style={{color:"#9f9f9f",marginLeft:"15px",marginTop:"11px"}}>Saved Collection</p>
                  <svg  style={{marginTop:"13px",marginLeft:"5px"}} xmlns="http://www.w3.org/2000/svg" width="23" height="23"  
                  fill="#9f9f9f" viewBox="0 0 24 24" >
                  <path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
                  </svg>
                  <p style={{color:"#dedcdc",marginTop:"12px",paddingLeft:"3px"}}>Favourite</p>
    
              </div>
    
    
              <div className="dash-line"></div>
          </div>

          <Bookmark/>

      </div>   
  }
]);

  return (
    <div>
        <RouterProvider router={router}/>
    </div>
    
  )
}

export default App
