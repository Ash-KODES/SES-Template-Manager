import SearchInput from "@components/SearchInput";
import searchIcon from "@assets/search.svg";
import downloadIcon from "@assets/download.svg";
import removeIcon from "@assets/remove.svg";
import editIcon from "@assets/edit.svg";
import menuIcon from "@assets/menu.svg";
import "@css/templateList.css";
import CheckBoxInput from "@components/CheckBoxInput";
import IconButton from "@components/IconButton";
import { EmailTemplateMetadata } from "@aws-sdk/client-sesv2";
import { useRef } from "preact/hooks";
import DeleteModel from "@components/DeleteModel";
import { Link } from "preact-router";
import {
  ReadonlySignal,
  useComputed,
  signal,
  useSignalEffect,
} from "@preact/signals";
import useDownload from "@/hooks/useDownload";
import { ChangeEvent } from "preact/compat";
import useMultiDeleteTemp from "@/hooks/useMultiDeleteTemp";
import Button from "./Button";
import TemplateItemSkeleton from "./TemplateItemSkeleton";

interface Props {
  templateList: ReadonlySignal<EmailTemplateMetadata[]>;
  isLoading: ReadonlySignal<boolean>;
}

const templateData = signal<EmailTemplateMetadata[]>([]);
const searchTerms = signal("");
const isDeleteClick = signal({
  isDeleteModel: false,
  templateName: "",
});
const checkBoxData = signal<string[]>([]);
const isCheckedAll = signal(false);

const TemplateList = ({ templateList, isLoading }: Props) => {
  const tempListRef = useRef(null);
  const downloadTemplates = useDownload();
  const multiDeleteTemp = useMultiDeleteTemp();
  const popUpRef = useRef<HTMLDialogElement[]>([]);

  const handlePopUp = (index: number) => {
    popUpRef.current.map((val, i) => i != index && val.close());
    if (popUpRef.current[index]?.open) {
      popUpRef.current[index]?.close();
    } else {
      popUpRef.current[index]?.show();
    }
    // console.log(index);
    // console.log(popUpRef.current);
  };

  // search Templates
  const filterData = useComputed(() =>
    templateList.value.filter((val) =>
      val.TemplateName?.toLowerCase().includes(searchTerms.value.toLowerCase())
    )
  );
  // console.log(filterData.value);
  // console.log("templateData.value", templateData.value);

  useSignalEffect(() => {
    templateData.value = filterData.value;
  });

  // on delete btn clicked open delete model with template name

  const handleDeleteClick = (templateName: string) => {
    isDeleteClick.value = { isDeleteModel: true, templateName };
  };

  // console.log(searchTerms.value, { templateData, filterData });

  // download template
  const handleDownload = async (templateName: string) => {
    const downloadData = await downloadTemplates([templateName]);
    console.log(downloadData);
  };
  const handleMultiDownload = async () => {
    if (checkBoxData.value.length) {
      const downloadMulti = await downloadTemplates(checkBoxData.value);
      console.log(downloadMulti);
    } else {
      console.log("Not selected any template");
    }
  };

  // get checkbox values
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;
    if (checked) {
      checkBoxData.value = [...checkBoxData.value, value];
    } else {
      checkBoxData.value = checkBoxData.value.filter((e) => e !== value);
    }
  };

  const handleSelectAll = () => {
    isCheckedAll.value = !isCheckedAll.value;
    checkBoxData.value = templateData.value.map(
      (template) => template.TemplateName!
    );
    if (!isCheckedAll.value) {
      checkBoxData.value = [];
    }
  };

  // delete multiple templates
  const handleMultiDelete = async () => {
    if (checkBoxData.value.length) {
      const multiDelete = await multiDeleteTemp(checkBoxData.value);
      console.log(multiDelete);
    } else {
      console.log("Not selected any template");
    }
  };

  return (
    <div className="template-list-wrapper" ref={tempListRef}>
      <div className="top-navigation-wrapper">
        <SearchInput
          type="text"
          className="search-input"
          src={searchIcon}
          alt="searchIcon"
          placeholder="Search for your templates"
          onInput={(e) => (searchTerms.value = e.currentTarget.value)}
          value={searchTerms}
        />
        <Link href="/new" class="btn primary" title="Create template">
          Create Template
        </Link>
        <IconButton
          type="button"
          label="Download"
          src={downloadIcon}
          alt="download"
          onClick={handleMultiDownload}
        />

        <IconButton
          type="button"
          label="Delete"
          src={removeIcon}
          alt="delete"
          onClick={handleMultiDelete}
        />
      </div>
      <div className="template-data-container">
        <table className="tabel">
          <thead>
            <tr>
              <th className="checkbox-data">
                <CheckBoxInput
                  type="checkbox"
                  label="Template Name"
                  onChange={handleSelectAll}
                />
              </th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {isLoading.value
              ? Array.from({ length: 7 }).map(() => <TemplateItemSkeleton />)
              : null}

            {templateData?.value?.map((template, index) => (
              <tr key={index}>
                <td className="checkbox-data">
                  <CheckBoxInput
                    type="checkbox"
                    label={template.TemplateName as string}
                    onChange={handleCheck}
                    checked={checkBoxData.value.includes(
                      template.TemplateName!
                    )}
                    value={template.TemplateName}
                  />
                </td>
                <td>
                  {template.CreatedTimestamp?.toLocaleDateString("en-in", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="edit-wrapper">
                  <Link href={`/edit/${template.TemplateName}`}>
                    <IconButton
                      type="button"
                      label="Edit"
                      src={editIcon}
                      alt="edit"
                    />
                  </Link>
                  <dialog
                    className={`popup-menu `}
                    ref={(e) => (popUpRef.current[index] = e!)}
                  >
                    <IconButton
                      type="button"
                      label={"Download"}
                      src={downloadIcon}
                      alt="download"
                      onClick={() => handleDownload(template.TemplateName!)}
                    />
                    <IconButton
                      type="button"
                      label="Delete"
                      src={removeIcon}
                      alt="delete"
                      onClick={() => handleDeleteClick(template.TemplateName!)}
                    />
                  </dialog>
                </td>
                <td class="text-right">
                  <img
                    className="menu-icon"
                    src={menuIcon}
                    alt="menu"
                    onClick={() => handlePopUp(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModel
        templateName={isDeleteClick.value.templateName}
        isDeleteClick={isDeleteClick}
      />
    </div>
  );
};

export default TemplateList;
