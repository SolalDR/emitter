/**
 * @class An abstract class to implement event system
 * @abstract
 * @author SolalDR - solal.dussout-revel@hotmail.fr
 */
module.exports = class Emitter {

  constructor() {
    this.events = {};
  }

  /**
   * Test if a function is registered in the events' stack
   * @param {string} event
   * @param {function} callback
   * @return boolean
   */
   eventExist( event, callback ){
    var exist = false;
    if( this.events[ event ] ) {
      this.events[ event ].forEach(callback => {
        if( this.events[ event ] === callback ){
          exist = true;
        }
      })
    }
    return exist;
  }

  /**
   * Trigger the call-backs registered for an event
   * @param {string} e The event's name
   * @param {Object} args An object passed in argument of the callback
	 * @returns {Emitter} Return "this"
   */
   emit( event, args = {} ){
    var list = event instanceof Array ? event : [ event ];

    list.forEach(eventName => {
      if( this.events[ eventName ] ) {
        this.events[eventName].forEach(callback => {
          callback.call( this, args );
        });
      }
		})
		
		return this;
  }

  /**
   * Register a call-back for an event that will be triggered once.
   * @param {string} event
   * @param {Function} callback
	 * @returns {Emitter} Return "this"
   */
  once( event, callback ){
    var onceCallback = (e)=>{
      callback.call(this, e);
      this.off(event, onceCallback);
    }
    this.on(event, onceCallback);

    return this;
  }

	/**
	 * Register a call-back for a list of event that will be triggered once all the events will be triggered.
	 * @param {string[]} events 
	 * @param {Function} callback 
	 * @returns {Emitter} Return "this"
	 */
  onceAll( events, callback ){
    var queue = events.map( event => ({ name: event, ready: false }));
    var isReady = _ => queue.find(queueItem => !queueItem.ready ) ? false : true;
    events.forEach( (event, i) => {
      this.once(event, () => {
        queue[i].ready = true;
        if( isReady() ){
          callback.call(this);
        }
      })
		})
		
		return this;
  }

  /**
   * Register a new call-back for an event
   * @param {string} event
   * @param {Function} callback
	 * @returns {Emitter} Return "this"
   */
   on( event, callback ){
    var list = event instanceof Array ? event : [ event ];
    list.forEach( event => {

      if( !this.events[ event ] ){
        this.events[ event ] = new Map();
      }

      if( this.events[ event ] && !this.eventExist( event, callback ) ) {
        this.events[ event ].set( Symbol(), callback );
      }
    })

    return this;
  }

  /**
   * Unregister a callback from an event
   * @param {string} event
   * @param {Function} callback
	 * @returns {Emitter} Return "this"
   */
   off( event, callback ){
    if( this.events[ event ] ){
      this.events[ event ].forEach( (tmpCallback, i) => {
        if( tmpCallback === callback ){
          this.events[ event ].delete(i);
        }
      } )
    }

    return this;
  }
}