/******************************************************************************
 * Application: InfiniteScrollingApp sample code
 * Author: Shankara Dash Shivagana
 * Company: Agora.io
 * Date: Feb 23rd
 * Description: 
 *
 *****************************************************************************/
class AgoraMultiChanelApp {
  //C'tor: initialize Agora and Angular.
  constructor() {
    this.appId = getParameterByName("appid") || "20b7c51ff4c644ab80cf5a4e646b0537";
    this.token = null;
    // 1 Client corresponds to 1 channel so 4 clients
    this.maxClients = 4;
    this.maxUsersPerChannel = 16;
    this.maxVideoTiles = getParameterByName("maxVideoTiles") || 64;
    this.numVideoTiles = 0;
    this.maxAudioSubscriptions = getParameterByName("maxAudioSubscriptions") || 6;
    this.videoSubscriptions = {};
    this.audioSubscriptions = {};
    this.videoPublishers = {};
    this.audioPublishers = {};
    this.userMap = {};
    this.VIDEO="video";
    this.AUDIO="audio";
    this.MinFPSToIncreaseSubs=23;
    this.MaxFPSToDecreaseSubs=20;
    this.NumRenderExceed=0;

    // We'll keep track of one client object per Agora channel to join.
    this.clients = [];
    this.numClients = 0;
    // We'll track channel state (i.e. remote users).
    //this.channels = [];
    this.numChannels = 0;
    this.baseChannelName = "SA-MULTITEST";
    // Seperate video and audio tracks we can manage seperately.
    this.localAudioTrack = null;
    this.localVideoTrack = null;
    // All clients will share the same config.
    this.clientConfig = { mode: "rtc", codec: "h264" };

    this.createClients();
    this.joinChannels();
  }

  createClients() {
    let i = 0;
    // Create the max number of client objects.
    for (i; i < this.maxClients; i++) {
      this.clients[i] = AgoraRTC.createClient(this.clientConfig);
      let currentClient = this.clients[i];
      //let currentIndex = i;

      /* Each client object will need the same event handlers. */
      // Add the remote publish event

      // When a remote user publishes he will be added to a list of publishers
      // A separate mechanism will decide who to subscribe to from that list
      // Ideally it would be everyone but that is not possible on low end devices and poor networks
      // If someone is subscribed to for audio (because unumted) then they should also be subscribed to for video
      // We may want specific users (instructor) to always be subscribed to.
      // The best way to quickly detect client issues (due to either cpu or network) is the average renderFrameRate which is instantly impacted if either the network or cpu is not keeping up


      this.clients[i].on("user-published", async (user, mediaType) => {
        //this.channels[currentIndex].users[user.uid.toString()] = user;
        this.userMap[user.uid.toString()] = user;
        if (mediaType === this.VIDEO) {
          this.videoPublishers[user.uid.toString()] = currentClient;
        }
        else if (mediaType === this.AUDIO) {
          this.audioPublishers[user.uid.toString()] = currentClient;
        }

      });

      // and remote unpublish event.
      // unpublished is called when users mute. Best not to remove them and instead 
      this.clients[i].on("user-unpublished", async (user, mediaType) => {
        if (mediaType === this.VIDEO) {
          delete this.videoPublishers[user.uid.toString()];
          delete this.videoSubscriptions[user.uid.toString()];
        }
        else if (mediaType === this.AUDIO) {
          delete this.audioPublishers[user.uid.toString()];
          delete this.audioSubscriptions[user.uid.toString()];
        }
      });

      this.clients[i].on("user-left",
        async (user) => {
          const playerDomDiv = document.getElementById(user.uid);
          if (playerDomDiv) {
		  console.log(" USER LEFT REMOVE ");
            playerDomDiv.remove();
            this.numVideoTiles--;
            this.updateUILayout();
          }

          delete this.videoPublishers[user.uid.toString()];
          delete this.videoSubscriptions[user.uid.toString()];
          delete this.audioPublishers[user.uid.toString()];
          delete this.audioSubscriptions[user.uid.toString()];
        });

    }
    this.numClients = i;
  }

