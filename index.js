'use strict'

const Request = require('./request')

module.exports = class SouthNode {
  constructor () {
    this.request = new Request()
  }

  /**
  * @param {string} player's username
  */
  async profile (username) {
    return await this.request.send(['profile', username])
  }

  /**
  * @param {string} player's username
  */
  async miniProfile (username) {
    return await this.request.send(['mini_profie', username])
  }

  /**
  * @param {string} lobby's ID
  * @param {string} Lobby host's auth token, optional
  */
  async lobby (lobbyid, authToken) {
    return await this.request.send(['lobby', lobbyid, authToken])
  }
}
