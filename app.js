/******************************************************************************
 * Application: Grid View Demo
 * Author: Shankara Dash Shivagana & Ben Weekes
 * Company: Agora.io
 * Date: Feb 23rd
 * Description: 
 *
 *****************************************************************************/
class AgoraMultiChanelApp {
  //C'tor: initialize Agora and Angular.
  constructor() {

    // String Constants
    this.VAD = "VAD";
    this.VIDEO = "video";
    this.AUDIO = "audio";

    // Page Parameters
    this.appId = getParameterByName("appid") || "20b7c51ff4c644ab80cf5a4e646b0537";
    this.baseChannelName = getParameterByName("channelBase") || "SA-MULTITEST";
    this.maxVideoTiles = getParameterByName("maxVideoTiles") || (isMobile() ? 6 : 64);
    this.maxAudioSubscriptions = getParameterByName("maxAudioSubscriptions") || 6;

    this.minVideoAllowedSubs = getParameterByName("minVideoAllowedSubs") || 0;
    this.minAudioAllowedSubs = getParameterByName("minAudioAllowedSubs") || 3;
    this.allowedVideoSubs=this.minVideoAllowedSubs;
    this.allowedAudioSubs=this.minAudioAllowedSubs;

    this.token = null;
    // Each agora client connects to one Agora channel
    this.maxClients = 4;
    this.maxUsersPerChannel = 16;
    this.numVideoTiles = 0;

    this.videoSubscriptions = {};
    this.audioSubscriptions = {};
    this.videoPublishers = {};
    this.audioPublishers = {};
    this.userMap = {};

    // first in list is more imporant person 
    this.videoPublishersByPriority = [];
    this.audioPublishersByPriority = [];

    // first in list corresponds to grid cell 0
    this.videoSubscribersBySlot = []; // on screen
    this.audioSubscribersBySlot = [];

    this.MinFPSToIncreaseSubs = 23;
    this.MaxFPSToDecreaseSubs = 10;
    this.NumRenderExceed = 0;

    // We'll keep track of one client object per Agora channel to join.
    this.clients = [];
    this.myUid = [];
    this.myPublishClient;
    this.numClients = 0;
    this.numChannels = 0;
    // Seperate video and audio tracks we can manage seperately.
    this.localAudioTrack = null;
    this.localVideoTrack = null;
    // All clients will share the same config.
    this.clientConfig = { mode: "rtc", codec: "h264" };


    // RTM
    this.rtmClient;
    this.rtmUid;
    this.rtmChannelName;
    this.rtmChannel;

    // VAD
    this.MaxAudioSamples = 400;
    this.MaxBackgroundNoiseLevel = 30;
    this.SilenceOffeset = 10;
    this.audioSamplesArr = [];
    this.audioSamplesArrSorted = [];
    this.exceedCount = 0;
    this.exceedCountThreshold = 2;
    this.vadUid;
    this.vadSend = 0;
    this.vadSendWait = 2 * 1000;

    this.createClients();
    this.joinChannels();
  }


