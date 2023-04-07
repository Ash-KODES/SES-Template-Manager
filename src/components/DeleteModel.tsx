import lockContainerIcon from "@assets/lockContainer.svg";
import "@css/deleteModel.css";
import Input from "@components/Input";
import Button from "@components/Button";
import { useRef } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import { Signal, signal } from "@preact/signals";
import useDeleteTemplate from "@/hooks/useDeleteTemplate";

interface Props {
  isDeleteClick: Signal<{
    isDeleteModel: boolean;
    templateName: string;
  }>;
  templateName: string;
}
const isLoading = signal(false);

const DeleteModel = ({ templateName, isDeleteClick }: Props) => {
  const deleteRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const getDelete = useDeleteTemplate();

  // hide model when clicked outside
  window.onclick = (e) => {
    if (e.target === deleteRef.current) {
      isDeleteClick.value = { isDeleteModel: false, templateName };
    }
  };
  // console.log(templateName);

  const handleDelete = async (e: ChangeEvent) => {
    e.preventDefault();
    isLoading.value = true;
    const deleteTemp = await getDelete({
      formRef,
      templateName,
      isDeleteClick,
    });
    console.log(deleteTemp);
    isLoading.value = false;
  };

  return (
    <div className="delete-model-container" ref={deleteRef}>
      <div className="delete-model-wrapper">
        <div className="delete-head-wrapper">
          <img src={lockContainerIcon} alt="lockicon" />
          <h2 className="delete-tittle">Delete {templateName}?</h2>
        </div>
        <div className="delete-content-wrapper">
          <p>
            Are you sure you want to permanently delete {templateName}? This is
            irreversible, make sure to take a backup if you change your mind.
          </p>
          <form onSubmit={handleDelete} ref={formRef}>
            <Input
              type="text"
              name="templateInputName"
              placeholder="Enter your email template name to proceed"
              label="Your template name"
              required
            />
            <Button
              type="submit"
              isLoading={isLoading}
              label="Delete this template"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
