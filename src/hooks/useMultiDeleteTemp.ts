import { deleteTemplate } from "@api/ses";
import { signal } from "@preact/signals";

const isLoading = signal(true);
const error = signal<null | string>(null);

const MultiDeleteTemp = async (TemplateNameArr: string[]) => {
  try {
    TemplateNameArr.map(async (TemplateName) => {
      await deleteTemplate({ TemplateName });
      console.log(`${TemplateName} is deleted successfully`);
    });
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    }
  } finally {
    isLoading.value = false;
  }
  return { isLoading, error };
};

const useMultiDeleteTemp = () => {
  return MultiDeleteTemp;
};

export default useMultiDeleteTemp;
