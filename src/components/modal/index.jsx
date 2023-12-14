import {Button, Modal} from 'flowbite-react';

export const SpotiModal = ({
  title,
  confirm,
  cancel,
  children,
  show,
  onClose,
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
        <Modal.Footer>
          <Button color="gray" onClick={() => onClose()}>
            {cancel || 'Annuler'}
          </Button>
          <Button onClick={() => onClose()}>{confirm || 'Confirmer'}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
