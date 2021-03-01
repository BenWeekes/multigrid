/******************************************************************************
 * Application: InfiniteScrollingApp sample code
 * Author: Shankara Dash Shivagana
 * Company: Agora.io
 * Date: Feb 23rd
 * Description: 
 *
 *****************************************************************************/
class AgoraMultiChanelApp
{
  //C'tor: initialize Agora and Angular.
  constructor()
  {
    this.appId =  getParameterByName("appid") || "20b7c51ff4c644ab80cf5a4e646b0537";
    this.token = null;
    // 1 Client corresponds to 1 channel so 4 clients
    this.maxClients = 4;
    this.maxUsersPerChannel = 16;
    this.maxVideoTiles = getParameterByName("maxVideoTiles") || 4;
    this.numVideoTiles = 0;
    // We'll keep track of one client object per Agora channel to join.
    this.clients = [];
    this.numClients = 0;
    // We'll track channel state (i.e. remote users).
    this.channels = [];
    this.numChannels = 0;
    this.baseChannelName = "SA-MULTITEST";
    // Seperate video and audio tracks we can manage seperately.
    this.localAudioTrack = null;
    this.localVideoTrack = null;
    // All clients will share the same config.
    this.clientConfig = {mode: "rtc", codec: "h264"};
    
    this.createClients();
    this.joinChannels();
  }

  createClients()
  {
    let i = 0;
    // Create the max number of client objects.
    for(i; i < this.maxClients; i++)
    {
      this.clients[i] = AgoraRTC.createClient(this.clientConfig);
      let currentClient = this.clients[i];
      let currentIndex = i;

      /* Each client object will need the same event handlers. */
      // Add the remote publish event
      //this.clients[i].on("iiuser-published",this.userPublished);

      this.clients[i].on("user-published", 
                         async (user, mediaType) => {

   
        // Track the users in the current channel. 
        this.channels[currentIndex].users[user.uid.toString()] = user;
 
	// if video and no more tiles allowed for this device then don't subscribe or add a tile  for the 

	// It is not always a good idea to display all the videos on a device
	// We need to play all the audio - most of which will be muted anyway
	
        if(mediaType === "video") {
	  if (this.numVideoTiles<this.maxVideoTiles && !document.getElementById(user.uid.toString())) {
	    this.numVideoTiles++;
	    const playerDomDiv = document.createElement("div");
	    playerDomDiv.id = user.uid.toString();
	    playerDomDiv.className = "remote_video";
		// click to expand and subscribe to high quality
	    playerDomDiv.onclick = function() { 
		      if (!document.fullscreenElement) {
		    	document.getElementById(user.uid.toString()).requestFullscreen(); 
            		currentClient.setRemoteVideoStreamType(user.uid, 0);
                     } else {
                        if (document.exitFullscreen) {
                          document.exitFullscreen();
            		  currentClient.setRemoteVideoStreamType(user.uid, 1);
                        }
		     }
	    };
	    document.body.append(playerDomDiv);
	  }
	  if (document.getElementById(user.uid.toString())) {
            console.log(" ### SUBSCRIBING IN CHANNEL " + this.channels[currentIndex].name + ", TO USER " + user.uid.toString() + ", TO " + mediaType);
            await currentClient.subscribe(user, mediaType);
            console.log(" ### SUBSCRIBED IN CHANNEL " + this.channels[currentIndex].name + ", TO USER " + user.uid.toString() + ", TO " + mediaType);
            this.channels[currentIndex].videoSubscriptions[user.uid.toString()] = user;
            // playerDomDiv.id 
            user.videoTrack.play(user.uid.toString());
	    // allow stream to fallback to audio only when congested
            currentClient.setStreamFallbackOption(user.uid, 2);
	    // 1 is for low quality
            currentClient.setRemoteVideoStreamType(user.uid, 1);
	  }
	  this.updateUILayout();
	}
	else if(mediaType === "audio")
        {
          await currentClient.subscribe(user, mediaType);
          this.channels[currentIndex].audioSubscriptions[user.uid.toString()] = user;
          user.audioTrack.play();
        }

      });
   
      // and remote unpublish event.
	// unpublished is called when users mute. Best not to remove them and instead 
      this.clients[i].on("user-unpublished", 
                         async (user, mediaType) => {
        if(mediaType === "video")
        {
          console.log("### UNSUBSCRIBED USER " + user.uid.toString() + 
                      " FROM VIDEO ###");
          //const playerDomDiv = document.getElementById(user.uid);
          //playerDomDiv.remove();
          delete this.channels[currentIndex].videoSubscriptions[user.uid.toString()] ;
        }

        if(mediaType === "audio")
        {
          console.log("### UNSUBSCRIBED USER " + user.uid.toString() +
                      "FROM AUDIO ###");
          delete this.channels[currentIndex].audioSubscriptions[user.uid.toString()] ;
        }

        //Remove the user from the current channel tracking data.
        // don't remove from page until they leave the channel completely
        // delete this.channels[currentIndex].users[user.uid.toString()];
      });   

   	this.clients[i].on("user-left", 
                         async (user) => {
          const playerDomDiv = document.getElementById(user.uid);
          if (playerDomDiv) {
          	playerDomDiv.remove();
		this.numVideoTiles--;
		  updateUILayout() ;
		// add another video tile now? 
		// find first audio with no video - need a list to push/pop
		//call the shared function to subscribe to it
	  }
         //Remove the user from the current channel tracking data.
         delete this.channels[currentIndex].users[user.uid.toString()];
      });   

    }

    this.numClients = i;
  }

