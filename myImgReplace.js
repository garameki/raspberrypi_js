(function(){
	/*
	 * Usage in <script>:                             
	 *	myImgReplace.replace(sTagH);              
	 *                                                
	 * Argument:                                      
	 *	(String) sTagH : 'h3','h4','h5' or 'hN'   
	 *		Here N  is an integer as you like 
	 *                                                
	 * Usage in <body>:                               
	 *	<img right="GitHub" src="......">         
	 *	or                                        
	 *	<img kind="icon" src="......">            
	 *	or                                        
	 *	etc...                                    
	 *                                                
	 */
	/* global */
	myImgReplace = { };

	/* inner variable */
	const flagDebug = false;

	/* define method */
	Object.defineProperty(myImgReplace,'replace',{value:replace,writable:false,enumerable:false,configurable:false});

	function replace(sTagH){
		if(sTagH.match(/h1|h2|h3|h4|h5|h6|h7|h7|h9|h10/)){
			if(flagDebug)console.log('image to h');
		}else{
			console.log('expect H tag:'+sTagH+' is not so.');
		}
		var elements = document.getElementsByTagName('img');
		var nn = elements.length;
		var element,rights,right,eH,eParent;
		var kind;
		var kesanais = [];
		var url;
		let way;
		const DONOTHING = 1;
		const DOEXCHANGE = 2;
		for(var ii=0;ii<nn;ii++){
			element = elements[ii];
			/* 権利者の読み込み(rightプロパティー) */
			right = 'がらめきドットコム';
			rights = element.outerHTML.match(/right="([^"]*)"/);
			if(rights != null) if(rights.length == 2) right = rights[1];
			kind = element.outerHTML.match(/kind="([^"]*)"/);
			if(flagDebug)console.log('right=',right);
			if(flagDebug)console.log('kind=',kind);
			/* img を h に置き換えるかどうかの判定 (kindプロパティー) */
			if(kind == null){
				way = DOEXCHANGE;
			}else{
				if(kind.length == 2){
					if(kind[1] == 'icon') way = DONOTHING;
					else if(kind[1] == 'icon') way = DONOTHING;
					else if(kind[1] == 'icon') way = DONOTHING;
					else if(kind[1] == 'icon') way = DONOTHING;
					else if(kind[1] == 'icon') way = DONOTHING;
					else way = DOEXCHANGE;
				}else{
					way = DOEXCHANGE;
				}
			}
			if(flagDebug)console.log('way=',way);
			switch(way){
				case DONOTHING:
					/* 画像がkind='icon'と指定されていた場合*/
					kesanais.push(ii);
					break;
				case DOEXCHANGE:
					/* 画像が一般の場合 */
					eH = document.createElement(sTagH);
					eH.style.backgroundImage = 'url("__URL__")'.replace('__URL__',element.src);
					eH.style.width = element.width+'px';
					eH.style.height = element.height + 'px';

					eH.innerHTML = '<font style="position:relative;left:10px;top:10px;font-size:15px">©</font><font style="position:relative;left:10px;top:10px;font-size:5px;line-height:15px;vertical-align:middle;">'+right+'</font>';
					if(element.parentNode){
						element.parentNode.insertBefore(eH,element);
					}
					break;
				default:
					break;
			}
//			if(kind != null)
//				if(kind.length == 2)
//					if(kind[1] != 'icon'){
//						/* 画像が一般の場合 */
//						eH = document.createElement(sTagH);
//						eH.style.backgroundImage = 'url("__URL__")'.replace('__URL__',element.src);
//						eH.style.width = element.width+'px';
//						eH.style.height = element.height + 'px';
//
//						eH.innerHTML = '<font style="position:relative;left:10px;top:10px;font-size:15px">©</font><font style="position:relative;left:10px;top:10px;font-size:5px;line-height:15px;vertical-align:middle;">'+right+'</font>';
//						if(element.parentNode){
//							element.parentNode.insertBefore(eH,element);
//						}
//					}else{
//						/* 画像がkind='icon'と指定されていた場合*/
//						kesanais.push(ii);
//					}
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
