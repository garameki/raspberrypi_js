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

		if(Math.floor(10000*(data.length%4)) != 0){
			console.error("Data length mod 4 is not zero");
		}else{
			

			var binaryArray = _convertBase64ToBinary(data);
			var ab = binaryArray.buffer.slice();

			var decodeco;
			var nn = 2.0;
			var context = new AudioContext();
			var BUFFER_SIZE = context.sampleRate * nn;
			var audioBuffer = context.createBuffer(1,BUFFER_SIZE,context.sampleRate);
			var source = context.createBufferSource();

			context.decodeAudioData(ab).then(function(decodedData) {
				decodeco = decodedData;
			},function(err){
				console.error('Hey decode error in context.decodeAudioData()');
				console.log(err);
				console.log('ab4:',ab);
			});

			var hoge = setInterval(function(){
				clearInterval(hoge);
				console.log('PPPOOO',decodeco);
				console.log('PPPOOO2',decodeco2);
				var source = context.createBufferSource();
				source.buffer = decodeco;
				source.connect(context.destination);
				source.start(0);
			},100);







		/* https://gist.github.com/borismus/1032746 */
		function _convertBase64ToBinary(base64) {
			var raw = window.atob(base64);
			var rawLength = raw.length;
			//var array = new Uint8Array(new ArrayBuffer(rawLength));
			var array = new Uint8Array(new ArrayBuffer(rawLength));
			//X	var array = new Float32Array(new ArrayBuffer(rawLength));
			var array = new Int16Array(new ArrayBuffer(rawLength));

			for(i = 0; i < rawLength; i+=1) {
				array[i/2] = raw.charCodeAt(i)+raw.charCodeAt(i+1)*256;
			}
			return array;
		};


			//audioBuffer.getChannelData(0).set(data);
			//	source = context.createMediaStreamSource(bytedata);



			var bufferLoader = new BufferLoader(
				context,
				['/html/data/yoroshiku.mp3'],
				finishloading
			);
			bufferLoader.load();

			var decodeco2;
			function finishloading(bufferList) {
				decodeco2 = bufferList[0];
			};


		}/* else */
	};
})();



