import { CreateTemplateSchema } from "@/schema/forms-schema";
import { addNewTemplate, setupSesClient } from "@api/ses";
import Button from "@components/Button";
import Input from "@components/Input";
import TextArea from "@components/TextArea";
import "@css/addTemplate.css";
import { route } from "preact-router";
import { ChangeEvent, useRef } from "preact/compat";

const AddTemplate = () => {
  const localData = JSON.parse(localStorage.getItem("auth") as string);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCreate = async (e: ChangeEvent) => {
    e.preventDefault();
    try {
      if (localData !== null) {
        const { accessKeyId, secretAccessKey } = localData;
        setupSesClient({ accessKeyId, secretAccessKey });
      }
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const formDataObj = Object.fromEntries(formData.entries());
        const parsedFormVal = CreateTemplateSchema.parse(formDataObj);
        const { templateName, templateText, tempalteHtml } = parsedFormVal;
        console.log(tempalteHtml, templateName, templateText);
        const TemplateContent = {
          Html: tempalteHtml,
          Subject: templateText,
          Text: templateText,
        };
        const TemplateName = templateName;
        await addNewTemplate({ TemplateContent, TemplateName });
        console.log("template created success");
        route("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-template-container">
      <form onSubmit={handleCreate} ref={formRef}>
        <h2>Create your Email template</h2>
        <Input
          type="text"
          label="Template name"
          name="templateName"
          placeholder={"My coolest cold email"}
        />
        <TextArea
          label="Template Text"
          name="templateText"
          placeholder={"Write here template name"}
        />
        <TextArea
          label="Template HTML"
          name="tempalteHtml"
          placeholder={"Write here template html"}
        />
        <Button type="submit" label="Create Template" />
      </form>
    </div>
  );
};

export default AddTemplate;
