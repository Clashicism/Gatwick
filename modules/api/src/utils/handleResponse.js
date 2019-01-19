/**
 * Builds and sends the API response
 * @author The Gateway Project Developers <hello@gateway.cash>
 * @file Builds and sends the API response
 */
export default (response, res) => {
  response.status = 'success'
  res.end(JSON.stringify(response))
  return true
}