import useAddTemplate from "@/hooks/useAddTemplate";
import TemplateData from "@components/TemplateData";
import { signal } from "@preact/signals";
import { route } from "preact-router";
import { ChangeEvent, useRef } from "preact/compat";

const isLoading = signal(false);

const AddTemplate = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const addTemplate = useAddTemplate();

  const handleCreate = async (e: ChangeEvent) => {
    e.preventDefault();
    isLoading.value = true;
    const addTemp = await addTemplate({ formRef });
    console.log(addTemp);
    isLoading.value = false;
    route("/");
  };

  return (
    <TemplateData
      formRef={formRef}
      handleSubmit={handleCreate}
      variant="create"
      isLoading={isLoading}
    />
  );
};

export default AddTemplate;
