import Button from "@components/Button";
import Input from "@components/Input";
import TextArea from "@components/TextArea";
import { useRef } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import { route } from "preact-router";

import useGetTemplate from "@/hooks/useGetTemplate";
import { CreateTemplateSchema } from "@/schema/forms-schema";
import "@css/editTemplate.css";
import { updateTemplate } from "@api/ses";

interface Props {
  templateName: string;
}

const EditTemplate = ({ templateName }: Props) => {
  const localData = JSON.parse(localStorage.getItem("auth") as string);
  const formRef = useRef<HTMLFormElement>(null);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading } = useGetTemplate(templateName);
  // console.log(data.res);

  const handleUpdate = async (e: ChangeEvent) => {
    e.preventDefault();
    // setIsLoading(true);
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
        await updateTemplate({ TemplateContent, TemplateName });
        console.log("template update success");
        // setIsLoading(false);
        route("/");
      }
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };
  console.log("rendered");
  // console.log(isLoading.value);

  return (
    <div className="edit-template-container">
      <form onSubmit={handleUpdate} ref={formRef}>
        <h2>Edit your Email template</h2>
        <Input
          type="text"
          label="Template name"
          name="templateName"
          value={templateName}
        />
        <Input
          type="text"
          label="Template subject"
          name="templateSubject"
          value={data.Subject}
          disabled={isLoading}
        />
        <TextArea label="Template Text" name="templateText" value={data.Text} />
        <TextArea label="Template HTML" name="tempalteHtml" value={data.Html} />
        <Button type="submit" isLoading={isLoading} label="Save changes" />
      </form>
    </div>
  );
};

export default EditTemplate;