  createClients() {
    let i = 0;
    // Create the max number of client objects.
    for (i; i < this.maxClients; i++) {
      this.clients[i] = AgoraRTC.createClient(this.clientConfig);
      let currentClient = this.clients[i];

      /* Each client object will need the same event handlers. */
      // Add the remote publish event

      // When a remote user publishes he will be added to a list of publishers
      // A separate mechanism will decide who to subscribe to from that list
      // Ideally it would be everyone but that is not possible on low end devices and poor networks
      // If someone is subscribed to for audio (because unumted) then they should also be subscribed to for video
      // We may want specific users (instructor) to always be subscribed to.
      // The best way to quickly detect client issues (due to either cpu or network) is the average renderFrameRate which is instantly impacted if either the network or cpu is not keeping up

      this.clients[i].on("user-published", async (user, mediaType) => {
        var uid_string = user.uid.toString();
	console.error(" adding user "+uid_string);
        this.userMap[uid_string] = user;

        if (mediaType === this.VIDEO) {
          this.videoPublishers[uid_string] = currentClient;
          delete this.videoSubscriptions[uid_string];
  
          // check not already in the priority array
          this.removeUidFromArray(this.videoPublishersByPriority, uid_string);
          // new publishers go on the end of the list in terms of page priority 
          // audio priority will influence video priority but remote users may not be publishing any audio
  
          var index = this.audioPublishersByPriority.indexOf(uid_string);
          if (index > -1) {
            this.videoPublishersByPriority.splice(index, 0, uid_string);
          } else {
            this.videoPublishersByPriority.push(uid_string);
          }
        }
        else if (mediaType === this.AUDIO) {
          this.audioPublishers[uid_string] = currentClient;
          delete this.audioSubscriptions[uid_string];
          // check not  already in the priority array
          this.removeUidFromArray(this.audioPublishersByPriority, uid_string);
          // default order will be chronological but this will be rearranged using the VAD
          this.audioPublishersByPriority.push(uid_string);
        }

      });


      // unpublished is called when users mute. Best not to remove them from UI completely
      this.clients[i].on("user-unpublished", async (user, mediaType) => {
        var uid_string = user.uid.toString();
	console.warn("user-unpublished "+uid_string);
        if (mediaType === this.VIDEO) {
          delete this.videoPublishers[uid_string];
          delete this.videoSubscriptions[uid_string];
          this.removeUidFromArray(this.videoPublishersByPriority, uid_string);
        }
        else if (mediaType === this.AUDIO) {
          delete this.audioPublishers[uid_string];
          delete this.audioSubscriptions[uid_string];
          this.removeUidFromArray(this.audioPublishersByPriority, uid_string);
        }
      });

      // unpublished is called when users mute. Best not to remove them from UI completely
      this.clients[i].on("stream-published", async (user, mediaType) => {
 	 var uid_string = user.uid.toString();
	 console.error("stream-published "+uid_string);
        if (mediaType === this.VIDEO) {
          delete this.videoPublishers[user.uid.toString()];
          delete this.videoSubscriptions[user.uid.toString()];
          this.removeUidFromArray(this.videoPublishersByPriority, user.uid.toString());
        }
        else if (mediaType === this.AUDIO) {
          delete this.audioPublishers[user.uid.toString()];
          delete this.audioSubscriptions[user.uid.toString()];
          this.removeUidFromArray(this.audioPublishersByPriority, user.uid.toString());
        }
      });

      // unpublished is called when users mute. Best not to remove them from UI completely
      this.clients[i].on("stream-updated", async (user, mediaType) => {
 	 var uid_string = user.uid.toString();
	 console.error("stream-updated "+uid_string);
        if (mediaType === this.VIDEO) {
          delete this.videoPublishers[user.uid.toString()];
          delete this.videoSubscriptions[user.uid.toString()];
          this.removeUidFromArray(this.videoPublishersByPriority, user.uid.toString());
        }
        else if (mediaType === this.AUDIO) {
          delete this.audioPublishers[user.uid.toString()];
          delete this.audioSubscriptions[user.uid.toString()];
          this.removeUidFromArray(this.audioPublishersByPriority, user.uid.toString());
        }
      });

      this.clients[i].on("user-left",
        async (user) => {
          delete this.videoPublishers[user.uid.toString()];
          delete this.videoSubscriptions[user.uid.toString()];
          delete this.audioPublishers[user.uid.toString()];
          delete this.audioSubscriptions[user.uid.toString()];
          this.removeUidFromArray(this.audioPublishersByPriority, user.uid.toString());
          this.removeUidFromArray(this.videoPublishersByPriority, user.uid.toString());
        });
    }
    this.numClients = i;
  }

  monitorStatistics() {
    // check real time call stats and increase, hold or decrease the number of audio/video subscriptions

    var renderFrameRate = this.getAverageRenderFrameRate();
    if ( renderFrameRate > this.MinFPSToIncreaseSubs) {
      this.NumRenderExceed++;
    }
    else if (this.dictionaryLength(this.videoSubscriptions) > 0 && renderFrameRate>=0 && renderFrameRate < this.MaxFPSToDecreaseSubs) {
      this.NumRenderExceed--;
    }

    if (this.NumRenderExceed >= 3 || this.dictionaryLength(this.videoSubscriptions) == 0 ) {
      this.NumRenderExceed = 0;
      if (this.allowedVideoSubs < this.maxVideoTiles) {
	this.allowedVideoSubs=this.dictionaryLength(this.videoSubscriptions)+1;
      }
      if (this.allowedAudioSubs < this.maxAudioSubscriptions && (this.dictionaryLength(this.audioSubscriptions)+1)>this.allowedAudioSubs) {
        this.allowedAudioSubs=this.dictionaryLength(this.audioSubscriptions)+1;
      }
    } else if (this.NumRenderExceed <= -5) {
      this.NumRenderExceed = 0;
      if (this.allowedVideoSubs > this.minVideoAllowedSubs) {
        this.allowedVideoSubs--;
      }
      if (this.allowedAudioSubs > this.minAudioAllowedSubs) {
        this.allowedAudioSubs--;
      }
    }

    //console.log("renderFrameRate "+renderFrameRate+" this.allowedAudioSubs "+this.allowedAudioSubs+" this.allowedVideoSubs "+this.allowedVideoSubs);
    this.voiceActivityDetection();
    this.manageGrid();
  }

