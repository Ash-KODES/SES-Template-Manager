import { listTemplates } from "@api/ses";
import { EmailTemplateMetadata } from "@aws-sdk/client-sesv2";
import { useEffect, useState } from "preact/hooks";

const useListTemplate = () => {
  const [data, setData] = useState<EmailTemplateMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string>("");

  const getData = async () => {
    try {
      const response = await listTemplates();
      // console.log(response);
      setData(response.TemplatesMetadata!);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        setIsError(err.message);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, isError, isLoading };
};

export default useListTemplate;
