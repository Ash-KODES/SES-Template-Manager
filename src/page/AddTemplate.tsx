import { Placeholder } from "@/constant/placeholders";
import { CreateTemplateSchema } from "@/schema/forms-schema";
import { addNewTemplate, setupSesClient } from "@api/ses";
import Button from "@components/Button";
import Input from "@components/Input";
import TextArea from "@components/TextArea";
import "@css/addTemplate.css";
import { route } from "preact-router";
import { ChangeEvent, useRef, useState } from "preact/compat";

const AddTemplate = () => {
  const localData = JSON.parse(localStorage.getItem("auth") as string);
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (e: ChangeEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (localData !== null) {
        const { accessKeyId, secretAccessKey } = localData;
        setupSesClient({ accessKeyId, secretAccessKey });
      }
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const formDataObj = Object.fromEntries(formData.entries());
        const parsedFormVal = CreateTemplateSchema.parse(formDataObj);
        const { templateName, templateSubject, templateText, tempalteHtml } =
          parsedFormVal;
        console.log(templateName, templateSubject, templateText, tempalteHtml);
        const TemplateContent = {
          Html: tempalteHtml,
          Subject: templateSubject,
          Text: templateText,
        };
        const TemplateName = templateName;
        await addNewTemplate({ TemplateContent, TemplateName });
        console.log("template created success");
        setIsLoading(false);
        route("/");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
          placeholder={Placeholder.TemplateName}
        />
        <Input
          type="text"
          label="Template subject"
          name="templateSubject"
          placeholder={Placeholder.templateSubject}
        />
        <TextArea
          label="Template Text"
          name="templateText"
          placeholder={Placeholder.TemplateText}
        />
        <TextArea
          label="Template HTML"
          name="tempalteHtml"
          placeholder={Placeholder.TemplateHTML}
        />
        <Button
          type="submit"
          className={isLoading ? "btn-loading" : ""}
          disabled={isLoading}
          label={`${isLoading ? "" : "Create Template"}`}
        />
      </form>
    </div>
  );
};

export default AddTemplate;
