import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// firebase の初期化
if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyC5MIk3wBH0TkfebPs6FqVOwedCoXwScBw",
        authDomain: "itss-todo-k63.firebaseapp.com",
        projectId: "itss-todo-k63",
        storageBucket: "itss-todo-k63.appspot.com",
        messagingSenderId: "713855866234",
        appId: "1:713855866234:web:0ed1e676167d9c66e032c3"
    };
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
    try {
        const snapshot = await db
            .collection("todos")
            .get();
        const items = snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id })
        );
        return items;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const addFirebaseItem = async (item) => {
    try {
        const todoRef = db.collection("todos");
        await todoRef.add(item);
    } catch (err) {
        console.log(err);
    }
}

export const updateFirebaseItem = async (item, id) => {
    try {
        const todoRef = db.collection("todos").doc(id);
        await todoRef.update(item);
    } catch (err) {
        console.log(err);
    }
}

export const clearFirebaseItem = async (item) => {
    const todoRef = db.collection("todos").doc(item.id);
    await todoRef.delete().then(function () {
    }).catch(function (err) {
        console.log(err);
    });
};

export const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: "/",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
}

export const storeUserInfo = async (user) => {
    const { uid } = user;
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
        await db.collection("users").doc(uid).set({ name: user.displayName });
        return {
            name: user.displayName,
            id: uid,
        };
    } else {
        return {
            id: uid,
            ...userDoc.data(),
        };
    }
}

export const updateUser = async (user, image) => {
    try {
        const userDoc = await firebase.firestore().collection("users").doc(user.id).get();
        if (userDoc.exists) {
            await firebase.firestore().collection("users").doc(user.id).update({ ...userDoc.data(), image: image });
        }
    } catch (err) {
        console.log(err);
    }
}

export const uploadImage = async (image) => {
    const ref = firebase.storage().ref().child(`/images/${image.name}`);
    let downloadUrl = "";
    try {
        await ref.put(image);
        downloadUrl = await ref.getDownloadURL();
    } catch (err) {
        console.log(err);
    }
    return downloadUrl;
};