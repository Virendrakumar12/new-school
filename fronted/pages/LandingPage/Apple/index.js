
import React from 'react'



import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Updates from '@/components/Updates'
import Footer from '@/components/Footer'

import Stats from '@/components/Stats'
import Testimonials from '@/components/Testimonials'
import PrincipalCard from '@/components/PrincipalCard'
import TeacherCardSlider from '@/components/TeacherCardSlider'
import Navbar from "@/components/Navbar";
function Apple() {
   // const isAdminRoute = window.location.pathname.startsWith('/admin');
  
    return (
        
 <>
        
           <Navbar />
         <Hero/>
           <Updates/>
           <PrincipalCard/>
           <TeacherCardSlider/>
            <Features/>
              <Stats/>
           <Testimonials/>
             
              <Footer/>
          
           
          
        
       
           </>
    )
  }
  
  export default Apple;
  