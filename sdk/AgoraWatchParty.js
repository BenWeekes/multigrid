class AgoraWatchParty {

    /*

     when a user cues a video he will take control of sharing in the channel
     if he (or anyone for now) presses stop the share session will end
     the video can be in state:

     CUE
     PLAY
     PAUSE
     STOP 


     CUE, PLAY, PAUSE will all be sent periodically for sync and new joiners

     
     the video can be in state
     play or paused 

    // it will stop any existing playouts and only he will have the controls
    // if someone joins channel in this state he needs to know
    // On pressing CUE one will start sending regular RTM which means he in control

    */

    constructor() {
        this.RTM_SEPARATOR = "###";
        this.STATE_PLAY = "PLAY";
        this.STATE_PAUSE = "PAUSE";
        this.STATE_STOP = "STOP";
        this.player;
        this.playerInit = false;
    }

    togglePlayerControls() {
        if (document.getElementById("player_container").classList.contains("hidden")) {
            document.getElementById("player_container").classList.remove("hidden");
            document.getElementById("toolbar").classList.add("headerOpenPlay");
        } else {
            document.getElementById("player_container").classList.add("hidden")
            document.getElementById("toolbar").classList.remove("headerOpenPlay");
        }
    }

    hidePlayerControls() {
        if (!document.getElementById("player_container").classList.contains("hidden")) {
            document.getElementById("player_container").classList.add("hidden")
            document.getElementById("toolbar").classList.remove("headerOpenPlay");
        }
    }

    enableShareContent() {
        if (!this.playerInit) {
            this.initWatchPlayer();
            this.playerInit = true;
        }
        document.getElementById("agoraplayer").classList.remove("hidden");
        agoraApp.enableShareContent();
    }

    disableShareContent() {
        document.getElementById("agoraplayer").classList.add("hidden");
        agoraApp.disableShareContent();
    }

    initWatchPlayer() {

        this.player = document.getElementById("agoravideoplayer");
        var that = this;
        this.player.onseeking = function () {
            console.log("onseek " + that.player.currentTime);
            that.broadcastState();
        };

        this.player.onplay = function (evt) {
            console.log("onplay " + that.player.currentTime + " " + evt);
            that.broadcastState();
        };

        this.player.onpause = function (evt) {
            console.log("onpause " + that.player.currentTime + " " + evt);
            that.broadcastState();
        };

        // only the person who cues a video will have controls
        // he will send RTM to others
        // anyone receiving RTM will stop themselves as owner and will lose controls
        // add control listen
        this.player.volume=0.7;

        setInterval(() => {
            this.broadcastState();
        }, 2000);
    }

    broadcastState() {
        if (agoraApp.hostingWatchParty) {
            this.sendStateRTM();
        }
    }

    sendStateRTM(stopped) {
        var msg = agoraApp.WATCH + this.RTM_SEPARATOR + (stopped ? this.STATE_STOP : this.player.paused) + this.RTM_SEPARATOR + document.getElementById("watchid").value + this.RTM_SEPARATOR + this.player.currentTime;
        this.sendWatchMessage(msg);
    }

    cueVideo() {
        agoraApp.stopScreensharePublish();
        agoraApp.hostingWatchParty = true;
        this.enableShareContent();
        this.player.src = document.getElementById("watchid").value;
        AgoraRTC.processExternalMediaAEC(this.player);
        this.player.pause();
        this.player.currentTime = 0;
        this.player.controls = true;
        this.sendStateRTM();
    }

    stopVideo() {
        if (!this.playerInit) {
            return;
        }
        this.hostingWatchParty = false;
        this.sendStateRTM(true);
        this.player.pause();
        this.disableShareContent();
    }

    sendWatchMessage(msg) {
        agoraApp.rtmChannel.sendMessage({ text: msg }).then(() => {
        }).catch(error => {
            console.log('AgoraRTM WATCH send failure');
        });
    }

    scrapeVideo(url) {
        $.ajax({
            url : url,
            success : function(result){
                alert(result);
            }
        });
    }

    handleRTM(text) {
        console.log(text);
        agoraApp.stopScreensharePublish();
        this.enableShareContent(); // sets player up if needed.
        agoraApp.hostingWatchParty = false; // someone else in control
        // this.player.controls = false;  
        var command = text.split(this.RTM_SEPARATOR)[1];
        var vid = text.split(this.RTM_SEPARATOR)[2];
        var playerTime = Math.round(text.split(this.RTM_SEPARATOR)[3] * 10) / 10;

        if (command === this.STATE_STOP) {
            this.player.pause();
            this.disableShareContent();
            return;
        }



        if (document.getElementById("watchid").value !== vid) {
            document.getElementById("watchid").value = vid;
        }

        if (this.player.src != vid) {
            this.player.src = vid;
        }

        // command is  set to player.paused
        if ("" + this.player.paused !== command) {
            if (this.player.paused) {
                this.player.currentTime = playerTime;
                AgoraRTC.processExternalMediaAEC(this.player);
                this.player.play();
            } else {
                this.player.pause();
            }
        }

        if (this.player.paused) {
            this.player.currentTime = playerTime;
        } else {
            // only nudge if needed
            if (Math.abs(this.player.currentTime - playerTime) > 2) {
                this.player.currentTime = playerTime + 0.2;
                console.log(" set this.player.currentTime to " + this.player.currentTime);
            }
        }

    }
}

let agoraWatchParty = new AgoraWatchParty();