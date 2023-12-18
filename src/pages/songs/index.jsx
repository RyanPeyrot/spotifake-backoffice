import {Button, Checkbox, Pagination, Table, TextInput} from 'flowbite-react';
import {useEffect, useState} from 'react';
import axiosService from '../../services/axios-service';
import {useToastService} from '../../services/toast-service';
import {ArrowTopRightOnSquareIcon, PencilIcon} from '@heroicons/react/24/solid';
import {EditSongModal} from './editSongModal';
import {AddSongModal} from './addSongModal';
import {DeleteSongModal} from './deleteSongModal';

export const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [editSongModalState, setEditSongModalState] = useState(false);
  const [addSongModalState, setAddSongModalState] = useState(false);
  const [deleteSongModalState, setDeleteSongModalState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const {addToast} = useToastService();

  const handleSelectAll = () => {
    if (selectedSongs.length === songs.length) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs(songs.map(song => song._id));
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

  const handleEditModalClose = success => {
    setEditSongModalState(false);

    if (success) {
      getSongs();
    }
  };

  const handleAddModalClose = success => {
    setAddSongModalState(false);

    if (success) {
      getSongs();
    }
  };

  const handleDeleteModalClose = success => {
    setDeleteSongModalState(false);

    if (success) {
      setSelectedSongs([]);
      getSongs();
    }
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
          title: 'Erreur',
          message: "Impossible d'obtenir la liste des musiques",
          type: 'error',
        });
      });
  };

  const getAlbums = () => {
    axiosService
      .get('/playlists')
      .then(({data}) => {
        const onlyAlbums = data
          .filter(playlist => playlist.isAlbum)
          .map(album => ({
            value: album._id,
            label: album.name,
          }));

        setAlbums(onlyAlbums);
      })
      .catch(error => {
        console.error(error);

        addToast({
          title: 'Erreur',
          message: "Impossible d'obtenir la liste des albums",
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

  const onPageChange = page => setCurrentPage(page);

  useEffect(() => {
    getSongs();
    getAlbums();
    getArtists();
  }, []);

  useEffect(() => {
    const filteredSongs = songs
      .filter(song => song.tag.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice((currentPage - 1) * 10, currentPage * 10);

    setFilteredSongs(filteredSongs);
  }, [songs, searchTerm, currentPage]);

  return (
    <div id="songs">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Liste des musiques</h1>

        <div className="flex gap-4">
          <TextInput
            type="text"
            placeholder="Rechercher une musique"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <Button onClick={() => setAddSongModalState(true)}>Ajouter</Button>

          <Button
            disabled={selectedSongs.length == 0}
            onClick={() => setDeleteSongModalState(true)}>
            Supprimer
          </Button>
        </div>
      </div>

      <Table className="mt-6 min-w-full">
        <Table.Head>
          <Table.HeadCell className="text-center">
            <Checkbox
              checked={selectedSongs?.length === songs?.length}
              onChange={() => handleSelectAll()}></Checkbox>
          </Table.HeadCell>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Nom</Table.HeadCell>
          <Table.HeadCell>Artiste</Table.HeadCell>
          <Table.HeadCell>Album</Table.HeadCell>
          <Table.HeadCell>Genre</Table.HeadCell>
          <Table.HeadCell>Ajoutée le</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Lien de la musique</Table.HeadCell>
          <Table.HeadCell>Éditer</Table.HeadCell>
        </Table.Head>

        <Table.Body>
          {filteredSongs.map(song => (
            <Table.Row key={song._id}>
              <Table.Cell>
                <Checkbox
                  checked={selectedSongs.includes(song._id)}
                  onChange={() => handleSelect(song._id)}></Checkbox>
              </Table.Cell>
              <Table.Cell className="font-semibold">{song._id}</Table.Cell>
              <Table.Cell>{song.title || '-'}</Table.Cell>
              <Table.Cell>
                {song.artist?.length == 0
                  ? '-'
                  : song.artist.map(a => {
                      return a.name;
                    })}
              </Table.Cell>
              <Table.Cell>{song.album?.name || '-'}</Table.Cell>
              <Table.Cell>{song.genre?.join(', ')}</Table.Cell>
              <Table.Cell>
                {new Date(song.releaseDate).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                {song.thumbnail ? (
                  <a
                    href={song.thumbnail}
                    target="_blank"
                    className="text-spotigreen">
                    <img
                      className="h-12 w-12"
                      src={song.thumbnail}
                      alt="Song thumbnail"
                    />
                  </a>
                ) : (
                  '-'
                )}
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
                  className="w-4 h-4 cursor-pointer text-spotigreen"
                  onClick={() => handleEditSong(song)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {songs.length > 10 && (
        <div className="flex overflow-x-auto sm:justify-center mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(songs.length / 10)}
            onPageChange={onPageChange}
            showIcons={true}
            previousLabel="Précédent"
            nextLabel="Suivant"
          />
        </div>
      )}

      <EditSongModal
        show={editSongModalState}
        onClose={success => handleEditModalClose(success)}
        song={selectedSong}
        albums={albums}
        artists={artists}
      />

      <AddSongModal
        show={addSongModalState}
        albums={albums}
        artists={artists}
        onClose={success => handleAddModalClose(success)}
      />

      <DeleteSongModal
        show={deleteSongModalState}
        songs={selectedSongs}
        onClose={success => handleDeleteModalClose(success)}
      />
    </div>
  );
};
