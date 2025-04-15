import React from "react";
import DynamicForm from "../forms/Form";
import { addBlog } from "../../actions/addBlog";
import { useModal } from "@/hooks/use-modal";
import { BlogFormDataType } from "@/types/blog";

const AddBlogModal = () => {
  const { closeModal } = useModal();

  async function onSubmit(formData: BlogFormDataType) {
    addBlog(formData)
      .then((res) => {
        if (res.success) {
          closeModal();
          alert("✅ You've successfully added new blog ! :)");
        }
      })
      .catch((err) => {
        alert("🚩 ERROR: " + err.message);
      });
  }

  return (
    <div>
      <DynamicForm
        autosave
        uniqueFormKey="add-blog"
        fields={[
          {
            name: "title",
            variant: "input",
            label: "Title",
            placeholder: "Enter title here",
            required: true,
          },
          {
            name: "shortDescription",
            variant: "input",
            label: "Description",
            placeholder: "Enter short description about this blog",
            required: true,
          },
          {
            name: "thumbnail",
            variant: "image_upload",
            label: "Thumbnail",
          },
          {
            name: "richTextContent",
            variant: "richtext",
            label: "Make blog post",
            required: true,
          },
        ]}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AddBlogModal;
