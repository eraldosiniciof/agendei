import firebaseServer from 'firebase-firebaseServer'

const app = firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp({
        credential: firebaseServer.credential.cert({
            type: process.env.TYPE,

        })
    })

export { firebaseServer }