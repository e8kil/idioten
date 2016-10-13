
var mellomlagring;
var allekort1;
var kortNummer;
var kort;
var antallIkort;
var runde;
var kortknapp;
var kort;
var kortverdi1;
var kortverdi2;
var kortverdi3;
var hoyde;
var cardBeforeTop;
var cardBefore;
var siteHeight = $("body").height();
var lenghtBetweenCards = siteHeight/10;
var lenghtBetweenCardsWhenSmall = siteHeight/13;
var gameWinner = false;
$("#newGame, #newGameShaddow, #winnerLooserHolder").hide();


$(document).ready( function () {
	newGame();
});

$("#kortstokk1").click(function(){

	if ("vibrate" in navigator) {
		navigator.vibrate(10);
	}
	var a = allekort1.length-4;
	if(a>=4){
		$("#kortstokk1").html("<img src ='./pics/kortstokk"+a+".png' height='auto' width='100%'>");
	}
	else{
		$("#kortstokk1").html("");
	}
	mellomlagring=[];
	card();
	runde++;

	if(allekort1.length == 0) {
		checkIfGameOver();
	}
});
$(".kort").click(function(){

	if ("vibrate" in navigator) {
		navigator.vibrate(10);
	}

	kortknapp= this.id.substring(4,5);

	if(kort[kortknapp-1].length == 0 && typeof mellomlagring[0] != "undefined" && mellomlagring[0].length !== 0){
		kort[kortknapp-1][0]=mellomlagring[0];
		kort[kortknapp-1][1]=mellomlagring[1];
		
			var a = mellomlagring[0];
			var b = mellomlagring[1];

			$(this).append("<div id='kort"+kortknapp+"-1' style='position:absolute; top:0px'><img src ='./pics/"+a+b+".png' height='auto' width='100%'></div>");
			
			$("#kort"+mellomlagring[2]+"-"+antallIkort[mellomlagring[2]-1]+"").remove();
			$("#kort"+mellomlagring[2]+"-"+antallIkort[mellomlagring[2]-1]+"").removeClass("big");
			var a = kort[mellomlagring[2]-1].length;
			kort[mellomlagring[2]-1].splice(a-2,2);
			antallIkort[mellomlagring[2]-1]--;

			antallIkort[kortknapp-1]++;
			mellomlagring=[];
	} 
	else{
		kortcheck();
	}
	if(allekort1.length == 0) {
		checkifGameWinner();

		if(gameWinner == false) {
			checkIfGameOver();
		}
	}
	resizeStack();
});

function kortcheck(){

	var sistekort1 = kort[kortknapp-1].length;
	var tallkort1  = kort[kortknapp-1][sistekort1-2];
	var typekort1  = kort[kortknapp-1][sistekort1-1];

	var sistekort2;
	var tallkort2; 
	var typekort2;

	var runde = 1;
	for (var i = 0; i<=3; i++) {
		if(kortknapp-1!=i){
			sistekort2 = kort[i].length;
			tallkort2  = kort[i][sistekort2-2];
			typekort2  = kort[i][sistekort2-1];

			if(tallkort1<tallkort2 && typekort1 == typekort2){

				kort[kortknapp-1].splice(sistekort1-2,2);
				$("#kort"+kortknapp+"-"+antallIkort[kortknapp-1]+"").remove();
				antallIkort[kortknapp-1]--;
				return;
			}
			else {
				if(tallkort2 == undefined) {
					if(runde == 1) {
						for (var p = 0; p<=3; p++) {
							$("#kort"+(p+1)+"-"+antallIkort[p]+"").css({
								"width":"100%",
						 	});

						}
						var className = $("#kort"+kortknapp+"-"+antallIkort[kortknapp-1]+"").attr('class');

						if(className != "big") {
							for (var p = 0; p<=3; p++) {
								$("#kort"+(p+1)+"-"+antallIkort[p]+"").removeClass("big");
							}
							$("#kort"+kortknapp+"-"+antallIkort[kortknapp-1]+"").css({
								"width":"110%"
							});
							var a = kort[kortknapp-1].length;
							var b = kort[kortknapp-1][a-2];
							var c = kort[kortknapp-1][a-1];
							mellomlagring[0]=b;
							mellomlagring[1]=c;
							mellomlagring[2]=kortknapp;

							$("#kort"+kortknapp+"-"+antallIkort[kortknapp-1]+"").addClass("big");
						}
						else {
							$("#kort"+kortknapp+"-"+antallIkort[kortknapp-1]+"").css({
								"width":"100%"
							});	
							$("#kort"+kortknapp+"-"+antallIkort[kortknapp-1]+"").removeClass("big");

							mellomlagring[0]=[];
							mellomlagring[1]=[];
							mellomlagring[2]=[];				
						}
						runde++;
					}
				}

			}
		}
	}
}



