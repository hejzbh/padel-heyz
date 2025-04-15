"use client";
import React, { useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { UploadDropzone } from "@/lib/uploadthing";
import Link from "next/link";

interface FieldType {
  name: string;
  label: string;
  variant: "input" | "checkbox" | "image_upload" | "textarea" | "richtext";
  placeholder?: string;
  required?: boolean;
}

interface FormProps {
  className?: string;
  fields: FieldType[];
  initFormData?: any;
  uniqueFormKey: string;
  autosave?: boolean;
  onSubmit: (data: any) => void;
}

const DynamicForm: React.FC<FormProps> = ({
  className,
  fields,
  onSubmit,
  initFormData,
  uniqueFormKey,
  autosave,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submiting, setSubmiting] = useState<boolean>(false);

  // Load form data from local storage or init
  useEffect(() => {
    if (initFormData) {
      setFormData(initFormData);
    } else {
      if (!autosave) return;

      const savedFormData = localStorage.getItem(uniqueFormKey);
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    }
  }, [initFormData]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (autosave) {
        localStorage.setItem(uniqueFormKey, JSON.stringify(updatedData));
      }

      return updatedData;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (submiting) return;
    setSubmiting(true);
    setTimeout(() => {
      setSubmiting(false);
    }, 350);

    localStorage.removeItem(uniqueFormKey);
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className={className}>
      {fields.map((field) => {
        return (
          <div key={field.name} className="mb-4 ">
            <label
              className="block  mb-1 ml-1 text-text-secondary"
              htmlFor={field.name}
            >
              {field.label}
              {field.required && <span className="text-red-400 pl-1">*</span>}
            </label>
            {field.variant === "input" && (
              <Input
                type="text"
                required={field.required}
                placeholder={field.placeholder}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(value) => handleChange(field.name, value)}
                className="w-full placeholder:!text-[14px]"
              />
            )}
            {field.variant === "textarea" && (
              <textarea
                required={field.required}
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                maxLength={300}
                rows={4}
                cols={4}
                className="rounded-lg p-2 border-[1px] outline-none text-text-input border-border-primary w-full resize-none"
              ></textarea>
            )}
            {field.variant === "checkbox" && (
              <input
                required={field.required}
                type="checkbox"
                id={field.name}
                checked={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.checked)}
                className="mr-2 ml-4"
              />
            )}
            {field.variant === "image_upload" && (
              <div className="border-[1px] border-border-primary p-2 text-text-primary space-y-2 overflow-hidden">
                <UploadDropzone
                  className="w-full h-[200px] !text-text-primary"
                  endpoint={"imageUploader"}
                  onClientUploadComplete={(res: any[]) => {
                    handleChange(field.name, res[0]?.ufsUrl);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`Image error upload! ${error.message}`);
                  }}
                />
                {formData[field.name] && (
                  <Link
                    target="_blank"
                    title="image link"
                    className="text-[#006ab0] underline"
                    href={formData[field.name]}
                  >
                    {formData[field.name]}
                  </Link>
                )}
              </div>
            )}
            {field.variant === "richtext" && (
              <RichTextEditor
                content={formData[field.name]}
                onChange={(content) => {
                  handleChange(field.name, content);
                }}
              />
            )}
          </div>
        );
      })}
      <div className="flex justify-end">
        <Button disabled={submiting} className="disabled:opacity-70">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
