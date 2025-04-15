import Button from "@/components/ui/Button";
import React from "react";

const AreYouSure = ({
  YES,
  NO,
  children,
}: {
  YES: () => void;
  NO: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center p-4 justify-center rounded-xl shadow-lg">
      <p className="text-lg text-text-primary text-center font-semibold uppercase mb-4">
        {children}
      </p>
      <div className="flex gap-4">
        <Button
          onClick={YES}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Yes
        </Button>
        <Button
          onClick={NO}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default AreYouSure;
