let arc = require('@architect/functions')
let data = require('@begin/data')
let layout = require('@architect/views/layout')

exports.handler = arc.http.async(verify)

async function verify(req) {
  // read token in request parameter
  let token = req.params.token
  // read token out of the database
  let result = await data.get({
    table: 'tokens',
    key: token
  })
  // verify token from the database against the path param
  if (result.key === token) {
    let account = await data.get({
      table: 'accounts',
      key: result.email,
    })
    // write `verified:true` into the database
    let verified = await data.set({
      table: 'accounts',
      key: account.key,
      password: account.password,
      verified: true
    })
    console.log(verified)

    return {
      html: layout({
        account: req.session.account,
        body: '<p>verified email</p>'
      })
    }
  } else {
    return {
      html: layout({
        account: req.session.account,
        body: '<p>verifying email ... token expired</p>'
      })
    }
  }
}