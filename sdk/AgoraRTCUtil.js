var AgoraRTCUtils = (function () {
  var AdjustFrequency = 500; // ms between checks
  var MinFPSPercent = 90;

  var _autoAdjustInterval;
  var _publishClient;
  var _currentProfile = 0;
  var _fpsLowObserved = 0;
  var _brLowObserved = 0;
  var _brHighObserved = 0;
  var _profiles = [
                 // { id: "180p", width: 320, height: 180, frameRate: 24, bitrateMin: 60, bitrateMinDesired: 100, bitrateMax: 500 },
                 { id: "360p_1", width: 640, height: 360, frameRate: 24, bitrateMin: 120, moveDownThreshold: 120, moveUpThreshold: 600, bitrateMax: 1000 }, 
                 { id: "360p_2", width: 640, height: 360, frameRate: 24, bitrateMin: 400, moveDownThreshold: 450, moveUpThreshold: 750, bitrateMax: 1000 },
                  { id: "720p", width: 1280, height: 720, frameRate: 24, bitrateMin: 600, moveDownThreshold: 650, moveUpThreshold: 1200, bitrateMax: 1800 },

                //  { id: "1080p", width: 1920, height: 1080, frameRate: 24, bitrateMin: 600, bitrateMinDesired: 1200, bitrateMax: 3600 },
                  ];

  // private methods
  function isIOS() {
    return (/iPhone|iPad|iPod/i.test(navigator.userAgent))
  }

  function autoAdjustResolution() {
    // real time video stats
    videoStats = _publishClient.getLocalVideoStats();

    var profile = _profiles[_currentProfile];
    var sendBitratekbps = Math.floor(videoStats.sendBitrate / 1000);

    // check encoding FPS not too low
    if (videoStats.sendFrameRate && videoStats.sendFrameRate>0 && videoStats.sendFrameRate < (profile.frameRate * MinFPSPercent / 100)) {
      _fpsLowObserved++;
    } else {
      _fpsLowObserved = 0;
    }

    // check outbound bitrate not too low for this resolution
    if (videoStats.sendResolutionWidth > 0 && sendBitratekbps < profile.moveDownThreshold) {
      _brLowObserved++;
    } else {
      _brLowObserved = 0;
    }

    // see if performing well enough to increase profile
    if (videoStats.sendResolutionWidth == profile.width && sendBitratekbps > profile.moveUpThreshold) {
      _brHighObserved++;
    } else {
      _brHighObserved = 0;
    }

    // log details
    console.log("AutoAdjustAlgo profile:"+_currentProfile+", width:"+videoStats.sendResolutionWidth+", height:"+videoStats.sendResolutionHeight+", fps:" + videoStats.sendFrameRate + ", br_kbps:" + sendBitratekbps + ", bad_fps:" + _fpsLowObserved + ", bad_br:" + _brLowObserved + ", good_br:" + _brHighObserved+" ios="+isIOS());

    // after 5 seconds of bad
    if (_fpsLowObserved>10 || _brLowObserved>10) {
      changeProfile(_currentProfile - 1); // reduce profile
    }

    // after about 5 seconds of very good
    if (_fpsLowObserved == 0 && _brLowObserved == 0 && _brHighObserved > 6 && _currentProfile < _profiles.length - 1) {
      changeProfile(_currentProfile + 1); // increase profile
    }
  }

  function changeProfile(profileInd) {
    if (profileInd < 0 || profileInd >= _profiles.length)
      return;
    _currentProfile = profileInd;
    _brLowObserved = 0;
    _brHighObserved = 0;
    _fpsLowObserved = 0;
    var profile = _profiles[profileInd];
    console.log("CHANGING PROFILE  " + _currentProfile);
    _publishClient._highStream.videoTrack.setEncoderConfiguration({ width: profile.width, height: profile.height, frameRate: profile.frameRate, bitrateMin: profile.bitrateMin, bitrateMax: profile.bitrateMax });
  }

  return { // public interface
    startAutoAdjustResolution: function (client) {
      _publishClient = client;
      _currentProfile = 1;
      _autoAdjustInterval = setInterval(() => {
        autoAdjustResolution();
      }, AdjustFrequency);
    },
    stopAutoAdjustResolution: function () {
      clearInterval(_autoAdjustInterval);
    },
    changeUp: function () {
      changeProfile(_currentProfile + 1); // increase profile
    },
    changeDown: function () {
      changeProfile(_currentProfile - 1); // reduce profile
    },
    isIOS: function () {
      return isIOS();
    },

    publicMethod2: function () {
    }
  };
})();