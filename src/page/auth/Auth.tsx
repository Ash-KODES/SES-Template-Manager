import './Auth.css'

const Auth = () => {
  return (
    <div className='auth-section'>
      <div className="auth-wrapper">
        <div className="asses-key-wrapper">
          <label htmlFor="assesKey">AWS Access Key Id</label>
          <input
            type="text"
            className='asses-key-input'
          />
        </div>
        <div className="asses-key-wrapper">
          <label htmlFor="assesKey">AWS Access Key Id</label>
          <input
            type="text"
            className='asses-key-input'
          />
        </div>
        <div className="save-credential-wrapper">
          <input type="checkbox" name="save-credential"  />
          <span>Save credentials locally</span>
        </div>
      </div>
    </div>
  )
}

export default Auth