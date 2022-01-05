import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth, { db } from './firebase';
import Chat from './Chat';
import { addDoc, collection } from 'firebase/firestore';
import './style.css';
import React from 'react';
import {
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  VStack,
  Tooltip,
  Input,
} from '@chakra-ui/react';
import GoogleButton from 'react-google-button';

const login = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
const logout = () => {
  signOut(auth);
};

export default function App() {
  const [text, setText] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, loading, error] = useAuthState(auth);

  const handleMessages = event => {
    if (event.key === 'Enter') {
      addMessages();
    }
  };

  const addMessages = async () => {
    setText('');
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        content: text,
        senderName: auth.currentUser.displayName,
        senderId: auth.currentUser.uid,
        photoURL: auth.currentUser.photoURL,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  if (loading) {
    return (
      <div>
        <h2>Initialising User...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <Tooltip label={`Open Profile`}>
          <Avatar
            onClick={onOpen}
            className="user__avatar"
            name={user.displayName}
            src={user.photoURL}
          />
        </Tooltip>
        <Modal isOpen={isOpen} size={['lg']} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Your Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <Tooltip label={`${user.displayName} avatar`}>
                  <Avatar
                    size="lg"
                    name={user.displayName}
                    src={user.photoURL}
                  />
                </Tooltip>
                <h3>Name: {user.displayName}</h3>
                <h3>Email: {user.email}</h3>
                <h3>User ID: {user.uid}</h3>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button onClick={logout} mr={3} colorScheme="blue">
                Log out
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Chat />
        <Input
          className="input"
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
          onKeyDown={handleMessages}
          placeholder="Enter a message"
        />
      </div>
    );
  }
  return <GoogleButton onClick={login} type="dark" />;
}
