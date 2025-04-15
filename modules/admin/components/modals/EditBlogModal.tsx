import React from "react";
import DynamicForm from "../forms/Form";
import { useModal } from "@/hooks/use-modal";
import { BlogFormDataType, BlogType } from "@/types/blog";
import { editBlog } from "../../actions/editBlog";

const EditBlogModal = () => {
  const { closeModal, data, fn: modalFn = () => {} } = useModal();

  async function onSubmit(formData: BlogFormDataType) {
    if (!data) return;

    editBlog(data?.id, formData)
      .then((res) => {
        if (res.success) {
          modalFn(res.data);
          closeModal();
          alert("✅ You've successfully edited a blog :)");
        }
      })
      .catch((err) => {
        alert("🚩 ERROR: " + err.message);
      });
  }

  if (!data) {
    alert("Error: No blog data, contact developers please.");
    return;
  }

  return (
    <div>
      <DynamicForm
        uniqueFormKey={`edit-blog-${data.id}`}
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
        initFormData={
          {
            title: (data as BlogType)?.title,
            shortDescription: (data as BlogType)?.shortDescription,
            thumbnail: (data as BlogType)?.thumbnail,
            richTextContent: (data as BlogType)?.richTextContent,
          } as BlogFormDataType
        }
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditBlogModal;
