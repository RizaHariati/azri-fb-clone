import React from "react";

interface Props {
  text: string;
}
const TextBtn = ({ text }: Props) => {
  return (
    <button className=" h-12  bg-none text-textLight flex  hover:bg-primaryMedium rounded-md transition-all relative  justify-center items-center  text-sm font-medium gap-2 p-3 mb-0  text-center focus:h-full focus:border-b-4 border-accentMain focus:rounded-none">
      <p className="text-textMedium font-normal text-sm text-center">{text}</p>
    </button>
  );
};

export default TextBtn;
