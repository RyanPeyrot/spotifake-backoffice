import {Button, Label, TextInput} from 'flowbite-react';
import {useState} from 'react';
import {useToastService} from '../../services/toast-service';
import {useNavigate} from 'react-router-dom';
import {useConfettisService} from '../../services/confettis-service';

export const LoginPage = () => {
  const [form, setForm] = useState({
    email: 'mail@mail.com',
    password: 'mdp',
  });

  const navigate = useNavigate();

  const handleFormChange = (key, event) => {
    setForm({...form, [key]: event.target.value});
  };

  const {addToast} = useToastService();
  const {throwConfettis} = useConfettisService();

  const handleSubmit = event => {
    event.preventDefault();

    if (!form.email || !form.password) {
      addToast({
        type: 'error',
        message: 'Veuillez remplir tous les champs',
      });

      return;
    }

    addToast({
      type: 'success',
      message: 'Vous êtes connecté',
    });

    throwConfettis();

    navigate('/home');
  };

  return (
    <div id="login" className="absolute left-1/2 -translate-x-1/2 top-20 w-1/2">
      <form
        className="flex max-w-md flex-col gap-4 mx-auto pt-20"
        onSubmit={handleSubmit}>
        <div>
          <img
            className="mx-auto h-20 w-auto"
            src="/assets/logo/spotify.png"
            alt="Spotifake"
          />

          <div className="mt-10 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            value={form.email}
            onChange={event => handleFormChange('email', event)}
            id="email"
            type="text"
            placeholder="email@mail.com"
          />
        </div>
        <div>
          <div className="mt-2 block">
            <Label htmlFor="password" value="Mot de passe" />
          </div>
          <TextInput
            value={form.password}
            onChange={event => handleFormChange('password', event)}
            id="password"
            type="password"
            placeholder="Mot de passe"
          />
        </div>

        <Button className="mt-4" type="submit">
          Se connecter
        </Button>
      </form>
    </div>
  );
};
