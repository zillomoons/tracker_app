import { Dialog } from "@headlessui/react";
import { type ModalType } from "~/components/sidebar/types";

const MyDialog = ({
  isOpen,
  closeModal,
  modalType,
}: {
  isOpen: boolean;
  closeModal: () => void;
  modalType: ModalType;
}) => {
  return (
    <Dialog open={isOpen} className="relative z-20" onClose={closeModal}>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-gray-200">
          <Dialog.Title>
            {" "}
            {modalType === "EDIT"
              ? "Edit Habit"
              : modalType === "ARCHIVE"
              ? "Archive Habit"
              : "Delete Habit"}
          </Dialog.Title>
          <Dialog.Description>This will edit your habit</Dialog.Description>

          {/* <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p> */}

          <button onClick={closeModal}>Deactivate</button>
          <button onClick={closeModal}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MyDialog;
