"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineLoading as LoadingIcon } from "react-icons/ai";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useModal } from "@/hooks/use-modal";
import { truncStr } from "@/utils/truncString";
import { BlogType } from "@/types/blog";
import getBlogs from "@/actions/getBlogs";

const AdminBlog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const { openModal } = useModal();

  useEffect(() => {
    if (!searchQuery) {
      setBlogs([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const { blogs } = await getBlogs({ title: searchQuery });
        setBlogs(blogs);
      } catch {
        alert("Error occurred, please contact developer: Amel");
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      setLoading(false);
    };
  }, [searchQuery]);

  return (
    <div>
      <div className="flex items-center justify-between space-x-5">
        <h2 className="text-2xl md:text-4xl font-semibold text-text-primary">
          Blog
        </h2>
        <Button
          className="hover:!bg-primary"
          onClick={() => openModal("addBlog")}
        >
          Add Blog
        </Button>
      </div>

      <Input
        placeholder="Search blog by title"
        value={searchQuery}
        useDebounce
        onChange={setSearchQuery}
        className="mt-5 w-full !border-[3px]"
      />

      <div className="mt-5">
        {loading && (
          <LoadingIcon className="animate-spin mx-auto text-[50px] text-primary mt-5" />
        )}

        {searchQuery && !loading && !blogs.length && (
          <p className="text-lg text-text-secondary text-center">
            No results...
          </p>
        )}

        <ul className="space-y-5">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="py-3 px-4 rounded-xl flex items-center flex-col md:flex-row justify-between bg-bg-primary shadow-md text-text-primary"
            >
              <h3 className="text-sm md:text-lg">
                {truncStr(blog.title, 35)} -{" "}
              </h3>
              <div className="space-x-3">
                <Button
                  className="!bg-[#006ab0] text-[14px]"
                  onClick={() =>
                    openModal("editBlog", blog, (updatedBlog: BlogType) => {
                      if (!updatedBlog.id) return;
                      setBlogs((prevBlogs) =>
                        prevBlogs.map((b) =>
                          b.id === updatedBlog.id ? updatedBlog : b
                        )
                      );
                    })
                  }
                >
                  Edit
                </Button>
                <Button
                  className="!bg-red-500 text-[14px]"
                  onClick={() =>
                    openModal("deleteBlog", blog, (deletedBlog: BlogType) => {
                      if (!deletedBlog.id) return;
                      setBlogs((prevBlogs) =>
                        prevBlogs.filter((blog) => blog.id !== deletedBlog.id)
                      );
                    })
                  }
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminBlog;