function card(){
	for (var p = 0; p<=3; p++) {
		$("#kort"+(p+1)+"-"+antallIkort[p]+"").css({
			"width":"100%",
	 	});
	}

	var nummer;
	var item;
	var tall;
	for(var i = 0; i<=3; i++){
		nummer= Math.floor(Math.random()*allekort1.length);
		item = allekort1[nummer];
		tall= parseInt(item);
		if(tall==10){
			var b =	item.replace("10", "");
		}
		else{
			var b =	item.replace("0", "");
		}
		var c =	b.replace(tall, "");
		var tallposisjon = kort[i].length;
		if(tallposisjon==0){
			kort[i][tallposisjon]=tall;
			kort[i][tallposisjon+1]=c;
		}
		else{
			kort[i][tallposisjon]=tall;
			kort[i][tallposisjon+1]=c;
		}
		antallIkort[i]++;


		var a = i+1;
		var divId = "kort"+a+"-"+antallIkort[i];

		var a = i+1;
		$("#kort"+a).append("<div id='"+divId+"'><img src ='./pics/"+tall+c+".png'  height='auto' width='100%'></div>");

		if(antallIkort[i]==1){
			$("#"+divId+"").css({
				"border-radius":"15px",
				"z-index": ""+antallIkort[i]+"", 
				"position": "absolute", 
				"top": ""+0+"px",  
				"width":"100%"
			});
		}
		else {
			cardBefore = "kort"+a+"-"+(antallIkort[i]-1);
			cardBeforeTop = $("#"+cardBefore+"").css("top");
			cardBeforeTop = cardBeforeTop.slice(0,-2);
			cardBeforeTop = parseInt(cardBeforeTop);

			$("#"+divId+"").css({
				"z-index": ""+antallIkort[i]+"", 
				"position": "absolute",
				"top": ""+(cardBeforeTop+lenghtBetweenCards)+"px",
				"width":"100%"
			});
		}

		allekort1.splice(nummer, 1);
	}
	resizeStack();
}

function resizeStack() {
	for (var p = 0; p<=3; p++) {
		if(antallIkort[p]>=5) {
			var pxToTop = 0;
			var smallStack = antallIkort[p] - 2;
			var normalStack = antallIkort[p];
			var normalStackStart = antallIkort[p] -1;
			for(var t = 1; t<=smallStack; t++) {
				if(antallIkort[p]>8 && t<=(antallIkort[p]/1.5)) {
					$("#kort"+(p+1)+"-"+t).css({
						"top": ""+(pxToTop)+"px"
					});	
					pxToTop = pxToTop + lenghtBetweenCardsWhenSmall/1.5;	
				}
				else {
					$("#kort"+(p+1)+"-"+t).css({
						"top": ""+(pxToTop)+"px"
					});	
					pxToTop = pxToTop + lenghtBetweenCardsWhenSmall;					
				}

			}
			for(normalStackStart; normalStackStart<=normalStack; normalStackStart++) {
					cardBefore = "kort"+(p+1)+"-"+(normalStackStart-1);
					cardBeforeTop = $("#"+cardBefore+"").css("top");
					cardBeforeTop = cardBeforeTop.slice(0,-2);
					cardBeforeTop = parseInt(cardBeforeTop);
					$("#kort"+(p+1)+"-"+normalStackStart).css({
						"top": ""+(cardBeforeTop+lenghtBetweenCards)+"px",
					});	
					pxToTop = pxToTop + lenghtBetweenCardsWhenSmall;
			}		
		}
		else {
			var pxToTop = 0;
			for(var t = 1; t<=5; t++) {
				$("#kort"+(p+1)+"-"+t).css({
					"top": ""+(pxToTop)+"px"
				});	
				pxToTop = pxToTop + lenghtBetweenCards;
			}	
		}
	}	
}

