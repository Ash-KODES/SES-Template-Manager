import Button from "@components/Button";
import Input from "@components/Input";
import TextArea from "@components/TextArea";
import { useRef } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import { route } from "preact-router";
import useGetTemplate from "@/hooks/useGetTemplate";
import "@css/editTemplate.css";
import useUpdateTemplate from "@/hooks/useUpdateTemplate";

interface Props {
  templateName: string;
}

const EditTemplate = ({ templateName }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const getUpdate = useUpdateTemplate();

  const { data, isLoading } = useGetTemplate(templateName);
  // console.log(data.res);

  const handleUpdate = async (e: ChangeEvent) => {
    e.preventDefault();
    const updateData = await getUpdate({ formRef });
    console.log(updateData);
    route("/");
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
