import { CreateTemplateSchema } from "@/schema/forms-schema";
import { addNewTemplate } from "@api/ses";
import { signal } from "@preact/signals";
import { Ref } from "preact/hooks";

interface IAdd {
  formRef: Ref<HTMLFormElement>;
}
const isLoading = signal(true);
const error = signal<null | string>(null);

const addTemplate = async ({ formRef }: IAdd) => {
  try {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const formDataObj = Object.fromEntries(formData.entries());
      const parsedFormVal = CreateTemplateSchema.parse(formDataObj);
      const { TemplateName, templateSubject, templateText, tempalteHtml } =
        parsedFormVal;
      console.log(TemplateName, templateSubject, templateText, tempalteHtml);
      const TemplateContent = {
        Html: tempalteHtml,
        Subject: templateSubject,
        Text: templateText,
      };
      await addNewTemplate({ TemplateContent, TemplateName });
      console.log("template created success");
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

const useAddTemplate = () => {
  return addTemplate;
};

export default useAddTemplate;
