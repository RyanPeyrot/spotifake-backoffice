import {Button, Checkbox, Table, TextInput} from 'flowbite-react';
import {useEffect, useState} from 'react';
import axiosService from '../../services/axios-service';
import {useToastService} from '../../services/toast-service';
import {PencilIcon} from '@heroicons/react/24/solid';
import {EditArtistModal} from './editArtistModal';

export const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [editArtistModalState, setEditArtistModalState] = useState(false);
  const [addArtistModalState, setAddArtistModalState] = useState(false);
  const [deleteArtistModalState, setDeleteArtistModalState] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
          id: Math.random(),
        });
      });
  };

  useEffect(() => {
    getArtists();
  }, [searchTerm]);

  useEffect(() => {
    const filteredArtists = artists.filter(artist =>
      artist.tag.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredArtists(filteredArtists);
  }, [artists]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Liste des artistes</h1>

        <div className="flex gap-4">
          <TextInput
            type="text"
            placeholder="Rechercher une playlist (par ID, nom, créateur ou musique)"
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

      <EditArtistModal
        show={editArtistModalState}
        onClose={setEditArtistModalState}
        artist={selectedArtist}
      />
    </div>
  );
};
