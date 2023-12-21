import {Checkbox, FileInput, Label, TextInput} from 'flowbite-react';
import {SpotiModal} from '../../../components/modal';
import {useEffect, useState} from 'react';
import axiosService from '../../../services/axios-service';
import Select from 'react-tailwindcss-select';
import {useToastService} from '../../../services/toast-service';

export const AddPlaylistModal = ({show, onClose, songs, artists}) => {
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    creator: null,
    medias: [],
    isAlbum: false,
  });
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const {addToast} = useToastService();

  useEffect(() => {
    setNewPlaylist({
      name: '',
      creator: null,
      medias: [],
      isAlbum: false,
    });
    setLoading(false);
    setThumbnail(null);
  }, [show]);

  const handleClose = (success = false) => {
    setNewPlaylist({
      name: '',
      creator: null,
      medias: [],
      isAlbum: false,
    });
    setLoading(false);
    setThumbnail(null);
    onClose(success);
  };

  const handleSubmit = () => {
    setLoading(true);

    axiosService
      .post(`/playlists`, {
        name: newPlaylist.name,
        creator: newPlaylist.creator.label,
        medias: newPlaylist.medias?.map(media => media.value),
        isAlbum: newPlaylist.isAlbum,
        createdAt: new Date(),
      })
      .then(({data}) => {
        if (typeof thumbnail == 'string') {
          handleClose(true);
          addToast({
            title: 'Succès',
            message: 'La playlist/album a été créée avec succès',
            type: 'success',
          });
          return;
        } else {
          handleUploadThumbnail(data).then(() => {
            addToast({
              title: 'Succès',
              message: 'La playlist/album a été créée avec succès',
              type: 'success',
            });
            handleClose(true);
          });
        }
      })
      .catch(error => {
        console.error(error);
        setLoading(false);

        addToast({
          title: 'Erreur',
          message: 'Impossible de modifier la playlist/album',
          type: 'error',
        });
      });
  };

  const handleUploadThumbnail = async playlist => {
    try {
      const formData = new FormData();
      formData.append('file', thumbnail);

      await axiosService.put(`/playlists/thumbnail/${playlist._id}`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SpotiModal
      title="Créer une playlist/album"
      confirm="Créer"
      show={show}
      onClose={() => handleClose()}
      onSubmit={() => handleSubmit()}
      loading={loading}>
      <div className="min-h-[50vh]">
        <div className="mb-4">
          <Label className="text-spotiblack">Nom de la playlist/album</Label>
          <TextInput
            type="text"
            placeholder="Nom de la playlist/album"
            className="mt-1"
            value={newPlaylist.name}
            onChange={e =>
              setNewPlaylist({...newPlaylist, name: e.target.value})
            }
          />
        </div>

        <div className="mb-4">
          <Label className="text-spotiblack">Image de la playlist/album</Label>
          <FileInput
            placeholder="Lien de l'image de la playlist/album"
            className="mt-1"
            onChange={e => setThumbnail(e.target.files[0])}
          />

          {thumbnail && (
            <img
              className="mt-2 h-20 w-20"
              src={
                typeof thumbnail == 'string'
                  ? thumbnail
                  : URL.createObjectURL(thumbnail)
              }
            />
          )}
        </div>

        <div className="mb-4">
          <Label className="text-spotiblack">Créateur</Label>
          <Select
            isSearchable={true}
            isClearable={true}
            placeholder="Créateur de la playlist/album"
            className="mt-1"
            value={newPlaylist.creator}
            onChange={e =>
              setNewPlaylist({
                ...newPlaylist,
                creator: e,
              })
            }
            options={artists || []}
          />
        </div>

        <div className="mb-4">
          <Label className="text-spotiblack">Musiques</Label>
          <Select
            placeholder="Musiques de la playlist/album"
            className="mt-1"
            isSearchable={true}
            isClearable={true}
            isMultiple={true}
            value={newPlaylist.medias || []}
            onChange={e => {
              console.log(e);
              setNewPlaylist({
                ...newPlaylist,
                medias: e,
              });
            }}
            options={songs || []}
          />
        </div>

        <div className="mb-4 flex">
          <Checkbox
            className="mr-2 block"
            checked={newPlaylist.isAlbum}
            onChange={e =>
              setNewPlaylist({
                ...newPlaylist,
                isAlbum: e.target.checked,
              })
            }
          />
          <Label className="text-spotiblack">Est un album ?</Label>
        </div>
      </div>
    </SpotiModal>
  );
};
