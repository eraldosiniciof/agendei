import { firebaseServer } from './../../config/firebase/server'

export default async (req, res) => {
  const [, token] = req.headers.authorization.split(' ')
  const user = await firebaseServer.auth().verifyIdToken(token)
  console.log(user)
  res.status(200).json({ name: 'John Doe' })
}
