import { CreateTemplateSchema } from "@/schema/forms-schema";
import { updateTemplate } from "@api/ses";
import { signal } from "@preact/signals";
import { Ref } from "preact/hooks";

interface IUpdate {
  formRef: Ref<HTMLFormElement>;
}
const isLoading = signal(true);
const error = signal<null | string>(null);

const useUpdateTemplate = () => {
  const getUpdate = async ({ formRef }: IUpdate) => {
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
  return getUpdate;
};

export default useUpdateTemplate;
