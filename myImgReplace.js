(function(){
	/*
	 * Usage:
	 *	myImgReplace.replace(tagH);
	 *
	 * Argument:
	 *	tagH : 'h3','h4','h5' or 'hN'
	 *		Here N  is an integer as you like 
	 *
	 */

	/* global */
	myImgReplace = { };

	/* define method */
	Object.defineProperty(myImgReplace,'replace',{value:replace,writable:false,enumerable:false,configurable:false});

	function replace(tagH){
		var elements = document.getElementsByTagName('img');
		var nn = elements.length;
		var element,rights,right,eH,eParent;
		var kind;
		var kesanais = [];
		var url;
		for(var ii=0;ii<nn;ii++){
			element = elements[ii];
			right = 'がらめきドットコム';
			rights = element.outerHTML.match(/right="([^"]*)"/);
			if(rights != null) if(rights.length == 2) right = rights[1];
			kind = element.outerHTML.match(/kind="([^"]*)"/);
			console.log(kind);
			if(kind != null) if(kind.length == 2) if(kind[1] != 'icon'){
				/* 画像が一般の場合 */
				eH = document.createElement(tagElement);
				eH.style.backgroundImage = 'url("__URL__")'.replace('__URL__',element.src);
				eH.style.width = element.width+'px';
				eH.style.height = element.height + 'px';

				eH.innerHTML = '<font style="position:relative;left:10px;top:10px;font-size:15px">©</font><font style="position:relative;left:10px;top:10px;font-size:5px;line-height:15px;vertical-align:middle;">'+right+'</font>';
				if(element.parentNode){
					element.parentNode.insertBefore(eH,element);
				}
			}else{
				/* 画像がkind='icon'と指定されていた場合*/
				kesanais.push(ii);
			}
		}
		/* まとめてimgタグを削除 */
		for(var ii=0;ii<nn;ii++){
			element = elements[0];/*消すごとにcollectionの順番が詰まっていくので全部消そうと思ったら0番目だけ参照していればよい*/
			if(element.parentNode){
				if(kesanais.indexOf(ii) == -1){
					element.parentNode.removeChild(element);
				}
			}
		}
	};
})();
