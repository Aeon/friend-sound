var connection;


var player = {

    currentSong: undefined,
    paused: false,

    progressComplete:58,

    authcode:undefined,

    connect: function() {
        Playdar.client.start_auth();
        return;

        var url = window.location.host;
        var options = "resizable=0,height=200,width=300";
        window.open('http://localhost:60210/auth_1/?name=Toma.hk&website=http%3A%2F%2F'+url+'%2F&receiverurl=http%3A%2F%2F'+url+'%2Fplaydar_auth.html', "tomahawkLogin", options);
    },

    playdarResponses: {},

    disconnect: function() {
        window.localStorage['authcode'] = undefined;
        url = window.location.host;
        window.open('http://localhost:60210/authcodes/revoke/'+this.authcode);
        this.authcode = undefined;

    },

    showLogin: function() {

        if (Playdar.client.is_authed())
            return;


        var $div = $('<div class="tomahawk-login">Please login with Tomahawk, you only need to do this once.</div>');
    


        console.log(Playdar.client.is_authed());

        if (this.authcode === undefined)
            $div.append(Playdar.client.get_auth_link_html('Connect to Tomahawk'));
          //  $div.append("<br/><a class='btn' onclick='player.connect()'>Connect to Tomahawk</a>");
        else
            $div.append("<br/><a class='btn' onclick='player.disconnect()'>Disconnect From Tomahawk</a>");
    
        $('body').append($div);
    },

    showProgress: function() {
       
       if (this.currentSong.YTPlayer && this.currentSong.YTPlayer.getCurrentTime)
         this.currentSong.currentTime = this.currentSong.YTPlayer.getCurrentTime();

        window.embeddedAPI.postAPIMessage("ontimeupdate", {currentTime:this.currentSong.currentTime, duration:this.currentSong.duration})

        if (this.currentSong.currentTime) {
            this.progressComplete = this.currentSong.currentTime / this.currentSong.duration * 100;
        }

        if (parseInt(this.progressComplete) === 100) {
            this.pause();

            $(document).trigger("songEnded");

        }

        $('#progress_bar').width(this.progressComplete+"%");
    },

    playLoop: function() {
        if (this.paused) return;
        var that = this;
        that.showProgress();


        var t = setTimeout(function() {
            that.playLoop();
        }, 50);
    },

    beginPlayLoop: function() {
        this.progressComplete = 0;
        this.playLoop();
    },

    isPlaying: function()
    {
        return this.currentSong !== undefined && !this.paused;
    },
    pause: function()
    {
        window.embeddedAPI.postAPIMessage("onpause");

        window.document.title = window.document.title.replace("\u25B6 ","");

        $('#cover').removeClass("playing");
        this.paused = true;
        if (typeof this.currentSong.pause == "function") {
            player.currentSong.pause();
        } else {
            player.currentSong.stop();
        }
    },
    unpause: function()
    {

        window.embeddedAPI.postAPIMessage("onplay");

        window.document.title = "\u25B6 "+window.document.title.replace("\u25B6 ","");
        $('#cover').addClass("playing");
        this.paused = false;
        this.currentSong.play();
        this.beginPlayLoop();
    },

    hasTomahawk:window.localStorage['hasTomahawk'],

    checkTriggered: false,

    setTomahawkInstalled: function()
    {
        if (!Settings.hasTomahawk) {
            Settings.hasTomahawk = true;
            Settings.resolvers.unshift("tomahawk");
            Settings.save();
        }

        this.hasTomahawk = true;
        if (!this.checkTriggered) 
            $(document).trigger("tomahawkCheck");
        this.checkTriggered = true;
    },
    icon: function(type)
    {
        var typeCheck = type.replace("@", "");
        if (type != typeCheck) {
            return "http://toma.hk/img/user-avatar.png";
        }

        switch (type)
        {
            case "My Collection":
                return "http://toma.hk/img/collection.png";
                break;
            case "tomahawk":
                return "http://toma.hk/img/picto.png";
                break;
            case "Spotify":
                return "http://toma.hk/js/SpotifyMetadataResolver/spotifymetadata.png";
                break;
            case "SpotifyMetadata":
                return "http://toma.hk/js/SpotifyMetadataResolver/spotifymetadata.png";
                break;
            case "Deezer":
                return "http://toma.hk/js/DeezerResolver/deezer.png";
                break;
            case "rdio":
                return "http://toma.hk/js/RdioResolver/rdio.png";
                break;
            case "Rdio":
                return "http://toma.hk/js/RdioResolver/rdio.png";
                break;
            case "Hypemachine":
                return "http://toma.hk/js/HypeMachineResolver/hypemachine.png";
            case "Youtube":
                return "http://toma.hk/js/resolvers/youtube/content/contents/images/icon.png";
                break;
            default:
                return "http://toma.hk/js/resolvers/" + Tomahk.stringToGitName( type ) + "/content/contents/images/icon.png";
        }
    },
    play: function(uuid, inApp, resolver, result)
    {


        if ( inApp === undefined )
            inApp = false;
        if (false && Playdar.client.is_authed() && resolver !== "tomahawk") {
            //var playdar = this.playdarResponses[uuid];

            result.url = "http://localhost:60210/sid/"+result.sid;

            /*
            var result = {
                url:result.url,
                title:result.track,
                artist:result.artist
            }


            console.log(this.playdarResponses[uuid].results[0]);
            console.log(result.url);
            */
//            Playdar.player.play_stream(result.url);
            //return;
            inApp = false;
        } else {

            if (uuid === "" && player.hasTomahawk) {
                return; 
            }
            var result = Tomahk.getResult(uuid, resolver);
        }
        if ( result.url === undefined )
        {
            
            Tomahk.openTomahawk(result.title, result.artist);
            
        }
            
        if ( resolver !== undefined ) {
            $('#cover .resolver').attr( "src", player.icon( resolver ) );
            $('#cover .resolver')[0].onclick=function() {
                if (result.sourceURL)
                    window.open(result.sourceURL);
            }
        }


    
        if ( this.currentSong ) {
            this.pause();
        }
        window.embeddedAPI.postAPIMessage("onplay");
        if ( inApp && player.hasTomahawk )
        {
            $('#cover').removeClass( "playing" );
            Tomahk.openTomahawk(result.track, result.artist);
            return;
        }


        $('#cover').addClass( "playing" );
        window.document.title = "\u25B6 "+window.document.title.replace("\u25B6 ","");

        if (result.player !== undefined) {
            this.paused = false;
            var player2 = result.player;
            player2.init(result.url);
            this.currentSong = player2;
            this.currentSong.load();
            this.currentSong.play();
            this.beginPlayLoop();

            return;
        }


        
        exAudio.src = result.url;
    
        try
        {
            if ( result.externalURI !== undefined && result.externalURI === true )
            {
                if (resolver === "Spotify") {
                    Tomahk.openUrl(result.url, false);
                } else {
                    Tomahk.openUrl(result.url, true);

                }
                return false;
            }

            if (resolver === "Spotify") {
                exAudio.canUseAudio = false;
                exAudio.usingFlash = true;
            }


            this.paused = false;
            var that = this;
            this.currentSong = exAudio;

            var tryNext = function() {

            }

            if (this.currentSong.error) {
                 playNextResolver();
            } else {
                this.currentSong.onerror = function(e, msg) {
                    playNextResolver();
                }  
            }
            this.currentSong.load();
            this.currentSong.play();
            this.beginPlayLoop();

        }
        catch ( e )
        {
            try {
                exAudio.canUseAudio = false;
                exAudio.usingFlash = true;
                this.currentSong.load();
                this.currentSong.play();
                this.beginPlayLoop();
            } catch ( e ) {
                console.log(e);
                alert( "failed: " + e );
                return false;
            }
            
        }
    },
    init: function()
    {
        if ( window.localStorage !== undefined )
        {
            if (window.localStorage['hasTomahawk'] === true) {
                this.setTomahawkInstalled();
            } else {
                this.hasTomahawk=undefined;
                $(document).trigger("tomahawkCheck");
                player.checkTriggered = true;
            }
        }
    }
}

