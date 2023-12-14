import {Checkbox, Label, TextInput} from 'flowbite-react';
import {SpotiModal} from '../../../components/modal';

export const AddSongModal = ({show, onClose}) => {
  return (
    <SpotiModal
      title="Ajouter une musique"
      confirm="Ajouter"
      show={show}
      onClose={() => onClose(false)}>
      <div>
        <Label className="text-spotiblack">Nom de la musique</Label>
        <TextInput
          type="text"
          placeholder="Nom de la musique"
          className="mt-1"
        />
      </div>
    </SpotiModal>
  );
};
