(function(){/*

MIT License
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

@USAKU Takahashi_LICENSE_HEADER_END@

--------------------------------------------------------------------------------

The MIT License (MIT)
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
	 *		myClientMax31856.open(sUrl,nPort,sId)
	 *	Args:
	 *		sUrl : involve ws:// being able to use non-secure protocol only
	 *		sPort : port number ,for example 4000
	 *		sId : ID of specific element to show temperature as String
	 *	Expample:
	 *		myClientMax31856.open('ws://www.example.com',4000,'hogeElement')
	 *
	 */

	/* global */
	myClientMax31856 = { };

	/* methods */
	Object.defineProperty(myClientMax31856,'open',{value:open,writable:false,enumerable:false,configurable:false});
	Object.defineProperty(myClientMax31856,'close',{value:close,writable:false,enumerable:false,configurable:false});
//	Object.defineProperty(myClientMax31856,'',{value:,writable:false,enumerable:false,configurable:false});

	let ws = null;
	let idElement;

	function open(sUrl,nPort,sId) {

		idElement = id;

		// Connect to Web Socket
		if(ws == null){
			ws = new WebSocket(sUrl+':'+String(nPort));

			// Set event handlers.
			ws.onopen = function() {
				_output("onopen");
//authorization			ws.send("co6");
			};

			ws.onmessage = function(e) {
				// e.data contains received string.
				_output("onmessage: " + e.data);
			};

			ws.onclose = function() {
				_output("onclose");
			};

			ws.onerror = function(e) {
				_output("onerror");
				console.log('websocket-error-log :',e)
			};

		}else{
			console.error("ws is already opend in myClientMax31856");
		}
	};


	function close() {
		if(ws != null){
			ws.close();
			ws = null;
		}else{
			console.error("ws is already closed in myClientMax31856");
	};

	function _output(str) {
		var log = document.getElementById(idElement);
		var escaped = str.replace(/&/, "&amp;").replace(/</, "&lt;").replace(/>/, "&gt;").replace(/"/, "&quot;");
		var number = escaped.match(/\d+\.\d/);// + "<br>" + log.innerHTML;
		if(number == null){
			log.innerHTML = escaped + "<br>" + log.innerHTML;
		}else{
			log.innerHTML = number + "℃";
		}
	};

})();
