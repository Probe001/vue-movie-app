exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'RIAM',
      age: 98,
      email: 'Riam@tistory.com'
    })
  }
}