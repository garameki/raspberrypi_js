(function(){

	/*
	 * Usage:
	 *	myConvertBase64ToVoice.say(data);
	 *
	 *	Args:
	 *		(Base64 decoded) data : this is decoded Base64 Strings
	 *	Return:
	 *		(AudioBuffer) return : AudioBuffer Object
	 *
	 */

	/* global */
	myConvertBase64ToVoice = { };

	Object.defineProperty(myConvertBase64ToVoice,'say',{value:say,writable:false,enumerable:false,configurable:false});
//	Object.defineProperty(myConvertBase64ToVoice,,'',{value:,writable:false,enumerable:false,configurable:false});


	/* variables */

	var decodeco;
	var nn = 2.0;
	var context = new AudioContext();
	var BUFFER_SIZE = context.sampleRate * nn;
	var audioBuffer = context.createBuffer(1,BUFFER_SIZE,context.sampleRate);
	var source = context.createBufferSource();

	var flag = true;

	/* methods */

	function say(data){

		var flag = true;
		console.log('test',data);

		try {
			var binaryArray = _convertBase64ToBinary(data);
			var ab = binaryArray.buffer.slice();/* arraybuffer is copied */
		}catch(err){
			console.error("Can't convert. augument must be decoded Base64 strings.");
			console.error(err);
			console.log('data=',data);
			flag = false;
		}

		if(flag){
			context.decodeAudioData(ab).then(function(decodedData) {
				decodeco = decodedData;
				if(flag){
					flag = false;
					var hoge = setInterval(function(){
						clearInterval(hoge);
						source = context.createBufferSource();
						source.buffer = decodeco;
						source.connect(context.destination);
						source.start(0);
						flag = true;
					},10);
				}

			},function(err){
				console.error('Decode error in AudioContext.decodeAudioData()');
				console.error(err);
				console.log(ab);
			});
		}

	};

	/* inner methods */

	/* https://gist.github.com/borismus/1032746 + my tryal*/
	/* HTTPRequestのものと比較して決定 */

	function _convertBase64ToBinary(base64) {
		var raw = window.atob(base64);
		var rawLength = raw.length;
		var array = new Int16Array(new ArrayBuffer(rawLength));

		for(i = 0; i < rawLength; i+=1) {
			array[i/2] = raw.charCodeAt(i) + raw.charCodeAt(i+1) * 256;
		}
		return array;
	};


})();



