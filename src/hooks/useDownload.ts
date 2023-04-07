import { getTemplate } from "@api/ses";
import { signal } from "@preact/signals";
import FileSaver from "file-saver";

let { Html, Subject, Text } = {
  Html: "",
  Subject: "",
  Text: "",
};
const isLoading = signal(true);
const error = signal<null | string>(null);

const useDownload = () => {
  const downloadFn = async (TemplateName: string) => {
    try {
      const response = await getTemplate({ TemplateName });
      // console.log(response);

      Html = response.TemplateContent?.Html!;
      Subject = response.TemplateContent?.Subject!;
      Text = response.TemplateContent?.Text!;

      const htmlBlob = new Blob([Html], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(htmlBlob, `${TemplateName}.html`);
      const textBlob = new Blob([Text], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(textBlob, `${TemplateName}.txt`);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      isLoading.value = false;
    }
    return { isLoading, error };
  };
  return downloadFn;
};

export default useDownload;
