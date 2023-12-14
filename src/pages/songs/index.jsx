import {Checkbox, Table} from 'flowbite-react';
import {useEffect, useState} from 'react';
import axiosService from '../../services/axios-service';
import {useToastService} from '../../services/toast-service';
import {PencilIcon, ArrowTopRightOnSquareIcon} from '@heroicons/react/24/solid';
import {AddSongModal} from './addSongModal';
import {EditSongModal} from './editSongModal';

export const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addSongModalState, setAddSongModalState] = useState(false);
  const [editSongModalState, setEditSongModalState] = useState(false);

  const {addToast} = useToastService();

  const handleSelectAll = () => {
    if (selectedSongs.length === songs.length) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs(songs.map(song => song.id));
    }
  };

  const handleSelect = songId => {
    if (selectedSongs.includes(songId)) {
      setSelectedSongs(selectedSongs.filter(id => id !== songId));
    } else {
      setSelectedSongs([...selectedSongs, songId]);
    }
  };

  const handleEditSong = song => {
    setSelectedSong(song);
    setEditSongModalState(true);
  };

  const getSongs = () => {
    axiosService
      .get('/medias')
      .then(({data}) => {
        const newSongs = data.map(song => ({
          ...song,
          tag: Object.values(song).join(','),
        }));

        setSongs(newSongs);
      })
      .catch(error => {
        console.error(error);

        addToast({
          type: 'error',
          title: 'Erreur',
          message:
            'Une erreur est survenue lors de la récupération des musiques',
        });
      });
  };

  useEffect(() => {
    getSongs();
  }, [searchTerm]);

  const filteredSongs = songs.filter(song =>
    song.tag.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div id="songs">
      <h1 className="text-2xl mb-5 font-semibold">Liste des musiques</h1>

      <input
        type="text"
        placeholder="Rechercher une musique (par ID, nom, artiste, album, date de sortie ou référence)"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-2/3 p-2 border border-gray-300 text-spotiblack rounded"
      />

      <Table className="mt-6">
        <Table.Head>
          <Table.HeadCell className="text-center">
            <Checkbox
              checked={selectedSongs?.length === songs?.length}
              onChange={() => handleSelectAll()}></Checkbox>
          </Table.HeadCell>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Nom</Table.HeadCell>
          <Table.HeadCell>Artistes</Table.HeadCell>
          <Table.HeadCell>Genre</Table.HeadCell>
          <Table.HeadCell>Ajoutée le</Table.HeadCell>
          <Table.HeadCell>Lien de la musique</Table.HeadCell>
        </Table.Head>

        <Table.Body>
          {filteredSongs.map(song => (
            <Table.Row key={song.id}>
              <Table.Cell>
                <Checkbox
                  checked={selectedSongs.includes(song.id)}
                  onChange={() => handleSelect(song.id)}></Checkbox>
              </Table.Cell>
              <Table.Cell className="font-semibold">{song._id}</Table.Cell>
              <Table.Cell>{song.title}</Table.Cell>
              <Table.Cell>
                {song.artist.length == 0
                  ? '-'
                  : song.artist.map(a => {
                      return a.name;
                    })}
              </Table.Cell>
              <Table.Cell>{song.genre?.join(', ')}</Table.Cell>
              <Table.Cell>
                {new Date(song.releaseDate).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <a
                  href={song.storage}
                  target="_blank"
                  className="text-spotigreen">
                  <ArrowTopRightOnSquareIcon className="w-6 h-6"></ArrowTopRightOnSquareIcon>
                </a>
              </Table.Cell>
              <Table.Cell>
                <PencilIcon
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleEditSong(song)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <AddSongModal show={addSongModalState} onClose={setAddSongModalState} />

      <EditSongModal
        show={editSongModalState}
        onClose={setEditSongModalState}
        song={selectedSong}
      />
    </div>
  );
};
