(function(){/*
Usage:
	This is not big deal. Just 4 step.

	1.Add a line below within a html 'HEAD' element.
		<script type="application/javascript" src="THIS FILE"></script>

	2.Add myClientImgStreamer.initialize() within the event function 'onload'.

	3:Set idParent in this source to be added in order to show video in it

	finally:Do myClientImgStreamer.close()

		When the page is shutting down, 
			call myClientImgStreamer.close() in the event like 'onresume' to make 'websocket keep-alive connection' break normaly.
		For example:
			onresume = function(){
				myClientImgStreamer.close();//<--add this line in the resume event function
			};
*/});

(function(){/*

MIT License
For all part of this text and functions
Copyright (c) 2018 USAKU Takahashi @garameki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@garameki_LICENSE_HEADER_END@

--------------------------------------------------------------------------------

The MIT License (MIT)
For this script section
Copyright (c) 2018 Johan Hanssen Seferidis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@Johan Hanssen Seferidis_LICENSE_HEADER_END@
*/});

(function(){

	/*
	 * Method : open
	 *	Usage:
	 *		myClientImgStreamer.open(nPort,sUrl,sIdParent,sIdImage)
	 *	Args:
	 *		(Number) nPort : 4000
	 *		(String) sUrl : ws://~
	 *		(String) sIdParent : ID of Element to attach Image Tag
	 *		(String) sIdImage : ID of Element to show video
	 *	Example:
	 *		myClientImgStreamer.open('ws://example.com',4000,'temp')
	 *	Explanation:
	 *		It can't be opened with TLS protocol
	 *
	 * Method : close
	 *	Usage:
	 *		myClientImgStreamer.close()
	 *	Explanation:
	 *		Must be involved this method within window.onunload function.
	 */


	/* global */
	myClientImgStreamer = { };

	Object.defineProperty(myClientImgStreamer,'open',{value:open,enumerable:true,writable:false,configurable:false})
	Object.defineProperty(myClientImgStreamer,'close',{value:close,writable:false,enumerable:true,configurable:false})
//	Object.defineProperty(myClientImgStreamer,'',{value:,enumerable:true,writable:false,configurable:false})

	let ws = null;
	let elementImage;
	let elementParent;

	function open(nPort,sUrl,sIdParent) {

		if(ws == null){
			/* add img element into arbiteral element as id selected */
			elementImage = document.createElement('img');
			elementParent = document.getElementById(sIdParent);
			elementParent.appendChild(elementImage);
			ws = new WebSocket(sUrl+":"+String(nPort));// Connect to Web Socket

			/* Set event handlers */
			ws.onopen = function() {
				_output("onopen");
	//認証for authorization			ws.send('id:co6');
			};
			ws.onmessage = function(e) {
				// e.data contains received string.
				// _output("onmessage: " + e.data);
				elementImage.src="data:img/jpg;base64,"+e.data;
			};
			ws.onclose = function() {
				_output("onclose");
			};
			ws.onerror = function(e) {
				_output("onerror");
				console.log(e)
			};
		}else{
			alert("ws is already opened in myClientImgStreamer");
		}
	};
	function close() {
		if(ws != null){
			ws.close();
			ws = null;
			elementParent.removeChild(elementImage);
		}else{
			console.log("ws is already closed in myClientImgStreamer");
		}
	};
	function _output(str) {
//		var log = document.getElementById("log");
//		var escaped = str.replace(/&/, "&amp;").replace(/</, "&lt;").
//		replace(/>/, "&gt;").replace(/"/, "&quot;"); // "
//		log.innerHTML = escaped + "<br>" + log.innerHTML;
	};
})();    