  handleSubscriptions() {
    var renderFrameRate = this.getAverageRenderFrameRate();

    if ( renderFrameRate >  this.MinFPSToIncreaseSubs) {
      this.NumRenderExceed++;
    }
    else if (this.dictionaryLength(this.videoSubscriptions)> 0 && renderFrameRate < this.MaxFPSToDecreaseSubs) {
      this.NumRenderExceed--;
    }
    
    if (this.NumRenderExceed>=3 || this.dictionaryLength(this.videoSubscriptions)==0) {
      this.NumRenderExceed=0;
      this.increaseSubs();
      this.updateUILayout();
    } else if (this.NumRenderExceed<=-3) {
      this.NumRenderExceed=0;
      this.reduceSubs();
      this.updateUILayout();
    }
  }

  dictionaryLength(dict) {
  return Object.keys(dict).length
 }

  getPubWhereNoSub(pubs,subs) {
    //Object.keys(dict).length
    var pubkeys = Object.keys(pubs);
    for (var p = 0; p < pubkeys.length; p++) {
      if (!subs[pubkeys[p]]) {
        return pubkeys[p];
      }
    }
  }

  getAnySub(subs) {
    var subkeys = Object.keys(subs);
    return subkeys[0];
  }

  getLastSub(subs) {
    var subkeys = Object.keys(subs);
    return subkeys[subkeys.length-1];
  }


  increaseSubs() {
    // Add 1 audio and 1 video sub if available
    // Do we have audio pubs for unfilled audio subs?
    // Do we have video pubs for unfilled video subs?
    //dictionaryLength(this.videoSubscriptions);

    var uid=this.getPubWhereNoSub(this.videoPublishers, this.videoSubscriptions);
    if (uid) {
      var client=this.videoPublishers[uid];
      this.addSubscription(client,this.userMap[uid],this.VIDEO);
    }


    uid=this.getPubWhereNoSub(this.audioPublishers, this.audioSubscriptions);
    if (uid) {
      var client=this.audioPublishers[uid];
      this.addSubscription(client,this.userMap[uid],this.AUDIO);
    }

    // video pubs which are not subs
    //if (this.numVideoTiles < this.maxVideoTiles && !document.getElementById(user.uid.toString())) {

    // Ensure the video subs match the audio subs 

   // this.maxVideoTiles = getParameterByName("maxVideoTiles") || 4;
   // this.maxAudioSubscriptions = getParameterByName("maxAudioSubscriptions") || 6;
   // this.numVideoTiles < this.maxVideoTiles && 
  }

