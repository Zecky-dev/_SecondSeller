import {getUser, updateUser} from '../services/userServices';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const firebaseConnection = firestore().collection('ChatRooms');

// İlan ID'si verilen ilan için daha önce bir oda oluşturulup oluşturulmadığını kontrol eden, oda oluşturulmamış ise oda oluşturan fonksiyon
const checkChatRoom = (advertisementID, senderID, advertisementOwnerID) => {
  return new Promise((resolve, reject) => {
    firebaseConnection
      .where('advertisementID', '==', advertisementID)
      .where('participantIDs', 'array-contains', senderID)
      .get()
      .then(async querySnapshot => {
        const rooms = querySnapshot.docs;
        let roomID;
        if (rooms.length === 0) {
          roomID = await createRoom(
            advertisementID,
            senderID,
            advertisementOwnerID,
          );
          resolve(roomID);
        } else {
          roomID = rooms[0].id;
          resolve(roomID);
        }
      })
      .catch(err => {
        console.log('ROOM_CHECK_ERROR', err);
        reject(null);
      });
  });
};

// Yeni sohbet oluşturma
const createRoom = async (advertisementID, userID, ownerID) => {
  return new Promise(async (resolve, reject) => {
    const participantIDs = [userID, ownerID];
    const roomID = uuid.v4();
    try {
      await firebaseConnection.doc(roomID).set({
        advertisementID,
        participantIDs,
        messages: [],
      });
      resolve(roomID);
    } catch (err) {
      console.log('CREATE_ROOM_ERROR', err);
      reject(err);
    }
  });
};

// Parametr olarak verilen ilan ID'sine sahip olan ilanları siler
const deleteRoom = async advertisementID => {
  const rooms = await firebaseConnection
    .where('advertisementID', '==', advertisementID)
    .get();
  const roomDocs = rooms.docs;
  if (roomDocs.length !== 0) {
    for (let room of roomDocs) {
      room.ref.delete();
    }
  }
};

// ID'si verilen sohbet odasının bilgilerini getirir
// Anlık takip yok sadece çağırdığımız zaman getiriyor
const getRoomDataById = async roomID => {
  try {
    const roomDocs = await firebaseConnection
      .where(firestore.FieldPath.documentId(), '==', roomID)
      .get();

    if (!roomDocs.empty) {
      const roomData = roomDocs.docs[0].data(); // Düzeltme yapıldı
      return roomData;
    } else {
      throw Error(`Couldn't get any room by ${roomID} id.`);
    }
  } catch (err) {
    console.log('getRoomDataById error', err);
    throw err;
  }
};

// Mesaj oluşturma
const createMessage = async (roomID, messageDetails) => {
  try {
    await firebaseConnection.doc(roomID).update({
      messages: firestore.FieldValue.arrayUnion(messageDetails),
    });
    console.log('MESSAGE_CREATION_SUCCESS');
  } catch (err) {
    console.log('MESSAGE_CREATION_ERROR', err);
  }
};

// Mesaj silme
const removeMessage = async (roomID, messageDetails) => {
  try {
    await firebaseConnection.doc(roomID).update({
      messages: firestore.FieldValue.arrayRemove(messageDetails),
    });
    console.log('MESSAGE_DELETION_SUCCESS');
  } catch (err) {
    console.log('MESSAGE_CREATION_ERROR', err);
  }
};

// Katılımcı olarak bulunulan odaları ve o odanın hangi ilanla ilgili olduğunu içeren bir obje dizisi döndürür
const getMyRooms = async userID => {
  return new Promise((resolve, reject) => {
    firebaseConnection
      .where('participantIDs', 'array-contains', userID)
      .get()
      .then(querySnapshot => {
        const docs = querySnapshot.docs;
        const ids = docs.map(doc => ({
          advertisementID: doc.data().advertisementID,
          roomID: doc.id,
          messageCount: doc.data().messages.length,
          participantIDs: doc.data().participantIDs.filter(id => id !== userID),
        }));
        resolve(ids);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// addMessage, deleteMessage, clearMessages

export {
  checkChatRoom,
  getRoomDataById,
  createMessage,
  getMyRooms,
  removeMessage,
  deleteRoom,
};
