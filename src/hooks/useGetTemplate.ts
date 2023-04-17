import { getTemplate } from "@api/ses";
import { batch, ReadonlySignal, signal } from "@preact/signals";

type HookResponse = {
  data: {
    Html: ReadonlySignal<string>;
    Subject: ReadonlySignal<string>;
    Text: ReadonlySignal<string>;
  };
  isLoading: ReadonlySignal<boolean>;
  error: ReadonlySignal<string>;
};
const { Html, Subject, Text } = {
  Html: signal(""),
  Subject: signal(""),
  Text: signal(""),
};

const isLoading = signal(true);
const error = signal<null | string>(null);

const getTemplateData = async (TemplateName: string) => {
  try {
    const response = await getTemplate({ TemplateName });
    // console.log(response);
    batch(() => {
      Html.value = response.TemplateContent?.Html!;
      Subject.value = response.TemplateContent?.Subject!;
      Text.value = response.TemplateContent?.Text!;
    });
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    }
  } finally {
    isLoading.value = false;
  }
};

const useGetTemplate = (TemplateName: string) => {
  getTemplateData(TemplateName);
  return { data: { Html, Subject, Text }, isLoading, error } as HookResponse;
};

export default useGetTemplate;
