import { useEffect, useRef, useState } from 'preact/hooks'
import './Auth.css'
import {ChangeEvent} from 'preact/compat';
import { listTemplates, setupSesClient } from '../../api/ses';
import { route } from 'preact-router';

const Auth = () => {
  const [authText, setAuthText] = useState('Authenticate');
  const assesKeyRef = useRef<HTMLInputElement>(null);
  const secretKeyRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAuth = async(e:ChangeEvent)=>{
    e.preventDefault();
    try {
      setAuthText('Authenticating')
      if(assesKeyRef.current && secretKeyRef.current){
      const accessKeyId = assesKeyRef.current.value;
      const secretAccessKey = secretKeyRef.current.value;
      setupSesClient({ accessKeyId, secretAccessKey })
      await listTemplates()
      localStorage.setItem('auth',JSON.stringify({accessKeyId,secretAccessKey}))
      console.log('auth success')
      route('/')
      }
    } catch (error) {
      console.log(error)
      setAuthText('Authenticate')
    }
  }


  



  return (
    <div className='auth-section'>
      <form className="auth-wrapper" onSubmit={handleAuth} ref={formRef}>
        <div className="asses-key-wrapper">
          <label htmlFor="assesKey">AWS Access Key Id</label>
          <input
            type="text"
            className='asses-key-input'
            name='assesKey'
            ref={assesKeyRef}
          />
        </div>
        <div className="asses-key-wrapper">
          <label htmlFor="assesKey">AWS Access Key Id</label>
          <input
            type="text"
            className='asses-key-input'
            name='secretKey'
            ref={secretKeyRef}
          />
        </div>
        <div className="save-credential-wrapper">
          <input type="checkbox" name="save-credential" className='save-crendential-checkbox' checked/>
          <span>Save credentials locally</span>
        </div>
        <div className="button-wrapper">
          <button
          type='submit'
          className='auth-button'
          disabled={authText==='Authenticating'}
          style={{opacity: authText==='Authenticating' ? '0.7': ''}}
          >
          {authText}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Auth