  userPublished(user, mediaType) 
	{
   
        // Track the users in the current channel. 
        this.channels[currentIndex].users[user.uid.toString()] = user;
 
	// if video and no more tiles allowed for this device then don't subscribe or add a tile  for the 

	// It is not always a good idea to display all the videos on a device
	// We need to play all the audio - most of which will be muted anyway
	
        if(mediaType === "video") {
	  if (this.numVideoTiles<this.maxVideoTiles && !document.getElementById(user.uid.toString())) {
	    this.numVideoTiles++;
	    const playerDomDiv = document.createElement("div");
	    playerDomDiv.id = user.uid.toString();
	    playerDomDiv.className = "remote_video";
		// click to expand and subscribe to high quality
	    playerDomDiv.onclick = function() { 
		      if (!document.fullscreenElement) {
		    	document.getElementById(user.uid.toString()).requestFullscreen(); 
            		currentClient.setRemoteVideoStreamType(user.uid, 0);
                     } else {
                        if (document.exitFullscreen) {
                          document.exitFullscreen();
            		  currentClient.setRemoteVideoStreamType(user.uid, 1);
                        }
		     }
	    };
	    document.body.append(playerDomDiv);
	  }
	  if (document.getElementById(user.uid.toString())) {
            console.log(" ### SUBSCRIBING IN CHANNEL " + this.channels[currentIndex].name + ", TO USER " + user.uid.toString() + ", TO " + mediaType);
             currentClient.subscribe(user, mediaType);
            console.log(" ### SUBSCRIBED IN CHANNEL " + this.channels[currentIndex].name + ", TO USER " + user.uid.toString() + ", TO " + mediaType);
            this.channels[currentIndex].videoSubscriptions[user.uid.toString()] = user;
            // playerDomDiv.id 
            user.videoTrack.play(user.uid.toString());
	    // allow stream to fallback to audio only when congested
            currentClient.setStreamFallbackOption(user.uid, 2);
	    // 1 is for low quality
            currentClient.setRemoteVideoStreamType(user.uid, 1);
	  }
	  this.updateUILayout();
	}
	else if(mediaType === "audio")
        {
           currentClient.subscribe(user, mediaType);
          this.channels[currentIndex].audioSubscriptions[user.uid.toString()] = user;
          user.audioTrack.play();
        }

  }

