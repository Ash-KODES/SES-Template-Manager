import { deleteTemplate } from "@api/ses";
import { Signal, signal } from "@preact/signals";
import { Ref } from "preact/hooks";

interface IDelete {
  formRef: Ref<HTMLFormElement>;
  templateName: string;
  isDeleteClick: Signal<{
    isDeleteModel: boolean;
    templateName: string;
  }>;
}
const isLoading = signal(true);
const error = signal<null | string>(null);

const deleteTemp = async ({
  formRef,
  templateName,
  isDeleteClick,
}: IDelete) => {
  try {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const templateInputName = formData.get("templateInputName");
      console.log(templateInputName);
      if (templateInputName === templateName) {
        await deleteTemplate({ TemplateName: templateInputName });
        console.log(`${templateInputName} is deleted successfully`);

        isDeleteClick.value = { isDeleteModel: false, templateName };
      } else {
        console.log("template name not matched");
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    }
  } finally {
    isLoading.value = false;
  }
  return { isLoading, error };
};

const useDeleteTemplate = () => {
  return deleteTemp;
};

export default useDeleteTemplate;