  async addSubscription(client, user, mediaType) {
    if (mediaType === this.VIDEO) {
      if (!document.getElementById(user.uid.toString())) {
        this.numVideoTiles++;
        const playerDomDiv = document.createElement("div");
        playerDomDiv.id = user.uid.toString();
        playerDomDiv.className = "remote_video";
        // click to expand and subscribe to high quality
        playerDomDiv.onclick = function () {
          if (!document.fullscreenElement) {
            document.getElementById(user.uid.toString()).requestFullscreen();
            client.setRemoteVideoStreamType(user.uid, 0);
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
              client.setRemoteVideoStreamType(user.uid, 1);
            }
          }
        };
        document.body.append(playerDomDiv);
      }
      if (document.getElementById(user.uid.toString())) {
        console.log(" ### SUBSCRIBING IN CHANNEL " + client._channelName + ", TO USER " + user.uid.toString() + ", TO " + mediaType);
        await client.subscribe(user, mediaType);
        this.videoSubscriptions[user.uid.toString()] = client;
        console.log(" ### SUBSCRIBED IN CHANNEL " + client._channelName + ", TO USER " + user.uid.toString() + ", TO " + mediaType);
        // playerDomDiv.id 
        user.videoTrack.play(user.uid.toString());
        // allow stream to fallback to audio only when congested
        client.setStreamFallbackOption(user.uid, 2);
        // 1 is for low quality
        client.setRemoteVideoStreamType(user.uid, 1);
      }

    }
    else if (mediaType === this.AUDIO) {
      await client.subscribe(user, mediaType);
      this.audioSubscriptions[user.uid.toString()] = client;
      user.audioTrack.play();
    }

  }

  reduceSubs() {
    console.log(" ### REDUCE SUB " );
    var uid=this.getLastSub(this.videoSubscriptions);
    if (uid) {
      var client=this.videoPublishers[uid];
      this.removeSubscription(client,this.userMap[uid],this.VIDEO);
    }
    uid=this.getAnySub(this.audioSubscriptions);
    if (uid) {
      var client=this.audioPublishers[uid];
      this.removeSubscription(client,this.userMap[uid],this.AUDIO);
    }
  }

  async removeSubscription(client, user, mediaType) {

    if (mediaType === this.VIDEO) {
        await client.unsubscribe(user, mediaType);
        delete this.videoSubscriptions[user.uid.toString()]; 
    }
    else if (mediaType === this.AUDIO) {
      await client.unsubscribe(user, mediaType);
      delete this.audioSubscriptions[user.uid.toString()] ;
    }

  }


  // Publishing Local Streams
  async joinChannels() {
    let tempUid = 0;
    let tempChannelName = "";
    let i = 0;
    // Join one channel for each client object.
    for (i; i < this.numClients; i++) {
      tempChannelName = this.baseChannelName + i.toString();
      console.log("### TRYING TO JOIN: " + tempChannelName + " ###");
      tempUid = await this.clients[i].join(this.appId,
        tempChannelName,
        this.token, null);
      console.log("### JOINED: " + tempChannelName + " ###");
      // We'll use this to track channel state.
      // this.channels[i] = { name: tempChannelName, users: [], videoSubscriptions: [], audioSubscriptions: [] };
    }
    this.numChannels = i;
  }

  //
  async publishVideoToChannel(cameraId, publishToIndex) {
    // If we're currently capturing, unpublish and stop the track.
    if (this.localVideoTrack != null) {
      console.log("### UNPUBLISHED VIDEO! ###");

      await this.clients[publishToIndex].unpublish(this.localVideoTrack);
      this.localVideoTrack.stop();
    }

    // Create a new track and publish.
    this.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
      cameraId: cameraId,
      encoderConfig: "240p",
    });

    this.clients[publishToIndex].enableDualStream().then(() => {
      console.log("Enable Dual stream success!");
    }).catch(err => {
      console.log(err);
    })

    this.clients[publishToIndex].setLowStreamParameter({ birate: 200, framerate: 30, height: 180, width: 320 });

    await this.clients[publishToIndex].publish(this.localVideoTrack);
    document.getElementById("cam_mute").disabled=false;
    document.getElementById("cam_mute").classList.add("media_buttons_enabled");
    console.log("### PUBLISHED VIDEO VIDEO TO " + publishToIndex + "! ###");

  }

  //
  async publishAudioToChannel(microphoneId, publishToIndex) {
    // If we're currently capturing, unpublish and stop the track.
    if (this.localAudioTrack != null) {
      console.log("### UNPUBLISHED AUDIO! ###");
      await this.clients[publishToIndex].unpublish(this.localAudioTrack);
      this.localAudioTrack.stop();
    }

    // Create a new track and publish.
    this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack({
      microphoneId: microphoneId,
    });
    await this.clients[publishToIndex].publish(this.localAudioTrack);
    document.getElementById("mic_mute").disabled=false;
    document.getElementById("mic_mute").classList.add("media_buttons_enabled");
    console.log("### PUBLISHED AUDIO TO " + publishToIndex + "! ###");
  }

  // Returns the index of the first client object with an open channel.
  getFirstOpenChannel() {
    let tempCount = 0;
//    for (let i = 0; i < this.channels.length; i++) {
    for (var i = 0; i < this.numClients; i++) {
      tempCount = this.clients[i]._users.length;
      console.log("### CHECKING CHANNEL " + this.clients[i]._channelName +
        ", WHICH HAS " + tempCount +
        " USERS IN IT.");
      if (tempCount < this.maxUsersPerChannel)
        return (i);
    }
  }

  setRemoteVolumes(vol) {
    for (var i = 0; i < this.numClients; i++) {
      var client = this.clients[i];
      var ua = client._users;
      if (ua)
        ua.forEach(element => element.audioTrack ? element.audioTrack.setVolume(vol) : 0);
    }
  }

  getAverageRenderFrameRate() {
    var renderFrameRateSum = 0;
    var renderFrameRateAvg = 0;
    var renderFrameRateMin = 100;
    var renderFrameRateCount = 0;
    for (var i = 0; i < this.numClients; i++) {
      var client = this.clients[i];
      if (!client._users.length) {
        continue;
      }
      var rvs = client.getRemoteVideoStats();
      if (rvs) {
        var rvskeys = Object.keys(rvs);
        for (var k = 0; k < rvskeys.length; k++) {
	  if (rvs[rvskeys[k]]["renderFrameRate"]) {
		var rfr=rvs[rvskeys[k]]["renderFrameRate"];
          	renderFrameRateSum = renderFrameRateSum+rfr;
		if (rfr<renderFrameRateMin) {
		    renderFrameRateMin=rfr;
		}
          	renderFrameRateCount++;
	  } else {
		  var kko=rvs[rvskeys[k]];
		 console.log("NANNY "+rvskeys[k]+" ");
	  }
        }
      }
    }
    if (renderFrameRateCount > 0) {
      renderFrameRateAvg = Math.floor(renderFrameRateSum / renderFrameRateCount);
    }
    document.getElementById("renderFrameRate").innerHTML = "Avg " + renderFrameRateAvg+" Min "+renderFrameRateMin;
    //console.log("avg renderFrameRate " + renderFrameRate);
    if (!renderFrameRateAvg) {
    	console.log("NAN renderFrameRateAvg " + renderFrameRateAvg);
    }
    return renderFrameRateMin;
  }

  updateUILayout() {
    //console.log(" updateUILayout ");
    var body = document.body, html = document.documentElement;
    //var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    //var width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
    var height = window.innerHeight; // body.offsetHeight; //  Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    var width = window.innerWidth; // body.offsetWidth; // Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );

    var cells = document.getElementsByClassName('remote_video');
    var toolbar_height = document.getElementById("toolbar").offsetHeight;
    toolbar_height = toolbar_height + 100;

    var grid_padding = 0;
    var grid_height = height - toolbar_height - grid_padding;
    var grid_width = width - grid_padding;

    // we have an area to display in
    // we have a number of cells
    // try a simple fit
    var grid_area = grid_width * grid_height;
    var cell_area = grid_area / this.numVideoTiles;
    var cell_width = Math.sqrt(cell_area * (16 / 9));
    var cell_height = cell_area / cell_width;
    var cols = Math.floor(grid_width / cell_width);
    var rows = this.numVideoTiles / cols;
    if ((rows * cell_height) > grid_height) {
      cell_height = grid_height / rows;
      cell_width = cell_height * (16 / 9);
    }

    //console.log("cell_area=" + cell_area + " this.numClients=" + this.numVideoTiles + " grid_width=" + grid_width + " grid_height=" + grid_height + " grid_area=" + grid_area + " cell_width=" + cell_width + " cell_height=" + cell_height);

    for (var i = 0; i < cells.length; i++) {
      cells[i].style.width = cell_width + 'px';
      cells[i].style.height = cell_height + 'px';
    }
  }

}