  async joinChannels() 
  {
    let tempUid = 0;
    let tempChannelName = "";
    let i = 0;
    // Join one channel for each client object.
    for(i; i < this.numClients; i++)
    {
      tempChannelName = this.baseChannelName + i.toString();
      console.log("### TRYING TO JOIN: " + tempChannelName + " ###");
      tempUid = await this.clients[i].join(this.appId, 
                                           tempChannelName, 
                                           this.token, null);
      console.log("### JOINED: " + tempChannelName + " ###");
      // We'll use this to track channel state.
      this.channels[i] = {name: tempChannelName, users: [], videoSubscriptions: [], audioSubscriptions: []};
    }
    this.numChannels = i;
  }

  //
  async publishVideoToChannel(cameraId, publishToIndex) 
  {
    // If we're currently capturing, unpublish and stop the track.
    if(this.localVideoTrack != null)
    {
      console.log("### UNPUBLISHED VIDEO! ###");

      await this.clients[publishToIndex].unpublish(this.localVideoTrack);
      this.localVideoTrack.stop();
    }

    // Create a new track and publish.
    this.localVideoTrack = await AgoraRTC.createCameraVideoTrack( { 
      cameraId: cameraId, 
      encoderConfig: "240p",
    } );

        this.clients[publishToIndex].enableDualStream().then(() => {
                console.log("Enable Dual stream success!");
        }).catch(err => {
                console.log(err);
        })

     this.clients[publishToIndex].setLowStreamParameter({birate:200, framerate:30, height:180, width:320});

    await this.clients[publishToIndex].publish(this.localVideoTrack);
    console.log("### PUBLISHED VIDEO VIDEO TO " + publishToIndex + "! ###");
  }

  //
  async publishAudioToChannel(microphoneId, publishToIndex)
  {
    // If we're currently capturing, unpublish and stop the track.
    if(this.localAudioTrack != null)
    {
      console.log("### UNPUBLISHED AUDIO! ###");
      await this.clients[publishToIndex].unpublish(this.localAudioTrack);
      this.localAudioTrack.stop();
    }

    // Create a new track and publish.
    this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack( { 
      microphoneId: microphoneId, 
    } );
    await this.clients[publishToIndex].publish(this.localAudioTrack);
    console.log("### PUBLISHED AUDIO TO " + publishToIndex + "! ###");
  }

  // Returns the index of the first client object with an open channel.
  getFirstOpenChannel()
  {
    let tempCount = 0;
    for(let i = 0; i < this.channels.length; i++)
    {
      tempCount = Object.keys(this.channels[i].users).length;
      console.log("### CHECKING CHANNEL " + this.channels[i].name +
      ", WHICH HAS " + tempCount + 
      " USERS IN IT.");
      if(tempCount < this.maxUsersPerChannel)
        return(i);
    }
  }

  setRemoteVolumes(vol) {
    for(var i=0; i < this.numClients; i++)
    {
        var client=this.clients[i];
	var ua=client._users;
	if (ua)
		ua.forEach(element =>  element.audioTrack ? element.audioTrack.setVolume(vol) : 0);
    }
  }

  logNetworkQuality() {

    var renderFrameRate=0;
    var renderFrameRateCount=0;
    var freezeRate;
    for(var i=0; i < this.numClients; i++)
    {
        var client=this.clients[i];
	var channel=this.channels[i];
	if (!this.channels[i]) {
		continue;
	}
	var videoSubscriptions=this.channels[i].videoSubscriptions;
	var audioSubscriptions=this.channels[i].audioSubscriptions;
	var ls=client.getLocalVideoStats();
        var as=client.getLocalAudioStats();
        var ras=client.getRemoteAudioStats();
        var rvs=client.getRemoteVideoStats();
	    //searchObj(client);
	if (rvs) {
		
		var rvskeys=Object.keys(rvs);
		//console.log(rvskeys);
		for (var k=0; k<rvskeys.length; k++) {
			//console.log(	rvs[rvskeys[k]]);
			//console.log("freezeRate "+ rvs[rvskeys[k]]["freezeRate"]);
			//console.log("renderFrameRate "+ rvs[rvskeys[k]]["renderFrameRate"]);
			//console.log("packetLossRate "+ rvs[rvskeys[k]]["packetLossRate"]);
			//console.log("totalFreezeTime "+ rvs[rvskeys[k]]["totalFreezeTime"]);
			//console.log(rvs[rvskeys[k]]);
			renderFrameRate=rvs[rvskeys[k]]["renderFrameRate"]+renderFrameRate;
			renderFrameRateCount++;
		}
		if (rvs[Object.keys(rvs)[0]]) {
			//rvs
//			console.log(Object.keys(rvs)[0]);
//			console.log(Object.keys(rvs).length);
//			console.log("client "+i+" "+rvs[Object.keys(rvs)[0]]);
//			console.log(rvs[Object.keys(rvs)[0]]);
		}
	}
    }
	if (renderFrameRateCount>0) {
		renderFrameRate=Math.floor(renderFrameRate/renderFrameRateCount);
	}

	document.getElementById("renderFrameRate").innerHTML="renderFrameRate "+renderFrameRate;

	console.log("avg renderFrameRate "+renderFrameRate);
  }

