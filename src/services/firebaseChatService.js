import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const firebaseConnection = firestore().collection('rooms');

/* 
advertisementID: sohbet için kullanılacak ilan ID'si, userID mevcut kullanıcı ID'si
kullanıcı ID'si verilen kişi daha önce bir sohbet başlattıysa ilgili sohbeti getirir
ilan ait sohbet bulunamazsa yeni sohbet oluşturulur
*/
const checkRooms = (advertisementID, userID, ownerID) => {
  return new Promise((resolve, reject) => {
    firebaseConnection
      .where('advertisementID', '==', advertisementID)
      .where('usersIDs', 'array-contains', userID)
      .get()
      .then(querySnapshot => {
        const docs = querySnapshot.docs;

        if (docs.length === 0) {
          createRoom(advertisementID, userID, ownerID)
            .then(roomID => {
              if (roomID) resolve(roomID);
              else reject('Room creation failed');
            })
            .catch(error => {
              reject(error);
            });
        } else if (docs.length == 1) {
          console.log(docs[0].id);
          resolve(docs[0].id);
        } else {
          const ids = docs.map(doc => doc.id);
          resolve(ids);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

// yeni sohbet oluşturma
const createRoom = async (advertisementID, userID, ownerID) => {
  // roomID değerini kullanıcılara ekle
  const roomID = uuid.v4();
  return new Promise((resolve, reject) => {
    try {
      const response = firebaseConnection.doc(roomID).set({
        advertisementID,
        usersIDs: [userID, ownerID],
        messages: [],
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const getMyRooms = async userID => {
  return new Promise((resolve, reject) => {
    firebaseConnection
      .where('usersIDs', 'array-contains', userID)
      .get()
      .then(querySnapshot => {
        const docs = querySnapshot.docs;
        const ids = docs.map(doc => ({
          advertisementID: doc.data().advertisementID,
          roomID: doc.id,
        }));
        resolve(ids);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// addMessage, deleteMessage, clearMessages

export {checkRooms, getMyRooms};
