import { Popover } from "@headlessui/react";
import { type ModalType } from "~/components/sidebar/types";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import MyDialog from "~/components/sidebar/MyDialog";
import { useState } from "react";

const MyPopover = ({
  options,
}: {
  options: { name: string; action: ModalType }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("EDIT");
  function openModal(modalType: ModalType) {
    setIsOpen(true);
    setModalType(modalType);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Popover className="relative">
        <Popover.Button className="outline-none">
          <EllipsisVerticalIcon className="h-5 font-semibold" />
        </Popover.Button>

        <Popover.Panel className="absolute top-6 right-1 z-10">
          <div className="w-[150px] rounded-md border-4 border-r-4 bg-white p-2 text-slateBlue">
            {options.map((opt) => (
              <a
                key={opt.name}
                onClick={() => openModal(opt.action)}
                className="block cursor-pointer rounded p-2 hover:bg-purple-200"
              >
                {opt.name}
              </a>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
      <MyDialog isOpen={isOpen} closeModal={closeModal} modalType={modalType} />
    </>
  );
};

export default MyPopover;
