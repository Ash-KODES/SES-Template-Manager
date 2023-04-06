import { deleteTemplate } from "@api/ses";
import { ReadonlySignal, Signal, signal } from "@preact/signals";
import { Ref } from "preact/hooks";

type HookResponse = {
  error: ReadonlySignal<string>;
};

interface IDelete {
  formRef: Ref<HTMLFormElement>;
  templateName: string;
  isDeleteClick: Signal<{
    isDeleteModel: boolean;
    templateName: string;
  }>;
}

const error = signal<null | string>(null);

const useDeleteTemplate = async ({
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
        // isLoading.value = false;
        isDeleteClick.value = { isDeleteModel: false, templateName };
      } else {
        console.log("template name not matched");
        // isLoading.value = false;
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    }
  }

  return { error } as HookResponse;
};

export default useDeleteTemplate;
