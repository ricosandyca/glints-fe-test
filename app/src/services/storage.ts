import firebase from 'firebase/compat/app';
import { v4 as uuidv4 } from 'uuid';

const storage = firebase.storage();

export function getUserdataStoragePath(userId: string, fileName: string) {
  // get file extension
  const extension = fileName.split('.').pop();
  return `/users/${userId}/${uuidv4()}.${extension}`;
}

export function uploadFile(
  path: string,
  file: File,
  cbs: {
    onProgress: (uploadPercentage: number) => any;
    onError: (message: string) => any;
    onSuccess: (fileURL: string) => any;
  },
) {
  const storageRef = storage.ref(path);
  const uploadTask = storageRef.put(file);

  return uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function progress(snapshot) {
      cbs.onProgress((snapshot.bytesTransferred / file.size) * 100);
    },
    function error(err) {
      cbs.onError(err.message);
    },
    function completed() {
      cbs.onSuccess(`gs://${storageRef.bucket}/${storageRef.fullPath}`);
    },
  );
}

export async function getDownloadURL(fileURL: string) {
  return await storage.refFromURL(fileURL).getDownloadURL();
}
