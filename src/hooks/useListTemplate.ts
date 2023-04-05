import { listTemplates } from "@api/ses";
import { EmailTemplateMetadata } from "@aws-sdk/client-sesv2";
import { batch, signal, ReadonlySignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

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

const useListTemplate = () => {
  const getData = async () => {
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
  useEffect(() => {
    getData();
  }, []);
  // getData();
  return { data: TemplatesMetadata, error, isLoading } as HookResponse;
};

export default useListTemplate;
