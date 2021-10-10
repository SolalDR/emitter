type EmitterCallback = (...data: unknown[]) => void

/**
 * @class An abstract class to implement event system
 * @abstract
 * @author SolalDR - solal.dussout-revel@hotmail.fr
 */
export class Emitter {
  private _listeners

  constructor() {
    this._listeners = {};
  }

  /**
   * Test if a function is registered in the _listeners' stack
   * @param {string} event
   * @param {function} callback
   * @return boolean
   */
   listenerExist( event: string, callback: EmitterCallback) {
    var exist = false;
    if( this._listeners[ event ] ) {
      this._listeners[ event ].forEach(c => {
        if( c === callback ){
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
   emit(event: string | string[], args: unknown): Emitter {
    var list = event instanceof Array ? event : [ event ];

    list.forEach(eventName => {
      if( this._listeners[ eventName ] ) {
        this._listeners[eventName].forEach(callback => {
          callback.call( this, args );
        });
      }
		})
		
		return this;
  }

  /**
   * Register a call-back for an event that will be triggered once.
   */
  once(event: string, callback: EmitterCallback): Emitter {
    var onceCallback = (e)=>{
      callback.call(this, e);
      this.off(event, onceCallback);
    }
    this.on(event, onceCallback);

    return this;
  }

	/**
	 * Register a call-back for a list of event that will be triggered once all the _listeners will be triggered.
	 * @param {string[]} _listeners 
	 * @param {Function} callback 
	 * @returns {Emitter} Return "this"
	 */
  onceAll( events: string[], callback: EmitterCallback): Emitter {
    var queue = events.map( event => ({ name: event, ready: false }));
    var isReady = () => queue.find(queueItem => !queueItem.ready ) ? false : true;
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
   on( event: string | string[], callback: EmitterCallback ){
    var list = event instanceof Array ? event : [ event ];
    list.forEach( e => {
      if( !this._listeners[ e ] ){
        this._listeners[ e ] = new Map();
      }

      if( this._listeners[ e ] && !this.listenerExist( e, callback ) ) {
        this._listeners[ e ].set( Symbol(), callback );
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
   off( event: string, callback: EmitterCallback ){
    if( this._listeners[ event ] ){
      this._listeners[ event ].forEach( (tmpCallback, i) => {
        if( tmpCallback === callback ){
          this._listeners[ event ].delete(i);
        }
      } )
    }

    return this;
  }
}