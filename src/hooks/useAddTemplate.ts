import { CreateTemplateSchema } from "@/schema/forms-schema";
import { addNewTemplate } from "@api/ses";
import { signal } from "@preact/signals";
import { Ref } from "preact/hooks";

interface IAdd {
  formRef: Ref<HTMLFormElement>;
}
let isLoading = signal(true);
let error = signal<null | string>(null);

const useAddTemplate = () => {
  const getAdd = async ({ formRef }: IAdd) => {
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
  return getAdd;
};

export default useAddTemplate;
