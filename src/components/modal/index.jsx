import {Button, Modal, Spinner} from 'flowbite-react';

export const SpotiModal = ({
  title,
  confirm,
  cancel,
  children,
  show,
  onClose,
  onSubmit,
  loading,
}) => {
  return (
    <>
      <Modal
        position="center"
        dismissible
        show={show}
        onClose={() => onClose()}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button color="gray" disabled={loading} onClick={() => onClose()}>
            {cancel || 'Annuler'}
          </Button>
          <Button disabled={loading} onClick={() => onSubmit()}>
            {loading && <Spinner className="h-4 w-4 mr-2 -mt-1" />}
            {confirm || 'Confirmer'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
