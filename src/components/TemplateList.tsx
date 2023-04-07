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
import { route } from "preact-router";
import {
  ReadonlySignal,
  useComputed,
  signal,
  useSignalEffect,
} from "@preact/signals";
import useDownload from "@/hooks/useDownload";

interface Props {
  templateList: ReadonlySignal<EmailTemplateMetadata[]>;
}

const templateData = signal<EmailTemplateMetadata[]>([]);
const searchTerms = signal("");
const isPopUp = signal(false);
const isActiveIndex = signal<number | null>(null);
const isDeleteClick = signal({
  isDeleteModel: false,
  templateName: "",
});

const TemplateList = ({ templateList }: Props) => {
  const tempListRef = useRef(null);
  const downloadFn = useDownload();

  const handlePopUp = (index: number) => {
    if (isActiveIndex.value === index) {
      return (isPopUp.value = !isPopUp.value);
    } else {
      (isActiveIndex.value = index), (isPopUp.value = !isPopUp.value);
    }
  };

  // hide model when clicked outside
  window.onclick = (e) => {
    if (e.target === tempListRef.current) {
      isPopUp.value = false;
    }
  };

  // console.log(isActiveIndex.value, isPopUp.value);

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

  // redirect to edit page
  const handelRedirect = (templateName: string) => {
    route(`/edit/${templateName}`);
  };

  // download template
  const handleDownload = async (templateName: string) => {
    const downloadData = await downloadFn(templateName);
    console.log(downloadData);
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
        <IconButton
          type="button"
          label="Download"
          src={downloadIcon}
          alt="download"
        />
        <IconButton
          type="button"
          label="Delete"
          src={removeIcon}
          alt="delete"
        />
      </div>
      <div className="template-data-container">
        <table className="tabel">
          <thead>
            <tr>
              <th className="checkbox-data">
                <CheckBoxInput type="checkbox" label="Template Name" />
              </th>
              <th>Creation date</th>
            </tr>
          </thead>
          <tbody>
            {filterData.value.length ? (
              templateData.value.map((template, index) => (
                <tr key={index}>
                  <td className="checkbox-data">
                    <CheckBoxInput
                      type="checkbox"
                      label={template.TemplateName as string}
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
                    <IconButton
                      type="button"
                      label="Edit"
                      src={editIcon}
                      alt="edit"
                      onClick={() =>
                        template.TemplateName &&
                        handelRedirect(template.TemplateName)
                      }
                    />

                    {isActiveIndex.value === index && (
                      <dialog
                        className={`popup-menu ${
                          isPopUp.value ? "show-popup" : ""
                        }`}
                        open={isPopUp.value}
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
                          onClick={() =>
                            template.TemplateName &&
                            handleDeleteClick(template.TemplateName)
                          }
                        />
                      </dialog>
                    )}
                  </td>
                  <td>
                    <img
                      className="menu-icon"
                      src={menuIcon}
                      alt="menu"
                      onClick={() => handlePopUp(index)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <div>No Result Found</div>
            )}
          </tbody>
        </table>
      </div>
      {isDeleteClick.value.isDeleteModel ? (
        <DeleteModel
          templateName={isDeleteClick.value.templateName}
          isDeleteClick={isDeleteClick}
        />
      ) : null}
    </div>
  );
};

export default TemplateList;
