import {Checkbox, Label, TextInput} from 'flowbite-react';
import {SpotiModal} from '../../../components/modal';

export const AddPlaylistModal = ({show, onClose}) => {
  return (
    <SpotiModal
      title="Créer une playlist"
      confirm="Créer"
      show={show}
      onClose={() => onClose(false)}>
      <div>
        <Label className="text-spotiblack">Nom de la playlist</Label>
        <TextInput
          type="text"
          placeholder="Nom de la playlist"
          className="mt-1"
        />
      </div>
    </SpotiModal>
  );
};
