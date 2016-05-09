
'use strict';

import request from 'superagent';

/**
 * Postcode.nl API Client.
 * @type {Postcode}
 * @class Postcode
 *
 * @property {boolean|{key:string, secret:string}} authentication
 */
export class Postcode {

  /**
   * Postcode.nl API Instance Creator.
   * @param  {object} [options]
   * @param  {string} [options.key]    Application Key.
   * @param  {string} [options.secret] Application Secret.
   * @todo: Add support for local proxy server (to bypass cors problems).
   * @return {Postcode}
   */
  constructor (options) {
    options = options || {};

    this.authentication = false;
    this.base = 'https://api.postcode.nl/rest/';

    if (options.key && options.secret) {
      this.authentication = {
        key: options.key,
        secret: options.secret
      };
    }
  }

  /**
   * Get address from postcode and house number.
   *
   * @param  {object}   address  [description]
   * @param  {string}   address.postcode              6 character form of the dutch postcode.
   * @param  {number}   address.houseNumber           House number.
   * @param  {string}   [address.houseNumberAddition] House number addition.
   * @param  {Function} callback Callback, gets error as first parameter, result address as second.
   *
   * @todo Add better error handling with the error codes.
   * @todo Add response validation.
   */
  address (address, callback) {
    if (! this.authentication) return callback(new Error('You need to provide authentication details for this call!'));
    if (! address || ! address.postcode || ! address.houseNumber) return callback(new Error('You need to provide a postcode and housenumber!'));
    if (address.postcode.length !== 6) return callback(new Error('Postcode needs to be exact 6 characters!'));

    var url = `${this.base}addresses/${address.postcode}/${address.houseNumber}`;
    if (address.houseNumberAddition) url += `/${address.houseNumberAddition}`;

    request
      .get(url)
      .auth(this.authentication.key, this.authentication.secret)
      .end((err, res) => {
        if (err || ! res)
          return callback(err || new Error('Invalid or empty response!'));
        if (! res.body)
          return callback(new Error('Empty body!'));
        return callback(null, res.body);
      });
  }
}
