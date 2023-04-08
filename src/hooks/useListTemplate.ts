import { listTemplates } from "@api/ses";
import { EmailTemplateMetadata } from "@aws-sdk/client-sesv2";
import { signal, ReadonlySignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

type HookResponse = {
  data: ReadonlySignal<EmailTemplateMetadata[]>;
  isLoading: ReadonlySignal<boolean>;
  error: ReadonlySignal<string>;
};

const { TemplatesMetadata } = {
  TemplatesMetadata: signal<EmailTemplateMetadata[]>([]),
};
const isLoading = signal(true);
const error = signal<null | string>(null);

const listTemplatesData = async () => {
  try {
    const response = await listTemplates();
    // console.log(response);
    TemplatesMetadata.value = response.TemplatesMetadata!;
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      error.value = err.message;
    }
  } finally {
    isLoading.value = false;
  }
};
const useListTemplate = () => {
  useEffect(() => {
    listTemplatesData();
  }, []);
  return { data: TemplatesMetadata, error, isLoading } as HookResponse;
};

export default useListTemplate;
