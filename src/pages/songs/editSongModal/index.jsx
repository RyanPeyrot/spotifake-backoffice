import {Label, TextInput} from 'flowbite-react';
import {SpotiModal} from '../../../components/modal';
import {useEffect, useState} from 'react';
import {SelectMultiple} from '../../../components/selectMultiple';

export const EditSongModal = ({show, onClose, song}) => {
  const [newSong, setNewSong] = useState(song);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setNewSong(song);
  }, [song]);

  const handleClose = () => {
    setNewSong(null);
    onClose(false);
  };

  return (
    <SpotiModal
      title="Modifier une musique"
      confirm="Modifier"
      show={show}
      onClose={() => handleClose()}>
      {!!newSong ? (
        <div>
          <Label className="text-spotiblack">Nom de la musique</Label>
          <TextInput
            type="text"
            placeholder="Nom de la musique"
            className="mt-1"
            value={newSong.name}
            onChange={e => setNewSong({...newSong, name: e.target.value})}
          />

          <SelectMultiple id="countries" options={songs} />

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
