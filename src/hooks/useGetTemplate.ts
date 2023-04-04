import { getTemplate } from "@api/ses";
import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

const data = signal({
  res: { Html: "", Subject: "", Text: "" },
  isLoading: true,
  isError: "",
});

const useGetTemplate = (TemplateName: string) => {
  const getData = async (): Promise<void> => {
    try {
      const response = await getTemplate({ TemplateName });
      // console.log(response);
      data.value.res = {
        Html: response.TemplateContent?.Html!,
        Subject: response.TemplateContent?.Subject!,
        Text: response.TemplateContent?.Text!,
      };
      data.value.isLoading = false;
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        data.value.isError = err.message;
        data.value.isLoading = false;
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return data.value;
};

export default useGetTemplate;
