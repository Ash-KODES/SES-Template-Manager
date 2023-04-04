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
import { useEffect, useRef, useState } from "preact/hooks";
import DeleteModel from "@components/DeleteModel";
import { route } from "preact-router";

interface Props {
  templateList: EmailTemplateMetadata[];
}

const TemplateList = ({ templateList }: Props) => {
  const [templateData, setTemplateData] = useState(templateList);
  const [searchTerms, setSearchTerms] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);
  const [isActiveIndex, setisActiveIndex] = useState<number>();
  const [isDeleteClick, setIsDeleteClick] = useState({
    isDeleteModel: false,
    templateName: "",
  });

  const tempListRef = useRef(null);

  const handlePopUp = (index: number) => {
    if (isActiveIndex === index) {
      return setIsPopUp(!isPopUp);
    } else {
      setisActiveIndex(index), setIsPopUp(!isPopUp);
    }
  };

  // hide model when clicked outside
  window.onclick = (e) => {
    if (e.target === tempListRef.current) {
      setIsPopUp(false);
    }
  };

  // console.log({ isActiveIndex, isPopUp });

  // search Templates
  const filterData = templateList.filter((val) =>
    val.TemplateName?.toLowerCase().includes(searchTerms.toLowerCase())
  );

  useEffect(() => {
    setTemplateData(filterData);
  }, [searchTerms]);

  // on delete btn clicked open delete model with template name

  const handleDeleteClick = (templateName: string) => {
    setIsDeleteClick({ isDeleteModel: true, templateName });
  };

  // console.log({ searchTerms, templateData, filterData });

  // redirect to edit page
  const handelRedirect = (templateName: string) => {
    route(`/edit/${templateName}`);
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
          onInput={(e) => setSearchTerms(e.currentTarget.value)}
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
            {filterData.length ? (
              templateData.map((template, index) => (
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

                    {isActiveIndex === index && (
                      <dialog
                        className={`popup-menu ${isPopUp ? "show-popup" : ""}`}
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
      {isDeleteClick.isDeleteModel ? (
        <DeleteModel
          templateName={isDeleteClick.templateName}
          setIsDeleteClick={setIsDeleteClick}
        />
      ) : null}
    </div>
  );
};

export default TemplateList;
