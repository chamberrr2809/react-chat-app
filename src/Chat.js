import { useCollection } from 'react-firebase-hooks/firestore';
import auth, { db } from './firebase';
import './chat.css';
import React from 'react';
import { collection } from 'firebase/firestore';

export default function Chat() {
  const [value, loading, error] = useCollection(collection(db, 'users'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading messages from database</span>}
        {value && (
          <span>
            {value.docs.map(doc => (
              <React.Fragment key={doc.id}>
                <>
                  <div className={`message received`}>
                    <img
                      src={
                        doc.data().photoURL ||
                        'https://api.adorable.io/avatars/23/abott@adorable.png'
                      }
                    />
                    <p>{doc.data().content}</p>
                  </div>
                </>
              </React.Fragment>
            ))}
          </span>
        )}
      </p>
    </div>
  );
}
