import {Button, Checkbox, Pagination, Table, TextInput} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {PencilIcon} from '@heroicons/react/24/solid';
import {AddPlaylistModal} from './addPlaylistModal';
import {EditPlaylistModal} from './editPlaylistModal';
import {DeletePlaylistModal} from './deletePlaylistModal';
import axiosService from '../../services/axios-service';
import {useToastService} from '../../services/toast-service';

export const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editPlaylistModalState, setEditPlaylistModalState] = useState(false);
  const [addPlaylistModalState, setAddPlaylistModalState] = useState(false);
  const [deletePlaylistModalState, setDeletePlaylistModalState] =
    useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleEditPlaylist = playlist => {
    setSelectedPlaylist(playlist);
    setEditPlaylistModalState(true);
  };

  const handleEditModalClose = success => {
    setEditPlaylistModalState(false);

    if (success) {
      getPlaylists();
    }
  };

  const handleAddModalClose = success => {
    setAddPlaylistModalState(false);

    if (success) {
      getPlaylists();
    }
  };

  const handleDeleteModalClose = success => {
    setDeletePlaylistModalState(false);

    if (success) {
      setSelectedPlaylists([]);
      getPlaylists();
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

        addToast({
          title: 'Erreur',
          message: "Impossible d'obtenir la liste des playlists/albums",
          type: 'error',
        });
      });
  };

  const getArtists = () => {
    axiosService
      .get('/artists')
      .then(({data}) => {
        const onlyArtists = data.map(artist => ({
          value: artist._id,
          label: artist.name,
        }));

        setArtists(onlyArtists);
      })
      .catch(error => {
        console.error(error);

        addToast({
          title: 'Erreur',
          message: "Impossible d'obtenir la liste des artistes",
          type: 'error',
        });
      });
  };

  const getSongs = () => {
    axiosService
      .get('/medias')
      .then(({data}) => {
        const newSongs = data.map(song => ({
          value: song._id,
          label: song.title,
        }));

        setSongs(newSongs);
      })
      .catch(error => {
        console.error(error);

        addToast({
          title: 'Erreur',
          message: "Impossible d'obtenir la liste des musiques",
          type: 'error',
        });
      });
  };

  const onPageChange = page => setCurrentPage(page);

  useEffect(() => {
    getPlaylists();
    getArtists();
    getSongs();
  }, []);

  useEffect(() => {
    const filteredPlaylists = playlists
      .filter(playlist =>
        playlist.tag.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .slice((currentPage - 1) * 10, currentPage * 10);
    console.log(filteredPlaylists);

    setFilteredPlaylists(filteredPlaylists);
  }, [playlists, searchTerm, currentPage]);

  return (
    <div id="playlists">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Liste des albums/playlists</h1>

        <div className="flex gap-4">
          <TextInput
            type="text"
            placeholder="Rechercher une playlist"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <Button onClick={() => setAddPlaylistModalState(true)}>
            Ajouter
          </Button>

          <Button
            disabled={selectedPlaylists.length == 0}
            onClick={() => setDeletePlaylistModalState(true)}>
            Supprimer
          </Button>
        </div>
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
          <Table.HeadCell>Image</Table.HeadCell>
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
              <Table.Cell>{playlist.medias?.length || 0}</Table.Cell>
              <Table.Cell>
                {playlist.thumbnail ? (
                  <a
                    href={playlist.thumbnail}
                    target="_blank"
                    className="text-spotigreen">
                    <img
                      src={playlist.thumbnail}
                      className="h-12 w-12"
                      alt="Playlist thumbnail"
                    />
                  </a>
                ) : (
                  '-'
                )}
              </Table.Cell>
              <Table.Cell>
                <span
                  className={`px-3 py-2 rounded-full ${
                    playlist.isAlbum ? 'bg-green-200' : 'bg-red-200'
                  }`}>
                  {playlist.isAlbum ? 'Oui' : 'Non'}
                </span>
              </Table.Cell>
              <Table.Cell>
                <PencilIcon
                  className="w-4 h-4 cursor-pointer text-spotigreen"
                  onClick={() => handleEditPlaylist(playlist)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {playlists.length > 10 && (
        <div className="flex overflow-x-auto sm:justify-center mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(playlists.length / 10)}
            onPageChange={onPageChange}
            showIcons={true}
            previousLabel="Précédent"
            nextLabel="Suivant"
          />
        </div>
      )}

      <EditPlaylistModal
        show={editPlaylistModalState}
        onClose={success => handleEditModalClose(success)}
        playlist={selectedPlaylist}
        songs={songs}
        artists={artists}
      />

      <AddPlaylistModal
        show={addPlaylistModalState}
        songs={songs}
        artists={artists}
        onClose={success => handleAddModalClose(success)}
      />

      <DeletePlaylistModal
        show={deletePlaylistModalState}
        playlists={selectedPlaylists}
        onClose={success => handleDeleteModalClose(success)}
      />
    </div>
  );
};