if (window.localStorage['hasTomahawk'] !== undefined && (window.localStorage['hasTomahawk'] == true || window.localStorage['hasTomahawk'] == "true")) {
    player.hasTomahawk = true;
}

if (window.localStorage['authcode'] !== undefined) {
    player.authcode = window.localStorage['authcode'];
    if (player.authcode === "undefined") {
        player.authcode = undefined;
    }
}

player.init();
if (player.hasTomahawk != undefined && !player.checkTriggered) {
    $(document).trigger("tomahawkCheck");

    player.checkTriggered = true;
}

$(document).bind("songEnded", function() {
    if (top !== self) {
     
        window.embeddedAPI.postAPIMessage("onended");
        
    }
});


window.embeddedAPI = {
    player: player,
    parentObj: undefined,
    postAPIMessage: function(action, argv) {
        window.embeddedAPI.ready(function() {
            window.parent.postMessage({action:action,args:argv, connection:connection}, "*");
        });
    },
    loaded: false,
    onready: [],
    ready: function(cb) {
        if (cb === undefined) {
            window.embeddedAPI.loaded = true;
            for (var i = 0, len = window.embeddedAPI.onready.length; i < len; i++) {
                var fn = window.embeddedAPI.onready[i];
                fn();
            }
            return;
        }
        if (window.embeddedAPI.loaded) {
            cb();
        } else {
            window.embeddedAPI.onready.push(cb);
        }
    },
    play: function(resolver) {
        if (resolver === undefined)
            $('#cover a').click();
        else {
            
            $('.small_resolver_icon[data-resolver="'+resolver+'"]').click();
        }

    },
    seek: function (time) {
        player.currentSong.currentTime = time;
        if (player.currentSong.setCurrentTime) {
            player.currentSong.setCurrentTime(time);
        }

    },
    resolverFound: function(resolver, result) {
        window.embeddedAPI.ready(function() {
            window.embeddedAPI.postAPIMessage("onResolverFound", [resolver.settings.name, result.track, result.artist]);
        });

    },
    foundResolvers: function() {
        var arr = [];
        $('#singleResultsList .small_resolver_icon').each(function(){
            arr.push($(this).data("resolver"));
        });
        return arr;
    },
    pause: function() {
        $('#cover a').click();
    }
}



if (top !== self) {
    

    function receiveMessage(event)
    {
      

        if (event.data.action === undefined) {
             


        }
        if (event.data.action == "connect") {

            connection = event.data.connection;
            //window.parent.postMessage(window.embeddedAPI, "*");
        } else if (event.data.action == "apiready") {
            window.embeddedAPI.ready();
//            connection = event.data.connection;
            //window.parent.postMessage(window.embeddedAPI, "*");
        } 
        else {
            if (event.data.connection == connection && top !== self && event.data.action) {
                var method = window.embeddedAPI[event.data.action];
                if (typeof method === "function") {
                    method(event.data.args);
                }
                else {
                }
            }
        }
    
    }
    

    window.addEventListener("message", receiveMessage, false);

}
