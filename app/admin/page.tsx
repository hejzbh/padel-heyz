"use client";
import Separator from "@/components/ui/Separator";
import AdminBlog from "@/modules/admin/components/AdminBlog";
import AdminCourts from "@/modules/admin/components/AdminCourts";
import React from "react";

const AdminPage = () => {
  return (
    <div className="container mx-auto px-2 pt-10 space-y-10">
      <AdminCourts />
      <Separator className="my-10" />
      <AdminBlog />
    </div>
  );
};

export default AdminPage;
