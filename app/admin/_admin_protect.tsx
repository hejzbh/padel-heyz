"use client";

import React, { useEffect, useState } from "react";

const AdminProtect = ({ children }: { children: React.ReactNode }) => {
  const [adminKey, setAdminKey] = useState<any>("");

  /* eslint-disable */
  useEffect(() => {
    setAdminKey(prompt("What is a password of admin panel?"));
  }, []);

  if (!adminKey) return null;

  if (adminKey !== process.env.NEXT_PUBLIC_ADMIN_SECRET)
    return (
      <div className="text-3xl text-red-600 font-bold p-10">
        Access denied, wrong password
      </div>
    );

  return children;
};

export default AdminProtect;
