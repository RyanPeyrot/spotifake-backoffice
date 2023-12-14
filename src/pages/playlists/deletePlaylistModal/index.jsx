import {Label, TextInput} from 'flowbite-react';
import {SpotiModal} from '../../../components/modal';
import {useEffect, useState} from 'react';

export const DeletePlaylistModal = ({show, onClose, playlists}) => {
  const [songs, setSongs] = useState([]);

  return (
    <SpotiModal
      title="Supprimer des playlists"
      confirm="Supprimer"
      show={show}
      onClose={() => onClose()}>
      <p>Voulez vous vraiment supprimer ces playlists ?</p>
    </SpotiModal>
  );
};
