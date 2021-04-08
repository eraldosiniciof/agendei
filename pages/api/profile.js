// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {

  console.log('body:', req.body)
  console.log('auth:', req.headers.authorization)

  res.status(200).json({ name: 'John Doe' })
}
