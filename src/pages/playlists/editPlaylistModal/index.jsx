import {Label, TextInput} from 'flowbite-react';
import {SpotiModal} from '../../../components/modal';
import {useEffect, useState} from 'react';

export const EditPlaylistModal = ({show, onClose, playlist}) => {
  const [newPlaylist, setNewPlaylist] = useState(playlist);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setNewPlaylist(playlist);
  }, [playlist]);

  const handleClose = () => {
    setNewPlaylist(null);
    onClose(false);
  };

  return (
    <SpotiModal
      title="Modifier une playlist"
      confirm="Modifier"
      show={show}
      onClose={() => handleClose()}>
      {!!newPlaylist ? (
        <div>
          <Label className="text-spotiblack">Nom de la playlist</Label>
          <TextInput
            type="text"
            placeholder="Nom de la playlist"
            className="mt-1"
            value={newPlaylist.name}
            onChange={e =>
              setNewPlaylist({...newPlaylist, name: e.target.value})
            }
          />

          {/* 
          <Table.HeadCell>Musiques</Table.HeadCell>
          <Table.HeadCell>Image (URL)</Table.HeadCell>
          <Table.HeadCell>Est un album</Table.HeadCell> */}
        </div>
      ) : (
        <></>
      )}
    </SpotiModal>
  );
};