function toggleCam() {
   if (!agoraApp.localVideoTrack) {
	   alert("Please select a camera from the list");
	   return;
   }
   if (agoraApp.localVideoTrack._enabled) {
	agoraApp.localVideoTrack.setEnabled(false);
   	document.getElementById("cam_mute").classList.remove("media_buttons_enabled");
   }
   else {
	agoraApp.localVideoTrack.setEnabled(true);
   	document.getElementById("cam_mute").classList.add("media_buttons_enabled");
   }
}

function getInputLevel(track) {
      var analyser = track._source.analyserNode;
      const bufferLength = analyser.frequencyBinCount;
      var data = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(data);
      var values = 0;
      var average;
      var length = data.length;
      for (var i = 0; i < length; i++) {
          values += data[i];
      }
      average = Math.floor(values / length);
      return average;
}


function toggleMic() {
   if (!agoraApp.localVideoTrack) {
	   alert("Please select a mic from the list");
	   return;
   }

   if (agoraApp.localAudioTrack._enabled) {
	agoraApp.localAudioTrack.setEnabled(false);
   	document.getElementById("mic_mute").classList.remove("media_buttons_enabled");
   }
   else {
	agoraApp.localAudioTrack.setEnabled(true);
   	document.getElementById("mic_mute").classList.add("media_buttons_enabled");
   }

}


