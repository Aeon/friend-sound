var MD5=function(string){function RotateLeft(lValue,iShiftBits){return lValue<<iShiftBits|lValue>>>32-iShiftBits}function AddUnsigned(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=lX&2147483648;lY8=lY&2147483648;lX4=lX&1073741824;lY4=lY&1073741824;lResult=(lX&1073741823)+(lY&1073741823);if(lX4&lY4)return lResult^2147483648^lX8^lY8;if(lX4|lY4)if(lResult&1073741824)return lResult^3221225472^lX8^lY8;else return lResult^1073741824^lX8^lY8;else return lResult^lX8^lY8}function F(x,y,z){return x&y|~x&z}function G(x,
y,z){return x&z|y&~z}function H(x,y,z){return x^y^z}function I(x,y,z){return y^(x|~z)}function FF(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function GG(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function HH(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function II(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,
c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)}function ConvertToWordArray(string){var lWordCount;var lMessageLength=string.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-lNumberOfWords_temp1%64)/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-lByteCount%4)/4;lBytePosition=lByteCount%4*8;lWordArray[lWordCount]=lWordArray[lWordCount]|
string.charCodeAt(lByteCount)<<lBytePosition;lByteCount++}lWordCount=(lByteCount-lByteCount%4)/4;lBytePosition=lByteCount%4*8;lWordArray[lWordCount]=lWordArray[lWordCount]|128<<lBytePosition;lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray}function WordToHex(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=lValue>>>lCount*8&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=
WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2)}return WordToHexValue}function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128)utftext+=String.fromCharCode(c);else if(c>127&&c<2048){utftext+=String.fromCharCode(c>>6|192);utftext+=String.fromCharCode(c&63|128)}else{utftext+=String.fromCharCode(c>>12|224);utftext+=String.fromCharCode(c>>6&63|128);utftext+=String.fromCharCode(c&63|128)}}return utftext}
var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string=Utf8Encode(string);x=ConvertToWordArray(string);a=1732584193;b=4023233417;c=2562383102;d=271733878;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,3614090360);d=FF(d,a,b,c,x[k+1],S12,3905402710);c=FF(c,d,a,b,x[k+2],S13,606105819);b=FF(b,c,d,a,x[k+3],S14,3250441966);a=FF(a,b,c,d,x[k+4],S11,4118548399);d=FF(d,
a,b,c,x[k+5],S12,1200080426);c=FF(c,d,a,b,x[k+6],S13,2821735955);b=FF(b,c,d,a,x[k+7],S14,4249261313);a=FF(a,b,c,d,x[k+8],S11,1770035416);d=FF(d,a,b,c,x[k+9],S12,2336552879);c=FF(c,d,a,b,x[k+10],S13,4294925233);b=FF(b,c,d,a,x[k+11],S14,2304563134);a=FF(a,b,c,d,x[k+12],S11,1804603682);d=FF(d,a,b,c,x[k+13],S12,4254626195);c=FF(c,d,a,b,x[k+14],S13,2792965006);b=FF(b,c,d,a,x[k+15],S14,1236535329);a=GG(a,b,c,d,x[k+1],S21,4129170786);d=GG(d,a,b,c,x[k+6],S22,3225465664);c=GG(c,d,a,b,x[k+11],S23,643717713);
b=GG(b,c,d,a,x[k+0],S24,3921069994);a=GG(a,b,c,d,x[k+5],S21,3593408605);d=GG(d,a,b,c,x[k+10],S22,38016083);c=GG(c,d,a,b,x[k+15],S23,3634488961);b=GG(b,c,d,a,x[k+4],S24,3889429448);a=GG(a,b,c,d,x[k+9],S21,568446438);d=GG(d,a,b,c,x[k+14],S22,3275163606);c=GG(c,d,a,b,x[k+3],S23,4107603335);b=GG(b,c,d,a,x[k+8],S24,1163531501);a=GG(a,b,c,d,x[k+13],S21,2850285829);d=GG(d,a,b,c,x[k+2],S22,4243563512);c=GG(c,d,a,b,x[k+7],S23,1735328473);b=GG(b,c,d,a,x[k+12],S24,2368359562);a=HH(a,b,c,d,x[k+5],S31,4294588738);
d=HH(d,a,b,c,x[k+8],S32,2272392833);c=HH(c,d,a,b,x[k+11],S33,1839030562);b=HH(b,c,d,a,x[k+14],S34,4259657740);a=HH(a,b,c,d,x[k+1],S31,2763975236);d=HH(d,a,b,c,x[k+4],S32,1272893353);c=HH(c,d,a,b,x[k+7],S33,4139469664);b=HH(b,c,d,a,x[k+10],S34,3200236656);a=HH(a,b,c,d,x[k+13],S31,681279174);d=HH(d,a,b,c,x[k+0],S32,3936430074);c=HH(c,d,a,b,x[k+3],S33,3572445317);b=HH(b,c,d,a,x[k+6],S34,76029189);a=HH(a,b,c,d,x[k+9],S31,3654602809);d=HH(d,a,b,c,x[k+12],S32,3873151461);c=HH(c,d,a,b,x[k+15],S33,530742520);
b=HH(b,c,d,a,x[k+2],S34,3299628645);a=II(a,b,c,d,x[k+0],S41,4096336452);d=II(d,a,b,c,x[k+7],S42,1126891415);c=II(c,d,a,b,x[k+14],S43,2878612391);b=II(b,c,d,a,x[k+5],S44,4237533241);a=II(a,b,c,d,x[k+12],S41,1700485571);d=II(d,a,b,c,x[k+3],S42,2399980690);c=II(c,d,a,b,x[k+10],S43,4293915773);b=II(b,c,d,a,x[k+1],S44,2240044497);a=II(a,b,c,d,x[k+8],S41,1873313359);d=II(d,a,b,c,x[k+15],S42,4264355552);c=II(c,d,a,b,x[k+6],S43,2734768916);b=II(b,c,d,a,x[k+13],S44,1309151649);a=II(a,b,c,d,x[k+4],S41,4149444226);
d=II(d,a,b,c,x[k+11],S42,3174756917);c=II(c,d,a,b,x[k+2],S43,718787259);b=II(b,c,d,a,x[k+9],S44,3951481745);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD)}var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase()};

