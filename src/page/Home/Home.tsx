import { useState } from 'preact/hooks'
import './Home.css'
import { JSXInternal } from "preact/src/jsx";
import { addNewTemplate, deleteTemplate, setupSesClient } from '../../api/ses';

const Home = () => {
  const [accessKeyId, setAccessKeyId] = useState('')
  const [secretAccessKey, setSecretAccessKey] = useState('')
  const [templateName, setTemplateName] = useState('')
  const [templeteHtml, setTempleteHtml] = useState('')
  const [templateText, setTemplateText] = useState('')
  const [templeteSubject, setTempleteSubject] = useState('')
  const [deleteTemplateName, setdeleteTemplateName] = useState('')


  const TemplateContent = {
    Html: templeteHtml,
    Subject: templeteSubject,
    Text: templateText
  }
  const TemplateName = templateName;

  // console.log({accessKeyId,secretAccessKey})

  const handleAddTemplete = async (e: JSXInternal.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setupSesClient({ accessKeyId, secretAccessKey })
     await addNewTemplate({ TemplateContent, TemplateName })
     console.log('template added success')
     alert(`template added success ${templateName}`)

    } catch (error) {
      console.log(error)
    }

  }

  const handleDelete = async()=>{
    const TemplateName = deleteTemplateName;
    try {
      setupSesClient({ accessKeyId, secretAccessKey })
     await deleteTemplate({TemplateName })
      console.log('deleted success')
      alert(`deleted success ${deleteTemplateName}`)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='home-section'>
      <form className="new-temeplete-creation-wrappper" onSubmit={handleAddTemplete}>
        <input
          type="text"
          className='assess-key'
          name={'assess-key'}
          value={accessKeyId}
          onChange={(e: JSXInternal.TargetedEvent<HTMLInputElement>) => setAccessKeyId(e.currentTarget.value)}
          placeholder={'Enter assess key'}
        />
        <input
          type="text"
          className='secret-key'
          name={'secret-key'}
          value={secretAccessKey}
          onChange={(e: JSXInternal.TargetedEvent<HTMLInputElement>) => setSecretAccessKey(e.currentTarget.value)}
          placeholder={'Enter secret key'}
        />
        <input
          type="text"
          className='template-name'
          value={templateName}
          onChange={(e: JSXInternal.TargetedEvent<HTMLInputElement>) => setTemplateName(e.currentTarget.value)}
          placeholder={'Enter template name'}
        />
        <textarea
          type="text"
          className='template-html'
          value={templeteHtml}
          onChange={(e: JSXInternal.TargetedEvent<HTMLTextAreaElement>) => setTempleteHtml(e.currentTarget.value)}
          placeholder={'Enter templete html'}
        />
        <input
          type="text"
          className='template-subject'
          value={templeteSubject}
          onChange={(e: JSXInternal.TargetedEvent<HTMLInputElement>) => setTempleteSubject(e.currentTarget.value)}
          placeholder={'Enter templete subject'}
        />
        <input
          type="text"
          className='template-text'
          value={templateText}
          onChange={(e: JSXInternal.TargetedEvent<HTMLInputElement>) => setTemplateText(e.currentTarget.value)}
          placeholder={'Enter Template text'}
        />



        <button type="submit">Add Templete</button>

      </form>

      <div className="delete-tempelete">
        <div className='delete-input-wrapper'>
          <input
            className='delete-input'
            type="text"
            onChange={(e: JSXInternal.TargetedEvent<HTMLInputElement>)=>setdeleteTemplateName(e.currentTarget.value)}
            placeholder='Enter template name'
          />
        </div>
        <button type='button' onClick={handleDelete}>Delete</button>
      </div>

    </div>
  )
}

export default Home