import { useRef } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import { route } from "preact-router";
import useGetTemplate from "@/hooks/useGetTemplate";
import useUpdateTemplate from "@/hooks/useUpdateTemplate";
import TemplateData from "@components/TemplateData";

interface Props {
  templateName: string;
}

const EditTemplate = ({ templateName }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const updateTemplate = useUpdateTemplate();
  const { data, isLoading } = useGetTemplate(templateName);
  // console.log(data.res);

  const handleUpdate = async (e: ChangeEvent) => {
    e.preventDefault();
    const updateData = await updateTemplate({ formRef });
    console.log(updateData);
    route("/");
  };
  console.log("rendered");
  // console.log(isLoading.value);

  return (
    <TemplateData
      templateName={templateName}
      data={data}
      isLoading={isLoading}
      formRef={formRef}
      variant="edit"
      handleSubmit={handleUpdate}
    />
  );
};

export default EditTemplate;