    updateUILayout() {
	console.log(" updateUILayout ");
	var body = document.body, html = document.documentElement;
	//var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	//var width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
	var height = window.innerHeight; // body.offsetHeight; //  Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	var width = window.innerWidth; // body.offsetWidth; // Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
	//console.log(" updateUILayout height="+height+" "+width);
	var cells = document.getElementsByClassName('remote_video');
	var toolbar_height=document.getElementById("toolbar").offsetHeight;
	toolbar_height=toolbar_height+100;

	var grid_padding=0;
	var grid_height=height-toolbar_height-grid_padding;
	var grid_width=width-grid_padding;

	// we have an area to display in
	// we have a number of cells
	// try a simple fit
	var grid_area=grid_width*grid_height;
	var cell_area=grid_area/this.numVideoTiles;
	var cell_width=Math.sqrt(cell_area*(16/9));
	var cell_height=cell_area/cell_width;
	var cols=Math.floor(grid_width/cell_width);
	var rows=this.numVideoTiles/cols;
	if ( (rows*cell_height) > grid_height) {
		cell_height=grid_height/rows;
		cell_width=cell_height*(16/9);
	}

	console.log("cell_area="+cell_area+" this.numClients="+this.numVideoTiles+" grid_width="+grid_width+" grid_height="+grid_height+" grid_area="+grid_area+" cell_width="+cell_width+" cell_height="+cell_height);
        	
  	for(var i = 0; i < cells.length; i++) {
    		cells[i].style.width = cell_width+'px';
    		cells[i].style.height = cell_height+'px';
  	}
}

}

function initializeAngularController()
{
    /* Initialize the AngularJS controller for the Camera select box. */
    angularApp.controller('multiChannelCtrl', function($scope) {

    // Define the event handler for when the user selects a camera.
    $scope.changeSelectedCamera = function() 
    {
      console.log("### SELECTED NEW CAMERA: " + 
                  $scope.cameraSelect.name + " ###");
      // Define the target client/channel we want to publish into.
      let targetClientIndex = agoraApp.getFirstOpenChannel();
      agoraApp.publishVideoToChannel($scope.cameraSelect.value, 
                                     targetClientIndex);
    }

    // Define the event handler for when the user selects a microphone.
    $scope.changeSelectedMicrophone = function() 
    {
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
          tempNames.cameras.push({ name: devices[index].label, 
                                   value: devices[index].deviceId });
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
          tempNames.microphones.push({ name: devices[index].label, 
                                       value: devices[index].deviceId } );
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
function fullscreen(id) {
	alert("o"+id);
	//document.getElementById(id.toString()).requestFullscreen();
}

function resizeGrid(){
	console.log("resize "+agoraApp.numClients);
	agoraApp.updateUILayout();
}

function searchObj (obj, query) {

    for (var key in obj) {
        var value = obj[key];

        if (typeof value === 'object') {
            searchObj(value, query);
        }

	if (key.toLowerCase().indexOf("peer")>-1)
       		console.log('property=' + key + ' value=' + value);

    }

}

window.addEventListener('resize', resizeGrid);
  setInterval(() => {
	agoraApp.logNetworkQuality();
  }, 100);
