import {Button, Checkbox, Pagination, Table, TextInput} from 'flowbite-react';
import {useEffect, useState} from 'react';
import axiosService from '../../services/axios-service';
import {useToastService} from '../../services/toast-service';
import {PencilIcon} from '@heroicons/react/24/solid';
import {EditArtistModal} from './editArtistModal';
import {AddArtistModal} from './addArtistModal';
import {DeleteArtistModal} from './deleteArtistModal';

export const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [editArtistModalState, setEditArtistModalState] = useState(false);
  const [addArtistModalState, setAddArtistModalState] = useState(false);
  const [deleteArtistModalState, setDeleteArtistModalState] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const {addToast} = useToastService();

  const handleSelectAll = () => {
    if (selectedArtists.length === artists.length) {
      setSelectedArtists([]);
    } else {
      setSelectedArtists(artists.map(artist => artist._id));
    }
  };

  const handleSelect = artistId => {
    if (selectedArtists.includes(artistId)) {
      setSelectedArtists(selectedArtists.filter(id => id !== artistId));
    } else {
      setSelectedArtists([...selectedArtists, artistId]);
    }
  };

  const handleEditArtist = artist => {
    setSelectedArtist(artist);
    setEditArtistModalState(true);
  };

  const handleEditModalClose = success => {
    setEditArtistModalState(false);

    if (success) {
      getArtists();
    }
  };

  const handleAddModalClose = success => {
    setAddArtistModalState(false);

    if (success) {
      getArtists();
    }
  };

  const handleDeleteModalClose = success => {
    setDeleteArtistModalState(false);

    if (success) {
      setSelectedArtists([]);
      getArtists();
    }
  };

  const getArtists = () => {
    axiosService
      .get('/artists')
      .then(({data}) => {
        const newArtists = data.map(artist => ({
          ...artist,
          tag: Object.values(artist).join(','),
        }));

        setArtists(newArtists);
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

  const onPageChange = page => setCurrentPage(page);

  useEffect(() => {
    getArtists();
  }, []);

  useEffect(() => {
    getAlbums();
  }, []);

  useEffect(() => {
    const filteredArtists = artists
      .filter(song => song.tag.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice((currentPage - 1) * 10, currentPage * 10);

    setFilteredArtists(filteredArtists);
  }, [artists, searchTerm, currentPage]);

  return (
    <div id="artists">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Liste des artistes</h1>

        <div className="flex gap-4">
          <TextInput
            type="text"
            placeholder="Rechercher un artiste"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <Button onClick={() => setAddArtistModalState(true)}>Ajouter</Button>

          <Button
            disabled={selectedArtists.length == 0}
            onClick={() => setDeleteArtistModalState(true)}>
            Supprimer
          </Button>
        </div>
      </div>

      <Table className="mt-6 min-w-full">
        <Table.Head>
          <Table.HeadCell className="text-center">
            <Checkbox
              onChange={() => handleSelectAll()}
              checked={selectedArtists.length === artists.length}></Checkbox>
          </Table.HeadCell>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Nom</Table.HeadCell>
          <Table.HeadCell>Albums</Table.HeadCell>
          <Table.HeadCell>Image (URL)</Table.HeadCell>
          <Table.HeadCell>Éditer</Table.HeadCell>
        </Table.Head>

        <Table.Body>
          {filteredArtists.map(artist => (
            <Table.Row key={artist._id}>
              <Table.Cell>
                <Checkbox
                  checked={selectedArtists.includes(artist._id)}
                  onChange={() => handleSelect(artist._id)}></Checkbox>
              </Table.Cell>
              <Table.Cell className="font-semibold">{artist._id}</Table.Cell>
              <Table.Cell>{artist.name}</Table.Cell>
              <Table.Cell>{artist.albums.length}</Table.Cell>
              <Table.Cell>
                {artist.thumbnail ? (
                  <a
                    href={artist.thumbnail}
                    target="_blank"
                    className="text-spotigreen">
                    <img
                      className="h-12 w-12"
                      src={artist.thumbnail}
                      alt="Artist profile picture"
                    />
                  </a>
                ) : (
                  '-'
                )}
              </Table.Cell>
              <Table.Cell>
                <PencilIcon
                  className="w-4 h-4 cursor-pointer text-spotigreen"
                  onClick={() => handleEditArtist(artist)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {artists.length > 10 && (
        <div className="flex overflow-x-auto sm:justify-center mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(artists.length / 10)}
            onPageChange={onPageChange}
            showIcons={true}
            previousLabel="Précédent"
            nextLabel="Suivant"
          />
        </div>
      )}

      <EditArtistModal
        show={editArtistModalState}
        albums={albums}
        onClose={success => handleEditModalClose(success)}
        artist={selectedArtist}
      />

      <AddArtistModal
        show={addArtistModalState}
        albums={albums}
        onClose={success => handleAddModalClose(success)}
      />

      <DeleteArtistModal
        show={deleteArtistModalState}
        artists={selectedArtists}
        onClose={success => handleDeleteModalClose(success)}
      />
    </div>
  );
};
