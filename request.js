const fetch = require('node-fetch')
const ErrorHandling = require('./errorhandling')
const flgs = process.argv.slice(2) // For handling verbosity

module.exports = class Request {
  constructor () {
    this.baseURL = 'https://southpine.playglitch.xyz/api'
    this.log = new ErrorHandling()
  }

  ensureVerbose () {
    if (flgs !== 'verbose' || flgs !== 'v' || flgs !== '') {
      throw this.log.Warning("The flag provided isn't supported. These flags are supported: --verbose (-v)")
    }
  }

  async send (args, params) {
    if (args === '') {
      throw this.log.Error('No method was provided (profile, miniProfile, lobby).')
    }
    if (params === '') {
      throw this.log.Error('No parameter(s) was/were provided (username, lobby ID, authentication token).')
    }
    var res = await fetch(this.createUrl(args, params))
    var data = await res.json()
    if (res.status !== 200) {
      switch (res.status) {
        case 401:
          throw this.log.Error(
            'The user or lobby you requested has a private profile.'
          )
        case 403:
          throw this.log.Error(
            'The user or lobby you requested has a private profile.'
          )
        case 404:
          throw this.log.Error(
            'The user or lobby you requested doesn\'t exist.'
          )
        case 500:
          throw this.log.Error(
            'The API server is either not responding or is down.'
          )
        default:
          throw this.log.CritError(
            `Unknown error. Please report this issue on GitHub at
            https://github.com/doamatto/southnode/issues/new/`
          )
      }
    } else return data
  }

  createUrl (args, params) {
    const URL = require('url').URL
    const url = new URL(this.baseURL)
    if (args === '') {
      throw this.log.Error('No method was provided (profile, miniProfile, lobby).')
    }
    if (params === '') {
      throw this.log.Error('No parameter(s) was/were provided (username, lobby ID, authentication token).')
    }
    try {
      url.pathname += `/${args.filter(a => a).join('/')}`
      for (const p in params) {
        url.searchParams.set(p, params[p])
      }
    } catch (e) {
      throw this.log.Error(`There was an issue when creating the request URL. Error: ${e}`)
    }
    return url.href
  }
}
