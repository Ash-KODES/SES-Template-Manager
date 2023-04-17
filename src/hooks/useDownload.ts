import { getTemplate } from "@api/ses";
import { signal } from "@preact/signals";
import FileSaver from "file-saver";

const isLoading = signal(true);
const error = signal<null | string>(null);

const downloadTemplates = async (TemplateNameArr: string[]) => {
  try {
    TemplateNameArr?.map(async (TemplateName) => {
      const response = await getTemplate({ TemplateName });
      // console.log(response);
      const Html = response.TemplateContent?.Html!;
      const Text = response.TemplateContent?.Text!;
      const htmlBlob = new Blob([Html], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(htmlBlob, `${TemplateName}.html`);
      const textBlob = new Blob([Text], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(textBlob, `${TemplateName}.txt`);
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

const useDownload = () => {
  return downloadTemplates;
};

export default useDownload;