window.tomahkAPI = {

    connection: undefined,

    server: "",
    //server: "http://localhost:8888",
    setAPI: function(api) {
        console.log(api);
    },

    Track: function(title, artist, options) {
        var connection = parseInt(Math.random() * 100000000000000000000000000000000)+title+artist;
        connection = MD5(connection);
        var Obj;
    	Obj = {
    		player:undefined,
    		api:undefined,
    		iframe:undefined,
            connection:connection,
    		config:{},
    		title: title,
    		artist: artist,
            resolvers:[],
            play: function(resolver) {
                this.method("play",resolver)
            },
            pause: function() {
                this.method("pause")
            },
            seek: function(time) {
                this.method("seek", time)
            },
            method: function(action, args) {
                Obj.iframe.contentWindow.postMessage({action:action,args:args, connection:connection}, "*");
            }
    	};

    	



    	var defaults = {
    		width:300,
    		height:300,
            autoplay:0,
            disabledResolvers:[
            ],
    		handlers: {
    			onload: function(api) {
                    Obj.method("connect");
    				Obj.api = api;
    				Obj.api.parentObj = Obj;
    				Obj.player = Obj.api.player;
                    Obj.config.handlers.onloaded();
                    Obj.method("ready");

    			},
                onloaded: function() {
                },
    			onended: function() {
    			},
                onResolverFound: function(result) {
                    result = result+"";
                    result = result.split(",");
                    var resolver = result[0];
                    result = {

                        track:result[1],
                        artist:result[2]
                    }
                    Obj.resolvers.push(resolver);
                    if (Obj.resolvers.length == 1) {
                        Obj.config.handlers.onplayable();
                    }
                    Obj.config.handlers.onresolved(resolver, result);
                },
                onresolved: function(resolver, result) {

                },
                onplayable: function() {

                },
                onplay: function() {

                },
                onpause: function() {

                },
                ontimeupdate: function(timeupdate) {
                  console.log(timeupdate);
                }
    		}
    	}

    	Obj.config = defaults;

        var generateUrl = function() {
            return window.tomahkAPI.server+"/embed.html?artist="+encodeURIComponent(artist)+"&title="+encodeURIComponent(title)+"&disabled="+Obj.config.disabledResolvers.join(",")+"&autoplay="+Obj.config.autoplay;
        }



        function receiveMessage(event)
        {
            if (event.data.action == "connect") {
                window.embeddedAPI.connection = event.data.connection;
                return;
            }
            if (event.data.connection == Obj.connection) {
                console.log()
                var method = Obj.config.handlers[event.data.action];
                method(event.data.args);
            }
        }
        
        window.addEventListener("message", receiveMessage, false);

        for (var i in options) {
            if (i === "handlers") {
                for (var j in options[i]) {
                    Obj.config[i][j] = options[i][j];
                }
            } else {
                Obj.config[i] = options[i];
            }
        }

        Obj.iframe = document.createElement("IFRAME"); 
        
   		Obj.iframe.style.width = Obj.config.width+"px"; 
   		Obj.iframe.style.height = Obj.config.height+"px"; 
        Obj.iframe.style.border ="0";
   		Obj.iframe.onload = Obj.config.handlers.onload;
        Obj.iframe.setAttribute("src", generateUrl()); 

        Obj.render = function() {
            return Obj.iframe;
        }


        return Obj;
    },

    songEnded: function(data) {
    	console.log(data);
    	alert("songEnded");
    }
}

