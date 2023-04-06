import { Placeholder } from "@/constant/placeholders";
import { CreateTemplateSchema } from "@/schema/forms-schema";
import { addNewTemplate } from "@api/ses";
import Button from "@components/Button";
import Input from "@components/Input";
import TextArea from "@components/TextArea";
import "@css/addTemplate.css";
import { signal } from "@preact/signals";
import { route } from "preact-router";
import { ChangeEvent, useRef } from "preact/compat";

const isLoading = signal(false);

const AddTemplate = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleCreate = async (e: ChangeEvent) => {
    e.preventDefault();
    isLoading.value = true;
    try {
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
        isLoading.value = false;
        route("/");
      }
    } catch (error) {
      console.log(error);
      isLoading.value = false;
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
          isLoading={isLoading}
          disabled={isLoading}
          label={"Create Template"}
        />
      </form>
    </div>
  );
};

export default AddTemplate;
