import {Button, Checkbox, Table, TextInput} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {PencilIcon} from '@heroicons/react/24/solid';
import {AddPlaylistModal} from './addPlaylistModal';
import {EditPlaylistModal} from './editPlaylistModal';
import axiosService from '../../services/axios-service';
import {useToastService} from '../../services/toast-service';

export const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addPlaylistModalState, setAddPlaylistModalState] = useState(false);
  const [editPlaylistModalState, setEditPlaylistModalState] = useState(false);
  const [deletePlaylistModalState, setDeletePlaylistModalState] =
    useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const {addToast} = useToastService();

  const handleSelectAll = () => {
    if (selectedPlaylists.length === playlists.length) {
      setSelectedPlaylists([]);
    } else {
      setSelectedPlaylists(playlists.map(playlist => playlist._id));
    }
  };

  const handleSelect = playlistId => {
    if (selectedPlaylists.includes(playlistId)) {
      setSelectedPlaylists(selectedPlaylists.filter(id => id !== playlistId));
    } else {
      setSelectedPlaylists([...selectedPlaylists, playlistId]);
    }
  };

  const getPlaylists = () => {
    axiosService
      .get('/playlists')
      .then(({data}) => {
        const newPlaylists = data.map(playlist => ({
          ...playlist,
          tag: Object.values(playlist).join(','),
        }));

        setPlaylists(newPlaylists);
      })
      .catch(error => {
        console.error(error);

        addToast({});
      });
  };

  useEffect(() => {
    getPlaylists();
  }, [searchTerm]);

  useEffect(() => {
    const filteredPlaylists = playlists.filter(playlist =>
      playlist.tag.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredPlaylists(filteredPlaylists);
  }, [playlists, searchTerm]);

  const handleEditPlaylist = playlist => {
    setSelectedPlaylist(playlist);
    setEditPlaylistModalState(true);
  };

  return (
    <div>
      <h1 className="text-2xl mb-5 font-semibold">Liste des playlists</h1>

      <div className="flex gap-4">
        <TextInput
          type="text"
          placeholder="Rechercher une playlist (par ID, nom, créateur ou musique)"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => setAddPlaylistModalState(true)}>Ajouter</Button>
        <Button
          disabled={selectedPlaylists.length == 0}
          onClick={() => setDeletePlaylistModalState(true)}>
          Supprimer
        </Button>
      </div>

      <Table className="mt-6">
        <Table.Head>
          <Table.HeadCell className="text-center">
            <Checkbox
              checked={selectedPlaylists.length === playlists.length}
              onChange={() => handleSelectAll()}></Checkbox>
          </Table.HeadCell>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Nom</Table.HeadCell>
          <Table.HeadCell>Créée le</Table.HeadCell>
          <Table.HeadCell>Créée par</Table.HeadCell>
          <Table.HeadCell>Musiques</Table.HeadCell>
          <Table.HeadCell>Image (URL)</Table.HeadCell>
          <Table.HeadCell>Est un album</Table.HeadCell>
          <Table.HeadCell>Modifier</Table.HeadCell>
        </Table.Head>

        <Table.Body>
          {filteredPlaylists.map(playlist => (
            <Table.Row key={playlist._id}>
              <Table.Cell>
                <Checkbox
                  checked={selectedPlaylists.includes(playlist._id)}
                  onChange={() => handleSelect(playlist._id)}></Checkbox>
              </Table.Cell>
              <Table.Cell>
                <span className="font-semibold">{playlist._id || '-'}</span>
              </Table.Cell>
              <Table.Cell>{playlist.name || '-'}</Table.Cell>
              <Table.Cell>
                {new Date(playlist.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>{playlist.creator || '-'}</Table.Cell>
              <Table.Cell>{playlist.songs?.length || '-'}</Table.Cell>
              <Table.Cell>
                {playlist.image ? (
                  <a
                    href={playlist.image}
                    target="_blank"
                    className="text-spotigreen">
                    {playlist.image}
                  </a>
                ) : (
                  '-'
                )}
              </Table.Cell>
              <Table.Cell>
                <span
                  className={`px-3 py-2 rounded-full ${
                    playlist.is_album ? 'bg-green-200' : 'bg-red-200'
                  }`}>
                  {playlist.is_album ? 'Oui' : 'Non'}
                </span>
              </Table.Cell>
              <Table.Cell>
                <PencilIcon
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleEditPlaylist(playlist)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <AddPlaylistModal
        show={addPlaylistModalState}
        onClose={setAddPlaylistModalState}
      />

      <EditPlaylistModal
        show={editPlaylistModalState}
        onClose={setEditPlaylistModalState}
        playlist={selectedPlaylist}
      />
    </div>
  );
};
