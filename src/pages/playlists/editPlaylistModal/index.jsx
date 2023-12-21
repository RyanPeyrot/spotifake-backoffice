import {Checkbox, FileInput, Label, TextInput} from 'flowbite-react';
import {SpotiModal} from '../../../components/modal';
import {useEffect, useState} from 'react';
import axiosService from '../../../services/axios-service';
import Select from 'react-tailwindcss-select';
import {useToastService} from '../../../services/toast-service';

export const EditPlaylistModal = ({
  show,
  onClose,
  playlist,
  songs,
  artists,
}) => {
  const [newPlaylist, setNewPlaylist] = useState(playlist);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const {addToast} = useToastService();

  useEffect(() => {
    setThumbnail(playlist?.thumbnail);
    setNewPlaylist({
      ...playlist,
      medias: playlist.medias.map(media => ({
        label: media.title,
        value: media._id,
      })),
    });
  }, [show]);

  const handleClose = (success = false) => {
    setNewPlaylist(null);
    setLoading(false);
    setThumbnail(null);
    onClose(success);
  };

  const handleSubmit = () => {
    setLoading(true);
    console.log(newPlaylist);
    axiosService
      .put(`/playlists/${newPlaylist._id}`, {
        name: newPlaylist.name,
        creator: newPlaylist.creator.label,
        medias: newPlaylist.medias.map(media => media.value),
        isAlbum: newPlaylist.isAlbum,
      })
      .then(({data}) => {
        if (typeof thumbnail == 'string') {
          handleClose(true);
          return;
        } else {
          handleUploadThumbnail().then(() => {
            handleClose(true);
          });
        }
      })
      .catch(error => {
        console.error(error);

        addToast({
          title: 'Erreur',
          message: 'Impossible de modifier la playlist/album',
          type: 'error',
        });
      });
  };

  const handleUploadThumbnail = async () => {
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
      title="Modifier une playlist/album"
      confirm="Modifier"
      show={show}
      onClose={() => handleClose()}
      onSubmit={() => handleSubmit()}
      loading={loading}>
      {!!newPlaylist ? (
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
            <Label className="text-spotiblack">
              Image de la playlist/album
            </Label>
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
              value={newPlaylist.medias}
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
      ) : (
        <></>
      )}
    </SpotiModal>
  );
};
