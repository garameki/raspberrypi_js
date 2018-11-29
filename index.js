window.onload = function(){
	myImgReplace.replace('h4');

	centering();
	window.onresize = centering;
//	adjust_frame_css('counterIframe');
//	adjust_frame_css('humtemIframe');
	title_deco();
	//ws と httpは同一マシン上
	myClientMax31856.open(9801,'ws://garameki.com','temperatureMax31856');
	//myClientMax31856.open(9801,'ws://192.168.3.6','temperatureMax31856');
	myClientImgStreamer.open(8801,'ws://garameki.com','museum');
	//myClientImgStreamer.open(8801,'ws://192.168.3.6','museum');
};
window.onclose = function(){
	alert("browser is about to close 222");
};
window.onbeforeunload = function(){
	alert("browser is about to close 222");
};
window.onunload = function(){
	alert("browser is about to close 222");
};
window.addEventListener('beforeunload',function(e){
	myImgStreamLoader.close();
	myClientMax31856.close();
	console.log("window close event occured");
	alert("browser is about to close");
},false);

function title_deco(){

	var red = 0x00;
	var green = 0xe0;
	var blue = 0x50;
	var ele = document.getElementById('topTitle');
	
	red = Math.abs(red + Math.floor(Math.random()*256) - 0);
	green = Math.abs(green + Math.floor(Math.random()*256) - 0);
	blue = Math.abs(blue + Math.floor(Math.random()*256) - 0);
	lred = ("00"+red.toString(16)).substr(-2,2);
	lgreen = ("00"+green.toString(16)).substr(-2,2);
	lblue = ("00"+blue.toString(16)).substr(-2,2);
	console.log('#'+lred+lgreen+lblue);
	ele.style.color = '#'+lred+lgreen+lblue;


};

/*https://support.sugutsukaeru.jp/ja/tutorials/news-widget/78.html*/
function adjust_frame_css(F){
  if(document.getElementById(F)) {
    var myF = document.getElementById(F);
    var myC = myF.contentWindow.document.documentElement;
    var myH = 100;
    if(document.all) {
      myH  = myC.scrollHeight;
    } else {
      myH = myC.offsetHeight;
    }
    myF.style.height = myH+"px";
  }
};

function centering(){
	var body = document.getElementsByTagName('body')[0];
	body.style.position = 'relative';
	var windowWidth = (window.innerWidth || document.documentElement.clientWidth || 0);

	if(windowWidth > 800)body.style.left = Math.floor((windowWidth - 800) / 2).toString() + 'px';
	else body.style.left = '0px';
	
};