function checkifGameWinner(){
	if(antallIkort[0] == 1 && antallIkort[1] == 1 && antallIkort[2] == 1 &&  antallIkort[3] == 1) {
		console.log("Winner!");
		$("#winnerLooserHolder").html("Winner!");
		gameWinner = true;
		setTimeout(function(){
			$("#newGame, #newGameShaddow, #winnerLooserHolder").show();
		},500);
	}
}

function checkIfGameOver(){
	var kort1 = (kort[0][(antallIkort[0]*2)-1]);
	var kort2 = (kort[1][(antallIkort[1]*2)-1]);
	var kort3 = (kort[2][(antallIkort[2]*2)-1]);
	var kort4 = (kort[3][(antallIkort[3]*2)-1]);

	if(kort1 != kort2 && kort1 != kort3 && kort1 != kort4 && kort2 != kort3 && kort2 != kort4 && kort3!= kort4 && kort1 !=undefined && kort2 !=undefined && kort3 !=undefined && kort4 !=undefined) {
		console.log("game over");
		$("#winnerLooserHolder").html("Game over");
		setTimeout(function(){
			$("#newGame, #newGameShaddow, #winnerLooserHolder").show();
		},500);
	}
}

function newGame(){

	$(".kort").html("");

	mellomlagring=[];
	allekort1=["02_of_spade","03_of_spade","04_of_spade","05_of_spade","06_of_spade","07_of_spade","08_of_spade","09_of_spade",
	"10_of_spade","11_of_spade","12_of_spade","13_of_spade","14_of_spade",
	"02_of_hearts","03_of_hearts","04_of_hearts","05_of_hearts","06_of_hearts","07_of_hearts","08_of_hearts","09_of_hearts","10_of_hearts",
	"11_of_hearts","12_of_hearts","13_of_hearts","14_of_hearts",
	"02_of_diamonds","03_of_diamonds","04_of_diamonds","05_of_diamonds","06_of_diamonds","07_of_diamonds","08_of_diamonds","09_of_diamonds",
	"10_of_diamonds","11_of_diamonds","12_of_diamonds","13_of_diamonds","14_of_diamonds",
	"02_of_clubs","03_of_clubs","04_of_clubs","05_of_clubs","06_of_clubs","07_of_clubs","08_of_clubs","09_of_clubs","10_of_clubs","11_of_clubs",
	"12_of_clubs","13_of_clubs","14_of_clubs"];

	// allekort1=["06_of_spade","07_of_spade","08_of_spade","09_of_spade","10_of_spade","11_of_spade","12_of_spade","13_of_spade","14_of_spade","06_of_hearts","07_of_hearts","08_of_hearts","09_of_hearts","10_of_hearts",
	// "11_of_hearts","12_of_hearts","13_of_hearts","14_of_hearts","06_of_diamonds","07_of_diamonds","08_of_diamonds","09_of_diamonds",
	// "10_of_diamonds","11_of_diamonds","12_of_diamonds","13_of_diamonds","14_of_diamonds","06_of_clubs","07_of_clubs","08_of_clubs","09_of_clubs","10_of_clubs","11_of_clubs",
	// "12_of_clubs","13_of_clubs","14_of_clubs"];

	// allekort1=["12_of_spade","13_of_spade","14_of_spade","12_of_hearts","13_of_hearts","14_of_hearts","12_of_diamonds","13_of_diamonds","14_of_diamonds","12_of_clubs","13_of_clubs","14_of_clubs"];

	kortNummer=0;
	kort=[[],[],[],[]];
	antallIkort=[0,0,0,0];
	card();
	runde=1;
	
	var a = $(window).height();
	hoyde = a*0.366; 
	
	$(".kort").append("<img src ='./pics/tom.png' height='auto' width='100%'>");
	$("#kortstokk,#kortstokk1").css("height","auto");
	$("#kortstokk1").html("<img src ='./pics/kortstokk48.png' height='auto' width='100%'>");
	hoydestartknapp = a*0.0389;
	$("#startpaanytt").css("height", ""+hoydestartknapp+"px");
	runde++;

}

$("#startpaanytt").click(function(){

	$("#newGame, #newGameShaddow").show();
});

$("#newGameButton").click(function(){
	gameWinner = false;
	newGame();
	$("#newGame, #newGameShaddow, #winnerLooserHolder").hide();
});

$("#newGameButtonCancel").click(function(){
	$("#newGame, #newGameShaddow, #winnerLooserHolder").hide();
});