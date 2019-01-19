/**
 * GET /address API endpoint
 * @author The Gateway Project Developers <hello@gateway.cash>
 * @file Defines a GET endpoint for /address
 */
import { mysql, auth, handleResponse } from 'utils'
import url from 'url'

export default async (req, res) => {
  console.log('GET /address requested')

  // parse the provided data
  const query = url.parse(req.url, true).query
  console.log(query)

  let userIndex = await auth(query.APIKey, res)

  console.log(userIndex)
  if (!userIndex) return

  // return the record
  let result = await mysql.query(
    'SELECT payoutAddress FROM users WHERE tableIndex = ? LIMIT 1',
    [userIndex]
  )
  handleResponse({
    address: result[0].payoutAddress
  }, res)
}