  dictionaryLength(dict) {
    return Object.keys(dict).length
  }

  manageGrid() {

    // max slots by page
    // max slots by CPU/Network
    // audio should be priority

    // ** Video **
    // numSlots, numSubs, numPubs
    // numSlots (the number of slots on screen) is the smaller of this.maxVideoTiles or videoPublishersByPriority (numPubs)
    // allowedSubs is the number of subs allowed by the network / CPU (minVideoAllowedSubs=0)
    // numSubs is the smaller of allowedSubs and numSlots        
    var numVideoSlots = Math.min(this.maxVideoTiles, this.videoPublishersByPriority.length);
    var numVideoSubs = Math.min(this.allowedVideoSubs, numVideoSlots);
    // both of these will be 0 to self from the videoPublishersByPriority
    // page and SDK can be checked and fixed


    // video slots
    var expectedVideoSlots = {};
    for (var v = 0; v < numVideoSlots; v++) {
      // any slots not present add
      this.addVideoSlotIfNotExisting(this.videoPublishersByPriority[v]);
      // remove any slots present which should not be  
      expectedVideoSlots[this.videoPublishersByPriority[v]] = this.videoPublishersByPriority[v];
    }
    this.removeSlotsIfNotInMap(expectedVideoSlots);

    // video subs
    var expectedVideoSubs = {};
    for (var v = 0; v < numVideoSubs; v++) {
      // any slots not present add
      this.addVideoSubIfNotExisting(this.videoPublishersByPriority[v]);
      // remove any slots present which should not be  
      expectedVideoSubs[this.videoPublishersByPriority[v]] = this.videoPublishersByPriority[v];
    }
    this.removeVideoSubsIfNotInMap(expectedVideoSubs);

    // ** Audio ** 
    // numSlots is the smaller of maxAudioSubscriptions (6) and audioPublishersByPriority
    // allowedSubs is the number of subs allowed by the network / CPU (minAudioAllowedSubs=3)
    // numSubs is the smaller of allowedSubs and numSlots
    var numAudioSlots = Math.min(this.maxAudioSubscriptions, this.audioPublishersByPriority.length);
    var numAudioSubs = Math.min(this.allowedAudioSubs, numAudioSlots);

    // audio slots 
    // audio subs
    var expectedAudioSubs = {};
    for (var v = 0; v < numAudioSubs; v++) {
      // any slots not present add
      this.addAudioSubIfNotExisting(this.audioPublishersByPriority[v]);
      // remove any slots present which should not be  
      expectedAudioSubs[this.audioPublishersByPriority[v]] = this.audioPublishersByPriority[v];
    }
    //this.removeAudioSubsIfNotInMap(expectedAudioSubs);
    this.updateUILayout();
  }

  removeAudioSubsIfNotInMap(expected) {
	var that=this;
    Object.keys(this.audioSubscriptions).forEach(async function (key) {
      if (!expected[key]) {
        var user = that.userMap[key];
        var client = that.audioPublishers[key];
        await client.unsubscribe(user, that.AUDIO);
        delete that.audioSubscriptions[key];
	console.warn(" UNsubscribed to Audio "+uid_string);
      }
    });
  }

 async addAudioSubIfNotExisting(uid_string) {
    if (this.audioSubscriptions[uid_string]) {
	 //   console.warn(" already subscribed to Audio "+uid_string);
      return;
    }
    var user = this.userMap[uid_string];
    var client = this.audioPublishers[uid_string];
    await client.subscribe(user, this.AUDIO);
	    console.warn(" subscribed to Audio "+uid_string);
    this.audioSubscriptions[uid_string] = client;
    user.audioTrack.play();
  }

  async removeVideoSubsIfNotInMap(expected) {
	var that=this;
    Object.keys(this.videoSubscriptions).forEach(async function (key) {
      if (!expected[key]) {
        var user = that.userMap[key];
        var client = that.videoPublishers[key];
        await client.unsubscribe(user, that.VIDEO);
        delete that.videoSubscriptions[key];
      }
    });
  }

 async addVideoSubIfNotExisting(uid_string) {
    if (this.videoSubscriptions[uid_string]) {
      return;
    }
    var user = this.userMap[uid_string];
     if (!user) {
	     console.error("No USER "+uid_string);
     }
    var client = this.videoPublishers[uid_string];
    this.videoSubscriptions[uid_string] = client;
    await client.subscribe(user, this.VIDEO);
    // playerDomDiv.id 
    user.videoTrack.play(uid_string);
    // allow stream to fallback to audio only when congested
    client.setStreamFallbackOption(user.uid, 2);
    // 1 is for low quality
    client.setRemoteVideoStreamType(user.uid, 1);
  }

