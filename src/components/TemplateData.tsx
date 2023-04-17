import { Ref } from "preact/hooks";
import Input from "@components/Input";
import TextArea from "@components/TextArea";
import Button from "@components/Button";
import { ReadonlySignal } from "@preact/signals";
import { ChangeEvent } from "preact/compat";
import { Placeholder } from "@/constant/placeholders";

interface Props {
  templateName?: string;
  data?: {
    Html: ReadonlySignal<string>;
    Subject: ReadonlySignal<string>;
    Text: ReadonlySignal<string>;
  };
  isLoading?: ReadonlySignal<boolean>;
  formRef: Ref<HTMLFormElement>;
  handleSubmit: (e: ChangeEvent) => Promise<void>;
  variant: "create" | "edit";
}

const TemplateData = ({
  templateName,
  data,
  isLoading,
  formRef,
  variant,
  handleSubmit,
}: Props) => {
  return (
    <div className="template-data-container">
      <form onSubmit={handleSubmit} ref={formRef}>
        <h2>
          {variant === "edit"
            ? "Edit your Email template"
            : "Create your Email template"}
        </h2>
        <Input
          type="text"
          label="Template name"
          name="TemplateName"
          value={templateName}
          placeholder={Placeholder.TemplateName}
        />
        <Input
          type="text"
          label="Template subject"
          name="templateSubject"
          value={data?.Subject}
          placeholder={Placeholder.templateSubject}
        />
        <TextArea
          label="Template Text"
          name="templateText"
          value={data?.Text}
          placeholder={Placeholder.TemplateText}
        />
        <TextArea
          label="Template HTML"
          name="tempalteHtml"
          value={data?.Html}
          placeholder={Placeholder.TemplateHTML}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          label={variant == "edit" ? "Save changes" : "Create Template"}
        />
      </form>
    </div>
  );
};

export default TemplateData;
