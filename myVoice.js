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

		bytedata = new Float32Array(data);
		console.log(bytedata);
		console.log(bytedata.buffer);
		var context = new AudioContext();
		var BUFFER_SIZE = context.sampleRate * 2.0;
		console.log("sample=",context.sampleRate);
	//	source = context.createMediaStreamSource(bytedata);
		var audioBuffer = context.createBuffer(1,BUFFER_SIZE,context.sampleRate);

		nowBuffering = audioBuffer.getChannelData(0);
		nowBuffering.set(bytedata);
		console.log("span=",nowBuffering.length);
		for(var ii=0;ii<100;ii++) {
			console.log(nowBuffering[ii]);
		}


		audioBuffer.getChannelData(0).set(btoa(data));

		//audioBuffer.getChannelData(0).set(bytedata);

		var source = context.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(context.destination);
		source.start(0);

		var bufferLoader = new BufferLoader(
			context,
			['/data/yoroshiku.mp3'],
			finishloading
		);
		bufferLoader.load();

		function finishloading(bufferList) {
			var source1 = context.createBufferSource();
			source1.buffer = bufferList[0];
			source1.connect(context.destination);
///			source1.start(0);
		};
	};

})();