  removeSlotsIfNotInMap(expected) {
    var els = document.getElementsByClassName("remote_video");
    var that=this;
    Array.prototype.forEach.call(els, function (el) {
      if (!expected[el.id]) {
	that.numVideoTiles--;
        el.remove();
      }
    });
  }

  addVideoSlotIfNotExisting(uid_string) {
    if (!document.getElementById(uid_string)) {
      const playerDomDiv = document.createElement("div");
      playerDomDiv.id = uid_string;
      playerDomDiv.className = "remote_video";
      // click to expand and subscribe to high quality
      var that=this;
      playerDomDiv.onclick = function () {
        if (!document.fullscreenElement) {
          document.getElementById(uid_string).requestFullscreen();
          client.setRemoteVideoStreamType(that.userMap[uid_string].uid, 0);
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
            client.setRemoteVideoStreamType(that.userMap[uid_string].uid, 1);
          }
        }
      };
      document.body.append(playerDomDiv);
      this.numVideoTiles++;
    }
  }

  removeUidFromArray(array_, uid) {
    var index = array_.indexOf(uid);
    if (index > -1) {
      array_.splice(index, 1);
      return true;
    }
    return false;
  }

  promoteUidToFrontOfArrayIfPresent(array_, uid) {
    if (this.removeUidFromArray(array_, uid)) {
      array_.unshift(uid);
    }
  }

  initRTM() {
    this.rtmClient = AgoraRTM.createInstance(this.appId);
    this.rtmClient.on('ConnectionStateChanged', (newState, reason) => {
      console.log('this.rtmClient connection state changed to ' + newState + ' reason: ' + reason);
    });

    this.rtmClient.login({ token: null, uid: this.rtmUid }).then(() => {
      this.rtmChannel = this.rtmClient.createChannel(this.rtmChannelName);
      this.rtmChannel.join().then(() => {
        this.rtmChannel.on('ChannelMessage', ({ text }, senderId) => {
          this.handleRTM(senderId, text);
        });
      }).catch(error => {
        console.log('AgoraRTM client join failure', error);
      });
    }).catch(error => {
      console.log('AgoraRTM client login failure', error);
    });
  }

  handleRTM(senderId, text) {
    if (text.startsWith(this.VAD)) {
      var vadUid = text.split(":")[1];
      console.log("VAD" + senderId + " vadUid= " + vadUid);
      if (this.vadUid && document.getElementById(this.vadUid)) {
        document.getElementById(this.vadUid).classList.remove("remote_video_active");
      }

      this.vadUid = vadUid;
      if (document.getElementById(this.vadUid)) {
        document.getElementById(this.vadUid).classList.add("remote_video_active");
      }

      // this person is talking now
      // they should be in the audio publishing list
      this.promoteUidToFrontOfArrayIfPresent(this.audioPublishersByPriority, this.vadUid);
      // they might be in the video publishing list 
      this.promoteUidToFrontOfArrayIfPresent(this.videoPublishersByPriority, this.vadUid);
      // they should become top priority in both
    }
  }

  getInputLevel(track) {
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

  voiceActivityDetection() {
    if (!this.localAudioTrack) {
      return;
    }
    var audioLevel = this.getInputLevel(this.localAudioTrack); //Math.floor(this.getInputLevel(this.localAudioTrack));
    if (audioLevel <= this.MaxBackgroundNoiseLevel) {
      if (this.audioSamplesArr.length >= this.MaxAudioSamples) {
        var removed = this.audioSamplesArr.shift();
        var removedIndex = this.audioSamplesArrSorted.indexOf(removed);
        if (removedIndex > -1) {
          this.audioSamplesArrSorted.splice(removedIndex, 1);
        }
      }
      this.audioSamplesArr.push(audioLevel);
      this.audioSamplesArrSorted.push(audioLevel);
      this.audioSamplesArrSorted.sort((a, b) => a - b);
    }
    var background = Math.floor(3 * this.audioSamplesArrSorted[Math.floor(this.audioSamplesArrSorted.length / 2)] / 2);
    if (audioLevel > background + this.SilenceOffeset) {
      this.exceedCount++;
    } else {
      this.exceedCount = 0;
    }

    //console.log("audioLevel "+audioLevel+" background  "+background+" this.SilenceOffeset "+this.SilenceOffeset);
    if (this.exceedCount > this.exceedCountThreshold) {
      this.exceedCount = 0;

      if ((Date.now() - this.vadSend) > this.vadSendWait) {
        this.vadSend = Date.now();
        this.rtmChannel.sendMessage({ text: 'VAD:' + this.myUid[this.myPublishClient] }).then(() => {
          if (this.vadUid && document.getElementById(this.vadUid)) {
            document.getElementById(this.vadUid).classList.remove("remote_video_active");
          }
          console.log('AgoraRTM VAD send success VAD:' + this.myUid[this.myPublishClient]);
        }).catch(error => {
          console.log('AgoraRTM VAD send failure');
        });
      }
    } else {
      //console.log("this.exceedCount "+this.exceedCount+" this.exceedCountThreshold "+this.exceedCountThreshold);
    }

  }



  // Publishing Local Streams
  async joinChannels() {
    let tempChannelName = "";
    let i = 0;
    // Join one channel for each client object.
    for (i; i < this.numClients; i++) {
      tempChannelName = this.baseChannelName + i.toString();
      console.log("### TRYING TO JOIN: " + tempChannelName + " ###");
      this.myUid[i] = await this.clients[i].join(this.appId,
        tempChannelName,
        this.token, null);
      console.log("### JOINED: " + tempChannelName + " ###");
      // We'll use this to track channel state.
      // this.channels[i] = { name: tempChannelName, users: [], videoSubscriptions: [], audioSubscriptions: [] };
    }

    // we will use the last channel name and UID to join RTM for send/receive VAD messages

    this.rtmChannelName = tempChannelName;
    this.rtmUid = this.myUid[i - 1].toString();
    this.initRTM();
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

    this.clients[publishToIndex].setLowStreamParameter({ bitrate: 200, framerate: 30, height: 180, width: 320 });
    this.localVideoTrack.play("local-player");
    await this.clients[publishToIndex].publish(this.localVideoTrack);
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
    document.getElementById("mic_mute").disabled = false;
    document.getElementById("mic_mute").classList.add("media_buttons_enabled");
    console.log("### PUBLISHED AUDIO TO " + publishToIndex + "! ###");
  }

  // Returns the index of the first client object with an open channel.
  getFirstOpenChannel() {
    let tempCount = 0;

    if (this.myPublishClient) {
      return myPublishClient;
    }

    for (var i = 0; i < this.numClients; i++) {
      tempCount = this.clients[i]._users.length;
      console.log("### CHECKING CHANNEL " + this.clients[i]._channelName +
        ", WHICH HAS " + tempCount +
        " USERS IN IT.");
      if (tempCount < this.maxUsersPerChannel) {
        this.myPublishClient = i;
        return this.myPublishClient;
      }
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
    var renderFrameRateMinStart = 10000;
    var renderFrameRateMin = renderFrameRateMinStart;
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
            var rfr = rvs[rvskeys[k]]["renderFrameRate"];
            var dfr = rvs[rvskeys[k]]["decodeFrameRate"];

            if (rfr != dfr)
              console.error(" render " + rfr + "/" + dfr);

            renderFrameRateSum = renderFrameRateSum + rfr;
            if (rfr < renderFrameRateMin) {
              renderFrameRateMin = rfr;
            }
            renderFrameRateCount++;
          } else {
            var kko = rvs[rvskeys[k]];
            //console.log("NANNY " + rvskeys[k] + " ");
          }
        }
      }
    }
    if (renderFrameRateCount > 0) {
      renderFrameRateAvg = Math.floor(renderFrameRateSum / renderFrameRateCount);
    }
    document.getElementById("renderFrameRate").innerHTML = "Avg " + renderFrameRateAvg + " Min " + renderFrameRateMin;
    //console.log("avg renderFrameRate " + renderFrameRate);
    if (!renderFrameRateAvg) {
      //console.log("NAN renderFrameRateAvg " + renderFrameRateAvg);
    }
    if (renderFrameRateMin==renderFrameRateMinStart) {
	    return -1;
    }
    return renderFrameRateMin;
  }

  updateUILayout() {
    //console.log(" updateUILayout ");
    var body = document.body, html = document.documentElement;
    var height = window.innerHeight;
    var width = window.innerWidth;

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
    if (document.getElementById(this.vadUid)) {
      document.getElementById(this.vadUid).classList.add("remote_video_active");
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

function toggleMic() {
  if (!agoraApp.localAudioTrack) {
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
  agoraApp.updateUILayout();
}

function isMobile() {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
}

window.addEventListener('resize', resizeGrid);

setInterval(() => {
  agoraApp.monitorStatistics();
}, 100);
