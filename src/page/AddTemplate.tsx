import { Placeholder } from "@/constant/placeholders";
import useAddTemplate from "@/hooks/useAddTemplate";
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
  const getAdd = useAddTemplate();

  const handleCreate = async (e: ChangeEvent) => {
    e.preventDefault();
    isLoading.value = true;
    const addTemp = await getAdd({ formRef });
    console.log("done", addTemp);
    isLoading.value = false;
    route("/");
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
        <Button type="submit" isLoading={isLoading} label={"Create Template"} />
      </form>
    </div>
  );
};

export default AddTemplate;
