<template>
    <div class="shadown-lg"
     style="position: fixed; margin-top: 0px; margin-left: 55px; background: black; width: 60px; height: 100%; padding: 8px; box-sizing: border-box;">
 
     <div style="display: block; align-items: center; max-height: 500px; ">
       <div style="margin-bottom: 17px;">
         <p style="font-size: 8px; color: white;">Code maker</p>
       </div>
 
       <div style="padding: 10px;">
         <ul style="list-style: none; padding: 0px; margin: 0px;">
           <li style="margin-bottom: 15px;">
             <router-link to="/codejava" style="color: white;">
              java
               <!-- <span>Dashboard</span> -->
             </router-link>
           </li>
 
           <li style="margin-bottom: 15px;">
             <router-link to="/codejs" style="color: white;">
              Js
               <!-- <i class="bi bi-telephone-outbound"></i> -->
               <!-- <span>Dashboard</span> -->
             </router-link>
           </li>
 
           <li style="margin-bottom: 15px;">
             <router-link to="/codepy" style="color: white;">
              Py
               <!-- <i class="bi bi-chat"></i> -->
               <!-- <span>Dashboard</span> -->
             </router-link>
           </li>
 
           <li style="margin-bottom: 15px;">
             <router-link to="/codeao" style="color: white;">
               ao
               <!-- <span>Dashboard</span> -->
             </router-link>
           </li>
 
           <li style="margin-bottom: 15px;">
             <router-link to="/codehtml" style="color: white;">
              html
               <!-- <i class="bi bi-mic"></i> -->
               <!-- <span>Dashboard</span> -->
             </router-link>
            </li>
 
         </ul>
       </div>
 
     </div>
 
   </div>
 </template>
 
 <script>
 export default {
   
 }
 </script>
 
 <style scoped>
 
 </style>