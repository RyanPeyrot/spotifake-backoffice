import {FileInput, Label, TextInput} from 'flowbite-react';
import {SpotiModal} from '../../../components/modal';
import {useState} from 'react';
import axiosService from '../../../services/axios-service';
import Select from 'react-tailwindcss-select';
import {useToastService} from '../../../services/toast-service';

export const AddArtistModal = ({show, onClose, albums}) => {
  const [artist, setArtist] = useState({
    name: '',
    albums: [],
  });
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const {addToast} = useToastService();

  const handleClose = (success = false) => {
    setArtist({
      name: '',
      albums: [],
    });
    setLoading(false);
    setThumbnail(null);
    onClose(success);
  };

  const handleSubmit = () => {
    setLoading(true);

    axiosService
      .post(`/artists`, artist)
      .then(({data}) => {
        if (!thumbnail) {
          handleClose(true);
          addToast({
            title: 'Succès',
            message: 'Artiste ajouté avec succès',
            type: 'success',
          });
          return;
        } else {
          handleUploadThumbnail(data._id).then(() => {
            handleClose(true);
            addToast({
              title: 'Succès',
              message: 'Artiste ajouté avec succès',
              type: 'success',
            });
          });
        }
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        addToast({
          type: 'error',
          message: "Une erreur est survenue lors de la création de l'artiste",
          title: 'Erreur',
        });
      });
  };

  const handleUploadThumbnail = async artistId => {
    try {
      const formData = new FormData();
      formData.append('file', thumbnail);

      await axiosService.put(`/artists/thumbnail/${artistId}`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SpotiModal
      title="Ajouter un artiste"
      confirm="Ajouter"
      show={show}
      onClose={() => handleClose()}
      onSubmit={() => handleSubmit()}
      loading={loading}>
      <div className="min-h-[50vh]">
        <div className="mb-4">
          <Label className="text-spotiblack">Nom de l'artiste</Label>
          <TextInput
            type="text"
            placeholder="Nom de l'artiste"
            className="mt-1"
            value={artist.name}
            onChange={e => setArtist({...artist, name: e.target.value})}
          />
        </div>

        <div className="mb-4">
          <Label className="text-spotiblack">Image de l'artiste</Label>
          <FileInput
            placeholder="Lien de l'image de l'artiste"
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

        <div>
          <Label className="text-spotiblack">Albums</Label>
          <Select
            isMultiple={true}
            isSearchable={true}
            isClearable={true}
            placeholder="Albums de l'artiste"
            className="mt-1"
            value={artist.albums.map(album => ({
              value: album._id,
              label: album.name,
            }))}
            onChange={e =>
              setArtist({
                ...artist,
                albums: e.map(album => ({
                  ...album,
                  _id: album.value,
                  name: album.label,
                })),
              })
            }
            options={albums || []}
          />
        </div>
      </div>
    </SpotiModal>
  );
};
