"use client";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  label: string;
  closeMenu: () => void; // Add closeMenu prop
}

const TransitionLink = ({ href, label, closeMenu }: Props) => {
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== href) {
      closeMenu(); // Close the menu when navigating
    }
  };

  return (
    <p className="overflow-hidden flex flex-col w-full ">
      <span
        onClick={handleClick}
        className="menu_item relative  text-black px-base duration-150 top-96 hover:bg-black hover:text-yellow-400 w-full font-bold"
      >
        {label}
      </span>
    </p>
  );
};

export default TransitionLink;
