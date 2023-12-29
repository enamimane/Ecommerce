import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonContext from '../../contexts/common/commonContext';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';
import AuthService from './ServicesConnexionInscription/auth.service';

/*const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est requis !
      </div>
    );
  }
};
*/
const Login = () => {
  const { setLoggedIn } = useContext(commonContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    adresse: '',
    pays: '',
    ville: '',
    codePostale: '',
    role: ['user'],
  });

  const history = useNavigate();
  const [showLoginLink, ] = useState(false);

  const handleSave = () => {
    axios
      .post('http://localhost:8080/api/auth/signup', user)
      .then(() => {
        console.log('Nouvel utilisateur ajouté avec succès');
        toast.success("Inscription réussie ! Vous pouvez maintenant vous connecter.");

        // Rediriger vers la page de connexion après quelques secondes
        setTimeout(() => {
          history('/login'); // Redirection vers la page de connexion
        }, 3000);

        // Réinitialiser les valeurs du formulaire après une inscription réussie
        setUser({
          nom: '',
          prenom: '',
          email: '',
          password: '',
          telephone: '',
          adresse: '',
          pays: '',
          ville: '',
          codePostale: '',
          role: ['user'],
        });
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
        toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
      });
  };

  const { isFormOpen, toggleForm } = useContext(commonContext);

  const formRef = useRef();

  useOutsideClose(formRef, () => {
    toggleForm(false);
  });

  useScrollDisable(isFormOpen);

  const [isSignupVisible, setIsSignupVisible] = useState(false);

  const handleIsSignupVisible = () => {
    setIsSignupVisible((prevState) => !prevState);
  };

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeemail = (e) => {
    const email = e.target.value;
    setemail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = () => {
    AuthService.login(email, password)
      .then((response) => {
        if (response) {
          const userRoles = response.roles;
  
          if (userRoles.includes('ROLE_USER')) {
            // Redirection for users to the main page
    
            window.location.reload();
          } else if (userRoles.includes('ROLE_ADMIN')) {
            // Redirection for administrators to the admin page
            navigate('/Admin');
            window.location.reload();
          }
  
          toast.success("Login successful! Welcome back!", {
            autoClose: 3000,
          });
  
          setLoggedIn(true);
        } else {
          toast.error("Error retrieving user information.");
        }
      })
      .catch(error => {
        console.error(error);
        toast.error("Login error. Please try again.", {
          autoClose: 3000,
        });
      });
  };
  

          

  return (
    <>
      {isFormOpen && (
        <div className="backdrop">
          <div className="modal_centered">
            <form id="account_form" ref={formRef}>
              <div className="form_head">
                <h2>{isSignupVisible ? 'Inscription' : 'Connexion'}</h2>
                <p className="custom-text">
                  {isSignupVisible ? 'Vous avez déjà un compte ?' : 'Nouveau sur SHOP ONLINE ?'}
                </p>
                &nbsp;&nbsp;
                <button type="button" onClick={handleIsSignupVisible}>
                  {isSignupVisible ? 'Connexion' : 'Créer un compte'}
                </button>
              </div>

              <div className="form_body">
                {isSignupVisible && (
                  <>
                    <div className="input_box">
                      <label htmlFor="nom" className="input_label">Nom</label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        className="input_field"
                        value={user.nom}
                        onChange={(e) => setUser({ ...user, nom: e.target.value })}
                        required
                      />
                    </div>

                    <div className="input_box">
                      <label htmlFor="prenom" className="input_label">Prénom</label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        className="input_field"
                        value={user.prenom}
                        onChange={(e) => setUser({ ...user, prenom: e.target.value })}
                        required
                      />
                    </div>
                  </>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <label htmlFor="email" className="input_label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input_field"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      required
                    />
                  </div>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <label htmlFor="adresse" className="input_label">Adresse</label>
                    <input
                      type="text"
                      id="adresse"
                      name="adresse"
                      className="input_field"
                      value={user.adresse}
                      onChange={(e) => setUser({ ...user, adresse: e.target.value })}
                      required
                    />
                  </div>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <label htmlFor="telephone" className="input_label">Téléphone</label>
                    <input
                      type="number"
                      id="telephone"
                      name="telephone"
                      className="input_field"
                      value={user.telephone}
                      onChange={(e) => setUser({ ...user, telephone: e.target.value })}
                      minLength="10"
                      maxLength="10"
                      required
                    />
                  </div>
                )}
                {isSignupVisible && (
                  <div className="input_box">
                    <label htmlFor="pays" className="input_label">Pays</label>
                    <input
                      type="text"
                      id="pays"
                      name="pays"
                      className="input_field"
                      value={user.pays}
                      onChange={(e) => setUser({ ...user, pays: e.target.value })}
                      required
                    />
                  </div>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <label htmlFor="ville" className="input_label">Ville</label>
                    <input
                      type="text"
                      id="ville"
                      name="ville"
                      className="input_field"
                      value={user.ville}
                      onChange={(e) => setUser({ ...user, ville: e.target.value })}
                      required
                    />
                  </div>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <label htmlFor="codePostale" className="input_label">Code Postal</label>
                    <input
                      type="number"
                      id="codePostale"
                      name="codePostale"
                      className="input_field"
                      value={user.codePostale}
                      onChange={(e) => setUser({ ...user, codePostale: e.target.value })}
                      required
                    />
                  </div>
                )}

                {isSignupVisible && (
                  <div className="input_box">
                    <label htmlFor="password" className="input_label">Mot de Passe</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="input_field"
                      value={user.password}
                      required
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                  </div>
                )}

                {!isSignupVisible && (
                  <div className="input_box">
                    <label htmlFor="email" className="input_label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input_field"
                      value={email}
                      onChange={onChangeemail}
                      required
                    />
                  </div>
                )}

                {!isSignupVisible && (
                  <div className="input_box">
                    <label htmlFor="password" className="input_label">Mot de Passe</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="input_field"
                      value={password}
                      required
                      onChange={onChangePassword}
                    />
                  </div>
                )}

                <button
                  type="button"
                  className="btn login_btn"
                  onClick={() => {
                    if (isSignupVisible) {
                      handleSave();
                    } else {
                      handleLogin();
                    }
                  }}
                >
                  {isSignupVisible ? 'Inscription' : 'Connexion'}
                </button>

                {showLoginLink && (
                  <div className="alert alert-success" role="alert">
                    Vous pouvez maintenant vous connecter.
                  </div>
                )}
              </div>

              <div
                className="close_btn"
                title="Fermer"
                onClick={() => toggleForm(false)}
              >
                &times;
              </div>

              {/* Ajoutez le composant ToastContainer à la fin du formulaire */}
              <ToastContainer />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
