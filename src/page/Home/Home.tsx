import { useState } from 'preact/hooks'
import './Home.css'
import { JSXInternal } from "preact/src/jsx";
import {ChangeEvent} from 'preact/compat';
import { addNewTemplate, deleteTemplate, setupSesClient } from '../../api/ses';

const Home = () => {
 


  return (
    <div className='home-section'>
      <h1>Templates</h1>
     <div className="template-wrapper">
      
     </div>
    </div>
  )
}

export default Home