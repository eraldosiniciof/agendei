import { firebaseServer } from './../../config/firebase/server'

export default async (req, res) => {
    const [, token] = req.headers.authorization.split(' ')

    if (!token) {
        return res.status(401)
    }

    try {
        const { user_id } = await firebaseServer.auth().verifyIdToken(token)
        console.log(user_id)
    } catch (error) {
        console.log('AGENDA ERROR: ', error)
        return res.status(401)
    }
    res.status(200).json({ name: 'John Doe' })
}