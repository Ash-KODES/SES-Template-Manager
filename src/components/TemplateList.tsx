import SearchInput from "@components/SearchInput";
import searchIcon from "@assets/search.svg";
import downloadIcon from "@assets/download.svg";
import removeIcon from "@assets/remove.svg";
import editIcon from "@assets/edit.svg";
import menuIcon from "@assets/menu.svg";
import "@css/templateList.css";
import CheckBoxInput from "@components/CheckBoxInput";
import IconButton from "./IconButton";
import { EmailTemplateMetadata } from "@aws-sdk/client-sesv2";
import { useState } from "preact/hooks";

interface Props {
  templateList: EmailTemplateMetadata[];
}

const TemplateList = ({ templateList }: Props) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [isActiveIndex, setisActiveIndex] = useState<number>();

  const handlePopUp = (index: number) => {
    if (isActiveIndex === index) {
      return setIsPopUp(!isPopUp);
    } else {
      setisActiveIndex(index), setIsPopUp(!isPopUp);
    }
  };

  // console.log({ isActiveIndex, isPopUp });
  return (
    <div className="template-list-wrapper">
      <div className="top-navigation-wrapper">
        <form className="search-form">
          <SearchInput
            type="search"
            className="search-input"
            src={searchIcon}
            alt="searchIcon"
            placeholder="Search for  your templates"
          />
        </form>
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
          <tr>
            <th className="checkbox-data">
              <CheckBoxInput type="checkbox" label="Template Name" />
            </th>
            <th>Creation date</th>
          </tr>

          {templateList.map((template, index) => (
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
                />

                {isActiveIndex === index && (
                  <dialog
                    className={`popup-menue ${isPopUp ? "show-popup" : ""}`}
                    open={isPopUp}
                  >
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
                  </dialog>
                )}
              </td>
              <td>
                <img
                  className="menue-wrapper"
                  src={menuIcon}
                  alt="menue"
                  onClick={() => handlePopUp(index)}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default TemplateList;
