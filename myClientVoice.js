(function(){

	/*
	 * Usage:
	 *	you must add one line below within beforeUnload event listener
	 *		window.addEventListener('beforeunload',function(event) {
	 *			myVoice.close();//<---add this line
	 *		},false);
	 *
	 *
	 */

	/* global */
	myVoice = { };

	Object.defineProperty(myVoice,'initialize',{value:initialize,writable:false,enumerable:false,configurable:false});
	Object.defineProperty(myVoice,'get',{value:get,writable:false,enumerable:false,configurable:false});
	Object.defineProperty(myVoice,'close',{value:close,writable:false,enumerable:false,configurable:false});
//	Object.defineProperty(myVoice,'submit',{value:submit,writable:false,enumerable:false,configurable:false});
//	Object.defineProperty(myVoice,'',{value:,writable:false,enumerable:false,configurable:false});


	/* local variable */

	let ws = null;
	let flagOpened = false;


	/* methods */

	function initialize(nPort,sUrl) {
		if(ws == null) {
			/* Connect to Web Socket */
			ws = new WebSocket('ws://'+sUrl+':'+nPort.toString());

			/* Set event handlers. */
			ws.onopen = function() {
				flagOpened = true;
			};

			ws.onmessage = function(e) {
				/* e.data contains received string. */
				_play(e.data);

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
		let count = 0;
		const hoge = setInterval(function() {
			count++;
			if(flagOpened){
				clearInterval(hoge);
				ws.send(sCommand)
			}else{
				if(count>200) {
					clearInterval(hoge);
					myVoice.close();
				}
			}
		},10);
	};

	function close() {
		if(ws != null) {
			ws.close();
			ws = null;
			flagOpened = false;
		}
	};

//	function submit() {
//		ws.send(sCommand);
//		input.value = "";
//		input.focus();
//	}


	/* inner methods */

	function _play(data) {

		/* pp */
		if(Math.floor(10000*(data.length%4)) != 0 || data.length < 500){
			console.error("Data length mod 4 is not zero");
		}else{
			myConvertBase64ToVoice.say(data);
		}
	};
})();



