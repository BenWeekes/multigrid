var AgoraRTCUtils = (function () {
  var AdjustFrequency = 500; // ms between checks
  var MinFPSPercent = 90;
  var MinBitratePercent = 75;

  var _autoAdjustInterval;
  var _publishClient;
  var _currentProfile = 1;
  var _fpsLowObserved = 0;
  var _brLowObserved = 0;
  var _brHighObserved = 0;
  var _profiles = [
                  { id: "180p", width: 320, height: 180, frameRate: 24, bitrateMin: 60, bitrateMinDesired: 100, bitrateMax: 400 },
                  { id: "360p", width: 640, height: 360, frameRate: 24, bitrateMin: 100, bitrateMinDesired: 250, bitrateMax: 900 },
                  { id: "720p", width: 1280, height: 720, frameRate: 24, bitrateMin: 200, bitrateMinDesired: 600, bitrateMax: 1800 },
                  ];

  // private methods
  function isIOS() {
    return (/iPhone|iPad|iPod/i.test(navigator.userAgent))
  }

  function autoAdjustResolution() {
    videoStats = _publishClient.getLocalVideoStats();

    var profile = _profiles[_currentProfile];
    var sendBitratekbps = Math.floor(videoStats.sendBitrate / 1000);
    if (videoStats.sendFrameRate < (profile.frameRate * MinFPSPercent / 100)) {
      _fpsLowObserved++;
    } else {
      _fpsLowObserved = 0;
    }

    if (sendBitratekbps < profile.bitrateMinDesired) {
      _brLowObserved++;
    } else {
      _brLowObserved = 0;
    }

    if (sendBitratekbps > profile.bitrateMax * MinBitratePercent / 100) {
      _brHighObserved++;
    } else {
      _brHighObserved = 0;
    }

    console.log("AA width:"+videoStats.sendResolutionWidth+", height:"+videoStats.sendResolutionHeight+", fps:" + videoStats.sendFrameRate + ", br_kbps:" + sendBitratekbps + ", bad_fps:" + _fpsLowObserved + ", bad_br:" + _brLowObserved + ", good_br:" + _brHighObserved+" ios="+isIOS());

    if (_fpsLowObserved>10 || _brLowObserved>10) {
      changeProfile(_currentProfile - 1); // reduce profile
    }

    if (_fpsLowObserved == 0 && _brLowObserved == 0 && _brHighObserved > 10 && _currentProfile < _profiles.length - 1) {
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
      //changeProfile(_currentProfile);
      _autoAdjustInterval = setInterval(() => {
        autoAdjustResolution();
      }, AdjustFrequency);
    },
    stopAutoAdjustResolution: function () {
      clearInterval(_autoAdjustInterval);
    },
    isIOS: function () {
      return isIOS();
    },

    publicMethod2: function () {
    }
  };
})();