function initializeAngularController() {
  /* Initialize the AngularJS controller for the Camera select box. */
  angularApp.controller('multiChannelCtrl', function ($scope) {

    // Define the event handler for when the user selects a camera.
    $scope.changeSelectedCamera = function () {
      console.log("### SELECTED NEW CAMERA: " +
        $scope.cameraSelect.name + " ###");
      // Define the target client/channel we want to publish into.
      let targetClientIndex = agoraApp.getFirstOpenChannel();
      agoraApp.publishVideoToChannel($scope.cameraSelect.value,
        targetClientIndex);
    }

    // Define the event handler for when the user selects a microphone.
    $scope.changeSelectedMicrophone = function () {
      console.log("### SELECTED NEW MICROPHONE: " +
        $scope.microphoneSelect.name + " ###");
      let targetClientIndex = agoraApp.getFirstOpenChannel();
      agoraApp.publishAudioToChannel($scope.microphoneSelect.value,
        targetClientIndex);
    }

    let tempNames = {};
    tempNames.cameras = [];
    tempNames.microphones = [];

    // Get the camera metadata. 
    AgoraRTC.getCameras().then(devices => {
      console.log("### GOT CAMERAS ###")
      devices.forEach(function (item, index) {
        console.log(devices[index].label + " device id: " +
          devices[index].deviceId);
        // Push the metadata into our array structured for Angular.
        tempNames.cameras.push({
          name: devices[index].label,
          value: devices[index].deviceId
        });
      });

      // Update Angular's model for the select and force a view update.
      $scope.cameraNames = tempNames.cameras;
      $scope.$apply();
    });

    // Get the microphone metadata.      
    AgoraRTC.getMicrophones().then(devices => {
      console.log("### GOT MICROPHONES ###")
      devices.forEach(function (item, index) {
        console.log(devices[index].label + " device id: " +
          devices[index].deviceId);
        // Push the metadata into our array structured for Angular.
        tempNames.microphones.push({
          name: devices[index].label,
          value: devices[index].deviceId
        });
      });

      // Update Angular's model for the select and force a view update.
      $scope.microphoneNames = tempNames.microphones;
      $scope.$apply();
    });
  });
}

let agoraApp = new AgoraMultiChanelApp();
let angularApp = angular.module('multiChannelApp', []);
initializeAngularController();

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}



function resizeGrid() {
  console.log("resize " + agoraApp.numClients);
  agoraApp.updateUILayout();
}

window.addEventListener('resize', resizeGrid);

/*
setInterval(() => {
  agoraApp.checkCallStatistics();
}, 100);
*/


setInterval(() => {
  agoraApp.handleSubscriptions();
}, 200);
