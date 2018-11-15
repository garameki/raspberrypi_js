(funciton(){


	/*
	 * Usage:
	 *	you must add one line below within beforeUnload event listener
	 *		window.addEventListener('beforeunload',function(event) {
	 *			myVoice.close();//<---add this line
	 *		},false);
	 *
	 *
	 */

	/* global *
	myVoice = { };

	Object.defineProperty(myVoice,'initialize',{value:,writable:false,enumerable;false,configurable:false});
	Object.defineProperty(myVoice,'get',{value:get,writable:false,enumerable;false,configurable:false});
	Object.defineProperty(myVoice,'close',{value:close,writable:false,enumerable;false,configurable:false});
//	Object.defineProperty(myVoice,'submit',{value:submit,writable:false,enumerable;false,configurable:false});
//	Object.defineProperty(myVoice,'',{value:,writable:false,enumerable;false,configurable:false});


	/* local variable */

	let ws = null;


	/* methods */

	function initialize(nPort=6601,sUrl) {

		if(ws == null) {
			// Connect to Web Socket
			ws = new WebSocket('ws://'+sUrl+":"+nPort.toString());

			// Set event handlers.
			ws.onopen = function() {
			};

			ws.onmessage = function(e) {
				// e.data contains received string.
				
				_play(btoa(e.data));

			};

			ws.onclose = function() {
			};

			ws.onerror = function(e) {
				console.log(e)
			};

		}else{
			console.log("ws has been already opend.");
		}


	};

	function get(sCommand) {
		ws.send(sCommand)
	};

	function close() {
		if(ws != null) {
			ws.close();
			ws = null;
		}
	};

//	function submit() {
//		ws.send(sCommand);
//		input.value = "";
//		input.focus();
//	}


	/* inner methods */

	function _play(data) {

		context = new AudioContext();
		console.log(context);                                                                                                                  
		source = context.createBufferSource();
		source.buffer = data;
		source.connect(context.destination);
		source.start(0);
	};
})();
