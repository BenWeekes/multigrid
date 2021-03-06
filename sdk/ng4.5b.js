/**
 * AgoraWebSDK_N-v4.4.0-58-g0247fcd0 Copyright AgoraInc.
 */

/*
 Determine if an object is a Buffer

 @author   Feross Aboukhadijeh <https://feross.org>
 @license  MIT
 *****************************************************************************
 Copyright (c) Microsoft Corporation. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 this file except in compliance with the License. You may obtain a copy of the
 License at http://www.apache.org/licenses/LICENSE-2.0

 THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 MERCHANTABLITY OR NON-INFRINGEMENT.

 See the Apache Version 2.0 License for specific language governing permissions
 and limitations under the License.
*****************************************************************************/
'use strict';
!function(ub, Db) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = Db() : "function" == typeof define && define.amd ? define(Db) : (ub = "undefined" != typeof globalThis ? globalThis : ub || self).AgoraRTC = Db()
}(this, function() {
    function ub(d, f, a) {
        return d(a = {
            path: f,
            exports: {},
            require: function(a, c) {
                throw Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
            }
        }, a.exports),
        a.exports
    }
    function Db(d, f, a) {
        return (d = d.match(f)) && d.length >= a && pa(d[a], 10)
    }
    function hc(d, f, a) {
        if (d.RTCPeerConnection) {
            d = d.RTCPeerConnection.prototype;
            var b = d.addEventListener;
            d.addEventListener = function(c, d) {
                if (c !== f)
                    return b.apply(this, arguments);
                let e = b=>{
                    (b = a(b)) && d(b)
                }
                ;
                return this._eventMap = this._eventMap || {},
                this._eventMap[d] = e,
                b.apply(this, [c, e])
            }
            ;
            var c = d.removeEventListener;
            d.removeEventListener = function(a, b) {
                if (a !== f || !this._eventMap || !this._eventMap[b])
                    return c.apply(this, arguments);
                let d = this._eventMap[b];
                return delete this._eventMap[b],
                c.apply(this, [a, d])
            }
            ;
            X(d, "on" + f, {
                get() {
                    return this["_on" + f]
                },
                set(a) {
                    this["_on" + f] && (this.removeEventListener(f, this["_on" + f]),
                    delete this["_on" + f]);
                    a && this.addEventListener(f, this["_on" + f] = a)
                },
                enumerable: !0,
                configurable: !0
            })
        }
    }
    function $k(d) {
        return "boolean" != typeof d ? Error("Argument type: " + typeof d + ". Please use a boolean.") : (eg = d,
        d ? "adapter.js logging disabled" : "adapter.js logging enabled")
    }
    function al(d) {
        return "boolean" != typeof d ? Error("Argument type: " + typeof d + ". Please use a boolean.") : (fg = !d,
        "adapter.js deprecation warnings " + (d ? "disabled" : "enabled"))
    }
    function kb() {
        "object" != typeof window || eg || "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
    }
    function pd(d, f) {
        fg && console.warn(d + " is deprecated, please use " + f + " instead.")
    }
    function Eb(d) {
        let {navigator: f} = d
          , a = {
            browser: null,
            version: null
        };
        if (void 0 === d || !d.navigator)
            return a.browser = "Not a browser.",
            a;
        if (f.mozGetUserMedia)
            a.browser = "firefox",
            a.version = Db(f.userAgent, /Firefox\/(\d+)\./, 1);
        else if (f.webkitGetUserMedia || !1 === d.isSecureContext && d.webkitRTCPeerConnection && !d.RTCIceGatherer)
            a.browser = "chrome",
            a.version = Db(f.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
        else if (f.mediaDevices && f.userAgent.match(/Edge\/(\d+).(\d+)$/))
            a.browser = "edge",
            a.version = Db(f.userAgent, /Edge\/(\d+).(\d+)$/, 2);
        else {
            if (!d.RTCPeerConnection || !f.userAgent.match(/AppleWebKit\/(\d+)\./))
                return a.browser = "Not a supported browser.",
                a;
            a.browser = "safari";
            a.version = Db(f.userAgent, /AppleWebKit\/(\d+)\./, 1);
            a.supportsUnifiedPlan = d.RTCRtpTransceiver && "currentDirection"in d.RTCRtpTransceiver.prototype
        }
        return a
    }
    function gg(d) {
        var f;
        return "[object Object]" === Object.prototype.toString.call(d) ? qd(f = Z(d)).call(f, function(a, b) {
            var c = "[object Object]" === Object.prototype.toString.call(d[b]);
            let e = c ? gg(d[b]) : d[b];
            c = c && !Z(e).length;
            return void 0 === e || c ? a : Ha(a, {
                [b]: e
            })
        }, {}) : d
    }
    function hg(d, f, a) {
        let b = a ? "outbound-rtp" : "inbound-rtp"
          , c = new aa;
        if (null === f)
            return c;
        let e = [];
        return q(d).call(d, a=>{
            "track" === a.type && a.trackIdentifier === f.id && e.push(a)
        }
        ),
        q(e).call(e, a=>{
            q(d).call(d, e=>{
                e.type === b && e.trackId === a.id && function ua(a, b, c) {
                    var d;
                    b && !c.has(b.id) && (c.set(b.id, b),
                    q(d = Z(b)).call(d, d=>{
                        if (ig(d).call(d, "Id"))
                            ua(a, a.get(b[d]), c);
                        else if (ig(d).call(d, "Ids")) {
                            var e;
                            q(e = b[d]).call(e, b=>{
                                ua(a, a.get(b), c)
                            }
                            )
                        }
                    }
                    ))
                }(d, e, c)
            }
            )
        }
        ),
        c
    }
    function jg(d) {
        let f = d && d.navigator;
        if (f.mediaDevices) {
            var a = Eb(d)
              , b = function(a) {
                var b;
                if ("object" != typeof a || a.mandatory || a.optional)
                    return a;
                const c = {};
                var d;
                (q(b = Z(a)).call(b, b=>{
                    if ("require" !== b && "advanced" !== b && "mediaSource" !== b) {
                        var d = "object" == typeof a[b] ? a[b] : {
                            ideal: a[b]
                        };
                        void 0 !== d.exact && "number" == typeof d.exact && (d.min = d.max = d.exact);
                        var e = function(a, b) {
                            return a ? a + b.charAt(0).toUpperCase() + Aa(b).call(b, 1) : "deviceId" === b ? "sourceId" : b
                        };
                        if (void 0 !== d.ideal) {
                            c.optional = c.optional || [];
                            let a = {};
                            "number" == typeof d.ideal ? (a[e("min", b)] = d.ideal,
                            c.optional.push(a),
                            a = {},
                            a[e("max", b)] = d.ideal,
                            c.optional.push(a)) : (a[e("", b)] = d.ideal,
                            c.optional.push(a))
                        }
                        var g;
                        void 0 !== d.exact && "number" != typeof d.exact ? (c.mandatory = c.mandatory || {},
                        c.mandatory[e("", b)] = d.exact) : q(g = ["min", "max"]).call(g, a=>{
                            void 0 !== d[a] && (c.mandatory = c.mandatory || {},
                            c.mandatory[e(a, b)] = d[a])
                        }
                        )
                    }
                }
                ),
                a.advanced) && (c.optional = l(d = c.optional || []).call(d, a.advanced));
                return c
            }
              , c = function(c, d) {
                if (61 <= a.version)
                    return d(c);
                if ((c = JSON.parse(w(c))) && "object" == typeof c.audio) {
                    var e = function(a, b, c) {
                        b in a && !(c in a) && (a[c] = a[b],
                        delete a[b])
                    };
                    e((c = JSON.parse(w(c))).audio, "autoGainControl", "googAutoGainControl");
                    e(c.audio, "noiseSuppression", "googNoiseSuppression");
                    c.audio = b(c.audio)
                }
                if (c && "object" == typeof c.video) {
                    let g = c.video.facingMode;
                    g = g && ("object" == typeof g ? g : {
                        ideal: g
                    });
                    e = 66 > a.version;
                    if (!(!g || "user" !== g.exact && "environment" !== g.exact && "user" !== g.ideal && "environment" !== g.ideal || f.mediaDevices.getSupportedConstraints && f.mediaDevices.getSupportedConstraints().facingMode && !e)) {
                        let a;
                        if (delete c.video.facingMode,
                        "environment" === g.exact || "environment" === g.ideal ? a = ["back", "rear"] : "user" !== g.exact && "user" !== g.ideal || (a = ["front"]),
                        a)
                            return f.mediaDevices.enumerateDevices().then(e=>{
                                e = M(e).call(e, a=>"videoinput" === a.kind);
                                let h = R(e).call(e, b=>kg(a).call(a, a=>{
                                    var c;
                                    return oa(c = b.label.toLowerCase()).call(c, a)
                                }
                                ));
                                return !h && e.length && oa(a).call(a, "back") && (h = e[e.length - 1]),
                                h && (c.video.deviceId = g.exact ? {
                                    exact: h.deviceId
                                } : {
                                    ideal: h.deviceId
                                }),
                                c.video = b(c.video),
                                lg("chrome: " + w(c)),
                                d(c)
                            }
                            )
                    }
                    c.video = b(c.video)
                }
                return lg("chrome: " + w(c)),
                d(c)
            }
              , e = function(b) {
                return 64 <= a.version ? b : {
                    name: {
                        PermissionDeniedError: "NotAllowedError",
                        PermissionDismissedError: "NotAllowedError",
                        InvalidStateError: "NotAllowedError",
                        DevicesNotFoundError: "NotFoundError",
                        ConstraintNotSatisfiedError: "OverconstrainedError",
                        TrackStartError: "NotReadableError",
                        MediaDeviceFailedDueToShutdown: "NotAllowedError",
                        MediaDeviceKillSwitchOn: "NotAllowedError",
                        TabCaptureError: "AbortError",
                        ScreenCaptureError: "AbortError",
                        DeviceCaptureError: "AbortError"
                    }[b.name] || b.name,
                    message: b.message,
                    constraint: b.constraint || b.constraintName,
                    toString() {
                        return this.name + (this.message && ": ") + this.message
                    }
                }
            };
            d = function(a, b, d) {
                c(a, a=>{
                    f.webkitGetUserMedia(a, b, a=>{
                        d && d(e(a))
                    }
                    )
                }
                )
            }
            ;
            if (f.getUserMedia = ra(d).call(d, f),
            f.mediaDevices.getUserMedia) {
                var g;
                let a = ra(g = f.mediaDevices.getUserMedia).call(g, f.mediaDevices);
                f.mediaDevices.getUserMedia = function(b) {
                    return c(b, b=>a(b).then(a=>{
                        var c;
                        if (b.audio && !a.getAudioTracks().length || b.video && !a.getVideoTracks().length)
                            throw q(c = a.getTracks()).call(c, a=>{
                                a.stop()
                            }
                            ),
                            new DOMException("","NotFoundError");
                        return a
                    }
                    , a=>B.reject(e(a))))
                }
            }
        }
    }
    function mg(d) {
        d.MediaStream = d.MediaStream || d.webkitMediaStream
    }
    function ng(d) {
        if ("object" != typeof d || !d.RTCPeerConnection || "ontrack"in d.RTCPeerConnection.prototype)
            hc(d, "track", d=>(d.transceiver || X(d, "transceiver", {
                value: {
                    receiver: d.receiver
                }
            }),
            d));
        else {
            X(d.RTCPeerConnection.prototype, "ontrack", {
                get() {
                    return this._ontrack
                },
                set(a) {
                    this._ontrack && this.removeEventListener("track", this._ontrack);
                    this.addEventListener("track", this._ontrack = a)
                },
                enumerable: !0,
                configurable: !0
            });
            let f = d.RTCPeerConnection.prototype.setRemoteDescription;
            d.RTCPeerConnection.prototype.setRemoteDescription = function() {
                return this._ontrackpoly || (this._ontrackpoly = a=>{
                    var b;
                    a.stream.addEventListener("addtrack", b=>{
                        let c;
                        var g;
                        d.RTCPeerConnection.prototype.getReceivers ? c = R(g = this.getReceivers()).call(g, a=>a.track && a.track.id === b.track.id) : c = {
                            track: b.track
                        };
                        g = new Event("track");
                        g.track = b.track;
                        g.receiver = c;
                        g.transceiver = {
                            receiver: c
                        };
                        g.streams = [a.stream];
                        this.dispatchEvent(g)
                    }
                    );
                    q(b = a.stream.getTracks()).call(b, b=>{
                        let c;
                        var g;
                        d.RTCPeerConnection.prototype.getReceivers ? c = R(g = this.getReceivers()).call(g, a=>a.track && a.track.id === b.id) : c = {
                            track: b
                        };
                        g = new Event("track");
                        g.track = b;
                        g.receiver = c;
                        g.transceiver = {
                            receiver: c
                        };
                        g.streams = [a.stream];
                        this.dispatchEvent(g)
                    }
                    )
                }
                ,
                this.addEventListener("addstream", this._ontrackpoly)),
                f.apply(this, arguments)
            }
        }
    }
    function og(d) {
        if ("object" == typeof d && d.RTCPeerConnection && !("getSenders"in d.RTCPeerConnection.prototype) && "createDTMFSender"in d.RTCPeerConnection.prototype) {
            let f = function(a, b) {
                return {
                    track: b,
                    get dtmf() {
                        return void 0 === this._dtmf && ("audio" === b.kind ? this._dtmf = a.createDTMFSender(b) : this._dtmf = null),
                        this._dtmf
                    },
                    _pc: a
                }
            };
            if (!d.RTCPeerConnection.prototype.getSenders) {
                d.RTCPeerConnection.prototype.getSenders = function() {
                    var a;
                    return this._senders = this._senders || [],
                    Aa(a = this._senders).call(a)
                }
                ;
                let a = d.RTCPeerConnection.prototype.addTrack;
                d.RTCPeerConnection.prototype.addTrack = function(b, c) {
                    let d = a.apply(this, arguments);
                    return d || (d = f(this, b),
                    this._senders.push(d)),
                    d
                }
                ;
                let b = d.RTCPeerConnection.prototype.removeTrack;
                d.RTCPeerConnection.prototype.removeTrack = function(a) {
                    var c;
                    b.apply(this, arguments);
                    let d = I(c = this._senders).call(c, a);
                    var e;
                    -1 !== d && Ia(e = this._senders).call(e, d, 1)
                }
            }
            let a = d.RTCPeerConnection.prototype.addStream;
            d.RTCPeerConnection.prototype.addStream = function(b) {
                var c;
                this._senders = this._senders || [];
                a.apply(this, [b]);
                q(c = b.getTracks()).call(c, a=>{
                    this._senders.push(f(this, a))
                }
                )
            }
            ;
            let b = d.RTCPeerConnection.prototype.removeStream;
            d.RTCPeerConnection.prototype.removeStream = function(a) {
                var c;
                this._senders = this._senders || [];
                b.apply(this, [a]);
                q(c = a.getTracks()).call(c, a=>{
                    var b;
                    let c = R(b = this._senders).call(b, b=>b.track === a);
                    var d, e;
                    c && Ia(d = this._senders).call(d, I(e = this._senders).call(e, c), 1)
                }
                )
            }
        } else if ("object" == typeof d && d.RTCPeerConnection && "getSenders"in d.RTCPeerConnection.prototype && "createDTMFSender"in d.RTCPeerConnection.prototype && d.RTCRtpSender && !("dtmf"in d.RTCRtpSender.prototype)) {
            let f = d.RTCPeerConnection.prototype.getSenders;
            d.RTCPeerConnection.prototype.getSenders = function() {
                let a = f.apply(this, []);
                return q(a).call(a, a=>a._pc = this),
                a
            }
            ;
            X(d.RTCRtpSender.prototype, "dtmf", {
                get() {
                    return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null),
                    this._dtmf
                }
            })
        }
    }
    function pg(d) {
        if (d.RTCPeerConnection) {
            var f = d.RTCPeerConnection.prototype.getStats;
            d.RTCPeerConnection.prototype.getStats = function() {
                let[a,b,c] = arguments;
                if (0 < arguments.length && "function" == typeof a)
                    return f.apply(this, arguments);
                if (0 === f.length && (0 === arguments.length || "function" != typeof a))
                    return f.apply(this, []);
                let d = function(a) {
                    const b = {};
                    a = a.result();
                    return q(a).call(a, a=>{
                        var c;
                        const d = {
                            id: a.id,
                            timestamp: a.timestamp,
                            type: {
                                localcandidate: "local-candidate",
                                remotecandidate: "remote-candidate"
                            }[a.type] || a.type
                        };
                        q(c = a.names()).call(c, b=>{
                            d[b] = a.stat(b)
                        }
                        );
                        b[d.id] = d
                    }
                    ),
                    b
                }
                  , g = function(a) {
                    var b;
                    return new aa(z(b = Z(a)).call(b, b=>[b, a[b]]))
                };
                return 2 <= arguments.length ? f.apply(this, [function(a) {
                    b(g(d(a)))
                }
                , a]) : (new B((a,b)=>{
                    f.apply(this, [function(b) {
                        a(g(d(b)))
                    }
                    , b])
                }
                )).then(b, c)
            }
        }
    }
    function qg(d) {
        if ("object" == typeof d && d.RTCPeerConnection && d.RTCRtpSender && d.RTCRtpReceiver) {
            if (!("getStats"in d.RTCRtpSender.prototype)) {
                let a = d.RTCPeerConnection.prototype.getSenders;
                a && (d.RTCPeerConnection.prototype.getSenders = function() {
                    let b = a.apply(this, []);
                    return q(b).call(b, a=>a._pc = this),
                    b
                }
                );
                let b = d.RTCPeerConnection.prototype.addTrack;
                b && (d.RTCPeerConnection.prototype.addTrack = function() {
                    let a = b.apply(this, arguments);
                    return a._pc = this,
                    a
                }
                );
                d.RTCRtpSender.prototype.getStats = function() {
                    let a = this;
                    return this._pc.getStats().then(b=>hg(b, a.track, !0))
                }
            }
            if (!("getStats"in d.RTCRtpReceiver.prototype)) {
                let a = d.RTCPeerConnection.prototype.getReceivers;
                a && (d.RTCPeerConnection.prototype.getReceivers = function() {
                    let b = a.apply(this, []);
                    return q(b).call(b, a=>a._pc = this),
                    b
                }
                );
                hc(d, "track", a=>(a.receiver._pc = a.srcElement,
                a));
                d.RTCRtpReceiver.prototype.getStats = function() {
                    let a = this;
                    return this._pc.getStats().then(b=>hg(b, a.track, !1))
                }
            }
            if ("getStats"in d.RTCRtpSender.prototype && "getStats"in d.RTCRtpReceiver.prototype) {
                var f = d.RTCPeerConnection.prototype.getStats;
                d.RTCPeerConnection.prototype.getStats = function() {
                    if (0 < arguments.length && arguments[0]instanceof d.MediaStreamTrack) {
                        var a, b;
                        let c = arguments[0], d, g, h;
                        return q(a = this.getSenders()).call(a, a=>{
                            a.track === c && (d ? h = !0 : d = a)
                        }
                        ),
                        q(b = this.getReceivers()).call(b, a=>(a.track === c && (g ? h = !0 : g = a),
                        a.track === c)),
                        h || d && g ? B.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")) : d ? d.getStats() : g ? g.getStats() : B.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))
                    }
                    return f.apply(this, arguments)
                }
            }
        }
    }
    function rg(d) {
        d.RTCPeerConnection.prototype.getLocalStreams = function() {
            var a;
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {},
            z(a = Z(this._shimmedLocalStreams)).call(a, a=>this._shimmedLocalStreams[a][0])
        }
        ;
        let f = d.RTCPeerConnection.prototype.addTrack;
        d.RTCPeerConnection.prototype.addTrack = function(a, b) {
            var c;
            if (!b)
                return f.apply(this, arguments);
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            let d = f.apply(this, arguments);
            return this._shimmedLocalStreams[b.id] ? -1 === I(c = this._shimmedLocalStreams[b.id]).call(c, d) && this._shimmedLocalStreams[b.id].push(d) : this._shimmedLocalStreams[b.id] = [b, d],
            d
        }
        ;
        let a = d.RTCPeerConnection.prototype.addStream;
        d.RTCPeerConnection.prototype.addStream = function(b) {
            var c, d, e;
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            q(c = b.getTracks()).call(c, a=>{
                var b;
                if (R(b = this.getSenders()).call(b, b=>b.track === a))
                    throw new DOMException("Track already exists.","InvalidAccessError");
            }
            );
            let f = this.getSenders();
            a.apply(this, arguments);
            c = M(d = this.getSenders()).call(d, a=>-1 === I(f).call(f, a));
            this._shimmedLocalStreams[b.id] = l(e = [b]).call(e, c)
        }
        ;
        let b = d.RTCPeerConnection.prototype.removeStream;
        d.RTCPeerConnection.prototype.removeStream = function(a) {
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {},
            delete this._shimmedLocalStreams[a.id],
            b.apply(this, arguments)
        }
        ;
        let c = d.RTCPeerConnection.prototype.removeTrack;
        d.RTCPeerConnection.prototype.removeTrack = function(a) {
            var b;
            (this._shimmedLocalStreams = this._shimmedLocalStreams || {},
            a) && q(b = Z(this._shimmedLocalStreams)).call(b, b=>{
                var c;
                let d = I(c = this._shimmedLocalStreams[b]).call(c, a);
                var e;
                -1 !== d && Ia(e = this._shimmedLocalStreams[b]).call(e, d, 1);
                1 === this._shimmedLocalStreams[b].length && delete this._shimmedLocalStreams[b]
            }
            );
            return c.apply(this, arguments)
        }
    }
    function sg(d) {
        function f(a, b) {
            var c;
            let d = b.sdp;
            return q(c = Z(a._reverseStreams || [])).call(c, b=>{
                b = a._reverseStreams[b];
                d = d.replace(new RegExp(a._streams[b.id].id,"g"), b.id)
            }
            ),
            new RTCSessionDescription({
                type: b.type,
                sdp: d
            })
        }
        function a(a, b) {
            var c;
            let d = b.sdp;
            return q(c = Z(a._reverseStreams || [])).call(c, b=>{
                b = a._reverseStreams[b];
                d = d.replace(new RegExp(b.id,"g"), a._streams[b.id].id)
            }
            ),
            new RTCSessionDescription({
                type: b.type,
                sdp: d
            })
        }
        var b;
        if (d.RTCPeerConnection) {
            var c = Eb(d);
            if (d.RTCPeerConnection.prototype.addTrack && 65 <= c.version)
                return rg(d);
            var e = d.RTCPeerConnection.prototype.getLocalStreams;
            d.RTCPeerConnection.prototype.getLocalStreams = function() {
                let a = e.apply(this);
                return this._reverseStreams = this._reverseStreams || {},
                z(a).call(a, a=>this._reverseStreams[a.id])
            }
            ;
            var g = d.RTCPeerConnection.prototype.addStream;
            d.RTCPeerConnection.prototype.addStream = function(a) {
                var b;
                (this._streams = this._streams || {},
                this._reverseStreams = this._reverseStreams || {},
                q(b = a.getTracks()).call(b, a=>{
                    var b;
                    if (R(b = this.getSenders()).call(b, b=>b.track === a))
                        throw new DOMException("Track already exists.","InvalidAccessError");
                }
                ),
                this._reverseStreams[a.id]) || (b = new d.MediaStream(a.getTracks()),
                this._streams[a.id] = b,
                this._reverseStreams[b.id] = a,
                a = b);
                g.apply(this, [a])
            }
            ;
            var h = d.RTCPeerConnection.prototype.removeStream;
            d.RTCPeerConnection.prototype.removeStream = function(a) {
                this._streams = this._streams || {};
                this._reverseStreams = this._reverseStreams || {};
                h.apply(this, [this._streams[a.id] || a]);
                delete this._reverseStreams[this._streams[a.id] ? this._streams[a.id].id : a.id];
                delete this._streams[a.id]
            }
            ;
            d.RTCPeerConnection.prototype.addTrack = function(a, b) {
                var c, e, g;
                if ("closed" === this.signalingState)
                    throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");
                let h = Aa([]).call(arguments, 1);
                if (1 !== h.length || !R(c = h[0].getTracks()).call(c, b=>b === a))
                    throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");
                if (R(e = this.getSenders()).call(e, b=>b.track === a))
                    throw new DOMException("Track already exists.","InvalidAccessError");
                this._streams = this._streams || {};
                this._reverseStreams = this._reverseStreams || {};
                (c = this._streams[b.id]) ? (c.addTrack(a),
                B.resolve().then(()=>{
                    this.dispatchEvent(new Event("negotiationneeded"))
                }
                )) : (c = new d.MediaStream([a]),
                this._streams[b.id] = c,
                this._reverseStreams[c.id] = b,
                this.addStream(c));
                return R(g = this.getSenders()).call(g, b=>b.track === a)
            }
            ;
            q(b = ["createOffer", "createAnswer"]).call(b, function(a) {
                let b = d.RTCPeerConnection.prototype[a];
                d.RTCPeerConnection.prototype[a] = {
                    [a]() {
                        const a = arguments;
                        return arguments.length && "function" == typeof arguments[0] ? b.apply(this, [b=>{
                            b = f(this, b);
                            a[0].apply(null, [b])
                        }
                        , b=>{
                            a[1] && a[1].apply(null, b)
                        }
                        , arguments[2]]) : b.apply(this, arguments).then(a=>f(this, a))
                    }
                }[a]
            });
            var m = d.RTCPeerConnection.prototype.setLocalDescription;
            d.RTCPeerConnection.prototype.setLocalDescription = function() {
                return arguments.length && arguments[0].type ? (arguments[0] = a(this, arguments[0]),
                m.apply(this, arguments)) : m.apply(this, arguments)
            }
            ;
            var r = Y(d.RTCPeerConnection.prototype, "localDescription");
            X(d.RTCPeerConnection.prototype, "localDescription", {
                get() {
                    let a = r.get.apply(this);
                    return "" === a.type ? a : f(this, a)
                }
            });
            d.RTCPeerConnection.prototype.removeTrack = function(a) {
                var b;
                if ("closed" === this.signalingState)
                    throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");
                if (!a._pc)
                    throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");
                if (a._pc !== this)
                    throw new DOMException("Sender was not created by this connection.","InvalidAccessError");
                let c;
                this._streams = this._streams || {};
                q(b = Z(this._streams)).call(b, b=>{
                    var d;
                    R(d = this._streams[b].getTracks()).call(d, b=>a.track === b) && (c = this._streams[b])
                }
                );
                c && (1 === c.getTracks().length ? this.removeStream(this._reverseStreams[c.id]) : c.removeTrack(a.track),
                this.dispatchEvent(new Event("negotiationneeded")))
            }
        }
    }
    function pe(d) {
        let f = Eb(d);
        if (!d.RTCPeerConnection && d.webkitRTCPeerConnection && (d.RTCPeerConnection = d.webkitRTCPeerConnection),
        d.RTCPeerConnection) {
            var a;
            53 > f.version && q(a = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).call(a, function(a) {
                let b = d.RTCPeerConnection.prototype[a];
                d.RTCPeerConnection.prototype[a] = {
                    [a]() {
                        return arguments[0] = new ("addIceCandidate" === a ? d.RTCIceCandidate : d.RTCSessionDescription)(arguments[0]),
                        b.apply(this, arguments)
                    }
                }[a]
            });
            var b = d.RTCPeerConnection.prototype.addIceCandidate;
            d.RTCPeerConnection.prototype.addIceCandidate = function() {
                return arguments[0] ? 78 > f.version && arguments[0] && "" === arguments[0].candidate ? B.resolve() : b.apply(this, arguments) : (arguments[1] && arguments[1].apply(null),
                B.resolve())
            }
        }
    }
    function tg(d) {
        hc(d, "negotiationneeded", d=>{
            if ("stable" === d.target.signalingState)
                return d
        }
        )
    }
    function ug(d, f, a, b, c) {
        f = G.writeRtpDescription(d.kind, f);
        if (f += G.writeIceParameters(d.iceGatherer.getLocalParameters()),
        f += G.writeDtlsParameters(d.dtlsTransport.getLocalParameters(), "offer" === a ? "actpass" : c || "active"),
        f += "a=mid:" + d.mid + "\r\n",
        d.rtpSender && d.rtpReceiver ? f += "a=sendrecv\r\n" : d.rtpSender ? f += "a=sendonly\r\n" : d.rtpReceiver ? f += "a=recvonly\r\n" : f += "a=inactive\r\n",
        d.rtpSender)
            a = d.rtpSender._initialTrackId || d.rtpSender.track.id,
            d.rtpSender._initialTrackId = a,
            b = "msid:" + (b ? b.id : "-") + " " + a + "\r\n",
            f = f + ("a=" + b) + ("a=ssrc:" + d.sendEncodingParameters[0].ssrc + " " + b),
            d.sendEncodingParameters[0].rtx && (f += "a=ssrc:" + d.sendEncodingParameters[0].rtx.ssrc + " " + b,
            f += "a=ssrc-group:FID " + d.sendEncodingParameters[0].ssrc + " " + d.sendEncodingParameters[0].rtx.ssrc + "\r\n");
        return f += "a=ssrc:" + d.sendEncodingParameters[0].ssrc + " cname:" + G.localCName + "\r\n",
        d.rtpSender && d.sendEncodingParameters[0].rtx && (f += "a=ssrc:" + d.sendEncodingParameters[0].rtx.ssrc + " cname:" + G.localCName + "\r\n"),
        f
    }
    function rd(d, f) {
        var a = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: []
        }
          , b = function(a, b) {
            a = parseInt(a, 10);
            for (var c = 0; c < b.length; c++)
                if (b[c].payloadType === a || b[c].preferredPayloadType === a)
                    return b[c]
        }
          , c = function(a, c, d, f) {
            a = b(a.parameters.apt, d);
            c = b(c.parameters.apt, f);
            return a && c && a.name.toLowerCase() === c.name.toLowerCase()
        };
        return d.codecs.forEach(function(b) {
            for (var e = 0; e < f.codecs.length; e++) {
                var h = f.codecs[e];
                if (b.name.toLowerCase() === h.name.toLowerCase() && b.clockRate === h.clockRate && ("rtx" !== b.name.toLowerCase() || !b.parameters || !h.parameters.apt || c(b, h, d.codecs, f.codecs))) {
                    (h = JSON.parse(JSON.stringify(h))).numChannels = Math.min(b.numChannels, h.numChannels);
                    a.codecs.push(h);
                    h.rtcpFeedback = h.rtcpFeedback.filter(function(a) {
                        for (var c = 0; c < b.rtcpFeedback.length; c++)
                            if (b.rtcpFeedback[c].type === a.type && b.rtcpFeedback[c].parameter === a.parameter)
                                return !0;
                        return !1
                    });
                    break
                }
            }
        }),
        d.headerExtensions.forEach(function(b) {
            for (var c = 0; c < f.headerExtensions.length; c++) {
                var d = f.headerExtensions[c];
                if (b.uri === d.uri) {
                    a.headerExtensions.push(d);
                    break
                }
            }
        }),
        a
    }
    function vg(d, f, a) {
        return -1 !== {
            offer: {
                setLocalDescription: ["stable", "have-local-offer"],
                setRemoteDescription: ["stable", "have-remote-offer"]
            },
            answer: {
                setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
                setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
            }
        }[f][d].indexOf(a)
    }
    function qe(d, f) {
        var a = d.getRemoteCandidates().find(function(a) {
            return f.foundation === a.foundation && f.ip === a.ip && f.port === a.port && f.priority === a.priority && f.protocol === a.protocol && f.type === a.type
        });
        return a || d.addRemoteCandidate(f),
        !a
    }
    function Ja(d, f) {
        f = Error(f);
        return f.name = d,
        f.code = {
            NotSupportedError: 9,
            InvalidStateError: 11,
            InvalidAccessError: 15,
            TypeError: void 0,
            OperationError: void 0
        }[d],
        f
    }
    function wg(d) {
        var f;
        d = d && d.navigator;
        let a = ra(f = d.mediaDevices.getUserMedia).call(f, d.mediaDevices);
        d.mediaDevices.getUserMedia = function(b) {
            return a(b).catch(a=>B.reject(function(a) {
                return {
                    name: {
                        PermissionDeniedError: "NotAllowedError"
                    }[a.name] || a.name,
                    message: a.message,
                    constraint: a.constraint,
                    toString() {
                        return this.name
                    }
                }
            }(a)))
        }
    }
    function xg(d) {
        var f;
        "getDisplayMedia"in d.navigator && d.navigator.mediaDevices && (d.navigator.mediaDevices && "getDisplayMedia"in d.navigator.mediaDevices || (d.navigator.mediaDevices.getDisplayMedia = ra(f = d.navigator.getDisplayMedia).call(f, d.navigator)))
    }
    function re(d) {
        let f = Eb(d);
        if (d.RTCIceGatherer && (d.RTCIceCandidate || (d.RTCIceCandidate = function(a) {
            return a
        }
        ),
        d.RTCSessionDescription || (d.RTCSessionDescription = function(a) {
            return a
        }
        ),
        15025 > f.version)) {
            let a = Y(d.MediaStreamTrack.prototype, "enabled");
            X(d.MediaStreamTrack.prototype, "enabled", {
                set(b) {
                    a.set.call(this, b);
                    let c = new Event("enabled");
                    c.enabled = b;
                    this.dispatchEvent(c)
                }
            })
        }
        !d.RTCRtpSender || "dtmf"in d.RTCRtpSender.prototype || X(d.RTCRtpSender.prototype, "dtmf", {
            get() {
                return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new d.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)),
                this._dtmf
            }
        });
        d.RTCDtmfSender && !d.RTCDTMFSender && (d.RTCDTMFSender = d.RTCDtmfSender);
        let a = bl(d, f.version);
        d.RTCPeerConnection = function(b) {
            return b && b.iceServers && (b.iceServers = function(a, b) {
                let c = !1;
                return a = JSON.parse(w(a)),
                M(a).call(a, a=>{
                    if (a && (a.urls || a.url)) {
                        var b = a.urls || a.url;
                        a.url && !a.urls && pd("RTCIceServer.url", "RTCIceServer.urls");
                        let d = "string" == typeof b;
                        return d && (b = [b]),
                        b = M(b).call(b, a=>0 === I(a).call(a, "stun:") ? !1 : (a = sd(a).call(a, "turn") && !sd(a).call(a, "turn:[") && oa(a).call(a, "transport=udp")) && !c ? (c = !0,
                        !0) : a && !c),
                        delete a.url,
                        a.urls = d ? b[0] : b,
                        !!b.length
                    }
                }
                )
            }(b.iceServers, f.version),
            kb("ICE servers after filtering:", b.iceServers)),
            new a(b)
        }
        ;
        d.RTCPeerConnection.prototype = a.prototype
    }
    function yg(d) {
        !d.RTCRtpSender || "replaceTrack"in d.RTCRtpSender.prototype || (d.RTCRtpSender.prototype.replaceTrack = d.RTCRtpSender.prototype.setTrack)
    }
    function zg(d) {
        let f = Eb(d)
          , a = d && d.navigator;
        d = d && d.MediaStreamTrack;
        if (a.getUserMedia = function(b, d, g) {
            pd("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia");
            a.mediaDevices.getUserMedia(b).then(d, g)
        }
        ,
        !(55 < f.version && "autoGainControl"in a.mediaDevices.getSupportedConstraints())) {
            var b;
            let c = function(a, b, c) {
                b in a && !(c in a) && (a[c] = a[b],
                delete a[b])
            }
              , e = ra(b = a.mediaDevices.getUserMedia).call(b, a.mediaDevices);
            if (a.mediaDevices.getUserMedia = function(a) {
                return "object" == typeof a && "object" == typeof a.audio && (a = JSON.parse(w(a)),
                c(a.audio, "autoGainControl", "mozAutoGainControl"),
                c(a.audio, "noiseSuppression", "mozNoiseSuppression")),
                e(a)
            }
            ,
            d && d.prototype.getSettings) {
                let a = d.prototype.getSettings;
                d.prototype.getSettings = function() {
                    let b = a.apply(this, arguments);
                    return c(b, "mozAutoGainControl", "autoGainControl"),
                    c(b, "mozNoiseSuppression", "noiseSuppression"),
                    b
                }
            }
            if (d && d.prototype.applyConstraints) {
                let a = d.prototype.applyConstraints;
                d.prototype.applyConstraints = function(b) {
                    return "audio" === this.kind && "object" == typeof b && (b = JSON.parse(w(b)),
                    c(b, "autoGainControl", "mozAutoGainControl"),
                    c(b, "noiseSuppression", "mozNoiseSuppression")),
                    a.apply(this, [b])
                }
            }
        }
    }
    function Ag(d) {
        "object" == typeof d && d.RTCTrackEvent && "receiver"in d.RTCTrackEvent.prototype && !("transceiver"in d.RTCTrackEvent.prototype) && X(d.RTCTrackEvent.prototype, "transceiver", {
            get() {
                return {
                    receiver: this.receiver
                }
            }
        })
    }
    function se(d) {
        let f = Eb(d);
        if ("object" == typeof d && (d.RTCPeerConnection || d.mozRTCPeerConnection)) {
            var a;
            (!d.RTCPeerConnection && d.mozRTCPeerConnection && (d.RTCPeerConnection = d.mozRTCPeerConnection),
            53 > f.version) && q(a = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).call(a, function(a) {
                let b = d.RTCPeerConnection.prototype[a];
                d.RTCPeerConnection.prototype[a] = {
                    [a]() {
                        return arguments[0] = new ("addIceCandidate" === a ? d.RTCIceCandidate : d.RTCSessionDescription)(arguments[0]),
                        b.apply(this, arguments)
                    }
                }[a]
            });
            var b = d.RTCPeerConnection.prototype.addIceCandidate;
            d.RTCPeerConnection.prototype.addIceCandidate = function() {
                return arguments[0] ? 68 > f.version && arguments[0] && "" === arguments[0].candidate ? B.resolve() : b.apply(this, arguments) : (arguments[1] && arguments[1].apply(null),
                B.resolve())
            }
            ;
            var c = {
                inboundrtp: "inbound-rtp",
                outboundrtp: "outbound-rtp",
                candidatepair: "candidate-pair",
                localcandidate: "local-candidate",
                remotecandidate: "remote-candidate"
            }
              , e = d.RTCPeerConnection.prototype.getStats;
            d.RTCPeerConnection.prototype.getStats = function() {
                let[a,b,d] = arguments;
                return e.apply(this, [a || null]).then(a=>{
                    if (53 > f.version && !b)
                        try {
                            q(a).call(a, a=>{
                                a.type = c[a.type] || a.type
                            }
                            )
                        } catch (t) {
                            if ("TypeError" !== t.name)
                                throw t;
                            q(a).call(a, (b,d)=>{
                                a.set(d, Ha({}, b, {
                                    type: c[b.type] || b.type
                                }))
                            }
                            )
                        }
                    return a
                }
                ).then(b, d)
            }
        }
    }
    function Bg(d) {
        if ("object" == typeof d && d.RTCPeerConnection && d.RTCRtpSender && !(d.RTCRtpSender && "getStats"in d.RTCRtpSender.prototype)) {
            var f = d.RTCPeerConnection.prototype.getSenders;
            f && (d.RTCPeerConnection.prototype.getSenders = function() {
                let a = f.apply(this, []);
                return q(a).call(a, a=>a._pc = this),
                a
            }
            );
            var a = d.RTCPeerConnection.prototype.addTrack;
            a && (d.RTCPeerConnection.prototype.addTrack = function() {
                let b = a.apply(this, arguments);
                return b._pc = this,
                b
            }
            );
            d.RTCRtpSender.prototype.getStats = function() {
                return this.track ? this._pc.getStats(this.track) : B.resolve(new aa)
            }
        }
    }
    function Cg(d) {
        if ("object" == typeof d && d.RTCPeerConnection && d.RTCRtpSender && !(d.RTCRtpSender && "getStats"in d.RTCRtpReceiver.prototype)) {
            var f = d.RTCPeerConnection.prototype.getReceivers;
            f && (d.RTCPeerConnection.prototype.getReceivers = function() {
                let a = f.apply(this, []);
                return q(a).call(a, a=>a._pc = this),
                a
            }
            );
            hc(d, "track", a=>(a.receiver._pc = a.srcElement,
            a));
            d.RTCRtpReceiver.prototype.getStats = function() {
                return this._pc.getStats(this.track)
            }
        }
    }
    function Dg(d) {
        !d.RTCPeerConnection || "removeStream"in d.RTCPeerConnection.prototype || (d.RTCPeerConnection.prototype.removeStream = function(d) {
            var a;
            pd("removeStream", "removeTrack");
            q(a = this.getSenders()).call(a, a=>{
                var b;
                a.track && oa(b = d.getTracks()).call(b, a.track) && this.removeTrack(a)
            }
            )
        }
        )
    }
    function Eg(d) {
        d.DataChannel && !d.RTCDataChannel && (d.RTCDataChannel = d.DataChannel)
    }
    function Fg(d) {
        if ("object" == typeof d && d.RTCPeerConnection) {
            if ("getLocalStreams"in d.RTCPeerConnection.prototype || (d.RTCPeerConnection.prototype.getLocalStreams = function() {
                return this._localStreams || (this._localStreams = []),
                this._localStreams
            }
            ),
            !("addStream"in d.RTCPeerConnection.prototype)) {
                let f = d.RTCPeerConnection.prototype.addTrack;
                d.RTCPeerConnection.prototype.addStream = function(a) {
                    var b, c, d;
                    this._localStreams || (this._localStreams = []);
                    oa(b = this._localStreams).call(b, a) || this._localStreams.push(a);
                    q(c = a.getAudioTracks()).call(c, b=>f.call(this, b, a));
                    q(d = a.getVideoTracks()).call(d, b=>f.call(this, b, a))
                }
                ;
                d.RTCPeerConnection.prototype.addTrack = function(a, b) {
                    var c;
                    b && (this._localStreams ? oa(c = this._localStreams).call(c, b) || this._localStreams.push(b) : this._localStreams = [b]);
                    return f.call(this, a, b)
                }
            }
            "removeStream"in d.RTCPeerConnection.prototype || (d.RTCPeerConnection.prototype.removeStream = function(d) {
                var a, b, c;
                this._localStreams || (this._localStreams = []);
                let e = I(a = this._localStreams).call(a, d);
                if (-1 !== e) {
                    Ia(b = this._localStreams).call(b, e, 1);
                    var g = d.getTracks();
                    q(c = this.getSenders()).call(c, a=>{
                        oa(g).call(g, a.track) && this.removeTrack(a)
                    }
                    )
                }
            }
            )
        }
    }
    function Gg(d) {
        if ("object" == typeof d && d.RTCPeerConnection && ("getRemoteStreams"in d.RTCPeerConnection.prototype || (d.RTCPeerConnection.prototype.getRemoteStreams = function() {
            return this._remoteStreams ? this._remoteStreams : []
        }
        ),
        !("onaddstream"in d.RTCPeerConnection.prototype))) {
            X(d.RTCPeerConnection.prototype, "onaddstream", {
                get() {
                    return this._onaddstream
                },
                set(a) {
                    this._onaddstream && (this.removeEventListener("addstream", this._onaddstream),
                    this.removeEventListener("track", this._onaddstreampoly));
                    this.addEventListener("addstream", this._onaddstream = a);
                    this.addEventListener("track", this._onaddstreampoly = a=>{
                        var b;
                        q(b = a.streams).call(b, a=>{
                            var b;
                            (this._remoteStreams || (this._remoteStreams = []),
                            oa(b = this._remoteStreams).call(b, a)) || (this._remoteStreams.push(a),
                            b = new Event("addstream"),
                            b.stream = a,
                            this.dispatchEvent(b))
                        }
                        )
                    }
                    )
                }
            });
            let f = d.RTCPeerConnection.prototype.setRemoteDescription;
            d.RTCPeerConnection.prototype.setRemoteDescription = function() {
                let a = this;
                return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(b) {
                    var c;
                    q(c = b.streams).call(c, b=>{
                        var c;
                        (a._remoteStreams || (a._remoteStreams = []),
                        0 <= I(c = a._remoteStreams).call(c, b)) || (a._remoteStreams.push(b),
                        c = new Event("addstream"),
                        c.stream = b,
                        a.dispatchEvent(c))
                    }
                    )
                }
                ),
                f.apply(a, arguments)
            }
        }
    }
    function Hg(d) {
        if ("object" == typeof d && d.RTCPeerConnection) {
            d = d.RTCPeerConnection.prototype;
            var f = d.createOffer
              , a = d.createAnswer
              , b = d.setLocalDescription
              , c = d.setRemoteDescription
              , e = d.addIceCandidate;
            d.createOffer = function(a, b) {
                let c = f.apply(this, [2 <= arguments.length ? arguments[2] : arguments[0]]);
                return b ? (c.then(a, b),
                B.resolve()) : c
            }
            ;
            d.createAnswer = function(b, c) {
                let d = a.apply(this, [2 <= arguments.length ? arguments[2] : arguments[0]]);
                return c ? (d.then(b, c),
                B.resolve()) : d
            }
            ;
            var g = function(a, c, d) {
                a = b.apply(this, [a]);
                return d ? (a.then(c, d),
                B.resolve()) : a
            };
            d.setLocalDescription = g;
            g = function(a, b, d) {
                a = c.apply(this, [a]);
                return d ? (a.then(b, d),
                B.resolve()) : a
            }
            ;
            d.setRemoteDescription = g;
            g = function(a, b, c) {
                a = e.apply(this, [a]);
                return c ? (a.then(b, c),
                B.resolve()) : a
            }
            ;
            d.addIceCandidate = g
        }
    }
    function Ig(d) {
        let f = d && d.navigator;
        if (f.mediaDevices && f.mediaDevices.getUserMedia) {
            var a;
            d = f.mediaDevices;
            let b = ra(a = d.getUserMedia).call(a, d);
            f.mediaDevices.getUserMedia = a=>b(Jg(a))
        }
        var b;
        !f.getUserMedia && f.mediaDevices && f.mediaDevices.getUserMedia && (f.getUserMedia = ra(b = function(a, b, d) {
            f.mediaDevices.getUserMedia(a).then(b, d)
        }
        ).call(b, f))
    }
    function Jg(d) {
        return d && void 0 !== d.video ? Ha({}, d, {
            video: gg(d.video)
        }) : d
    }
    function Kg(d) {
        let f = d.RTCPeerConnection;
        d.RTCPeerConnection = function(a, b) {
            if (a && a.iceServers) {
                let b = [];
                for (let c = 0; c < a.iceServers.length; c++) {
                    let d = a.iceServers[c];
                    !d.hasOwnProperty("urls") && d.hasOwnProperty("url") ? (pd("RTCIceServer.url", "RTCIceServer.urls"),
                    d = JSON.parse(w(d)),
                    d.urls = d.url,
                    delete d.url,
                    b.push(d)) : b.push(a.iceServers[c])
                }
                a.iceServers = b
            }
            return new f(a,b)
        }
        ;
        d.RTCPeerConnection.prototype = f.prototype;
        "generateCertificate"in d.RTCPeerConnection && X(d.RTCPeerConnection, "generateCertificate", {
            get: ()=>f.generateCertificate
        })
    }
    function Lg(d) {
        "object" == typeof d && d.RTCPeerConnection && "receiver"in d.RTCTrackEvent.prototype && !d.RTCTransceiver && X(d.RTCTrackEvent.prototype, "transceiver", {
            get() {
                return {
                    receiver: this.receiver
                }
            }
        })
    }
    function Mg(d) {
        let f = d.RTCPeerConnection.prototype.createOffer;
        d.RTCPeerConnection.prototype.createOffer = function(a) {
            if (a) {
                var b, c;
                void 0 !== a.offerToReceiveAudio && (a.offerToReceiveAudio = !!a.offerToReceiveAudio);
                let d = R(b = this.getTransceivers()).call(b, a=>"audio" === a.receiver.track.kind);
                !1 === a.offerToReceiveAudio && d ? "sendrecv" === d.direction ? d.setDirection ? d.setDirection("sendonly") : d.direction = "sendonly" : "recvonly" === d.direction && (d.setDirection ? d.setDirection("inactive") : d.direction = "inactive") : !0 !== a.offerToReceiveAudio || d || this.addTransceiver("audio");
                void 0 !== a.offerToReceiveVideo && (a.offerToReceiveVideo = !!a.offerToReceiveVideo);
                b = R(c = this.getTransceivers()).call(c, a=>"video" === a.receiver.track.kind);
                !1 === a.offerToReceiveVideo && b ? "sendrecv" === b.direction ? b.setDirection ? b.setDirection("sendonly") : b.direction = "sendonly" : "recvonly" === b.direction && (b.setDirection ? b.setDirection("inactive") : b.direction = "inactive") : !0 !== a.offerToReceiveVideo || b || this.addTransceiver("video")
            }
            return f.apply(this, arguments)
        }
    }
    function td(d) {
        if (d.RTCIceCandidate && !(d.RTCIceCandidate && "foundation"in d.RTCIceCandidate.prototype)) {
            var f = d.RTCIceCandidate;
            d.RTCIceCandidate = function(a) {
                var b;
                if ("object" == typeof a && a.candidate && 0 === I(b = a.candidate).call(b, "a=") && ((a = JSON.parse(w(a))).candidate = a.candidate.substr(2)),
                a.candidate && a.candidate.length) {
                    b = new f(a);
                    a = G.parseCandidate(a.candidate);
                    let c = Ha(b, a);
                    return c.toJSON = function() {
                        return {
                            candidate: c.candidate,
                            sdpMid: c.sdpMid,
                            sdpMLineIndex: c.sdpMLineIndex,
                            usernameFragment: c.usernameFragment
                        }
                    }
                    ,
                    c
                }
                return new f(a)
            }
            ;
            d.RTCIceCandidate.prototype = f.prototype;
            hc(d, "icecandidate", a=>(a.candidate && X(a, "candidate", {
                value: new d.RTCIceCandidate(a.candidate),
                writable: "false"
            }),
            a))
        }
    }
    function Ic(d) {
        if (d.RTCPeerConnection) {
            var f = Eb(d);
            "sctp"in d.RTCPeerConnection.prototype || X(d.RTCPeerConnection.prototype, "sctp", {
                get() {
                    return void 0 === this._sctp ? null : this._sctp
                }
            });
            var a = function(a) {
                if (!a || !a.sdp)
                    return !1;
                a = G.splitSections(a.sdp);
                return a.shift(),
                kg(a).call(a, a=>{
                    var b;
                    return (a = G.parseMLine(a)) && "application" === a.kind && -1 !== I(b = a.protocol).call(b, "SCTP")
                }
                )
            }
              , b = function(a) {
                a = a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                if (null === a || 2 > a.length)
                    return -1;
                a = pa(a[1], 10);
                return a != a ? -1 : a
            }
              , c = function(a) {
                let b = 65536;
                return "firefox" === f.browser && (b = 57 > f.version ? -1 === a ? 16384 : 2147483637 : 60 > f.version ? 57 === f.version ? 65535 : 65536 : 2147483637),
                b
            }
              , e = function(a, b) {
                let c = 65536;
                "firefox" === f.browser && 57 === f.version && (c = 65535);
                a = G.matchPrefix(a.sdp, "a=max-message-size:");
                return 0 < a.length ? c = pa(a[0].substr(19), 10) : "firefox" === f.browser && -1 !== b && (c = 2147483637),
                c
            }
              , g = d.RTCPeerConnection.prototype.setRemoteDescription;
            d.RTCPeerConnection.prototype.setRemoteDescription = function() {
                if (this._sctp = null,
                "chrome" === f.browser && 76 <= f.version) {
                    var {sdpSemantics: d} = this.getConfiguration();
                    "plan-b" === d && X(this, "sctp", {
                        get() {
                            return void 0 === this._sctp ? null : this._sctp
                        },
                        enumerable: !0,
                        configurable: !0
                    })
                }
                if (a(arguments[0])) {
                    var m = b(arguments[0]);
                    d = c(m);
                    m = e(arguments[0], m);
                    let a;
                    a = 0 === d && 0 === m ? Number.POSITIVE_INFINITY : 0 === d || 0 === m ? Math.max(d, m) : Math.min(d, m);
                    d = {};
                    X(d, "maxMessageSize", {
                        get: ()=>a
                    });
                    this._sctp = d
                }
                return g.apply(this, arguments)
            }
        }
    }
    function Jc(d) {
        function f(a, c) {
            let b = a.send;
            a.send = function() {
                var d = arguments[0];
                d = d.length || d.size || d.byteLength;
                if ("open" === a.readyState && c.sctp && d > c.sctp.maxMessageSize)
                    throw new TypeError("Message too large (can send a maximum of " + c.sctp.maxMessageSize + " bytes)");
                return b.apply(a, arguments)
            }
        }
        if (d.RTCPeerConnection && "createDataChannel"in d.RTCPeerConnection.prototype) {
            var a = d.RTCPeerConnection.prototype.createDataChannel;
            d.RTCPeerConnection.prototype.createDataChannel = function() {
                let b = a.apply(this, arguments);
                return f(b, this),
                b
            }
            ;
            hc(d, "datachannel", a=>(f(a.channel, a.target),
            a))
        }
    }
    function te(d) {
        var f;
        if (d.RTCPeerConnection && !("connectionState"in d.RTCPeerConnection.prototype)) {
            var a = d.RTCPeerConnection.prototype;
            X(a, "connectionState", {
                get() {
                    return {
                        completed: "connected",
                        checking: "connecting"
                    }[this.iceConnectionState] || this.iceConnectionState
                },
                enumerable: !0,
                configurable: !0
            });
            X(a, "onconnectionstatechange", {
                get() {
                    return this._onconnectionstatechange || null
                },
                set(a) {
                    this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange),
                    delete this._onconnectionstatechange);
                    a && this.addEventListener("connectionstatechange", this._onconnectionstatechange = a)
                },
                enumerable: !0,
                configurable: !0
            });
            q(f = ["setLocalDescription", "setRemoteDescription"]).call(f, b=>{
                let c = a[b];
                a[b] = function() {
                    return this._connectionstatechangepoly || (this._connectionstatechangepoly = a=>{
                        let b = a.target;
                        if (b._lastConnectionState !== b.connectionState) {
                            b._lastConnectionState = b.connectionState;
                            let c = new Event("connectionstatechange",a);
                            b.dispatchEvent(c)
                        }
                        return a
                    }
                    ,
                    this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)),
                    c.apply(this, arguments)
                }
            }
            )
        }
    }
    function ue(d) {
        if (d.RTCPeerConnection) {
            var f = Eb(d);
            if (!("chrome" === f.browser && 71 <= f.version)) {
                var a = d.RTCPeerConnection.prototype.setRemoteDescription;
                d.RTCPeerConnection.prototype.setRemoteDescription = function(b) {
                    var c, d;
                    b && b.sdp && -1 !== I(c = b.sdp).call(c, "\na=extmap-allow-mixed") && (b.sdp = M(d = b.sdp.split("\n")).call(d, a=>"a=extmap-allow-mixed" !== Ub(a).call(a)).join("\n"));
                    return a.apply(this, arguments)
                }
            }
        }
    }
    function jc(d) {
        return "string" == typeof d ? Ha({}, cl[d]) : d
    }
    function ve(d) {
        return "string" == typeof d ? Ha({}, dl[d]) : d
    }
    function ud(d) {
        return "string" == typeof d ? Ha({}, el[d]) : d
    }
    function vd(d) {
        return "string" == typeof d ? Ha({}, fl[d]) : d
    }
    function kc(d, f) {
        var a;
        oa(a = Z(v)).call(a, d) && (v[d] = f)
    }
    function lc(d, f, a) {
        return {
            sampleRate: d,
            stereo: f,
            bitrate: a
        }
    }
    function J(d, f, a, b, c) {
        return {
            width: d,
            height: f,
            frameRate: a,
            bitrateMin: b,
            bitrateMax: c
        }
    }
    function db(d, f, a, b, c) {
        return {
            width: {
                max: d
            },
            height: {
                max: f
            },
            frameRate: a,
            bitrateMin: b,
            bitrateMax: c
        }
    }
    function we(d, f) {
        return {
            numSpatialLayers: d,
            numTemporalLayers: f
        }
    }
    function Ng(d) {
        return "[object Array]" === mc.call(d)
    }
    function Og(d) {
        return null !== d && "object" == typeof d
    }
    function Pg(d) {
        return "[object Function]" === mc.call(d)
    }
    function wd(d, f) {
        if (null != d)
            if ("object" != typeof d && (d = [d]),
            Ng(d))
                for (var a = 0, b = d.length; a < b; a++)
                    f.call(null, d[a], a, d);
            else
                for (a in d)
                    Object.prototype.hasOwnProperty.call(d, a) && f.call(null, d[a], a, d)
    }
    function Qg(d) {
        return encodeURIComponent(d).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }
    function xd() {
        this.handlers = []
    }
    function Rg(d, f) {
        !K.isUndefined(d) && K.isUndefined(d["Content-Type"]) && (d["Content-Type"] = f)
    }
    function Kc(d) {
        this.defaults = d;
        this.interceptors = {
            request: new Sg,
            response: new Sg
        }
    }
    function xe(d) {
        this.message = d
    }
    function yd(d) {
        if ("function" != typeof d)
            throw new TypeError("executor must be a function.");
        var f;
        this.promise = new Promise(function(a) {
            f = a
        }
        );
        var a = this;
        d(function(b) {
            a.reason || (a.reason = new Tg(b),
            f(a.reason))
        })
    }
    function Ug(d) {
        d = new zd(d);
        var f = Vg(zd.prototype.request, d);
        return K.extend(f, zd.prototype, d),
        K.extend(f, d),
        f
    }
    function Wg() {
        let d = new Date;
        return d.toTimeString().split(" ")[0] + ":" + d.getMilliseconds()
    }
    function ye(d, f) {
        if ("boolean" != typeof d)
            throw new p(n.INVALID_PARAMS,"Invalid ".concat(f, ": The value is of the boolean type."));
    }
    function Ka(d, f, a) {
        var b;
        if (!oa(a).call(a, d))
            throw new p(n.INVALID_PARAMS,l(b = "".concat(f, " can only be set as ")).call(b, w(a)));
    }
    function V(d, f, a=1, b=1E4, c=!0) {
        if (d < a || d > b || c && ("number" != typeof d || 0 != d % 1)) {
            var e, g;
            throw new p(n.INVALID_PARAMS,l(e = l(g = "invalid ".concat(f, ": the value range is [")).call(g, a, ", ")).call(e, b, "]. integer only"));
        }
    }
    function Ga(d, f, a=1, b=255, c=!0) {
        if (null == d)
            throw new p(n.INVALID_PARAMS,"".concat(f || "param", " cannot be empty"));
        var e, g, h;
        if (!Xg(d, a, b, c))
            throw new p(n.INVALID_PARAMS,l(e = l(g = l(h = "Invalid ".concat(f || "string param", ": Length of the string: [")).call(h, a, ",")).call(g, b, "].")).call(e, c ? " ASCII characters only." : ""));
    }
    function Yg(d, f) {
        if (!nc(d))
            throw new p(n.INVALID_PARAMS,"".concat(f, " should be an array"));
    }
    function ze(d) {
        if ("string" != typeof d || !/^[a-zA-Z0-9 !#\$%&\(\)\+\-:;<=\.>\?@\[\]\^_\{\}\|~,]{1,64}$/.test(d))
            throw k.error("Invalid Channel Name ".concat(d)),
            new p(n.INVALID_PARAMS,"The length must be within 64 bytes. The supported characters: a-z,A-Z,0-9,space,!, #, $, %, &, (, ), +, -, :, ;, <, =, ., >, ?, @, [, ], ^, _,  {, }, |, ~, ,");
    }
    function Ae(d) {
        var f;
        if (!("number" == typeof d && Math.floor(d) === d && 0 <= d && 4294967295 >= d || Xg(d, 1, 255)))
            throw k.error(l(f = "Invalid UID ".concat(d, " ")).call(f, typeof d)),
            new p(n.INVALID_PARAMS,"[String uid] Length of the string: [1,255]. ASCII characters only. [Number uid] The value range is [0,10000]");
    }
    function Xg(d, f=1, a=255, b=!0) {
        if (f = "string" == typeof d && d.length <= a && d.length >= f) {
            if (!(b = !b))
                a: if ("string" != typeof d)
                    b = !1;
                else {
                    for (b = 0; b < d.length; b += 1)
                        if (f = d.charCodeAt(b),
                        0 > f || 255 < f) {
                            b = !1;
                            break a
                        }
                    b = !0
                }
            f = b
        }
        return f
    }
    function gl(d) {
        return Ga(d.reportId, "params.reportId", 0, 100, !1),
        Ga(d.category, "params.category", 0, 100, !1),
        Ga(d.event, "params.event", 0, 100, !1),
        Ga(d.label, "params.label", 0, 100, !1),
        V(d.value, "params.value", -9007199254740991, 9007199254740991, !1),
        !0
    }
    function Zg(d) {
        return V(d.timeout, "config.timeout", 0, 1E5),
        V(d.timeoutFactor, "config.timeoutFactor", 0, 100, !1),
        V(d.maxRetryCount, "config.maxRetryConfig", 0, 1 / 0),
        V(d.maxRetryTimeout, "config.maxRetryTimeout", 0, 1 / 0),
        !0
    }
    function $g(d) {
        if (!nc(d) || 1 > d.length)
            return !1;
        try {
            q(d).call(d, d=>{
                if (!d.urls)
                    throw Error();
            }
            )
        } catch (f) {
            return !1
        }
        return !0
    }
    function ah(d) {
        return Ga(d.turnServerURL, "turnServerURL"),
        Ga(d.username, "username"),
        Ga(d.password, "password"),
        d.udpport && V(d.udpport, "udpport", 1, 99999, !0),
        d.forceturn && ye(d.forceturn, "forceturn"),
        d.security && ye(d.security, "security"),
        d.tcpport && V(d.tcpport, "tcpport", 1, 99999, !0),
        !0
    }
    function bh(d) {
        return void 0 !== d.level && Ka(d.level, "level", [1, 2]),
        !0
    }
    function Be(d, f) {
        Ga(d.url, "".concat(f, ".url"), 1, 1E3, !1);
        null == d.x || V(d.x, "".concat(f, ".x"), 0, 1E4);
        null == d.y || V(d.y, "".concat(f, ".y"), 0, 1E4);
        null == d.width || V(d.width, "".concat(f, ".width"), 0, 1E4);
        null == d.height || V(d.height, "".concat(f, ".height"), 0, 1E4);
        null == d.zOrder || V(d.zOrder, "".concat(f, ".zOrder"), 0, 255);
        null == d.alpha || V(d.alpha, "".concat(f, ".alpha"), 0, 1, !1)
    }
    function ch(d) {
        if (!d.channelName)
            throw new p(n.INVALID_PARAMS,"invalid channelName in info");
        if (!d.uid || "number" != typeof d.uid)
            throw new p(n.INVALID_PARAMS,"invalid uid in info, uid must be a number");
        return d.token && Ga(d.token, "info.token", 1, 2047),
        Ae(d.uid),
        ze(d.channelName),
        !0
    }
    function dh(d) {
        return Ka(d, "mediaSource", ["screen", "window", "application"]),
        !0
    }
    function ma(d) {
        var f, a, b, c;
        d = d || navigator.userAgent;
        let e = d.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if ("Chrome" === e[1]) {
            var g = d.match(/(OPR(?=\/))\/?(\d+)/i);
            null !== g && (e = g)
        }
        "Safari" === e[1] && (g = d.match(/version\/(\d+)/i),
        null !== g && (e[2] = g[1]));
        -1 !== I(f = d.toLowerCase()).call(f, "qqbrowser") && (f = d.match(/(qqbrowser(?=\/))\/?(\d+)/i),
        null !== f && (e = f));
        -1 !== I(a = d.toLowerCase()).call(a, "micromessenger") && (a = d.match(/(micromessenger(?=\/))\/?(\d+)/i),
        null !== a && (e = a));
        -1 !== I(b = d.toLowerCase()).call(b, "edge") && (b = d.match(/(edge(?=\/))\/?(\d+)/i),
        null !== b && (e = b));
        -1 !== I(c = d.toLowerCase()).call(c, "trident") && (c = /\brv[ :]+(\d+)/g.exec(d) || [],
        null !== c && (e = ["", "IE", c[1]]));
        c = null;
        b = [{
            s: W.WIN_10,
            r: /(Windows 10.0|Windows NT 10.0)/
        }, {
            s: W.WIN_81,
            r: /(Windows 8.1|Windows NT 6.3)/
        }, {
            s: W.WIN_8,
            r: /(Windows 8|Windows NT 6.2)/
        }, {
            s: W.WIN_7,
            r: /(Windows 7|Windows NT 6.1)/
        }, {
            s: W.WIN_VISTA,
            r: /Windows NT 6.0/
        }, {
            s: W.WIN_SERVER_2003,
            r: /Windows NT 5.2/
        }, {
            s: W.WIN_XP,
            r: /(Windows NT 5.1|Windows XP)/
        }, {
            s: W.WIN_2000,
            r: /(Windows NT 5.0|Windows 2000)/
        }, {
            s: W.ANDROID,
            r: /Android/
        }, {
            s: W.OPEN_BSD,
            r: /OpenBSD/
        }, {
            s: W.SUN_OS,
            r: /SunOS/
        }, {
            s: W.LINUX,
            r: /(Linux|X11)/
        }, {
            s: W.IOS,
            r: /(iPhone|iPad|iPod)/
        }, {
            s: W.MAC_OS_X,
            r: /Mac OS X/
        }, {
            s: W.MAC_OS,
            r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
        }, {
            s: W.QNX,
            r: /QNX/
        }, {
            s: W.UNIX,
            r: /UNIX/
        }, {
            s: W.BEOS,
            r: /BeOS/
        }, {
            s: W.OS_2,
            r: /OS\/2/
        }, {
            s: W.SEARCH_BOT,
            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
        }];
        for (let e in b)
            if (a = b[e],
            a.r.test(d)) {
                c = a.s;
                break
            }
        return {
            name: e[1],
            version: e[2],
            os: c
        }
    }
    function Lc() {
        return ma().name === ba.CHROME
    }
    function Ad() {
        return ma().name === ba.FIREFOX
    }
    function eh() {
        return window.navigator.appVersion && null !== window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./) && 35 >= window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1]
    }
    function Bd() {
        let d = ma();
        return d.name === ba.EDGE || d.name === ba.SAFARI ? !1 : !!navigator.userAgent.toLocaleLowerCase().match(/chrome\/[\d]./i)
    }
    function fh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function vb(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = fh(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = fh(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    function hl(d) {
        if (!d.address || !d.tcp)
            throw new p(n.UNEXPECTED_RESPONSE,"Invalid address format ".concat(d));
        return d.address.match(/^[\.:\d]+$/) ? "".concat(d.address.replace(/[^\d]/g, "-"), ".edge.agora.io") : (k.info("Cannot recognized as IP address ".concat(d.address, ". Used As Host instead")),
        l(f = "".concat(d.address, ":")).call(f, d.tcp));
        var f
    }
    function Pb(d) {
        return "number" == typeof d ? d : d.exact || d.ideal || d.max || d.min || 0
    }
    function gh(d, f) {
        let a = d.videoSend[0];
        if (!a)
            return null;
        f = f && f.videoSend[0] ? f.videoSend[0].inputFrame : void 0;
        d = {
            id: qa(10, ""),
            timestamp: (new Date(d.timestamp)).toISOString(),
            mediaType: "video",
            type: "ssrc",
            ssrc: a.ssrc.toString()
        };
        return a.inputFrame && (f && a.inputFrame.height === f.height || (d.A_fhi = a.inputFrame.height ? a.inputFrame.height.toString() : "0"),
        f && a.inputFrame.width === f.width || (d.A_fwi = a.inputFrame.width ? a.inputFrame.width.toString() : "0"),
        f && a.inputFrame.frameRate === f.frameRate || (d.A_fri = a.inputFrame.frameRate ? a.inputFrame.frameRate.toString() : "0")),
        d
    }
    function hh(d) {
        return 0 <= d && .17 > d ? 1 : .17 <= d && .36 > d ? 2 : .36 <= d && .59 > d ? 3 : .59 <= d && 1 >= d ? 4 : 1 < d ? 5 : 0
    }
    function il(d, f) {
        let a = {};
        d.height && d.width && (f = f._videoHeight || f.getMediaStreamTrack().getSettings().height,
        a.scaleResolutionDownBy = f ? f / Pb(d.height) : 4);
        return a.maxFramerate = d.framerate ? Pb(d.framerate) : void 0,
        a.maxBitrate = d.bitrate ? 1E3 * d.bitrate : void 0,
        a
    }
    function ih(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function Ce(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = ih(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = ih(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    function Cd(d) {
        return window.TextEncoder ? (new TextEncoder).encode(d).length : d.length
    }
    function wb(d) {
        return new B(f=>{
            window.setTimeout(f, d)
        }
        )
    }
    function jl(d) {
        let f = new p(n.TIMEOUT,"timeout");
        return new B((a,b)=>{
            window.setTimeout(()=>b(f), d)
        }
        )
    }
    function qa(d=7, f) {
        var a, b;
        let c = Math.random().toString(16).substr(2, d).toLowerCase();
        return c.length === d ? l(a = "".concat(f)).call(a, c) : l(b = "".concat(f)).call(b, c) + qa(d - c.length, "")
    }
    function jh(d) {
        return new B((f,a)=>{
            let b = document.createElement("video");
            b.setAttribute("autoplay", "");
            b.setAttribute("muted", "");
            b.muted = !0;
            b.autoplay = !0;
            b.setAttribute("playsinline", "");
            b.setAttribute("style", "position: absolute; top: 0; left: 0; width: 1px; height: 1px");
            document.body.appendChild(b);
            b.addEventListener("playing", ()=>{
                !b.videoWidth && Ad() || (document.body.removeChild(b),
                f([b.videoWidth, b.videoHeight]))
            }
            );
            b.srcObject = new MediaStream([d])
        }
        )
    }
    function Vb(d) {
        return B.all(z(d).call(d, d=>d.then(a=>{
            throw a;
        }
        , a=>a))).then(d=>{
            throw d;
        }
        , d=>d)
    }
    function La(d, f, ...a) {
        return 0 === d.getListeners(f).length ? B.reject(new p(n.UNEXPECTED_ERROR,"can not emit promise")) : new B((b,c)=>{
            d.emit(f, ...a, b, c)
        }
        )
    }
    function Pa(d, f, ...a) {
        return 0 === d.getListeners(f).length ? B.resolve() : La(d, f, ...a)
    }
    function Wb(d, f, ...a) {
        return 0 === d.getListeners(f).length ? null : Mc(d, f, ...a)
    }
    function Mc(d, f, ...a) {
        let b = null
          , c = null;
        if (d.emit(f, ...a, a=>{
            b = a
        }
        , a=>{
            c = a
        }
        ),
        null !== c)
            throw c;
        if (null === b)
            throw new p(n.UNEXPECTED_ERROR,"handler is not sync");
        return b
    }
    function Nc(d, f) {
        f = I(d).call(d, f);
        -1 !== f && Ia(d).call(d, f, 1)
    }
    function kh(d) {
        let f = [];
        return q(d).call(d, a=>{
            -1 === I(f).call(f, a) && f.push(a)
        }
        ),
        f
    }
    function Za(d) {
        B.resolve().then(d)
    }
    function Oc(d, f) {
        lh[f] || (lh[f] = !0,
        d())
    }
    function mh(d) {
        d = window.atob(d);
        let f = new Uint8Array(new ArrayBuffer(d.length));
        for (let a = 0; a < d.length; a += 1)
            f[a] = d.charCodeAt(a);
        return f
    }
    function Dd(d) {
        let f = "";
        for (let a = 0; a < d.length; a += 1)
            f += String.fromCharCode(d[a]);
        return window.btoa(f)
    }
    async function nh(d, f) {
        let a = (a,c)=>a ? "number" != typeof a ? a.max || a.exact || a.ideal || a.min || c : a : c;
        d = {
            audio: !1,
            video: {
                mandatory: {
                    chromeMediaSource: "desktop",
                    chromeMediaSourceId: d,
                    maxHeight: a(f.height, 1080),
                    maxWidth: a(f.width, 1920)
                }
            }
        };
        return f.frameRate && "number" != typeof f.frameRate ? (d.video.mandatory.maxFrameRate = f.frameRate.max,
        d.video.mandatory.minFrameRate = f.frameRate.min) : "number" == typeof f.frameRate && (d.video.mandatory.maxFrameRate = f.frameRate),
        await navigator.mediaDevices.getUserMedia(d)
    }
    async function kl(d) {
        let f = await function(a) {
            return new B((b,c)=>{
                const d = document.createElement("div");
                d.innerText = "share screen";
                d.setAttribute("style", "text-align: center; height: 25px; line-height: 25px; border-radius: 4px 4px 0 0; background: #D4D2D4; border-bottom:  solid 1px #B9B8B9;");
                const g = document.createElement("div");
                g.setAttribute("style", "width: 100%; height: 500px; padding: 15px 25px ; box-sizing: border-box;");
                const h = document.createElement("div");
                h.innerText = "Agora Web Screensharing wants to share the contents of your screen with webdemo.agorabeckon.com. Choose what you'd like to share.";
                h.setAttribute("style", "height: 12%;");
                const f = document.createElement("div");
                f.setAttribute("style", "width: 100%; height: 80%; background: #FFF; border:  solid 1px #CBCBCB; display: flex; flex-wrap: wrap; justify-content: space-around; overflow-y: scroll; padding: 0 15px; box-sizing: border-box;");
                const r = document.createElement("div");
                r.setAttribute("style", "text-align: right; padding: 16px 0;");
                const t = document.createElement("button");
                t.innerHTML = "cancel";
                t.setAttribute("style", "width: 85px;");
                t.onclick = ()=>{
                    document.body.removeChild(y);
                    const a = Error("NotAllowedError");
                    a.name = "NotAllowedError";
                    c(a)
                }
                ;
                r.appendChild(t);
                g.appendChild(h);
                g.appendChild(f);
                g.appendChild(r);
                const y = document.createElement("div");
                y.setAttribute("style", "position: fixed; z-index: 99999999; top: 50%; left: 50%; width: 620px; height: 525px; background: #ECECEC; border-radius: 4px; -webkit-transform: translate(-50%,-50%); transform: translate(-50%,-50%);");
                y.appendChild(d);
                y.appendChild(g);
                document.body.appendChild(y);
                z(a).call(a, a=>{
                    if (a.id) {
                        const c = document.createElement("div");
                        c.setAttribute("style", "width: 30%; height: 160px; padding: 20px 0; text-align: center;box-sizing: content-box;");
                        c.innerHTML = '<div style="height: 120px; display: table-cell; vertical-align: middle;"><img style="width: 100%; background: #333333; box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);" src=' + a.thumbnail.toDataURL() + ' /></div><span style="\theight: 40px; line-height: 40px; display: inline-block; width: 70%; word-break: keep-all; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + a.name + "</span>";
                        c.onclick = ()=>{
                            document.body.removeChild(y);
                            b(a.id)
                        }
                        ;
                        f.appendChild(c)
                    }
                }
                )
            }
            )
        }(await oh(d.mediaSource));
        return await nh(f, d)
    }
    async function oh(d) {
        let f = ["window", "screen"];
        "application" !== d && "window" !== d || (f = ["window"]);
        "screen" === d && (f = ["screen"]);
        let a = ph();
        if (!a)
            throw new p(n.ELECTRON_IS_NULL);
        d = null;
        try {
            d = a.desktopCapturer.getSources({
                types: f
            })
        } catch (b) {
            d = null
        }
        d && d.then || (d = new B((b,c)=>{
            a.desktopCapturer.getSources({
                types: f
            }, (a,d)=>{
                a ? c(a) : b(d)
            }
            )
        }
        ));
        try {
            return await d
        } catch (b) {
            throw new p(n.ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR,b.toString());
        }
    }
    function ph() {
        if (Ed)
            return Ed;
        try {
            return Ed = window.require("electron"),
            Ed
        } catch (d) {
            return null
        }
    }
    async function xb(d, f) {
        let a = 0
          , b = null;
        for (; 2 > a; )
            try {
                b = await ll(d, f, 0 < a);
                break
            } catch (g) {
                var c, e;
                if (g instanceof p)
                    throw k.error(l(e = "[".concat(f, "] ")).call(e, g.toString())),
                    g;
                let b = Fd(g.name || g.code || g, g.message);
                if (b.code === n.MEDIA_OPTION_INVALID)
                    k.debug("[".concat(f, "] detect media option invalid, retry")),
                    a += 1,
                    await wb(500);
                else
                    throw k.error(l(c = "[".concat(f, "] ")).call(c, b.toString())),
                    b;
            }
        if (!b)
            throw new p(n.UNEXPECTED_ERROR,"can not find stream after getUserMedia");
        return b
    }
    async function ll(d, f, a) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
            throw new p(n.NOT_SUPPORTED,"can not find getUserMedia");
        a && (d.video && (delete d.video.width,
        delete d.video.height),
        d.screen && (delete d.screen.width,
        delete d.screen.height));
        var b = ca;
        a = new MediaStream;
        if (d.audioSource && a.addTrack(d.audioSource),
        d.videoSource && a.addTrack(d.videoSource),
        !d.audio && !d.video && !d.screen)
            return k.debug("Using Video Source/ Audio Source"),
            a;
        if (d.screen)
            if (ph())
                d.screen.sourceId ? oc(a, await nh(d.screen.sourceId, d.screen)) : oc(a, await kl(d.screen));
            else if (Lc() && d.screen.extensionId && d.screen.mandatory) {
                if (!b.getStreamFromExtension)
                    throw new p(n.NOT_SUPPORTED,"This browser does not support screen sharing");
                k.debug("[".concat(f, '] Screen access on chrome stable, looking for extension"'));
                var c = await (e = d.screen.extensionId,
                g = f,
                new B((a,b)=>{
                    try {
                        chrome.runtime.sendMessage(e, {
                            getStream: !0
                        }, c=>{
                            if (!c || !c.streamId)
                                return k.error("[".concat(g, "] No response from Chrome Plugin. Plugin not installed properly"), c),
                                void b(new p(n.CHROME_PLUGIN_NO_RESPONSE,"No response from Chrome Plugin. Plugin not installed properly"));
                            a(c.streamId)
                        }
                        )
                    } catch (y) {
                        var c;
                        k.error(l(c = "[".concat(g, "] AgoraRTC screensharing plugin is not accessible(")).call(c, e, ")"), y.toString());
                        b(new p(n.CHROME_PLUGIN_NOT_INSTALL))
                    }
                }
                ));
                d.screen.mandatory.chromeMediaSourceId = c;
                oc(a, await navigator.mediaDevices.getUserMedia({
                    video: {
                        mandatory: d.screen.mandatory
                    }
                }))
            } else if (b.getDisplayMedia)
                d.screen.mediaSource && dh(d.screen.mediaSource),
                c = {
                    width: d.screen.width,
                    height: d.screen.height,
                    frameRate: d.screen.frameRate,
                    displaySurface: "screen" === d.screen.mediaSource ? "monitor" : d.screen.mediaSource
                },
                k.debug("[".concat(f, "] getDisplayMedia:"), w({
                    video: c,
                    audio: !!d.screenAudio
                })),
                oc(a, await navigator.mediaDevices.getDisplayMedia({
                    video: c,
                    audio: !!d.screenAudio
                }));
            else {
                if (!Ad())
                    throw k.error("[".concat(f, "] This browser does not support screenSharing")),
                    new p(n.NOT_SUPPORTED,"This browser does not support screen sharing");
                d.screen.mediaSource && dh(d.screen.mediaSource);
                b = {
                    video: {
                        mediaSource: d.screen.mediaSource,
                        width: d.screen.width,
                        height: d.screen.height,
                        frameRate: d.screen.frameRate
                    }
                };
                k.debug(l(c = "[".concat(f, "] getUserMedia: ")).call(c, w(b)));
                oc(a, await navigator.mediaDevices.getUserMedia(b))
            }
        var e, g;
        if (!d.video && !d.audio)
            return a;
        d = {
            video: d.video,
            audio: d.audio
        };
        k.debug("[".concat(f, "] GetUserMedia"), w(d));
        f = ma();
        let h;
        c = null;
        f.name !== ba.SAFARI && f.os !== W.IOS || (c = await De.lock());
        try {
            h = await navigator.mediaDevices.getUserMedia(d)
        } catch (m) {
            throw c && c(),
            m;
        }
        return d.audio && (qh = !0),
        d.video && (rh = !0),
        oc(a, h),
        c && c(),
        a
    }
    function Fd(d, f) {
        switch (d) {
        case "Starting video failed":
        case "OverconstrainedError":
        case "TrackStartError":
            var a;
            return new p(n.MEDIA_OPTION_INVALID,l(a = "".concat(d, ": ")).call(a, f));
        case "NotFoundError":
        case "DevicesNotFoundError":
            var b;
            return new p(n.DEVICE_NOT_FOUND,l(b = "".concat(d, ": ")).call(b, f));
        case "NotSupportedError":
            var c;
            return new p(n.NOT_SUPPORTED,l(c = "".concat(d, ": ")).call(c, f));
        case "NotReadableError":
            var e;
            return new p(n.NOT_READABLE,l(e = "".concat(d, ": ")).call(e, f));
        case "InvalidStateError":
        case "NotAllowedError":
        case "PERMISSION_DENIED":
        case "PermissionDeniedError":
            var g;
            return new p(n.PERMISSION_DENIED,l(g = "".concat(d, ": ")).call(g, f));
        case "ConstraintNotSatisfiedError":
            var h;
            return new p(n.CONSTRAINT_NOT_SATISFIED,l(h = "".concat(d, ": ")).call(h, f));
        default:
            var m;
            return k.error("getUserMedia unexpected error", d),
            new p(n.UNEXPECTED_ERROR,l(m = "".concat(d, ": ")).call(m, f))
        }
    }
    function oc(d, f) {
        let a = d.getVideoTracks()[0]
          , b = d.getAudioTracks()[0]
          , c = f.getVideoTracks()[0];
        (f = f.getAudioTracks()[0]) && (b && d.removeTrack(b),
        d.addTrack(f));
        c && (a && d.removeTrack(a),
        d.addTrack(c))
    }
    function sh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function yb(d, f, a) {
        return new B((b,c)=>{
            f.timeout = f.timeout || v.HTTP_CONNECT_TIMEOUT;
            f.responseType = f.responseType || "json";
            f.data && !a ? (f.data = w(f.data),
            th += Cd(f.data)) : a && (th += f.data.size);
            f.headers = f.headers || {};
            f.headers["Content-Type"] = f.headers["Content-Type"] || "application/json";
            f.method = "POST";
            f.url = d;
            zb.request(f).then(a=>{
                "string" == typeof a.data ? Ee += Cd(a.data) : a.data instanceof ArrayBuffer || a.data instanceof Uint8Array ? Ee += a.data.byteLength : Ee += Cd(w(a.data));
                b(a.data)
            }
            ).catch(a=>{
                zb.isCancel(a) ? c(new p(n.OPERATION_ABORTED,"cancel token canceled")) : "ECONNABORTED" === a.code ? c(new p(n.NETWORK_TIMEOUT,a.message)) : a.response ? c(new p(n.NETWORK_RESPONSE_ERROR,a.response.status)) : c(new p(n.NETWORK_ERROR,a.message))
            }
            )
        }
        )
    }
    async function ml(d, f) {
        let a = new Blob([f.data],{
            type: "buffer"
        });
        return await yb(d, function(a) {
            for (var b = 1; b < arguments.length; b++) {
                var d, g = null != arguments[b] ? arguments[b] : {};
                if (b % 2)
                    q(d = sh(Object(g), !0)).call(d, function(b) {
                        Na(a, b, g[b])
                    });
                else if (fa)
                    Oa(a, fa(g));
                else {
                    var h;
                    q(h = sh(Object(g))).call(h, function(b) {
                        X(a, b, Y(g, b))
                    })
                }
            }
            return a
        }({}, f, {
            data: a,
            headers: {
                "Content-Type": "application/octet-stream"
            }
        }), !0)
    }
    function uh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function va(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = uh(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = uh(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    function Fe(d={
        report: u
    }) {
        return function(f, a, b) {
            let c = f[a];
            if ("function" == typeof c) {
                let e = "AgoraRTCClient" === f.constructor.name ? "Client" : f.constructor.name;
                b.value = function(...b) {
                    var g;
                    let f = d.report.reportApiInvoke(this._sessionId || null, {
                        name: l(g = "".concat(e, ".")).call(g, a),
                        options: b,
                        tag: C.TRACER
                    });
                    try {
                        let a = c.apply(this, b);
                        return f.onSuccess(),
                        a
                    } catch (r) {
                        throw f.onError(r),
                        r;
                    }
                }
            }
            return b
        }
    }
    function Gd(d) {
        var f = nl[Math.floor(d / 1E4)];
        if (!f)
            return {
                desc: "unkonw error",
                retry: !1
            };
        f = f[d % 1E4];
        if (!f) {
            if (Math.floor(d / 1E4) === pc.ACCESS_POINT) {
                d %= 1E4;
                if ("1" === d.toString()[0])
                    return {
                        desc: d.toString(),
                        retry: !1
                    };
                if ("2" === d.toString()[0])
                    return {
                        desc: d.toString(),
                        retry: !0
                    }
            }
            return {
                desc: "unkonw error",
                retry: !1
            }
        }
        return f
    }
    function vh(d) {
        return ol[d] || {
            desc: "UNKNOW_ERROR_".concat(d),
            action: "failed"
        }
    }
    function Fb(d, f, a, b) {
        let c = Ha({}, Qa, b)
          , e = c.timeout
          , g = async()=>{
            await wb(e);
            e *= c.timeoutFactor;
            e = Math.min(c.maxRetryTimeout, e)
        }
          , h = !1;
        b = new B(async(b,e)=>{
            f = f || (()=>!1);
            a = a || (()=>!0);
            for (let m = 0; m < c.maxRetryCount; m += 1) {
                if (h)
                    return e(new p(n.OPERATION_ABORTED));
                try {
                    const a = await d();
                    if (!f(a, m) || m + 1 === c.maxRetryCount)
                        return b(a);
                    await g()
                } catch (y) {
                    if (!a(y, m) || m + 1 === c.maxRetryCount)
                        return e(y);
                    await g()
                }
            }
        }
        );
        return b.cancel = ()=>h = !0,
        b
    }
    function pl() {
        wh ? (k.info("create audio context"),
        qc = new wh,
        qc.onstatechange = ()=>{
            Pc.emit("state-change")
        }
        ,
        function(d) {
            function f(c) {
                "running" === d.state ? a(!1) : "closed" !== d.state && (a(!0),
                c ? d.resume().then(b, b) : a(!1))
            }
            function a(a) {
                if (g !== a) {
                    g = a;
                    for (let b = 0, d = e; b < d.length; b += 1) {
                        let e = d[b];
                        a ? window.addEventListener(e, c, {
                            capture: !0,
                            passive: !0
                        }) : window.removeEventListener(e, c, {
                            capture: !0,
                            passive: !0
                        })
                    }
                }
            }
            function b() {
                f(!1)
            }
            function c() {
                f(!0)
            }
            let e = "click contextmenu auxclick dblclick mousedown mouseup touchend keydown keyup".split(" ")
              , g = !1;
            d.onstatechange = function() {
                f(!0)
            }
            ;
            f(!1)
        }(qc)) : k.error("your browser is not support web audio")
    }
    function Qc() {
        if (!qc && (pl(),
        !qc))
            throw new p(n.NOT_SUPPORTED,"can not create audio context");
        return qc
    }
    function Rc(d) {
        if (!function() {
            if (null !== Ge)
                return Ge;
            var a = Qc();
            let c = a.createBufferSource()
              , d = a.createGain();
            a = a.createGain();
            c.connect(d);
            c.connect(a);
            c.disconnect(d);
            a = !1;
            try {
                c.disconnect(d)
            } catch (g) {
                a = !0
            }
            return c.disconnect(),
            Ge = a,
            a
        }()) {
            k.debug("polyfill audio node");
            var f = d.connect
              , a = d.disconnect;
            d.connect = (a,c,e)=>{
                var b;
                return d._inputNodes || (d._inputNodes = []),
                oa(b = d._inputNodes).call(b, a) || (a instanceof AudioNode ? (d._inputNodes.push(a),
                f.call(d, a, c, e)) : f.call(d, a, c)),
                d
            }
            ;
            d.disconnect = (b,c,e)=>{
                a.call(d);
                b ? Nc(d._inputNodes, b) : d._inputNodes = [];
                for (let a of d._inputNodes)
                    f.call(d, a)
            }
        }
    }
    function He(d, f) {
        let a = 1 / f
          , b = Qc()
          , c = b.createGain();
        c.gain.value = 0;
        c.connect(b.destination);
        let e = !1
          , g = ()=>{
            if (e)
                return void (c = null);
            const h = b.createOscillator();
            h.onended = g;
            h.connect(c);
            h.start(0);
            h.stop(b.currentTime + a);
            d(b.currentTime)
        }
        ;
        return g(),
        ()=>{
            e = !0
        }
    }
    function xh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function Ie(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = xh(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = xh(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    function yh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function Je(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = yh(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = yh(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    function zh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function ql(d, f, a, b, c) {
        Ke += 1;
        let e = {
            sid: a.sid,
            command: "convergeAllocateEdge",
            uid: "666",
            appId: a.appId,
            ts: Math.floor(x() / 1E3),
            seq: Ke,
            requestId: Ke,
            version: Ta,
            cname: a.cname
        }, g = {
            service_name: f,
            json_body: w(e)
        }, h, m, r = d[0];
        return Fb(async()=>{
            h = x();
            var a = await yb(r, {
                data: g,
                cancelToken: b,
                headers: {
                    "X-Packet-Service-Type": "0",
                    "X-Packet-URI": "61"
                }
            });
            if (m = x() - h,
            0 !== a.code) {
                var c = new p(n.UNEXPECTED_RESPONSE,"live streaming ap error, code" + a.code,{
                    retry: !0,
                    responseTime: m
                });
                throw k.error(c.toString()),
                c;
            }
            a = JSON.parse(a.json_body);
            if (200 !== a.code)
                throw a = new p(n.UNEXPECTED_RESPONSE,l(c = "live streaming app center error, code: ".concat(a.code, ", reason: ")).call(c, a.reason),{
                    code: a.code,
                    responseTime: m
                }),
                k.error(a.toString()),
                a;
            if (!a.servers || 0 === a.servers.length)
                throw c = new p(n.UNEXPECTED_RESPONSE,"live streaming app center empty server",{
                    code: a.code,
                    responseTime: m
                }),
                k.error(c.toString()),
                c;
            c = function(a, b) {
                var c;
                return {
                    addressList: z(c = a.servers).call(c, a=>{
                        var c, d;
                        return l(c = l(d = "wss://".concat(a.address.replace(/\./g, "-"), ".edge.agora.io:")).call(d, a.wss, "?serviceName=")).call(c, encodeURIComponent(b))
                    }
                    ),
                    workerToken: a.workerToken,
                    vid: a.vid
                }
            }(a, f);
            return v.LIVE_STREAMING_ADDRESS && (c.addressList = v.LIVE_STREAMING_ADDRESS instanceof Array ? v.LIVE_STREAMING_ADDRESS : [v.LIVE_STREAMING_ADDRESS]),
            function(a) {
                for (var b = 1; b < arguments.length; b++) {
                    var c, d = null != arguments[b] ? arguments[b] : {};
                    if (b % 2)
                        q(c = zh(Object(d), !0)).call(c, function(b) {
                            Na(a, b, d[b])
                        });
                    else if (fa)
                        Oa(a, fa(d));
                    else {
                        var e;
                        q(e = zh(Object(d))).call(e, function(b) {
                            X(a, b, Y(d, b))
                        })
                    }
                }
                return a
            }({}, c, {
                responseTime: m
            })
        }
        , (b,c)=>(u.apworkerEvent(a.sid, {
            success: !0,
            sc: 200,
            serviceName: f,
            responseDetail: w(b.addressList),
            firstSuccess: 0 === c,
            responseTime: m,
            serverIp: d[c % d.length]
        }),
        !1), (b,c)=>(u.apworkerEvent(a.sid, {
            success: !1,
            sc: b.data && b.data.code || 200,
            serviceName: f,
            responseTime: m,
            serverIp: d[c % d.length]
        }),
        !!(b.code !== n.OPERATION_ABORTED && b.code !== n.UNEXPECTED_RESPONSE || b.data && b.data.retry) && (r = d[(c + 1) % d.length],
        !0)), c)
    }
    function Ah({url: d, areaCode: f}, a, b, c) {
        let e = x()
          , g = {
            opid: 133,
            flag: 4096,
            ts: x(),
            key: a.token,
            cname: a.cname,
            sid: a.sid,
            detail: {
                6: a.stringUid,
                11: f
            },
            uid: a.uid || 0
        };
        a.multiIP && a.multiIP.gateway_ip && (g.detail[5] = w({
            vocs_ip: [a.multiIP.uni_lbs_ip],
            vos_ip: [a.multiIP.gateway_ip]
        }));
        return Fb(async()=>{
            let a = await yb(d + "".concat(-1 === I(d).call(d, "?") ? "?" : "&", "action=wrtc_gateway"), {
                data: g,
                cancelToken: b,
                headers: {
                    "X-Packet-Service-Type": 0,
                    "X-Packet-URI": 69
                }
            });
            if (a.addresses && 0 === a.addresses.length && 0 === a.code)
                throw new p(n.VOID_GATEWAY_ADDRESS,"",{
                    retry: !0,
                    csIp: a.detail && a.detail[502]
                });
            if (v.GATEWAY_ADDRESS && 0 < v.GATEWAY_ADDRESS.length) {
                var c;
                console.log(v.GATEWAY_ADDRESS);
                let b = z(c = v.GATEWAY_ADDRESS).call(c, (b,c)=>({
                    ip: b.ip,
                    port: b.port,
                    ticket: a.addresses[0] && a.addresses[0].ticket
                }));
                a.addresses = b
            }
            return function(a, b) {
                var c;
                let d = [".agora.io", ".sd-rtn.com"]
                  , e = d[1] && -1 !== I(b).call(b, d[1]) ? 1 : 0;
                return a.addresses = a.addresses || [],
                {
                    gatewayAddrs: z(c = a.addresses).call(c, a=>{
                        var b, c, g;
                        return a.ip.match(/^[\.:\d]+$/) ? l(b = l(c = "".concat(a.ip.replace(/[^\d]/g, "-"), ".edge")).call(c, d[e++ % d.length], ":")).call(b, a.port) : (k.info("Cannot recognized as IP address ".concat(a.ip, ". Used As Host instead")),
                        l(g = "".concat(a.ip, ":")).call(g, a.port))
                    }
                    ),
                    uid: a.uid,
                    cid: a.cid,
                    vid: a.detail && a.detail[8],
                    uni_lbs_ip: a.detail && a.detail[1],
                    res: a,
                    csIp: a.detail && a.detail[502]
                }
            }(a, d)
        }
        , b=>{
            if (0 === b.res.code)
                return u.joinChooseServer(a.sid, {
                    lts: e,
                    succ: !0,
                    csAddr: d,
                    serverList: b.gatewayAddrs,
                    ec: null,
                    cid: b.res.cid.toString(),
                    uid: b.res.uid.toString(),
                    csIp: b.csIp
                }),
                !1;
            let c = Gd(b.res.code);
            throw new p(n.CAN_NOT_GET_GATEWAY_SERVER,c.desc,{
                retry: c.retry,
                csIp: b.csIp
            });
        }
        , b=>{
            return b.code !== n.OPERATION_ABORTED && (b.code === n.CAN_NOT_GET_GATEWAY_SERVER || b.code === n.VOID_GATEWAY_ADDRESS ? (u.joinChooseServer(a.sid, {
                lts: e,
                succ: !1,
                csAddr: d,
                serverList: null,
                ec: b.message,
                csIp: b.data && b.data.csIp
            }),
            k.warning(l(c = l(g = l(h = "[".concat(a.clientId, "] Choose server ")).call(h, d, " failed, message: ")).call(g, b.message, ", retry: ")).call(c, b.data.retry)),
            b.data.retry) : (u.joinChooseServer(a.sid, {
                lts: e,
                succ: !1,
                csAddr: d,
                serverList: null,
                ec: b.code,
                csIp: b.data && b.data.csIp
            }),
            k.warning("[".concat(a.clientId, "] Choose server network error, retry"), b),
            !0));
            var c, g, h
        }
        , c)
    }
    async function Bh(d, f, a) {
        return {
            gatewayInfo: await async function(a, c, d) {
                var b, e;
                const f = z(b = Aa(e = v.WEBCS_DOMAIN).call(e, 0, v.AJAX_REQUEST_CONCURRENT)).call(b, b=>{
                    var c;
                    return {
                        url: a.proxyServer ? l(c = "https://".concat(a.proxyServer, "/ap/?url=")).call(c, b + "/api/v1") : "https://".concat(b, "/api/v1"),
                        areaCode: Le()
                    }
                }
                );
                let r = null;
                b = z(f).call(f, b=>(k.debug("[".concat(a.clientId, "] Connect to choose_server:"), b.url),
                Ah(b, a, c, d)));
                e = ()=>new B(async(b,e)=>{
                    var g, h;
                    if (await wb(1E3),
                    null === r) {
                        var f = z(g = Aa(h = v.WEBCS_DOMAIN_BACKUP_LIST).call(h, 0, v.AJAX_REQUEST_CONCURRENT)).call(g, b=>{
                            var c;
                            return {
                                url: a.proxyServer ? l(c = "https://".concat(a.proxyServer, "/ap/?url=")).call(c, b + "/api/v1") : "https://".concat(b, "/api/v1"),
                                areaCode: Le()
                            }
                        }
                        )
                          , m = z(f).call(f, b=>(k.debug("[".concat(a.clientId, "] Connect to backup choose_server:"), b.url),
                        Ah(b, a, c, d)));
                        Vb(m).then(a=>{
                            q(m).call(m, a=>a.cancel());
                            b(a)
                        }
                        ).catch(a=>e(a[0]))
                    }
                }
                );
                try {
                    var t;
                    r = await Vb(l(t = [e()]).call(t, b))
                } catch (y) {
                    throw y[0];
                }
                return q(b).call(b, a=>a.cancel()),
                r
            }(d, f, a)
        }
    }
    async function rl(d, f, a) {
        var b, c, e;
        if ("disabled" !== d.cloudProxyServer) {
            var g = await async function(a, b, c) {
                var d, e, g = x();
                const h = z(d = Aa(e = v.PROXY_CS).call(e, 0, v.AJAX_REQUEST_CONCURRENT)).call(d, b=>{
                    var c;
                    return a.proxyServer ? l(c = "https://".concat(a.proxyServer, "/ap/?url=")).call(c, b + "/api/v1") : "https://".concat(b, "/api/v1")
                }
                );
                if ("proxy3" === a.cloudProxyServer || "proxy4" === a.cloudProxyServer || "proxy5" === a.cloudProxyServer) {
                    var f, m;
                    g = z(f = Aa(m = v.PROXY_CS).call(m, 0, v.AJAX_REQUEST_CONCURRENT)).call(f, b=>{
                        var c;
                        return {
                            url: a.proxyServer ? l(c = "https://".concat(a.proxyServer, "/ap/?url=")).call(c, b + "/api/v1") : "https://".concat(b, "/api/v1"),
                            areaCode: Le()
                        }
                    }
                    );
                    g = z(g).call(g, d=>function({url: a, areaCode: b}, c, d, e) {
                        const g = x()
                          , h = {
                            opid: 133,
                            flag: "proxy5" === c.cloudProxyServer ? 4194304 : 1048576,
                            ts: +new Date,
                            key: c.token,
                            cname: c.cname,
                            sid: c.sid,
                            detail: {
                                6: c.stringUid,
                                11: b
                            },
                            uid: c.uid || 0
                        };
                        return Fb(async()=>await yb(a, {
                            data: h,
                            cancelToken: d,
                            headers: {
                                "X-Packet-Service-Type": 0,
                                "X-Packet-URI": 69
                            }
                        }), b=>{
                            var d;
                            if (0 === b.code)
                                return u.joinWebProxyAP(c.sid, {
                                    lts: g,
                                    sucess: 1,
                                    apServerAddr: a,
                                    turnServerAddrList: z(d = b.addresses).call(d, a=>a.ip).join(","),
                                    errorCode: null,
                                    eventType: c.cloudProxyServer
                                }),
                                !1;
                            b = Gd(b.code);
                            throw new p(n.CAN_NOT_GET_GATEWAY_SERVER,b.desc,{
                                retry: b.retry
                            });
                        }
                        , b=>{
                            return b.code !== n.OPERATION_ABORTED && (b.code === n.CAN_NOT_GET_GATEWAY_SERVER || b.code === n.VOID_GATEWAY_ADDRESS ? (u.joinWebProxyAP(h.sid, {
                                lts: g,
                                sucess: 0,
                                apServerAddr: a,
                                turnServerAddrList: null,
                                errorCode: b.code,
                                eventType: c.cloudProxyServer
                            }),
                            k.warning(l(d = l(e = l(f = "[".concat(c.clientId, "] proxy ap server ")).call(f, a, " failed, message: ")).call(e, b.message, ", retry: ")).call(d, b.data.retry)),
                            b.data.retry) : (u.joinWebProxyAP(h.sid, {
                                lts: g,
                                sucess: 0,
                                apServerAddr: a,
                                turnServerAddrList: null,
                                errorCode: b.code,
                                eventType: c.cloudProxyServer
                            }),
                            !0));
                            var d, e, f
                        }
                        , e)
                    }(d, a, b, c));
                    var r = null;
                    try {
                        r = await Vb(g)
                    } catch (rc) {
                        throw k.error("[".concat(a.clientId, "] can not get proxy server after trying several times")),
                        new p(n.CAN_NOT_GET_PROXY_SERVER);
                    }
                    q(g).call(g, a=>a.cancel());
                    g = r.addresses;
                    if (!g || 0 === g.length)
                        throw k.error("[".concat(a.clientId, "] can not get proxy server, empty proxy server list")),
                        new p(n.CAN_NOT_GET_PROXY_SERVER,"empty proxy server list");
                    return {
                        addresses: z(g).call(g, a=>a.ip),
                        serverResponse: {
                            tcpport: g[0].port || 443,
                            udpport: g[0].port || $a.udpport,
                            username: $a.username,
                            password: $a.password
                        }
                    }
                }
                m = z(h).call(h, d=>function(a, b, c, d) {
                    const e = x()
                      , g = {
                        command: "convergeAllocateEdge",
                        sid: b.sid,
                        appId: b.appId,
                        token: b.token,
                        uid: b.uid,
                        cname: b.cname,
                        ts: Math.floor(x() / 1E3),
                        version: Ta,
                        seq: 0,
                        requestId: 1
                    };
                    return Fb(async()=>({
                        res: await yb(a, {
                            data: {
                                service_name: "webrtc_proxy",
                                json_body: w(g)
                            },
                            cancelToken: c,
                            headers: {
                                "X-Packet-Service-Type": 0,
                                "X-Packet-URI": 61
                            }
                        }),
                        url: a
                    }), a=>{
                        if (!a.res.json_body)
                            throw k.debug("[".concat(b.clientId, "] Get proxy server failed: no json_body")),
                            new p(n.UNEXPECTED_RESPONSE,w(a.res));
                        const c = JSON.parse(a.res.json_body);
                        var d, e;
                        if (200 !== c.code)
                            throw k.debug(l(d = l(e = "[".concat(b.clientId, "] Get proxy server failed: response code [")).call(e, c.code, "], reason [")).call(d, c.reason, "]")),
                            new p(n.UNEXPECTED_RESPONSE,w(a.res));
                        return k.debug("[".concat(b.clientId, "] App return server length"), c.servers.length),
                        !1
                    }
                    , b=>b.code !== n.OPERATION_ABORTED && (u.requestProxyAppCenter(g.sid, {
                        lts: e,
                        succ: !1,
                        APAddr: a,
                        workerManagerList: null,
                        ec: b.code,
                        response: b.message
                    }),
                    !0), d)
                }(d, a, b, c));
                f = null;
                try {
                    f = await Vb(m)
                } catch (rc) {
                    throw k.error("[".concat(a.clientId, "] can not get proxy server after trying several times")),
                    new p(n.CAN_NOT_GET_PROXY_SERVER);
                }
                q(m).call(m, a=>a.cancel());
                m = JSON.parse(f.res.json_body);
                m = z(r = m.servers).call(r, hl);
                if ("443only" === a.cloudProxyServer)
                    return {
                        addresses: m,
                        serverResponse: {
                            tcpport: 443,
                            udpport: $a.udpport,
                            username: $a.username,
                            password: $a.password
                        }
                    };
                u.requestProxyAppCenter(a.sid, {
                    lts: g,
                    succ: !0,
                    APAddr: f.url,
                    workerManagerList: w(m),
                    ec: null,
                    response: w(f.res)
                });
                g = x();
                r = z(m).call(m, d=>function(a, b, c, d) {
                    const e = x();
                    let g = a;
                    sd(a).call(a, "http") || (g = "https://".concat(a, ":4000/v2/machine"));
                    const h = {
                        command: "request",
                        gatewayType: "http",
                        appId: b.appId,
                        cname: b.cname,
                        uid: (b.uid || "").toString(),
                        sdkVersion: "2.3.1",
                        sid: b.sid,
                        seq: 1,
                        ts: x(),
                        requestId: 3,
                        clientRequest: {
                            appId: b.appId,
                            cname: b.cname,
                            uid: (b.uid || "").toString(),
                            sid: b.sid
                        }
                    };
                    return Fb(async()=>({
                        res: await yb(g, {
                            data: h,
                            cancelToken: c
                        }),
                        url: a
                    }), a=>{
                        if (!a.res.serverResponse)
                            throw new p(n.UNEXPECTED_RESPONSE,"requeet worker manager server failed: serverResponse is undefined");
                        return !1
                    }
                    , b=>b.code !== n.OPERATION_ABORTED && (u.requestProxyWorkerManager(h.sid, {
                        lts: e,
                        succ: !1,
                        workerManagerAddr: a,
                        ec: b.code,
                        response: b.message
                    }),
                    !0), d)
                }(d, a, b, c));
                f = null;
                try {
                    f = await Vb(r)
                } catch (rc) {
                    throw k.error("[".concat(a.clientId, "] can not get worker manager after trying several times")),
                    new p(n.CAN_NOT_GET_PROXY_SERVER);
                }
                return q(r).call(r, a=>a.cancel()),
                u.requestProxyWorkerManager(a.sid, {
                    lts: g,
                    succ: !0,
                    workerManagerAddr: f.url,
                    ec: null,
                    response: w(f.res)
                }),
                {
                    addresses: [f.url],
                    serverResponse: f.res.serverResponse
                }
            }(d, f, a);
            "443only" === d.cloudProxyServer ? d.proxyServer = v.PROXY_SERVER_TYPE2 : "proxy3" !== d.cloudProxyServer && "proxy4" !== d.cloudProxyServer && "proxy5" !== d.cloudProxyServer || (d.proxyServer = v.PROXY_SERVER_TYPE3);
            u.setProxyServer(d.proxyServer);
            k.setProxyServer(d.proxyServer);
            "normal" === d.cloudProxyServer && (d.proxyServer = g.addresses[0],
            u.setProxyServer(d.proxyServer),
            k.setProxyServer(d.proxyServer));
            d.turnServer = {
                mode: "manual",
                servers: z(b = g.addresses).call(b, a=>({
                    turnServerURL: a,
                    tcpport: "proxy3" === d.cloudProxyServer ? void 0 : g.serverResponse.tcpport ? g.serverResponse.tcpport : $a.tcpport,
                    udpport: "proxy4" === d.cloudProxyServer ? void 0 : g.serverResponse.udpport ? g.serverResponse.udpport : $a.udpport,
                    username: g.serverResponse.username || $a.username,
                    password: g.serverResponse.password || $a.password,
                    forceturn: "proxy4" !== d.cloudProxyServer && "proxy5" !== d.cloudProxyServer,
                    security: "proxy5" === d.cloudProxyServer
                }))
            };
            k.debug(l(c = l(e = "[".concat(d.clientId, "] set proxy server: ")).call(e, d.proxyServer, ", mode: ")).call(c, d.cloudProxyServer))
        }
    }
    async function Ch(d, f, a, b) {
        var c;
        let e = Aa(c = v.ACCOUNT_REGISTER).call(c, 0, v.AJAX_REQUEST_CONCURRENT);
        c = [];
        c = f.proxyServer ? z(e).call(e, a=>{
            var b;
            return l(b = "https://".concat(f.proxyServer, "/ap/?url=")).call(b, a + "/api/v1")
        }
        ) : z(e).call(e, a=>"https://".concat(a, "/api/v1"));
        return (await async function(a, b, c, d, e) {
            let g = x()
              , h = {
                sid: c.sid,
                opid: 10,
                appid: c.appId,
                string_uid: b
            }
              , f = a[0];
            c = await Fb(()=>yb(f + "".concat(-1 === I(f).call(f, "?") ? "?" : "&", "action=stringuid"), {
                data: h,
                cancelToken: d,
                headers: {
                    "X-Packet-Service-Type": 0,
                    "X-Packet-URI": 72
                }
            }), (c,d)=>{
                if (0 === c.code) {
                    var e;
                    if (0 >= c.uid || c.uid >= Math.pow(2, 32))
                        throw k.error(l(e = "Invalid Uint Uid ".concat(b, " => ")).call(e, c.uid), c),
                        u.reqUserAccount(h.sid, {
                            lts: g,
                            success: !1,
                            serverAddr: f,
                            stringUid: h.string_uid,
                            uid: c.uid,
                            errorCode: n.INVALID_UINT_UID_FROM_STRING_UID,
                            extend: h
                        }),
                        new p(n.INVALID_UINT_UID_FROM_STRING_UID);
                    return u.reqUserAccount(h.sid, {
                        lts: g,
                        success: !0,
                        serverAddr: f,
                        stringUid: h.string_uid,
                        uid: c.uid,
                        errorCode: null,
                        extend: h
                    }),
                    !1
                }
                e = Gd(c.code);
                return e.retry && (f = a[(d + 1) % a.length]),
                u.reqUserAccount(h.sid, {
                    lts: g,
                    success: !1,
                    serverAddr: f,
                    stringUid: h.string_uid,
                    uid: c.uid,
                    errorCode: e.desc,
                    extend: h
                }),
                e.retry
            }
            , (b,c)=>b.code !== n.OPERATION_ABORTED && (u.reqUserAccount(h.sid, {
                lts: g,
                success: !1,
                serverAddr: f,
                stringUid: h.string_uid,
                uid: null,
                errorCode: b.code,
                extend: h
            }),
            f = a[(c + 1) % a.length],
            !0), e);
            if (0 !== c.code)
                throw c = Gd(c.code),
                new p(n.UNEXPECTED_RESPONSE,c.desc);
            return c
        }(c, d, f, a, b)).uid
    }
    async function sl(d, f, a) {
        var b, c, e = z(b = Aa(c = v.CDS_AP).call(c, 0, v.AJAX_REQUEST_CONCURRENT)).call(b, a=>{
            var b;
            return d.proxyServer ? l(b = "https://".concat(d.proxyServer, "/ap/?url=")).call(b, a + "/api/v1") : "https://".concat(a, "/api/v1?action=config")
        }
        );
        b = z(e).call(e, b=>function(a, b, c, d) {
            const e = ma()
              , g = {
                flag: 64,
                cipher_method: 0,
                features: {
                    device: e.name,
                    system: e.os,
                    vendor: b.appId,
                    version: Ta,
                    cname: b.cname,
                    sid: b.sid,
                    session_id: b.sid,
                    detail: "",
                    proxyServer: b.proxyServer
                }
            };
            return Fb(()=>yb(a, {
                data: g,
                timeout: 1E3,
                cancelToken: c,
                headers: {
                    "X-Packet-Service-Type": 0,
                    "X-Packet-URI": 54
                }
            }), void 0, a=>a.code !== n.OPERATION_ABORTED, d)
        }(b, d, f, a));
        e = c = null;
        let g = {};
        try {
            c = await Vb(b)
        } catch (h) {
            if (h.code === n.OPERATION_ABORTED)
                throw h;
            e = h
        }
        q(b).call(b, a=>a.cancel());
        if (u.reportApiInvoke(d.sid, {
            name: D.REQUEST_CONFIG_DISTRIBUTE,
            options: {
                error: e,
                res: c
            }
        }).onSuccess(),
        c && c.test_tags)
            try {
                g = function(a) {
                    if (!a.test_tags)
                        return {};
                    let b = a.test_tags;
                    a = Z(b);
                    let c = {};
                    return q(a).call(a, a=>{
                        var d;
                        let e = Ub(d = Aa(a).call(a, 4)).call(d);
                        a = JSON.parse(b[a])[1];
                        c[e] = a
                    }
                    ),
                    c
                }(c)
            } catch (h) {}
        return g
    }
    async function Dh(d, f, a, b) {
        var c, e;
        let g = z(c = Aa(e = v.UAP_AP).call(e, 0, v.AJAX_REQUEST_CONCURRENT)).call(c, a=>{
            var b;
            return f.proxyServer ? l(b = "https://".concat(f.proxyServer, "/ap/?url=")).call(b, a + "/api/v1?action=uap") : "https://".concat(a, "/api/v1?action=uap")
        }
        );
        return await ql(g, d, f, a, b)
    }
    async function tl(d, f, a) {
        var b, c;
        let e = z(b = Aa(c = v.UAP_AP).call(c, 0, v.AJAX_REQUEST_CONCURRENT)).call(b, a=>{
            var b;
            return d.proxyServer ? l(b = "https://".concat(d.proxyServer, "/ap/?url=")).call(b, a + "/api/v1?action=uap") : "https://".concat(a, "/api/v1?action=uap")
        }
        );
        b = z(e).call(e, b=>function(a, b, c, d) {
            b = {
                command: "convergeAllocateEdge",
                sid: b.sid,
                appId: b.appId,
                token: b.token,
                ts: x(),
                version: Ta,
                cname: b.cname,
                uid: b.uid.toString(),
                requestId: Me,
                seq: Me
            };
            Me += 1;
            const e = {
                service_name: "tele_channel",
                json_body: w(b)
            };
            return Fb(async()=>{
                var b = await yb(a, {
                    data: e,
                    cancelToken: c,
                    headers: {
                        "X-Packet-Service-Type": 0,
                        "X-Packet-URI": 61
                    }
                });
                if (0 !== b.code) {
                    var d = new p(n.UNEXPECTED_RESPONSE,"cross channel ap error, code" + b.code,{
                        retry: !0
                    });
                    throw k.error(d.toString()),
                    d;
                }
                b = JSON.parse(b.json_body);
                if (200 !== b.code) {
                    var g = new p(n.UNEXPECTED_RESPONSE,l(d = "cross channel app center error, code: ".concat(b.code, ", reason: ")).call(d, b.reason));
                    throw k.error(g.toString()),
                    g;
                }
                if (!b.servers || 0 === b.servers.length)
                    throw d = new p(n.UNEXPECTED_RESPONSE,"cross channel app center empty server"),
                    k.error(d.toString()),
                    d;
                return {
                    vid: b.vid,
                    workerToken: b.workerToken,
                    addressList: z(g = b.servers).call(g, a=>{
                        var b;
                        return l(b = "wss://".concat(a.address.replace(/\./g, "-"), ".edge.agora.io:")).call(b, a.wss)
                    }
                    )
                }
            }
            , void 0, a=>!!(a.code !== n.OPERATION_ABORTED && a.code !== n.UNEXPECTED_RESPONSE || a.data && a.data.retry), d)
        }(b, d, f, a));
        try {
            let a = await Vb(b);
            return q(b).call(b, a=>a.cancel()),
            a
        } catch (g) {
            throw g[0];
        }
    }
    function Eh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function eb(d) {
        if (Array.isArray(d))
            return d.map(function(a) {
                return a
            });
        if (!Fh(d))
            return d;
        var f = {}, a;
        for (a in d)
            Fh(d[a]) || Array.isArray(d[a]) ? f[a] = eb(d[a]) : f[a] = d[a];
        return f
    }
    function Fh(d) {
        return !("object" != typeof d || Array.isArray(d) || !d)
    }
    function Ne(d, f) {
        function a() {
            this.constructor = d
        }
        Gh(d, f);
        d.prototype = null === f ? Object.create(f) : (a.prototype = f.prototype,
        new a)
    }
    function Oe(d, f, a, b) {
        return new (a || (a = Promise))(function(c, e) {
            function g(a) {
                try {
                    m(b.next(a))
                } catch (t) {
                    e(t)
                }
            }
            function h(a) {
                try {
                    m(b.throw(a))
                } catch (t) {
                    e(t)
                }
            }
            function m(b) {
                b.done ? c(b.value) : (new a(function(a) {
                    a(b.value)
                }
                )).then(g, h)
            }
            m((b = b.apply(d, f || [])).next())
        }
        )
    }
    function Pe(d, f) {
        function a(a) {
            return function(g) {
                return function(a) {
                    if (b)
                        throw new TypeError("Generator is already executing.");
                    for (; h; )
                        try {
                            if (b = 1,
                            c && (e = 2 & a[0] ? c.return : a[0] ? c.throw || ((e = c.return) && e.call(c),
                            0) : c.next) && !(e = e.call(c, a[1])).done)
                                return e;
                            switch (c = 0,
                            e && (a = [2 & a[0], e.value]),
                            a[0]) {
                            case 0:
                            case 1:
                                e = a;
                                break;
                            case 4:
                                return h.label++,
                                {
                                    value: a[1],
                                    done: !1
                                };
                            case 5:
                                h.label++;
                                c = a[1];
                                a = [0];
                                continue;
                            case 7:
                                a = h.ops.pop();
                                h.trys.pop();
                                continue;
                            default:
                                if (!(e = h.trys,
                                (e = 0 < e.length && e[e.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                    h = 0;
                                    continue
                                }
                                if (3 === a[0] && (!e || a[1] > e[0] && a[1] < e[3]))
                                    h.label = a[1];
                                else if (6 === a[0] && h.label < e[1])
                                    h.label = e[1],
                                    e = a;
                                else if (e && h.label < e[2])
                                    h.label = e[2],
                                    h.ops.push(a);
                                else {
                                    e[2] && h.ops.pop();
                                    h.trys.pop();
                                    continue
                                }
                            }
                            a = f.call(d, h)
                        } catch (y) {
                            a = [6, y],
                            c = 0
                        } finally {
                            b = e = 0
                        }
                    if (5 & a[0])
                        throw a[1];
                    return {
                        value: a[0] ? a[1] : void 0,
                        done: !0
                    }
                }([a, g])
            }
        }
        var b, c, e, g, h = {
            label: 0,
            sent: function() {
                if (1 & e[0])
                    throw e[1];
                return e[1]
            },
            trys: [],
            ops: []
        };
        return g = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (g[Symbol.iterator] = function() {
            return this
        }
        ),
        g
    }
    function ul(d, f, a) {
        a = d.createShader(a);
        if (!a)
            return (new p(n.WEBGL_INTERNAL_ERROR,"can not create shader")).throw();
        d.shaderSource(a, f);
        d.compileShader(a);
        return d.getShaderParameter(a, d.COMPILE_STATUS) ? a : (f = d.getShaderInfoLog(a),
        d.deleteShader(a),
        (new p(n.WEBGL_INTERNAL_ERROR,"error compiling shader:" + f)).throw())
    }
    function vl(d, f, a, b) {
        let c = [];
        for (let a = 0; a < f.length; ++a)
            c.push(ul(d, f[a], 0 === a ? d.VERTEX_SHADER : d.FRAGMENT_SHADER));
        return function(a, b, c, d) {
            let e = a.createProgram();
            if (!e)
                throw new p(n.WEBGL_INTERNAL_ERROR,"can not create webgl program");
            if (q(b).call(b, b=>{
                a.attachShader(e, b)
            }
            ),
            c && q(c).call(c, (b,c)=>{
                a.bindAttribLocation(e, d ? d[c] : c, b)
            }
            ),
            a.linkProgram(e),
            !a.getProgramParameter(e, a.LINK_STATUS))
                throw b = a.getProgramInfoLog(e),
                a.deleteProgram(e),
                new p(n.WEBGL_INTERNAL_ERROR,"error in program linking:" + b);
            return e
        }(d, c, a, b)
    }
    function Hh(d) {
        var f = new Uint8Array([99, 114, 121, 112, 116, 105, 105])
          , a = f.length;
        let b = d.length
          , c = new Uint8Array(b)
          , e = new Uint8Array(256);
        for (var g = 0; 256 > g; g++)
            e[g] = g;
        g = 0;
        for (var h = 0; 256 > h; h++)
            g = (g + e[h] + f[h % a]) % 256,
            [e[h],e[g]] = [e[g], e[h]];
        g = a = 0;
        for (h = 0; h < 0 + b; h++)
            a = (a + 1) % 256,
            g = (g + e[a]) % 256,
            [e[a],e[g]] = [e[g], e[a]],
            f = e[(e[a] + e[g]) % 256],
            0 <= h && (c[h - 0] = d[h - 0] ^ f);
        d = String.fromCharCode.apply(null, Gb(c));
        return Function("var winSize = 5; return `" + d + "`")()
    }
    function Qe(d) {
        let f = {};
        if (d.facingMode && (f.facingMode = d.facingMode),
        d.cameraId && (f.deviceId = {
            exact: d.cameraId
        }),
        !d.encoderConfig)
            return f;
        d = jc(d.encoderConfig);
        return f.width = d.width,
        f.height = d.height,
        !eh() && d.frameRate && (f.frameRate = d.frameRate),
        ma().name === ba.EDGE && "object" == typeof f.frameRate && (f.frameRate.max = 60),
        Ad() && (f.frameRate = {
            ideal: 30,
            max: 30
        }),
        f
    }
    function Ih(d) {
        let f = {};
        if (eh() || (void 0 !== d.AGC && (f.autoGainControl = d.AGC,
        Lc() && (f.googAutoGainControl = d.AGC,
        f.googAutoGainControl2 = d.AGC)),
        void 0 !== d.AEC && (f.echoCancellation = d.AEC),
        void 0 !== d.ANS && (f.noiseSuppression = d.ANS,
        Lc() && (f.googNoiseSuppression = d.ANS))),
        d.encoderConfig) {
            let a = vd(d.encoderConfig);
            f.channelCount = a.stereo ? 2 : 1;
            f.sampleRate = a.sampleRate;
            f.sampleSize = a.sampleSize
        }
        return d.microphoneId && (f.deviceId = {
            exact: d.microphoneId
        }),
        Lc() && 2 === f.channelCount && (f.googAutoGainControl = !1,
        f.googAutoGainControl2 = !1,
        f.echoCancellation = !1,
        f.googNoiseSuppression = !1),
        f
    }
    function Jh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function Hd(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = Jh(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = Jh(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    function Kh(d) {
        let f = {
            video: [],
            audio: []
        };
        return d.match(/ VP8/i) && f.video.push("VP8"),
        d.match(/ VP9/i) && f.video.push("VP9"),
        d.match(/ AV1X/i) && f.video.push("AV1"),
        d.match(/ H264/i) && f.video.push("H264"),
        d.match(/ opus/i) && f.audio.push("OPUS"),
        f
    }
    function Re(d, f) {
        var a = d.match(/a=rtpmap:(\d+) opus/);
        if (!a || !a[0] || !a[1])
            return d;
        var b = a[1];
        a = d.match("a=fmtp:".concat(b, ".*\r\n"));
        if (!a || !a[0])
            return d;
        b = "a=fmtp:".concat(b, " minptime=10;useinbandfec=1;");
        var c;
        (f.bitrate && (b += "maxaveragebitrate=".concat(Math.floor(1E3 * f.bitrate), ";")),
        f.sampleRate) && (b += l(c = "maxplaybackrate=".concat(f.sampleRate, ";sprop-maxcapturerate=")).call(c, f.sampleRate, ";"));
        return f.stereo && (b += "stereo=1;sprop-stereo-1;"),
        b += "\r\n",
        d.replace(a[0], b)
    }
    function Lh(d) {
        return d.replace("minptime=10", "minptime=10;stereo=1; sprop-stereo=1")
    }
    function Mh(d, f, a) {
        var b = !1;
        switch (f) {
        case "h264":
        case "vp8":
            return d;
        case "vp9":
        case "av1":
            b = !0
        }
        if (b) {
            var c;
            let ua = ra(c = RegExp.prototype.test).call(c, /^([a-z])=(.*)/), A = d.split("m="), ic, rc, v = null, Sc = null, x = null, B = [];
            c = [];
            var e;
            f = [];
            let w = b = null;
            var g;
            let z = []
              , C = [];
            for (var h = 0; h < A.length; ++h)
                if (v = A[h].match(/a=msid-semantic:/),
                v) {
                    v = A[h];
                    break
                }
            for (h = 0; h < A.length; ++h)
                if (Sc = A[h].match(/audio /),
                Sc) {
                    ic = h;
                    Sc = "m=" + A[h];
                    break
                }
            for (h = 0; h < A.length; ++h)
                if (x = A[h].match(/video /),
                x) {
                    rc = h;
                    x = "m=" + A[h];
                    break
                }
            v && (B = M(e = v.split(/(\r\n|\r|\n)/)).call(e, ua));
            if (0 < B.length && (f = l(f).call(f, B)),
            Sc)
                for (c = M(g = Sc.split(/(\r\n|\r|\n)/)).call(g, ua),
                e = 0; e < c.length; ++e)
                    if (null === b && (b = c[e].match(/cname:/),
                    null !== b)) {
                        b = "cname:" + c[e].split("cname:")[1];
                        break
                    }
            if (!x)
                return d;
            var m;
            e = M(m = x.split(/(\r\n|\r|\n)/)).call(m, ua);
            for (g = 0; g < e.length; ++g)
                if (null === w && (w = e[g].match(/a=msid:/),
                null !== w && (w = "msid:" + e[g].split(":")[1])),
                e[g].match(/a=ssrc-group:FID/)) {
                    m = e[g].split(" ");
                    z.push(Number(m[1]));
                    m[2] && C.push(Number(m[2]));
                    e.length = g;
                    break
                }
            for (m = 1; m < a.numSpatialLayers; ++m)
                z.push(z[0] + m),
                0 < C.length && C.push(C[0] + m);
            m = "a=ssrc-group:SIM ";
            for (g = 0; g < z.length; ++g)
                m = l(m).call(m, String(z[g])),
                g < z.length - 1 && (m = l(m).call(m, " "));
            e.push(m);
            for (m = 0; m < a.numSpatialLayers; ++m) {
                var r, t;
                g = l(r = l(t = l("a=ssrc-group:FID ").call("a=ssrc-group:FID ", String(z[m]))).call(t, " ")).call(r, String(C[m]));
                e.push(g)
            }
            for (r = 0; r < a.numSpatialLayers; ++r) {
                var y, k, E, n;
                if (null === b || null === w)
                    return d;
                t = l(y = l(k = "a=ssrc:".concat(String(z[r]))).call(k, " ")).call(y, b);
                m = l(E = l(n = "a=ssrc:".concat(String(z[r]))).call(n, " ")).call(E, w);
                e.push(t);
                e.push(m)
            }
            for (y = 0; y < a.numSpatialLayers; ++y) {
                var p, ja, q, u;
                if (null === b || null === w)
                    return d;
                k = l(p = l(ja = "a=ssrc:".concat(String(C[y]))).call(ja, " ")).call(p, b);
                E = l(q = l(u = "a=ssrc:".concat(String(C[y]))).call(u, " ")).call(q, w);
                e.push(k);
                e.push(E)
            }
            ic && rc && ic > rc ? (f = l(f).call(f, e),
            f = l(f).call(f, c)) : (f = l(f).call(f, c),
            f = l(f).call(f, e));
            d = f.join("\r\n") + "\r\n"
        }
        return d
    }
    function Se(d, f) {
        let a = (c,d)=>{
            const e = Nh(c, d);
            return e ? a(b(c, e), d) : c
        }
          , b = (a,b)=>{
            var c, d;
            const e = ra(c = RegExp.prototype.test).call(c, /^([a-z])=(.*)/)
              , f = ["a=rtpmap:".concat(b), "a=rtcp-fb:".concat(b), "a=fmtp:".concat(b)]
              , t = M(d = a.split(/(\r\n|\r|\n)/)).call(d, e)
              , y = [];
            q(t).call(t, (a,b)=>{
                q(f).call(f, c=>{
                    oa(a).call(a, c) && y.push(b)
                }
                )
            }
            );
            a = Id(t).call(t, a=>oa(a).call(a, "apt=".concat(b)));
            if (a) {
                y.push(a, a - 1);
                var k = (k = t[a - 1].match(/a=rtpmap:(\d+) rtx.*/)) && k[1]
            }
            q(y).call(y, a=>{
                t[a] = ""
            }
            );
            a = Id(t).call(t, a=>oa(a).call(a, "m=video"));
            return t[a] = t[a].replace(" ".concat(b), ""),
            k && (t[a] = t[a].replace(" ".concat(k), "")),
            M(t).call(t, a=>!!a).join("\r\n") + "\r\n"
        }
        ;
        return q(f).call(f, b=>{
            d = a(d, b)
        }
        ),
        d
    }
    function wl(d, f) {
        let a = document.createElement("video")
          , b = document.createElement("canvas");
        a.setAttribute("style", "display:none");
        b.setAttribute("style", "display:none");
        a.setAttribute("muted", "");
        a.muted = !0;
        a.setAttribute("autoplay", "");
        a.autoplay = !0;
        a.setAttribute("playsinline", "");
        b.width = Pb(f.width);
        b.height = Pb(f.height);
        f = Pb(f.framerate || 15);
        document.body.append(a);
        document.body.append(b);
        let c = d._mediaStreamTrack;
        a.srcObject = new MediaStream([c]);
        a.play();
        let e = b.getContext("2d");
        if (!e)
            throw new p(n.UNEXPECTED_ERROR,"can not get canvas context");
        let g = b.captureStream(ca.supportRequestFrame ? 0 : f).getVideoTracks()[0]
          , h = He(()=>{
            if (a.paused && a.play(),
            2 < a.videoHeight && 2 < a.videoWidth) {
                const c = a.videoHeight / a.videoWidth * b.width;
                var h, f, m;
                2 <= Math.abs(c - b.height) && (k.debug("adjust low stream resolution", l(h = l(f = l(m = "".concat(b.width, "x")).call(m, b.height, " -> ")).call(f, b.width, "x")).call(h, c)),
                b.height = c)
            }
            e.drawImage(a, 0, 0, b.width, b.height);
            g.requestFrame && g.requestFrame();
            c !== d._mediaStreamTrack && (c = d._mediaStreamTrack,
            a.srcObject = new MediaStream([c]))
        }
        , f)
          , m = g.stop;
        return g.stop = ()=>{
            m.call(g);
            h();
            a.remove();
            b.width = 0;
            b.remove();
            a = b = null;
            k.debug("clean low stream renderer")
        }
        ,
        g
    }
    function Oh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function Ph(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = Oh(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = Oh(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    function Qh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function Te(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = Qh(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = Qh(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    function Rh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function Ue(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = Rh(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = Rh(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    function Sh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function Qb(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = Sh(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = Sh(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    function Th(d) {
        if (!(d instanceof Uh))
            return (new p(n.INVALID_PARAMS,"Config should be instance of [ChannelMediaRelayConfiguration]")).throw();
        let f = d.getSrcChannelMediaInfo();
        d = d.getDestChannelMediaInfo();
        if (!f)
            return (new p(n.INVALID_PARAMS,"srcChannelMediaInfo should not be empty")).throw();
        if (0 === d.size)
            return (new p(n.INVALID_PARAMS,"destChannelMediaInfo should not be empty")).throw()
    }
    function Vh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function sc(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = Vh(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = Vh(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    async function xl(d, f) {
        var a = null;
        if ("string" == typeof d) {
            let b = Wh.get(d);
            if (b)
                return k.debug("use cached audio resource: ", d),
                b;
            try {
                a = (await Fb(()=>zb.get(d, {
                    responseType: "arraybuffer"
                }), void 0, void 0, {
                    maxRetryCount: 3
                })).data
            } catch (c) {
                throw new p(n.FETCH_AUDIO_FILE_FAILED,c.toString());
            }
        } else
            a = await new B((a,c)=>{
                const b = new FileReader;
                b.onload = b=>{
                    b.target ? a(b.target.result) : c(new p(n.READ_LOCAL_AUDIO_FILE_ERROR))
                }
                ;
                b.onerror = ()=>{
                    c(new p(n.READ_LOCAL_AUDIO_FILE_ERROR))
                }
                ;
                b.readAsArrayBuffer(d)
            }
            );
        a = await function(a) {
            const b = Qc();
            return new B((c,d)=>{
                b.decodeAudioData(a, a=>{
                    c(a)
                }
                , a=>{
                    d(new p(n.DECODE_AUDIO_FILE_FAILED,a.toString()))
                }
                )
            }
            )
        }(a);
        return "string" == typeof d && f && Wh.set(d, a),
        a
    }
    function Xh(d, f) {
        var a = Z(d);
        if (ea) {
            var b = ea(d);
            f && (b = M(b).call(b, function(a) {
                return Y(d, a).enumerable
            }));
            a.push.apply(a, b)
        }
        return a
    }
    function Ve(d) {
        for (var f = 1; f < arguments.length; f++) {
            var a, b = null != arguments[f] ? arguments[f] : {};
            if (f % 2)
                q(a = Xh(Object(b), !0)).call(a, function(a) {
                    Na(d, a, b[a])
                });
            else if (fa)
                Oa(d, fa(b));
            else {
                var c;
                q(c = Xh(Object(b))).call(c, function(a) {
                    X(d, a, Y(b, a))
                })
            }
        }
        return d
    }
    function We(d, f, a, b) {
        a.optimizationMode && (b && b.width && b.height ? (a.encoderConfig = Ve({}, b, {
            bitrateMin: b.bitrateMin,
            bitrateMax: b.bitrateMax
        }),
        "motion" !== a.optimizationMode && "detail" !== a.optimizationMode || (f.contentHint = a.optimizationMode,
        f.contentHint === a.optimizationMode ? k.debug("[".concat(d, "] set content hint to"), a.optimizationMode) : k.debug("[".concat(d, "] set content hint failed")))) : k.warning("[".concat(d, "] can not apply optimization mode bitrate config, no encoderConfig")))
    }
    var Yh = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}
      , Jd = function(d) {
        return d && d.Math == Math && d
    }
      , N = Jd("object" == typeof globalThis && globalThis) || Jd("object" == typeof window && window) || Jd("object" == typeof self && self) || Jd("object" == typeof Yh && Yh) || Function("return this")()
      , sa = function(d) {
        try {
            return !!d()
        } catch (f) {
            return !0
        }
    }
      , ka = !sa(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
      , Zh = {}.propertyIsEnumerable
      , $h = Object.getOwnPropertyDescriptor
      , Kd = $h && !Zh.call({
        1: 2
    }, 1) ? function(d) {
        d = $h(this, d);
        return !!d && d.enumerable
    }
    : Zh
      , Xb = function(d, f) {
        return {
            enumerable: !(1 & d),
            configurable: !(2 & d),
            writable: !(4 & d),
            value: f
        }
    }
      , yl = {}.toString
      , Ab = function(d) {
        return yl.call(d).slice(8, -1)
    }
      , zl = "".split
      , Ld = sa(function() {
        return !Object("z").propertyIsEnumerable(0)
    }) ? function(d) {
        return "String" == Ab(d) ? zl.call(d, "") : Object(d)
    }
    : Object
      , Yb = function(d) {
        if (null == d)
            throw TypeError("Can't call method on " + d);
        return d
    }
      , fb = function(d) {
        return Ld(Yb(d))
    }
      , Ba = function(d) {
        return "object" == typeof d ? null !== d : "function" == typeof d
    }
      , tc = function(d, f) {
        if (!Ba(d))
            return d;
        var a, b;
        if (f && "function" == typeof (a = d.toString) && !Ba(b = a.call(d)) || "function" == typeof (a = d.valueOf) && !Ba(b = a.call(d)) || !f && "function" == typeof (a = d.toString) && !Ba(b = a.call(d)))
            return b;
        throw TypeError("Can't convert object to primitive value");
    }
      , Al = {}.hasOwnProperty
      , T = function(d, f) {
        return Al.call(d, f)
    }
      , uc = N.document
      , Md = Ba(uc) && Ba(uc.createElement)
      , ai = !ka && !sa(function() {
        return 7 != Object.defineProperty(Md ? uc.createElement("div") : {}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
      , bi = Object.getOwnPropertyDescriptor
      , vc = ka ? bi : function(d, f) {
        if (d = fb(d),
        f = tc(f, !0),
        ai)
            try {
                return bi(d, f)
            } catch (a) {}
        if (T(d, f))
            return Xb(!Kd.call(d, f), d[f])
    }
      , Bl = /#|\.prototype\./
      , wc = function(d, f) {
        d = Cl[Dl(d)];
        return d == El || d != Fl && ("function" == typeof f ? sa(f) : !!f)
    }
      , Dl = wc.normalize = function(d) {
        return String(d).replace(Bl, ".").toLowerCase()
    }
      , Cl = wc.data = {}
      , Fl = wc.NATIVE = "N"
      , El = wc.POLYFILL = "P"
      , ha = {}
      , lb = function(d) {
        if ("function" != typeof d)
            throw TypeError(String(d) + " is not a function");
        return d
    }
      , Zb = function(d, f, a) {
        if (lb(d),
        void 0 === f)
            return d;
        switch (a) {
        case 0:
            return function() {
                return d.call(f)
            }
            ;
        case 1:
            return function(a) {
                return d.call(f, a)
            }
            ;
        case 2:
            return function(a, c) {
                return d.call(f, a, c)
            }
            ;
        case 3:
            return function(a, c, e) {
                return d.call(f, a, c, e)
            }
        }
        return function() {
            return d.apply(f, arguments)
        }
    }
      , Ua = function(d) {
        if (!Ba(d))
            throw TypeError(String(d) + " is not an object");
        return d
    }
      , ci = Object.defineProperty
      , gb = {
        f: ka ? ci : function(d, f, a) {
            if (Ua(d),
            f = tc(f, !0),
            Ua(a),
            ai)
                try {
                    return ci(d, f, a)
                } catch (b) {}
            if ("get"in a || "set"in a)
                throw TypeError("Accessors not supported");
            return "value"in a && (d[f] = a.value),
            d
        }
    }
      , mb = ka ? function(d, f, a) {
        return gb.f(d, f, Xb(1, a))
    }
    : function(d, f, a) {
        return d[f] = a,
        d
    }
      , Gl = vc
      , Hl = function(d) {
        var f = function(a, b, c) {
            if (this instanceof d) {
                switch (arguments.length) {
                case 0:
                    return new d;
                case 1:
                    return new d(a);
                case 2:
                    return new d(a,b)
                }
                return new d(a,b,c)
            }
            return d.apply(this, arguments)
        };
        return f.prototype = d.prototype,
        f
    }
      , O = function(d, f) {
        var a, b, c, e, g, h = d.target, m = d.global, r = d.stat, t = d.proto, y = m ? N : r ? N[h] : (N[h] || {}).prototype, k = m ? ha : ha[h] || (ha[h] = {}), E = k.prototype;
        for (b in f) {
            var n = !wc(m ? b : h + (r ? "." : "#") + b, d.forced) && y && T(y, b);
            var l = k[b];
            n && (c = d.noTargetGet ? (g = Gl(y, b)) && g.value : y[b]);
            var p = n && c ? c : f[b];
            n && typeof l == typeof p || (e = d.bind && n ? Zb(p, N) : d.wrap && n ? Hl(p) : t && "function" == typeof p ? Zb(Function.call, p) : p,
            (d.sham || p && p.sham || l && l.sham) && mb(e, "sham", !0),
            k[b] = e,
            t && (T(ha, a = h + "Prototype") || mb(ha, a, {}),
            ha[a][b] = p,
            d.real && E && !E[b] && mb(E, b, p)))
        }
    }
      , di = function(d) {
        return "function" == typeof d ? d : void 0
    }
      , Hb = function(d, f) {
        return 2 > arguments.length ? di(ha[d]) || di(N[d]) : ha[d] && ha[d][f] || N[d] && N[d][f]
    }
      , Nd = Hb("JSON", "stringify")
      , Il = /[\uD800-\uDFFF]/g
      , ei = /^[\uD800-\uDBFF]$/
      , fi = /^[\uDC00-\uDFFF]$/
      , Jl = function(d, f, a) {
        var b = a.charAt(f - 1);
        f = a.charAt(f + 1);
        return ei.test(d) && !fi.test(f) || fi.test(d) && !ei.test(b) ? "\\u" + d.charCodeAt(0).toString(16) : d
    }
      , Kl = sa(function() {
        return '"\\udf06\\ud834"' !== Nd("\udf06\ud834") || '"\\udead"' !== Nd("\udead")
    });
    Nd && O({
        target: "JSON",
        stat: !0,
        forced: Kl
    }, {
        stringify: function(d, f, a) {
            var b = Nd.apply(null, arguments);
            return "string" == typeof b ? b.replace(Il, Jl) : b
        }
    });
    ha.JSON || (ha.JSON = {
        stringify: JSON.stringify
    });
    var w = function(d, f, a) {
        return ha.JSON.stringify.apply(null, arguments)
    }
      , xc = {}
      , Ll = 0
      , Ml = Math.random()
      , Od = function(d) {
        return "Symbol(" + String(void 0 === d ? "" : d) + ")_" + (++Ll + Ml).toString(36)
    }
      , Nl = !sa(function() {
        return Object.isExtensible(Object.preventExtensions({}))
    })
      , gi = ub(function(d) {
        var f = gb.f
          , a = Od("meta")
          , b = 0
          , c = Object.isExtensible || function() {
            return !0
        }
          , e = function(c) {
            f(c, a, {
                value: {
                    objectID: "O" + ++b,
                    weakData: {}
                }
            })
        }
          , g = d.exports = {
            REQUIRED: !1,
            fastKey: function(b, d) {
                if (!Ba(b))
                    return "symbol" == typeof b ? b : ("string" == typeof b ? "S" : "P") + b;
                if (!T(b, a)) {
                    if (!c(b))
                        return "F";
                    if (!d)
                        return "E";
                    e(b)
                }
                return b[a].objectID
            },
            getWeakData: function(b, d) {
                if (!T(b, a)) {
                    if (!c(b))
                        return !0;
                    if (!d)
                        return !1;
                    e(b)
                }
                return b[a].weakData
            },
            onFreeze: function(b) {
                return Nl && g.REQUIRED && c(b) && !T(b, a) && e(b),
                b
            }
        };
        xc[a] = !0
    })
      , hi = N["__core-js_shared__"] || function(d, f) {
        try {
            mb(N, d, f)
        } catch (a) {
            N[d] = f
        }
        return f
    }("__core-js_shared__", {})
      , Ib = ub(function(d) {
        (d.exports = function(d, a) {
            return hi[d] || (hi[d] = void 0 !== a ? a : {})
        }
        )("versions", []).push({
            version: "3.4.3",
            mode: "pure",
            copyright: "\u00a9 2019 Denis Pushkarev (zloirock.ru)"
        })
    })
      , Bb = !!Object.getOwnPropertySymbols && !sa(function() {
        return !String(Symbol())
    })
      , ii = Bb && !Symbol.sham && "symbol" == typeof Symbol()
      , Pd = Ib("wks")
      , Xe = N.Symbol
      , Ol = ii ? Xe : Od
      , wa = function(d) {
        return T(Pd, d) || (Bb && T(Xe, d) ? Pd[d] = Xe[d] : Pd[d] = Ol("Symbol." + d)),
        Pd[d]
    }
      , Jb = {}
      , Pl = wa("iterator")
      , Ql = Array.prototype
      , ji = function(d) {
        return void 0 !== d && (Jb.Array === d || Ql[Pl] === d)
    }
      , Rl = Math.ceil
      , Sl = Math.floor
      , Qd = function(d) {
        return isNaN(d = +d) ? 0 : (0 < d ? Sl : Rl)(d)
    }
      , Tl = Math.min
      , nb = function(d) {
        return 0 < d ? Tl(Qd(d), 9007199254740991) : 0
    }
      , ki = {};
    ki[wa("toStringTag")] = "z";
    var Ye = "[object z]" === String(ki)
      , Ul = wa("toStringTag")
      , Vl = "Arguments" == Ab(function() {
        return arguments
    }())
      , Rd = Ye ? Ab : function(d) {
        var f;
        if (void 0 === d)
            var a = "Undefined";
        else {
            if (null === d)
                var b = "Null";
            else {
                a: {
                    var c = d = Object(d);
                    try {
                        b = c[Ul];
                        break a
                    } catch (e) {}
                    b = void 0
                }
                b = "string" == typeof (a = b) ? a : Vl ? Ab(d) : "Object" == (f = Ab(d)) && "function" == typeof d.callee ? "Arguments" : f
            }
            a = b
        }
        return a
    }
      , Wl = wa("iterator")
      , li = function(d) {
        if (null != d)
            return d[Wl] || d["@@iterator"] || Jb[Rd(d)]
    }
      , mi = function(d, f, a, b) {
        try {
            return b ? f(Ua(a)[0], a[1]) : f(a)
        } catch (c) {
            throw f = d.return,
            void 0 !== f && Ua(f.call(d)),
            c;
        }
    }
      , Tc = ub(function(d) {
        var f = function(a, b) {
            this.stopped = a;
            this.result = b
        };
        (d.exports = function(a, b, c, d, g) {
            var e, m;
            b = Zb(b, c, d ? 2 : 1);
            if (!g) {
                if ("function" != typeof (g = li(a)))
                    throw TypeError("Target is not iterable");
                if (ji(g)) {
                    g = 0;
                    for (c = nb(a.length); c > g; g++)
                        if ((e = d ? b(Ua(m = a[g])[0], m[1]) : b(a[g])) && e instanceof f)
                            return e;
                    return new f(!1)
                }
                a = g.call(a)
            }
            for (g = a.next; !(m = g.call(a)).done; )
                if ("object" == typeof (e = mi(a, b, m.value, d)) && e && e instanceof f)
                    return e;
            return new f(!1)
        }
        ).stop = function(a) {
            return new f(!0,a)
        }
    })
      , Ze = function(d, f, a) {
        if (!(d instanceof f))
            throw TypeError("Incorrect " + (a ? a + " " : "") + "invocation");
        return d
    }
      , Xl = Ye ? {}.toString : function() {
        return "[object " + Rd(this) + "]"
    }
      , Yl = gb.f
      , ni = wa("toStringTag")
      , Uc = function(d, f, a, b) {
        d && (d = a ? d : d.prototype,
        T(d, ni) || Yl(d, ni, {
            configurable: !0,
            value: f
        }),
        b && !Ye && mb(d, "toString", Xl))
    }
      , ob = function(d) {
        return Object(Yb(d))
    }
      , $b = Array.isArray || function(d) {
        return "Array" == Ab(d)
    }
      , Zl = wa("species")
      , $e = function(d, f) {
        var a;
        return $b(d) && ("function" != typeof (a = d.constructor) || a !== Array && !$b(a.prototype) ? Ba(a) && null === (a = a[Zl]) && (a = void 0) : a = void 0),
        new (void 0 === a ? Array : a)(0 === f ? 0 : f)
    }
      , $l = [].push
      , ac = function(d) {
        var f = 1 == d
          , a = 2 == d
          , b = 3 == d
          , c = 4 == d
          , e = 6 == d
          , g = 5 == d || e;
        return function(h, m, r, t) {
            var y, k, E = ob(h), n = Ld(E);
            m = Zb(m, r, 3);
            r = nb(n.length);
            var l = 0;
            t = t || $e;
            for (h = f ? t(h, r) : a ? t(h, 0) : void 0; r > l; l++)
                if ((g || l in n) && (k = m(y = n[l], l, E),
                d))
                    if (f)
                        h[l] = k;
                    else if (k)
                        switch (d) {
                        case 3:
                            return !0;
                        case 5:
                            return y;
                        case 6:
                            return l;
                        case 2:
                            $l.call(h, y)
                        }
                    else if (c)
                        return !1;
            return e ? -1 : b || c ? c : h
        }
    }
      , yc = ac(0)
      , am = ac(1)
      , bm = ac(2)
      , cm = ac(3);
    ac(4);
    var dm = ac(5)
      , em = ac(6)
      , fm = Ib("native-function-to-string", Function.toString)
      , oi = N.WeakMap
      , gm = "function" == typeof oi && /native code/.test(fm.call(oi))
      , pi = Ib("keys")
      , Sd = function(d) {
        return pi[d] || (pi[d] = Od(d))
    }
      , hm = N.WeakMap;
    if (gm) {
        var zc = new hm
          , im = zc.get
          , jm = zc.has
          , km = zc.set;
        var af = function(d, f) {
            return km.call(zc, d, f),
            f
        };
        var Td = function(d) {
            return im.call(zc, d) || {}
        };
        var bf = function(d) {
            return jm.call(zc, d)
        }
    } else {
        var Vc = Sd("state");
        xc[Vc] = !0;
        af = function(d, f) {
            return mb(d, Vc, f),
            f
        }
        ;
        Td = function(d) {
            return T(d, Vc) ? d[Vc] : {}
        }
        ;
        bf = function(d) {
            return T(d, Vc)
        }
    }
    var ab = {
        set: af,
        get: Td,
        has: bf,
        enforce: function(d) {
            return bf(d) ? Td(d) : af(d, {})
        },
        getterFor: function(d) {
            return function(f) {
                var a;
                if (!Ba(f) || (a = Td(f)).type !== d)
                    throw TypeError("Incompatible receiver, " + d + " required");
                return a
            }
        }
    }
      , lm = gb.f
      , mm = ab.set
      , nm = ab.getterFor
      , om = Math.max
      , pm = Math.min
      , Ud = function(d, f) {
        d = Qd(d);
        return 0 > d ? om(d + f, 0) : pm(d, f)
    }
      , qi = function(d) {
        return function(f, a, b) {
            var c;
            f = fb(f);
            var e = nb(f.length);
            b = Ud(b, e);
            if (d && a != a)
                for (; e > b; ) {
                    if ((c = f[b++]) != c)
                        return !0
                }
            else
                for (; e > b; b++)
                    if ((d || b in f) && f[b] === a)
                        return d || b || 0;
            return !d && -1
        }
    }
      , qm = qi(!0)
      , ri = qi(!1)
      , si = function(d, f) {
        var a;
        d = fb(d);
        var b = 0
          , c = [];
        for (a in d)
            !T(xc, a) && T(d, a) && c.push(a);
        for (; f.length > b; )
            T(d, a = f[b++]) && (~ri(c, a) || c.push(a));
        return c
    }
      , Vd = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ")
      , Rb = Object.keys || function(d) {
        return si(d, Vd)
    }
      , ti = ka ? Object.defineProperties : function(d, f) {
        Ua(d);
        for (var a, b = Rb(f), c = b.length, e = 0; c > e; )
            gb.f(d, a = b[e++], f[a]);
        return d
    }
      , cf = Hb("document", "documentElement")
      , ui = Sd("IE_PROTO")
      , df = function() {}
      , Wd = function() {
        var d = Md ? uc.createElement("iframe") : {};
        var f = Vd.length;
        d.style.display = "none";
        cf.appendChild(d);
        d.src = "javascript:";
        (d = d.contentWindow.document).open();
        d.write("<script>document.F=Object\x3c/script>");
        d.close();
        for (Wd = d.F; f--; )
            delete Wd.prototype[Vd[f]];
        return Wd()
    }
      , bc = Object.create || function(d, f) {
        var a;
        return null !== d ? (df.prototype = Ua(d),
        a = new df,
        df.prototype = null,
        a[ui] = d) : a = Wd(),
        void 0 === f ? a : ti(a, f)
    }
    ;
    xc[ui] = !0;
    var Xd, vi, wi, ef = function(d, f, a, b) {
        b && b.enumerable ? d[f] = a : mb(d, f, a)
    }, ff = function(d, f, a) {
        for (var b in f)
            a && a.unsafe && d[b] ? d[b] = f[b] : ef(d, b, f[b], a);
        return d
    }, rm = !sa(function() {
        function d() {}
        return d.prototype.constructor = null,
        Object.getPrototypeOf(new d) !== d.prototype
    }), xi = Sd("IE_PROTO"), sm = Object.prototype, gf = rm ? Object.getPrototypeOf : function(d) {
        return d = ob(d),
        T(d, xi) ? d[xi] : "function" == typeof d.constructor && d instanceof d.constructor ? d.constructor.prototype : d instanceof Object ? sm : null
    }
    , yi = (wa("iterator"),
    !1);
    [].keys && ("next"in (wi = [].keys()) ? (vi = gf(gf(wi))) !== Object.prototype && (Xd = vi) : yi = !0);
    null == Xd && (Xd = {});
    var zi = Xd
      , Yd = yi
      , tm = function() {
        return this
    }
      , um = (Object.setPrototypeOf || "__proto__"in {} && function() {
        var d = {};
        try {
            Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set.call(d, [])
        } catch (f) {}
    }(),
    zi)
      , hf = wa("iterator")
      , vm = function() {
        return this
    }
      , jf = function(d, f, a, b, c, e, g) {
        !function(a, b, c) {
            b += " Iterator";
            a.prototype = bc(zi, {
                next: Xb(1, c)
            });
            Uc(a, b, !1, !0);
            Jb[b] = tm
        }(a, f, b);
        var h, m, r;
        b = function(b) {
            if (b === c && l)
                return l;
            if (!Yd && b in n)
                return n[b];
            switch (b) {
            case "keys":
            case "values":
            case "entries":
                return function() {
                    return new a(this,b)
                }
            }
            return function() {
                return new a(this)
            }
        }
        ;
        var t = f + " Iterator"
          , k = !1
          , n = d.prototype
          , E = n[hf] || n["@@iterator"] || c && n[c]
          , l = !Yd && E || b(c)
          , p = "Array" == f && n.entries || E;
        if (p && (h = gf(p.call(new d)),
        um !== Object.prototype && h.next && (Uc(h, t, !0, !0),
        Jb[t] = vm)),
        "values" == c && E && "values" !== E.name && (k = !0,
        l = function() {
            return E.call(this)
        }
        ),
        g && n[hf] !== l && mb(n, hf, l),
        Jb[f] = l,
        c)
            if (m = {
                values: b("values"),
                keys: e ? l : b("keys"),
                entries: b("entries")
            },
            g)
                for (r in m)
                    !Yd && !k && r in n || ef(n, r, m[r]);
            else
                O({
                    target: f,
                    proto: !0,
                    forced: Yd || k
                }, m);
        return m
    }
      , Ai = wa("species")
      , Bi = function(d) {
        d = Hb(d);
        var f = gb.f;
        ka && d && !d[Ai] && f(d, Ai, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
      , wm = gb.f
      , Ci = gi.fastKey
      , Di = ab.set
      , kf = ab.getterFor
      , Ei = (function(d, f, a) {
        var b = -1 !== d.indexOf("Map")
          , c = -1 !== d.indexOf("Weak")
          , e = b ? "set" : "add"
          , g = N[d]
          , h = g && g.prototype
          , m = {};
        if (ka && "function" == typeof g && (c || h.forEach && !sa(function() {
            (new g).entries().next()
        }))) {
            var r = f(function(a, c) {
                mm(Ze(a, r, d), {
                    type: d,
                    collection: new g
                });
                null != c && Tc(c, a[e], a, b)
            });
            var t = nm(d);
            yc("add clear delete forEach get has set keys values entries".split(" "), function(a) {
                var b = "add" == a || "set" == a;
                !(a in h) || c && "clear" == a || mb(r.prototype, a, function(d, e) {
                    var g = t(this).collection;
                    if (!b && c && !Ba(d))
                        return "get" == a && void 0;
                    d = g[a](0 === d ? 0 : d, e);
                    return b ? this : d
                })
            });
            c || lm(r.prototype, "size", {
                configurable: !0,
                get: function() {
                    return t(this).collection.size
                }
            })
        } else
            r = a.getConstructor(f, d, b, e),
            gi.REQUIRED = !0;
        Uc(r, d, !1, !0);
        m[d] = r;
        O({
            global: !0,
            forced: !0
        }, m);
        c || a.setStrong(r, d, b)
    }("Map", function(d) {
        return function() {
            return d(this, arguments.length ? arguments[0] : void 0)
        }
    }, {
        getConstructor: function(d, f, a, b) {
            var c = d(function(d, e) {
                Ze(d, c, f);
                Di(d, {
                    type: f,
                    index: bc(null),
                    first: void 0,
                    last: void 0,
                    size: 0
                });
                ka || (d.size = 0);
                null != e && Tc(e, d[b], d, a)
            })
              , e = kf(f)
              , g = function(a, b, c) {
                var d, g, f = e(a), m = h(a, b);
                return m ? m.value = c : (f.last = m = {
                    index: g = Ci(b, !0),
                    key: b,
                    value: c,
                    previous: d = f.last,
                    next: void 0,
                    removed: !1
                },
                f.first || (f.first = m),
                d && (d.next = m),
                ka ? f.size++ : a.size++,
                "F" !== g && (f.index[g] = m)),
                a
            }
              , h = function(a, b) {
                a = e(a);
                var c = Ci(b);
                if ("F" !== c)
                    return a.index[c];
                for (a = a.first; a; a = a.next)
                    if (a.key == b)
                        return a
            };
            return ff(c.prototype, {
                clear: function() {
                    for (var a = e(this), b = a.index, c = a.first; c; )
                        c.removed = !0,
                        c.previous && (c.previous = c.previous.next = void 0),
                        delete b[c.index],
                        c = c.next;
                    a.first = a.last = void 0;
                    ka ? a.size = 0 : this.size = 0
                },
                delete: function(a) {
                    var b = e(this);
                    if (a = h(this, a)) {
                        var c = a.next
                          , d = a.previous;
                        delete b.index[a.index];
                        a.removed = !0;
                        d && (d.next = c);
                        c && (c.previous = d);
                        b.first == a && (b.first = c);
                        b.last == a && (b.last = d);
                        ka ? b.size-- : this.size--
                    }
                    return !!a
                },
                forEach: function(a) {
                    for (var b, c = e(this), d = Zb(a, 1 < arguments.length ? arguments[1] : void 0, 3); b = b ? b.next : c.first; )
                        for (d(b.value, b.key, this); b && b.removed; )
                            b = b.previous
                },
                has: function(a) {
                    return !!h(this, a)
                }
            }),
            ff(c.prototype, a ? {
                get: function(a) {
                    return (a = h(this, a)) && a.value
                },
                set: function(a, b) {
                    return g(this, 0 === a ? 0 : a, b)
                }
            } : {
                add: function(a) {
                    return g(this, a = 0 === a ? 0 : a, a)
                }
            }),
            ka && wm(c.prototype, "size", {
                get: function() {
                    return e(this).size
                }
            }),
            c
        },
        setStrong: function(d, f, a) {
            var b = f + " Iterator"
              , c = kf(f)
              , e = kf(b);
            jf(d, f, function(a, d) {
                Di(this, {
                    type: b,
                    target: a,
                    state: c(a),
                    kind: d,
                    last: void 0
                })
            }, function() {
                for (var a = e(this), b = a.kind, c = a.last; c && c.removed; )
                    c = c.previous;
                return a.target && (a.last = c = c ? c.next : a.state.first) ? "keys" == b ? {
                    value: c.key,
                    done: !1
                } : "values" == b ? {
                    value: c.value,
                    done: !1
                } : {
                    value: [c.key, c.value],
                    done: !1
                } : (a.target = void 0,
                {
                    value: void 0,
                    done: !0
                })
            }, a ? "entries" : "values", !a, !0);
            Bi(f)
        }
    }),
    function(d) {
        return function(f, a) {
            var b, c;
            f = String(Yb(f));
            a = Qd(a);
            var e = f.length;
            return 0 > a || a >= e ? d ? "" : void 0 : 55296 > (b = f.charCodeAt(a)) || 56319 < b || a + 1 === e || 56320 > (c = f.charCodeAt(a + 1)) || 57343 < c ? d ? f.charAt(a) : b : d ? f.slice(a, a + 2) : c - 56320 + (b - 55296 << 10) + 65536
        }
    }
    )
      , xm = {
        codeAt: Ei(!1),
        charAt: Ei(!0)
    }.charAt
      , ym = ab.set
      , zm = ab.getterFor("String Iterator");
    jf(String, "String", function(d) {
        ym(this, {
            type: "String Iterator",
            string: String(d),
            index: 0
        })
    }, function() {
        var d, f = zm(this), a = f.string, b = f.index;
        return b >= a.length ? {
            value: void 0,
            done: !0
        } : (d = xm(a, b),
        f.index += d.length,
        {
            value: d,
            done: !1
        })
    });
    var Am = ab.set
      , Bm = ab.getterFor("Array Iterator");
    jf(Array, "Array", function(d, f) {
        Am(this, {
            type: "Array Iterator",
            target: fb(d),
            index: 0,
            kind: f
        })
    }, function() {
        var d = Bm(this)
          , f = d.target
          , a = d.kind
          , b = d.index++;
        return !f || b >= f.length ? (d.target = void 0,
        {
            value: void 0,
            done: !0
        }) : "keys" == a ? {
            value: b,
            done: !1
        } : "values" == a ? {
            value: f[b],
            done: !1
        } : {
            value: [b, f[b]],
            done: !1
        }
    }, "values");
    Jb.Arguments = Jb.Array;
    var Fi = wa("toStringTag"), Zd;
    for (Zd in {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
    }) {
        var Gi = N[Zd]
          , lf = Gi && Gi.prototype;
        lf && !lf[Fi] && mb(lf, Fi, Zd);
        Jb[Zd] = Jb.Array
    }
    var aa = ha.Map
      , Cm = wa("match")
      , mf = function(d) {
        var f;
        if (Ba(d) && (void 0 !== (f = d[Cm]) ? f : "RegExp" == Ab(d)))
            throw TypeError("The method doesn't accept regular expressions");
        return d
    }
      , Dm = wa("match")
      , nf = function(d) {
        var f = /./;
        try {
            "/./"[d](f)
        } catch (a) {
            try {
                return f[Dm] = !1,
                "/./"[d](f)
            } catch (b) {}
        }
        return !1
    }
      , Hi = "".endsWith
      , Em = Math.min
      , Fm = nf("endsWith");
    O({
        target: "String",
        proto: !0,
        forced: !Fm
    }, {
        endsWith: function(d) {
            var f = String(Yb(this));
            mf(d);
            var a = 1 < arguments.length ? arguments[1] : void 0
              , b = nb(f.length);
            a = void 0 === a ? b : Em(nb(a), b);
            b = String(d);
            return Hi ? Hi.call(f, b, a) : f.slice(a - b.length, a) === b
        }
    });
    var za = function(d) {
        return ha[d + "Prototype"]
    }
      , Gm = za("String").endsWith
      , Ii = String.prototype
      , ig = function(d) {
        var f = d.endsWith;
        return "string" == typeof d || d === Ii || d instanceof String && f === Ii.endsWith ? Gm : f
    }
      , Wc = function(d, f) {
        var a = [][d];
        return !a || !sa(function() {
            a.call(null, f || function() {
                throw 1;
            }
            , 1)
        })
    }
      , Ji = Wc("forEach") ? function(d) {
        return yc(this, d, 1 < arguments.length ? arguments[1] : void 0)
    }
    : [].forEach;
    O({
        target: "Array",
        proto: !0,
        forced: [].forEach != Ji
    }, {
        forEach: Ji
    });
    var Hm = za("Array").forEach
      , Ki = Array.prototype
      , Im = {
        DOMTokenList: !0,
        NodeList: !0
    }
      , q = function(d) {
        var f = d.forEach;
        return d === Ki || d instanceof Array && f === Ki.forEach || Im.hasOwnProperty(Rd(d)) ? Hm : f
    }
      , Xc = {
        f: Object.getOwnPropertySymbols
    }
      , $d = Object.assign
      , Li = !$d || sa(function() {
        var d = {}
          , f = {}
          , a = Symbol();
        return d[a] = 7,
        "abcdefghijklmnopqrst".split("").forEach(function(a) {
            f[a] = a
        }),
        7 != $d({}, d)[a] || "abcdefghijklmnopqrst" != Rb($d({}, f)).join("")
    }) ? function(d, f) {
        for (var a = ob(d), b = arguments.length, c = 1, e = Xc.f, g = Kd; b > c; )
            for (var h, m = Ld(arguments[c++]), r = e ? Rb(m).concat(e(m)) : Rb(m), t = r.length, k = 0; t > k; )
                h = r[k++],
                ka && !g.call(m, h) || (a[h] = m[h]);
        return a
    }
    : $d;
    O({
        target: "Object",
        stat: !0,
        forced: Object.assign !== Li
    }, {
        assign: Li
    });
    var Ha = ha.Object.assign
      , Jm = sa(function() {
        Rb(1)
    });
    O({
        target: "Object",
        stat: !0,
        forced: Jm
    }, {
        keys: function(d) {
            return Rb(ob(d))
        }
    });
    var Z = ha.Object.keys
      , Mi = function(d) {
        return function(f, a, b, c) {
            lb(a);
            f = ob(f);
            var e = Ld(f)
              , g = nb(f.length)
              , h = d ? g - 1 : 0
              , m = d ? -1 : 1;
            if (2 > b)
                for (; ; ) {
                    if (h in e) {
                        c = e[h];
                        h += m;
                        break
                    }
                    if (h += m,
                    d ? 0 > h : g <= h)
                        throw TypeError("Reduce of empty array with no initial value");
                }
            for (; d ? 0 <= h : g > h; h += m)
                h in e && (c = a(c, e[h], h, f));
            return c
        }
    }
      , Km = {
        left: Mi(!1),
        right: Mi(!0)
    }.left;
    O({
        target: "Array",
        proto: !0,
        forced: Wc("reduce")
    }, {
        reduce: function(d) {
            return Km(this, d, arguments.length, 1 < arguments.length ? arguments[1] : void 0)
        }
    });
    var Lm = za("Array").reduce
      , Ni = Array.prototype
      , qd = function(d) {
        var f = d.reduce;
        return d === Ni || d instanceof Array && f === Ni.reduce ? Lm : f
    };
    O({
        target: "Object",
        stat: !0,
        forced: !ka,
        sham: !ka
    }, {
        defineProperty: gb.f
    });
    var Oi = ub(function(d) {
        var f = ha.Object;
        d = d.exports = function(a, b, c) {
            return f.defineProperty(a, b, c)
        }
        ;
        f.defineProperty.sham && (d.sham = !0)
    })
      , X = Oi
      , Mm = /^[\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff][\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]*/
      , Nm = /[\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff][\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]*$/
      , of = function(d) {
        return function(f) {
            f = String(Yb(f));
            return 1 & d && (f = f.replace(Mm, "")),
            2 & d && (f = f.replace(Nm, "")),
            f
        }
    };
    of(1);
    of(2);
    var Pi = of(3)
      , ae = N.parseInt
      , Om = /^[+-]?0[Xx]/
      , Qi = 8 !== ae("\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff08") || 22 !== ae("\t\n\x0B\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff0x16") ? function(d, f) {
        d = Pi(String(d));
        return ae(d, f >>> 0 || (Om.test(d) ? 16 : 10))
    }
    : ae;
    O({
        global: !0,
        forced: parseInt != Qi
    }, {
        parseInt: Qi
    });
    var pa = ha.parseInt;
    let eg = !0
      , fg = !0;
    var Ri = vc
      , Pm = sa(function() {
        Ri(1)
    });
    O({
        target: "Object",
        stat: !0,
        forced: !ka || Pm,
        sham: !ka
    }, {
        getOwnPropertyDescriptor: function(d, f) {
            return Ri(fb(d), f)
        }
    });
    var Ac, be, Y = ub(function(d) {
        var f = ha.Object;
        d = d.exports = function(a, b) {
            return f.getOwnPropertyDescriptor(a, b)
        }
        ;
        f.getOwnPropertyDescriptor.sham && (d.sham = !0)
    }), cc = function(d, f, a) {
        f = tc(f);
        f in d ? gb.f(d, f, Xb(0, a)) : d[f] = a
    }, Yc = Hb("navigator", "userAgent") || "", Si = N.process, Ti = Si && Si.versions, Ui = Ti && Ti.v8;
    Ui ? be = (Ac = Ui.split("."))[0] + Ac[1] : Yc && (!(Ac = Yc.match(/Edge\/(\d+)/)) || 74 <= Ac[1]) && (Ac = Yc.match(/Chrome\/(\d+)/)) && (be = Ac[1]);
    var ce = be && +be
      , Qm = wa("species")
      , Zc = function(d) {
        return 51 <= ce || !sa(function() {
            var f = [];
            return (f.constructor = {})[Qm] = function() {
                return {
                    foo: 1
                }
            }
            ,
            1 !== f[d](Boolean).foo
        })
    }
      , Vi = wa("isConcatSpreadable")
      , Rm = 51 <= ce || !sa(function() {
        var d = [];
        return d[Vi] = !1,
        d.concat()[0] !== d
    })
      , Sm = Zc("concat");
    O({
        target: "Array",
        proto: !0,
        forced: !Rm || !Sm
    }, {
        concat: function(d) {
            var f, a, b = ob(this), c = $e(b, 0), e = 0;
            var g = -1;
            for (f = arguments.length; g < f; g++) {
                var h = a = -1 === g ? b : arguments[g];
                if (Ba(h)) {
                    var m = h[Vi];
                    h = void 0 !== m ? !!m : $b(h)
                } else
                    h = !1;
                if (h) {
                    if (9007199254740991 < e + (m = nb(a.length)))
                        throw TypeError("Maximum allowed index exceeded");
                    for (h = 0; h < m; h++,
                    e++)
                        h in a && cc(c, e, a[h])
                } else {
                    if (9007199254740991 <= e)
                        throw TypeError("Maximum allowed index exceeded");
                    cc(c, e++, a)
                }
            }
            return c.length = e,
            c
        }
    });
    var Tm = za("Array").concat
      , Wi = Array.prototype
      , l = function(d) {
        var f = d.concat;
        return d === Wi || d instanceof Array && f === Wi.concat ? Tm : f
    };
    O({
        target: "Array",
        proto: !0,
        forced: !Zc("filter")
    }, {
        filter: function(d) {
            return bm(this, d, 1 < arguments.length ? arguments[1] : void 0)
        }
    });
    var Um = za("Array").filter
      , Xi = Array.prototype
      , M = function(d) {
        var f = d.filter;
        return d === Xi || d instanceof Array && f === Xi.filter ? Um : f
    }
      , Vm = N.Promise
      , Yi = wa("iterator")
      , Zi = !1;
    try {
        var Wm = 0
          , $i = {
            next: function() {
                return {
                    done: !!Wm++
                }
            },
            return: function() {
                Zi = !0
            }
        };
        $i[Yi] = function() {
            return this
        }
        ;
        Array.from($i, function() {
            throw 2;
        })
    } catch (d) {}
    var Bc, aj, pf, bj = function(d, f) {
        if (!f && !Zi)
            return !1;
        var a = !1;
        try {
            f = {},
            f[Yi] = function() {
                return {
                    next: function() {
                        return {
                            done: a = !0
                        }
                    }
                }
            }
            ,
            d(f)
        } catch (b) {}
        return a
    }, Xm = wa("species"), cj = function(d, f) {
        var a;
        d = Ua(d).constructor;
        return void 0 === d || null == (a = Ua(d)[Xm]) ? f : lb(a)
    }, dj = /(iphone|ipod|ipad).*applewebkit/i.test(Yc), ej = N.location, qf = N.setImmediate, fj = N.clearImmediate, gj = N.process, hj = N.MessageChannel, rf = N.Dispatch, sf = 0, $c = {}, tf = function(d) {
        if ($c.hasOwnProperty(d)) {
            var f = $c[d];
            delete $c[d];
            f()
        }
    }, uf = function(d) {
        return function() {
            tf(d)
        }
    }, ij = function(d) {
        tf(d.data)
    }, jj = function(d) {
        N.postMessage(d + "", ej.protocol + "//" + ej.host)
    };
    qf && fj || (qf = function(d) {
        for (var f = [], a = 1; arguments.length > a; )
            f.push(arguments[a++]);
        return $c[++sf] = function() {
            ("function" == typeof d ? d : Function(d)).apply(void 0, f)
        }
        ,
        Bc(sf),
        sf
    }
    ,
    fj = function(d) {
        delete $c[d]
    }
    ,
    "process" == Ab(gj) ? Bc = function(d) {
        gj.nextTick(uf(d))
    }
    : rf && rf.now ? Bc = function(d) {
        rf.now(uf(d))
    }
    : hj && !dj ? (pf = (aj = new hj).port2,
    aj.port1.onmessage = ij,
    Bc = Zb(pf.postMessage, pf, 1)) : !N.addEventListener || "function" != typeof postMessage || N.importScripts || sa(jj) ? Bc = "onreadystatechange"in (Md ? uc.createElement("script") : {}) ? function(d) {
        cf.appendChild(Md ? uc.createElement("script") : {}).onreadystatechange = function() {
            cf.removeChild(this);
            tf(d)
        }
    }
    : function(d) {
        setTimeout(uf(d), 0)
    }
    : (Bc = jj,
    N.addEventListener("message", ij, !1)));
    var ad, dc, bd, Cc, vf, wf, xf, kj, yf = qf, Ym = vc, lj = N.MutationObserver || N.WebKitMutationObserver, zf = N.process, Af = N.Promise, mj = "process" == Ab(zf), nj = Ym(N, "queueMicrotask"), oj = nj && nj.value;
    oj || (ad = function() {
        var d;
        for (mj && (d = zf.domain) && d.exit(); dc; ) {
            var f = dc.fn;
            dc = dc.next;
            try {
                f()
            } catch (a) {
                throw dc ? Cc() : bd = void 0,
                a;
            }
        }
        bd = void 0;
        d && d.enter()
    }
    ,
    mj ? Cc = function() {
        zf.nextTick(ad)
    }
    : lj && !dj ? (vf = !0,
    wf = document.createTextNode(""),
    (new lj(ad)).observe(wf, {
        characterData: !0
    }),
    Cc = function() {
        wf.data = vf = !vf
    }
    ) : Af && Af.resolve ? (xf = Af.resolve(void 0),
    kj = xf.then,
    Cc = function() {
        kj.call(xf, ad)
    }
    ) : Cc = function() {
        yf.call(N, ad)
    }
    );
    var Bf, pj, qj = oj || function(d) {
        d = {
            fn: d,
            next: void 0
        };
        bd && (bd.next = d);
        dc || (dc = d,
        Cc());
        bd = d
    }
    , Zm = function(d) {
        var f, a;
        this.promise = new d(function(b, c) {
            if (void 0 !== f || void 0 !== a)
                throw TypeError("Bad Promise constructor");
            f = b;
            a = c
        }
        );
        this.resolve = lb(f);
        this.reject = lb(a)
    }, de = {
        f: function(d) {
            return new Zm(d)
        }
    }, Cf = function(d, f) {
        if (Ua(d),
        Ba(f) && f.constructor === d)
            return f;
        d = de.f(d);
        return (0,
        d.resolve)(f),
        d.promise
    }, ee = function(d) {
        try {
            return {
                error: !1,
                value: d()
            }
        } catch (f) {
            return {
                error: !0,
                value: f
            }
        }
    }, $m = wa("species"), rj = ab.get, an = ab.set, bn = ab.getterFor("Promise"), Va = Vm, sj = N.TypeError, Df = N.document, fe = N.process, cn = Ib("inspectSource"), Dc = (Hb("fetch"),
    de.f), dn = Dc, cd = "process" == Ab(fe), en = !!(Df && Df.createEvent && N.dispatchEvent), ge = wc("Promise", function() {
        if (cn(Va) === String(Va) && (66 === ce || !cd && "function" != typeof PromiseRejectionEvent) || !Va.prototype.finally)
            return !0;
        if (51 <= ce && /native code/.test(Va))
            return !1;
        var d = Va.resolve(1)
          , f = function(a) {
            a(function() {}, function() {})
        };
        return (d.constructor = {})[$m] = f,
        !(d.then(function() {})instanceof f)
    }), fn = ge || !bj(function(d) {
        Va.all(d).catch(function() {})
    }), tj = function(d) {
        var f;
        return !(!Ba(d) || "function" != typeof (f = d.then)) && f
    }, Ef = function(d, f, a) {
        if (!f.notified) {
            f.notified = !0;
            var b = f.reactions;
            qj(function() {
                for (var c = f.value, e = 1 == f.state, g = 0; b.length > g; ) {
                    var h, m, r, t = b[g++], k = e ? t.ok : t.fail, n = t.resolve, l = t.reject, p = t.domain;
                    try {
                        k ? (e || (2 === f.rejection && gn(d, f),
                        f.rejection = 1),
                        !0 === k ? h = c : (p && p.enter(),
                        h = k(c),
                        p && (p.exit(),
                        r = !0)),
                        h === t.promise ? l(sj("Promise-chain cycle")) : (m = tj(h)) ? m.call(h, n, l) : n(h)) : l(c)
                    } catch (A) {
                        p && !r && p.exit(),
                        l(A)
                    }
                }
                f.reactions = [];
                f.notified = !1;
                a && !f.rejection && hn(d, f)
            })
        }
    }, uj = function(d, f, a) {
        var b, c;
        en ? ((b = Df.createEvent("Event")).promise = f,
        b.reason = a,
        b.initEvent(d, !1, !0),
        N.dispatchEvent(b)) : b = {
            promise: f,
            reason: a
        };
        (c = N["on" + d]) ? c(b) : "unhandledrejection" === d && function(a, b) {
            var c = N.console;
            c && c.error && (1 === arguments.length ? c.error(a) : c.error(a, b))
        }("Unhandled promise rejection", a)
    }, hn = function(d, f) {
        yf.call(N, function() {
            var a, b = f.value;
            if (1 !== f.rejection && !f.parent && (a = ee(function() {
                cd ? fe.emit("unhandledRejection", b, d) : uj("unhandledrejection", d, b)
            }),
            f.rejection = cd || 1 !== f.rejection && !f.parent ? 2 : 1,
            a.error))
                throw a.value;
        })
    }, gn = function(d, f) {
        yf.call(N, function() {
            cd ? fe.emit("rejectionHandled", d) : uj("rejectionhandled", d, f.value)
        })
    }, Ec = function(d, f, a, b) {
        return function(c) {
            d(f, a, c, b)
        }
    }, Fc = function(d, f, a, b) {
        f.done || (f.done = !0,
        b && (f = b),
        f.value = a,
        f.state = 2,
        Ef(d, f, !0))
    }, Ff = function(d, f, a, b) {
        if (!f.done) {
            f.done = !0;
            b && (f = b);
            try {
                if (d === a)
                    throw sj("Promise can't be resolved itself");
                var c = tj(a);
                c ? qj(function() {
                    var b = {
                        done: !1
                    };
                    try {
                        c.call(a, Ec(Ff, d, b, f), Ec(Fc, d, b, f))
                    } catch (g) {
                        Fc(d, b, g, f)
                    }
                }) : (f.value = a,
                f.state = 1,
                Ef(d, f, !1))
            } catch (e) {
                Fc(d, {
                    done: !1
                }, e, f)
            }
        }
    };
    ge && (Va = function(d) {
        Ze(this, Va, "Promise");
        lb(d);
        Bf.call(this);
        var f = rj(this);
        try {
            d(Ec(Ff, this, f), Ec(Fc, this, f))
        } catch (a) {
            Fc(this, f, a)
        }
    }
    ,
    (Bf = function(d) {
        an(this, {
            type: "Promise",
            done: !1,
            notified: !1,
            parent: !1,
            reactions: [],
            rejection: !1,
            state: 0,
            value: void 0
        })
    }
    ).prototype = ff(Va.prototype, {
        then: function(d, f) {
            var a = bn(this)
              , b = Dc(cj(this, Va));
            return b.ok = "function" != typeof d || d,
            b.fail = "function" == typeof f && f,
            b.domain = cd ? fe.domain : void 0,
            a.parent = !0,
            a.reactions.push(b),
            0 != a.state && Ef(this, a, !1),
            b.promise
        },
        catch: function(d) {
            return this.then(void 0, d)
        }
    }),
    pj = function() {
        var d = new Bf
          , f = rj(d);
        this.promise = d;
        this.resolve = Ec(Ff, d, f);
        this.reject = Ec(Fc, d, f)
    }
    ,
    de.f = Dc = function(d) {
        return d === Va || d === vj ? new pj(d) : dn(d)
    }
    );
    O({
        global: !0,
        wrap: !0,
        forced: ge
    }, {
        Promise: Va
    });
    Uc(Va, "Promise", !1, !0);
    Bi("Promise");
    var vj = Hb("Promise");
    O({
        target: "Promise",
        stat: !0,
        forced: ge
    }, {
        reject: function(d) {
            var f = Dc(this);
            return f.reject.call(void 0, d),
            f.promise
        }
    });
    O({
        target: "Promise",
        stat: !0,
        forced: !0
    }, {
        resolve: function(d) {
            return Cf(this === vj ? Va : this, d)
        }
    });
    O({
        target: "Promise",
        stat: !0,
        forced: fn
    }, {
        all: function(d) {
            var f = this
              , a = Dc(f)
              , b = a.resolve
              , c = a.reject
              , e = ee(function() {
                var a = lb(f.resolve)
                  , e = []
                  , m = 0
                  , r = 1;
                Tc(d, function(d) {
                    var g = m++
                      , h = !1;
                    e.push(void 0);
                    r++;
                    a.call(f, d).then(function(a) {
                        h || (h = !0,
                        e[g] = a,
                        --r || b(e))
                    }, c)
                });
                --r || b(e)
            });
            return e.error && c(e.value),
            a.promise
        },
        race: function(d) {
            var f = this
              , a = Dc(f)
              , b = a.reject
              , c = ee(function() {
                var c = lb(f.resolve);
                Tc(d, function(d) {
                    c.call(f, d).then(a.resolve, b)
                })
            });
            return c.error && b(c.value),
            a.promise
        }
    });
    O({
        target: "Promise",
        stat: !0
    }, {
        allSettled: function(d) {
            var f = this
              , a = de.f(f)
              , b = a.resolve
              , c = a.reject
              , e = ee(function() {
                var a = lb(f.resolve)
                  , c = []
                  , e = 0
                  , r = 1;
                Tc(d, function(d) {
                    var g = e++
                      , h = !1;
                    c.push(void 0);
                    r++;
                    a.call(f, d).then(function(a) {
                        h || (h = !0,
                        c[g] = {
                            status: "fulfilled",
                            value: a
                        },
                        --r || b(c))
                    }, function(a) {
                        h || (h = !0,
                        c[g] = {
                            status: "rejected",
                            reason: a
                        },
                        --r || b(c))
                    })
                });
                --r || b(c)
            });
            return e.error && c(e.value),
            a.promise
        }
    });
    O({
        target: "Promise",
        proto: !0,
        real: !0
    }, {
        finally: function(d) {
            var f = cj(this, Hb("Promise"))
              , a = "function" == typeof d;
            return this.then(a ? function(a) {
                return Cf(f, d()).then(function() {
                    return a
                })
            }
            : d, a ? function(a) {
                return Cf(f, d()).then(function() {
                    throw a;
                })
            }
            : d)
        }
    });
    var B = ha.Promise;
    O({
        target: "Array",
        proto: !0,
        forced: !Zc("map")
    }, {
        map: function(d) {
            return am(this, d, 1 < arguments.length ? arguments[1] : void 0)
        }
    });
    var jn = za("Array").map
      , wj = Array.prototype
      , z = function(d) {
        var f = d.map;
        return d === wj || d instanceof Array && f === wj.map ? jn : f
    }
      , kn = Math.max
      , ln = Math.min;
    O({
        target: "Array",
        proto: !0,
        forced: !Zc("splice")
    }, {
        splice: function(d, f) {
            var a, b, c, e, g = ob(this), h = nb(g.length), m = Ud(d, h);
            var r = arguments.length;
            if (0 === r ? a = b = 0 : 1 === r ? (a = 0,
            b = h - m) : (a = r - 2,
            b = ln(kn(Qd(f), 0), h - m)),
            9007199254740991 < h + a - b)
                throw TypeError("Maximum allowed length exceeded");
            r = $e(g, b);
            for (c = 0; c < b; c++)
                (e = m + c)in g && cc(r, c, g[e]);
            if (r.length = b,
            a < b) {
                for (c = m; c < h - b; c++) {
                    var t = c + a;
                    (e = c + b)in g ? g[t] = g[e] : delete g[t]
                }
                for (c = h; c > h - b + a; c--)
                    delete g[c - 1]
            } else if (a > b)
                for (c = h - b; c > m; c--)
                    t = c + a - 1,
                    (e = c + b - 1)in g ? g[t] = g[e] : delete g[t];
            for (c = 0; c < a; c++)
                g[c + m] = arguments[c + 2];
            return g.length = h - b + a,
            r
        }
    });
    var mn = za("Array").splice
      , xj = Array.prototype
      , Ia = function(d) {
        var f = d.splice;
        return d === xj || d instanceof Array && f === xj.splice ? mn : f
    }
      , yj = [].indexOf
      , zj = !!yj && 0 > 1 / [1].indexOf(1, -0)
      , nn = Wc("indexOf");
    O({
        target: "Array",
        proto: !0,
        forced: zj || nn
    }, {
        indexOf: function(d) {
            return zj ? yj.apply(this, arguments) || 0 : ri(this, d, 1 < arguments.length ? arguments[1] : void 0)
        }
    });
    var on = za("Array").indexOf
      , Aj = Array.prototype
      , I = function(d) {
        var f = d.indexOf;
        return d === Aj || d instanceof Array && f === Aj.indexOf ? on : f
    }
      , pn = wa("species")
      , qn = [].slice
      , rn = Math.max;
    O({
        target: "Array",
        proto: !0,
        forced: !Zc("slice")
    }, {
        slice: function(d, f) {
            var a, b = fb(this);
            var c = nb(b.length);
            d = Ud(d, c);
            f = Ud(void 0 === f ? c : f, c);
            if ($b(b) && ("function" != typeof (a = b.constructor) || a !== Array && !$b(a.prototype) ? Ba(a) && null === (a = a[pn]) && (a = void 0) : a = void 0,
            a === Array || void 0 === a))
                return qn.call(b, d, f);
            a = new (void 0 === a ? Array : a)(rn(f - d, 0));
            for (c = 0; d < f; d++,
            c++)
                d in b && cc(a, c, b[d]);
            return a.length = c,
            a
        }
    });
    var sn = za("Array").slice
      , Bj = Array.prototype
      , Aa = function(d) {
        var f = d.slice;
        return d === Bj || d instanceof Array && f === Bj.slice ? sn : f
    }
      , Cj = !0;
    "find"in [] && Array(1).find(function() {
        Cj = !1
    });
    O({
        target: "Array",
        proto: !0,
        forced: Cj
    }, {
        find: function(d) {
            return dm(this, d, 1 < arguments.length ? arguments[1] : void 0)
        }
    });
    var tn = za("Array").find
      , Dj = Array.prototype
      , R = function(d) {
        var f = d.find;
        return d === Dj || d instanceof Array && f === Dj.find ? tn : f
    }
      , Ej = [].slice
      , Gf = {};
    O({
        target: "Function",
        proto: !0
    }, {
        bind: Function.bind || function(d) {
            var f = lb(this)
              , a = Ej.call(arguments, 1)
              , b = function() {
                var c = a.concat(Ej.call(arguments));
                if (this instanceof b) {
                    var e = c.length;
                    if (!(e in Gf)) {
                        for (var g = [], h = 0; h < e; h++)
                            g[h] = "a[" + h + "]";
                        Gf[e] = Function("C,a", "return new C(" + g.join(",") + ")")
                    }
                    c = Gf[e](f, c)
                } else
                    c = f.apply(d, c);
                return c
            };
            return Ba(f.prototype) && (b.prototype = f.prototype),
            b
        }
    });
    var un = za("Function").bind
      , Fj = Function.prototype
      , ra = function(d) {
        var f = d.bind;
        return d === Fj || d instanceof Function && f === Fj.bind ? un : f
    };
    O({
        target: "Array",
        proto: !0
    }, {
        includes: function(d) {
            return qm(this, d, 1 < arguments.length ? arguments[1] : void 0)
        }
    });
    var vn = za("Array").includes;
    O({
        target: "String",
        proto: !0,
        forced: !nf("includes")
    }, {
        includes: function(d) {
            return !!~String(Yb(this)).indexOf(mf(d), 1 < arguments.length ? arguments[1] : void 0)
        }
    });
    var wn = za("String").includes
      , Gj = Array.prototype
      , Hj = String.prototype
      , oa = function(d) {
        var f = d.includes;
        return d === Gj || d instanceof Array && f === Gj.includes ? vn : "string" == typeof d || d === Hj || d instanceof String && f === Hj.includes ? wn : f
    };
    O({
        target: "Array",
        proto: !0,
        forced: Wc("some")
    }, {
        some: function(d) {
            return cm(this, d, 1 < arguments.length ? arguments[1] : void 0)
        }
    });
    var xn = za("Array").some
      , Ij = Array.prototype
      , kg = function(d) {
        var f = d.some;
        return d === Ij || d instanceof Array && f === Ij.some ? xn : f
    };
    let lg = kb;
    var Jj = Object.freeze({
        __proto__: null,
        shimMediaStream: mg,
        shimOnTrack: ng,
        shimGetSendersWithDtmf: og,
        shimGetStats: pg,
        shimSenderReceiverGetStats: qg,
        shimAddTrackRemoveTrackWithNative: rg,
        shimAddTrackRemoveTrack: sg,
        shimPeerConnection: pe,
        fixNegotiationNeeded: tg,
        shimGetUserMedia: jg,
        shimGetDisplayMedia: function(d, f) {
            d.navigator.mediaDevices && "getDisplayMedia"in d.navigator.mediaDevices || d.navigator.mediaDevices && ("function" == typeof f ? d.navigator.mediaDevices.getDisplayMedia = function(a) {
                return f(a).then(b=>{
                    let c = a.video && a.video.width
                      , e = a.video && a.video.height;
                    return a.video = {
                        mandatory: {
                            chromeMediaSource: "desktop",
                            chromeMediaSourceId: b,
                            maxFrameRate: a.video && a.video.frameRate || 3
                        }
                    },
                    c && (a.video.mandatory.maxWidth = c),
                    e && (a.video.mandatory.maxHeight = e),
                    d.navigator.mediaDevices.getUserMedia(a)
                }
                )
            }
            : console.error("shimGetDisplayMedia: getSourceId argument is not a function"))
        }
    })
      , Kj = "".startsWith
      , yn = Math.min
      , zn = nf("startsWith");
    O({
        target: "String",
        proto: !0,
        forced: !zn
    }, {
        startsWith: function(d) {
            var f = String(Yb(this));
            mf(d);
            var a = nb(yn(1 < arguments.length ? arguments[1] : void 0, f.length))
              , b = String(d);
            return Kj ? Kj.call(f, b, a) : f.slice(a, a + b.length) === b
        }
    });
    var An = za("String").startsWith
      , Lj = String.prototype
      , sd = function(d) {
        var f = d.startsWith;
        return "string" == typeof d || d === Lj || d instanceof String && f === Lj.startsWith ? An : f
    };
    O({
        target: "String",
        proto: !0,
        forced: sa(function() {
            return "trim" !== "\t\n\v\f\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff".trim.name
        })
    }, {
        trim: function() {
            return Pi(this)
        }
    });
    var Bn = za("String").trim
      , Mj = String.prototype
      , Ub = function(d) {
        var f = d.trim;
        return "string" == typeof d || d === Mj || d instanceof String && f === Mj.trim ? Bn : f
    }
      , G = ub(function(d) {
        var f = {
            generateIdentifier: function() {
                return Math.random().toString(36).substr(2, 10)
            }
        };
        f.localCName = f.generateIdentifier();
        f.splitLines = function(a) {
            var b;
            return z(b = Ub(a).call(a).split("\n")).call(b, function(a) {
                return Ub(a).call(a)
            })
        }
        ;
        f.splitSections = function(a) {
            a = a.split("\nm=");
            return z(a).call(a, function(a, c) {
                var b;
                return Ub(b = 0 < c ? "m=" + a : a).call(b) + "\r\n"
            })
        }
        ;
        f.getDescription = function(a) {
            return (a = f.splitSections(a)) && a[0]
        }
        ;
        f.getMediaSections = function(a) {
            a = f.splitSections(a);
            return a.shift(),
            a
        }
        ;
        f.matchPrefix = function(a, b) {
            var c;
            return M(c = f.splitLines(a)).call(c, function(a) {
                return 0 === I(a).call(a, b)
            })
        }
        ;
        f.parseCandidate = function(a) {
            var b;
            a = {
                foundation: (b = 0 === I(a).call(a, "a=candidate:") ? a.substring(12).split(" ") : a.substring(10).split(" "))[0],
                component: pa(b[1], 10),
                protocol: b[2].toLowerCase(),
                priority: pa(b[3], 10),
                ip: b[4],
                address: b[4],
                port: pa(b[5], 10),
                type: b[7]
            };
            for (var c = 8; c < b.length; c += 2)
                switch (b[c]) {
                case "raddr":
                    a.relatedAddress = b[c + 1];
                    break;
                case "rport":
                    a.relatedPort = pa(b[c + 1], 10);
                    break;
                case "tcptype":
                    a.tcpType = b[c + 1];
                    break;
                case "ufrag":
                    a.ufrag = b[c + 1];
                    a.usernameFragment = b[c + 1];
                    break;
                default:
                    a[b[c]] = b[c + 1]
                }
            return a
        }
        ;
        f.writeCandidate = function(a) {
            var b = [];
            b.push(a.foundation);
            b.push(a.component);
            b.push(a.protocol.toUpperCase());
            b.push(a.priority);
            b.push(a.address || a.ip);
            b.push(a.port);
            var c = a.type;
            return b.push("typ"),
            b.push(c),
            "host" !== c && a.relatedAddress && a.relatedPort && (b.push("raddr"),
            b.push(a.relatedAddress),
            b.push("rport"),
            b.push(a.relatedPort)),
            a.tcpType && "tcp" === a.protocol.toLowerCase() && (b.push("tcptype"),
            b.push(a.tcpType)),
            (a.usernameFragment || a.ufrag) && (b.push("ufrag"),
            b.push(a.usernameFragment || a.ufrag)),
            "candidate:" + b.join(" ")
        }
        ;
        f.parseIceOptions = function(a) {
            return a.substr(14).split(" ")
        }
        ;
        f.parseRtpMap = function(a) {
            a = a.substr(9).split(" ");
            var b = {
                payloadType: pa(a.shift(), 10)
            };
            return a = a[0].split("/"),
            b.name = a[0],
            b.clockRate = pa(a[1], 10),
            b.channels = 3 === a.length ? pa(a[2], 10) : 1,
            b.numChannels = b.channels,
            b
        }
        ;
        f.writeRtpMap = function(a) {
            var b = a.payloadType;
            void 0 !== a.preferredPayloadType && (b = a.preferredPayloadType);
            var c = a.channels || a.numChannels || 1;
            return "a=rtpmap:" + b + " " + a.name + "/" + a.clockRate + (1 !== c ? "/" + c : "") + "\r\n"
        }
        ;
        f.parseExtmap = function(a) {
            var b;
            a = a.substr(9).split(" ");
            return {
                id: pa(a[0], 10),
                direction: 0 < I(b = a[0]).call(b, "/") ? a[0].split("/")[1] : "sendrecv",
                uri: a[1]
            }
        }
        ;
        f.writeExtmap = function(a) {
            return "a=extmap:" + (a.id || a.preferredId) + (a.direction && "sendrecv" !== a.direction ? "/" + a.direction : "") + " " + a.uri + "\r\n"
        }
        ;
        f.parseFmtp = function(a) {
            for (var b = {}, c = a.substr(I(a).call(a, " ") + 1).split(";"), d = 0; d < c.length; d++) {
                var g, h;
                a = Ub(g = c[d]).call(g).split("=");
                b[Ub(h = a[0]).call(h)] = a[1]
            }
            return b
        }
        ;
        f.writeFmtp = function(a) {
            var b = ""
              , c = a.payloadType;
            if (void 0 !== a.preferredPayloadType && (c = a.preferredPayloadType),
            a.parameters && Z(a.parameters).length) {
                var d, g = [];
                q(d = Z(a.parameters)).call(d, function(b) {
                    a.parameters[b] ? g.push(b + "=" + a.parameters[b]) : g.push(b)
                });
                b += "a=fmtp:" + c + " " + g.join(";") + "\r\n"
            }
            return b
        }
        ;
        f.parseRtcpFb = function(a) {
            a = a.substr(I(a).call(a, " ") + 1).split(" ");
            return {
                type: a.shift(),
                parameter: a.join(" ")
            }
        }
        ;
        f.writeRtcpFb = function(a) {
            var b, c = "", d = a.payloadType;
            (void 0 !== a.preferredPayloadType && (d = a.preferredPayloadType),
            a.rtcpFeedback && a.rtcpFeedback.length) && q(b = a.rtcpFeedback).call(b, function(a) {
                c += "a=rtcp-fb:" + d + " " + a.type + (a.parameter && a.parameter.length ? " " + a.parameter : "") + "\r\n"
            });
            return c
        }
        ;
        f.parseSsrcMedia = function(a) {
            var b = I(a).call(a, " ")
              , c = {
                ssrc: pa(a.substr(7, b - 7), 10)
            }
              , d = I(a).call(a, ":", b);
            return -1 < d ? (c.attribute = a.substr(b + 1, d - b - 1),
            c.value = a.substr(d + 1)) : c.attribute = a.substr(b + 1),
            c
        }
        ;
        f.parseSsrcGroup = function(a) {
            a = a.substr(13).split(" ");
            return {
                semantics: a.shift(),
                ssrcs: z(a).call(a, function(a) {
                    return pa(a, 10)
                })
            }
        }
        ;
        f.getMid = function(a) {
            if (a = f.matchPrefix(a, "a=mid:")[0])
                return a.substr(6)
        }
        ;
        f.parseFingerprint = function(a) {
            a = a.substr(14).split(" ");
            return {
                algorithm: a[0].toLowerCase(),
                value: a[1]
            }
        }
        ;
        f.getDtlsParameters = function(a, b) {
            a = f.matchPrefix(a + b, "a=fingerprint:");
            return {
                role: "auto",
                fingerprints: z(a).call(a, f.parseFingerprint)
            }
        }
        ;
        f.writeDtlsParameters = function(a, b) {
            var c, d = "a=setup:" + b + "\r\n";
            return q(c = a.fingerprints).call(c, function(a) {
                d += "a=fingerprint:" + a.algorithm + " " + a.value + "\r\n"
            }),
            d
        }
        ;
        f.getIceParameters = function(a, b) {
            a = f.splitLines(a);
            return a = l(a).call(a, f.splitLines(b)),
            {
                usernameFragment: M(a).call(a, function(a) {
                    return 0 === I(a).call(a, "a=ice-ufrag:")
                })[0].substr(12),
                password: M(a).call(a, function(a) {
                    return 0 === I(a).call(a, "a=ice-pwd:")
                })[0].substr(10)
            }
        }
        ;
        f.writeIceParameters = function(a) {
            return "a=ice-ufrag:" + a.usernameFragment + "\r\na=ice-pwd:" + a.password + "\r\n"
        }
        ;
        f.parseRtpParameters = function(a) {
            for (var b, c = {
                codecs: [],
                headerExtensions: [],
                fecMechanisms: [],
                rtcp: []
            }, d = f.splitLines(a)[0].split(" "), g = 3; g < d.length; g++) {
                var h = d[g]
                  , m = f.matchPrefix(a, "a=rtpmap:" + h + " ")[0];
                if (m) {
                    var r;
                    m = f.parseRtpMap(m);
                    var t = f.matchPrefix(a, "a=fmtp:" + h + " ");
                    switch (m.parameters = t.length ? f.parseFmtp(t[0]) : {},
                    m.rtcpFeedback = z(r = f.matchPrefix(a, "a=rtcp-fb:" + h + " ")).call(r, f.parseRtcpFb),
                    c.codecs.push(m),
                    m.name.toUpperCase()) {
                    case "RED":
                    case "ULPFEC":
                        c.fecMechanisms.push(m.name.toUpperCase())
                    }
                }
            }
            return q(b = f.matchPrefix(a, "a=extmap:")).call(b, function(a) {
                c.headerExtensions.push(f.parseExtmap(a))
            }),
            c
        }
        ;
        f.writeRtpDescription = function(a, b) {
            var c, d, g, h = "";
            h += "m=" + a + " ";
            h += 0 < b.codecs.length ? "9" : "0";
            h += " UDP/TLS/RTP/SAVPF ";
            h += z(c = b.codecs).call(c, function(a) {
                return void 0 !== a.preferredPayloadType ? a.preferredPayloadType : a.payloadType
            }).join(" ") + "\r\n";
            h += "c=IN IP4 0.0.0.0\r\n";
            h += "a=rtcp:9 IN IP4 0.0.0.0\r\n";
            q(d = b.codecs).call(d, function(a) {
                h += f.writeRtpMap(a);
                h += f.writeFmtp(a);
                h += f.writeRtcpFb(a)
            });
            var m, r = 0;
            (q(g = b.codecs).call(g, function(a) {
                a.maxptime > r && (r = a.maxptime)
            }),
            0 < r && (h += "a=maxptime:" + r + "\r\n"),
            h += "a=rtcp-mux\r\n",
            b.headerExtensions) && q(m = b.headerExtensions).call(m, function(a) {
                h += f.writeExtmap(a)
            });
            return h
        }
        ;
        f.parseRtpEncodingParameters = function(a) {
            var b, c, d, g, h, m, r, t = [], k = f.parseRtpParameters(a), n = -1 !== I(b = k.fecMechanisms).call(b, "RED"), l = -1 !== I(c = k.fecMechanisms).call(c, "ULPFEC");
            b = M(d = z(g = f.matchPrefix(a, "a=ssrc:")).call(g, function(a) {
                return f.parseSsrcMedia(a)
            })).call(d, function(a) {
                return "cname" === a.attribute
            });
            var p = 0 < b.length && b[0].ssrc;
            d = z(h = f.matchPrefix(a, "a=ssrc-group:FID")).call(h, function(a) {
                a = a.substr(17).split(" ");
                return z(a).call(a, function(a) {
                    return pa(a, 10)
                })
            });
            0 < d.length && 1 < d[0].length && d[0][0] === p && (r = d[0][1]);
            q(m = k.codecs).call(m, function(a) {
                "RTX" === a.name.toUpperCase() && a.parameters.apt && (a = {
                    ssrc: p,
                    codecPayloadType: pa(a.parameters.apt, 10)
                },
                p && r && (a.rtx = {
                    ssrc: r
                }),
                t.push(a),
                n && ((a = JSON.parse(w(a))).fec = {
                    ssrc: p,
                    mechanism: l ? "red+ulpfec" : "red"
                },
                t.push(a)))
            });
            0 === t.length && p && t.push({
                ssrc: p
            });
            var A, ja, u = f.matchPrefix(a, "b=");
            u.length && (u = 0 === I(A = u[0]).call(A, "b=TIAS:") ? pa(u[0].substr(7), 10) : 0 === I(ja = u[0]).call(ja, "b=AS:") ? 950 * pa(u[0].substr(5), 10) - 16E3 : void 0,
            q(t).call(t, function(a) {
                a.maxBitrate = u
            }));
            return t
        }
        ;
        f.parseRtcpParameters = function(a) {
            var b, c, d = {}, g = M(b = z(c = f.matchPrefix(a, "a=ssrc:")).call(c, function(a) {
                return f.parseSsrcMedia(a)
            })).call(b, function(a) {
                return "cname" === a.attribute
            })[0];
            g && (d.cname = g.value,
            d.ssrc = g.ssrc);
            b = f.matchPrefix(a, "a=rtcp-rsize");
            d.reducedSize = 0 < b.length;
            d.compound = 0 === b.length;
            a = f.matchPrefix(a, "a=rtcp-mux");
            return d.mux = 0 < a.length,
            d
        }
        ;
        f.parseMsid = function(a) {
            var b, c, d, g = f.matchPrefix(a, "a=msid:");
            if (1 === g.length)
                return {
                    stream: (d = g[0].substr(7).split(" "))[0],
                    track: d[1]
                };
            a = M(b = z(c = f.matchPrefix(a, "a=ssrc:")).call(c, function(a) {
                return f.parseSsrcMedia(a)
            })).call(b, function(a) {
                return "msid" === a.attribute
            });
            return 0 < a.length ? {
                stream: (d = a[0].value.split(" "))[0],
                track: d[1]
            } : void 0
        }
        ;
        f.generateSessionId = function() {
            return Math.random().toString().substr(2, 21)
        }
        ;
        f.writeSessionBoilerplate = function(a, b, c) {
            b = void 0 !== b ? b : 2;
            return "v=0\r\no=" + (c || "thisisadapterortc") + " " + (a || f.generateSessionId()) + " " + b + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
        }
        ;
        f.writeMediaSection = function(a, b, c, d) {
            b = f.writeRtpDescription(a.kind, b);
            if (b += f.writeIceParameters(a.iceGatherer.getLocalParameters()),
            b += f.writeDtlsParameters(a.dtlsTransport.getLocalParameters(), "offer" === c ? "actpass" : "active"),
            b += "a=mid:" + a.mid + "\r\n",
            a.direction ? b += "a=" + a.direction + "\r\n" : a.rtpSender && a.rtpReceiver ? b += "a=sendrecv\r\n" : a.rtpSender ? b += "a=sendonly\r\n" : a.rtpReceiver ? b += "a=recvonly\r\n" : b += "a=inactive\r\n",
            a.rtpSender)
                c = "msid:" + d.id + " " + a.rtpSender.track.id + "\r\n",
                b = b + ("a=" + c) + ("a=ssrc:" + a.sendEncodingParameters[0].ssrc + " " + c),
                a.sendEncodingParameters[0].rtx && (b += "a=ssrc:" + a.sendEncodingParameters[0].rtx.ssrc + " " + c,
                b += "a=ssrc-group:FID " + a.sendEncodingParameters[0].ssrc + " " + a.sendEncodingParameters[0].rtx.ssrc + "\r\n");
            return b += "a=ssrc:" + a.sendEncodingParameters[0].ssrc + " cname:" + f.localCName + "\r\n",
            a.rtpSender && a.sendEncodingParameters[0].rtx && (b += "a=ssrc:" + a.sendEncodingParameters[0].rtx.ssrc + " cname:" + f.localCName + "\r\n"),
            b
        }
        ;
        f.getDirection = function(a, b) {
            a = f.splitLines(a);
            for (var d = 0; d < a.length; d++)
                switch (a[d]) {
                case "a=sendrecv":
                case "a=sendonly":
                case "a=recvonly":
                case "a=inactive":
                    return a[d].substr(2)
                }
            return b ? f.getDirection(b) : "sendrecv"
        }
        ;
        f.getKind = function(a) {
            return f.splitLines(a)[0].split(" ")[0].substr(2)
        }
        ;
        f.isRejected = function(a) {
            return "0" === a.split(" ", 2)[1]
        }
        ;
        f.parseMLine = function(a) {
            a = f.splitLines(a)[0].substr(2).split(" ");
            return {
                kind: a[0],
                port: pa(a[1], 10),
                protocol: a[2],
                fmt: Aa(a).call(a, 3).join(" ")
            }
        }
        ;
        f.parseOLine = function(a) {
            a = f.matchPrefix(a, "o=")[0].substr(2).split(" ");
            return {
                username: a[0],
                sessionId: a[1],
                sessionVersion: pa(a[2], 10),
                netType: a[3],
                addressType: a[4],
                address: a[5]
            }
        }
        ;
        f.isValidSDP = function(a) {
            if ("string" != typeof a || 0 === a.length)
                return !1;
            a = f.splitLines(a);
            for (var b = 0; b < a.length; b++)
                if (2 > a[b].length || "=" !== a[b].charAt(1))
                    return !1;
            return !0
        }
        ;
        d.exports = f
    })
      , bl = function(d, f) {
        function a(a, b) {
            b.addTrack(a);
            b.dispatchEvent(new d.MediaStreamTrackEvent("addtrack",{
                track: a
            }))
        }
        function b(a, b, c, e) {
            var g = new Event("track");
            g.track = b;
            g.receiver = c;
            g.transceiver = {
                receiver: c
            };
            g.streams = e;
            d.setTimeout(function() {
                a._dispatchEvent("track", g)
            })
        }
        var c = function(a) {
            var b = this
              , c = document.createDocumentFragment();
            if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(a) {
                b[a] = c[a].bind(c)
            }),
            this.canTrickleIceCandidates = null,
            this.needNegotiation = !1,
            this.localStreams = [],
            this.remoteStreams = [],
            this._localDescription = null,
            this._remoteDescription = null,
            this.signalingState = "stable",
            this.iceConnectionState = "new",
            this.connectionState = "new",
            this.iceGatheringState = "new",
            a = JSON.parse(JSON.stringify(a || {})),
            this.usingBundle = "max-bundle" === a.bundlePolicy,
            "negotiate" === a.rtcpMuxPolicy)
                throw Ja("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
            switch (a.rtcpMuxPolicy || (a.rtcpMuxPolicy = "require"),
            a.iceTransportPolicy) {
            case "all":
            case "relay":
                break;
            default:
                a.iceTransportPolicy = "all"
            }
            switch (a.bundlePolicy) {
            case "balanced":
            case "max-compat":
            case "max-bundle":
                break;
            default:
                a.bundlePolicy = "balanced"
            }
            if (a.iceServers = function(a, b) {
                var d = !1;
                return (a = JSON.parse(JSON.stringify(a))).filter(function(a) {
                    if (a && (a.urls || a.url)) {
                        var c = a.urls || a.url;
                        a.url && !a.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
                        var e = "string" == typeof c;
                        return e && (c = [c]),
                        c = c.filter(function(a) {
                            return 0 !== a.indexOf("turn:") || -1 === a.indexOf("transport=udp") || -1 !== a.indexOf("turn:[") || d ? 0 === a.indexOf("stun:") && 14393 <= b && -1 === a.indexOf("?transport=udp") : (d = !0,
                            !0)
                        }),
                        delete a.url,
                        a.urls = e ? c[0] : c,
                        !!c.length
                    }
                })
            }(a.iceServers || [], f),
            this._iceGatherers = [],
            a.iceCandidatePoolSize)
                for (var e = a.iceCandidatePoolSize; 0 < e; e--)
                    this._iceGatherers.push(new d.RTCIceGatherer({
                        iceServers: a.iceServers,
                        gatherPolicy: a.iceTransportPolicy
                    }));
            else
                a.iceCandidatePoolSize = 0;
            this._config = a;
            this.transceivers = [];
            this._sdpSessionId = G.generateSessionId();
            this._sdpSessionVersion = 0;
            this._dtlsRole = void 0;
            this._isClosed = !1
        };
        Object.defineProperty(c.prototype, "localDescription", {
            configurable: !0,
            get: function() {
                return this._localDescription
            }
        });
        Object.defineProperty(c.prototype, "remoteDescription", {
            configurable: !0,
            get: function() {
                return this._remoteDescription
            }
        });
        c.prototype.onicecandidate = null;
        c.prototype.onaddstream = null;
        c.prototype.ontrack = null;
        c.prototype.onremovestream = null;
        c.prototype.onsignalingstatechange = null;
        c.prototype.oniceconnectionstatechange = null;
        c.prototype.onconnectionstatechange = null;
        c.prototype.onicegatheringstatechange = null;
        c.prototype.onnegotiationneeded = null;
        c.prototype.ondatachannel = null;
        c.prototype._dispatchEvent = function(a, b) {
            this._isClosed || (this.dispatchEvent(b),
            "function" == typeof this["on" + a] && this["on" + a](b))
        }
        ;
        c.prototype._emitGatheringStateChange = function() {
            var a = new Event("icegatheringstatechange");
            this._dispatchEvent("icegatheringstatechange", a)
        }
        ;
        c.prototype.getConfiguration = function() {
            return this._config
        }
        ;
        c.prototype.getLocalStreams = function() {
            return this.localStreams
        }
        ;
        c.prototype.getRemoteStreams = function() {
            return this.remoteStreams
        }
        ;
        c.prototype._createTransceiver = function(a, b) {
            var c = 0 < this.transceivers.length;
            a = {
                track: null,
                iceGatherer: null,
                iceTransport: null,
                dtlsTransport: null,
                localCapabilities: null,
                remoteCapabilities: null,
                rtpSender: null,
                rtpReceiver: null,
                kind: a,
                mid: null,
                sendEncodingParameters: null,
                recvEncodingParameters: null,
                stream: null,
                associatedRemoteMediaStreams: [],
                wantReceive: !0
            };
            this.usingBundle && c ? (a.iceTransport = this.transceivers[0].iceTransport,
            a.dtlsTransport = this.transceivers[0].dtlsTransport) : (c = this._createIceAndDtlsTransports(),
            a.iceTransport = c.iceTransport,
            a.dtlsTransport = c.dtlsTransport);
            return b || this.transceivers.push(a),
            a
        }
        ;
        c.prototype.addTrack = function(a, b) {
            if (this._isClosed)
                throw Ja("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
            var c;
            if (this.transceivers.find(function(b) {
                return b.track === a
            }))
                throw Ja("InvalidAccessError", "Track already exists.");
            for (var e = 0; e < this.transceivers.length; e++)
                this.transceivers[e].track || this.transceivers[e].kind !== a.kind || (c = this.transceivers[e]);
            return c || (c = this._createTransceiver(a.kind)),
            this._maybeFireNegotiationNeeded(),
            -1 === this.localStreams.indexOf(b) && this.localStreams.push(b),
            c.track = a,
            c.stream = b,
            c.rtpSender = new d.RTCRtpSender(a,c.dtlsTransport),
            c.rtpSender
        }
        ;
        c.prototype.addStream = function(a) {
            var b = this;
            if (15025 <= f)
                a.getTracks().forEach(function(c) {
                    b.addTrack(c, a)
                });
            else {
                var c = a.clone();
                a.getTracks().forEach(function(a, b) {
                    var d = c.getTracks()[b];
                    a.addEventListener("enabled", function(a) {
                        d.enabled = a.enabled
                    })
                });
                c.getTracks().forEach(function(a) {
                    b.addTrack(a, c)
                })
            }
        }
        ;
        c.prototype.removeTrack = function(a) {
            if (this._isClosed)
                throw Ja("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
            if (!(a instanceof d.RTCRtpSender))
                throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
            var b = this.transceivers.find(function(b) {
                return b.rtpSender === a
            });
            if (!b)
                throw Ja("InvalidAccessError", "Sender was not created by this connection.");
            var c = b.stream;
            b.rtpSender.stop();
            b.rtpSender = null;
            b.track = null;
            b.stream = null;
            -1 === this.transceivers.map(function(a) {
                return a.stream
            }).indexOf(c) && -1 < this.localStreams.indexOf(c) && this.localStreams.splice(this.localStreams.indexOf(c), 1);
            this._maybeFireNegotiationNeeded()
        }
        ;
        c.prototype.removeStream = function(a) {
            var b = this;
            a.getTracks().forEach(function(a) {
                var c = b.getSenders().find(function(b) {
                    return b.track === a
                });
                c && b.removeTrack(c)
            })
        }
        ;
        c.prototype.getSenders = function() {
            return this.transceivers.filter(function(a) {
                return !!a.rtpSender
            }).map(function(a) {
                return a.rtpSender
            })
        }
        ;
        c.prototype.getReceivers = function() {
            return this.transceivers.filter(function(a) {
                return !!a.rtpReceiver
            }).map(function(a) {
                return a.rtpReceiver
            })
        }
        ;
        c.prototype._createIceGatherer = function(a, b) {
            var c = this;
            if (b && 0 < a)
                return this.transceivers[0].iceGatherer;
            if (this._iceGatherers.length)
                return this._iceGatherers.shift();
            var e = new d.RTCIceGatherer({
                iceServers: this._config.iceServers,
                gatherPolicy: this._config.iceTransportPolicy
            });
            return Object.defineProperty(e, "state", {
                value: "new",
                writable: !0
            }),
            this.transceivers[a].bufferedCandidateEvents = [],
            this.transceivers[a].bufferCandidates = function(b) {
                var d = !b.candidate || 0 === Object.keys(b.candidate).length;
                e.state = d ? "completed" : "gathering";
                null !== c.transceivers[a].bufferedCandidateEvents && c.transceivers[a].bufferedCandidateEvents.push(b)
            }
            ,
            e.addEventListener("localcandidate", this.transceivers[a].bufferCandidates),
            e
        }
        ;
        c.prototype._gather = function(a, b) {
            var c = this
              , e = this.transceivers[b].iceGatherer;
            if (!e.onlocalcandidate) {
                var g = this.transceivers[b].bufferedCandidateEvents;
                this.transceivers[b].bufferedCandidateEvents = null;
                e.removeEventListener("localcandidate", this.transceivers[b].bufferCandidates);
                e.onlocalcandidate = function(d) {
                    if (!(c.usingBundle && 0 < b)) {
                        var g = new Event("icecandidate");
                        g.candidate = {
                            sdpMid: a,
                            sdpMLineIndex: b
                        };
                        var f = d.candidate;
                        (d = !f || 0 === Object.keys(f).length) ? "new" !== e.state && "gathering" !== e.state || (e.state = "completed") : ("new" === e.state && (e.state = "gathering"),
                        f.component = 1,
                        f.ufrag = e.getLocalParameters().usernameFragment,
                        f = G.writeCandidate(f),
                        g.candidate = Object.assign(g.candidate, G.parseCandidate(f)),
                        g.candidate.candidate = f,
                        g.candidate.toJSON = function() {
                            return {
                                candidate: g.candidate.candidate,
                                sdpMid: g.candidate.sdpMid,
                                sdpMLineIndex: g.candidate.sdpMLineIndex,
                                usernameFragment: g.candidate.usernameFragment
                            }
                        }
                        );
                        f = G.getMediaSections(c._localDescription.sdp);
                        f[g.candidate.sdpMLineIndex] += d ? "a=end-of-candidates\r\n" : "a=" + g.candidate.candidate + "\r\n";
                        c._localDescription.sdp = G.getDescription(c._localDescription.sdp) + f.join("");
                        f = c.transceivers.every(function(a) {
                            return a.iceGatherer && "completed" === a.iceGatherer.state
                        });
                        "gathering" !== c.iceGatheringState && (c.iceGatheringState = "gathering",
                        c._emitGatheringStateChange());
                        d || c._dispatchEvent("icecandidate", g);
                        f && (c._dispatchEvent("icecandidate", new Event("icecandidate")),
                        c.iceGatheringState = "complete",
                        c._emitGatheringStateChange())
                    }
                }
                ;
                d.setTimeout(function() {
                    g.forEach(function(a) {
                        e.onlocalcandidate(a)
                    })
                }, 0)
            }
        }
        ;
        c.prototype._createIceAndDtlsTransports = function() {
            var a = this
              , b = new d.RTCIceTransport(null);
            b.onicestatechange = function() {
                a._updateIceConnectionState();
                a._updateConnectionState()
            }
            ;
            var c = new d.RTCDtlsTransport(b);
            return c.ondtlsstatechange = function() {
                a._updateConnectionState()
            }
            ,
            c.onerror = function() {
                Object.defineProperty(c, "state", {
                    value: "failed",
                    writable: !0
                });
                a._updateConnectionState()
            }
            ,
            {
                iceTransport: b,
                dtlsTransport: c
            }
        }
        ;
        c.prototype._disposeIceAndDtlsTransports = function(a) {
            var b = this.transceivers[a].iceGatherer;
            b && (delete b.onlocalcandidate,
            delete this.transceivers[a].iceGatherer);
            (b = this.transceivers[a].iceTransport) && (delete b.onicestatechange,
            delete this.transceivers[a].iceTransport);
            (b = this.transceivers[a].dtlsTransport) && (delete b.ondtlsstatechange,
            delete b.onerror,
            delete this.transceivers[a].dtlsTransport)
        }
        ;
        c.prototype._transceive = function(a, b, c) {
            var d = rd(a.localCapabilities, a.remoteCapabilities);
            b && a.rtpSender && (d.encodings = a.sendEncodingParameters,
            d.rtcp = {
                cname: G.localCName,
                compound: a.rtcpParameters.compound
            },
            a.recvEncodingParameters.length && (d.rtcp.ssrc = a.recvEncodingParameters[0].ssrc),
            a.rtpSender.send(d));
            c && a.rtpReceiver && 0 < d.codecs.length && ("video" === a.kind && a.recvEncodingParameters && 15019 > f && a.recvEncodingParameters.forEach(function(a) {
                delete a.rtx
            }),
            a.recvEncodingParameters.length ? d.encodings = a.recvEncodingParameters : d.encodings = [{}],
            d.rtcp = {
                compound: a.rtcpParameters.compound
            },
            a.rtcpParameters.cname && (d.rtcp.cname = a.rtcpParameters.cname),
            a.sendEncodingParameters.length && (d.rtcp.ssrc = a.sendEncodingParameters[0].ssrc),
            a.rtpReceiver.receive(d))
        }
        ;
        c.prototype.setLocalDescription = function(a) {
            var b = this;
            if (-1 === ["offer", "answer"].indexOf(a.type))
                return Promise.reject(Ja("TypeError", 'Unsupported type "' + a.type + '"'));
            if (!vg("setLocalDescription", a.type, b.signalingState) || b._isClosed)
                return Promise.reject(Ja("InvalidStateError", "Can not set local " + a.type + " in state " + b.signalingState));
            if ("offer" === a.type) {
                var c = G.splitSections(a.sdp);
                var d = c.shift();
                c.forEach(function(a, c) {
                    a = G.parseRtpParameters(a);
                    b.transceivers[c].localCapabilities = a
                });
                b.transceivers.forEach(function(a, c) {
                    b._gather(a.mid, c)
                })
            } else if ("answer" === a.type) {
                c = G.splitSections(b._remoteDescription.sdp);
                d = c.shift();
                var e = 0 < G.matchPrefix(d, "a=ice-lite").length;
                c.forEach(function(a, c) {
                    var g = b.transceivers[c]
                      , f = g.iceGatherer
                      , h = g.iceTransport
                      , m = g.dtlsTransport
                      , r = g.localCapabilities
                      , k = g.remoteCapabilities;
                    if (!(G.isRejected(a) && 0 === G.matchPrefix(a, "a=bundle-only").length || g.rejected)) {
                        var t = G.getIceParameters(a, d);
                        a = G.getDtlsParameters(a, d);
                        e && (a.role = "server");
                        b.usingBundle && 0 !== c || (b._gather(g.mid, c),
                        "new" === h.state && h.start(f, t, e ? "controlling" : "controlled"),
                        "new" === m.state && m.start(a));
                        c = rd(r, k);
                        b._transceive(g, 0 < c.codecs.length, !1)
                    }
                })
            }
            return b._localDescription = {
                type: a.type,
                sdp: a.sdp
            },
            "offer" === a.type ? b._updateSignalingState("have-local-offer") : b._updateSignalingState("stable"),
            Promise.resolve()
        }
        ;
        c.prototype.setRemoteDescription = function(c) {
            var e = this;
            if (-1 === ["offer", "answer"].indexOf(c.type))
                return Promise.reject(Ja("TypeError", 'Unsupported type "' + c.type + '"'));
            if (!vg("setRemoteDescription", c.type, e.signalingState) || e._isClosed)
                return Promise.reject(Ja("InvalidStateError", "Can not set remote " + c.type + " in state " + e.signalingState));
            var g = {};
            e.remoteStreams.forEach(function(a) {
                g[a.id] = a
            });
            var r = []
              , k = G.splitSections(c.sdp)
              , y = k.shift()
              , n = 0 < G.matchPrefix(y, "a=ice-lite").length
              , l = 0 < G.matchPrefix(y, "a=group:BUNDLE ").length;
            e.usingBundle = l;
            var p = G.matchPrefix(y, "a=ice-options:")[0];
            return e.canTrickleIceCandidates = !!p && 0 <= p.substr(14).split(" ").indexOf("trickle"),
            k.forEach(function(b, h) {
                var m = G.splitLines(b)
                  , k = G.getKind(b)
                  , t = G.isRejected(b) && 0 === G.matchPrefix(b, "a=bundle-only").length
                  , p = m[0].substr(2).split(" ")[2];
                m = G.getDirection(b, y);
                var E = G.parseMsid(b)
                  , ua = G.getMid(b) || G.generateIdentifier();
                if (t || "application" === k && ("DTLS/SCTP" === p || "UDP/DTLS/SCTP" === p))
                    e.transceivers[h] = {
                        mid: ua,
                        kind: k,
                        protocol: p,
                        rejected: !0
                    };
                else {
                    var A, q;
                    !t && e.transceivers[h] && e.transceivers[h].rejected && (e.transceivers[h] = e._createTransceiver(k, !0));
                    var u, ic, ja = G.parseRtpParameters(b);
                    t || (u = G.getIceParameters(b, y),
                    (ic = G.getDtlsParameters(b, y)).role = "client");
                    p = G.parseRtpEncodingParameters(b);
                    var v = G.parseRtcpParameters(b)
                      , x = 0 < G.matchPrefix(b, "a=end-of-candidates", y).length;
                    b = G.matchPrefix(b, "a=candidate:").map(function(a) {
                        return G.parseCandidate(a)
                    }).filter(function(a) {
                        return 1 === a.component
                    });
                    if (("offer" === c.type || "answer" === c.type) && !t && l && 0 < h && e.transceivers[h] && (e._disposeIceAndDtlsTransports(h),
                    e.transceivers[h].iceGatherer = e.transceivers[0].iceGatherer,
                    e.transceivers[h].iceTransport = e.transceivers[0].iceTransport,
                    e.transceivers[h].dtlsTransport = e.transceivers[0].dtlsTransport,
                    e.transceivers[h].rtpSender && e.transceivers[h].rtpSender.setTransport(e.transceivers[0].dtlsTransport),
                    e.transceivers[h].rtpReceiver && e.transceivers[h].rtpReceiver.setTransport(e.transceivers[0].dtlsTransport)),
                    "offer" !== c.type || t) {
                        if ("answer" === c.type && !t) {
                            k = (A = e.transceivers[h]).iceGatherer;
                            var w = A.iceTransport;
                            var B = A.dtlsTransport;
                            var z = A.rtpReceiver;
                            t = A.sendEncodingParameters;
                            ua = A.localCapabilities;
                            e.transceivers[h].recvEncodingParameters = p;
                            e.transceivers[h].remoteCapabilities = ja;
                            e.transceivers[h].rtcpParameters = v;
                            b.length && "new" === w.state && (!n && !x || l && 0 !== h ? b.forEach(function(a) {
                                qe(A.iceTransport, a)
                            }) : w.setRemoteCandidates(b));
                            l && 0 !== h || ("new" === w.state && w.start(k, u, "controlling"),
                            "new" === B.state && B.start(ic));
                            !rd(A.localCapabilities, A.remoteCapabilities).codecs.filter(function(a) {
                                return "rtx" === a.name.toLowerCase()
                            }).length && A.sendEncodingParameters[0].rtx && delete A.sendEncodingParameters[0].rtx;
                            e._transceive(A, "sendrecv" === m || "recvonly" === m, "sendrecv" === m || "sendonly" === m);
                            !z || "sendrecv" !== m && "sendonly" !== m ? delete A.rtpReceiver : (q = z.track,
                            E ? (g[E.stream] || (g[E.stream] = new d.MediaStream),
                            a(q, g[E.stream]),
                            r.push([q, z, g[E.stream]])) : (g.default || (g.default = new d.MediaStream),
                            a(q, g.default),
                            r.push([q, z, g.default])))
                        }
                    } else {
                        (A = e.transceivers[h] || e._createTransceiver(k)).mid = ua;
                        A.iceGatherer || (A.iceGatherer = e._createIceGatherer(h, l));
                        b.length && "new" === A.iceTransport.state && (!x || l && 0 !== h ? b.forEach(function(a) {
                            qe(A.iceTransport, a)
                        }) : A.iceTransport.setRemoteCandidates(b));
                        ua = d.RTCRtpReceiver.getCapabilities(k);
                        15019 > f && (ua.codecs = ua.codecs.filter(function(a) {
                            return "rtx" !== a.name
                        }));
                        t = A.sendEncodingParameters || [{
                            ssrc: 1001 * (2 * h + 2)
                        }];
                        u = !1;
                        if ("sendrecv" === m || "sendonly" === m) {
                            if (u = !A.rtpReceiver,
                            z = A.rtpReceiver || new d.RTCRtpReceiver(A.dtlsTransport,k),
                            u)
                                q = z.track,
                                E && "-" === E.stream || (E ? (g[E.stream] || (g[E.stream] = new d.MediaStream,
                                Object.defineProperty(g[E.stream], "id", {
                                    get: function() {
                                        return E.stream
                                    }
                                })),
                                Object.defineProperty(q, "id", {
                                    get: function() {
                                        return E.track
                                    }
                                }),
                                w = g[E.stream]) : (g.default || (g.default = new d.MediaStream),
                                w = g.default)),
                                w && (a(q, w),
                                A.associatedRemoteMediaStreams.push(w)),
                                r.push([q, z, w])
                        } else
                            A.rtpReceiver && A.rtpReceiver.track && (A.associatedRemoteMediaStreams.forEach(function(a) {
                                var b = a.getTracks().find(function(a) {
                                    return a.id === A.rtpReceiver.track.id
                                });
                                b && function(a, b) {
                                    b.removeTrack(a);
                                    b.dispatchEvent(new d.MediaStreamTrackEvent("removetrack",{
                                        track: a
                                    }))
                                }(b, a)
                            }),
                            A.associatedRemoteMediaStreams = []);
                        A.localCapabilities = ua;
                        A.remoteCapabilities = ja;
                        A.rtpReceiver = z;
                        A.rtcpParameters = v;
                        A.sendEncodingParameters = t;
                        A.recvEncodingParameters = p;
                        e._transceive(e.transceivers[h], !1, u)
                    }
                }
            }),
            void 0 === e._dtlsRole && (e._dtlsRole = "offer" === c.type ? "active" : "passive"),
            e._remoteDescription = {
                type: c.type,
                sdp: c.sdp
            },
            "offer" === c.type ? e._updateSignalingState("have-remote-offer") : e._updateSignalingState("stable"),
            Object.keys(g).forEach(function(a) {
                var c = g[a];
                if (c.getTracks().length) {
                    if (-1 === e.remoteStreams.indexOf(c)) {
                        e.remoteStreams.push(c);
                        var f = new Event("addstream");
                        f.stream = c;
                        d.setTimeout(function() {
                            e._dispatchEvent("addstream", f)
                        })
                    }
                    r.forEach(function(a) {
                        var d = a[0]
                          , g = a[1];
                        c.id === a[2].id && b(e, d, g, [c])
                    })
                }
            }),
            r.forEach(function(a) {
                a[2] || b(e, a[0], a[1], [])
            }),
            d.setTimeout(function() {
                e && e.transceivers && e.transceivers.forEach(function(a) {
                    a.iceTransport && "new" === a.iceTransport.state && 0 < a.iceTransport.getRemoteCandidates().length && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"),
                    a.iceTransport.addRemoteCandidate({}))
                })
            }, 4E3),
            Promise.resolve()
        }
        ;
        c.prototype.close = function() {
            this.transceivers.forEach(function(a) {
                a.iceTransport && a.iceTransport.stop();
                a.dtlsTransport && a.dtlsTransport.stop();
                a.rtpSender && a.rtpSender.stop();
                a.rtpReceiver && a.rtpReceiver.stop()
            });
            this._isClosed = !0;
            this._updateSignalingState("closed")
        }
        ;
        c.prototype._updateSignalingState = function(a) {
            this.signalingState = a;
            a = new Event("signalingstatechange");
            this._dispatchEvent("signalingstatechange", a)
        }
        ;
        c.prototype._maybeFireNegotiationNeeded = function() {
            var a = this;
            "stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0,
            d.setTimeout(function() {
                if (a.needNegotiation) {
                    a.needNegotiation = !1;
                    var b = new Event("negotiationneeded");
                    a._dispatchEvent("negotiationneeded", b)
                }
            }, 0))
        }
        ;
        c.prototype._updateIceConnectionState = function() {
            var a, b = {
                new: 0,
                closed: 0,
                checking: 0,
                connected: 0,
                completed: 0,
                disconnected: 0,
                failed: 0
            };
            if (this.transceivers.forEach(function(a) {
                a.iceTransport && !a.rejected && b[a.iceTransport.state]++
            }),
            a = "new",
            0 < b.failed ? a = "failed" : 0 < b.checking ? a = "checking" : 0 < b.disconnected ? a = "disconnected" : 0 < b.new ? a = "new" : 0 < b.connected ? a = "connected" : 0 < b.completed && (a = "completed"),
            a !== this.iceConnectionState)
                this.iceConnectionState = a,
                a = new Event("iceconnectionstatechange"),
                this._dispatchEvent("iceconnectionstatechange", a)
        }
        ;
        c.prototype._updateConnectionState = function() {
            var a, b = {
                new: 0,
                closed: 0,
                connecting: 0,
                connected: 0,
                completed: 0,
                disconnected: 0,
                failed: 0
            };
            if (this.transceivers.forEach(function(a) {
                a.iceTransport && a.dtlsTransport && !a.rejected && (b[a.iceTransport.state]++,
                b[a.dtlsTransport.state]++)
            }),
            b.connected += b.completed,
            a = "new",
            0 < b.failed ? a = "failed" : 0 < b.connecting ? a = "connecting" : 0 < b.disconnected ? a = "disconnected" : 0 < b.new ? a = "new" : 0 < b.connected && (a = "connected"),
            a !== this.connectionState)
                this.connectionState = a,
                a = new Event("connectionstatechange"),
                this._dispatchEvent("connectionstatechange", a)
        }
        ;
        c.prototype.createOffer = function(a) {
            var b = this;
            if (b._isClosed)
                return Promise.reject(Ja("InvalidStateError", "Can not call createOffer after close"));
            var c = b.transceivers.filter(function(a) {
                return "audio" === a.kind
            }).length
              , e = b.transceivers.filter(function(a) {
                return "video" === a.kind
            }).length;
            if (a) {
                if (a.mandatory || a.optional)
                    throw new TypeError("Legacy mandatory/optional constraints not supported.");
                void 0 !== a.offerToReceiveAudio && (c = !0 === a.offerToReceiveAudio ? 1 : !1 === a.offerToReceiveAudio ? 0 : a.offerToReceiveAudio);
                void 0 !== a.offerToReceiveVideo && (e = !0 === a.offerToReceiveVideo ? 1 : !1 === a.offerToReceiveVideo ? 0 : a.offerToReceiveVideo)
            }
            for (b.transceivers.forEach(function(a) {
                "audio" === a.kind ? 0 > --c && (a.wantReceive = !1) : "video" === a.kind && 0 > --e && (a.wantReceive = !1)
            }); 0 < c || 0 < e; )
                0 < c && (b._createTransceiver("audio"),
                c--),
                0 < e && (b._createTransceiver("video"),
                e--);
            var g = G.writeSessionBoilerplate(b._sdpSessionId, b._sdpSessionVersion++);
            b.transceivers.forEach(function(a, c) {
                var e = a.track
                  , g = a.kind
                  , h = a.mid || G.generateIdentifier();
                a.mid = h;
                a.iceGatherer || (a.iceGatherer = b._createIceGatherer(c, b.usingBundle));
                h = d.RTCRtpSender.getCapabilities(g);
                15019 > f && (h.codecs = h.codecs.filter(function(a) {
                    return "rtx" !== a.name
                }));
                h.codecs.forEach(function(b) {
                    "H264" === b.name && void 0 === b.parameters["level-asymmetry-allowed"] && (b.parameters["level-asymmetry-allowed"] = "1");
                    a.remoteCapabilities && a.remoteCapabilities.codecs && a.remoteCapabilities.codecs.forEach(function(a) {
                        b.name.toLowerCase() === a.name.toLowerCase() && b.clockRate === a.clockRate && (b.preferredPayloadType = a.payloadType)
                    })
                });
                h.headerExtensions.forEach(function(b) {
                    (a.remoteCapabilities && a.remoteCapabilities.headerExtensions || []).forEach(function(a) {
                        b.uri === a.uri && (b.id = a.id)
                    })
                });
                c = a.sendEncodingParameters || [{
                    ssrc: 1001 * (2 * c + 1)
                }];
                e && 15019 <= f && "video" === g && !c[0].rtx && (c[0].rtx = {
                    ssrc: c[0].ssrc + 1
                });
                a.wantReceive && (a.rtpReceiver = new d.RTCRtpReceiver(a.dtlsTransport,g));
                a.localCapabilities = h;
                a.sendEncodingParameters = c
            });
            "max-compat" !== b._config.bundlePolicy && (g += "a=group:BUNDLE " + b.transceivers.map(function(a) {
                return a.mid
            }).join(" ") + "\r\n");
            g += "a=ice-options:trickle\r\n";
            b.transceivers.forEach(function(a, c) {
                g += ug(a, a.localCapabilities, "offer", a.stream, b._dtlsRole);
                g += "a=rtcp-rsize\r\n";
                !a.iceGatherer || "new" === b.iceGatheringState || 0 !== c && b.usingBundle || (a.iceGatherer.getLocalCandidates().forEach(function(a) {
                    a.component = 1;
                    g += "a=" + G.writeCandidate(a) + "\r\n"
                }),
                "completed" === a.iceGatherer.state && (g += "a=end-of-candidates\r\n"))
            });
            a = new d.RTCSessionDescription({
                type: "offer",
                sdp: g
            });
            return Promise.resolve(a)
        }
        ;
        c.prototype.createAnswer = function() {
            var a = this;
            if (a._isClosed)
                return Promise.reject(Ja("InvalidStateError", "Can not call createAnswer after close"));
            if ("have-remote-offer" !== a.signalingState && "have-local-pranswer" !== a.signalingState)
                return Promise.reject(Ja("InvalidStateError", "Can not call createAnswer in signalingState " + a.signalingState));
            var b = G.writeSessionBoilerplate(a._sdpSessionId, a._sdpSessionVersion++);
            a.usingBundle && (b += "a=group:BUNDLE " + a.transceivers.map(function(a) {
                return a.mid
            }).join(" ") + "\r\n");
            b += "a=ice-options:trickle\r\n";
            var c = G.getMediaSections(a._remoteDescription.sdp).length;
            a.transceivers.forEach(function(d, e) {
                if (!(e + 1 > c)) {
                    if (d.rejected)
                        return "application" === d.kind ? "DTLS/SCTP" === d.protocol ? b += "m=application 0 DTLS/SCTP 5000\r\n" : b += "m=application 0 " + d.protocol + " webrtc-datachannel\r\n" : "audio" === d.kind ? b += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === d.kind && (b += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"),
                        void (b += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + d.mid + "\r\n");
                    var g;
                    d.stream && ("audio" === d.kind ? g = d.stream.getAudioTracks()[0] : "video" === d.kind && (g = d.stream.getVideoTracks()[0]),
                    g && 15019 <= f && "video" === d.kind && !d.sendEncodingParameters[0].rtx && (d.sendEncodingParameters[0].rtx = {
                        ssrc: d.sendEncodingParameters[0].ssrc + 1
                    }));
                    e = rd(d.localCapabilities, d.remoteCapabilities);
                    !e.codecs.filter(function(a) {
                        return "rtx" === a.name.toLowerCase()
                    }).length && d.sendEncodingParameters[0].rtx && delete d.sendEncodingParameters[0].rtx;
                    b += ug(d, e, "answer", d.stream, a._dtlsRole);
                    d.rtcpParameters && d.rtcpParameters.reducedSize && (b += "a=rtcp-rsize\r\n")
                }
            });
            var e = new d.RTCSessionDescription({
                type: "answer",
                sdp: b
            });
            return Promise.resolve(e)
        }
        ;
        c.prototype.addIceCandidate = function(a) {
            var b, c = this;
            return a && void 0 === a.sdpMLineIndex && !a.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function(d, e) {
                if (!c._remoteDescription)
                    return e(Ja("InvalidStateError", "Can not add ICE candidate without a remote description"));
                if (a && "" !== a.candidate) {
                    var g = a.sdpMLineIndex;
                    if (a.sdpMid)
                        for (var f = 0; f < c.transceivers.length; f++)
                            if (c.transceivers[f].mid === a.sdpMid) {
                                g = f;
                                break
                            }
                    var h = c.transceivers[g];
                    if (!h)
                        return e(Ja("OperationError", "Can not add ICE candidate"));
                    if (h.rejected)
                        return d();
                    f = 0 < Object.keys(a.candidate).length ? G.parseCandidate(a.candidate) : {};
                    if ("tcp" === f.protocol && (0 === f.port || 9 === f.port) || f.component && 1 !== f.component)
                        return d();
                    if ((0 === g || 0 < g && h.iceTransport !== c.transceivers[0].iceTransport) && !qe(h.iceTransport, f))
                        return e(Ja("OperationError", "Can not add ICE candidate"));
                    e = a.candidate.trim();
                    0 === e.indexOf("a=") && (e = e.substr(2));
                    (b = G.getMediaSections(c._remoteDescription.sdp))[g] += "a=" + (f.type ? e : "end-of-candidates") + "\r\n";
                    c._remoteDescription.sdp = G.getDescription(c._remoteDescription.sdp) + b.join("")
                } else
                    for (g = 0; g < c.transceivers.length && (c.transceivers[g].rejected || (c.transceivers[g].iceTransport.addRemoteCandidate({}),
                    (b = G.getMediaSections(c._remoteDescription.sdp))[g] += "a=end-of-candidates\r\n",
                    c._remoteDescription.sdp = G.getDescription(c._remoteDescription.sdp) + b.join(""),
                    !c.usingBundle)); g++)
                        ;
                d()
            }
            )
        }
        ;
        c.prototype.getStats = function(a) {
            if (a && a instanceof d.MediaStreamTrack) {
                var b = null;
                if (this.transceivers.forEach(function(c) {
                    c.rtpSender && c.rtpSender.track === a ? b = c.rtpSender : c.rtpReceiver && c.rtpReceiver.track === a && (b = c.rtpReceiver)
                }),
                !b)
                    throw Ja("InvalidAccessError", "Invalid selector.");
                return b.getStats()
            }
            var c = [];
            return this.transceivers.forEach(function(a) {
                ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(b) {
                    a[b] && c.push(a[b].getStats())
                })
            }),
            Promise.all(c).then(function(a) {
                var b = new Map;
                return a.forEach(function(a) {
                    a.forEach(function(a) {
                        b.set(a.id, a)
                    })
                }),
                b
            })
        }
        ;
        ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function(a) {
            if ((a = d[a]) && a.prototype && a.prototype.getStats) {
                var b = a.prototype.getStats;
                a.prototype.getStats = function() {
                    return b.apply(this).then(function(a) {
                        var b = new Map;
                        return Object.keys(a).forEach(function(c) {
                            var d;
                            a[c].type = {
                                inboundrtp: "inbound-rtp",
                                outboundrtp: "outbound-rtp",
                                candidatepair: "candidate-pair",
                                localcandidate: "local-candidate",
                                remotecandidate: "remote-candidate"
                            }[(d = a[c]).type] || d.type;
                            b.set(c, a[c])
                        }),
                        b
                    })
                }
            }
        });
        var e = ["createOffer", "createAnswer"];
        return e.forEach(function(a) {
            var b = c.prototype[a];
            c.prototype[a] = function() {
                var a = arguments;
                return "function" == typeof a[0] || "function" == typeof a[1] ? b.apply(this, [arguments[2]]).then(function(b) {
                    "function" == typeof a[0] && a[0].apply(null, [b])
                }, function(b) {
                    "function" == typeof a[1] && a[1].apply(null, [b])
                }) : b.apply(this, arguments)
            }
        }),
        (e = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function(a) {
            var b = c.prototype[a];
            c.prototype[a] = function() {
                var a = arguments;
                return "function" == typeof a[1] || "function" == typeof a[2] ? b.apply(this, arguments).then(function() {
                    "function" == typeof a[1] && a[1].apply(null)
                }, function(b) {
                    "function" == typeof a[2] && a[2].apply(null, [b])
                }) : b.apply(this, arguments)
            }
        }),
        ["getStats"].forEach(function(a) {
            var b = c.prototype[a];
            c.prototype[a] = function() {
                var a = arguments;
                return "function" == typeof a[1] ? b.apply(this, arguments).then(function() {
                    "function" == typeof a[1] && a[1].apply(null)
                }) : b.apply(this, arguments)
            }
        }),
        c
    }
      , Nj = Object.freeze({
        __proto__: null,
        shimPeerConnection: re,
        shimReplaceTrack: yg,
        shimGetUserMedia: wg,
        shimGetDisplayMedia: xg
    })
      , Oj = Object.freeze({
        __proto__: null,
        shimOnTrack: Ag,
        shimPeerConnection: se,
        shimSenderGetStats: Bg,
        shimReceiverGetStats: Cg,
        shimRemoveStream: Dg,
        shimRTCDataChannel: Eg,
        shimGetUserMedia: zg,
        shimGetDisplayMedia: function(d, f) {
            d.navigator.mediaDevices && "getDisplayMedia"in d.navigator.mediaDevices || d.navigator.mediaDevices && (d.navigator.mediaDevices.getDisplayMedia = function(a) {
                return a && a.video ? (!0 === a.video ? a.video = {
                    mediaSource: f
                } : a.video.mediaSource = f,
                d.navigator.mediaDevices.getUserMedia(a)) : (a = new DOMException("getDisplayMedia without video constraints is undefined"),
                a.name = "NotFoundError",
                a.code = 8,
                B.reject(a))
            }
            )
        }
    })
      , Pj = Object.freeze({
        __proto__: null,
        shimLocalStreamsAPI: Fg,
        shimRemoteStreamsAPI: Gg,
        shimCallbacksAPI: Hg,
        shimGetUserMedia: Ig,
        shimConstraints: Jg,
        shimRTCIceServerUrls: Kg,
        shimTrackEventTransceiver: Lg,
        shimCreateOfferLegacy: Mg
    })
      , Cn = Object.freeze({
        __proto__: null,
        shimRTCIceCandidate: td,
        shimMaxMessageSize: Ic,
        shimSendThrowTypeError: Jc,
        shimConnectionState: te,
        removeAllowExtmapMixed: ue
    });
    !function({window: d}={}, f={
        shimChrome: !0,
        shimFirefox: !0,
        shimEdge: !0,
        shimSafari: !0
    }) {
        let a = Eb(d)
          , b = {
            browserDetails: a,
            commonShim: Cn,
            extractVersion: Db,
            disableLog: $k,
            disableWarnings: al
        };
        switch (a.browser) {
        case "chrome":
            if (!Jj || !pe || !f.shimChrome)
                return kb("Chrome shim is not included in this adapter release."),
                b;
            kb("adapter.js shimming chrome.");
            b.browserShim = Jj;
            jg(d);
            mg(d);
            pe(d);
            ng(d);
            sg(d);
            og(d);
            pg(d);
            qg(d);
            tg(d);
            td(d);
            te(d);
            Ic(d);
            Jc(d);
            ue(d);
            break;
        case "firefox":
            if (!Oj || !se || !f.shimFirefox)
                return kb("Firefox shim is not included in this adapter release."),
                b;
            kb("adapter.js shimming firefox.");
            b.browserShim = Oj;
            zg(d);
            se(d);
            Ag(d);
            Dg(d);
            Bg(d);
            Cg(d);
            Eg(d);
            td(d);
            te(d);
            Ic(d);
            Jc(d);
            break;
        case "edge":
            if (!Nj || !re || !f.shimEdge)
                return kb("MS edge shim is not included in this adapter release."),
                b;
            kb("adapter.js shimming edge.");
            b.browserShim = Nj;
            wg(d);
            xg(d);
            re(d);
            yg(d);
            Ic(d);
            Jc(d);
            break;
        case "safari":
            if (!Pj || !f.shimSafari)
                return kb("Safari shim is not included in this adapter release."),
                b;
            kb("adapter.js shimming safari.");
            b.browserShim = Pj;
            Kg(d);
            Mg(d);
            Hg(d);
            Fg(d);
            Gg(d);
            Lg(d);
            Ig(d);
            td(d);
            Ic(d);
            Jc(d);
            ue(d);
            break;
        default:
            kb("Unsupported browser!")
        }
    }({
        window
    });
    var W, ba;
    !function(d) {
        d.WIN_10 = "Windows 10";
        d.WIN_81 = "Windows 8.1";
        d.WIN_8 = "Windows 8";
        d.WIN_7 = "Windows 7";
        d.WIN_VISTA = "Windows Vista";
        d.WIN_SERVER_2003 = "Windows Server 2003";
        d.WIN_XP = "Windows XP";
        d.WIN_2000 = "Windows 2000";
        d.ANDROID = "Android";
        d.OPEN_BSD = "Open BSD";
        d.SUN_OS = "Sun OS";
        d.LINUX = "Linux";
        d.IOS = "iOS";
        d.MAC_OS_X = "Mac OS X";
        d.MAC_OS = "Mac OS";
        d.QNX = "QNX";
        d.UNIX = "UNIX";
        d.BEOS = "BeOS";
        d.OS_2 = "OS/2";
        d.SEARCH_BOT = "Search Bot"
    }(W || (W = {}));
    (function(d) {
        d.CHROME = "Chrome";
        d.SAFARI = "Safari";
        d.EDGE = "Edge";
        d.FIREFOX = "Firefox";
        d.OPERA = "OPR";
        d.QQ = "QQBrowser";
        d.WECHAT = "MicroMessenger"
    }
    )(ba || (ba = {}));
    let Ta = function(d) {
        if (d.match(/[0-9]+\.[0-9]+\.[0-9]+$/))
            return d;
        var f = d.match(/([0-9]+\.[0-9]+\.[0-9]+)\-alpha\.([0-9]+)/);
        if (f && f[1] && f[2]) {
            var a, b = f[2];
            return l(a = "".concat(f[1], ".")).call(a, b)
        }
        return (f = d.match(/([0-9]+\.[0-9]+\.[0-9]+)\-special\.([0-9]+)/)) && f[1] && f[2] ? (a = f[2],
        l(b = "".concat(f[1], ".")).call(b, 100 * (Number(a) + 1))) : "4.0.0.999"
    }("4.4.0");
    try {
        var Qj = !0 === JSON.parse("true")
    } catch (d) {
        Qj = !0
    }
    let Hf = Qj
      , $a = {
        username: "test",
        password: "111111",
        turnServerURL: "",
        tcpport: 3433,
        udpport: 3478,
        forceturn: !1
    }
      , cl = {
        "90p": J(160, 90),
        "90p_1": J(160, 90),
        "120p": J(160, 120, 15, 30, 65),
        "120p_1": J(160, 120, 15, 30, 65),
        "120p_3": J(120, 120, 15, 30, 50),
        "120p_4": J(212, 120),
        "180p": J(320, 180, 15, 30, 140),
        "180p_1": J(320, 180, 15, 30, 140),
        "180p_3": J(180, 180, 15, 30, 100),
        "180p_4": J(240, 180, 15, 30, 120),
        "240p": J(320, 240, 15, 40, 200),
        "240p_1": J(320, 240, 15, 40, 200),
        "240p_3": J(240, 240, 15, 40, 140),
        "240p_4": J(424, 240, 15, 40, 220),
        "360p": J(640, 360, 15, 80, 400),
        "360p_1": J(640, 360, 15, 80, 400),
        "360p_3": J(360, 360, 15, 80, 260),
        "360p_4": J(640, 360, 30, 80, 600),
        "360p_6": J(360, 360, 30, 80, 400),
        "360p_7": J(480, 360, 15, 80, 320),
        "360p_8": J(480, 360, 30, 80, 490),
        "360p_9": J(640, 360, 15, 80, 800),
        "360p_10": J(640, 360, 24, 80, 800),
        "360p_11": J(640, 360, 24, 80, 1E3),
        "480p": J(640, 480, 15, 100, 500),
        "480p_1": J(640, 480, 15, 100, 500),
        "480p_2": J(640, 480, 30, 100, 1E3),
        "480p_3": J(480, 480, 15, 100, 400),
        "480p_4": J(640, 480, 30, 100, 750),
        "480p_6": J(480, 480, 30, 100, 600),
        "480p_8": J(848, 480, 15, 100, 610),
        "480p_9": J(848, 480, 30, 100, 930),
        "480p_10": J(640, 480, 10, 100, 400),
        "720p": J(1280, 720, 15, 120, 1130),
        "720p_1": J(1280, 720, 15, 120, 1130),
        "720p_2": J(1280, 720, 30, 120, 2E3),
        "720p_3": J(1280, 720, 30, 120, 1710),
        "720p_5": J(960, 720, 15, 120, 910),
        "720p_6": J(960, 720, 30, 120, 1380),
        "1080p": J(1920, 1080, 15, 120, 2080),
        "1080p_1": J(1920, 1080, 15, 120, 2080),
        "1080p_2": J(1920, 1080, 30, 120, 3E3),
        "1080p_3": J(1920, 1080, 30, 120, 3150),
        "1080p_5": J(1920, 1080, 60, 120, 4780),
        "1440p": J(2560, 1440, 30, 120, 4850),
        "1440p_1": J(2560, 1440, 30, 120, 4850),
        "1440p_2": J(2560, 1440, 60, 120, 7350),
        "4k": J(3840, 2160, 30, 120, 8910),
        "4k_1": J(3840, 2160, 30, 120, 8910),
        "4k_3": J(3840, 2160, 60, 120, 13500)
    }
      , dl = {
        "480p": db(640, 480, 5),
        "480p_1": db(640, 480, 5),
        "480p_2": db(640, 480, 30),
        "480p_3": db(640, 480, 15),
        "720p": db(1280, 720, 5),
        "720p_1": db(1280, 720, 5),
        "720p_2": db(1280, 720, 30),
        "720p_3": db(1280, 720, 15),
        "1080p": db(1920, 1080, 5),
        "1080p_1": db(1920, 1080, 5),
        "1080p_2": db(1920, 1080, 30),
        "1080p_3": db(1920, 1080, 15)
    }
      , el = {
        "1SL1TL": we(1, 1),
        "3SL3TL": we(3, 3),
        "2SL3TL": we(2, 3)
    }
      , fl = {
        speech_low_quality: lc(16E3, !1),
        speech_standard: lc(32E3, !1, 18),
        music_standard: lc(48E3, !1),
        standard_stereo: lc(48E3, !0, 56),
        high_quality: lc(48E3, !1, 128),
        high_quality_stereo: lc(48E3, !0, 192)
    }
      , v = {
        PROCESS_ID: "",
        ENCRYPT_AES: !0,
        AREAS: ["CHINA", "GLOBAL"],
        WEBCS_DOMAIN: ["webrtc2-ap-web-1.agora.io", "webrtc2-2.ap.sd-rtn.com"],
        WEBCS_DOMAIN_BACKUP_LIST: ["webrtc2-ap-web-3.agora.io", "webrtc2-4.ap.sd-rtn.com"],
        PROXY_CS: ["ap-proxy-1.agora.io", "ap-proxy-2.agora.io"],
        CDS_AP: ["cds-ap-web-1.agora.io", "cds-web-2.ap.sd-rtn.com", "cds-ap-web-3.agora.io", "cds-web-4.ap.sd-rtn.com"],
        ACCOUNT_REGISTER: ["sua-ap-web-1.agora.io", "sua-web-2.ap.sd-rtn.com", "sua-ap-web-3.agora.io", "sua-web-4.ap.sd-rtn.com"],
        UAP_AP: ["uap-ap-web-1.agora.io", "uap-web-2.ap.sd-rtn.com", "uap-ap-web-3.agora.io", "uap-web-4.ap.sd-rtn.com"],
        LOG_UPLOAD_SERVER: "logservice.agora.io",
        EVENT_REPORT_DOMAIN: "statscollector-1.agora.io",
        EVENT_REPORT_BACKUP_DOMAIN: "web-2.statscollector.sd-rtn.com",
        GATEWAY_ADDRESS: [],
        GATEWAY_WSS_ADDRESS: "",
        LIVE_STREAMING_ADDRESS: "",
        ACCOUNT_REGISTER_RETRY_TIMEOUT: 1,
        ACCOUNT_REGISTER_RETRY_RATIO: 2,
        ACCOUNT_REGISTER_RETRY_TIMEOUT_MAX: 6E4,
        ACCOUNT_REGISTER_RETRY_COUNT_MAX: 1E5,
        AUDIO_CONTEXT: null,
        WEBCS_BACKUP_CONNECT_TIMEOUT: 6E3,
        HTTP_CONNECT_TIMEOUT: 5E3,
        PLAYER_STATE_DEFER: 2E3,
        SIGNAL_REQUEST_TIMEOUT: 1E4,
        SIGNAL_REQUEST_WATCH_INTERVAL: 1E3,
        REPORT_STATS: !0,
        UPLOAD_LOG: !1,
        NOT_REPORT_EVENT: [],
        FILEPATH_LENMAX: 255,
        SUBSCRIBE_TCC: !0,
        PING_PONG_TIME_OUT: 10,
        DUALSTREAM_OPERATION_CHECK: !0,
        WEBSOCKET_TIMEOUT_MIN: 1E4,
        EVENT_REPORT_SEND_INTERVAL: 3E3,
        CONFIG_DISTRIBUTE_INTERVAL: 3E5,
        MEDIA_ELEMENT_EXISTS_DEPTH: 3,
        CANDIDATE_TIMEOUT: 5E3,
        SHIM_CANDIDATE: !1,
        LEAVE_MSG_TIMEOUT: 2E3,
        SHOW_REPORT_INVOKER_LOG: !1,
        STATS_FILTER: {
            transportId: !0,
            googTrackId: !0
        },
        JOIN_EXTEND: "",
        PUB_EXTEND: "",
        SUB_EXTEND: "",
        FORCE_TURN: !1,
        TURN_ENABLE_TCP: !0,
        TURN_ENABLE_UDP: !0,
        MAX_UPLOAD_CACHE: 50,
        UPLOAD_CACHE_INTERVAL: 2E3,
        AJAX_REQUEST_CONCURRENT: 3,
        REPORT_APP_SCENARIO: void 0,
        CHROME_FORCE_PLAN_B: !1,
        AUDIO_SOURCE_VOLUME_UPDATE_INTERVAL: 400,
        AUDIO_SOURCE_AVG_VOLUME_DURATION: 3E3,
        AUDIO_VOLUME_INDICATION_INTERVAL: 2E3,
        NORMAL_EVENT_QUEUE_CAPACITY: 100,
        CUSTOM_REPORT: !0,
        CUSTOM_REPORT_LIMIT: 20,
        PROXY_SERVER_TYPE2: "webnginx-proxy.agora.io",
        PROXY_SERVER_TYPE3: "webrtc-cloud-proxy.sd-rtn.com",
        CUSTOM_PUB_ANSWER_MODIFIER: null,
        CUSTOM_SUB_ANSWER_MODIFIER: null,
        CUSTOM_PUB_OFFER_MODIFIER: null,
        CUSTOM_SUB_OFFER_MODIFIER: null,
        DSCP_TYPE: "high",
        REMOVE_NEW_CODECS: !0
    };
    Hf || (v.WEBCS_DOMAIN = ["ap-web-1-oversea.agora.io", "ap-web-1-north-america.agora.io"],
    v.WEBCS_DOMAIN_BACKUP_LIST = ["ap-web-2-oversea.agora.io", "ap-web-2-north-america.agora.io"],
    v.PROXY_CS = ["proxy-ap-web-oversea.agora.io", "proxy-ap-web-america.agora.io"],
    v.CDS_AP = ["cds-ap-web-oversea.agora.io", "cds-ap-web-america.agora.io", "cds-ap-web-america2.agora.io"],
    v.ACCOUNT_REGISTER = ["sua-ap-web-oversea.agora.io", "sua-ap-web-america.agora.io", "sua-ap-web-america2.agora.io"],
    v.UAP_AP = ["uap-ap-web-oversea.agora.io", "uap-ap-web-america.agora.io", "uap-ap-web-america2.agora.io"],
    v.LOG_UPLOAD_SERVER = "logservice-oversea.agora.io",
    v.EVENT_REPORT_DOMAIN = "statscollector-1-oversea.agora.io",
    v.EVENT_REPORT_BACKUP_DOMAIN = "statscollector-2-oversea.agora.io",
    v.PROXY_SERVER_TYPE3 = "webrtc-cloud-proxy.agora.io",
    v.AREAS = ["NORTH_AMERICA", "OVERSEA"]);
    let Dn = [[0, 1, 2, 3, 4, 5, 5], [0, 2, 2, 3, 4, 5, 5], [0, 3, 3, 3, 4, 5, 5], [0, 4, 4, 4, 4, 5, 5], [0, 5, 5, 5, 5, 5, 5]]
      , Rj = [];
    var If = []
      , Sj = If.sort
      , En = sa(function() {
        If.sort(void 0)
    })
      , Fn = sa(function() {
        If.sort(null)
    })
      , Gn = Wc("sort");
    O({
        target: "Array",
        proto: !0,
        forced: En || !Fn || Gn
    }, {
        sort: function(d) {
            return void 0 === d ? Sj.call(ob(this)) : Sj.call(ob(this), lb(d))
        }
    });
    var Hn = za("Array").sort
      , Tj = Array.prototype
      , dd = function(d) {
        var f = d.sort;
        return d === Tj || d instanceof Array && f === Tj.sort ? Hn : f
    };
    O({
        target: "Array",
        stat: !0
    }, {
        isArray: $b
    });
    var n, nc = ha.Array.isArray;
    !function(d) {
        d.UNEXPECTED_ERROR = "UNEXPECTED_ERROR";
        d.UNEXPECTED_RESPONSE = "UNEXPECTED_RESPONSE";
        d.TIMEOUT = "TIMEOUT";
        d.INVALID_PARAMS = "INVALID_PARAMS";
        d.NOT_READABLE = "NOT_READABLE";
        d.NOT_SUPPORTED = "NOT_SUPPORTED";
        d.INVALID_OPERATION = "INVALID_OPERATION";
        d.OPERATION_ABORTED = "OPERATION_ABORTED";
        d.WEB_SECURITY_RESTRICT = "WEB_SECURITY_RESTRICT";
        d.NETWORK_ERROR = "NETWORK_ERROR";
        d.NETWORK_TIMEOUT = "NETWORK_TIMEOUT";
        d.NETWORK_RESPONSE_ERROR = "NETWORK_RESPONSE_ERROR";
        d.API_INVOKE_TIMEOUT = "API_INVOKE_TIMEOUT";
        d.ENUMERATE_DEVICES_FAILED = "ENUMERATE_DEVICES_FAILED";
        d.DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND";
        d.ELECTRON_IS_NULL = "ELECTRON_IS_NULL";
        d.ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR = "ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR";
        d.CHROME_PLUGIN_NO_RESPONSE = "CHROME_PLUGIN_NO_RESPONSE";
        d.CHROME_PLUGIN_NOT_INSTALL = "CHROME_PLUGIN_NOT_INSTALL";
        d.MEDIA_OPTION_INVALID = "MEDIA_OPTION_INVALID";
        d.PERMISSION_DENIED = "PERMISSION_DENIED";
        d.CONSTRAINT_NOT_SATISFIED = "CONSTRAINT_NOT_SATISFIED";
        d.TRACK_IS_DISABLED = "TRACK_IS_DISABLED";
        d.SHARE_AUDIO_NOT_ALLOWED = "SHARE_AUDIO_NOT_ALLOWED";
        d.LOW_STREAM_ENCODING_ERROR = "LOW_STREAM_ENCODING_ERROR";
        d.SET_ENCODING_PARAMETER_ERROR = "SET_ENCODING_PARAMETER_ERROR";
        d.INVALID_UINT_UID_FROM_STRING_UID = "INVALID_UINT_UID_FROM_STRING_UID";
        d.CAN_NOT_GET_PROXY_SERVER = "CAN_NOT_GET_PROXY_SERVER";
        d.CAN_NOT_GET_GATEWAY_SERVER = "CAN_NOT_GET_GATEWAY_SERVER";
        d.VOID_GATEWAY_ADDRESS = "VOID_GATEWAY_ADDRESS";
        d.UID_CONFLICT = "UID_CONFLICT";
        d.INVALID_LOCAL_TRACK = "INVALID_LOCAL_TRACK";
        d.INVALID_TRACK = "INVALID_TRACK";
        d.SENDER_NOT_FOUND = "SENDER_NOT_FOUND";
        d.CREATE_OFFER_FAILED = "CREATE_OFFER_FAILED";
        d.SET_ANSWER_FAILED = "SET_ANSWER_FAILED";
        d.ICE_FAILED = "ICE_FAILED";
        d.PC_CLOSED = "PC_CLOSED";
        d.SENDER_REPLACE_FAILED = "SENDER_REPLACE_FAILED";
        d.GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST";
        d.NO_ICE_CANDIDATE = "NO_ICE_CANDIDATE";
        d.CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS = "CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS";
        d.EXIST_DISABLED_VIDEO_TRACK = "EXIST_DISABLED_VIDEO_TRACK";
        d.INVALID_REMOTE_USER = "INVALID_REMOTE_USER";
        d.REMOTE_USER_IS_NOT_PUBLISHED = "REMOTE_USER_IS_NOT_PUBLISHED";
        d.CUSTOM_REPORT_SEND_FAILED = "CUSTOM_REPORT_SEND_FAILED";
        d.CUSTOM_REPORT_FREQUENCY_TOO_HIGH = "CUSTOM_REPORT_FREQUENCY_TOO_HIGH";
        d.FETCH_AUDIO_FILE_FAILED = "FETCH_AUDIO_FILE_FAILED";
        d.READ_LOCAL_AUDIO_FILE_ERROR = "READ_LOCAL_AUDIO_FILE_ERROR";
        d.DECODE_AUDIO_FILE_FAILED = "DECODE_AUDIO_FILE_FAILED";
        d.WS_ABORT = "WS_ABORT";
        d.WS_DISCONNECT = "WS_DISCONNECT";
        d.WS_ERR = "WS_ERR";
        d.LIVE_STREAMING_TASK_CONFLICT = "LIVE_STREAMING_TASK_CONFLICT";
        d.LIVE_STREAMING_INVALID_ARGUMENT = "LIVE_STREAMING_INVALID_ARGUMENT";
        d.LIVE_STREAMING_INTERNAL_SERVER_ERROR = "LIVE_STREAMING_INTERNAL_SERVER_ERROR";
        d.LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED = "LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED";
        d.LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED = "LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED";
        d.LIVE_STREAMING_CDN_ERROR = "LIVE_STREAMING_CDN_ERROR";
        d.LIVE_STREAMING_INVALID_RAW_STREAM = "LIVE_STREAMING_INVALID_RAW_STREAM";
        d.LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT = "LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT";
        d.LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE = "LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE";
        d.LIVE_STREAMING_WARN_FREQUENT_REQUEST = "LIVE_STREAMING_WARN_FREQUENT_REQUEST";
        d.WEBGL_INTERNAL_ERROR = "WEBGL_INTERNAL_ERROR";
        d.BEAUTY_PROCESSOR_INTERNAL_ERROR = "BEAUTY_PROCESSOR_INTERNAL_ERROR";
        d.CROSS_CHANNEL_WAIT_STATUS_ERROR = "CROSS_CHANNEL_WAIT_STATUS_ERROR";
        d.CROSS_CHANNEL_FAILED_JOIN_SRC = "CROSS_CHANNEL_FAILED_JOIN_SEC";
        d.CROSS_CHANNEL_FAILED_JOIN_DEST = "CROSS_CHANNEL_FAILED_JOIN_DEST";
        d.CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST = "CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST";
        d.CROSS_CHANNEL_SERVER_ERROR_RESPONSE = "CROSS_CHANNEL_SERVER_ERROR_RESPONSE";
        d.METADATA_OUT_OF_RANGE = "METADATA_OUT_OF_RANGE";
        d.LOCAL_AEC_ERROR = "LOCAL_AEC_ERROR"
    }(n || (n = {}));
    var Vg = function(d, f) {
        return function() {
            for (var a = Array(arguments.length), b = 0; b < a.length; b++)
                a[b] = arguments[b];
            return d.apply(f, a)
        }
    }
      , mc = Object.prototype.toString
      , K = {
        isArray: Ng,
        isArrayBuffer: function(d) {
            return "[object ArrayBuffer]" === mc.call(d)
        },
        isBuffer: function(d) {
            return null != d && null != d.constructor && "function" == typeof d.constructor.isBuffer && d.constructor.isBuffer(d)
        },
        isFormData: function(d) {
            return "undefined" != typeof FormData && d instanceof FormData
        },
        isArrayBufferView: function(d) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(d) : d && d.buffer && d.buffer instanceof ArrayBuffer
        },
        isString: function(d) {
            return "string" == typeof d
        },
        isNumber: function(d) {
            return "number" == typeof d
        },
        isObject: Og,
        isUndefined: function(d) {
            return void 0 === d
        },
        isDate: function(d) {
            return "[object Date]" === mc.call(d)
        },
        isFile: function(d) {
            return "[object File]" === mc.call(d)
        },
        isBlob: function(d) {
            return "[object Blob]" === mc.call(d)
        },
        isFunction: Pg,
        isStream: function(d) {
            return Og(d) && Pg(d.pipe)
        },
        isURLSearchParams: function(d) {
            return "undefined" != typeof URLSearchParams && d instanceof URLSearchParams
        },
        isStandardBrowserEnv: function() {
            return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document
        },
        forEach: wd,
        merge: function f() {
            function a(a, c) {
                "object" == typeof b[c] && "object" == typeof a ? b[c] = f(b[c], a) : b[c] = a
            }
            for (var b = {}, c = 0, e = arguments.length; c < e; c++)
                wd(arguments[c], a);
            return b
        },
        deepMerge: function a() {
            function b(b, e) {
                "object" == typeof c[e] && "object" == typeof b ? c[e] = a(c[e], b) : c[e] = "object" == typeof b ? a({}, b) : b
            }
            for (var c = {}, e = 0, g = arguments.length; e < g; e++)
                wd(arguments[e], b);
            return c
        },
        extend: function(a, b, c) {
            return wd(b, function(b, g) {
                a[g] = c && "function" == typeof b ? Vg(b, c) : b
            }),
            a
        },
        trim: function(a) {
            return a.replace(/^\s*/, "").replace(/\s*$/, "")
        }
    }
      , Uj = function(a, b, c) {
        if (!b)
            return a;
        if (c)
            b = c(b);
        else if (K.isURLSearchParams(b))
            b = b.toString();
        else {
            var e = [];
            K.forEach(b, function(a, b) {
                null != a && (K.isArray(a) ? b += "[]" : a = [a],
                K.forEach(a, function(a) {
                    K.isDate(a) ? a = a.toISOString() : K.isObject(a) && (a = JSON.stringify(a));
                    e.push(Qg(b) + "=" + Qg(a))
                }))
            });
            b = e.join("&")
        }
        b && (c = a.indexOf("#"),
        -1 !== c && (a = a.slice(0, c)),
        a += (-1 === a.indexOf("?") ? "?" : "&") + b);
        return a
    };
    xd.prototype.use = function(a, b) {
        return this.handlers.push({
            fulfilled: a,
            rejected: b
        }),
        this.handlers.length - 1
    }
    ;
    xd.prototype.eject = function(a) {
        this.handlers[a] && (this.handlers[a] = null)
    }
    ;
    xd.prototype.forEach = function(a) {
        K.forEach(this.handlers, function(b) {
            null !== b && a(b)
        })
    }
    ;
    var Sg = xd
      , Jf = function(a, b, c) {
        return K.forEach(c, function(c) {
            a = c(a, b)
        }),
        a
    }
      , Vj = function(a) {
        return !(!a || !a.__CANCEL__)
    }
      , Wj = function(a, b) {
        K.forEach(a, function(c, e) {
            e !== b && e.toUpperCase() === b.toUpperCase() && (a[b] = c,
            delete a[e])
        })
    }
      , he = function(a, b, c, e, g) {
        return function(a, b, c, e, g) {
            return a.config = b,
            c && (a.code = c),
            a.request = e,
            a.response = g,
            a.isAxiosError = !0,
            a.toJSON = function() {
                return {
                    message: this.message,
                    name: this.name,
                    description: this.description,
                    number: this.number,
                    fileName: this.fileName,
                    lineNumber: this.lineNumber,
                    columnNumber: this.columnNumber,
                    stack: this.stack,
                    config: this.config,
                    code: this.code
                }
            }
            ,
            a
        }(Error(a), b, c, e, g)
    }
      , In = "age authorization content-length content-type etag expires from host if-modified-since if-unmodified-since last-modified location max-forwards proxy-authorization referer retry-after user-agent".split(" ")
      , Jn = K.isStandardBrowserEnv() ? function() {
        function a(a) {
            return c && (e.setAttribute("href", a),
            a = e.href),
            e.setAttribute("href", a),
            {
                href: e.href,
                protocol: e.protocol ? e.protocol.replace(/:$/, "") : "",
                host: e.host,
                search: e.search ? e.search.replace(/^\?/, "") : "",
                hash: e.hash ? e.hash.replace(/^#/, "") : "",
                hostname: e.hostname,
                port: e.port,
                pathname: "/" === e.pathname.charAt(0) ? e.pathname : "/" + e.pathname
            }
        }
        var b, c = /(msie|trident)/i.test(navigator.userAgent), e = document.createElement("a");
        return b = a(window.location.href),
        function(c) {
            c = K.isString(c) ? a(c) : c;
            return c.protocol === b.protocol && c.host === b.host
        }
    }() : function() {
        return !0
    }
      , Kn = K.isStandardBrowserEnv() ? {
        write: function(a, b, c, e, g, h) {
            var m = [];
            m.push(a + "=" + encodeURIComponent(b));
            K.isNumber(c) && m.push("expires=" + (new Date(c)).toGMTString());
            K.isString(e) && m.push("path=" + e);
            K.isString(g) && m.push("domain=" + g);
            !0 === h && m.push("secure");
            document.cookie = m.join("; ")
        },
        read: function(a) {
            return (a = document.cookie.match(new RegExp("(^|;\\s*)(" + a + ")=([^;]*)"))) ? decodeURIComponent(a[3]) : null
        },
        remove: function(a) {
            this.write(a, "", Date.now() - 864E5)
        }
    } : {
        write: function() {},
        read: function() {
            return null
        },
        remove: function() {}
    }
      , Ln = function(a) {
        return new Promise(function(b, c) {
            var e = a.data
              , g = a.headers;
            K.isFormData(e) && delete g["Content-Type"];
            var h = new XMLHttpRequest;
            a.auth && (g.Authorization = "Basic " + btoa((a.auth.username || "") + ":" + (a.auth.password || "")));
            if (h.open(a.method.toUpperCase(), Uj(a.url, a.params, a.paramsSerializer), !0),
            h.timeout = a.timeout,
            h.onreadystatechange = function() {
                if (h && 4 === h.readyState && (0 !== h.status || h.responseURL && 0 === h.responseURL.indexOf("file:"))) {
                    var e, g, m, k, l, n = "getAllResponseHeaders"in h ? (e = h.getAllResponseHeaders(),
                    l = {},
                    e ? (K.forEach(e.split("\n"), function(a) {
                        (k = a.indexOf(":"),
                        g = K.trim(a.substr(0, k)).toLowerCase(),
                        m = K.trim(a.substr(k + 1)),
                        !g) || l[g] && 0 <= In.indexOf(g) || (l[g] = "set-cookie" === g ? (l[g] ? l[g] : []).concat([m]) : l[g] ? l[g] + ", " + m : m)
                    }),
                    l) : l) : null;
                    !function(a, b, c) {
                        var e = c.config.validateStatus;
                        !e || e(c.status) ? a(c) : b(he("Request failed with status code " + c.status, c.config, null, c.request, c))
                    }(b, c, {
                        data: a.responseType && "text" !== a.responseType ? h.response : h.responseText,
                        status: h.status,
                        statusText: h.statusText,
                        headers: n,
                        config: a,
                        request: h
                    });
                    h = null
                }
            }
            ,
            h.onabort = function() {
                h && (c(he("Request aborted", a, "ECONNABORTED", h)),
                h = null)
            }
            ,
            h.onerror = function() {
                c(he("Network Error", a, null, h));
                h = null
            }
            ,
            h.ontimeout = function() {
                c(he("timeout of " + a.timeout + "ms exceeded", a, "ECONNABORTED", h));
                h = null
            }
            ,
            K.isStandardBrowserEnv()) {
                var m = (a.withCredentials || Jn(a.url)) && a.xsrfCookieName ? Kn.read(a.xsrfCookieName) : void 0;
                m && (g[a.xsrfHeaderName] = m)
            }
            if ("setRequestHeader"in h && K.forEach(g, function(a, b) {
                void 0 === e && "content-type" === b.toLowerCase() ? delete g[b] : h.setRequestHeader(b, a)
            }),
            a.withCredentials && (h.withCredentials = !0),
            a.responseType)
                try {
                    h.responseType = a.responseType
                } catch (r) {
                    if ("json" !== a.responseType)
                        throw r;
                }
            "function" == typeof a.onDownloadProgress && h.addEventListener("progress", a.onDownloadProgress);
            "function" == typeof a.onUploadProgress && h.upload && h.upload.addEventListener("progress", a.onUploadProgress);
            a.cancelToken && a.cancelToken.promise.then(function(a) {
                h && (h.abort(),
                c(a),
                h = null)
            });
            void 0 === e && (e = null);
            h.send(e)
        }
        )
    }
      , Mn = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
      , ie = {
        adapter: function() {
            var a;
            return ("undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process) || "undefined" != typeof XMLHttpRequest) && (a = Ln),
            a
        }(),
        transformRequest: [function(a, b) {
            return Wj(b, "Accept"),
            Wj(b, "Content-Type"),
            K.isFormData(a) || K.isArrayBuffer(a) || K.isBuffer(a) || K.isStream(a) || K.isFile(a) || K.isBlob(a) ? a : K.isArrayBufferView(a) ? a.buffer : K.isURLSearchParams(a) ? (Rg(b, "application/x-www-form-urlencoded;charset=utf-8"),
            a.toString()) : K.isObject(a) ? (Rg(b, "application/json;charset=utf-8"),
            JSON.stringify(a)) : a
        }
        ],
        transformResponse: [function(a) {
            if ("string" == typeof a)
                try {
                    a = JSON.parse(a)
                } catch (b) {}
            return a
        }
        ],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        validateStatus: function(a) {
            return 200 <= a && 300 > a
        },
        headers: {
            common: {
                Accept: "application/json, text/plain, */*"
            }
        }
    };
    K.forEach(["delete", "get", "head"], function(a) {
        ie.headers[a] = {}
    });
    K.forEach(["post", "put", "patch"], function(a) {
        ie.headers[a] = K.merge(Mn)
    });
    var Nn = function(a) {
        var b, c, e;
        a.cancelToken && a.cancelToken.throwIfRequested();
        return a.baseURL && (e = a.url,
        !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)) && (a.url = (b = a.baseURL,
        (c = a.url) ? b.replace(/\/+$/, "") + "/" + c.replace(/^\/+/, "") : b)),
        a.headers = a.headers || {},
        a.data = Jf(a.data, a.headers, a.transformRequest),
        a.headers = K.merge(a.headers.common || {}, a.headers[a.method] || {}, a.headers || {}),
        K.forEach("delete get head post put patch common".split(" "), function(b) {
            delete a.headers[b]
        }),
        (a.adapter || ie.adapter)(a).then(function(b) {
            a.cancelToken && a.cancelToken.throwIfRequested();
            return b.data = Jf(b.data, b.headers, a.transformResponse),
            b
        }, function(b) {
            Vj(b) || (a.cancelToken && a.cancelToken.throwIfRequested(),
            b && b.response && (b.response.data = Jf(b.response.data, b.response.headers, a.transformResponse)));
            return Promise.reject(b)
        })
    }
      , Kf = function(a, b) {
        b = b || {};
        var c = {};
        return K.forEach(["url", "method", "params", "data"], function(a) {
            void 0 !== b[a] && (c[a] = b[a])
        }),
        K.forEach(["headers", "auth", "proxy"], function(e) {
            K.isObject(b[e]) ? c[e] = K.deepMerge(a[e], b[e]) : void 0 !== b[e] ? c[e] = b[e] : K.isObject(a[e]) ? c[e] = K.deepMerge(a[e]) : void 0 !== a[e] && (c[e] = a[e])
        }),
        K.forEach("baseURL transformRequest transformResponse paramsSerializer timeout withCredentials adapter responseType xsrfCookieName xsrfHeaderName onUploadProgress onDownloadProgress maxContentLength validateStatus maxRedirects httpAgent httpsAgent cancelToken socketPath".split(" "), function(e) {
            void 0 !== b[e] ? c[e] = b[e] : void 0 !== a[e] && (c[e] = a[e])
        }),
        c
    };
    Kc.prototype.request = function(a, b) {
        "string" == typeof a ? (a = b || {}).url = a : a = a || {};
        (a = Kf(this.defaults, a)).method = a.method ? a.method.toLowerCase() : "get";
        var c = [Nn, void 0];
        a = Promise.resolve(a);
        this.interceptors.request.forEach(function(a) {
            c.unshift(a.fulfilled, a.rejected)
        });
        for (this.interceptors.response.forEach(function(a) {
            c.push(a.fulfilled, a.rejected)
        }); c.length; )
            a = a.then(c.shift(), c.shift());
        return a
    }
    ;
    Kc.prototype.getUri = function(a) {
        return a = Kf(this.defaults, a),
        Uj(a.url, a.params, a.paramsSerializer).replace(/^\?/, "")
    }
    ;
    K.forEach(["delete", "get", "head", "options"], function(a) {
        Kc.prototype[a] = function(b, c) {
            return this.request(K.merge(c || {}, {
                method: a,
                url: b
            }))
        }
    });
    K.forEach(["post", "put", "patch"], function(a) {
        Kc.prototype[a] = function(b, c, e) {
            return this.request(K.merge(e || {}, {
                method: a,
                url: b,
                data: c
            }))
        }
    });
    var zd = Kc;
    xe.prototype.toString = function() {
        return "Cancel" + (this.message ? ": " + this.message : "")
    }
    ;
    xe.prototype.__CANCEL__ = !0;
    var Tg = xe;
    yd.prototype.throwIfRequested = function() {
        if (this.reason)
            throw this.reason;
    }
    ;
    yd.source = function() {
        var a;
        return {
            token: new yd(function(b) {
                a = b
            }
            ),
            cancel: a
        }
    }
    ;
    var Cb = Ug(ie);
    Cb.Axios = zd;
    Cb.create = function(a) {
        return Ug(Kf(Cb.defaults, a))
    }
    ;
    Cb.Cancel = Tg;
    Cb.CancelToken = yd;
    Cb.isCancel = Vj;
    Cb.all = function(a) {
        return Promise.all(a)
    }
    ;
    Cb.spread = function(a) {
        return function(b) {
            return a.apply(null, b)
        }
    }
    ;
    var zb = Cb.default = Cb;
    let pb = {
        DEBUG: 0,
        INFO: 1,
        WARNING: 2,
        ERROR: 3,
        NONE: 4
    }
      , Xj = a=>{
        for (const b in pb)
            if (pb[b] === a)
                return b;
        return "DEFAULT"
    }
      , k = new class {
        constructor() {
            this.logLevel = pb.DEBUG;
            this.uploadLogWaitingList = [];
            this.uploadLogUploadingList = [];
            this.currentLogID = this.uploadErrorCount = 0
        }
        debug(...a) {
            var b;
            a = l(b = [pb.DEBUG]).call(b, a);
            this.log.apply(this, a)
        }
        info(...a) {
            var b;
            a = l(b = [pb.INFO]).call(b, a);
            this.log.apply(this, a)
        }
        warning(...a) {
            var b;
            a = l(b = [pb.WARNING]).call(b, a);
            this.log.apply(this, a)
        }
        error(...a) {
            var b;
            a = l(b = [pb.ERROR]).call(b, a);
            this.log.apply(this, a)
        }
        setLogLevel(a) {
            this.logLevel = a = Math.min(Math.max(0, a), 4)
        }
        enableLogUpload() {
            kc("UPLOAD_LOG", !0)
        }
        disableLogUpload() {
            kc("UPLOAD_LOG", !1);
            this.uploadLogUploadingList = [];
            this.uploadLogWaitingList = []
        }
        setProxyServer(a) {
            this.proxyServerURL = a
        }
        log(...a) {
            var b, c, e, g;
            const h = Math.max(0, Math.min(4, a[0]));
            if (!(a[0] = Wg() + " Agora-SDK [".concat(Xj(h), "]:"),
            this.appendLogToWaitingList(h, a),
            h < this.logLevel)) {
                var m = Wg() + " %cAgora-SDK [".concat(Xj(h), "]:");
                switch (h) {
                case pb.DEBUG:
                    a = l(b = [m, "color: #64B5F6;"]).call(b, Aa(a).call(a, 1));
                    console.log.apply(console, a);
                    break;
                case pb.INFO:
                    a = l(c = [m, "color: #1E88E5; font-weight: bold;"]).call(c, Aa(a).call(a, 1));
                    console.log.apply(console, a);
                    break;
                case pb.WARNING:
                    a = l(e = [m, "color: #FB8C00; font-weight: bold;"]).call(e, Aa(a).call(a, 1));
                    console.warn.apply(console, a);
                    break;
                case pb.ERROR:
                    a = l(g = [m, "color: #B00020; font-weight: bold;"]).call(g, Aa(a).call(a, 1)),
                    console.error.apply(console, a)
                }
            }
        }
        appendLogToWaitingList(a, ...b) {
            if (v.UPLOAD_LOG) {
                var c = "";
                q(b).call(b, a=>{
                    "object" == typeof a && (a = w(a));
                    c += "".concat(a, " ")
                }
                );
                this.uploadLogWaitingList.push({
                    payload_str: c,
                    log_level: a,
                    log_item_id: this.currentLogID++
                });
                0 === this.uploadLogUploadingList.length && this.uploadLogInterval()
            }
        }
        async uploadLogs() {
            var a, b = {
                sdk_version: Ta,
                process_id: v.PROCESS_ID,
                payload: w(this.uploadLogUploadingList)
            };
            b = await zb.post(this.url || (this.proxyServerURL ? l(a = "https://".concat(this.proxyServerURL, "/ls/?h=")).call(a, v.LOG_UPLOAD_SERVER, "&p=443&d=upload/v1") : "https://".concat(v.LOG_UPLOAD_SERVER, "/upload/v1")), b, {
                responseType: "text"
            });
            if ("OK" !== b.data)
                throw Error("unexpected upload log response: " + b.data);
            this.uploadLogUploadingList = []
        }
        uploadLogInterval() {
            if (0 !== this.uploadLogUploadingList.length || 0 !== this.uploadLogWaitingList.length) {
                var a;
                0 === this.uploadLogUploadingList.length && (this.uploadLogUploadingList = Ia(a = this.uploadLogWaitingList).call(a, 0, 10));
                this.uploadLogs().then(()=>{
                    this.uploadErrorCount = 0;
                    0 < this.uploadLogWaitingList.length && window.setTimeout(()=>this.uploadLogInterval(), 3E3)
                }
                ).catch(a=>{
                    this.uploadErrorCount += 1;
                    2 > this.uploadErrorCount ? window.setTimeout(()=>this.uploadLogInterval(), 200) : window.setTimeout(()=>this.uploadLogInterval(), 1E3)
                }
                )
            }
        }
    }
    ;
    class p {
        constructor(a, b="", c) {
            var e;
            this.name = "AgoraRTCException";
            this.code = a;
            this.message = l(e = "AgoraRTCError ".concat(this.code, ": ")).call(e, b);
            this.data = c
        }
        toString() {
            var a;
            return this.data ? l(a = "".concat(this.message, " data: ")).call(a, w(this.data)) : this.message
        }
        print() {
            return k.error(this.toString()),
            this
        }
        throw() {
            throw this.print(),
            this;
        }
    }
    var Yj, Ca;
    !function(a) {
        a.FREE = "free";
        a.UPLOADING = "uploading"
    }(Yj || (Yj = {}));
    (function(a) {
        a.NONE = "none";
        a.INIT = "init";
        a.CANPLAY = "canplay";
        a.PLAYING = "playing";
        a.PAUSED = "paused";
        a.SUSPEND = "suspend";
        a.STALLED = "stalled";
        a.WAITING = "waiting";
        a.ERROR = "error";
        a.DESTROYED = "destroyed";
        a.ABORT = "abort";
        a.ENDED = "ended";
        a.EMPTIED = "emptied"
    }
    )(Ca || (Ca = {}));
    O({
        target: "Number",
        stat: !0
    }, {
        MAX_SAFE_INTEGER: 9007199254740991
    });
    O({
        target: "Number",
        stat: !0
    }, {
        MIN_SAFE_INTEGER: -9007199254740991
    });
    let On = {
        sid: "",
        lts: 0,
        success: null,
        cname: null,
        uid: null,
        peer: null,
        cid: null,
        elapse: null,
        extend: null,
        vid: 0
    };
    var Da, la, Zj, D, C, ec, Kb, pc, ed, Wa, Ea, F, P, Ra, ta, Q, da, qb, U, H, hb;
    !function(a) {
        a.PUBLISH = "publish";
        a.SUBSCRIBE = "subscribe";
        a.SESSION_INIT = "session_init";
        a.JOIN_CHOOSE_SERVER = "join_choose_server";
        a.REQ_USER_ACCOUNT = "req_user_account";
        a.JOIN_GATEWAY = "join_gateway";
        a.STREAM_SWITCH = "stream_switch";
        a.REQUEST_PROXY_WORKER_MANAGER = "request_proxy_worker_manager";
        a.REQUEST_PROXY_APPCENTER = "request_proxy_appcenter";
        a.FIRST_VIDEO_RECEIVED = "first_video_received";
        a.FIRST_AUDIO_RECEIVED = "first_audio_received";
        a.FIRST_VIDEO_DECODE = "first_video_decode";
        a.FIRST_AUDIO_DECODE = "first_audio_decode";
        a.ON_ADD_AUDIO_STREAM = "on_add_audio_stream";
        a.ON_ADD_VIDEO_STREAM = "on_add_video_stream";
        a.ON_UPDATE_STREAM = "on_update_stream";
        a.ON_REMOVE_STREAM = "on_remove_stream";
        a.USER_ANALYTICS = "req_user_analytics"
    }(Da || (Da = {}));
    (function(a) {
        a.SESSION = "io.agora.pb.Wrtc.Session";
        a.JOIN_CHOOSE_SERVER = "io.agora.pb.Wrtc.JoinChooseServer";
        a.REQ_USER_ACCOUNT = "io.agora.pb.Wrtc.ReqUserAccount";
        a.JOIN_GATEWAT = "io.agora.pb.Wrtc.JoinGateway";
        a.PUBLISH = "io.agora.pb.Wrtc.Publish";
        a.SUBSCRIBE = "io.agora.pb.Wrtc.Subscribe";
        a.STREAM_SWITCH = "io.agora.pb.Wrtc.StreamSwitch";
        a.AUDIO_SENDING_STOPPED = "io.agora.pb.Wrtc.AudioSendingStopped";
        a.VIDEO_SENDING_STOPPED = "io.agora.pb.Wrtc.VideoSendingStopped";
        a.REQUEST_PROXY_APPCENTER = "io.agora.pb.Wrtc.RequestProxyAppCenter";
        a.REQUEST_PROXY_WORKER_MANAGER = "io.agora.pb.Wrtc.RequestProxyWorkerManager";
        a.API_INVOKE = "io.agora.pb.Wrtc.ApiInvoke";
        a.FIRST_VIDEO_RECEIVED = "io.agora.pb.Wrtc.FirstVideoReceived";
        a.FIRST_AUDIO_RECEIVED = "io.agora.pb.Wrtc.FirstAudioReceived";
        a.FIRST_VIDEO_DECODE = "io.agora.pb.Wrtc.FirstVideoDecode";
        a.FIRST_AUDIO_DECODE = "io.agora.pb.Wrtc.FirstAudioDecode";
        a.ON_ADD_AUDIO_STREAM = "io.agora.pb.Wrtc.OnAddAudioStream";
        a.ON_ADD_VIDEO_STREAM = "io.agora.pb.Wrtc.OnAddVideoStream";
        a.ON_UPDATE_STREAM = "io.agora.pb.Wrtc.OnUpdateStream";
        a.ON_REMOVE_STREAM = "io.agora.pb.Wrtc.OnRemoveStream";
        a.JOIN_CHANNEL_TIMEOUT = "io.agora.pb.Wrtc.JoinChannelTimeout";
        a.PEER_PUBLISH_STATUS = "io.agora.pb.Wrtc.PeerPublishStatus";
        a.WORKER_EVENT = "io.agora.pb.Wrtc.WorkerEvent";
        a.AP_WORKER_EVENT = "io.agora.pb.Wrtc.APWorkerEvent";
        a.JOIN_WEB_PROXY_AP = "io.agora.pb.Wrtc.JoinWebProxyAP";
        a.WEBSOCKET_QUIT = "io.agora.pb.Wrtc.WebSocketQuit";
        a.USER_ANALYTICS = "io.agora.pb.Wrtc.UserAnalytics"
    }
    )(la || (la = {}));
    (function(a) {
        a[a.WORKER_EVENT = 156] = "WORKER_EVENT";
        a[a.AP_WORKER_EVENT = 160] = "AP_WORKER_EVENT"
    }
    )(Zj || (Zj = {}));
    (function(a) {
        a.CREATE_CLIENT = "createClient";
        a.CHECK_SYSTEM_REQUIREMENTS = "checkSystemRequirements";
        a.CHECK_VIDEO_TRACK_IS_ACTIVE = "checkVideoTrackIsActive";
        a.CHECK_AUDIO_TRACK_IS_ACTIVE = "checkAudioTrackIsActive";
        a.CREATE_MIC_AUDIO_TRACK = "createMicrophoneAudioTrack";
        a.CREATE_CUSTOM_AUDIO_TRACK = "createCustomAudioTrack";
        a.CREATE_BUFFER_AUDIO_TRACK = "createBufferSourceAudioTrack";
        a.CREATE_CAM_VIDEO_TRACK = "createCameraVideoTrack";
        a.CREATE_CUSTOM_VIDEO_TRACK = "createCustomVideoTrack";
        a.CREATE_MIC_AND_CAM_TRACKS = "createMicrophoneAndCameraTracks";
        a.CREATE_SCREEN_VIDEO_TRACK = "createScreenVideoTrack";
        a.SET_ENCRYPTION_CONFIG = "Client.setEncryptionConfig";
        a.START_PROXY_SERVER = "Client.startProxyServer";
        a.STOP_PROXY_SERVER = "Client.stopProxyServer";
        a.SET_PROXY_SERVER = "Client.setProxyServer";
        a.SET_TURN_SERVER = "Client.setTurnServer";
        a.SET_CLIENT_ROLE = "Client.setClientRole";
        a.SET_LOW_STREAM_PARAMETER = "Client.setLowStreamParameter";
        a.ENABLE_DUAL_STREAM = "Client.enableDualStream";
        a.DISABLE_DUAL_STREAM = "Client.disableDualStream";
        a.JOIN = "Client.join";
        a.LEAVE = "Client.leave";
        a.PUBLISH = "Client.publish";
        a.UNPUBLISH = "Client.unpublish";
        a.SUBSCRIBE = "Client.subscribe";
        a.UNSUBSCRIBE = "Client.unsubscribe";
        a.RENEW_TOKEN = "Client.renewToken";
        a.SET_REMOTE_VIDEO_STREAM_TYPE = "Client.setRemoteVideoStreamType";
        a.SET_STREAM_FALLBACK_OPTION = "Client.setStreamFallbackOption";
        a.ENABLE_AUDIO_VOLUME_INDICATOR = "Client.enableAudioVolumeIndicator";
        a.SEND_CUSTOM_REPORT_MESSAGE = "Client.sendCustomReportMessage";
        a.ON_LIVE_STREAM_WARNING = "Client.onLiveStreamWarning";
        a.ON_LIVE_STREAM_ERROR = "Client.onLiveStreamingError";
        a.START_LIVE_STREAMING = "Client.startLiveStreaming";
        a.SET_LIVE_TRANSCODING = "Client.setLiveTranscoding";
        a.STOP_LIVE_STREAMING = "Client.stopLiveStreaming";
        a.ADD_INJECT_STREAM_URL = "Client.addInjectStreamUrl";
        a.REMOVE_INJECT_STREAM_URL = "Client.removeInjectStreamUrl";
        a.START_CHANNEL_MEDIA_RELAY = "Client.startChannelMediaRelay";
        a.UPDATE_CHANNEL_MEDIA_RELAY = "Client.updateChannelMediaRelay";
        a.STOP_CHANNEL_MEDIA_RELAY = "Client.stopChannelMediaRelay";
        a.REQUEST_CONFIG_DISTRIBUTE = "_config-distribute-request";
        a.SET_CONFIG_DISTRIBUTE = "_configDistribute";
        a.LOCAL_TRACK_SET_MUTED = "LocalTrack.setMute";
        a.LOCAL_AUDIO_TRACK_PLAY = "LocalAudioTrack.play";
        a.LOCAL_AUDIO_TRACK_PLAY_IN_ELEMENT = "LocalAudioTrack.playInElement";
        a.LOCAL_AUDIO_TRACK_STOP = "LocalAudioTrack.stop";
        a.LOCAL_AUDIO_TRACK_SET_VOLUME = "LocalAudioTrack.setVolume";
        a.MIC_AUDIO_TRACK_SET_DEVICE = "MicrophoneAudioTrack.setDevice";
        a.BUFFER_AUDIO_TRACK_START = "BufferSourceAudioTrack.startProcessAudioBuffer";
        a.BUFFER_AUDIO_TRACK_STOP = "BufferSourceAudioTrack.stopProcessAudioBuffer";
        a.BUFFER_AUDIO_TRACK_PAUSE = "BufferSourceAudioTrack.pauseProcessAudioBuffer";
        a.BUFFER_AUDIO_TRACK_RESUME = "BufferSourceAudioTrack.resumeProcessAudioBuffer";
        a.BUFFER_AUDIO_TRACK_SEEK = "BufferSourceAudioTrack.seekAudioBuffer";
        a.LOCAL_VIDEO_TRACK_PLAY = "LocalVideoTrack.play";
        a.LOCAL_VIDEO_TRACK_STOP = "LocalVideoTrack.stop";
        a.LOCAL_VIDEO_TRACK_BEAUTY = "LocalVideoTrack.setBeautyEffect";
        a.CAM_VIDEO_TRACK_SET_DEVICE = "CameraVideoTrack.setDevice";
        a.CAM_VIDEO_TRACK_SET_ENCODER_CONFIG = "CameraVideoTrack.setEncoderConfiguration";
        a.REMOTE_VIDEO_TRACK_PLAY = "RemoteVideoTrack.play";
        a.REMOTE_VIDEO_TRACK_STOP = "RemoteVideoTrack.stop";
        a.REMOTE_AUDIO_TRACK_PLAY = "RemoteAudioTrack.play";
        a.REMOTE_AUDIO_TRACK_STOP = "RemoteAudioTrack.stop";
        a.REMOTE_AUDIO_SET_VOLUME = "RemoteAudioTrack.setVolume";
        a.REMOTE_AUDIO_SET_OUTPUT_DEVICE = "RemoteAudioTrack.setOutputDevice";
        a.STREAM_TYPE_CHANGE = "streamTypeChange"
    }
    )(D || (D = {}));
    (C || (C = {})).TRACER = "tracer";
    (function(a) {
        a.IDLE = "IDLE";
        a.INITING = "INITING";
        a.INITEND = "INITEND"
    }
    )(ec || (ec = {}));
    (function(a) {
        a.STATE_CHANGE = "state_change";
        a.RECORDING_DEVICE_CHANGED = "recordingDeviceChanged";
        a.PLAYOUT_DEVICE_CHANGED = "playoutDeviceChanged";
        a.CAMERA_DEVICE_CHANGED = "cameraDeviceChanged"
    }
    )(Kb || (Kb = {}));
    (function(a) {
        a[a.ACCESS_POINT = 101] = "ACCESS_POINT";
        a[a.UNILBS = 201] = "UNILBS";
        a[a.STRING_UID_ALLOCATOR = 901] = "STRING_UID_ALLOCATOR"
    }
    )(pc || (pc = {}));
    (function(a) {
        a[a.IIIEGAL_APPID = 1] = "IIIEGAL_APPID";
        a[a.IIIEGAL_UID = 2] = "IIIEGAL_UID";
        a[a.INTERNAL_ERROR = 3] = "INTERNAL_ERROR"
    }
    )(ed || (ed = {}));
    (function(a) {
        a[a.INVALID_VENDOR_KEY = 5] = "INVALID_VENDOR_KEY";
        a[a.INVALID_CHANNEL_NAME = 7] = "INVALID_CHANNEL_NAME";
        a[a.INTERNAL_ERROR = 8] = "INTERNAL_ERROR";
        a[a.NO_AUTHORIZED = 9] = "NO_AUTHORIZED";
        a[a.DYNAMIC_KEY_TIMEOUT = 10] = "DYNAMIC_KEY_TIMEOUT";
        a[a.NO_ACTIVE_STATUS = 11] = "NO_ACTIVE_STATUS";
        a[a.DYNAMIC_KEY_EXPIRED = 13] = "DYNAMIC_KEY_EXPIRED";
        a[a.STATIC_USE_DYNAMIC_KEY = 14] = "STATIC_USE_DYNAMIC_KEY";
        a[a.DYNAMIC_USE_STATIC_KEY = 15] = "DYNAMIC_USE_STATIC_KEY";
        a[a.USER_OVERLOAD = 16] = "USER_OVERLOAD";
        a[a.FORBIDDEN_REGION = 18] = "FORBIDDEN_REGION";
        a[a.CANNOT_MEET_AREA_DEMAND = 19] = "CANNOT_MEET_AREA_DEMAND"
    }
    )(Wa || (Wa = {}));
    (function(a) {
        a[a.NO_FLAG_SET = 100] = "NO_FLAG_SET";
        a[a.FLAG_SET_BUT_EMPTY = 101] = "FLAG_SET_BUT_EMPTY";
        a[a.INVALID_FALG_SET = 102] = "INVALID_FALG_SET";
        a[a.NO_SERVICE_AVAILABLE = 200] = "NO_SERVICE_AVAILABLE";
        a[a.NO_SERVICE_AVAILABLE_P2P = 201] = "NO_SERVICE_AVAILABLE_P2P";
        a[a.NO_SERVICE_AVAILABLE_VOICE = 202] = "NO_SERVICE_AVAILABLE_VOICE";
        a[a.NO_SERVICE_AVAILABLE_WEBRTC = 203] = "NO_SERVICE_AVAILABLE_WEBRTC";
        a[a.NO_SERVICE_AVAILABLE_CDS = 204] = "NO_SERVICE_AVAILABLE_CDS";
        a[a.NO_SERVICE_AVAILABLE_CDN = 205] = "NO_SERVICE_AVAILABLE_CDN";
        a[a.NO_SERVICE_AVAILABLE_TDS = 206] = "NO_SERVICE_AVAILABLE_TDS";
        a[a.NO_SERVICE_AVAILABLE_REPORT = 207] = "NO_SERVICE_AVAILABLE_REPORT";
        a[a.NO_SERVICE_AVAILABLE_APP_CENTER = 208] = "NO_SERVICE_AVAILABLE_APP_CENTER";
        a[a.NO_SERVICE_AVAILABLE_ENV0 = 209] = "NO_SERVICE_AVAILABLE_ENV0";
        a[a.NO_SERVICE_AVAILABLE_VOET = 210] = "NO_SERVICE_AVAILABLE_VOET";
        a[a.NO_SERVICE_AVAILABLE_STRING_UID = 211] = "NO_SERVICE_AVAILABLE_STRING_UID";
        a[a.NO_SERVICE_AVAILABLE_WEBRTC_UNILBS = 212] = "NO_SERVICE_AVAILABLE_WEBRTC_UNILBS";
        a[a.NO_SERVICE_AVAILABLE_UNILBS_FLV = 213] = "NO_SERVICE_AVAILABLE_UNILBS_FLV"
    }
    )(Ea || (Ea = {}));
    (function(a) {
        a[a.K_TIMESTAMP_EXPIRED = 2] = "K_TIMESTAMP_EXPIRED";
        a[a.K_CHANNEL_PERMISSION_INVALID = 3] = "K_CHANNEL_PERMISSION_INVALID";
        a[a.K_CERTIFICATE_INVALID = 4] = "K_CERTIFICATE_INVALID";
        a[a.K_CHANNEL_NAME_EMPTY = 5] = "K_CHANNEL_NAME_EMPTY";
        a[a.K_CHANNEL_NOT_FOUND = 6] = "K_CHANNEL_NOT_FOUND";
        a[a.K_TICKET_INVALID = 7] = "K_TICKET_INVALID";
        a[a.K_CHANNEL_CONFLICTED = 8] = "K_CHANNEL_CONFLICTED";
        a[a.K_SERVICE_NOT_READY = 9] = "K_SERVICE_NOT_READY";
        a[a.K_SERVICE_TOO_HEAVY = 10] = "K_SERVICE_TOO_HEAVY";
        a[a.K_UID_BANNED = 14] = "K_UID_BANNED";
        a[a.K_IP_BANNED = 15] = "K_IP_BANNED";
        a[a.K_CHANNEL_BANNED = 16] = "K_CHANNEL_BANNED";
        a[a.WARN_NO_AVAILABLE_CHANNEL = 103] = "WARN_NO_AVAILABLE_CHANNEL";
        a[a.WARN_LOOKUP_CHANNEL_TIMEOUT = 104] = "WARN_LOOKUP_CHANNEL_TIMEOUT";
        a[a.WARN_LOOKUP_CHANNEL_REJECTED = 105] = "WARN_LOOKUP_CHANNEL_REJECTED";
        a[a.WARN_OPEN_CHANNEL_TIMEOUT = 106] = "WARN_OPEN_CHANNEL_TIMEOUT";
        a[a.WARN_OPEN_CHANNEL_REJECTED = 107] = "WARN_OPEN_CHANNEL_REJECTED";
        a[a.WARN_REQUEST_DEFERRED = 108] = "WARN_REQUEST_DEFERRED";
        a[a.ERR_DYNAMIC_KEY_TIMEOUT = 109] = "ERR_DYNAMIC_KEY_TIMEOUT";
        a[a.ERR_NO_AUTHORIZED = 110] = "ERR_NO_AUTHORIZED";
        a[a.ERR_VOM_SERVICE_UNAVAILABLE = 111] = "ERR_VOM_SERVICE_UNAVAILABLE";
        a[a.ERR_NO_CHANNEL_AVAILABLE_CODE = 112] = "ERR_NO_CHANNEL_AVAILABLE_CODE";
        a[a.ERR_MASTER_VOCS_UNAVAILABLE = 114] = "ERR_MASTER_VOCS_UNAVAILABLE";
        a[a.ERR_INTERNAL_ERROR = 115] = "ERR_INTERNAL_ERROR";
        a[a.ERR_NO_ACTIVE_STATUS = 116] = "ERR_NO_ACTIVE_STATUS";
        a[a.ERR_INVALID_UID = 117] = "ERR_INVALID_UID";
        a[a.ERR_DYNAMIC_KEY_EXPIRED = 118] = "ERR_DYNAMIC_KEY_EXPIRED";
        a[a.ERR_STATIC_USE_DYANMIC_KE = 119] = "ERR_STATIC_USE_DYANMIC_KE";
        a[a.ERR_DYNAMIC_USE_STATIC_KE = 120] = "ERR_DYNAMIC_USE_STATIC_KE";
        a[a.ERR_NO_VOCS_AVAILABLE = 2E3] = "ERR_NO_VOCS_AVAILABLE";
        a[a.ERR_NO_VOS_AVAILABLE = 2001] = "ERR_NO_VOS_AVAILABLE";
        a[a.ERR_JOIN_CHANNEL_TIMEOUT = 2002] = "ERR_JOIN_CHANNEL_TIMEOUT";
        a[a.ERR_REPEAT_JOIN_CHANNEL = 2003] = "ERR_REPEAT_JOIN_CHANNEL";
        a[a.ERR_JOIN_BY_MULTI_IP = 2004] = "ERR_JOIN_BY_MULTI_IP";
        a[a.ERR_NOT_JOINED = 2011] = "ERR_NOT_JOINED";
        a[a.ERR_REPEAT_JOIN_REQUEST = 2012] = "ERR_REPEAT_JOIN_REQUEST";
        a[a.ERR_INVALID_VENDOR_KEY = 2013] = "ERR_INVALID_VENDOR_KEY";
        a[a.ERR_INVALID_CHANNEL_NAME = 2014] = "ERR_INVALID_CHANNEL_NAME";
        a[a.ERR_INVALID_STRINGUID = 2015] = "ERR_INVALID_STRINGUID";
        a[a.ERR_TOO_MANY_USERS = 2016] = "ERR_TOO_MANY_USERS";
        a[a.ERR_SET_CLIENT_ROLE_TIMEOUT = 2017] = "ERR_SET_CLIENT_ROLE_TIMEOUT";
        a[a.ERR_SET_CLIENT_ROLE_NO_PERMISSION = 2018] = "ERR_SET_CLIENT_ROLE_NO_PERMISSION";
        a[a.ERR_SET_CLIENT_ROLE_ALREADY_IN_USE = 2019] = "ERR_SET_CLIENT_ROLE_ALREADY_IN_USE";
        a[a.ERR_PUBLISH_REQUEST_INVALID = 2020] = "ERR_PUBLISH_REQUEST_INVALID";
        a[a.ERR_SUBSCRIBE_REQUEST_INVALID = 2021] = "ERR_SUBSCRIBE_REQUEST_INVALID";
        a[a.ERR_NOT_SUPPORTED_MESSAGE = 2022] = "ERR_NOT_SUPPORTED_MESSAGE";
        a[a.ERR_ILLEAGAL_PLUGIN = 2023] = "ERR_ILLEAGAL_PLUGIN";
        a[a.ERR_REJOIN_TOKEN_INVALID = 2024] = "ERR_REJOIN_TOKEN_INVALID";
        a[a.ERR_REJOIN_USER_NOT_JOINED = 2025] = "ERR_REJOIN_USER_NOT_JOINED";
        a[a.ERR_INVALID_OPTIONAL_INFO = 2027] = "ERR_INVALID_OPTIONAL_INFO";
        a[a.ILLEGAL_AES_PASSWORD = 2028] = "ILLEGAL_AES_PASSWORD";
        a[a.ILLEGAL_CLIENT_ROLE_LEVEL = 2029] = "ILLEGAL_CLIENT_ROLE_LEVEL";
        a[a.ERR_TEST_RECOVER = 9E3] = "ERR_TEST_RECOVER";
        a[a.ERR_TEST_TRYNEXT = 9001] = "ERR_TEST_TRYNEXT";
        a[a.ERR_TEST_RETRY = 9002] = "ERR_TEST_RETRY"
    }
    )(F || (F = {}));
    (function(a) {
        a.CONNECTION_STATE_CHANGE = "connection-state-change";
        a.MEDIA_RECONNECT_START = "media-reconnect-start";
        a.MEDIA_RECONNECT_END = "media-reconnect-end";
        a.IS_USING_CLOUD_PROXY = "is-using-cloud-proxy";
        a.USER_JOINED = "user-joined";
        a.USER_LEAVED = "user-left";
        a.USER_PUBLISHED = "user-published";
        a.USER_UNPUBLISHED = "user-unpublished";
        a.USER_INFO_UPDATED = "user-info-updated";
        a.CLIENT_BANNED = "client-banned";
        a.CHANNEL_MEDIA_RELAY_STATE = "channel-media-relay-state";
        a.CHANNEL_MEDIA_RELAY_EVENT = "channel-media-relay-event";
        a.VOLUME_INDICATOR = "volume-indicator";
        a.CRYPT_ERROR = "crypt-error";
        a.ON_TOKEN_PRIVILEGE_WILL_EXPIRE = "token-privilege-will-expire";
        a.ON_TOKEN_PRIVILEGE_DID_EXPIRE = "token-privilege-did-expire";
        a.NETWORK_QUALITY = "network-quality";
        a.STREAM_TYPE_CHANGED = "stream-type-changed";
        a.STREAM_FALLBACK = "stream-fallback";
        a.RECEIVE_METADATA = "receive-metadata";
        a.STREAM_MESSAGE = "stream-message";
        a.LIVE_STREAMING_ERROR = "live-streaming-error";
        a.LIVE_STREAMING_WARNING = "live-streaming-warning";
        a.INJECT_STREAM_STATUS = "stream-inject-status";
        a.EXCEPTION = "exception";
        a.ERROR = "error"
    }
    )(P || (P = {}));
    (function(a) {
        a.NETWORK_ERROR = "NETWORK_ERROR";
        a.SERVER_ERROR = "SERVER_ERROR";
        a.MULTI_IP = "MULTI_IP";
        a.TIMEOUT = "TIMEOUT";
        a.OFFLINE = "OFFLINE";
        a.LEAVE = "LEAVE"
    }
    )(Ra || (Ra = {}));
    (function(a) {
        a.CONNECTING = "connecting";
        a.CONNECTED = "connected";
        a.RECONNECTING = "reconnecting";
        a.CLOSED = "closed"
    }
    )(ta || (ta = {}));
    (function(a) {
        a.WS_CONNECTED = "ws_connected";
        a.WS_RECONNECTING = "ws_reconnecting";
        a.WS_CLOSED = "ws_closed";
        a.ON_BINARY_DATA = "on_binary_data";
        a.REQUEST_RECOVER = "request_recover";
        a.REQUEST_JOIN_INFO = "request_join_info";
        a.REQUEST_REJOIN_INFO = "req_rejoin_info";
        a.IS_P2P_DISCONNECTED = "is_p2p_dis";
        a.DISCONNECT_P2P = "dis_p2p";
        a.NEED_RENEW_SESSION = "need-sid";
        a.REPORT_JOIN_GATEWAY = "report_join_gateway";
        a.REQUEST_TIMEOUT = "request_timeout";
        a.REQUEST_SUCCESS = "request_success"
    }
    )(Q || (Q = {}));
    (function(a) {
        a.PING = "ping";
        a.PING_BACK = "ping_back";
        a.JOIN = "join_v2";
        a.REJOIN = "rejoin";
        a.LEAVE = "leave";
        a.SET_CLIENT_ROLE = "set_client_role";
        a.PUBLISH = "publish";
        a.UNPUBLISH = "unpublish";
        a.SUBSCRIBE = "subscribe";
        a.UNSUBSCRIBE = "unsubscribe";
        a.SUBSCRIBE_CHANGE = "subscribe_change";
        a.TRAFFIC_STATS = "traffic_stats";
        a.RENEW_TOKEN = "renew_token";
        a.SWITCH_VIDEO_STREAM = "switch_video_stream";
        a.SET_FALLBACK_OPTION = "set_fallback_option";
        a.GATEWAY_INFO = "gateway_info";
        a.CONTROL = "control";
        a.SEND_METADATA = "send_metadata";
        a.DATA_STREAM = "data_stream";
        a.PICK_SVC_LAYER = "pick_svc_layer"
    }
    )(da || (da = {}));
    (function(a) {
        a.PUBLISH_STATS = "publish_stats";
        a.PUBLISH_RELATED_STATS = "publish_related_stats";
        a.SUBSCRIBE_STATS = "subscribe_stats";
        a.SUBSCRIBE_RELATED_STATS = "subscribe_related_stats"
    }
    )(qb || (qb = {}));
    (function(a) {
        a.ON_USER_ONLINE = "on_user_online";
        a.ON_USER_OFFLINE = "on_user_offline";
        a.ON_STREAM_FALLBACK_UPDATE = "on_stream_fallback_update";
        a.ON_PUBLISH_STREAM = "on_publish_stream";
        a.ON_UPLINK_STATS = "on_uplink_stats";
        a.ON_P2P_LOST = "on_p2p_lost";
        a.ON_REMOVE_STREAM = "on_remove_stream";
        a.ON_ADD_AUDIO_STREAM = "on_add_audio_stream";
        a.ON_ADD_VIDEO_STREAM = "on_add_video_stream";
        a.ON_TOKEN_PRIVILEGE_WILL_EXPIRE = "on_token_privilege_will_expire";
        a.ON_TOKEN_PRIVILEGE_DID_EXPIRE = "on_token_privilege_did_expire";
        a.ON_USER_BANNED = "on_user_banned";
        a.ON_NOTIFICATION = "on_notification";
        a.ON_CRYPT_ERROR = "on_crypt_error";
        a.MUTE_AUDIO = "mute_audio";
        a.MUTE_VIDEO = "mute_video";
        a.UNMUTE_AUDIO = "unmute_audio";
        a.UNMUTE_VIDEO = "unmute_video";
        a.RECEIVE_METADATA = "receive_metadata";
        a.ON_DATA_STREAM = "on_data_stream";
        a.ENABLE_LOCAL_VIDEO = "enable_local_video";
        a.DISABLE_LOCAL_VIDEO = "disable_local_video";
        a.ENABLE_LOCAL_AUDIO = "enable_local_audio";
        a.DISABLE_LOCAL_AUDIO = "disable_local_audio"
    }
    )(U || (U = {}));
    (function(a) {
        a.CONNECTION_STATE_CHANGE = "CONNECTION_STATE_CHANGE";
        a.NEED_ANSWER = "NEED_ANSWER";
        a.NEED_RENEGOTIATE = "NEED_RENEGOTIATE";
        a.P2P_LOST = "P2P_LOST";
        a.GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST";
        a.NEED_UNPUB = "NEED_UNPUB";
        a.NEED_UNSUB = "NEED_UNSUB";
        a.NEED_UPLOAD = "NEED_UPLOAD";
        a.START_RECONNECT = "START_RECONNECT";
        a.END_RECONNECT = "END_RECONNECT";
        a.NEED_SIGNAL_RTT = "NEED_SIGNAL_RTT"
    }
    )(H || (H = {}));
    (function(a) {
        a.AUDIO_SOURCE_STATE_CHANGE = "audio_source_state_change";
        a.RECEIVE_TRACK_BUFFER = "receive_track_buffer";
        a.ON_AUDIO_BUFFER = "on_audio_buffer"
    }
    )(hb || (hb = {}));
    let je = {
        sendVolumeLevel: 0,
        sendBitrate: 0,
        sendBytes: 0,
        sendPackets: 0,
        sendPacketsLost: 0
    }
      , ke = {
        sendBytes: 0,
        sendBitrate: 0,
        sendPackets: 0,
        sendPacketsLost: 0,
        sendResolutionHeight: 0,
        sendResolutionWidth: 0,
        captureResolutionHeight: 0,
        captureResolutionWidth: 0,
        targetSendBitrate: 0,
        totalDuration: 0,
        totalFreezeTime: 0
    }
      , Lf = {
        transportDelay: 0,
        end2EndDelay: 0,
        receiveBitrate: 0,
        receiveLevel: 0,
        receiveBytes: 0,
        receiveDelay: 0,
        receivePackets: 0,
        receivePacketsLost: 0,
        totalDuration: 0,
        totalFreezeTime: 0,
        freezeRate: 0,
        packetLossRate: 0,
        publishDuration: -1
    }
      , ak = {
        uplinkNetworkQuality: 0,
        downlinkNetworkQuality: 0
    }
      , Mf = {
        transportDelay: 0,
        end2EndDelay: 0,
        receiveBitrate: 0,
        receiveBytes: 0,
        receiveDelay: 0,
        receivePackets: 0,
        receivePacketsLost: 0,
        receiveResolutionHeight: 0,
        receiveResolutionWidth: 0,
        totalDuration: 0,
        totalFreezeTime: 0,
        freezeRate: 0,
        packetLossRate: 0,
        publishDuration: -1
    };
    var S, na;
    !function(a) {
        a.CONNECTED = "websocket:connected";
        a.RECONNECTING = "websocket:reconnecting";
        a.WILL_RECONNECT = "websocket:will_reconnect";
        a.CLOSED = "websocket:closed";
        a.FAILED = "websocket:failed";
        a.ON_MESSAGE = "websocket:on_message";
        a.REQUEST_NEW_URLS = "websocket:request_new_urls"
    }(S || (S = {}));
    (function(a) {
        a.TRANSCODE = "mix_streaming";
        a.RAW = "raw_streaming";
        a.INJECT = "inject_streaming"
    }
    )(na || (na = {}));
    let Pn = {
        alpha: 1,
        height: 640,
        width: 360,
        x: 0,
        y: 0,
        zOrder: 0,
        audioChannel: 0
    }
      , Nf = {
        x: 0,
        y: 0,
        width: 160,
        height: 160,
        zOrder: 255,
        alpha: 1
    }
      , Qn = {
        audioBitrate: 48,
        audioChannels: 1,
        audioSampleRate: 48E3,
        backgroundColor: 0,
        height: 360,
        lowLatency: !1,
        videoBitrate: 400,
        videoCodecProfile: 100,
        videoCodecType: 1,
        videoFrameRate: 15,
        videoGop: 30,
        width: 640,
        images: [],
        userConfigs: [],
        userConfigExtraInfo: ""
    }
      , Rn = {
        audioBitrate: 48,
        audioChannels: 2,
        audioVolume: 100,
        audioSampleRate: 48E3,
        height: 0,
        width: 0,
        videoBitrate: 400,
        videoFramerate: 15,
        videoGop: 30
    };
    var ib, Gc, ia, bk, Fa, xa, L, rb, fd, gd;
    !function(a) {
        a.WARNING = "@live_uap-warning";
        a.ERROR = "@line_uap-error";
        a.PUBLISH_STREAM_STATUS = "@live_uap-publish-status";
        a.INJECT_STREAM_STATUS = "@live_uap-inject-status";
        a.WORKER_STATUS = "@live_uap-worker-status";
        a.REQUEST_NEW_ADDRESS = "@live_uap-request-address"
    }(ib || (ib = {}));
    (Gc || (Gc = {})).REQUEST_WORKER_MANAGER_LIST = "@live_req_worker_manager";
    (function(a) {
        a[a.LIVE_STREAM_RESPONSE_SUCCEED = 200] = "LIVE_STREAM_RESPONSE_SUCCEED";
        a[a.LIVE_STREAM_RESPONSE_ALREADY_EXISTS_STREAM = 454] = "LIVE_STREAM_RESPONSE_ALREADY_EXISTS_STREAM";
        a[a.LIVE_STREAM_RESPONSE_TRANSCODING_PARAMETER_ERROR = 450] = "LIVE_STREAM_RESPONSE_TRANSCODING_PARAMETER_ERROR";
        a[a.LIVE_STREAM_RESPONSE_BAD_STREAM = 451] = "LIVE_STREAM_RESPONSE_BAD_STREAM";
        a[a.LIVE_STREAM_RESPONSE_WM_PARAMETER_ERROR = 400] = "LIVE_STREAM_RESPONSE_WM_PARAMETER_ERROR";
        a[a.LIVE_STREAM_RESPONSE_WM_WORKER_NOT_EXIST = 404] = "LIVE_STREAM_RESPONSE_WM_WORKER_NOT_EXIST";
        a[a.LIVE_STREAM_RESPONSE_NOT_AUTHORIZED = 456] = "LIVE_STREAM_RESPONSE_NOT_AUTHORIZED";
        a[a.LIVE_STREAM_RESPONSE_FAILED_LOAD_IMAGE = 457] = "LIVE_STREAM_RESPONSE_FAILED_LOAD_IMAGE";
        a[a.LIVE_STREAM_RESPONSE_REQUEST_TOO_OFTEN = 429] = "LIVE_STREAM_RESPONSE_REQUEST_TOO_OFTEN";
        a[a.LIVE_STREAM_RESPONSE_NOT_FOUND_PUBLISH = 452] = "LIVE_STREAM_RESPONSE_NOT_FOUND_PUBLISH";
        a[a.LIVE_STREAM_RESPONSE_NOT_SUPPORTED = 453] = "LIVE_STREAM_RESPONSE_NOT_SUPPORTED";
        a[a.LIVE_STREAM_RESPONSE_MAX_STREAM_NUM = 455] = "LIVE_STREAM_RESPONSE_MAX_STREAM_NUM";
        a[a.LIVE_STREAM_RESPONSE_INTERNAL_SERVER_ERROR = 500] = "LIVE_STREAM_RESPONSE_INTERNAL_SERVER_ERROR";
        a[a.LIVE_STREAM_RESPONSE_WORKER_LOST = 501] = "LIVE_STREAM_RESPONSE_WORKER_LOST";
        a[a.LIVE_STREAM_RESPONSE_RESOURCE_LIMIT = 502] = "LIVE_STREAM_RESPONSE_RESOURCE_LIMIT";
        a[a.LIVE_STREAM_RESPONSE_WORKER_QUIT = 503] = "LIVE_STREAM_RESPONSE_WORKER_QUIT";
        a[a.ERROR_FAIL_SEND_MESSAGE = 504] = "ERROR_FAIL_SEND_MESSAGE";
        a[a.PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE = 30] = "PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE";
        a[a.PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT = 31] = "PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT";
        a[a.PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH = 32] = "PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH";
        a[a.PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN = 33] = "PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN"
    }
    )(ia || (ia = {}));
    (function(a) {
        a.CONNECT_FAILED = "connect failed";
        a.CONNECT_TIMEOUT = "connect timeout";
        a.WS_DISCONNECTED = "websocket disconnected";
        a.REQUEST_TIMEOUT = "request timeout";
        a.REQUEST_FAILED = "request failed";
        a.WAIT_STATUS_TIMEOUT = "wait status timeout";
        a.WAIT_STATUS_ERROR = "wait status error";
        a.BAD_STATE = "bad state";
        a.WS_ABORT = "ws abort";
        a.AP_REQUEST_TIMEOUT = "AP request timeout";
        a.AP_JSON_PARSE_ERROR = "AP json parse error";
        a.AP_REQUEST_ERROR = "AP request error";
        a.AP_REQUEST_ABORT = "AP request abort"
    }
    )(bk || (bk = {}));
    (function(a) {
        a[a.SetSdkProfile = 0] = "SetSdkProfile";
        a[a.SetSourceChannel = 1] = "SetSourceChannel";
        a[a.SetSourceUserId = 2] = "SetSourceUserId";
        a[a.SetDestChannel = 3] = "SetDestChannel";
        a[a.StartPacketTransfer = 4] = "StartPacketTransfer";
        a[a.StopPacketTransfer = 5] = "StopPacketTransfer";
        a[a.UpdateDestChannel = 6] = "UpdateDestChannel";
        a[a.Reconnect = 7] = "Reconnect";
        a[a.SetVideoProfile = 8] = "SetVideoProfile"
    }
    )(Fa || (Fa = {}));
    (function(a) {
        a.DISCONNECT = "disconnect";
        a.CONNECTION_STATE_CHANGE = "connection-state-change";
        a.NETWORK_QUALITY = "network-quality";
        a.STREAM_TYPE_CHANGE = "stream-type-change";
        a.IS_P2P_DISCONNECTED = "is-p2p-dis";
        a.DISCONNECT_P2P = "dis-p2p";
        a.REQUEST_NEW_GATEWAY_LIST = "req-gate-url";
        a.NEED_RENEW_SESSION = "need-sid"
    }
    )(xa || (xa = {}));
    (function(a) {
        a.NEED_RENEGOTIATE = "@need_renegotiate";
        a.NEED_REPLACE_TRACK = "@need_replace_track";
        a.NEED_CLOSE = "@need_close";
        a.NEED_ADD_TRACK = "@need_add_track";
        a.NEED_REMOVE_TRACK = "@need_remove_track";
        a.NEED_SESSION_ID = "@need_sid";
        a.SET_OPTIMIZATION_MODE = "@set_optimization_mode";
        a.GET_STATS = "@get_stats";
        a.GET_LOW_VIDEO_TRACK = "@get_low_video_track";
        a.NEED_RESET_REMOTE_SDP = "@need_reset_remote_sdp"
    }
    )(L || (L = {}));
    (function(a) {
        a.SCREEN_TRACK = "screen_track";
        a.LOW_STREAM = "low_stream"
    }
    )(rb || (rb = {}));
    (function(a) {
        a.SOURCE_STATE_CHANGE = "source-state-change";
        a.TRACK_ENDED = "track-ended";
        a.BEAUTY_EFFECT_OVERLOAD = "beauty-effect-overload"
    }
    )(fd || (fd = {}));
    (gd || (gd = {})).FIRST_FRAME_DECODED = "first-frame-decoded";
    let ck = "AFRICA ASIA CHINA EUROPE GLOBAL INDIA JAPAN NORTH_AMERICA OCEANIA OVERSEA SOUTH_AMERICA".split(" ");
    var ya;
    !function(a) {
        a.CHINA = "CN";
        a.ASIA = "AS";
        a.NORTH_AMERICA = "NA";
        a.EUROPE = "EU";
        a.JAPAN = "JP";
        a.INDIA = "IN";
        a.OCEANIA = "OC";
        a.SOUTH_AMERICA = "SA";
        a.AFRICA = "AF";
        a.OVERSEA = "OVERSEA";
        a.GLOBAL = "GLOBAL"
    }(ya || (ya = {}));
    let dk = {
        CHINA: {},
        ASIA: {
            CODE: ya.ASIA,
            WEBCS_DOMAIN: ["ap-web-1-asia.agora.io"],
            WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-asia.agora.io"],
            PROXY_CS: ["proxy-ap-web-asia.agora.io"],
            CDS_AP: ["cds-ap-web-asia.agora.io", "cds-ap-web-asia2.agora.io"],
            ACCOUNT_REGISTER: ["sua-ap-web-asia.agora.io", "sua-ap-web-asia2.agora.io"],
            UAP_AP: ["uap-ap-web-asia.agora.io", "uap-ap-web-asia2.agora.io"],
            EVENT_REPORT_DOMAIN: ["statscollector-1-asia.agora.io"],
            EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-asia.agora.io"],
            LOG_UPLOAD_SERVER: ["logservice-asia.agora.io"],
            PROXY_SERVER_TYPE3: ["southeast-asia.webrtc-cloud-proxy.sd-rtn.com"]
        },
        NORTH_AMERICA: {
            CODE: ya.NORTH_AMERICA,
            WEBCS_DOMAIN: ["ap-web-1-north-america.agora.io"],
            WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-north-america.agora.io"],
            PROXY_CS: ["proxy-ap-web-america.agora.io"],
            CDS_AP: ["cds-ap-web-america.agora.io", "cds-ap-web-america2.agora.io"],
            ACCOUNT_REGISTER: ["sua-ap-web-america.agora.io", "sua-ap-web-america2.agora.io"],
            UAP_AP: ["uap-ap-web-america.agora.io", "uap-ap-web-america2.agora.io"],
            EVENT_REPORT_DOMAIN: ["statscollector-1-north-america.agora.io"],
            EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-north-america.agora.io"],
            LOG_UPLOAD_SERVER: ["logservice-north-america.agora.io"],
            PROXY_SERVER_TYPE3: ["east-usa.webrtc-cloud-proxy.sd-rtn.com"]
        },
        EUROPE: {
            CODE: ya.EUROPE,
            WEBCS_DOMAIN: ["ap-web-1-europe.agora.io"],
            WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-europe.agora.io"],
            PROXY_CS: ["proxy-ap-web-europe.agora.io"],
            CDS_AP: ["cds-ap-web-europe.agora.io", "cds-ap-web-europe2.agora.io"],
            ACCOUNT_REGISTER: ["sua-ap-web-europe.agora.io", "sua-ap-web-europe.agora.io"],
            UAP_AP: ["uap-ap-web-europe.agora.io", "uap-ap-web-europe2.agora.io"],
            EVENT_REPORT_DOMAIN: ["statscollector-1-europe.agora.io"],
            EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-europe.agora.io"],
            LOG_UPLOAD_SERVER: ["logservice-europe.agora.io"],
            PROXY_SERVER_TYPE3: ["europe.webrtc-cloud-proxy.sd-rtn.com"]
        },
        JAPAN: {
            CODE: ya.JAPAN,
            WEBCS_DOMAIN: ["ap-web-1-japan.agora.io"],
            WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-japan.agora.io"],
            PROXY_CS: ["proxy-ap-web-japan.agora.io"],
            CDS_AP: ["cds-ap-web-japan.agora.io", "cds-ap-web-japan2.agora.io"],
            ACCOUNT_REGISTER: ["sua-ap-web-japan.agora.io", "sua-ap-web-japan2.agora.io"],
            UAP_AP: ["uap-ap-web-japan.agora.io", "\tuap-ap-web-japan2.agora.io"],
            EVENT_REPORT_DOMAIN: ["statscollector-1-japan.agora.io"],
            EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-japan.agora.io"],
            LOG_UPLOAD_SERVER: ["logservice-japan.agora.io"],
            PROXY_SERVER_TYPE3: ["japan.webrtc-cloud-proxy.sd-rtn.com"]
        },
        INDIA: {
            CODE: ya.INDIA,
            WEBCS_DOMAIN: ["ap-web-1-india.agora.io"],
            WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-india.agora.io"],
            PROXY_CS: ["proxy-ap-web-india.agora.io"],
            CDS_AP: ["cds-ap-web-india.agora.io", "cds-ap-web-india2.agora.io"],
            ACCOUNT_REGISTER: ["sua-ap-web-india.agora.io", "sua-ap-web-india2.agora.io"],
            UAP_AP: ["uap-ap-web-india.agora.io", "uap-ap-web-india2.agora.io"],
            EVENT_REPORT_DOMAIN: ["statscollector-1-india.agora.io"],
            EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-india.agora.io"],
            LOG_UPLOAD_SERVER: ["logservice-india.agora.io"],
            PROXY_SERVER_TYPE3: ["india.webrtc-cloud-proxy.sd-rtn.com"]
        },
        OVERSEA: {
            CODE: ya.OVERSEA,
            WEBCS_DOMAIN: ["ap-web-1-oversea.agora.io"],
            WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-oversea.agora.io"],
            PROXY_CS: ["proxy-ap-web-oversea.agora.io"],
            CDS_AP: ["cds-ap-web-oversea.agora.io"],
            ACCOUNT_REGISTER: ["sua-ap-web-oversea.agora.io"],
            UAP_AP: ["uap-ap-web-oversea.agora.io"],
            EVENT_REPORT_DOMAIN: ["statscollector-1-oversea.agora.io"],
            EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-oversea.agora.io"],
            LOG_UPLOAD_SERVER: ["logservice-oversea.agora.io"],
            PROXY_SERVER_TYPE3: ["webrtc-cloud-proxy.agora.io"]
        },
        GLOBAL: {
            CODE: ya.GLOBAL,
            WEBCS_DOMAIN: ["webrtc2-ap-web-1.agora.io"],
            WEBCS_DOMAIN_BACKUP_LIST: ["webrtc2-ap-web-3.agora.io"],
            PROXY_CS: ["ap-proxy-1.agora.io", "ap-proxy-2.agora.io"],
            CDS_AP: ["cds-ap-web-1.agora.io", "cds-ap-web-3.agora.io"],
            ACCOUNT_REGISTER: ["sua-ap-web-1.agora.io", "sua-ap-web-3.agora.io"],
            UAP_AP: ["uap-ap-web-1.agora.io", "uap-ap-web-3.agora.io"],
            EVENT_REPORT_DOMAIN: ["statscollector-1.agora.io"],
            EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2.agora.io"],
            LOG_UPLOAD_SERVER: ["logservice.agora.io"],
            PROXY_SERVER_TYPE3: ["webrtc-cloud-proxy.sd-rtn.com"]
        },
        OCEANIA: {
            CODE: ya.OCEANIA,
            WEBCS_DOMAIN: ["ap-web-1-oceania.agora.io"],
            WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-oceania.agora.io"],
            PROXY_CS: ["proxy-ap-web-oceania.agora.io"],
            CDS_AP: ["cds-ap-web-oceania.agora.io", "cds-ap-web-oceania2.agora.io"],
            ACCOUNT_REGISTER: ["sua-ap-web-oceania.agora.io", "sua-ap-web-oceania2.agora.io"],
            UAP_AP: ["uap-ap-web-oceania.agora.io", "uap-ap-web-oceania2.agora.io"],
            EVENT_REPORT_DOMAIN: ["statscollector-1-oceania.agora.io"],
            EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-oceania.agora.io"],
            LOG_UPLOAD_SERVER: ["logservice-oceania.agora.io"],
            PROXY_SERVER_TYPE3: ["oceania.webrtc-cloud-proxy.sd-rtn.com"]
        },
        SOUTH_AMERICA: {
            CODE: ya.SOUTH_AMERICA,
            WEBCS_DOMAIN: ["ap-web-1-south-america.agora.io"],
            WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-south-america.agora.io"],
            PROXY_CS: ["proxy-ap-web-south-america.agora.io"],
            CDS_AP: ["cds-ap-web-south-america.agora.io", "cds-ap-web-south-america2.agora.io"],
            ACCOUNT_REGISTER: ["sua-ap-web-south-america.agora.io", "sua-ap-web-south-america2.agora.io"],
            UAP_AP: ["uap-ap-web-south-america.agora.io", "uap-ap-web-south-america2.agora.io"],
            EVENT_REPORT_DOMAIN: ["statscollector-1-south-america.agora.io"],
            EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-south-america.agora.io"],
            LOG_UPLOAD_SERVER: ["logservice-south-america.agora.io"],
            PROXY_SERVER_TYPE3: ["south-america.webrtc-cloud-proxy.sd-rtn.com"]
        },
        AFRICA: {
            CODE: ya.AFRICA,
            WEBCS_DOMAIN: ["ap-web-1-africa.agora.io"],
            WEBCS_DOMAIN_BACKUP_LIST: ["ap-web-2-africa.agora.io"],
            PROXY_CS: ["proxy-ap-web-africa.agora.io"],
            CDS_AP: ["cds-ap-web-africa.agora.io", "cds-ap-web-africa2.agora.io"],
            ACCOUNT_REGISTER: ["sua-ap-web-africa.agora.io", "sua-ap-web-africa2.agora.io"],
            UAP_AP: ["uap-ap-web-africa.agora.io", "uap-ap-web-africa2.agora.io"],
            EVENT_REPORT_DOMAIN: ["statscollector-1-africa.agora.io"],
            EVENT_REPORT_BACKUP_DOMAIN: ["statscollector-2-africa.agora.io"],
            LOG_UPLOAD_SERVER: ["logservice-south-africa.agora.io"],
            PROXY_SERVER_TYPE3: ["africa.webrtc-cloud-proxy.sd-rtn.com"]
        }
    };
    var hd;
    Hf && (dk.CHINA = {
        CODE: ya.CHINA,
        WEBCS_DOMAIN: ["webrtc2-2.ap.sd-rtn.com"],
        WEBCS_DOMAIN_BACKUP_LIST: ["webrtc2-4.ap.sd-rtn.com"],
        PROXY_CS: ["proxy-web.ap.sd-rtn.com"],
        CDS_AP: ["cds-web-2.ap.sd-rtn.com", "cds-web-4.ap.sd-rtn.com"],
        ACCOUNT_REGISTER: ["sua-web-2.ap.sd-rtn.com", "sua-web-4.ap.sd-rtn.com"],
        UAP_AP: ["uap-web-2.ap.sd-rtn.com", "uap-web-4.ap.sd-rtn.com"],
        EVENT_REPORT_DOMAIN: ["web-3.statscollector.sd-rtn.com"],
        EVENT_REPORT_BACKUP_DOMAIN: ["web-4.statscollector.sd-rtn.com"],
        LOG_UPLOAD_SERVER: ["logservice-china.agora.io"],
        PROXY_SERVER_TYPE3: ["east-cn.webrtc-cloud-proxy.sd-rtn.com"]
    });
    (hd || (hd = {})).UPDATE_BITRATE_LIMIT = "update_bitrate_limit";
    let ca = {
        getDisplayMedia: !1,
        getStreamFromExtension: !1,
        supportUnifiedPlan: !1,
        supportMinBitrate: !1,
        supportSetRtpSenderParameters: !1,
        supportDualStream: !0,
        webAudioMediaStreamDest: !1,
        supportReplaceTrack: !1,
        supportWebGL: !1,
        webAudioWithAEC: !1,
        supportRequestFrame: !1,
        supportShareAudio: !1,
        supportDualStreamEncoding: !1
    };
    O({
        target: "Object",
        stat: !0,
        forced: !ka,
        sham: !ka
    }, {
        defineProperties: ti
    });
    var Oa = ub(function(a) {
        var b = ha.Object;
        a = a.exports = function(a, e) {
            return b.defineProperties(a, e)
        }
        ;
        b.defineProperties.sham && (a.sham = !0)
    })
      , Sn = Vd.concat("length", "prototype")
      , Of = {
        f: Object.getOwnPropertyNames || function(a) {
            return si(a, Sn)
        }
    }
      , Tn = Hb("Reflect", "ownKeys") || function(a) {
        var b = Of.f(Ua(a))
          , c = Xc.f;
        return c ? b.concat(c(a)) : b
    }
    ;
    O({
        target: "Object",
        stat: !0,
        sham: !ka
    }, {
        getOwnPropertyDescriptors: function(a) {
            var b, c;
            a = fb(a);
            for (var e = vc, g = Tn(a), h = {}, m = 0; g.length > m; )
                void 0 !== (c = e(a, b = g[m++])) && cc(h, b, c);
            return h
        }
    });
    var fa = ha.Object.getOwnPropertyDescriptors
      , ek = Of.f
      , Un = {}.toString
      , fk = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : []
      , gk = function(a) {
        if (fk && "[object Window]" == Un.call(a))
            try {
                var b = ek(a)
            } catch (c) {
                b = fk.slice()
            }
        else
            b = ek(fb(a));
        return b
    }
      , hk = {
        f: wa
    }
      , Vn = gb.f
      , Xa = Sd("hidden")
      , ik = wa("toPrimitive")
      , Wn = ab.set
      , jk = ab.getterFor("Symbol")
      , sb = Object.prototype
      , bb = N.Symbol
      , id = Hb("JSON", "stringify")
      , kk = vc
      , Sb = gb.f
      , lk = gk
      , Xn = Kd
      , Lb = Ib("symbols")
      , jd = Ib("op-symbols")
      , Pf = Ib("string-to-symbol-registry")
      , Qf = Ib("symbol-to-string-registry")
      , Yn = Ib("wks")
      , Rf = N.QObject
      , Sf = !Rf || !Rf.prototype || !Rf.prototype.findChild
      , Tf = ka && sa(function() {
        return 7 != bc(Sb({}, "a", {
            get: function() {
                return Sb(this, "a", {
                    value: 7
                }).a
            }
        })).a
    }) ? function(a, b, c) {
        var e = kk(sb, b);
        e && delete sb[b];
        Sb(a, b, c);
        e && a !== sb && Sb(sb, b, e)
    }
    : Sb
      , mk = function(a, b) {
        var c = Lb[a] = bc(bb.prototype);
        return Wn(c, {
            type: "Symbol",
            tag: a,
            description: b
        }),
        ka || (c.description = b),
        c
    }
      , Uf = Bb && "symbol" == typeof bb.iterator ? function(a) {
        return "symbol" == typeof a
    }
    : function(a) {
        return Object(a)instanceof bb
    }
      , le = function(a, b, c) {
        a === sb && le(jd, b, c);
        Ua(a);
        b = tc(b, !0);
        return Ua(c),
        T(Lb, b) ? (c.enumerable ? (T(a, Xa) && a[Xa][b] && (a[Xa][b] = !1),
        c = bc(c, {
            enumerable: Xb(0, !1)
        })) : (T(a, Xa) || Sb(a, Xa, Xb(1, {})),
        a[Xa][b] = !0),
        Tf(a, b, c)) : Sb(a, b, c)
    }
      , ok = function(a, b) {
        Ua(a);
        var c = fb(b);
        b = Rb(c).concat(Vf(c));
        return yc(b, function(b) {
            ka && !nk.call(c, b) || le(a, b, c[b])
        }),
        a
    }
      , nk = function(a) {
        a = tc(a, !0);
        var b = Xn.call(this, a);
        return !(this === sb && T(Lb, a) && !T(jd, a)) && (!(b || !T(this, a) || !T(Lb, a) || T(this, Xa) && this[Xa][a]) || b)
    }
      , pk = function(a, b) {
        a = fb(a);
        b = tc(b, !0);
        if (a !== sb || !T(Lb, b) || T(jd, b)) {
            var c = kk(a, b);
            return !c || !T(Lb, b) || T(a, Xa) && a[Xa][b] || (c.enumerable = !0),
            c
        }
    }
      , qk = function(a) {
        a = lk(fb(a));
        var b = [];
        return yc(a, function(a) {
            T(Lb, a) || T(xc, a) || b.push(a)
        }),
        b
    }
      , Vf = function(a) {
        var b = a === sb;
        a = lk(b ? jd : fb(a));
        var c = [];
        return yc(a, function(a) {
            !T(Lb, a) || b && !T(sb, a) || c.push(Lb[a])
        }),
        c
    };
    if (Bb || (ef((bb = function() {
        if (this instanceof bb)
            throw TypeError("Symbol is not a constructor");
        var a = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0
          , b = Od(a)
          , c = function(a) {
            this === sb && c.call(jd, a);
            T(this, Xa) && T(this[Xa], b) && (this[Xa][b] = !1);
            Tf(this, b, Xb(1, a))
        };
        return ka && Sf && Tf(sb, b, {
            configurable: !0,
            set: c
        }),
        mk(b, a)
    }
    ).prototype, "toString", function() {
        return jk(this).tag
    }),
    Kd = nk,
    gb.f = le,
    vc = pk,
    Of.f = gk = qk,
    Xc.f = Vf,
    ka && Sb(bb.prototype, "description", {
        configurable: !0,
        get: function() {
            return jk(this).description
        }
    })),
    ii || (hk.f = function(a) {
        return mk(wa(a), a)
    }
    ),
    O({
        global: !0,
        wrap: !0,
        forced: !Bb,
        sham: !Bb
    }, {
        Symbol: bb
    }),
    yc(Rb(Yn), function(a) {
        var b = ha.Symbol || (ha.Symbol = {});
        T(b, a) || Vn(b, a, {
            value: hk.f(a)
        });
        !0
    }),
    O({
        target: "Symbol",
        stat: !0,
        forced: !Bb
    }, {
        for: function(a) {
            a = String(a);
            if (T(Pf, a))
                return Pf[a];
            var b = bb(a);
            return Pf[a] = b,
            Qf[b] = a,
            b
        },
        keyFor: function(a) {
            if (!Uf(a))
                throw TypeError(a + " is not a symbol");
            if (T(Qf, a))
                return Qf[a]
        },
        useSetter: function() {
            Sf = !0
        },
        useSimple: function() {
            Sf = !1
        }
    }),
    O({
        target: "Object",
        stat: !0,
        forced: !Bb,
        sham: !ka
    }, {
        create: function(a, b) {
            return void 0 === b ? bc(a) : ok(bc(a), b)
        },
        defineProperty: le,
        defineProperties: ok,
        getOwnPropertyDescriptor: pk
    }),
    O({
        target: "Object",
        stat: !0,
        forced: !Bb
    }, {
        getOwnPropertyNames: qk,
        getOwnPropertySymbols: Vf
    }),
    O({
        target: "Object",
        stat: !0,
        forced: sa(function() {
            Xc.f(1)
        })
    }, {
        getOwnPropertySymbols: function(a) {
            return Xc.f(ob(a))
        }
    }),
    id) {
        var Zn = !Bb || sa(function() {
            var a = bb();
            return "[null]" != id([a]) || "{}" != id({
                a
            }) || "{}" != id(Object(a))
        });
        O({
            target: "JSON",
            stat: !0,
            forced: Zn
        }, {
            stringify: function(a, b, c) {
                for (var e, g = [a], h = 1; arguments.length > h; )
                    g.push(arguments[h++]);
                if (e = b,
                (Ba(b) || void 0 !== a) && !Uf(a))
                    return $b(b) || (b = function(a, b) {
                        if ("function" == typeof e && (b = e.call(this, a, b)),
                        !Uf(b))
                            return b
                    }
                    ),
                    g[1] = b,
                    id.apply(null, g)
            }
        })
    }
    bb.prototype[ik] || mb(bb.prototype, ik, bb.prototype.valueOf);
    Uc(bb, "Symbol");
    xc[Xa] = !0;
    var ea = ha.Object.getOwnPropertySymbols
      , Na = function(a, b, c) {
        return b in a ? Oi(a, b, {
            value: c,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : a[b] = c,
        a
    }
      , $n = za("Array").values
      , rk = Array.prototype
      , ao = {
        DOMTokenList: !0,
        NodeList: !0
    }
      , fc = function(a) {
        var b = a.values;
        return a === rk || a instanceof Array && b === rk.values || ao.hasOwnProperty(Rd(a)) ? $n : b
    }
      , bo = !bj(function(a) {
        Array.from(a)
    });
    O({
        target: "Array",
        stat: !0,
        forced: bo
    }, {
        from: function(a) {
            var b = ob(a);
            var c = "function" == typeof this ? this : Array;
            var e = arguments.length;
            var g = 1 < e ? arguments[1] : void 0
              , h = void 0 !== g
              , m = 0;
            var k = li(b);
            if (h && (g = Zb(g, 2 < e ? arguments[2] : void 0, 2)),
            null == k || c == Array && ji(k))
                for (c = new c(e = nb(b.length)); e > m; m++)
                    cc(c, m, h ? g(b[m], m) : b[m]);
            else
                for (e = (b = k.call(b)).next,
                c = new c; !(k = e.call(b)).done; m++)
                    cc(c, m, h ? mi(b, g, [k.value, m], !0) : k.value);
            return c.length = m,
            c
        }
    });
    var Gb = ha.Array.from;
    O({
        target: "Date",
        stat: !0
    }, {
        now: function() {
            return (new Date).getTime()
        }
    });
    var x = ha.Date.now;
    class Sa {
        constructor() {
            this._events = {};
            this.addListener = this.on
        }
        getListeners(a) {
            var b;
            return this._events[a] ? z(b = this._events[a]).call(b, a=>a.listener) : []
        }
        on(a, b) {
            this._events[a] || (this._events[a] = []);
            a = this._events[a];
            -1 === this._indexOfListener(a, b) && a.push({
                listener: b,
                once: !1
            })
        }
        once(a, b) {
            this._events[a] || (this._events[a] = []);
            a = this._events[a];
            -1 === this._indexOfListener(a, b) && a.push({
                listener: b,
                once: !0
            })
        }
        off(a, b) {
            if (this._events[a]) {
                var c = this._events[a];
                b = this._indexOfListener(c, b);
                -1 !== b && Ia(c).call(c, b, 1);
                0 === this._events[a].length && delete this._events[a]
            }
        }
        removeAllListeners(a) {
            a ? delete this._events[a] : this._events = {}
        }
        emit(a, ...b) {
            var c;
            this._events[a] || (this._events[a] = []);
            let e = z(c = this._events[a]).call(c, a=>a);
            for (c = 0; c < e.length; c += 1) {
                let g = e[c];
                g.once && this.off(a, g.listener);
                g.listener.apply(this, b || [])
            }
        }
        _indexOfListener(a, b) {
            let c = a.length;
            for (; c--; )
                if (a[c].listener === b)
                    return c;
            return -1
        }
    }
    class co extends Sa {
        constructor() {
            super(...arguments);
            this.resultStorage = new aa
        }
        setLocalAudioStats(a, b, c) {
            this.record("AUDIO_INPUT_LEVEL_TOO_LOW", a, this.checkAudioInputLevel(c));
            this.record("SEND_AUDIO_BITRATE_TOO_LOW", a, this.checkSendAudioBitrate(c))
        }
        setLocalVideoStats(a, b, c) {
            this.record("SEND_VIDEO_BITRATE_TOO_LOW", a, this.checkSendVideoBitrate(c));
            this.record("FRAMERATE_INPUT_TOO_LOW", a, this.checkFramerateInput(c, b));
            this.record("FRAMERATE_SENT_TOO_LOW", a, this.checkFramerateSent(c))
        }
        setRemoteAudioStats(a, b) {
            a = a.getUserId();
            this.record("AUDIO_OUTPUT_LEVEL_TOO_LOW", a, this.checkAudioOutputLevel(b))
        }
        setRemoteVideoStats(a, b) {
            a = a.getUserId();
            this.record("RECV_VIDEO_DECODE_FAILED", a, this.checkVideoDecode(b))
        }
        record(a, b, c) {
            this.resultStorage.has(a) || this.resultStorage.set(a, {
                result: [],
                isPrevNormal: !0
            });
            let e = this.resultStorage.get(a);
            if (e && (e.result.push(c),
            5 <= e.result.length)) {
                var g;
                c = oa(g = e.result).call(g, !0);
                e.isPrevNormal && !c && this.emit("exception", sk[a], a, b);
                !e.isPrevNormal && c && this.emit("exception", sk[a] + 2E3, a + "_RECOVER", b);
                e.isPrevNormal = c;
                e.result = []
            }
        }
        checkAudioOutputLevel(a) {
            return !(0 < a.receiveBitrate && 0 === a.receiveLevel)
        }
        checkAudioInputLevel(a) {
            return 0 !== a.sendVolumeLevel
        }
        checkFramerateInput(a, b) {
            let c = null;
            b._encoderConfig && b._encoderConfig.frameRate && (c = Pb(b._encoderConfig.frameRate));
            a = a.captureFrameRate;
            return !c || !a || !(10 < c && 5 > a || 10 > c && 5 <= c && 1 >= a)
        }
        checkFramerateSent(a) {
            return !(a.captureFrameRate && a.sendFrameRate && 5 < a.captureFrameRate && 1 >= a.sendFrameRate)
        }
        checkSendVideoBitrate(a) {
            return 0 !== a.sendBitrate
        }
        checkSendAudioBitrate(a) {
            return 0 !== a.sendBitrate
        }
        checkVideoDecode(a) {
            return 0 === a.receiveBitrate || 0 !== a.decodeFrameRate
        }
    }
    let sk = {
        FRAMERATE_INPUT_TOO_LOW: 1001,
        FRAMERATE_SENT_TOO_LOW: 1002,
        SEND_VIDEO_BITRATE_TOO_LOW: 1003,
        RECV_VIDEO_DECODE_FAILED: 1005,
        AUDIO_INPUT_LEVEL_TOO_LOW: 2001,
        AUDIO_OUTPUT_LEVEL_TOO_LOW: 2002,
        SEND_AUDIO_BITRATE_TOO_LOW: 2003
    };
    class kd {
        constructor(a) {
            this.localConnectionsMap = new aa;
            this.remoteConnectionsMap = new aa;
            this.trafficStatsPeerList = [];
            this.updateStats = ()=>{
                var a, c;
                q(a = this.remoteConnectionsMap).call(a, a=>{
                    var b;
                    let c = a.audioStats;
                    var e = a.videoStats
                      , k = a.pcStats;
                    let t = vb({}, Lf)
                      , l = vb({}, Mf)
                      , n = vb({}, ak)
                      , p = a.connection.pc.getStats()
                      , q = p.audioRecv[0]
                      , A = p.videoRecv[0];
                    k = k ? k.videoRecv[0] : void 0;
                    let u = !0 === a.connection.pc._statsFilter.videoIsReady
                      , v = this.trafficStats && R(b = this.trafficStats.peer_delay).call(b, b=>b.peer_uid === a.connection.getUserId());
                    q && ("opus" !== q.codec && "aac" !== q.codec || (t.codecType = q.codec),
                    q.outputLevel ? t.receiveLevel = Math.round(32767 * q.outputLevel) : a.connection.user.audioTrack && (t.receiveLevel = Math.round(32767 * a.connection.user.audioTrack.getVolumeLevel())),
                    t.receiveBytes = q.bytes,
                    t.receivePackets = q.packets,
                    t.receivePacketsLost = q.packetsLost,
                    t.packetLossRate = t.receivePacketsLost / (t.receivePackets + t.receivePacketsLost),
                    t.receiveBitrate = c ? 8 * Math.max(0, t.receiveBytes - c.receiveBytes) : 0,
                    t.totalDuration = c ? c.totalDuration + 1 : 1,
                    t.totalFreezeTime = c ? c.totalFreezeTime : 0,
                    t.freezeRate = t.totalFreezeTime / t.totalDuration,
                    t.receiveDelay = q.jitterBufferMs,
                    b = a.connection.user.audioTrack,
                    10 < t.totalDuration && kd.isRemoteAudioFreeze(b) && (t.totalFreezeTime += 1));
                    A && ("H264" !== A.codec && "VP8" !== A.codec && "VP9" !== A.codec && "AV1X" !== A.codec || (l.codecType = A.codec),
                    l.receiveBytes = A.bytes,
                    l.receiveBitrate = e ? 8 * Math.max(0, l.receiveBytes - e.receiveBytes) : 0,
                    l.decodeFrameRate = A.decodeFrameRate,
                    l.renderFrameRate = A.decodeFrameRate,
                    A.outputFrame && (l.renderFrameRate = A.outputFrame.frameRate),
                    A.receivedFrame ? (l.receiveFrameRate = A.receivedFrame.frameRate,
                    l.receiveResolutionHeight = A.receivedFrame.height,
                    l.receiveResolutionWidth = A.receivedFrame.width) : a.connection.user.videoTrack && (l.receiveResolutionHeight = a.connection.user.videoTrack._videoHeight || 0,
                    l.receiveResolutionWidth = a.connection.user.videoTrack._videoWidth || 0),
                    void 0 !== A.framesRateFirefox && (l.receiveFrameRate = Math.round(A.framesRateFirefox)),
                    l.receivePackets = A.packets,
                    l.receivePacketsLost = A.packetsLost,
                    l.packetLossRate = l.receivePacketsLost / (l.receivePackets + l.receivePacketsLost),
                    l.totalDuration = e ? e.totalDuration + 1 : 1,
                    l.totalFreezeTime = e ? e.totalFreezeTime : 0,
                    l.receiveDelay = A.jitterBufferMs || 0,
                    e = a.connection.user.videoTrack,
                    a.connection.subscribeOptions.video && u && kd.isRemoteVideoFreeze(e, A, k) && (l.totalFreezeTime += 1),
                    l.freezeRate = l.totalFreezeTime / l.totalDuration);
                    v && (t.end2EndDelay = v.B_ad,
                    l.end2EndDelay = v.B_vd,
                    t.transportDelay = v.B_ed,
                    l.transportDelay = v.B_ed,
                    n.uplinkNetworkQuality = v.B_punq ? v.B_punq : 0,
                    n.downlinkNetworkQuality = v.B_pdnq ? v.B_punq : 0);
                    a.audioStats = t;
                    a.videoStats = l;
                    a.pcStats = p;
                    a.networkStats = n;
                    a.connection.user.audioTrack && this.exceptionMonitor.setRemoteAudioStats(a.connection.user.audioTrack, t);
                    a.connection.user.videoTrack && this.exceptionMonitor.setRemoteVideoStats(a.connection.user.videoTrack, l)
                }
                );
                q(c = this.localConnectionsMap).call(c, a=>{
                    let b = a.audioStats
                      , c = a.videoStats
                      , e = vb({}, je)
                      , k = vb({}, ke);
                    var t = a.connection.pc.getStats();
                    let l = t.audioSend[0];
                    t = t.videoSend[0];
                    let n = a.connection.getUserId();
                    l && ("opus" !== l.codec && "aac" !== l.codec || (e.codecType = l.codec),
                    l.inputLevel ? e.sendVolumeLevel = Math.round(32767 * l.inputLevel) : a.connection.audioTrack && (e.sendVolumeLevel = Math.round(32767 * a.connection.audioTrack.getVolumeLevel())),
                    e.sendBytes = l.bytes,
                    e.sendPackets = l.packets,
                    e.sendPacketsLost = l.packetsLost,
                    e.sendBitrate = b ? 8 * Math.max(0, e.sendBytes - b.sendBytes) : 0);
                    t && ("H264" !== t.codec && "VP8" !== t.codec && "VP9" !== t.codec && "AV1X" !== t.codec || (k.codecType = t.codec),
                    k.sendBytes = t.bytes,
                    k.sendBitrate = c ? 8 * Math.max(0, k.sendBytes - c.sendBytes) : 0,
                    t.inputFrame ? (k.captureFrameRate = t.inputFrame.frameRate,
                    k.captureResolutionHeight = t.inputFrame.height,
                    k.captureResolutionWidth = t.inputFrame.width) : a.connection.videoTrack && (k.captureResolutionWidth = a.connection.videoTrack._videoWidth || 0,
                    k.captureResolutionHeight = a.connection.videoTrack._videoHeight || 0),
                    t.sentFrame ? (k.sendFrameRate = t.sentFrame.frameRate,
                    k.sendResolutionHeight = t.sentFrame.height,
                    k.sendResolutionWidth = t.sentFrame.width) : a.connection.videoTrack && (k.sendResolutionWidth = a.connection.videoTrack._videoWidth || 0,
                    k.sendResolutionHeight = a.connection.videoTrack._videoHeight || 0),
                    t.avgEncodeMs && (k.encodeDelay = t.avgEncodeMs),
                    a.connection.videoTrack && a.connection.videoTrack._encoderConfig && a.connection.videoTrack._encoderConfig.bitrateMax && (k.targetSendBitrate = 1E3 * a.connection.videoTrack._encoderConfig.bitrateMax),
                    k.sendPackets = t.packets,
                    k.sendPacketsLost = t.packetsLost,
                    k.totalDuration = c ? c.totalDuration + 1 : 1,
                    k.totalFreezeTime = c ? c.totalFreezeTime : 0,
                    this.isLocalVideoFreeze(t) && (k.totalFreezeTime += 1));
                    a.audioStats = e;
                    a.videoStats = k;
                    a.audioStats && a.connection.audioTrack && this.exceptionMonitor.setLocalAudioStats(n, a.connection.audioTrack, a.audioStats);
                    a.videoStats && a.connection.videoTrack && this.exceptionMonitor.setLocalVideoStats(n, a.connection.videoTrack, a.videoStats)
                }
                )
            }
            ;
            this.clientId = a;
            this.updateStatsInterval = window.setInterval(this.updateStats, 1E3);
            this.exceptionMonitor = new co;
            this.exceptionMonitor.on("exception", (a,c,e)=>{
                this.onStatsException && this.onStatsException(a, c, e)
            }
            )
        }
        reset() {
            this.localConnectionsMap = new aa;
            this.remoteConnectionsMap = new aa;
            this.trafficStats = void 0;
            this.trafficStatsPeerList = [];
            this.uplinkStats = void 0
        }
        getLocalAudioTrackStats(a) {
            return (a = this.localConnectionsMap.get(a)) && a.audioStats ? a.audioStats : vb({}, je)
        }
        getLocalVideoTrackStats(a) {
            return (a = this.localConnectionsMap.get(a)) && a.videoStats ? a.videoStats : vb({}, ke)
        }
        getRemoteAudioTrackStats(a) {
            var b;
            let c = this.remoteConnectionsMap.get(a);
            if (!c || !c.audioStats)
                return vb({}, Lf);
            if (!this.trafficStats)
                return c.audioStats;
            a = R(b = this.trafficStats.peer_delay).call(b, a=>a.peer_uid === c.connection.user.uid);
            return a && (c.audioStats.publishDuration = a.B_ppad + (x() - this.trafficStats.timestamp)),
            c.audioStats
        }
        getRemoteNetworkQualityStats(a) {
            return (a = this.remoteConnectionsMap.get(a)) && a.networkStats ? a.networkStats : vb({}, ak)
        }
        getRemoteVideoTrackStats(a) {
            var b;
            let c = this.remoteConnectionsMap.get(a);
            if (!c || !c.videoStats)
                return vb({}, Mf);
            if (!this.trafficStats)
                return c.videoStats;
            a = R(b = this.trafficStats.peer_delay).call(b, a=>a.peer_uid === c.connection.user.uid);
            return a && (c.videoStats.publishDuration = a.B_ppvd + (x() - this.trafficStats.timestamp)),
            c.videoStats
        }
        getRTCStats() {
            var a, b;
            let c = 0
              , e = 0
              , g = 0
              , h = 0;
            q(a = this.localConnectionsMap).call(a, a=>{
                a.audioStats && (c += a.audioStats.sendBytes,
                e += a.audioStats.sendBitrate);
                a.videoStats && (c += a.videoStats.sendBytes,
                e += a.videoStats.sendBitrate)
            }
            );
            q(b = this.remoteConnectionsMap).call(b, a=>{
                a.audioStats && (g += a.audioStats.receiveBytes,
                h += a.audioStats.receiveBitrate);
                a.videoStats && (g += a.videoStats.receiveBytes,
                h += a.videoStats.receiveBitrate)
            }
            );
            a = 1;
            return this.trafficStats && (a += this.trafficStats.peer_delay.length),
            {
                Duration: 0,
                UserCount: a,
                SendBitrate: e,
                SendBytes: c,
                RecvBytes: g,
                RecvBitrate: h,
                OutgoingAvailableBandwidth: this.uplinkStats ? this.uplinkStats.B_uab / 1E3 : 0,
                RTT: this.trafficStats ? 2 * this.trafficStats.B_acd : 0
            }
        }
        removeConnection(a) {
            this.localConnectionsMap.delete(a);
            this.remoteConnectionsMap.delete(a)
        }
        addLocalConnection(a) {
            let b = a.connectionId;
            this.localConnectionsMap.has(b) || this.localConnectionsMap.set(b, {
                connection: a
            })
        }
        addRemoteConnection(a) {
            let b = a.connectionId;
            this.remoteConnectionsMap.has(b) || this.remoteConnectionsMap.set(b, {
                connection: a
            })
        }
        updateTrafficStats(a) {
            var b;
            let c = M(b = a.peer_delay).call(b, a=>{
                var b;
                return -1 === I(b = this.trafficStatsPeerList).call(b, a.peer_uid)
            }
            );
            q(c).call(c, a=>{
                var b, c;
                let e = R(b = Gb(fc(c = this.remoteConnectionsMap).call(c))).call(b, b=>b.connection._userId === a.peer_uid);
                void 0 !== a.B_ppad && void 0 !== a.B_ppvd && (this.onUploadPublishDuration && this.onUploadPublishDuration(a.peer_uid, a.B_ppad, a.B_ppvd, e ? x() - e.connection.startTime : 0),
                this.trafficStatsPeerList.push(a.peer_uid))
            }
            );
            this.trafficStats = a
        }
        updateUplinkStats(a) {
            var b;
            this.uplinkStats && this.uplinkStats.B_fir !== a.B_fir && k.debug(l(b = "[".concat(this.clientId, "]: Period fir changes to ")).call(b, a.B_fir));
            this.uplinkStats = a
        }
        static isRemoteVideoFreeze(a, b, c) {
            if (!a)
                return !1;
            a = !c || b.framesDecodeCount > c.framesDecodeCount;
            return !!c && b.framesDecodeFreezeTime > c.framesDecodeFreezeTime || !a
        }
        static isRemoteAudioFreeze(a) {
            return !!a && a._isFreeze()
        }
        isLocalVideoFreeze(a) {
            return !(!a.inputFrame || !a.sentFrame) && 5 < a.inputFrame.frameRate && 3 > a.sentFrame.frameRate
        }
    }
    var tk;
    let Wf = ()=>{}
      , lh = {}
      , uk = new class {
        constructor() {
            this.fnMap = new aa
        }
        throttleByKey(a, b, c, e, ...g) {
            if (this.fnMap.has(b)) {
                var h = this.fnMap.get(b);
                h.threshold !== c ? (h.fn(...h.args),
                clearTimeout(h.timer),
                h = window.setTimeout(()=>{
                    const a = this.fnMap.get(b);
                    a && a.fn(...a.args);
                    this.fnMap.delete(b)
                }
                , c),
                this.fnMap.set(b, {
                    fn: a,
                    threshold: c,
                    timer: h,
                    args: g,
                    skipFn: e
                })) : (h.skipFn && h.skipFn(...h.args),
                this.fnMap.set(b, Ce({}, h, {
                    fn: a,
                    args: g,
                    skipFn: e
                })))
            } else
                h = window.setTimeout(()=>{
                    const a = this.fnMap.get(b);
                    a && a.fn(...a.args);
                    this.fnMap.delete(b)
                }
                , c),
                this.fnMap.set(b, {
                    fn: a,
                    threshold: c,
                    timer: h,
                    args: g,
                    skipFn: e
                })
        }
    }
      , vk = ra(tk = uk.throttleByKey).call(tk, uk)
      , Ed = null
      , eo = 1;
    class Mb {
        constructor(a) {
            var b;
            this.lockingPromise = B.resolve();
            this.locks = 0;
            this.name = "";
            this.lockId = eo++;
            a && (this.name = a);
            k.debug(l(b = "[lock-".concat(this.name, "-")).call(b, this.lockId, "] is created."))
        }
        get isLocked() {
            return 0 < this.locks
        }
        lock() {
            var a, b;
            let c;
            this.locks += 1;
            k.debug(l(a = l(b = "[lock-".concat(this.name, "-")).call(b, this.lockId, "] is locked, current queue ")).call(a, this.locks, "."));
            let e = new B(a=>{
                c = ()=>{
                    var b, c;
                    --this.locks;
                    k.debug(l(b = l(c = "[lock-".concat(this.name, "-")).call(c, this.lockId, "] is not locked, current queue ")).call(b, this.locks, "."));
                    a()
                }
            }
            );
            a = this.lockingPromise.then(()=>c);
            return this.lockingPromise = this.lockingPromise.then(()=>e),
            a
        }
    }
    let De = new Mb("safari")
      , qh = !1
      , rh = !1
      , cb = new class extends Sa {
        constructor() {
            super();
            this._state = ec.IDLE;
            this.lastAccessCameraPermission = this.lastAccessMicrophonePermission = this.isAccessCameraPermission = this.isAccessMicrophonePermission = !1;
            this.deviceInfoMap = new aa;
            this.init().then(()=>{
                var a, b;
                navigator.mediaDevices && navigator.mediaDevices.addEventListener && navigator.mediaDevices.addEventListener("devicechange", ra(b = this.updateDevicesInfo).call(b, this));
                window.setInterval(ra(a = this.updateDevicesInfo).call(a, this), 2500)
            }
            ).catch(a=>k.error(a.toString()))
        }
        get state() {
            return this._state
        }
        set state(a) {
            a !== this._state && (this.emit(Kb.STATE_CHANGE, a),
            this._state = a)
        }
        async enumerateDevices(a, b, c=!1) {
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices)
                return (new p(n.NOT_SUPPORTED,"enumerateDevices() not supported.")).throw();
            var e = await navigator.mediaDevices.enumerateDevices();
            e = this.checkMediaDeviceInfoIsOk(e);
            let g = !this.isAccessMicrophonePermission && a
              , h = !this.isAccessCameraPermission && b;
            e.audio && (g = !1);
            e.video && (h = !1);
            let m = e = null
              , r = null;
            if (!c && (g || h)) {
                De.isLocked && (k.debug("[device manager] wait GUM lock"),
                (await De.lock())(),
                k.debug("[device manager] GUM unlock"));
                if (qh && (g = !1,
                this.isAccessMicrophonePermission = !0),
                rh && (h = !1,
                this.isAccessCameraPermission = !0),
                k.debug("[device manager] check media device permissions", a, b, g, h),
                g && h) {
                    try {
                        r = await navigator.mediaDevices.getUserMedia({
                            audio: !0,
                            video: !0
                        })
                    } catch (ja) {
                        c = Fd(ja.name || ja.code || ja, ja.message);
                        if (c.code === n.PERMISSION_DENIED)
                            throw c;
                        k.warning("getUserMedia failed in getDevices", c)
                    }
                    this.isAccessMicrophonePermission = this.isAccessCameraPermission = !0
                } else if (g) {
                    try {
                        e = await navigator.mediaDevices.getUserMedia({
                            audio: a
                        })
                    } catch (ja) {
                        c = Fd(ja.name || ja.code || ja, ja.message);
                        if (c.code === n.PERMISSION_DENIED)
                            throw c;
                        k.warning("getUserMedia failed in getDevices", c)
                    }
                    this.isAccessMicrophonePermission = !0
                } else if (h) {
                    try {
                        m = await navigator.mediaDevices.getUserMedia({
                            video: b
                        })
                    } catch (ja) {
                        c = Fd(ja.name || ja.code || ja, ja.message);
                        if (c.code === n.PERMISSION_DENIED)
                            throw c;
                        k.warning("getUserMedia failed in getDevices", c)
                    }
                    this.isAccessCameraPermission = !0
                }
                k.debug("[device manager] mic permission", a, "cam permission", b)
            }
            try {
                var l, y, ua;
                const a = await navigator.mediaDevices.enumerateDevices();
                return e && q(l = e.getTracks()).call(l, a=>a.stop()),
                m && q(y = m.getTracks()).call(y, a=>a.stop()),
                r && q(ua = r.getTracks()).call(ua, a=>a.stop()),
                e = null,
                m = null,
                r = null,
                a
            } catch (ja) {
                var E, u, A;
                e && q(E = e.getTracks()).call(E, a=>a.stop());
                m && q(u = m.getTracks()).call(u, a=>a.stop());
                r && q(A = r.getTracks()).call(A, a=>a.stop());
                r = m = e = null;
                return (new p(n.ENUMERATE_DEVICES_FAILED,ja.toString())).throw()
            }
        }
        async getRecordingDevices(a=!1) {
            a = await this.enumerateDevices(!0, !1, a);
            return M(a).call(a, a=>"audioinput" === a.kind)
        }
        async getCamerasDevices(a=!1) {
            a = await this.enumerateDevices(!1, !0, a);
            return M(a).call(a, a=>"videoinput" === a.kind)
        }
        async getSpeakers(a=!1) {
            a = await this.enumerateDevices(!0, !1, a);
            return M(a).call(a, a=>"audiooutput" === a.kind)
        }
        searchDeviceNameById(a) {
            return (a = this.deviceInfoMap.get(a)) ? a.device.label || a.device.deviceId : null
        }
        searchDeviceIdByName(a) {
            var b;
            let c = null;
            return q(b = this.deviceInfoMap).call(b, b=>{
                b.device.label === a && (c = b.device.deviceId)
            }
            ),
            c
        }
        async getDeviceById(a) {
            var b = await this.enumerateDevices(!0, !0, !0);
            b = R(b).call(b, b=>b.deviceId === a);
            if (!b)
                throw new p(n.DEVICE_NOT_FOUND,"deviceId: ".concat(a));
            return b
        }
        async init() {
            this.state = ec.INITING;
            try {
                await this.updateDevicesInfo(),
                this.state = ec.INITEND
            } catch (a) {
                throw (k.warning("Device Detection functionality cannot start properly.", a.toString()),
                this.state = ec.IDLE,
                "boolean" == typeof isSecureContext ? isSecureContext : "https:" === location.protocol || "file:" === location.protocol || "localhost" === location.hostname || "127.0.0.1" === location.hostname || "::1" === location.hostname) || (new p(n.WEB_SECURITY_RESTRICT,"Your context is limited by web security, please try using https protocol or localhost.")).throw(),
                a;
            }
        }
        async updateDevicesInfo() {
            var a;
            const b = await this.enumerateDevices(!0, !0, !0)
              , c = x()
              , e = []
              , g = this.checkMediaDeviceInfoIsOk(b);
            if (q(b).call(b, a=>{
                if (a.deviceId) {
                    var b = this.deviceInfoMap.get(a.deviceId);
                    if ("ACTIVE" !== (b ? b.state : "INACTIVE")) {
                        const b = {
                            initAt: c,
                            updateAt: c,
                            device: a,
                            state: "ACTIVE"
                        };
                        this.deviceInfoMap.set(a.deviceId, b);
                        e.push(b)
                    }
                    b && (b.updateAt = c)
                }
            }
            ),
            q(a = this.deviceInfoMap).call(a, (a,b)=>{
                "ACTIVE" === a.state && a.updateAt !== c && (a.state = "INACTIVE",
                e.push(a))
            }
            ),
            this.state !== ec.INITEND)
                return g.audio && (this.lastAccessMicrophonePermission = !0,
                this.isAccessMicrophonePermission = !0),
                void (g.video && (this.lastAccessCameraPermission = !0,
                this.isAccessCameraPermission = !0));
            q(e).call(e, a=>{
                switch (a.device.kind) {
                case "audioinput":
                    this.lastAccessMicrophonePermission && this.isAccessMicrophonePermission && this.emit(Kb.RECORDING_DEVICE_CHANGED, a);
                    break;
                case "videoinput":
                    this.lastAccessCameraPermission && this.isAccessCameraPermission && this.emit(Kb.CAMERA_DEVICE_CHANGED, a);
                    break;
                case "audiooutput":
                    this.lastAccessMicrophonePermission && this.isAccessMicrophonePermission && this.emit(Kb.PLAYOUT_DEVICE_CHANGED, a)
                }
            }
            );
            g.audio && (this.lastAccessMicrophonePermission = !0,
            this.isAccessMicrophonePermission = !0);
            g.video && (this.lastAccessCameraPermission = !0,
            this.isAccessCameraPermission = !0)
        }
        checkMediaDeviceInfoIsOk(a) {
            const b = M(a).call(a, a=>"audioinput" === a.kind);
            a = M(a).call(a, a=>"videoinput" === a.kind);
            const c = {
                audio: !1,
                video: !1
            };
            for (const a of b)
                if (a.label && a.deviceId) {
                    c.audio = !0;
                    break
                }
            for (const b of a)
                if (b.label && b.deviceId) {
                    c.video = !0;
                    break
                }
            return c
        }
    }
    ;
    var fo = [].slice
      , go = /MSIE .\./.test(Yc)
      , wk = function(a) {
        return function(b, c) {
            var e = 2 < arguments.length
              , g = e ? fo.call(arguments, 2) : void 0;
            return a(e ? function() {
                ("function" == typeof b ? b : Function(b)).apply(this, g)
            }
            : b, c)
        }
    };
    O({
        global: !0,
        bind: !0,
        forced: go
    }, {
        setTimeout: wk(N.setTimeout),
        setInterval: wk(N.setInterval)
    });
    var gc = ha.setTimeout;
    let th = 0
      , Ee = 0
      , u = new class {
        constructor() {
            var a, b;
            this.baseInfoMap = new aa;
            this.clientList = Rj;
            this.keyEventUploadPendingItems = [];
            this.normalEventUploadPendingItems = [];
            this.apiInvokeUploadPendingItems = [];
            this.apiInvokeCount = 0;
            this.ltsList = [];
            this.lastSendNormalEventTime = x();
            this.customReportCount = 0;
            this.eventUploadTimer = window.setInterval(ra(a = this.doSend).call(a, this), v.EVENT_REPORT_SEND_INTERVAL);
            this.setSessionIdTimer = window.setInterval(ra(b = this.appendSessionId).call(b, this), v.EVENT_REPORT_SEND_INTERVAL)
        }
        reportApiInvoke(a, b, c) {
            b.timeout = b.timeout || 6E4;
            b.reportResult = void 0 === b.reportResult || b.reportResult;
            const e = x()
              , g = this.apiInvokeCount += 1
              , h = ()=>({
                tag: b.tag,
                invokeId: g,
                sid: a,
                name: b.name,
                apiInvokeTime: e,
                options: b.options
            })
              , m = !!v.SHOW_REPORT_INVOKER_LOG;
            m && k.info("".concat(b.name, " start"), b.options);
            let r = !1;
            wb(b.timeout).then(()=>{
                r || (this.sendApiInvoke(va({}, h(), {
                    error: n.API_INVOKE_TIMEOUT,
                    success: !1
                })),
                k.debug("".concat(b.name, " timeout")))
            }
            );
            const l = new p(n.UNEXPECTED_ERROR,"".concat(b.name, ": this api invoke is end"));
            return {
                onSuccess: a=>{
                    const e = ()=>{
                        if (r)
                            throw l;
                        return r = !0,
                        this.sendApiInvoke(va({}, h(), {
                            success: !0
                        }, b.reportResult && {
                            result: a
                        })),
                        m && k.info("".concat(b.name, " onSuccess")),
                        a
                    }
                    ;
                    return c ? vk(e, b.name + "Success", c, ()=>r = !0) : e()
                }
                ,
                onError: a=>{
                    const e = ()=>{
                        if (r)
                            throw a;
                        r = !0;
                        this.sendApiInvoke(va({}, h(), {
                            success: !1,
                            error: a.toString()
                        }));
                        m && k.info("".concat(b.name, " onFailure"), a.toString())
                    }
                    ;
                    return c ? vk(e, b.name + "Error", c, ()=>r = !0) : e()
                }
            }
        }
        sessionInit(a, b) {
            if (!this.baseInfoMap.has(a)) {
                var c = x();
                a = this.createBaseInfo(a, c);
                a.cname = b.cname;
                var e = Ha({}, {
                    willUploadConsoleLog: v.UPLOAD_LOG,
                    maxTouchPoints: navigator.maxTouchPoints,
                    areaVersion: Hf ? "global" : "oversea",
                    areas: v.AREAS && v.AREAS.join(",")
                }, b.extend)
                  , g = x();
                b = va({}, a, {
                    eventType: Da.SESSION_INIT,
                    appid: b.appid,
                    browser: navigator.userAgent,
                    build: "v4.4.0-58-g0247fcd0(2021/4/27 \u4e0b\u53483:11:33)",
                    lts: g,
                    elapse: g - c,
                    extend: w(e),
                    mode: b.mode,
                    process: v.PROCESS_ID,
                    success: !0,
                    version: Ta
                });
                this.send({
                    type: la.SESSION,
                    data: b
                }, !0)
            }
        }
        joinChooseServer(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                b = va({}, c, {
                    eventType: Da.JOIN_CHOOSE_SERVER,
                    lts: e,
                    eventElapse: e - b.lts,
                    chooseServerAddr: b.csAddr,
                    errorCode: b.ec,
                    elapse: e - a.startTime,
                    success: b.succ,
                    chooseServerAddrList: w(b.serverList),
                    uid: b.uid ? pa(b.uid) : null,
                    cid: b.cid ? pa(b.cid) : null,
                    chooseServerIp: b.csIp || ""
                });
                this.send({
                    type: la.JOIN_CHOOSE_SERVER,
                    data: b
                }, !0)
            }
        }
        reqUserAccount(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                b = va({}, c, {
                    eventType: Da.REQ_USER_ACCOUNT,
                    lts: e,
                    success: b.success,
                    serverAddress: b.serverAddr,
                    stringUid: b.stringUid,
                    uid: b.uid,
                    errorCode: b.errorCode,
                    elapse: e - a.startTime,
                    eventElapse: e - b.lts,
                    extend: w(b.extend)
                });
                this.send({
                    type: la.REQ_USER_ACCOUNT,
                    data: b
                }, !0)
            }
        }
        joinGateway(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info;
                b.vid && (c.vid = b.vid);
                c.uid = b.uid;
                c.cid = b.cid;
                var e = x();
                c = va({}, c, {
                    eventType: Da.JOIN_GATEWAY,
                    lts: e,
                    gatewayAddr: b.addr,
                    success: b.succ,
                    errorCode: b.ec,
                    elapse: e - a.startTime,
                    eventElapse: e - b.lts
                });
                b.succ && (a.lastJoinSuccessTime = e);
                this.send({
                    type: la.JOIN_GATEWAT,
                    data: c
                }, !0)
            }
        }
        joinChannelTimeout(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = x();
                b = va({}, a.info, {
                    lts: c,
                    timeout: b,
                    elapse: c - a.startTime
                });
                this.send({
                    type: la.JOIN_CHANNEL_TIMEOUT,
                    data: b
                }, !0)
            }
        }
        publish(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                b = va({}, c, {
                    eventType: Da.PUBLISH,
                    lts: e,
                    eventElapse: e - b.lts,
                    elapse: e - a.startTime,
                    success: b.succ,
                    errorCode: b.ec,
                    videoName: b.videoName,
                    audioName: b.audioName,
                    screenName: b.screenName,
                    screenshare: b.screenshare,
                    audio: b.audio,
                    video: b.video,
                    p2pid: b.p2pid,
                    publishRequestid: b.publishRequestid
                });
                this.send({
                    type: la.PUBLISH,
                    data: b
                }, !0)
            }
        }
        subscribe(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                a = va({}, c, {
                    eventType: Da.SUBSCRIBE,
                    lts: e,
                    eventElapse: e - b.lts,
                    elapse: e - a.startTime,
                    success: b.succ,
                    errorCode: b.ec,
                    video: b.video,
                    audio: b.audio,
                    subscribeRequestid: b.subscribeRequestid,
                    p2pid: b.p2pid
                });
                "string" == typeof b.peerid ? a.peerSuid = b.peerid : a.peer = b.peerid;
                this.send({
                    type: la.SUBSCRIBE,
                    data: a
                }, !0)
            }
        }
        firstRemoteFrame(a, b, c, e) {
            if (a = this.baseInfoMap.get(a)) {
                var g = a.info
                  , h = x();
                b = va({}, g, {}, e, {
                    elapse: h - a.startTime,
                    eventType: b,
                    lts: h
                });
                this.send({
                    type: c,
                    data: b
                }, !0)
            }
        }
        onGatewayStream(a, b, c, e) {
            if (a = this.baseInfoMap.get(a))
                b = va({}, a.info, {}, e, {
                    eventType: b,
                    lts: x()
                }),
                this.send({
                    type: c,
                    data: b
                }, !0)
        }
        streamSwitch(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                b = va({}, c, {
                    eventType: Da.STREAM_SWITCH,
                    lts: e,
                    isDual: b.isdual,
                    elapse: e - a.startTime,
                    success: b.succ
                });
                this.send({
                    type: la.STREAM_SWITCH,
                    data: b
                }, !0)
            }
        }
        requestProxyAppCenter(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                b = va({}, c, {
                    eventType: Da.REQUEST_PROXY_APPCENTER,
                    lts: e,
                    eventElapse: e - b.lts,
                    elapse: e - a.startTime,
                    APAddr: b.APAddr,
                    workerManagerList: b.workerManagerList,
                    response: b.response,
                    errorCode: b.ec,
                    success: b.succ
                });
                this.send({
                    type: la.REQUEST_PROXY_APPCENTER,
                    data: b
                }, !0)
            }
        }
        requestProxyWorkerManager(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                b = va({}, c, {
                    eventType: Da.REQUEST_PROXY_WORKER_MANAGER,
                    lts: e,
                    eventElapse: e - b.lts,
                    elapse: e - a.startTime,
                    workerManagerAddr: b.workerManagerAddr,
                    response: b.response,
                    errorCode: b.ec,
                    success: b.succ
                });
                this.send({
                    type: la.REQUEST_PROXY_WORKER_MANAGER,
                    data: b
                }, !0)
            }
        }
        setProxyServer(a) {
            (this.proxyServer = a) ? k.debug("reportProxyServerurl: ".concat(a)) : k.debug("disable reportProxyServerurl: ".concat(a))
        }
        peerPublishStatus(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                b = va({}, c, {
                    subscribeElapse: b.subscribeElapse,
                    peer: b.peer,
                    peerPublishDuration: Math.max(b.audioPublishDuration, b.videoPublishDuration),
                    audiotag: 0 < b.audioPublishDuration ? 1 : -1,
                    videotag: 0 < b.videoPublishDuration ? 1 : -1,
                    lts: e,
                    elapse: e - a.startTime,
                    joinChannelSuccessElapse: e - (a.lastJoinSuccessTime || e)
                });
                this.send({
                    type: la.PEER_PUBLISH_STATUS,
                    data: b
                }, !0)
            }
        }
        workerEvent(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                b = function(a, b, c) {
                    const e = a[b];
                    if (!e || "string" != typeof e)
                        return [a];
                    a[b] = "";
                    const g = Cd(w(a));
                    let h = 0;
                    const m = [];
                    let k = 0;
                    for (let r = 0; r < e.length; r++)
                        k += 127 >= e.charCodeAt(r) ? 1 : 3,
                        k <= c - g || (m[m.length] = Ce({}, a, {
                            [b]: e.substring(h, r)
                        }),
                        h = r,
                        k = 127 >= e.charCodeAt(r) ? 1 : 3);
                    return h !== e.length - 1 && (m[m.length] = Ce({}, a, {
                        [b]: e.substring(h)
                    })),
                    m
                }(va({}, c, {}, b, {
                    elapse: e - a.startTime,
                    lts: e,
                    productType: "WebRTC"
                }), "payload", 1300);
                q(b).call(b, a=>this.send({
                    type: la.WORKER_EVENT,
                    data: a
                }, !0))
            }
        }
        apworkerEvent(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                b = va({}, c, {}, b, {
                    elapse: e - a.startTime,
                    lts: e
                });
                this.send({
                    type: la.AP_WORKER_EVENT,
                    data: b
                }, !0)
            }
        }
        joinWebProxyAP(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                b = va({}, c, {}, b, {
                    elapse: e - a.startTime,
                    lts: e
                });
                this.send({
                    type: la.JOIN_WEB_PROXY_AP,
                    data: b
                }, !0)
            }
        }
        WebSocketQuit(a, b) {
            if (a = this.baseInfoMap.get(a)) {
                var c = a.info
                  , e = x();
                b = va({}, c, {}, b, {
                    elapse: e - a.startTime,
                    lts: e
                });
                this.send({
                    type: la.WEBSOCKET_QUIT,
                    data: b
                }, !0)
            }
        }
        async sendCustomReportMessage(a, b) {
            if (this.customReportCount += b.length,
            this.customReportCount > v.CUSTOM_REPORT_LIMIT)
                throw new p(n.CUSTOM_REPORT_FREQUENCY_TOO_HIGH);
            this.customReportCounterTimer || (this.customReportCounterTimer = window.setInterval(()=>{
                this.customReportCount = 0
            }
            , 5E3));
            b = z(b).call(b, b=>({
                type: la.USER_ANALYTICS,
                data: va({
                    sid: a
                }, b)
            }));
            b = {
                msgType: "EventMessages",
                sentTs: Math.round(x() / 1E3),
                payloads: z(b).call(b, a=>w(a))
            };
            try {
                await this.postDataToStatsCollector(b)
            } catch (c) {
                throw k.error("send custom report message failed", c.toString()),
                new p(n.CUSTOM_REPORT_SEND_FAILED,c.message);
            }
        }
        sendApiInvoke(a) {
            var b = v.NOT_REPORT_EVENT;
            if (a.tag && oa(b) && oa(b).call(b, a.tag))
                return !1;
            if (null === a.sid)
                return this.apiInvokeUploadPendingItems.push(a),
                !1;
            b = this.baseInfoMap.get(a.sid);
            if (!b)
                return this.apiInvokeUploadPendingItems.push(a),
                !1;
            const {cname: c, uid: e, cid: g} = b.info;
            a.lts = a.lts || x();
            a = {
                invokeId: a.invokeId,
                sid: a.sid,
                cname: c,
                cid: g,
                uid: e,
                lts: a.lts,
                success: a.success,
                elapse: a.lts - b.startTime,
                execElapse: a.lts - a.apiInvokeTime,
                apiName: a.name,
                options: a.options ? w(a.options) : void 0,
                execStates: a.states ? w(a.states) : void 0,
                execResult: a.result ? w(a.result) : void 0,
                errorCode: a.error ? w(a.error) : void 0
            };
            return this.send({
                type: la.API_INVOKE,
                data: a
            }, !1),
            !0
        }
        appendSessionId() {
            var a;
            q(a = this.clientList).call(a, a=>{
                if (a._sessionId) {
                    const b = this.apiInvokeUploadPendingItems.length;
                    for (let c = 0; c < b; c++) {
                        const b = this.apiInvokeUploadPendingItems.shift();
                        b && (b.sid = a._sessionId,
                        this.sendApiInvoke(Ha({}, b)))
                    }
                }
            }
            )
        }
        send(a, b) {
            if (b)
                return this.keyEventUploadPendingItems.push(a),
                void this.sendItems(this.keyEventUploadPendingItems, !0);
            var c;
            (this.normalEventUploadPendingItems.push(a),
            this.normalEventUploadPendingItems.length > v.NORMAL_EVENT_QUEUE_CAPACITY) && Ia(c = this.normalEventUploadPendingItems).call(c, 0, 1);
            10 <= this.normalEventUploadPendingItems.length && this.sendItems(this.normalEventUploadPendingItems, !1)
        }
        doSend() {
            0 < this.keyEventUploadPendingItems.length && this.sendItems(this.keyEventUploadPendingItems, !0);
            0 < this.normalEventUploadPendingItems.length && 5E3 <= x() - this.lastSendNormalEventTime && this.sendItems(this.normalEventUploadPendingItems, !1)
        }
        sendItems(a, b) {
            const c = [];
            for (var e = []; a.length; ) {
                const b = a.shift();
                20 > c.length ? c.push(b) : e.push(b)
            }
            a.push(...e);
            for (const a of [...c]) {
                var g, h;
                -1 !== I(g = this.ltsList).call(g, a.data.lts) ? (a.data.lts = this.ltsList[this.ltsList.length - 1] + 1,
                this.ltsList.push(a.data.lts)) : (this.ltsList.push(a.data.lts),
                dd(h = this.ltsList).call(h, (a,b)=>a - b))
            }
            b || (this.lastSendNormalEventTime = x());
            e = {
                msgType: "EventMessages",
                sentTs: Math.round(x() / 1E3),
                payloads: z(c).call(c, a=>w(a)),
                vid: (a=>(a = a && a.data.sid && this.baseInfoMap.get(a.data.sid)) && a.info.vid && +a.info.vid || 0)(c[0])
            };
            return c.length && this.postDataToStatsCollector(e).catch((a=>c=>{
                var e, g, h;
                b ? this.keyEventUploadPendingItems = l(e = this.keyEventUploadPendingItems).call(e, a) : (this.normalEventUploadPendingItems = l(g = this.normalEventUploadPendingItems).call(g, a),
                this.normalEventUploadPendingItems.length > v.NORMAL_EVENT_QUEUE_CAPACITY && (Ia(h = this.normalEventUploadPendingItems).call(h, 0, this.normalEventUploadPendingItems.length - v.NORMAL_EVENT_QUEUE_CAPACITY),
                k.warning("report: drop normal events")))
            }
            )(c)),
            a
        }
        async postDataToStatsCollector(a, b=!1) {
            var c, e, g;
            const h = b ? "/events/proto-raws" : "/events/messages";
            let m = this.url || (this.proxyServer ? l(c = l(e = "https://".concat(this.proxyServer, "/rs/?h=")).call(e, v.EVENT_REPORT_DOMAIN, "&p=6443&d=")).call(c, h) : l(g = "https://".concat(v.EVENT_REPORT_DOMAIN, ":6443")).call(g, h));
            for (c = 0; 2 > c; c += 1) {
                var k, t, n;
                1 === c && (m = this.backupUrl || (this.proxyServer ? l(k = l(t = "https://".concat(this.proxyServer, "/rs/?h=")).call(t, v.EVENT_REPORT_BACKUP_DOMAIN, "&p=6443&d=")).call(k, h) : l(n = "https://".concat(v.EVENT_REPORT_BACKUP_DOMAIN, ":6443")).call(n, h)));
                try {
                    b ? await ml(m, {
                        timeout: 1E4,
                        data: a
                    }) : await yb(m, {
                        timeout: 1E4,
                        data: a
                    })
                } catch (ua) {
                    if (1 === c)
                        throw ua;
                    continue
                }
                break
            }
        }
        createBaseInfo(a, b) {
            const c = Ha({}, On);
            return c.sid = a,
            this.baseInfoMap.set(a, {
                info: c,
                startTime: b
            }),
            c
        }
    }
      , nl = {
        [pc.ACCESS_POINT]: {
            [Ea.NO_FLAG_SET]: {
                desc: "flag is zero",
                retry: !1
            },
            [Ea.FLAG_SET_BUT_EMPTY]: {
                desc: "flag is empty",
                retry: !1
            },
            [Ea.INVALID_FALG_SET]: {
                desc: "invalid flag",
                retry: !1
            },
            [Ea.NO_SERVICE_AVAILABLE]: {
                desc: "no service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_P2P]: {
                desc: "no unilbs p2p service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_VOET]: {
                desc: "no unilbs voice service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_WEBRTC]: {
                desc: "no unilbs webrtc service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_CDS]: {
                desc: "no cds service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_CDN]: {
                desc: "no cdn dispatcher service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_TDS]: {
                desc: "no tds service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_REPORT]: {
                desc: "no unilbs report service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_APP_CENTER]: {
                desc: "no app center service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_ENV0]: {
                desc: "no unilbs sig env0 service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_VOET]: {
                desc: "no unilbs voet service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_STRING_UID]: {
                desc: "no string uid service available",
                retry: !0
            },
            [Ea.NO_SERVICE_AVAILABLE_WEBRTC_UNILBS]: {
                desc: "no webrtc unilbs service available",
                retry: !0
            }
        },
        [pc.UNILBS]: {
            [Wa.INVALID_VENDOR_KEY]: {
                desc: "invalid vendor key, can not find appid",
                retry: !1
            },
            [Wa.INVALID_CHANNEL_NAME]: {
                desc: "invalid channel name",
                retry: !1
            },
            [Wa.INTERNAL_ERROR]: {
                desc: "unilbs internal error",
                retry: !1
            },
            [Wa.NO_AUTHORIZED]: {
                desc: "invalid token, authorized failed",
                retry: !1
            },
            [Wa.DYNAMIC_KEY_TIMEOUT]: {
                desc: "dynamic key or token timeout",
                retry: !1
            },
            [Wa.NO_ACTIVE_STATUS]: {
                desc: "no active status",
                retry: !1
            },
            [Wa.DYNAMIC_KEY_EXPIRED]: {
                desc: "dynamic key expired",
                retry: !1
            },
            [Wa.STATIC_USE_DYNAMIC_KEY]: {
                desc: "static use dynamic key",
                retry: !1
            },
            [Wa.DYNAMIC_USE_STATIC_KEY]: {
                desc: "dynamic use static key",
                retry: !1
            },
            [Wa.USER_OVERLOAD]: {
                desc: "amount of users over load",
                retry: !1
            },
            [Wa.FORBIDDEN_REGION]: {
                desc: "the request is forbidden in this area",
                retry: !1
            },
            [Wa.CANNOT_MEET_AREA_DEMAND]: {
                desc: "unable to allocate services in this area",
                retry: !1
            }
        },
        [pc.STRING_UID_ALLOCATOR]: {
            [ed.IIIEGAL_APPID]: {
                desc: "invalid appid",
                retry: !1
            },
            [ed.IIIEGAL_UID]: {
                desc: "invalid string uid",
                retry: !1
            },
            [ed.INTERNAL_ERROR]: {
                desc: "string uid allocator internal error",
                retry: !0
            }
        }
    }
      , ol = {
        [F.K_TIMESTAMP_EXPIRED]: {
            desc: "K_TIMESTAMP_EXPIRED",
            action: "failed"
        },
        [F.K_CHANNEL_PERMISSION_INVALID]: {
            desc: "K_CHANNEL_PERMISSION_INVALID",
            action: "failed"
        },
        [F.K_CERTIFICATE_INVALID]: {
            desc: "K_CERTIFICATE_INVALID",
            action: "failed"
        },
        [F.K_CHANNEL_NAME_EMPTY]: {
            desc: "K_CHANNEL_NAME_EMPTY",
            action: "failed"
        },
        [F.K_CHANNEL_NOT_FOUND]: {
            desc: "K_CHANNEL_NOT_FOUND",
            action: "failed"
        },
        [F.K_TICKET_INVALID]: {
            desc: "K_TICKET_INVALID",
            action: "failed"
        },
        [F.K_CHANNEL_CONFLICTED]: {
            desc: "K_CHANNEL_CONFLICTED",
            action: "failed"
        },
        [F.K_SERVICE_NOT_READY]: {
            desc: "K_SERVICE_NOT_READY",
            action: "tryNext"
        },
        [F.K_SERVICE_TOO_HEAVY]: {
            desc: "K_SERVICE_TOO_HEAVY",
            action: "tryNext"
        },
        [F.K_UID_BANNED]: {
            desc: "K_UID_BANNED",
            action: "failed"
        },
        [F.K_IP_BANNED]: {
            desc: "K_IP_BANNED",
            action: "failed"
        },
        [F.ERR_INVALID_VENDOR_KEY]: {
            desc: "ERR_INVALID_VENDOR_KEY",
            action: "failed"
        },
        [F.ERR_INVALID_CHANNEL_NAME]: {
            desc: "ERR_INVALID_CHANNEL_NAME",
            action: "failed"
        },
        [F.WARN_NO_AVAILABLE_CHANNEL]: {
            desc: "WARN_NO_AVAILABLE_CHANNEL",
            action: "failed"
        },
        [F.WARN_LOOKUP_CHANNEL_TIMEOUT]: {
            desc: "WARN_LOOKUP_CHANNEL_TIMEOUT",
            action: "tryNext"
        },
        [F.WARN_LOOKUP_CHANNEL_REJECTED]: {
            desc: "WARN_LOOKUP_CHANNEL_REJECTED",
            action: "failed"
        },
        [F.WARN_OPEN_CHANNEL_TIMEOUT]: {
            desc: "WARN_OPEN_CHANNEL_TIMEOUT",
            action: "tryNext"
        },
        [F.WARN_OPEN_CHANNEL_REJECTED]: {
            desc: "WARN_OPEN_CHANNEL_REJECTED",
            action: "failed"
        },
        [F.WARN_REQUEST_DEFERRED]: {
            desc: "WARN_REQUEST_DEFERRED",
            action: "failed"
        },
        [F.ERR_DYNAMIC_KEY_TIMEOUT]: {
            desc: "ERR_DYNAMIC_KEY_TIMEOUT",
            action: "failed"
        },
        [F.ERR_NO_AUTHORIZED]: {
            desc: "ERR_NO_AUTHORIZED",
            action: "failed"
        },
        [F.ERR_VOM_SERVICE_UNAVAILABLE]: {
            desc: "ERR_VOM_SERVICE_UNAVAILABLE",
            action: "tryNext"
        },
        [F.ERR_NO_CHANNEL_AVAILABLE_CODE]: {
            desc: "ERR_NO_CHANNEL_AVAILABLE_CODE",
            action: "failed"
        },
        [F.ERR_MASTER_VOCS_UNAVAILABLE]: {
            desc: "ERR_MASTER_VOCS_UNAVAILABLE",
            action: "tryNext"
        },
        [F.ERR_INTERNAL_ERROR]: {
            desc: "ERR_INTERNAL_ERROR",
            action: "tryNext"
        },
        [F.ERR_NO_ACTIVE_STATUS]: {
            desc: "ERR_NO_ACTIVE_STATUS",
            action: "failed"
        },
        [F.ERR_INVALID_UID]: {
            desc: "ERR_INVALID_UID",
            action: "failed"
        },
        [F.ERR_DYNAMIC_KEY_EXPIRED]: {
            desc: "ERR_DYNAMIC_KEY_EXPIRED",
            action: "failed"
        },
        [F.ERR_STATIC_USE_DYANMIC_KE]: {
            desc: "ERR_STATIC_USE_DYANMIC_KE",
            action: "failed"
        },
        [F.ERR_DYNAMIC_USE_STATIC_KE]: {
            desc: "ERR_DYNAMIC_USE_STATIC_KE",
            action: "failed"
        },
        [F.ERR_NO_VOCS_AVAILABLE]: {
            desc: "ERR_NO_VOCS_AVAILABLE",
            action: "tryNext"
        },
        [F.ERR_NO_VOS_AVAILABLE]: {
            desc: "ERR_NO_VOS_AVAILABLE",
            action: "tryNext"
        },
        [F.ERR_JOIN_CHANNEL_TIMEOUT]: {
            desc: "ERR_JOIN_CHANNEL_TIMEOUT",
            action: "tryNext"
        },
        [F.ERR_JOIN_BY_MULTI_IP]: {
            desc: "ERR_JOIN_BY_MULTI_IP",
            action: "recover"
        },
        [F.ERR_NOT_JOINED]: {
            desc: "ERR_NOT_JOINED",
            action: "failed"
        },
        [F.ERR_REPEAT_JOIN_REQUEST]: {
            desc: "ERR_REPEAT_JOIN_REQUEST",
            action: "quit"
        },
        [F.ERR_REPEAT_JOIN_CHANNEL]: {
            desc: "ERR_REPEAT_JOIN_CHANNEL",
            action: "quit"
        },
        [F.ERR_INVALID_VENDOR_KEY]: {
            desc: "ERR_INVALID_VENDOR_KEY",
            action: "failed"
        },
        [F.ERR_INVALID_CHANNEL_NAME]: {
            desc: "ERR_INVALID_CHANNEL_NAME",
            action: "failed"
        },
        [F.ERR_INVALID_STRINGUID]: {
            desc: "ERR_INVALID_STRINGUID",
            action: "failed"
        },
        [F.ERR_TOO_MANY_USERS]: {
            desc: "ERR_TOO_MANY_USERS",
            action: "tryNext"
        },
        [F.ERR_SET_CLIENT_ROLE_TIMEOUT]: {
            desc: "ERR_SET_CLIENT_ROLE_TIMEOUT",
            action: "failed"
        },
        [F.ERR_SET_CLIENT_ROLE_NO_PERMISSION]: {
            desc: "ERR_SET_CLIENT_ROLE_TIMEOUT",
            action: "failed"
        },
        [F.ERR_SET_CLIENT_ROLE_ALREADY_IN_USE]: {
            desc: "ERR_SET_CLIENT_ROLE_ALREADY_IN_USE",
            action: "success"
        },
        [F.ERR_PUBLISH_REQUEST_INVALID]: {
            desc: "ERR_PUBLISH_REQUEST_INVALID",
            action: "failed"
        },
        [F.ERR_SUBSCRIBE_REQUEST_INVALID]: {
            desc: "ERR_SUBSCRIBE_REQUEST_INVALID",
            action: "failed"
        },
        [F.ERR_NOT_SUPPORTED_MESSAGE]: {
            desc: "ERR_NOT_SUPPORTED_MESSAGE",
            action: "failed"
        },
        [F.ERR_ILLEAGAL_PLUGIN]: {
            desc: "ERR_ILLEAGAL_PLUGIN",
            action: "failed"
        },
        [F.ILLEGAL_CLIENT_ROLE_LEVEL]: {
            desc: "ILLEGAL_CLIENT_ROLE_LEVEL",
            action: "failed"
        },
        [F.ERR_REJOIN_TOKEN_INVALID]: {
            desc: "ERR_REJOIN_TOKEN_INVALID",
            action: "failed"
        },
        [F.ERR_REJOIN_USER_NOT_JOINED]: {
            desc: "ERR_REJOIN_NOT_JOINED",
            action: "failed"
        },
        [F.ERR_INVALID_OPTIONAL_INFO]: {
            desc: "ERR_INVALID_OPTIONAL_INFO",
            action: "quit"
        },
        [F.ERR_TEST_RECOVER]: {
            desc: "ERR_TEST_RECOVER",
            action: "recover"
        },
        [F.ERR_TEST_TRYNEXT]: {
            desc: "ERR_TEST_TRYNEXT",
            action: "recover"
        },
        [F.ERR_TEST_RETRY]: {
            desc: "ERR_TEST_RETRY",
            action: "recover"
        },
        [F.ILLEGAL_AES_PASSWORD]: {
            desc: "ERR_TEST_RETRY",
            action: "failed"
        }
    }
      , Qa = {
        timeout: 500,
        timeoutFactor: 1.5,
        maxRetryCount: 1 / 0,
        maxRetryTimeout: 1E4
    };
    class Xf extends Sa {
        constructor(a, b) {
            super();
            this.currentURLIndex = this.connectionID = 0;
            this.reconnectMode = "tryNext";
            this._state = "closed";
            this.reconnectCount = 0;
            this.name = a;
            this.retryConfig = b
        }
        get url() {
            return this.websocket ? this.websocket.url : null
        }
        get state() {
            return this._state
        }
        set state(a) {
            a !== this._state && (this._state = a,
            "reconnecting" === this._state ? this.emit(S.RECONNECTING, this.reconnectReason) : "connected" === this._state ? this.emit(S.CONNECTED) : "closed" === this._state ? this.emit(S.CLOSED) : "failed" === this._state && this.emit(S.FAILED))
        }
        init(a) {
            return new B((b,c)=>{
                this.urls = a;
                let e = this.urls[this.currentURLIndex];
                this.state = "connecting";
                this.createWebSocketConnection(e).then(b).catch(c);
                this.once(S.CLOSED, ()=>c(new p(n.WS_DISCONNECT)));
                this.once(S.CONNECTED, ()=>b())
            }
            )
        }
        close(a, b) {
            if (this.currentURLIndex = 0,
            this.reconnectCount = 0,
            this.websocket) {
                this.websocket.onclose = null;
                this.websocket.onopen = null;
                this.websocket.onmessage = null;
                let a = this.websocket;
                b ? gc(()=>a.close(), 500) : a.close();
                this.websocket = void 0
            }
            this.state = a ? "failed" : "closed"
        }
        reconnect(a, b) {
            if (!this.websocket)
                return void k.warning("[".concat(this.name, "] can not reconnect, no websocket"));
            void 0 !== a && (this.reconnectMode = a);
            k.debug("[".concat(this.name, "] reconnect is triggered initiative"));
            a = this.websocket.onclose;
            this.websocket.onclose = null;
            this.websocket.close();
            a && ra(a).call(a, this.websocket)({
                code: 9999,
                reason: b
            })
        }
        sendMessage(a) {
            if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN)
                throw new p(n.WS_ABORT,"websocket is not ready");
            a = w(a);
            try {
                this.websocket.send(a)
            } catch (b) {
                throw new p(n.WS_ERR,"send websocket message error" + b.toString());
            }
        }
        async createWebSocketConnection(a) {
            let b = this.connectionID += 1;
            return new B((c,e)=>{
                var g, h;
                this.websocket && (this.websocket.onclose = null,
                this.websocket.close());
                v.GATEWAY_WSS_ADDRESS && sd(g = this.name).call(g, "gateway") && (a = v.GATEWAY_WSS_ADDRESS);
                k.debug(l(h = "[".concat(this.name, "] start connect, url: ")).call(h, a));
                try {
                    this.websocket = new WebSocket(a),
                    this.websocket.binaryType = "arraybuffer"
                } catch (r) {
                    var m;
                    g = new p(n.WS_ERR,"init websocket failed! Error: ".concat(r.toString()));
                    return k.error(l(m = "[".concat(this.name, "]")).call(m, g)),
                    void e(g)
                }
                wb(5E3).then(()=>{
                    b === this.connectionID && this.websocket && this.websocket.readyState !== WebSocket.OPEN && this.websocket && this.websocket.close()
                }
                );
                this.websocket.onopen = ()=>{
                    k.debug("[".concat(this.name, "] websocket opened:"), a);
                    this.reconnectMode = "retry";
                    this.state = "connected";
                    this.reconnectCount = 0;
                    c()
                }
                ;
                this.websocket.onclose = async a=>{
                    var b, g, h, m;
                    if (k.debug(l(b = l(g = l(h = l(m = "[".concat(this.name, "] websocket close ")).call(m, this.websocket && this.websocket.url, ", code: ")).call(h, a.code, ", reason: ")).call(g, a.reason, ", current mode: ")).call(b, this.reconnectMode)),
                    this.reconnectCount < this.retryConfig.maxRetryCount) {
                        "connected" === this.state && (this.reconnectReason = a.reason,
                        this.state = "reconnecting");
                        b = Wb(this, S.WILL_RECONNECT, this.reconnectMode) || this.reconnectMode;
                        b = await this.reconnectWithAction(b);
                        if ("closed" === this.state)
                            return void k.debug("[".concat(this.connectionID, "] ws is closed, no need to reconnect"));
                        if (!b)
                            return e(new p(n.WS_DISCONNECT,"websocket reconnect failed: ".concat(a.code))),
                            void this.close(!0);
                        c()
                    } else
                        e(new p(n.WS_DISCONNECT,"websocket close: ".concat(a.code))),
                        this.close()
                }
                ;
                this.websocket.onmessage = a=>{
                    this.emit(S.ON_MESSAGE, a)
                }
            }
            )
        }
        async reconnectWithAction(a, b) {
            var c, e;
            if (!b && this.reconnectCount >= this.retryConfig.maxRetryCount || !this.urls || "closed" === this.state)
                return !1;
            this.onlineReconnectListener || !navigator || void 0 === navigator.onLine || navigator.onLine || (this.onlineReconnectListener = new B(a=>{
                let b = ()=>{
                    this.onlineReconnectListener = void 0;
                    window.removeEventListener("online", b);
                    a()
                }
                ;
                window.addEventListener("online", b)
            }
            ));
            b = function(a, b) {
                return Math.min(b.maxRetryTimeout, b.timeout * Math.pow(b.timeoutFactor, a))
            }(this.reconnectCount, this.retryConfig);
            if (k.debug(l(c = l(e = "[".concat(this.name, "] wait ")).call(e, b, "ms to reconnect websocket, mode: ")).call(c, a)),
            await B.race([wb(b), this.onlineReconnectListener || new B(()=>{}
            )]),
            "closed" === this.state)
                return !1;
            this.reconnectCount += 1;
            try {
                if ("retry" === a)
                    await this.createWebSocketConnection(this.urls[this.currentURLIndex]);
                else if ("tryNext" === a) {
                    var g, h;
                    if (this.currentURLIndex += 1,
                    this.currentURLIndex >= this.urls.length)
                        return await this.reconnectWithAction("recover");
                    k.debug(l(g = l(h = "[".concat(this.name, "] websocket url length: ")).call(h, this.urls.length, " current index: ")).call(g, this.currentURLIndex));
                    await this.createWebSocketConnection(this.urls[this.currentURLIndex])
                } else
                    "recover" === a && (k.debug("[".concat(this.name, "] request new urls")),
                    this.urls = await La(this, S.REQUEST_NEW_URLS),
                    this.currentURLIndex = 0,
                    await this.createWebSocketConnection(this.urls[this.currentURLIndex]));
                return !0
            } catch (m) {
                return k.error("[".concat(this.name, "] reconnect failed"), m.toString()),
                await this.reconnectWithAction(a)
            }
        }
    }
    class ho {
        constructor(a) {
            this.input = [];
            this.size = a
        }
        add(a) {
            var b;
            (this.input.push(a),
            this.input.length > this.size) && Ia(b = this.input).call(b, 0, 1)
        }
        mean() {
            var a;
            return 0 === this.input.length ? 0 : qd(a = this.input).call(a, (a,c)=>a + c) / this.input.length
        }
    }
    class io extends Sa {
        constructor(a) {
            super();
            this._connectionState = ta.CLOSED;
            this.openConnectionTime = x();
            this.lastMsgTime = x();
            this.uploadCache = [];
            this.rttRolling = new ho(5);
            this.pingpongTimeoutCount = 0;
            this.onWebsocketMessage = a=>{
                if (a.data instanceof ArrayBuffer)
                    return void this.emit(Q.ON_BINARY_DATA, a.data);
                a = JSON.parse(a.data);
                if (this.lastMsgTime = x(),
                Object.prototype.hasOwnProperty.call(a, "_id")) {
                    let b = "res-@".concat(a._id);
                    this.emit(b, a._result, a._message)
                } else if (Object.prototype.hasOwnProperty.call(a, "_type") && (this.emit(a._type, a._message),
                a._type === U.ON_NOTIFICATION && this.handleNotification(a._message),
                a._type === U.ON_USER_BANNED))
                    switch (a._message.error_code) {
                    case 14:
                        this.close("UID_BANNED");
                        break;
                    case 15:
                        this.close("IP_BANNED");
                        break;
                    case 16:
                        this.close("CHANNEL_BANNED")
                    }
            }
            ;
            this.clientId = a.clientId;
            this.spec = a;
            this.websocket = new Xf("gateway-".concat(this.clientId),this.spec.retryConfig);
            this.handleWebsocketEvents();
            window.addEventListener("offline", ()=>{
                this.connectionState === ta.CONNECTED && this.reconnect("retry", Ra.OFFLINE)
            }
            )
        }
        get connectionState() {
            return this._connectionState
        }
        set connectionState(a) {
            a !== this._connectionState && (this._connectionState = a,
            a === ta.CONNECTED ? this.emit(Q.WS_CONNECTED) : a === ta.RECONNECTING ? this.emit(Q.WS_RECONNECTING, this._websocketReconnectReason) : a === ta.CLOSED && this.emit(Q.WS_CLOSED, this._disconnectedReason))
        }
        get currentURLIndex() {
            return this.websocket.currentURLIndex
        }
        get url() {
            return this.websocket ? this.websocket.url : null
        }
        get rtt() {
            return this.rttRolling.mean()
        }
        async request(a, b, c) {
            var e, g, h, m, r;
            let t = qa(6, "");
            var y = {
                _id: t,
                _type: a,
                _message: b
            };
            let q = this.websocket.connectionID;
            var E = ()=>new B((a,b)=>{
                if (this.connectionState === ta.CONNECTED)
                    return a();
                const c = ()=>{
                    this.off(Q.WS_CLOSED, e);
                    a()
                }
                  , e = ()=>{
                    this.off(Q.WS_CONNECTED, c);
                    b(new p(n.WS_ABORT))
                }
                ;
                this.once(Q.WS_CONNECTED, c);
                this.once(Q.WS_CLOSED, e)
            }
            );
            this.connectionState !== ta.CONNECTING && this.connectionState !== ta.RECONNECTING || a === da.JOIN || a === da.REJOIN || await E();
            var u = new B((c,e)=>{
                let g = !1;
                const h = (e,h)=>{
                    g = !0;
                    c({
                        isSuccess: "success" === e,
                        message: h || {}
                    });
                    this.off(Q.WS_CLOSED, m);
                    this.off(Q.WS_RECONNECTING, m);
                    this.emit(Q.REQUEST_SUCCESS, a, b)
                }
                ;
                this.once("res-@".concat(t), h);
                const m = ()=>{
                    e(new p(n.WS_ABORT,"type: ".concat(a)));
                    this.off(Q.WS_CLOSED, m);
                    this.off(Q.WS_RECONNECTING, m);
                    this.off("res-@".concat(t), h)
                }
                ;
                this.once(Q.WS_CLOSED, m);
                this.once(Q.WS_RECONNECTING, m);
                wb(v.SIGNAL_REQUEST_TIMEOUT).then(()=>{
                    this.websocket.connectionID !== q || g || (k.warning("ws request timeout, type: ".concat(a)),
                    this.emit(Q.REQUEST_TIMEOUT, a, b))
                }
                )
            }
            );
            this.websocket.sendMessage(y);
            y = null;
            try {
                y = await u
            } catch (A) {
                if (this.connectionState === ta.CLOSED || a === da.LEAVE)
                    throw new p(n.WS_ABORT);
                return !this.spec.forceWaitGatewayResponse || c ? A.throw() : a === da.JOIN || a === da.REJOIN ? null : (await E(),
                await this.request(a, b))
            }
            if (y.isSuccess)
                return y.message;
            c = Number(y.message.error_code || y.message.code);
            E = vh(c);
            u = new p(n.UNEXPECTED_RESPONSE,l(e = "".concat(E.desc, ": ")).call(e, y.message.error_str),{
                code: c,
                data: y.message
            });
            return "success" === E.action ? y.message : (k.warning(l(g = l(h = l(m = l(r = "[".concat(this.websocket.connectionID, "] unexpected response from type ")).call(r, a, ", error_code: ")).call(m, c, ", message: ")).call(h, E.desc, ", action: ")).call(g, E.action)),
            "failed" === E.action ? u.throw() : "quit" === E.action ? (this.initError = u,
            this.close(),
            u.throw()) : (c === F.ERR_JOIN_BY_MULTI_IP ? (this.multiIpOption = y.message.option,
            k.warning("[".concat(this.clientId, "] detect multi ip, recover")),
            this.reconnect("recover", Ra.MULTI_IP)) : this.reconnect(E.action, Ra.SERVER_ERROR),
            a === da.JOIN || a === da.REJOIN ? null : await this.request(a, b)))
        }
        waitMessage(a, b) {
            return new B(c=>{
                let e = g=>{
                    b && !b(g) || (this.off(a, e),
                    c(g))
                }
                ;
                this.on(a, e)
            }
            )
        }
        upload(a, b) {
            a = {
                _type: a,
                _message: b
            };
            try {
                this.websocket.sendMessage(a)
            } catch (e) {
                k.info("[".concat(this.clientId, "] upload failed, cache message"), e);
                b = v.MAX_UPLOAD_CACHE || 50;
                var c;
                (this.uploadCache.push(a),
                this.uploadCache.length > b) && Ia(c = this.uploadCache).call(c, 0, 1);
                0 < this.uploadCache.length && !this.uploadCacheInterval && (this.uploadCacheInterval = window.setInterval(()=>{
                    var a;
                    if (this.connectionState === ta.CONNECTED) {
                        var b = Ia(a = this.uploadCache).call(a, 0, 1)[0];
                        0 === this.uploadCache.length && (window.clearInterval(this.uploadCacheInterval),
                        this.uploadCacheInterval = void 0);
                        this.upload(b._type, b._message)
                    }
                }
                , v.UPLOAD_CACHE_INTERVAL || 2E3))
            }
        }
        send(a, b) {
            this.websocket.sendMessage({
                _type: a,
                _message: b
            })
        }
        init(a) {
            return this.initError = void 0,
            this.multiIpOption = void 0,
            this.joinResponse = void 0,
            this.reconnectToken = void 0,
            new B((b,c)=>{
                this.once(Q.WS_CONNECTED, ()=>b(this.joinResponse));
                this.once(Q.WS_CLOSED, ()=>c(this.initError || new p(n.WS_ABORT)));
                this.connectionState = ta.CONNECTING;
                this.websocket.init(a).catch(c)
            }
            )
        }
        close(a) {
            this.pingpongTimer && (this.pingpongTimeoutCount = 0,
            window.clearInterval(this.pingpongTimer),
            this.pingpongTimer = void 0);
            this.joinResponse = this.reconnectToken = void 0;
            this._disconnectedReason = a || "LEAVE";
            this.connectionState = ta.CLOSED;
            this.websocket.close()
        }
        async join() {
            var a;
            if (!this.joinResponse) {
                var b = Mc(this, Q.REQUEST_JOIN_INFO);
                b = await this.request(da.JOIN, b);
                if (!b)
                    return this.emit(Q.REPORT_JOIN_GATEWAY, n.TIMEOUT, this.url || ""),
                    !1;
                this.joinResponse = b;
                this.reconnectToken = this.joinResponse.rejoin_token
            }
            return this.connectionState = ta.CONNECTED,
            this.pingpongTimer && window.clearInterval(this.pingpongTimer),
            this.pingpongTimer = window.setInterval(ra(a = this.handlePingPong).call(a, this), 3E3),
            !0
        }
        async rejoin() {
            var a, b;
            if (!this.reconnectToken)
                throw new p(n.UNEXPECTED_ERROR,"can not rejoin, no rejoin token");
            var c = Mc(this, Q.REQUEST_REJOIN_INFO);
            c.token = this.reconnectToken;
            c = await this.request(da.REJOIN, c);
            return !!c && (this.connectionState = ta.CONNECTED,
            this.pingpongTimer && window.clearInterval(this.pingpongTimer),
            this.pingpongTimer = window.setInterval(ra(a = this.handlePingPong).call(a, this), 3E3),
            c.peers && q(b = c.peers).call(b, a=>{
                this.emit(U.ON_USER_ONLINE, {
                    uid: a.uid
                });
                a.audio_mute ? this.emit(U.MUTE_AUDIO, {
                    uid: a.uid
                }) : this.emit(U.UNMUTE_AUDIO, {
                    uid: a.uid
                });
                a.video_mute ? this.emit(U.MUTE_VIDEO, {
                    uid: a.uid
                }) : this.emit(U.UNMUTE_VIDEO, {
                    uid: a.uid
                });
                a.audio_enable_local ? this.emit(U.ENABLE_LOCAL_AUDIO, {
                    uid: a.uid
                }) : this.emit(U.DISABLE_LOCAL_AUDIO, {
                    uid: a.uid
                });
                a.video_enable_local ? this.emit(U.ENABLE_LOCAL_VIDEO, {
                    uid: a.uid
                }) : this.emit(U.DISABLE_LOCAL_VIDEO, {
                    uid: a.uid
                });
                a.audio || a.video || this.emit(U.ON_REMOVE_STREAM, {
                    uid: a.uid,
                    uint_id: a.uint_id
                });
                a.audio && this.emit(U.ON_ADD_AUDIO_STREAM, {
                    uid: a.uid,
                    uint_id: a.uint_id,
                    audio: !0
                });
                a.video && this.emit(U.ON_ADD_VIDEO_STREAM, {
                    uid: a.uid,
                    uint_id: a.uint_id,
                    video: !0
                })
            }
            ),
            !0)
        }
        reconnect(a, b) {
            this.pingpongTimer && (this.pingpongTimeoutCount = 0,
            window.clearInterval(this.pingpongTimer),
            this.pingpongTimer = void 0);
            this.websocket.reconnect(a, b)
        }
        handleNotification(a) {
            k.debug("[".concat(this.clientId, "] receive notification: "), a);
            a = vh(a.code);
            if ("success" !== a.action) {
                if ("failed" !== a.action)
                    return "quit" === a.action ? ("ERR_REPEAT_JOIN_CHANNEL" === a.desc && this.close("UID_BANNED"),
                    void this.close()) : void this.reconnect(a.action, Ra.SERVER_ERROR);
                k.error("[".concat(this.clientId, "] ignore error: "), a.desc)
            }
        }
        handlePingPong() {
            if (this.websocket && "connected" === this.websocket.state) {
                0 < this.pingpongTimeoutCount && this.rttRolling.add(3E3);
                this.pingpongTimeoutCount += 1;
                var a = v.PING_PONG_TIME_OUT
                  , b = x();
                this.pingpongTimeoutCount >= a && (k.warning("PINGPONG Timeout. Last Socket Message: ".concat(b - this.lastMsgTime, "ms")),
                b - this.lastMsgTime > v.WEBSOCKET_TIMEOUT_MIN) ? this.reconnect("retry", Ra.TIMEOUT) : this.request(da.PING, void 0, !0).then(()=>{
                    this.pingpongTimeoutCount = 0;
                    let a = x() - b;
                    this.rttRolling.add(a);
                    v.REPORT_STATS && this.send(da.PING_BACK, {
                        pingpongElapse: a
                    })
                }
                ).catch(a=>{}
                )
            }
        }
        handleWebsocketEvents() {
            this.websocket.on(S.ON_MESSAGE, this.onWebsocketMessage);
            this.websocket.on(S.CLOSED, ()=>{
                this.connectionState = ta.CLOSED
            }
            );
            this.websocket.on(S.FAILED, ()=>{
                this._disconnectedReason = "NETWORK_ERROR";
                this.connectionState = ta.CLOSED
            }
            );
            this.websocket.on(S.RECONNECTING, a=>{
                this._websocketReconnectReason = a;
                this.joinResponse = void 0;
                this.connectionState === ta.CONNECTED ? this.connectionState = ta.RECONNECTING : this.connectionState = ta.CONNECTING
            }
            );
            this.websocket.on(S.WILL_RECONNECT, (a,b)=>{
                if (Mc(this, Q.IS_P2P_DISCONNECTED) && "retry" === a)
                    return this.reconnectToken = void 0,
                    this.emit(Q.NEED_RENEW_SESSION),
                    this.emit(Q.DISCONNECT_P2P),
                    b("tryNext");
                "retry" !== a && (this.reconnectToken = void 0,
                this.emit(Q.NEED_RENEW_SESSION),
                this.emit(Q.DISCONNECT_P2P));
                b(a)
            }
            );
            this.websocket.on(S.CONNECTED, ()=>{
                this.openConnectionTime = x();
                this.reconnectToken ? this.rejoin().catch(a=>{
                    var b;
                    k.warning(l(b = "[".concat(this.clientId, "] rejoin failed ")).call(b, a));
                    this.reconnect("tryNext", Ra.SERVER_ERROR)
                }
                ) : this.join().catch(a=>{
                    if (this.emit(Q.REPORT_JOIN_GATEWAY, a.code, this.url || ""),
                    a instanceof p && a.code === n.UNEXPECTED_RESPONSE && a.data.code === F.ERR_NO_AUTHORIZED)
                        return k.warning("[".concat(this.clientId, "] reconnect no authorized, recover")),
                        void this.reconnect("recover", Ra.SERVER_ERROR);
                    k.error("[".concat(this.clientId, "] join gateway request failed"), a.toString());
                    this.spec.forceWaitGatewayResponse ? this.reconnect("tryNext", Ra.SERVER_ERROR) : (this.initError = a,
                    this.close())
                }
                )
            }
            );
            this.websocket.on(S.REQUEST_NEW_URLS, (a,b)=>{
                La(this, Q.REQUEST_RECOVER, this.multiIpOption).then(a).catch(b)
            }
            )
        }
    }
    class xk extends Sa {
        constructor(a, b) {
            super();
            this._hints = [];
            this._ID = b || qa(8, "track-");
            this._mediaStreamTrack = this._originMediaStreamTrack = a
        }
        toString() {
            return this._ID
        }
        getTrackId() {
            return this._ID
        }
        getMediaStreamTrack() {
            return this._mediaStreamTrack
        }
    }
    class me extends xk {
        constructor(a, b) {
            super(a, b);
            this._enabled = !0;
            this._isClosed = !1;
            this._trackProcessors = [];
            this._handleTrackEnded = ()=>{
                k.debug("[".concat(this.getTrackId, "] track ended"));
                this.emit(fd.TRACK_ENDED)
            }
            ;
            this._enabledMutex = new Mb("".concat(b));
            a.addEventListener("ended", this._handleTrackEnded)
        }
        getTrackLabel() {
            return this._originMediaStreamTrack.label
        }
        close() {
            var a;
            this._isClosed || (this.stop(),
            q(a = this._trackProcessors).call(a, a=>a.destroy()),
            this._trackProcessors = [],
            this._originMediaStreamTrack.stop(),
            this._mediaStreamTrack !== this._originMediaStreamTrack && (this._mediaStreamTrack.stop(),
            this._mediaStreamTrack = null),
            this._originMediaStreamTrack = null,
            this._enabledMutex = null,
            k.debug("[".concat(this.getTrackId(), "] close")),
            this.emit(L.NEED_CLOSE),
            this._isClosed = !0)
        }
        async _registerTrackProcessor(a) {
            var b;
            if (-1 === I(b = this._trackProcessors).call(b, a)) {
                var c = this._trackProcessors[this._trackProcessors.length - 1];
                this._trackProcessors.push(a);
                a.onOutputChange = async()=>{
                    this._mediaStreamTrack = a.output || this._originMediaStreamTrack;
                    this._updatePlayerSource();
                    await Pa(this, L.NEED_REPLACE_TRACK, this._mediaStreamTrack)
                }
                ;
                c ? (c.onOutputChange = async()=>{
                    c.output && await a.setInput(c.output)
                }
                ,
                await a.setInput(c.output || c.input || this._originMediaStreamTrack)) : await a.setInput(this._originMediaStreamTrack)
            }
        }
        _getOutputFromProcessors() {
            if (0 === this._trackProcessors.length)
                return this._originMediaStreamTrack;
            let a = this._trackProcessors[this._trackProcessors.length - 1];
            return a.output || a.input || this._originMediaStreamTrack
        }
        async _updateOriginMediaStreamTrack(a, b) {
            a !== this._originMediaStreamTrack && ((this._originMediaStreamTrack.removeEventListener("ended", this._handleTrackEnded),
            b && this._originMediaStreamTrack.stop(),
            a.addEventListener("ended", this._handleTrackEnded),
            this._originMediaStreamTrack = a,
            0 < this._trackProcessors.length) ? (await this._trackProcessors[0].setInput(a),
            this._mediaStreamTrack = this._getOutputFromProcessors()) : this._mediaStreamTrack = this._originMediaStreamTrack,
            this._updatePlayerSource(),
            await Pa(this, L.NEED_REPLACE_TRACK, this._mediaStreamTrack))
        }
        _getDefaultPlayerConfig() {
            return {}
        }
    }
    let wh = window.AudioContext || window.webkitAudioContext
      , qc = null
      , Pc = new Sa
      , Ge = null;
    class yk extends Sa {
        constructor() {
            super();
            this.isPlayed = !1;
            this.audioOutputLevel = this.audioLevelBase = 0;
            this.audioOutputLevelCache = null;
            this.audioOutputLevelCacheMaxLength = v.AUDIO_SOURCE_AVG_VOLUME_DURATION / v.AUDIO_SOURCE_VOLUME_UPDATE_INTERVAL || 15;
            this.isDestroyed = !1;
            this._noAudioInputCount = 0;
            this.context = Qc();
            this.playNode = this.context.destination;
            this.outputNode = this.context.createGain();
            Rc(this.outputNode);
            this.analyserNode = this.context.createAnalyser()
        }
        get isNoAudioInput() {
            return 3 <= this.noAudioInputCount
        }
        get noAudioInputCount() {
            return this._noAudioInputCount
        }
        set noAudioInputCount(a) {
            3 > this._noAudioInputCount && 3 <= a ? this.onNoAudioInput && this.onNoAudioInput() : 3 <= this._noAudioInputCount && 0 == this._noAudioInputCount % 10 && this.onNoAudioInput && this.onNoAudioInput();
            this._noAudioInputCount = a
        }
        startGetAudioBuffer(a) {
            this.audioBufferNode || (this.audioBufferNode = this.context.createScriptProcessor(a),
            this.outputNode.connect(this.audioBufferNode),
            this.audioBufferNode.connect(this.context.destination),
            this.audioBufferNode.onaudioprocess = a=>{
                this.emit(hb.ON_AUDIO_BUFFER, function(a) {
                    for (let b = 0; b < a.outputBuffer.numberOfChannels; b += 1) {
                        let c = a.outputBuffer.getChannelData(b);
                        for (let a = 0; a < c.length; a += 1)
                            c[a] = 0
                    }
                    return a.inputBuffer
                }(a))
            }
            )
        }
        stopGetAudioBuffer() {
            this.audioBufferNode && (this.audioBufferNode.onaudioprocess = null,
            this.outputNode.disconnect(this.audioBufferNode),
            this.audioBufferNode = void 0)
        }
        createOutputTrack() {
            if (!ca.webAudioMediaStreamDest)
                throw new p(n.NOT_SUPPORTED,"your browser is not support audio processor");
            return this.destNode && this.outputTrack || (this.destNode = this.context.createMediaStreamDestination(),
            this.outputNode.connect(this.destNode),
            this.outputTrack = this.destNode.stream.getAudioTracks()[0]),
            this.outputTrack
        }
        play(a) {
            "running" !== this.context.state && Za(()=>{
                Pc.emit("autoplay-failed")
            }
            );
            this.isPlayed = !0;
            this.playNode = a || this.context.destination;
            this.outputNode.connect(this.playNode)
        }
        stop() {
            if (this.isPlayed)
                try {
                    this.outputNode.disconnect(this.playNode)
                } catch (a) {}
            this.isPlayed = !1
        }
        getAudioLevel() {
            return this.audioOutputLevel
        }
        getAccurateVolumeLevel() {
            let a = new Uint8Array(this.analyserNode.frequencyBinCount);
            this.analyserNode.getByteFrequencyData(a);
            let b = 0;
            for (let c = 0; c < a.length; c++)
                b += a[c];
            return b / a.length
        }
        getAudioAvgLevel() {
            var a;
            null === this.audioOutputLevelCache && (this.audioOutputLevelCache = [this.audioOutputLevel]);
            return qd(a = this.audioOutputLevelCache).call(a, (a,c)=>a + c) / this.audioOutputLevelCache.length
        }
        getAudioVolume() {
            return this.outputNode.gain.value
        }
        setVolume(a) {
            this.outputNode.gain.setValueAtTime(a, this.context.currentTime)
        }
        setMute(a) {
            a ? (this.disconnect(),
            this.audioLevelBase = 0,
            this.audioOutputLevel = 0) : this.connect()
        }
        destroy() {
            this.disconnect();
            this.stop();
            this.isDestroyed = !0;
            this.onNoAudioInput = void 0
        }
        disconnect() {
            this.sourceNode && this.sourceNode.disconnect();
            this.outputNode && this.outputNode.disconnect();
            window.clearInterval(this.updateAudioOutputLevelInterval)
        }
        connect() {
            var a;
            this.sourceNode && this.sourceNode.connect(this.outputNode);
            this.outputNode.connect(this.analyserNode);
            this.updateAudioOutputLevelInterval = window.setInterval(ra(a = this.updateAudioOutputLevel).call(a, this), v.AUDIO_SOURCE_VOLUME_UPDATE_INTERVAL || 400)
        }
        updateAudioOutputLevel() {
            if (this.context && "running" !== this.context.state && this.context.resume(),
            this.analyserNode) {
                if (this.analyserNode.getFloatTimeDomainData) {
                    var a = new Float32Array(this.analyserNode.frequencyBinCount);
                    this.analyserNode.getFloatTimeDomainData(a)
                } else {
                    var b;
                    a = new Uint8Array(this.analyserNode.frequencyBinCount);
                    this.analyserNode.getByteTimeDomainData(a);
                    let c = !0;
                    a = new Float32Array(z(b = Gb(a)).call(b, a=>(128 !== a && (c = !1),
                    .0078125 * (a - 128))));
                    c ? this.noAudioInputCount += 1 : this.noAudioInputCount = 0
                }
                for (b = 0; b < a.length; b += 1)
                    Math.abs(a[b]) > this.audioLevelBase && (this.audioLevelBase = Math.abs(a[b]),
                    1 < this.audioLevelBase && (this.audioLevelBase = 1));
                this.audioOutputLevel = this.audioLevelBase;
                this.audioLevelBase /= 4;
                null !== this.audioOutputLevelCache && (this.audioOutputLevelCache.push(this.audioOutputLevel),
                this.audioOutputLevelCache.length > this.audioOutputLevelCacheMaxLength && this.audioOutputLevelCache.shift())
            }
        }
    }
    class zk extends yk {
        constructor(a, b) {
            if (super(),
            this.isCurrentTrackCloned = !1,
            this.isRemoteTrack = !1,
            this.rebuildWebAudio = ()=>{
                if (k.debug("ready to rebuild web audio, state:", this.context.state),
                !this.isNoAudioInput || this.isDestroyed)
                    return document.body.removeEventListener("click", this.rebuildWebAudio, !0),
                    void k.debug("rebuild web audio success, current volume", this.getAudioLevel());
                this.context.resume().then(()=>k.info("resume success"));
                k.debug("rebuild web audio because of ios 12 bugs");
                this.disconnect();
                var a = this.track;
                this.track = this.track.clone();
                this.isCurrentTrackCloned ? a.stop() : this.isCurrentTrackCloned = !0;
                a = new MediaStream([this.track]);
                this.sourceNode = this.context.createMediaStreamSource(a);
                Rc(this.sourceNode);
                this.analyserNode = this.context.createAnalyser();
                let b = this.outputNode.gain.value;
                this.outputNode = this.context.createGain();
                this.outputNode.gain.setValueAtTime(b, this.context.currentTime);
                Rc(this.outputNode);
                this.connect();
                this.audioElement.srcObject = a;
                this.isPlayed && this.play(this.playNode)
            }
            ,
            "audio" !== a.kind)
                throw new p(n.UNEXPECTED_ERROR);
            this.track = a;
            a = new MediaStream([this.track]);
            this.isRemoteTrack = !!b;
            this.sourceNode = this.context.createMediaStreamSource(a);
            Rc(this.sourceNode);
            this.connect();
            this.audioElement = document.createElement("audio");
            this.audioElement.srcObject = a;
            a = ma();
            b && a.os === W.IOS && (Pc.on("state-change", this.rebuildWebAudio),
            this.onNoAudioInput = ()=>{
                document.body.addEventListener("click", this.rebuildWebAudio, !0)
            }
            )
        }
        get isFreeze() {
            return !1
        }
        updateTrack(a) {
            this.sourceNode.disconnect();
            this.track = a;
            this.isCurrentTrackCloned = !1;
            a = new MediaStream([a]);
            this.sourceNode = this.context.createMediaStreamSource(a);
            Rc(this.sourceNode);
            this.sourceNode.connect(this.outputNode);
            this.audioElement.srcObject = a
        }
        destroy() {
            this.audioElement.remove();
            Pc.off("state-change", this.rebuildWebAudio);
            super.destroy()
        }
    }
    let jb = new class {
        constructor() {
            this.elementMap = new aa;
            this.elementsNeedToResume = [];
            this.sinkIdMap = new aa;
            this.autoResumeAudioElement()
        }
        async setSinkID(a, b) {
            const c = this.elementMap.get(a);
            if (this.sinkIdMap.set(a, b),
            c)
                try {
                    await c.setSinkId(b)
                } catch (e) {
                    throw new p(n.PERMISSION_DENIED,"can not set sink id: " + e.toString());
                }
        }
        play(a, b, c) {
            if (!this.elementMap.has(b)) {
                var e = document.createElement("audio");
                e.autoplay = !0;
                e.srcObject = new MediaStream([a]);
                this.elementMap.set(b, e);
                this.setVolume(b, c);
                (a = this.sinkIdMap.get(b)) && e.setSinkId(a).catch(a=>{
                    k.warning("[".concat(b, "] set sink id failed"), a.toString())
                }
                );
                (a = e.play()) && a.then && a.catch(a=>{
                    k.warning("audio element play warning", a.toString());
                    this.elementMap.has(b) && "NotAllowedError" === a.name && (k.warning("detected audio element autoplay failed"),
                    this.elementsNeedToResume.push(e),
                    Za(()=>{
                        this.onAutoplayFailed && this.onAutoplayFailed()
                    }
                    ))
                }
                )
            }
        }
        updateTrack(a, b) {
            (a = this.elementMap.get(a)) && (a.srcObject = new MediaStream([b]))
        }
        isPlaying(a) {
            return this.elementMap.has(a)
        }
        setVolume(a, b) {
            (a = this.elementMap.get(a)) && (b = Math.max(0, Math.min(100, b)),
            a.volume = b / 100)
        }
        stop(a) {
            var b, c;
            const e = this.elementMap.get(a);
            if (this.sinkIdMap.delete(a),
            e) {
                var g = I(b = this.elementsNeedToResume).call(b, e);
                Ia(c = this.elementsNeedToResume).call(c, g, 1);
                e.srcObject = null;
                e.remove();
                this.elementMap.delete(a)
            }
        }
        autoResumeAudioElement() {
            const a = ()=>{
                var a;
                q(a = this.elementsNeedToResume).call(a, a=>{
                    a.play().then(a=>{
                        k.debug("Auto resume audio element success")
                    }
                    ).catch(a=>{
                        k.warning("Auto resume audio element failed!", a)
                    }
                    )
                }
                );
                this.elementsNeedToResume = []
            }
            ;
            (new B(a=>{
                document.body ? a() : window.addEventListener("load", ()=>a())
            }
            )).then(()=>{
                document.body.addEventListener("touchstart", a, !0);
                document.body.addEventListener("mousedown", a, !0)
            }
            )
        }
    }
    ;
    class Ya extends me {
        constructor(a, b, c) {
            super(a, c);
            this.trackMediaType = "audio";
            this._enabled = !0;
            this._volume = 100;
            this._useAudioElement = !1;
            this._encoderConfig = b;
            this._source = new zk(a);
            ca.webAudioWithAEC || (this._useAudioElement = !0)
        }
        get isPlaying() {
            return this._useAudioElement ? jb.isPlaying(this.getTrackId()) : this._source.isPlayed
        }
        setVolume(a) {
            V(a, "volume", 0, 1E3);
            let b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.LOCAL_AUDIO_TRACK_SET_VOLUME,
                options: [this.getTrackId(), a]
            }, 300);
            this._volume = a;
            this._source.setVolume(a / 100);
            try {
                let a = this._source.createOutputTrack();
                this._mediaStreamTrack !== a && (this._mediaStreamTrack = a,
                Pa(this, L.NEED_REPLACE_TRACK, this._mediaStreamTrack).then(()=>{
                    k.debug("[".concat(this.getTrackId(), "] replace web audio track success"))
                }
                ).catch(a=>{
                    k.warning("[".concat(this.getTrackId(), "] replace web audio track failed"), a)
                }
                ))
            } catch (c) {}
            b.onSuccess()
        }
        getVolumeLevel() {
            return this._source.getAudioLevel()
        }
        async setPlaybackDevice(a) {
            let b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.REMOTE_AUDIO_SET_OUTPUT_DEVICE,
                options: [this.getTrackId(), a]
            });
            if (!this._useAudioElement)
                throw new p(n.NOT_SUPPORTED,"your browser does not support setting the audio output device");
            try {
                await jb.setSinkID(this.getTrackId(), a)
            } catch (c) {
                throw b.onError(c),
                c;
            }
            b.onSuccess()
        }
        async setEnabled(a) {
            var b;
            if (a !== this._enabled) {
                k.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
                var c = await this._enabledMutex.lock();
                if (!a) {
                    this._originMediaStreamTrack.enabled = !1;
                    try {
                        await Pa(this, L.NEED_REMOVE_TRACK, this)
                    } catch (e) {
                        throw k.error("[".concat(this.getTrackId(), "] setEnabled to false error"), e.toString()),
                        c(),
                        e;
                    }
                    return this._enabled = !1,
                    c()
                }
                this._originMediaStreamTrack.enabled = !0;
                try {
                    await Pa(this, L.NEED_ADD_TRACK, this)
                } catch (e) {
                    throw k.error("[".concat(this.getTrackId(), "] setEnabled to true error"), e.toString()),
                    c(),
                    e;
                }
                k.info(l(b = "[".concat(this.getTrackId(), "] setEnabled to ")).call(b, a, " success"));
                this._enabled = !0;
                c()
            }
        }
        getStats() {
            Oc(()=>{
                k.warning("[deprecated] LocalAudioTrack.getStats will be removed in the future, use AgoraRTCClient.getLocalAudioStats instead")
            }
            , "localAudioTrackGetStatsWarning");
            return Wb(this, L.GET_STATS) || Ie({}, je)
        }
        setAudioFrameCallback(a, b=4096) {
            if (!a)
                return this._source.removeAllListeners(hb.ON_AUDIO_BUFFER),
                void this._source.stopGetAudioBuffer();
            this._source.startGetAudioBuffer(b);
            this._source.removeAllListeners(hb.ON_AUDIO_BUFFER);
            this._source.on(hb.ON_AUDIO_BUFFER, b=>a(b))
        }
        play() {
            let a = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.LOCAL_AUDIO_TRACK_PLAY,
                options: [this.getTrackId()]
            });
            k.debug("[".concat(this.getTrackId(), "] start audio playback"));
            this._useAudioElement ? (k.debug("[".concat(this.getTrackId(), "] start audio playback in element")),
            jb.play(this._mediaStreamTrack, this.getTrackId(), this._volume)) : this._source.play();
            a.onSuccess()
        }
        stop() {
            let a = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.LOCAL_AUDIO_TRACK_STOP,
                options: [this.getTrackId()]
            });
            k.debug("[".concat(this.getTrackId(), "] stop audio playback"));
            this._useAudioElement ? jb.stop(this.getTrackId()) : this._source.stop();
            a.onSuccess()
        }
        close() {
            super.close();
            this._source.destroy()
        }
        _updatePlayerSource() {
            k.debug("[track-".concat(this.getTrackId(), "] update player source track"));
            this._source.updateTrack(this._mediaStreamTrack);
            this._useAudioElement && jb.updateTrack(this.getTrackId(), this._mediaStreamTrack)
        }
        async _updateOriginMediaStreamTrack(a, b) {
            this._originMediaStreamTrack !== a && (this._originMediaStreamTrack.removeEventListener("ended", this._handleTrackEnded),
            a.addEventListener("ended", this._handleTrackEnded),
            b && this._originMediaStreamTrack.stop(),
            this._originMediaStreamTrack = a,
            this._source.updateTrack(this._originMediaStreamTrack),
            this._mediaStreamTrack !== this._source.outputTrack && (this._mediaStreamTrack = this._originMediaStreamTrack,
            this._updatePlayerSource(),
            await Pa(this, L.NEED_REPLACE_TRACK, this._mediaStreamTrack)))
        }
    }
    class Yf extends Ya {
        constructor(a, b, c, e) {
            super(a, b.encoderConfig ? vd(b.encoderConfig) : {}, e);
            this._deviceName = "default";
            this._enabled = !0;
            this._config = b;
            this._constraints = c;
            this._deviceName = a.label
        }
        async setDevice(a) {
            var b, c;
            let e = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.MIC_AUDIO_TRACK_SET_DEVICE,
                options: [this.getTrackId(), a]
            });
            if (k.info(l(b = "[".concat(this.getTrackId, "] start set device to ")).call(b, a)),
            this._enabled)
                try {
                    let c = await cb.getDeviceById(a);
                    b = {};
                    b.audio = Ie({}, this._constraints);
                    b.audio.deviceId = {
                        exact: a
                    };
                    this._originMediaStreamTrack.stop();
                    let e = null;
                    try {
                        e = await xb(b, this.getTrackId())
                    } catch (m) {
                        throw k.error("[track-".concat(this.getTrackId(), "] setDevice failed"), m.toString()),
                        e = await xb({
                            video: this._constraints
                        }, this.getTrackId()),
                        await this._updateOriginMediaStreamTrack(e.getAudioTracks()[0], !1),
                        m;
                    }
                    await this._updateOriginMediaStreamTrack(e.getAudioTracks()[0], !1);
                    this._deviceName = c.label;
                    this._config.microphoneId = a;
                    this._constraints.deviceId = {
                        exact: a
                    }
                } catch (g) {
                    throw e.onError(g),
                    k.error("[track-".concat(this.getTrackId(), "] setDevice error"), g.toString()),
                    g;
                }
            else
                try {
                    this._deviceName = (await cb.getDeviceById(a)).label,
                    this._config.microphoneId = a,
                    this._constraints.deviceId = {
                        exact: a
                    }
                } catch (g) {
                    throw e.onError(g),
                    k.error("[track-".concat(this.getTrackId(), "] setDevice error"), g.toString()),
                    g;
                }
            e.onSuccess();
            k.info(l(c = "[".concat(this.getTrackId, "] set device to ")).call(c, a, " success"))
        }
        async setEnabled(a, b) {
            if (b)
                return k.debug("[".concat(this.getTrackId, "] setEnabled false (do not close microphone)")),
                await super.setEnabled(a);
            if (a !== this._enabled) {
                k.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
                b = await this._enabledMutex.lock();
                if (!a) {
                    this._originMediaStreamTrack.onended = null;
                    this._originMediaStreamTrack.stop();
                    this._enabled = !1;
                    try {
                        await Pa(this, L.NEED_REMOVE_TRACK, this)
                    } catch (e) {
                        throw k.error("[".concat(this.getTrackId(), "] setEnabled false failed"), e.toString()),
                        b(),
                        e;
                    }
                    return void b()
                }
                a = Ie({}, this._constraints);
                var c = cb.searchDeviceIdByName(this._deviceName);
                c && !a.deviceId && (a.deviceId = c);
                try {
                    let a = await xb({
                        audio: this._constraints
                    }, this.getTrackId());
                    await this._updateOriginMediaStreamTrack(a.getAudioTracks()[0], !1);
                    await Pa(this, L.NEED_ADD_TRACK, this)
                } catch (e) {
                    throw b(),
                    k.error("[".concat(this.getTrackId(), "] setEnabled true failed"), e.toString()),
                    e;
                }
                this._enabled = !0;
                k.info("[".concat(this.getTrackId(), "] setEnabled success"));
                b()
            }
        }
    }
    class jo extends Ya {
        constructor(a, b, c, e) {
            super(b.createOutputTrack(), c, e);
            this.source = a;
            this._bufferSource = b;
            this._bufferSource.on(hb.AUDIO_SOURCE_STATE_CHANGE, a=>{
                this.emit(fd.SOURCE_STATE_CHANGE, a)
            }
            );
            try {
                this._mediaStreamTrack = this._source.createOutputTrack()
            } catch (g) {}
        }
        get currentState() {
            return this._bufferSource.currentState
        }
        get duration() {
            return this._bufferSource.duration
        }
        getCurrentTime() {
            return this._bufferSource.currentTime
        }
        startProcessAudioBuffer(a) {
            let b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.BUFFER_AUDIO_TRACK_START,
                options: [this.getTrackId(), a, this.duration]
            });
            a && this._bufferSource.updateOptions(a);
            this._bufferSource.startProcessAudioBuffer();
            b.onSuccess()
        }
        pauseProcessAudioBuffer() {
            let a = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.BUFFER_AUDIO_TRACK_PAUSE,
                options: [this.getTrackId()]
            });
            this._bufferSource.pauseProcessAudioBuffer();
            a.onSuccess()
        }
        seekAudioBuffer(a) {
            let b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.BUFFER_AUDIO_TRACK_SEEK,
                options: [this.getTrackId()]
            });
            this._bufferSource.seekAudioBuffer(a);
            b.onSuccess()
        }
        resumeProcessAudioBuffer() {
            let a = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.BUFFER_AUDIO_TRACK_RESUME,
                options: [this.getTrackId()]
            });
            this._bufferSource.resumeProcessAudioBuffer();
            a.onSuccess()
        }
        stopProcessAudioBuffer() {
            let a = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.BUFFER_AUDIO_TRACK_STOP,
                options: [this.getTrackId()]
            });
            this._bufferSource.stopProcessAudioBuffer();
            a.onSuccess()
        }
    }
    class Hc extends Ya {
        constructor() {
            let a = Qc().createMediaStreamDestination();
            super(a.stream.getAudioTracks()[0]);
            try {
                this._mediaStreamTrack = this._source.createOutputTrack()
            } catch (b) {}
            this.destNode = a;
            this.trackList = []
        }
        hasAudioTrack(a) {
            var b;
            return -1 !== I(b = this.trackList).call(b, a)
        }
        addAudioTrack(a) {
            var b;
            -1 === I(b = this.trackList).call(b, a) ? (k.debug("add ".concat(a.getTrackId(), " to mixing track")),
            a._source.outputNode.connect(this.destNode),
            this.trackList.push(a),
            this.updateEncoderConfig()) : k.warning("track is already added")
        }
        removeAudioTrack(a) {
            var b;
            if (-1 !== I(b = this.trackList).call(b, a)) {
                k.debug("remove ".concat(a.getTrackId(), " from mixing track"));
                try {
                    a._source.outputNode.disconnect(this.destNode)
                } catch (c) {}
                Nc(this.trackList, a);
                this.updateEncoderConfig()
            }
        }
        updateEncoderConfig() {
            var a;
            let b = {};
            q(a = this.trackList).call(a, a=>{
                a._encoderConfig && ((a._encoderConfig.bitrate || 0) > (b.bitrate || 0) && (b.bitrate = a._encoderConfig.bitrate),
                (a._encoderConfig.sampleRate || 0) > (b.sampleRate || 0) && (b.sampleRate = a._encoderConfig.sampleRate),
                (a._encoderConfig.sampleSize || 0) > (b.sampleSize || 0) && (b.sampleSize = a._encoderConfig.sampleSize),
                a._encoderConfig.stereo && (b.stereo = !0))
            }
            );
            this._encoderConfig = b
        }
    }
    let ko = (a,b)=>{
        var c = a.length;
        a = (e = a,
        (new TextEncoder).encode(e));
        var e;
        e = function(a, b) {
            if (0 === b)
                return a;
            const c = new a.constructor(a.length + b);
            b = new a.constructor(b);
            return c.set(a, 0),
            c.set(b, a.length),
            c
        }(a, (4 - a.length % 4) % 4);
        c = function(a, b, c) {
            c = new c(a.length + b.length);
            return c.set(a, 0),
            c.set(b, a.length),
            c
        }([c], new Uint32Array(e.buffer), Uint32Array);
        for (e = 0; e < c.length; e++)
            c[e] ^= b,
            c[e] = ~c[e];
        return Dd(new Uint8Array(c.buffer))
    }
      , Zf = new aa;
    class lo extends Sa {
        constructor(a) {
            super();
            this.inChannelInfo = {
                joinAt: null,
                duration: 0
            };
            this._state = "DISCONNECTED";
            this.needToSendUnpubUnsub = new aa;
            this.hasChangeBGPAddress = this.isSignalRecover = !1;
            this.joinGatewayStartTime = 0;
            this._signalTimeout = !1;
            this.clientId = a.clientId;
            this.spec = a;
            this.signal = new io(Je({}, a, {
                retryConfig: a.websocketRetryConfig
            }));
            this._statsCollector = a.statsCollector;
            this.role = a.role || "audience";
            this._clientRoleOptions = a.clientRoleOptions;
            this.handleSignalEvents()
        }
        get state() {
            return this._state
        }
        set state(a) {
            if (a !== this._state) {
                var b = this._state;
                this._state = a;
                "DISCONNECTED" === a && this._disconnectedReason ? this.emit(xa.CONNECTION_STATE_CHANGE, a, b, this._disconnectedReason) : this.emit(xa.CONNECTION_STATE_CHANGE, a, b)
            }
        }
        async join(a, b) {
            var c, e;
            "disabled" !== a.cloudProxyServer && (this.hasChangeBGPAddress = !0);
            let g = x();
            var h = Zf.get(a.cname);
            if (h || (h = new aa,
            Zf.set(a.cname, h)),
            h.has(a.uid))
                throw h = new p(n.UID_CONFLICT),
                u.joinGateway(a.sid, {
                    lts: g,
                    succ: !1,
                    ec: h.code,
                    addr: null,
                    uid: a.uid,
                    cid: a.cid
                }),
                h;
            h.set(a.uid, !0);
            this.joinInfo = a;
            this.key = b;
            b = a.proxyServer ? z(c = a.gatewayAddrs).call(c, b=>{
                var c, e;
                b = b.split(":");
                return l(c = l(e = "wss://".concat(a.proxyServer, "/ws/?h=")).call(e, b[0], "&p=")).call(c, b[1])
            }
            ) : z(e = a.gatewayAddrs).call(e, a=>"wss://".concat(a));
            c = 0;
            this.joinGatewayStartTime = g;
            try {
                c = (await this.signal.init(b)).uid
            } catch (m) {
                throw k.error("[".concat(this.clientId, "] User join failed"), m.toString()),
                u.joinGateway(a.sid, {
                    lts: g,
                    succ: !1,
                    ec: m.code === n.UNEXPECTED_ERROR ? m.message : m.code,
                    addr: this.signal.url,
                    uid: a.uid,
                    cid: a.cid
                }),
                h.delete(a.uid),
                this.signal.close(),
                m;
            }
            return this.state = "CONNECTED",
            this.inChannelInfo.joinAt = x(),
            k.debug("[".concat(this.clientId, "] Connected to gateway server")),
            this.trafficStatsInterval = window.setInterval(()=>{
                this.updateTrafficStats().catch(a=>{
                    k.warning("[".concat(this.clientId, "] get traffic stats error"), a.toString())
                }
                )
            }
            , 3E3),
            this.networkQualityInterval = window.setInterval(()=>{
                navigator && void 0 !== navigator.onLine && !navigator.onLine ? this.emit(xa.NETWORK_QUALITY, {
                    downlinkNetworkQuality: 6,
                    uplinkNetworkQuality: 6
                }) : this._signalTimeout ? this.emit(xa.NETWORK_QUALITY, {
                    downlinkNetworkQuality: 5,
                    uplinkNetworkQuality: 5
                }) : "CONNECTED" === this.state && this._statsCollector.trafficStats ? this.emit(xa.NETWORK_QUALITY, {
                    uplinkNetworkQuality: hh(this._statsCollector.trafficStats.B_unq),
                    downlinkNetworkQuality: hh(this._statsCollector.trafficStats.B_dnq)
                }) : this.emit(xa.NETWORK_QUALITY, {
                    uplinkNetworkQuality: 0,
                    downlinkNetworkQuality: 0
                })
            }
            , 2E3),
            c
        }
        async leave(a=!1) {
            if ("DISCONNECTED" !== this.state) {
                this.state = "DISCONNECTING";
                try {
                    if (!a && this.signal.connectionState === ta.CONNECTED) {
                        var b = this.signal.request(da.LEAVE, void 0, !0);
                        await (3E3 === 1 / 0 ? b : B.race([b, jl(3E3)]))
                    }
                } catch (c) {
                    k.warning("[".concat(this.clientId, "] leave request failed, ignore"), c)
                }
                this.signal.close();
                this.reset();
                this.state = "DISCONNECTED"
            }
        }
        async publish(a, b) {
            if (!this.joinInfo)
                throw new p(n.UNEXPECTED_ERROR,"publish no joinInfo");
            let c = a.getUserId()
              , e = a.videoTrack ? function(a) {
                var b;
                a = a._encoderConfig;
                if (!a)
                    return {};
                const c = {
                    resolution: a.width && a.height ? l(b = "".concat(Pb(a.width), "x")).call(b, Pb(a.height)) : void 0,
                    maxVideoBW: a.bitrateMax,
                    minVideoBW: a.bitrateMin
                };
                return "number" == typeof a.frameRate ? (c.maxFrameRate = a.frameRate,
                c.minFrameRate = a.frameRate) : a.frameRate && (c.maxFrameRate = a.frameRate.max || a.frameRate.ideal || a.frameRate.exact || a.frameRate.min,
                c.minFrameRate = a.frameRate.min || a.frameRate.ideal || a.frameRate.exact || a.frameRate.max),
                c
            }(a.videoTrack) : {};
            if (a.on(H.NEED_ANSWER, (g,h,m)=>{
                var r;
                let l = {
                    state: "offer",
                    stream_type: b,
                    p2p_id: a.pc.ID,
                    sdp: w(g),
                    audio: !!a.audioTrack,
                    video: !!a.videoTrack,
                    screen: a.videoTrack && -1 !== I(r = a.videoTrack._hints).call(r, rb.SCREEN_TRACK),
                    attributes: e,
                    dtx: a.audioTrack instanceof Yf && a.audioTrack._config.DTX,
                    hq: !1,
                    lq: !1,
                    stereo: !1,
                    speech: !1,
                    mode: this.spec.mode,
                    codec: this.spec.codec,
                    extend: v.PUB_EXTEND
                };
                this.signal.request(da.PUBLISH, l, !0).then(a=>{
                    c && this.needToSendUnpubUnsub.set(c, !0);
                    h(JSON.parse(a.sdp))
                }
                ).catch(b=>{
                    if (g.retry && b.data && b.data.code === F.ERR_PUBLISH_REQUEST_INVALID)
                        return k.warning("[".concat(this.clientId, "] receiver publish error code, retry"), b.toString()),
                        La(a, H.NEED_UNPUB).then(()=>{
                            g.retry = !1;
                            La(a, H.NEED_ANSWER, g).then(h).catch(m)
                        }
                        );
                    b.code !== n.WS_ABORT && m(b)
                }
                )
            }
            ),
            a.on(H.NEED_RENEGOTIATE, (c,e,m)=>{
                this.signal.request(da.PUBLISH, {
                    state: "negotiation",
                    stream_type: b,
                    p2p_id: a.pc.ID,
                    sdp: c
                }, !0).then(a=>{
                    e(JSON.parse(a.sdp))
                }
                ).catch(a=>{
                    a.code !== n.WS_ABORT && m(a)
                }
                )
            }
            ),
            a.on(H.NEED_UNPUB, e=>c && !this.needToSendUnpubUnsub.has(c) ? e(!1) : "RECONNECTING" === this.state ? e(!0) : void this.signal.request(da.UNPUBLISH, {
                stream_id: a.getUserId(),
                stream_type: b
            }, !0).then(()=>e(!1)).catch(a=>{
                k.warning("unpublish warning: ", a);
                e(!0)
            }
            )),
            a.on(H.NEED_UPLOAD, (a,c)=>{
                this.signal.upload(a, {
                    stream_type: b,
                    stats: c
                })
            }
            ),
            a.on(H.NEED_SIGNAL_RTT, a=>{
                a(this.signal.rtt)
            }
            ),
            "RECONNECTING" !== this.state) {
                if ("CONNECTED" !== this.state)
                    return (new p(n.INVALID_OPERATION,"can not publish when connection state is ".concat(this.state))).throw();
                await a.startP2PConnection()
            } else
                a.readyToReconnectPC()
        }
        async subscribe(a) {
            if (!this.joinInfo)
                throw new p(n.UNEXPECTED_ERROR,"subscribe no joinInfo");
            let b = a.getUserId();
            if (a.on(H.NEED_ANSWER, (c,e,g)=>{
                var h = a.subscribeOptions;
                h = {
                    stream_id: a.getUserId(),
                    audio: !!h.audio,
                    video: !!h.video,
                    mode: this.spec.mode,
                    codec: this.spec.codec,
                    p2p_id: a.pc.ID,
                    sdp: w(c),
                    tcc: !!v.SUBSCRIBE_TCC,
                    extend: v.SUB_EXTEND
                };
                this.signal.request(da.SUBSCRIBE, h, !0).then(a=>{
                    this.needToSendUnpubUnsub.set(b, !0);
                    e(JSON.parse(a.sdp))
                }
                ).catch(b=>{
                    if (c.retry && b.data && b.data.code === F.ERR_SUBSCRIBE_REQUEST_INVALID)
                        return k.warning("[".concat(this.clientId, "] receiver subscribe error code, retry"), b.toString()),
                        La(a, H.NEED_UNSUB).then(()=>{
                            c.retry = !1;
                            La(a, H.NEED_ANSWER, c).then(e).catch(g)
                        }
                        );
                    b.code !== n.WS_ABORT && g(b)
                }
                )
            }
            ),
            a.on(H.NEED_UNSUB, c=>this.needToSendUnpubUnsub.has(b) ? "RECONNECTING" === this.state ? c(!0) : void this.signal.request(da.UNSUBSCRIBE, {
                stream_id: a.getUserId()
            }, !0).then(()=>c(!1)).catch(a=>{
                k.warning("unsubscribe warning", a);
                c(!0)
            }
            ) : c(!1)),
            a.on(H.NEED_UPLOAD, (b,e)=>{
                this.signal.upload(b, {
                    stream_id: a.getUserId(),
                    stats: e
                })
            }
            ),
            a.on(H.NEED_SIGNAL_RTT, a=>{
                a(this.signal.rtt)
            }
            ),
            "RECONNECTING" !== this.state) {
                if ("CONNECTED" !== this.state)
                    return (new p(n.INVALID_OPERATION,"can not subscribe when connection state is ".concat(this.state))).throw();
                await a.startP2PConnection()
            } else
                a.readyToReconnectPC()
        }
        async subscribeChange(a, b) {
            var c, e;
            if (!this.joinInfo)
                throw new p(n.UNEXPECTED_ERROR,"subscribe no joinInfo");
            if (await a.setSubscribeOptions(b),
            "RECONNECTING" !== this.state) {
                if ("CONNECTED" !== this.state)
                    return (new p(n.INVALID_OPERATION,"can not subscribe change when connection state is ".concat(this.state))).throw();
                k.debug(l(c = l(e = "[".concat(this.clientId, "] send subscribe change, audio: ")).call(e, b.audio, ", video: ")).call(c, b.video));
                await this.signal.request(da.SUBSCRIBE_CHANGE, {
                    stream_id: a.getUserId(),
                    audio: !!b.audio,
                    video: !!b.video
                }, !0)
            }
        }
        async unsubscribe(a) {
            await a.closeP2PConnection()
        }
        getGatewayInfo() {
            return this.signal.request(da.GATEWAY_INFO)
        }
        renewToken(a) {
            return this.signal.request(da.RENEW_TOKEN, {
                token: a
            })
        }
        async setClientRole(a, b) {
            if (b && (this._clientRoleOptions = Ha({}, b)),
            "CONNECTED" !== this.state)
                return void (this.role = a);
            await this.signal.request(da.SET_CLIENT_ROLE, {
                role: a,
                level: "audience" === a ? this._clientRoleOptions && this._clientRoleOptions.level ? this._clientRoleOptions.level : 2 : 0
            });
            this.role = a
        }
        async setRemoteVideoStreamType(a, b) {
            await this.signal.request(da.SWITCH_VIDEO_STREAM, {
                stream_id: a,
                stream_type: b
            })
        }
        async setStreamFallbackOption(a, b) {
            await this.signal.request(da.SET_FALLBACK_OPTION, {
                stream_id: a,
                fallback_type: b
            })
        }
        async pickSVCLayer(a, b) {
            await this.signal.request(da.PICK_SVC_LAYER, {
                stream_id: a,
                spatial_layer: b.spatialLayer,
                temporal_layer: b.temporalLayer
            })
        }
        getInChannelInfo() {
            return this.inChannelInfo.joinAt && (this.inChannelInfo.duration = x() - this.inChannelInfo.joinAt),
            Je({}, this.inChannelInfo)
        }
        async getGatewayVersion() {
            return (await this.signal.request(da.GATEWAY_INFO)).version
        }
        reset() {
            if (this.inChannelInfo.joinAt && (this.inChannelInfo.duration = x() - this.inChannelInfo.joinAt,
            this.inChannelInfo.joinAt = null),
            this.trafficStatsInterval && (window.clearInterval(this.trafficStatsInterval),
            this.trafficStatsInterval = void 0),
            this.joinInfo) {
                let a = Zf.get(this.joinInfo.cname);
                a && a.delete(this.joinInfo.uid)
            }
            this.needToSendUnpubUnsub = new aa;
            this.key = this.joinInfo = void 0;
            this.networkQualityInterval && (window.clearInterval(this.networkQualityInterval),
            this.networkQualityInterval = void 0)
        }
        updateTurnConfigFromSignal() {
            if (this.joinInfo) {
                var a = (a = (("disabled" === this.joinInfo.cloudProxyServer ? this.signal.url : this.joinInfo.gatewayAddrs[this.signal.currentURLIndex]) || "").match(/(wss:\/\/)?([^:]+):(\d+)/)) ? {
                    username: $a.username,
                    password: $a.password,
                    turnServerURL: a[2],
                    tcpport: pa(a[3]) + 30,
                    udpport: pa(a[3]) + 30,
                    forceturn: !1
                } : null;
                this.joinInfo.turnServer.serversFromGateway = [];
                a && "off" !== this.joinInfo.turnServer.mode && "disabled" === this.joinInfo.cloudProxyServer && this.joinInfo.turnServer.serversFromGateway.push(Je({}, $a, {
                    turnServerURL: a.turnServerURL,
                    tcpport: a.tcpport,
                    udpport: a.udpport
                }))
            }
        }
        async updateTrafficStats() {
            var a;
            if ("CONNECTED" === this.state) {
                var b = await this.signal.request(da.TRAFFIC_STATS, void 0, !0);
                b.timestamp = x();
                q(a = b.peer_delay).call(a, a=>{
                    var b;
                    let c = this._statsCollector.trafficStats && R(b = this._statsCollector.trafficStats.peer_delay).call(b, b=>b.peer_uid === a.peer_uid);
                    c && c.B_st !== a.B_st && Za(()=>{
                        this.emit(xa.STREAM_TYPE_CHANGE, a.peer_uid, a.B_st)
                    }
                    )
                }
                );
                this._statsCollector.updateTrafficStats(b)
            }
        }
        getJoinMessage() {
            if (!this.joinInfo || !this.key)
                throw new p(n.UNEXPECTED_ERROR,"can not generate join message, no join info");
            let a = Ha({}, this.joinInfo.apResponse);
            var b = v.REPORT_APP_SCENARIO;
            if ("string" != typeof b)
                try {
                    b = w(b)
                } catch (c) {
                    b = void 0
                }
            b && 128 < b.length && (b = void 0);
            b = {
                session_id: this.joinInfo.sid,
                app_id: this.joinInfo.appId,
                channel_key: this.key,
                channel_name: this.joinInfo.cname,
                sdk_version: Ta,
                browser: navigator.userAgent,
                process_id: v.PROCESS_ID,
                mode: this.spec.mode,
                codec: this.spec.codec,
                role: this.role,
                has_changed_gateway: this.hasChangeBGPAddress,
                ap_response: a,
                extends: v.JOIN_EXTEND,
                details: {
                    6: this.joinInfo.stringUid
                },
                features: {
                    rejoin: !0
                },
                optionalInfo: this.joinInfo.optionalInfo,
                appScenario: b
            };
            return this.joinInfo.stringUid && (b.string_uid = this.joinInfo.stringUid),
            this.joinInfo.aesmode && this.joinInfo.aespassword && (b.aes_mode = this.joinInfo.aesmode,
            v.ENCRYPT_AES ? (b.aes_secret = ko(this.joinInfo.aespassword, a.uid),
            b.aes_encrypt = !0) : b.aes_secret = this.joinInfo.aespassword,
            this.joinInfo.aessalt && (b.aes_salt = this.joinInfo.aessalt)),
            a.addresses[this.signal.websocket.currentURLIndex] && (b.ap_response.ticket = a.addresses[this.signal.websocket.currentURLIndex].ticket,
            delete a.addresses),
            b
        }
        getRejoinMessage() {
            if (!this.joinInfo)
                throw new p(n.UNEXPECTED_ERROR,"can not generate rejoin message, no join info");
            return {
                session_id: this.joinInfo.sid,
                channel_name: this.joinInfo.cname,
                cid: this.joinInfo.cid,
                uid: this.joinInfo.uid,
                vid: Number(this.joinInfo.vid)
            }
        }
        handleSignalEvents() {
            this.signal.on(Q.WS_RECONNECTING, a=>{
                this.joinInfo && u.WebSocketQuit(this.joinInfo.sid, {
                    lts: x(),
                    succ: -1,
                    cname: this.joinInfo.cname,
                    uid: this.joinInfo.uid,
                    cid: this.joinInfo.cid,
                    errorCode: a || Ra.NETWORK_ERROR
                });
                this.joinInfo && (this.state = "RECONNECTING",
                u.sessionInit(this.joinInfo.sid, {
                    lts: (new Date).getTime(),
                    extend: this.isSignalRecover ? {
                        recover: !0
                    } : {
                        rejoin: !0
                    },
                    cname: this.joinInfo.cname,
                    appid: this.joinInfo.appId,
                    mode: this.spec.mode
                }),
                this.isSignalRecover = !1,
                this.joinGatewayStartTime = x())
            }
            );
            this.signal.on(Q.WS_CLOSED, a=>{
                let b;
                switch (a) {
                case "LEAVE":
                    b = Ra.LEAVE;
                    break;
                case "UID_BANNED":
                case "IP_BANNED":
                case "CHANNEL_BANNED":
                case "SERVER_ERROR":
                    b = Ra.SERVER_ERROR;
                    break;
                default:
                    b = Ra.NETWORK_ERROR
                }
                k.debug("[signal] websocket closed, reason: ".concat(b || "undefined -> " + Ra.NETWORK_ERROR));
                this.joinInfo && u.WebSocketQuit(this.joinInfo.sid, {
                    lts: x(),
                    succ: "LEAVE" === a ? 1 : -1,
                    cname: this.joinInfo.cname,
                    uid: this.joinInfo.uid,
                    cid: this.joinInfo.cid,
                    errorCode: b
                });
                this.reset();
                this._disconnectedReason = a;
                this.state = "DISCONNECTED"
            }
            );
            this.signal.on(Q.WS_CONNECTED, ()=>{
                if (this.updateTurnConfigFromSignal(),
                this.state = "CONNECTED",
                this.joinInfo) {
                    var a, b;
                    "audience" === this.role && this._clientRoleOptions && this._clientRoleOptions.level && (k.debug(l(a = l(b = "[".concat(this.clientId, "] patch to send set client role, role: ")).call(b, this.role, ", type: ")).call(a, this._clientRoleOptions.level)),
                    this.setClientRole(this.role, this._clientRoleOptions));
                    u.joinGateway(this.joinInfo.sid, {
                        lts: this.joinGatewayStartTime,
                        succ: !0,
                        ec: null,
                        vid: this.joinInfo.vid,
                        addr: this.signal.url,
                        uid: this.joinInfo.uid,
                        cid: this.joinInfo.cid
                    })
                }
            }
            );
            this.signal.on(U.ON_UPLINK_STATS, a=>{
                this._statsCollector.updateUplinkStats(a)
            }
            );
            this.signal.on(Q.REQUEST_RECOVER, (a,b,c)=>{
                if (!this.joinInfo)
                    return c(new p(n.UNEXPECTED_ERROR,"gateway: can not recover, no join info"));
                a && (this.joinInfo.multiIP = a,
                this.hasChangeBGPAddress = !0);
                this.isSignalRecover = !0;
                La(this, xa.REQUEST_NEW_GATEWAY_LIST).then(b).catch(c)
            }
            );
            this.signal.on(Q.REQUEST_JOIN_INFO, a=>{
                a(this.getJoinMessage())
            }
            );
            this.signal.on(Q.REQUEST_REJOIN_INFO, a=>{
                a(this.getRejoinMessage())
            }
            );
            this.signal.on(Q.REPORT_JOIN_GATEWAY, (a,b)=>{
                this.joinInfo && u.joinGateway(this.joinInfo.sid, {
                    lts: this.joinGatewayStartTime,
                    succ: !1,
                    ec: a,
                    addr: b,
                    uid: this.joinInfo.uid,
                    cid: this.joinInfo.cid
                })
            }
            );
            this.signal.on(Q.IS_P2P_DISCONNECTED, a=>{
                a(Mc(this, xa.IS_P2P_DISCONNECTED))
            }
            );
            this.signal.on(Q.DISCONNECT_P2P, ()=>{
                this.needToSendUnpubUnsub = new aa;
                this.emit(xa.DISCONNECT_P2P)
            }
            );
            this.signal.on(Q.NEED_RENEW_SESSION, ()=>{
                this.emit(xa.NEED_RENEW_SESSION)
            }
            );
            this.signal.on(Q.REQUEST_SUCCESS, ()=>{
                this._signalTimeout = !1
            }
            );
            this.signal.on(Q.REQUEST_TIMEOUT, ()=>{
                this._signalTimeout = !0
            }
            )
        }
    }
    let Ke = 1
      , Me = 1
      , Le = ()=>{
        const a = v.AREAS;
        0 === a.length && a.push("GLOBAL");
        return qd(a).call(a, (a,c,e)=>{
            var b, h, m, k, t;
            c = "OVERSEA" === c ? l(b = l(h = l(m = l(k = l(t = "".concat(ya.ASIA, ",")).call(t, ya.EUROPE, ",")).call(k, ya.AFRICA, ",")).call(m, ya.NORTH_AMERICA, ",")).call(h, ya.SOUTH_AMERICA, ",")).call(b, ya.OCEANIA) : ya[c];
            var n;
            return c ? 0 === e ? c : l(n = "".concat(a, ",")).call(n, c) : a
        }
        , "")
    }
      , mo = new class extends Sa {
        constructor() {
            super();
            this.retryConfig = {
                timeout: 3E3,
                timeoutFactor: 1.5,
                maxRetryCount: 1,
                maxRetryTimeout: 1E4
            };
            this.mutex = new Mb("config-distribute")
        }
        startGetConfigDistribute(a, b) {
            this.joinInfo = a;
            this.cancelToken = b;
            this.interval && this.stopGetConfigDistribute();
            this.updateConfigDistribute();
            this.interval = window.setInterval(()=>{
                this.updateConfigDistribute()
            }
            , v.CONFIG_DISTRIBUTE_INTERVAL)
        }
        stopGetConfigDistribute() {
            this.interval && clearInterval(this.interval);
            this.cancelToken = this.joinInfo = this.interval = void 0
        }
        async awaitConfigDistributeComplete() {
            this.mutex.isLocked && (await this.mutex.lock())()
        }
        async updateConfigDistribute() {
            if (!this.joinInfo || !this.cancelToken || !this.retryConfig)
                return void k.debug("[config-distribute] get config distribute interrupted have no joininfo");
            let a;
            const b = await this.mutex.lock();
            try {
                a = await sl(this.joinInfo, this.cancelToken, this.retryConfig),
                k.debug("[config-distribute] get config distribute", w(a)),
                a.limit_bitrate && this.handleBitrateLimit(a.limit_bitrate),
                this.configs = a
            } catch (c) {
                const a = new p(n.NETWORK_RESPONSE_ERROR,c);
                k.warning("[config-distribute] ".concat(a.toString()))
            } finally {
                b()
            }
        }
        getBitrateLimit() {
            return this.configs ? this.configs.limit_bitrate : void 0
        }
        handleBitrateLimit(a) {
            a && a.uplink && a.id && void 0 !== a.uplink.max_bitrate && void 0 !== a.uplink.min_bitrate && (this.configs && this.configs.limit_bitrate ? this.configs && this.configs.limit_bitrate && this.configs.limit_bitrate.id !== a.id && this.emit(hd.UPDATE_BITRATE_LIMIT, a) : this.emit(hd.UPDATE_BITRATE_LIMIT, a))
        }
        getLowStreamConfigDistribute() {
            return this.configs && this.configs.limit_bitrate && function(a) {
                for (var b = 1; b < arguments.length; b++) {
                    var c, e = null != arguments[b] ? arguments[b] : {};
                    if (b % 2)
                        q(c = Eh(Object(e), !0)).call(c, function(b) {
                            Na(a, b, e[b])
                        });
                    else if (fa)
                        Oa(a, fa(e));
                    else {
                        var g;
                        q(g = Eh(Object(e))).call(g, function(b) {
                            X(a, b, Y(e, b))
                        })
                    }
                }
                return a
            }({}, this.configs.limit_bitrate.low_stream_uplink)
        }
    }
    ;
    var $f = function() {
        function a(a) {
            this.input = [];
            this.size = a
        }
        return a.prototype.add = function(a) {
            this.input.push(a);
            this.input.length > this.size && this.input.splice(0, 1)
        }
        ,
        a.prototype.diffMean = function() {
            return 0 === this.input.length ? 0 : (this.input[this.input.length - 1] - this.input[0]) / this.input.length
        }
        ,
        a
    }(), Gh = function(a, b) {
        return (Gh = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(a, b) {
            a.__proto__ = b
        }
        || function(a, b) {
            for (var c in b)
                b.hasOwnProperty(c) && (a[c] = b[c])
        }
        )(a, b)
    }, ag = function() {
        return (ag = Object.assign || function(a) {
            for (var b, c = 1, e = arguments.length; c < e; c++)
                for (var g in b = arguments[c])
                    Object.prototype.hasOwnProperty.call(b, g) && (a[g] = b[g]);
            return a
        }
        ).apply(this, arguments)
    }, Tb, ld = {
        timestamp: 0,
        bitrate: {
            actualEncoded: 0,
            transmit: 0
        },
        sendPacketLossRate: 0,
        recvPacketLossRate: 0,
        videoRecv: [],
        videoSend: [],
        audioRecv: [],
        audioSend: []
    }, Ak = {
        firsCount: 0,
        nacksCount: 0,
        plisCount: 0,
        framesDecodeCount: 0,
        framesDecodeInterval: 0,
        framesDecodeFreezeTime: 0,
        decodeFrameRate: 0,
        bytes: 0,
        packetsLost: 0,
        packetLostRate: 0,
        packets: 0,
        ssrc: 0
    }, Bk = {
        firsCount: 0,
        nacksCount: 0,
        plisCount: 0,
        frameCount: 0,
        bytes: 0,
        packets: 0,
        packetsLost: 0,
        packetLostRate: 0,
        ssrc: 0,
        rttMs: 0
    }, Ck = {
        bytes: 0,
        packets: 0,
        packetsLost: 0,
        packetLostRate: 0,
        ssrc: 0,
        rttMs: 0
    }, Dk = {
        jitterBufferMs: 0,
        jitterMs: 0,
        bytes: 0,
        packetsLost: 0,
        packetLostRate: 0,
        packets: 0,
        ssrc: 0,
        receivedFrames: 0,
        droppedFrames: 0
    }, bg = function() {
        function a(a, c) {
            var b = this;
            this.videoIsReady = !1;
            this.stats = eb(ld);
            this.isFirstAudioDecoded = this.isFirstAudioReceived = this.isFirstVideoDecoded = this.isFirstVideoReceived = !1;
            this.lossRateWindowStats = [];
            this.pc = a;
            this.options = c;
            this.intervalTimer = window.setInterval(function() {
                return Oe(b, void 0, void 0, function() {
                    return Pe(this, function(a) {
                        return this.updateStats(),
                        [2]
                    })
                })
            }, this.options.updateInterval)
        }
        return a.prototype.getStats = function() {
            return this.stats
        }
        ,
        a.prototype.setVideoIsReady = function(a) {
            this.videoIsReady = a
        }
        ,
        a.prototype.setIsFirstAudioDecoded = function(a) {
            this.isFirstAudioDecoded = a
        }
        ,
        a.prototype.destroy = function() {
            window.clearInterval(this.intervalTimer)
        }
        ,
        a.prototype.calcLossRate = function(a) {
            var b = this;
            this.lossRateWindowStats.push(a);
            this.lossRateWindowStats.length > this.options.lossRateInterval && this.lossRateWindowStats.splice(0, 1);
            for (var e = this.lossRateWindowStats.length, g = 0, h = 0, m = 0, k = 0, l = function(c) {
                a[c].forEach(function(a, r) {
                    if (b.lossRateWindowStats[e - 1][c][r] && b.lossRateWindowStats[0][c][r]) {
                        var l = b.lossRateWindowStats[e - 1][c][r].packets - b.lossRateWindowStats[0][c][r].packets;
                        r = b.lossRateWindowStats[e - 1][c][r].packetsLost - b.lossRateWindowStats[0][c][r].packetsLost;
                        "videoSend" === c || "audioSend" === c ? (g += l,
                        m += r) : (h += l,
                        k += r);
                        Number.isNaN(l) || Number.isNaN(l) ? a.packetLostRate = 0 : a.packetLostRate = 0 >= l || 0 >= r ? 0 : r / (l + r)
                    }
                })
            }, n = 0, p = ["videoSend", "audioSend", "videoRecv", "audioRecv"]; n < p.length; n++)
                l(p[n]);
            a.sendPacketLossRate = 0 >= g || 0 >= m ? 0 : m / (g + m);
            a.recvPacketLossRate = 0 >= h || 0 >= k ? 0 : k / (h + k)
        }
        ,
        a
    }(), no = function(a) {
        function b() {
            var b = null !== a && a.apply(this, arguments) || this;
            return b._stats = ld,
            b.lastDecodeVideoReceiverStats = new Map,
            b
        }
        return Ne(b, a),
        b.prototype.updateStats = function() {
            return Oe(this, void 0, void 0, function() {
                var a, b, g, h;
                return Pe(this, function(c) {
                    switch (c.label) {
                    case 0:
                        return [4, this._getStats()];
                    case 1:
                        return a = c.sent(),
                        b = this.statsResponsesToObjects(a),
                        this._stats = eb(ld),
                        g = b.filter(function(a) {
                            return "ssrc" === a.type
                        }),
                        this.processSSRCStats(g),
                        (h = b.find(function(a) {
                            return "VideoBwe" === a.type
                        })) && this.processBandwidthStats(h),
                        this._stats.timestamp = Date.now(),
                        this.calcLossRate(this._stats),
                        this.stats = this._stats,
                        [2]
                    }
                })
            })
        }
        ,
        b.prototype.processBandwidthStats = function(a) {
            this._stats.bitrate = {
                actualEncoded: Number(a.googActualEncBitrate),
                targetEncoded: Number(a.googTargetEncBitrate),
                retransmit: Number(a.googRetransmitBitrate),
                transmit: Number(a.googTransmitBitrate)
            };
            this._stats.sendBandwidth = Number(a.googAvailableSendBandwidth)
        }
        ,
        b.prototype.processSSRCStats = function(a) {
            var b = this;
            a.forEach(function(a) {
                var c = a.id.includes("send");
                switch (a.mediaType + "_" + (c ? "send" : "recv")) {
                case "video_send":
                    c = eb(Bk);
                    c.codec = a.googCodecName;
                    c.adaptionChangeReason = "none";
                    a.googCpuLimitedResolution && (c.adaptionChangeReason = "cpu");
                    a.googBandwidthLimitedResolution && (c.adaptionChangeReason = "bandwidth");
                    c.avgEncodeMs = Number(a.googAvgEncodeMs);
                    c.inputFrame = {
                        width: Number(a.googFrameWidthInput) || Number(a.googFrameWidthSent),
                        height: Number(a.googFrameHeightInput) || Number(a.googFrameHeightSent),
                        frameRate: Number(a.googFrameRateInput)
                    };
                    c.sentFrame = {
                        width: Number(a.googFrameWidthSent),
                        height: Number(a.googFrameHeightSent),
                        frameRate: Number(a.googFrameRateInput)
                    };
                    c.firsCount = Number(a.googFirReceived);
                    c.nacksCount = Number(a.googNacksReceived);
                    c.plisCount = Number(a.googPlisReceived);
                    c.frameCount = Number(a.framesEncoded);
                    c.bytes = Number(a.bytesSent);
                    c.packets = Number(a.packetsSent);
                    c.packetsLost = Number(a.packetsLost);
                    c.ssrc = Number(a.ssrc);
                    c.rttMs = Number(a.googRtt || 0);
                    b._stats.videoSend.push(c);
                    b._stats.rtt = c.rttMs;
                    break;
                case "video_recv":
                    c = eb(Ak);
                    var e = b.lastDecodeVideoReceiverStats.get(Number(a.ssrc));
                    if (c.codec = a.googCodecName,
                    c.targetDelayMs = Number(a.googTargetDelayMs),
                    c.renderDelayMs = Number(a.googRenderDelayMs),
                    c.currentDelayMs = Number(a.googCurrentDelayMs),
                    c.minPlayoutDelayMs = Number(a.googMinPlayoutDelayMs),
                    c.decodeMs = Number(a.googDecodeMs),
                    c.maxDecodeMs = Number(a.googMaxDecodeMs),
                    c.receivedFrame = {
                        width: Number(a.googFrameWidthReceived),
                        height: Number(a.googFrameHeightReceived),
                        frameRate: Number(a.googFrameRateReceived)
                    },
                    c.decodedFrame = {
                        width: Number(a.googFrameWidthReceived),
                        height: Number(a.googFrameHeightReceived),
                        frameRate: Number(a.googFrameRateDecoded)
                    },
                    c.outputFrame = {
                        width: Number(a.googFrameWidthReceived),
                        height: Number(a.googFrameHeightReceived),
                        frameRate: Number(a.googFrameRateOutput)
                    },
                    c.jitterBufferMs = Number(a.googJitterBufferMs),
                    c.firsCount = Number(a.googFirsSent),
                    c.nacksCount = Number(a.googNacksSent),
                    c.plisCount = Number(a.googPlisSent),
                    c.framesDecodeCount = Number(a.framesDecoded),
                    c.bytes = Number(a.bytesReceived),
                    c.packets = Number(a.packetsReceived),
                    c.packetsLost = Number(a.packetsLost),
                    c.ssrc = Number(a.ssrc),
                    0 < c.packets && !b.isFirstVideoReceived && (b.onFirstVideoReceived && b.onFirstVideoReceived(),
                    b.isFirstVideoReceived = !0),
                    0 < c.framesDecodeCount && !b.isFirstVideoDecoded && (b.onFirstVideoDecoded && b.onFirstVideoDecoded(c.decodedFrame.width, c.decodedFrame.height),
                    b.isFirstVideoDecoded = !0),
                    e) {
                        a = e.stats;
                        var g = Date.now() - e.lts;
                        c.framesDecodeFreezeTime = a.framesDecodeFreezeTime;
                        c.framesDecodeInterval = a.framesDecodeInterval;
                        c.framesDecodeCount > a.framesDecodeCount && b.isFirstVideoDecoded ? (e.lts = Date.now(),
                        c.framesDecodeInterval = g,
                        c.framesDecodeInterval >= b.options.freezeRateLimit && (b.videoIsReady ? c.framesDecodeFreezeTime += c.framesDecodeInterval : b.setVideoIsReady(!0))) : c.framesDecodeCount < e.stats.framesDecodeCount && (c.framesDecodeInterval = 0)
                    }
                    b.lastDecodeVideoReceiverStats.set(c.ssrc, {
                        stats: ag({}, c),
                        lts: Date.now()
                    });
                    b._stats.videoRecv.push(c);
                    break;
                case "audio_recv":
                    c = eb(Dk);
                    c.codec = a.googCodecName;
                    c.outputLevel = Math.abs(Number(a.audioOutputLevel)) / 32767;
                    c.decodingCNG = Number(a.googDecodingCNG);
                    c.decodingCTN = Number(a.googDecodingCTN);
                    c.decodingCTSG = Number(a.googDecodingCTSG);
                    c.decodingNormal = Number(a.googDecodingNormal);
                    c.decodingPLC = Number(a.googDecodingPLC);
                    c.decodingPLCCNG = Number(a.googDecodingPLCCNG);
                    c.expandRate = Number(a.googExpandRate);
                    c.accelerateRate = Number(a.googAccelerateRate);
                    c.preemptiveExpandRate = Number(a.googPreemptiveExpandRate);
                    c.secondaryDecodedRate = Number(a.googSecondaryDecodedRate);
                    c.speechExpandRate = Number(a.googSpeechExpandRate);
                    c.preferredJitterBufferMs = Number(a.googPreferredJitterBufferMs);
                    c.jitterBufferMs = Number(a.googJitterBufferMs);
                    c.jitterMs = Number(a.googJitterReceived);
                    c.bytes = Number(a.bytesReceived);
                    c.packets = Number(a.packetsReceived);
                    c.packetsLost = Number(a.packetsLost);
                    c.ssrc = Number(a.ssrc);
                    c.receivedFrames = Number(a.googDecodingCTN) || Number(a.packetsReceived);
                    c.droppedFrames = Number(a.googDecodingPLC) + Number(a.googDecodingPLCCNG) || Number(a.packetsLost);
                    0 < c.receivedFrames && !b.isFirstAudioReceived && (b.onFirstAudioReceived && b.onFirstAudioReceived(),
                    b.isFirstAudioReceived = !0);
                    0 < c.decodingNormal && !b.isFirstAudioDecoded && (b.onFirstAudioDecoded && b.onFirstAudioDecoded(),
                    b.isFirstAudioDecoded = !0);
                    b._stats.audioRecv.push(c);
                    break;
                case "audio_send":
                    c = eb(Ck),
                    c.codec = a.googCodecName,
                    c.inputLevel = Math.abs(Number(a.audioInputLevel)) / 32767,
                    c.aecReturnLoss = Number(a.googEchoCancellationReturnLoss || 0),
                    c.aecReturnLossEnhancement = Number(a.googEchoCancellationReturnLossEnhancement || 0),
                    c.residualEchoLikelihood = Number(a.googResidualEchoLikelihood || 0),
                    c.residualEchoLikelihoodRecentMax = Number(a.googResidualEchoLikelihoodRecentMax || 0),
                    c.bytes = Number(a.bytesSent),
                    c.packets = Number(a.packetsSent),
                    c.packetsLost = Number(a.packetsLost),
                    c.ssrc = Number(a.ssrc),
                    c.rttMs = Number(a.googRtt || 0),
                    b._stats.rtt = c.rttMs,
                    b._stats.audioSend.push(c)
                }
            })
        }
        ,
        b.prototype._getStats = function() {
            var a = this;
            return new Promise(function(b, c) {
                a.pc.getStats(b, c)
            }
            )
        }
        ,
        b.prototype.statsResponsesToObjects = function(a) {
            var b = [];
            return a.result().forEach(function(a) {
                var c = {
                    id: a.id,
                    timestamp: a.timestamp.valueOf().toString(),
                    type: a.type
                };
                a.names().forEach(function(b) {
                    c[b] = a.stat(b)
                });
                b.push(c)
            }),
            b
        }
        ,
        b
    }(bg);
    !function(a) {
        a.CERTIFICATE = "certificate";
        a.CODEC = "codec";
        a.CANDIDATE_PAIR = "candidate-pair";
        a.LOCAL_CANDIDATE = "local-candidate";
        a.REMOTE_CANDIDATE = "remote-candidate";
        a.INBOUND = "inbound-rtp";
        a.TRACK = "track";
        a.OUTBOUND = "outbound-rtp";
        a.PC = "peer-connection";
        a.REMOTE_INBOUND = "remote-inbound-rtp";
        a.REMOTE_OUTBOUND = "remote-outbound-rtp";
        a.TRANSPORT = "transport";
        a.CSRC = "csrc";
        a.DATA_CHANNEL = "data-channel";
        a.STREAM = "stream";
        a.SENDER = "sender";
        a.RECEIVER = "receiver"
    }(Tb || (Tb = {}));
    var Ek = function(a) {
        function b() {
            var b = null !== a && a.apply(this, arguments) || this;
            return b._stats = ld,
            b.lastDecodeVideoReceiverStats = new Map,
            b.lastVideoFramesRecv = new Map,
            b.lastVideoFramesSent = new Map,
            b.lastVideoFramesDecode = new Map,
            b.lastVideoJBDelay = new Map,
            b.lastAudioJBDelay = new Map,
            b.mediaBytesSent = new Map,
            b.mediaBytesRetransmit = new Map,
            b.mediaBytesTargetEncode = new Map,
            b.lastEncoderMs = new Map,
            b
        }
        return Ne(b, a),
        b.prototype.updateStats = function() {
            return Oe(this, void 0, void 0, function() {
                var a, b = this;
                return Pe(this, function(c) {
                    switch (c.label) {
                    case 0:
                        return a = this,
                        [4, this.pc.getStats()];
                    case 1:
                        return a.report = c.sent(),
                        this._stats = eb(ld),
                        this.report.forEach(function(a) {
                            switch (a.type) {
                            case Tb.OUTBOUND:
                                "audio" === a.mediaType ? b.processAudioOutboundStats(a) : "video" === a.mediaType && b.processVideoOutboundStats(a);
                                break;
                            case Tb.INBOUND:
                                "audio" === a.mediaType ? b.processAudioInboundStats(a) : "video" === a.mediaType && b.processVideoInboundStats(a);
                                break;
                            case Tb.TRANSPORT:
                                (a = b.report.get(a.selectedCandidatePairId)) && b.processCandidatePairStats(a);
                                break;
                            case Tb.CANDIDATE_PAIR:
                                a.selected && b.processCandidatePairStats(a)
                            }
                        }),
                        this.updateSendBitrate(),
                        this._stats.timestamp = Date.now(),
                        this.calcLossRate(this._stats),
                        this.stats = this._stats,
                        [2]
                    }
                })
            })
        }
        ,
        b.prototype.processCandidatePairStats = function(a) {
            this._stats.sendBandwidth = a.availableOutgoingBitrate || 0;
            a.currentRoundTripTime && (this._stats.rtt = 1E3 * a.currentRoundTripTime);
            this._stats.videoSend.forEach(function(b) {
                !b.rttMs && a.currentRoundTripTime && (b.rttMs = 1E3 * a.currentRoundTripTime)
            });
            this._stats.audioSend.forEach(function(b) {
                !b.rttMs && a.currentRoundTripTime && (b.rttMs = 1E3 * a.currentRoundTripTime)
            })
        }
        ,
        b.prototype.processAudioInboundStats = function(a) {
            var b = this._stats.audioRecv.find(function(b) {
                return b.ssrc === a.ssrc
            });
            b || (b = eb(Dk),
            this._stats.audioRecv.push(b));
            b.ssrc = a.ssrc;
            b.packets = a.packetsReceived;
            b.packetsLost = a.packetsLost;
            b.bytes = a.bytesReceived;
            b.jitterMs = 1E3 * a.jitter;
            a.trackId && this.processAudioTrackReceiverStats(a.trackId, b);
            a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId));
            b.receivedFrames || (b.receivedFrames = a.packetsReceived);
            b.droppedFrames || (b.droppedFrames = a.packetsLost);
            0 < b.receivedFrames && !this.isFirstAudioReceived && (this.onFirstAudioReceived && this.onFirstAudioReceived(),
            this.isFirstAudioReceived = !0);
            b.outputLevel && 0 < b.outputLevel && !this.isFirstAudioDecoded && (this.onFirstAudioDecoded && this.onFirstAudioDecoded(),
            this.isFirstAudioDecoded = !0)
        }
        ,
        b.prototype.processVideoInboundStats = function(a) {
            var b = this._stats.videoRecv.find(function(b) {
                return b.ssrc === a.ssrc
            });
            b || (b = eb(Ak),
            this._stats.videoRecv.push(b));
            b.ssrc = a.ssrc;
            b.packets = a.packetsReceived;
            b.packetsLost = a.packetsLost;
            b.bytes = a.bytesReceived;
            b.firsCount = a.firCount;
            b.nacksCount = a.nackCount;
            b.plisCount = a.pliCount;
            b.framesDecodeCount = a.framesDecoded;
            var c = this.lastDecodeVideoReceiverStats.get(b.ssrc)
              , h = this.lastVideoFramesDecode.get(b.ssrc)
              , m = Date.now();
            if (0 < b.framesDecodeCount && !this.isFirstVideoDecoded) {
                var k = b.decodedFrame ? b.decodedFrame.width : 0
                  , l = b.decodedFrame ? b.decodedFrame.height : 0;
                this.onFirstVideoDecoded && this.onFirstVideoDecoded(k, l);
                this.isFirstVideoDecoded = !0
            }
            c && (k = c.stats,
            l = m - c.lts,
            b.framesDecodeFreezeTime = k.framesDecodeFreezeTime,
            b.framesDecodeInterval = k.framesDecodeInterval,
            b.framesDecodeCount > k.framesDecodeCount && this.isFirstVideoDecoded ? (c.lts = Date.now(),
            b.framesDecodeInterval = l,
            b.framesDecodeInterval >= this.options.freezeRateLimit && (this.videoIsReady ? b.framesDecodeFreezeTime += b.framesDecodeInterval : this.setVideoIsReady(!0))) : b.framesDecodeCount < k.framesDecodeCount && (b.framesDecodeInterval = 0));
            h && 800 <= m - h.lts ? (b.decodeFrameRate = Math.round((b.framesDecodeCount - h.count) / ((m - h.lts) / 1E3)),
            this.lastVideoFramesDecode.set(b.ssrc, {
                count: b.framesDecodeCount,
                lts: m,
                rate: b.decodeFrameRate
            })) : h ? b.decodeFrameRate = h.rate : this.lastVideoFramesDecode.set(b.ssrc, {
                count: b.framesDecodeCount,
                lts: m,
                rate: 0
            });
            a.totalDecodeTime && (b.decodeMs = 1E3 * a.totalDecodeTime);
            a.trackId && this.processVideoTrackReceiverStats(a.trackId, b);
            a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId));
            a.framerateMean && (b.framesRateFirefox = a.framerateMean);
            0 < b.packets && !this.isFirstVideoReceived && (this.onFirstVideoReceived && this.onFirstVideoReceived(),
            this.isFirstVideoReceived = !0);
            this.lastDecodeVideoReceiverStats.set(b.ssrc, {
                stats: ag({}, b),
                lts: c ? c.lts : Date.now()
            })
        }
        ,
        b.prototype.processVideoOutboundStats = function(a) {
            var b = this._stats.videoSend.find(function(b) {
                return b.ssrc === a.ssrc
            });
            b || (b = eb(Bk),
            this._stats.videoSend.push(b));
            var c = this.mediaBytesSent.get(a.ssrc);
            c ? c.add(a.bytesSent) : ((h = new $f(10)).add(a.bytesSent),
            this.mediaBytesSent.set(a.ssrc, h));
            void 0 !== a.retransmittedBytesSent && ((c = this.mediaBytesRetransmit.get(a.ssrc)) ? c.add(a.retransmittedBytesSent) : ((h = new $f(10)).add(a.retransmittedBytesSent),
            this.mediaBytesRetransmit.set(a.ssrc, h)));
            if (a.totalEncodedBytesTarget) {
                var h;
                (c = this.mediaBytesTargetEncode.get(a.ssrc)) ? c.add(a.totalEncodedBytesTarget) : ((h = new $f(10)).add(a.totalEncodedBytesTarget),
                this.mediaBytesTargetEncode.set(a.ssrc, h))
            }
            if (b.ssrc = a.ssrc,
            b.bytes = a.bytesSent,
            b.packets = a.packetsSent,
            b.firsCount = a.firCount,
            b.nacksCount = a.nackCount,
            b.plisCount = a.pliCount,
            b.frameCount = a.framesEncoded,
            b.adaptionChangeReason = a.qualityLimitationReason,
            a.totalEncodeTime && a.framesEncoded)
                c = this.lastEncoderMs.get(a.ssrc),
                b.avgEncodeMs = !c || c.lastFrameCount > a.framesEncoded ? 1E3 * a.totalEncodeTime / a.framesEncoded : 1E3 * (a.totalEncodeTime - c.lastEncoderTime) / (a.framesEncoded - c.lastFrameCount),
                this.lastEncoderMs.set(a.ssrc, {
                    lastFrameCount: a.framesEncoded,
                    lastEncoderTime: a.totalEncodeTime,
                    lts: Date.now()
                });
            (a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId)),
            a.mediaSourceId && this.processVideoMediaSource(a.mediaSourceId, b),
            a.trackId && this.processVideoTrackSenderStats(a.trackId, b),
            a.remoteId) ? this.processRemoteInboundStats(a.remoteId, b) : (c = this.findRemoteStatsId(a.ssrc, Tb.REMOTE_INBOUND)) && this.processRemoteInboundStats(c, b)
        }
        ,
        b.prototype.processAudioOutboundStats = function(a) {
            var b = this._stats.audioSend.find(function(b) {
                return b.ssrc === a.ssrc
            });
            if (b || (b = eb(Ck),
            this._stats.audioSend.push(b)),
            b.ssrc = a.ssrc,
            b.packets = a.packetsSent,
            b.bytes = a.bytesSent,
            a.mediaSourceId && this.processAudioMediaSource(a.mediaSourceId, b),
            a.codecId && (b.codec = this.getCodecFromCodecStats(a.codecId)),
            a.trackId && this.processAudioTrackSenderStats(a.trackId, b),
            a.remoteId)
                this.processRemoteInboundStats(a.remoteId, b);
            else {
                var c = this.findRemoteStatsId(a.ssrc, Tb.REMOTE_INBOUND);
                c && this.processRemoteInboundStats(c, b)
            }
        }
        ,
        b.prototype.findRemoteStatsId = function(a, b) {
            var c = Array.from(this.report.values()).find(function(c) {
                return c.type === b && c.ssrc === a
            });
            return c ? c.id : null
        }
        ,
        b.prototype.processVideoMediaSource = function(a, b) {
            (a = this.report.get(a)) && a.width && a.height && a.framesPerSecond && (b.inputFrame = {
                width: a.width,
                height: a.height,
                frameRate: a.framesPerSecond
            })
        }
        ,
        b.prototype.processAudioMediaSource = function(a, b) {
            (a = this.report.get(a)) && (b.inputLevel = a.audioLevel)
        }
        ,
        b.prototype.processVideoTrackSenderStats = function(a, b) {
            if (a = this.report.get(a)) {
                var c = 0
                  , e = Date.now()
                  , k = this.lastVideoFramesSent.get(b.ssrc);
                k && 800 <= e - k.lts ? (c = Math.round((a.framesSent - k.count) / ((e - k.lts) / 1E3)),
                this.lastVideoFramesSent.set(b.ssrc, {
                    count: a.framesSent,
                    lts: e,
                    rate: c
                })) : k ? c = k.rate : this.lastVideoFramesSent.set(b.ssrc, {
                    count: a.framesSent,
                    lts: e,
                    rate: 0
                });
                b.sentFrame = {
                    width: a.frameWidth,
                    height: a.frameHeight,
                    frameRate: c
                }
            }
        }
        ,
        b.prototype.processVideoTrackReceiverStats = function(a, b) {
            if (a = this.report.get(a)) {
                var c = this.lastVideoFramesRecv.get(b.ssrc)
                  , e = Date.now();
                b.framesReceivedCount = a.framesReceived;
                var k = 0;
                if (c && 800 <= e - c.lts ? (k = Math.round((a.framesReceived - c.count) / ((e - c.lts) / 1E3)),
                this.lastVideoFramesRecv.set(b.ssrc, {
                    count: a.framesReceived,
                    lts: e,
                    rate: k
                })) : c ? k = c.rate : this.lastVideoFramesRecv.set(b.ssrc, {
                    count: a.framesReceived,
                    lts: e,
                    rate: 0
                }),
                b.receivedFrame = {
                    width: a.frameWidth || 0,
                    height: a.frameHeight || 0,
                    frameRate: k || 0
                },
                b.decodedFrame = {
                    width: a.frameWidth || 0,
                    height: a.frameHeight || 0,
                    frameRate: b.decodeFrameRate || 0
                },
                b.outputFrame = {
                    width: a.frameWidth || 0,
                    height: a.frameHeight || 0,
                    frameRate: b.decodeFrameRate || 0
                },
                a.jitterBufferDelay && a.jitterBufferEmittedCount)
                    c = this.lastVideoJBDelay.get(b.ssrc),
                    this.lastVideoJBDelay.set(b.ssrc, {
                        jitterBufferDelay: a.jitterBufferDelay,
                        jitterBufferEmittedCount: a.jitterBufferEmittedCount
                    }),
                    c || (c = {
                        jitterBufferDelay: 0,
                        jitterBufferEmittedCount: 0
                    }),
                    a = 1E3 * (a.jitterBufferDelay - c.jitterBufferDelay) / (a.jitterBufferEmittedCount - c.jitterBufferEmittedCount),
                    b.jitterBufferMs = a,
                    b.currentDelayMs = Math.round(a)
            }
        }
        ,
        b.prototype.processAudioTrackSenderStats = function(a, b) {
            (a = this.report.get(a)) && (b.aecReturnLoss = a.echoReturnLoss || 0,
            b.aecReturnLossEnhancement = a.echoReturnLossEnhancement || 0)
        }
        ,
        b.prototype.processAudioTrackReceiverStats = function(a, b) {
            if (a = this.report.get(a)) {
                if (a.removedSamplesForAcceleration && a.totalSamplesReceived && (b.accelerateRate = a.removedSamplesForAcceleration / a.totalSamplesReceived),
                a.jitterBufferDelay && a.jitterBufferEmittedCount) {
                    var c = this.lastAudioJBDelay.get(b.ssrc);
                    this.lastAudioJBDelay.set(b.ssrc, {
                        jitterBufferDelay: a.jitterBufferDelay,
                        jitterBufferEmittedCount: a.jitterBufferEmittedCount
                    });
                    c || (c = {
                        jitterBufferDelay: 0,
                        jitterBufferEmittedCount: 0
                    });
                    b.jitterBufferMs = Math.round(1E3 * (a.jitterBufferDelay - c.jitterBufferDelay) / (a.jitterBufferEmittedCount - c.jitterBufferEmittedCount))
                }
                b.outputLevel = a.audioLevel;
                c = 1920;
                a.totalSamplesDuration && a.totalSamplesReceived && (c = a.totalSamplesReceived / a.totalSamplesDuration / 50,
                b.receivedFrames = Math.round(a.totalSamplesReceived / c));
                a.concealedSamples && (b.droppedFrames = Math.round(a.concealedSamples / c))
            }
        }
        ,
        b.prototype.processRemoteInboundStats = function(a, b) {
            (a = this.report.get(a)) && (b.packetsLost = a.packetsLost,
            a.roundTripTime && (b.rttMs = 1E3 * a.roundTripTime))
        }
        ,
        b.prototype.getCodecFromCodecStats = function(a) {
            a = this.report.get(a);
            return a ? (a = a.mimeType.match(/\/(.*)$/)) && a[1] ? a[1] : "" : ""
        }
        ,
        b.prototype.updateSendBitrate = function() {
            var a = 0
              , b = null
              , g = null;
            this.mediaBytesSent.forEach(function(b) {
                a += b.diffMean()
            });
            this.mediaBytesRetransmit.forEach(function(a) {
                b = null === b ? a.diffMean() : b + a.diffMean()
            });
            this.mediaBytesTargetEncode.forEach(function(a) {
                g = null === g ? a.diffMean() : g + a.diffMean()
            });
            this._stats.bitrate = {
                actualEncoded: 8 * (null !== b ? a - b : a) / (this.options.updateInterval / 1E3),
                transmit: 8 * a / (this.options.updateInterval / 1E3)
            };
            null !== b && (this._stats.bitrate.retransmit = 8 * b / (this.options.updateInterval / 1E3));
            null !== g && (this._stats.bitrate.targetEncoded = 8 * g / (this.options.updateInterval / 1E3))
        }
        ,
        b
    }(bg)
      , oo = function(a) {
        function b() {
            return null !== a && a.apply(this, arguments) || this
        }
        return Ne(b, a),
        b.prototype.updateStats = function() {
            return Promise.resolve()
        }
        ,
        b
    }(bg);
    class Fk {
        constructor(a) {
            this.localCandidateCount = 0;
            this.allCandidateReceived = !1;
            this.videoTrack = this.audioTrack = null;
            this.mediaStream = new MediaStream;
            this.ID = Gk;
            Gk += 1;
            this.spec = a;
            this.createPeerConnection();
            a = this.pc;
            var b = void 0
              , c = void 0
              , e = Ad() ? 1200 : void 0;
            void 0 === b && (b = 250);
            void 0 === c && (c = 8);
            void 0 === e && (e = 500);
            var g, h = (g = navigator.userAgent.toLocaleLowerCase().match(/chrome\/[\d]./i)) && g[0] ? Number(g[0].split("/")[1]) : null;
            this.statsFilter = h ? 76 > h ? new no(a,{
                updateInterval: b,
                lossRateInterval: c,
                freezeRateLimit: e
            }) : new Ek(a,{
                updateInterval: b,
                lossRateInterval: c,
                freezeRateLimit: e
            }) : window.RTCStatsReport && a.getStats()instanceof Promise ? new Ek(a,{
                updateInterval: b,
                lossRateInterval: c,
                freezeRateLimit: e
            }) : new oo(a,{
                updateInterval: b,
                lossRateInterval: c,
                freezeRateLimit: e
            })
        }
        get _statsFilter() {
            return this.statsFilter
        }
        getStats() {
            return this.statsFilter.getStats()
        }
        async createOfferSDP() {
            try {
                let a = await this.pc.createOffer(this.offerOptions);
                if (!a.sdp)
                    throw Error("offer sdp is empty");
                return a.sdp
            } catch (a) {
                throw k.error("create offer error:", a.toString()),
                new p(n.CREATE_OFFER_FAILED,a.toString());
            }
        }
        async setOfferSDP(a) {
            try {
                await this.pc.setLocalDescription({
                    type: "offer",
                    sdp: a
                })
            } catch (b) {
                throw k.error("set local offer error", b.toString()),
                new p(n.CREATE_OFFER_FAILED,b.toString());
            }
        }
        async setAnswerSDP(a) {
            try {
                await this.pc.setRemoteDescription({
                    type: "answer",
                    sdp: a
                })
            } catch (b) {
                if ("InvalidStateError" !== b.name || "stable" !== this.pc.signalingState)
                    throw k.error("set remote answer error", b.toString()),
                    new p(n.SET_ANSWER_FAILED,b.toString());
                k.debug("[pc-".concat(this.ID, "] ignore invalidstate error"))
            }
        }
        close() {
            this.onConnectionStateChange = this.onICEConnectionStateChange = void 0;
            try {
                this.pc.close(),
                this.pc = null
            } catch (a) {}
            this.statsFilter.destroy()
        }
        createPeerConnection() {
            let a = {
                iceServers: [{
                    urls: "stun:webcs.agora.io:3478"
                }]
            }
              , b = a=>{
                const b = [];
                return q(a).call(a, a=>{
                    if (a.security) {
                        var c;
                        a.tcpport && b.push({
                            username: a.username,
                            credential: a.password,
                            credentialType: "password",
                            urls: l(c = "turns:".concat((h = a.turnServerURL,
                            h.match(/^[\.:\d]+$/) ? "".concat(h.replace(/[^\d]/g, "-"), ".edge.agora.io") : (k.info("Cannot recognized as IP address ".concat(h, ". Used As Host instead")),
                            h)), ":")).call(c, a.tcpport, "?transport=tcp")
                        })
                    } else {
                        var e, g;
                        a.udpport && b.push({
                            username: a.username,
                            credential: a.password,
                            credentialType: "password",
                            urls: l(e = "turn:".concat(a.turnServerURL, ":")).call(e, a.udpport, "?transport=udp")
                        });
                        a.tcpport && b.push({
                            username: a.username,
                            credential: a.password,
                            credentialType: "password",
                            urls: l(g = "turn:".concat(a.turnServerURL, ":")).call(g, a.tcpport, "?transport=tcp")
                        })
                    }
                    var h
                }
                ),
                b
            }
            ;
            var c;
            this.spec.iceServers ? a.iceServers = this.spec.iceServers : this.spec.turnServer && "off" !== this.spec.turnServer.mode && ($g(this.spec.turnServer.servers) ? a.iceServers = this.spec.turnServer.servers : (a.iceServers && a.iceServers.push(...b(this.spec.turnServer.servers)),
            a.iceServers && this.spec.turnServer.serversFromGateway && a.iceServers.push(...b(this.spec.turnServer.serversFromGateway)),
            q(c = this.spec.turnServer.servers).call(c, b=>{
                b.forceturn && (a.iceTransportPolicy = "relay")
            }
            )));
            v.CHROME_FORCE_PLAN_B && Bd() && (a.sdpSemantics = "plan-b",
            ca.supportUnifiedPlan = !1);
            this.pc = new RTCPeerConnection(a,{
                optional: [{
                    googDscp: !0
                }]
            });
            this.pc.oniceconnectionstatechange = ()=>{
                this.onICEConnectionStateChange && this.onICEConnectionStateChange(this.pc.iceConnectionState)
            }
            ;
            this.pc.onconnectionstatechange = ()=>{
                this.onConnectionStateChange && this.onConnectionStateChange(this.pc.connectionState)
            }
            ;
            this.pc.onsignalingstatechange = ()=>{
                "closed" === this.pc.connectionState && this.onConnectionStateChange && this.onConnectionStateChange(this.pc.connectionState)
            }
            ;
            this.pc.onicecandidateerror = a=>{
                var b, c, e;
                a && k.debug(l(b = l(c = l(e = "[pc-".concat(this.ID, "] ice candidate error ")).call(e, a.url, ", code: ")).call(c, a.errorCode, ", ")).call(b, a.errorText))
            }
            ;
            this.pc.onicecandidate = a=>{
                if (!a.candidate)
                    return this.pc.onicecandidate = null,
                    this.allCandidateReceived = !0,
                    void k.debug("[pc-".concat(this.ID, "] local candidate count"), this.localCandidateCount);
                this.localCandidateCount += 1
            }
            ;
            gc(()=>{
                this.allCandidateReceived || (this.allCandidateReceived = !0,
                k.debug("[pc-".concat(this.ID, "] onicecandidate timeout, local candidate count"), this.localCandidateCount))
            }
            , v.CANDIDATE_TIMEOUT)
        }
    }
    class Hk extends Fk {
        constructor(a) {
            super(a)
        }
        async setOfferSDP(a) {
            let b = v.CUSTOM_PUB_OFFER_MODIFIER;
            return b && (a = b(a)),
            await super.setOfferSDP(a)
        }
        async setAnswerSDP(a) {
            let b = v.CUSTOM_PUB_ANSWER_MODIFIER;
            return b && (a = b(a)),
            await super.setAnswerSDP(a)
        }
        getAnswerSDP() {
            return this.pc.remoteDescription
        }
        getOfferSDP() {
            return this.pc.localDescription
        }
        async addStream(a) {
            a = a.getTracks();
            for (let b of a)
                await this.addTrack(b)
        }
        async replaceTrack(a) {
            if (!ca.supportReplaceTrack) {
                var b = "audio" === a.kind ? this.audioTrack : this.videoTrack;
                if (!b)
                    throw new p(n.UNEXPECTED_ERROR,"can not find replaced track");
                return this.removeTrack(b),
                await this.addTrack(a),
                !0
            }
            let c = this.getSender(a.kind)
              , e = R(b = this.mediaStream.getTracks()).call(b, b=>b.kind === a.kind);
            e && this.mediaStream.removeTrack(e);
            this.mediaStream.addTrack(a);
            try {
                await c.replaceTrack(a),
                "audio" === a.kind ? this.audioTrack = a : this.videoTrack = a
            } catch (g) {
                throw new p(n.SENDER_REPLACE_FAILED,g.toString());
            }
            return !1
        }
        removeTrack(a) {
            let b = this.getSender(a.kind);
            this.mediaStream.removeTrack(a);
            try {
                this.pc.removeTrack(b)
            } catch (c) {
                k.warning("[pc-".concat(this.ID, "] remove track error, ignore"), c)
            }
            "audio" === a.kind ? (this.audioTrack = null,
            this.audioSender = void 0,
            this.audioTransceiver && (this.audioTransceiver.direction = "inactive"),
            this.audioTransceiver = void 0) : (this.videoTrack = null,
            this.videoSender = void 0,
            this.videoTransceiver && (this.videoTransceiver.direction = "inactive"),
            this.videoTransceiver = void 0)
        }
        onOfferSettled() {
            Bd() && (this.audioSender && v.DSCP_TYPE && this.setAudioRtpEncodingParameters({
                networkPriority: v.DSCP_TYPE
            }).catch(a=>{
                k.debug("set audio sender`s network priority failed")
            }
            ),
            this.videoSender && v.DSCP_TYPE && this.setVideoRtpEncodingParameters({
                networkPriority: v.DSCP_TYPE
            }).catch(a=>{
                k.debug("set video sender`s network priority failed")
            }
            ))
        }
        async addTrack(a) {
            let b = ca;
            if ("audio" === a.kind && this.audioTrack || "video" === a.kind && this.videoTrack)
                throw new p(n.UNEXPECTED_ERROR,"Can't add multiple stream");
            let c, e;
            this.mediaStream.addTrack(a);
            b.supportUnifiedPlan ? (c = await async function(a, b, c) {
                var e;
                let g = R(e = a.getTransceivers()).call(e, a=>"inactive" === a.direction && a.receiver.track.kind === b.kind);
                return g ? (g.direction = "sendrecv",
                await g.sender.replaceTrack(b),
                g) : a.addTransceiver(b, {
                    direction: "sendrecv",
                    streams: [c]
                })
            }(this.pc, a, this.mediaStream),
            e = c.sender) : e = this.pc.addTrack(a, this.mediaStream);
            "audio" === a.kind ? (this.audioTrack = a,
            this.audioSender = e,
            this.audioTransceiver = c) : (this.videoTrack = a,
            this.videoSender = e,
            this.videoTransceiver = c)
        }
        async setRtpSenderParameters(a, b) {
            if (a = this.videoSender || (this.videoTransceiver ? this.videoTransceiver.sender : void 0)) {
                var c = a.getParameters();
                c.degradationPreference = b;
                try {
                    await a.setParameters(c)
                } catch (e) {
                    k.debug("[".concat(this.ID, "] ignore RtpSender.setParameters"), e.toString())
                }
            }
        }
        async setVideoRtpEncodingParameters(a) {
            let b = this.videoSender || (this.videoTransceiver ? this.videoTransceiver.sender : void 0);
            if (!b)
                throw new p(n.LOW_STREAM_ENCODING_ERROR,"Low stream has no video sender.");
            let c = b.getParameters();
            if (!c.encodings || !c.encodings[0])
                throw new p(n.LOW_STREAM_ENCODING_ERROR,"Low stream RtpEncodingParameters is empty.");
            a.scaleResolutionDownBy && (c.encodings[0].scaleResolutionDownBy = a.scaleResolutionDownBy);
            a.maxBitrate && (c.encodings[0].maxBitrate = a.maxBitrate);
            a.maxFramerate && (c.encodings[0].maxFramerate = a.maxFramerate);
            let e = ["very-low", "low", "medium", "high"];
            return a.networkPriority && oa(e).call(e, a.networkPriority) && (k.debug("set video sender network quality:", a.networkPriority),
            c.encodings[0].networkPriority = a.networkPriority),
            await b.setParameters(c),
            b.getParameters()
        }
        async setAudioRtpEncodingParameters(a) {
            let b = this.audioSender || (this.audioTransceiver ? this.audioTransceiver.sender : void 0);
            if (!b)
                throw new p(n.SET_ENCODING_PARAMETER_ERROR,"pc has no audio sender.");
            let c = b.getParameters();
            if (!c.encodings || !c.encodings[0])
                throw new p(n.SET_ENCODING_PARAMETER_ERROR,"pc RtpEncodingParameters is empty.");
            let e = ["very-low", "low", "medium", "high"];
            return a.networkPriority && oa(e).call(e, a.networkPriority) && (k.debug("set audio sender network quality:", a.networkPriority),
            c.encodings[0].networkPriority = a.networkPriority),
            await b.setParameters(c),
            b.getParameters()
        }
        getSender(a) {
            var b = null;
            if (ca.supportUnifiedPlan) {
                var c;
                b = (b = R(c = this.pc.getTransceivers()).call(c, b=>b.sender.track && b.sender.track.kind === a)) ? b.sender : null
            } else {
                var e;
                b = R(e = this.pc.getSenders()).call(e, b=>b.track && b.track.kind === a) || null
            }
            if (!b)
                throw new p(n.SENDER_NOT_FOUND);
            return b
        }
    }
    class Ik extends Fk {
        constructor(a) {
            super(a);
            this.statsFilter.onFirstAudioDecoded = ()=>this.onFirstAudioDecoded && this.onFirstAudioDecoded();
            this.statsFilter.onFirstVideoDecoded = (a,c)=>this.onFirstVideoDecoded && this.onFirstVideoDecoded(a, c);
            this.statsFilter.onFirstAudioReceived = ()=>this.onFirstAudioReceived && this.onFirstAudioReceived();
            this.statsFilter.onFirstVideoReceived = ()=>this.onFirstVideoReceived && this.onFirstVideoReceived();
            ca.supportUnifiedPlan ? (this.audioTransceiver = this.pc.addTransceiver("audio", {
                direction: "recvonly"
            }),
            this.videoTransceiver = this.pc.addTransceiver("video", {
                direction: "recvonly"
            })) : this.offerOptions = {
                offerToReceiveAudio: !0,
                offerToReceiveVideo: !0
            };
            this.pc.ontrack = a=>{
                "audio" === a.track.kind ? this.audioTrack = a.track : this.videoTrack = a.track;
                this.onTrack && this.onTrack(a.track, a.streams[0])
            }
        }
        async setOfferSDP(a) {
            let b = v.CUSTOM_SUB_OFFER_MODIFIER;
            return b && (a = b(a)),
            await super.setOfferSDP(a)
        }
        async setAnswerSDP(a) {
            let b = v.CUSTOM_SUB_ANSWER_MODIFIER;
            return b && (a = b(a)),
            await super.setAnswerSDP(a)
        }
    }
    let Gk = 1
      , Jk = 1;
    class Kk extends Sa {
        constructor(a, b) {
            super();
            this.startTime = x();
            this.createTime = x();
            this.readyToReconnect = !1;
            this._connectionState = "disconnected";
            this.currentReconnectCount = 0;
            this.ID = Jk;
            Jk += 1;
            this.joinInfo = a;
            this._userId = b;
            this.createPC()
        }
        get connectionState() {
            return this._connectionState
        }
        set connectionState(a) {
            a !== this._connectionState && (this.emit(H.CONNECTION_STATE_CHANGE, a, this._connectionState),
            this._connectionState = a)
        }
        get connectionId() {
            var a, b;
            return l(a = l(b = "".concat(this.joinInfo.clientId, "-")).call(b, this.type ? this.type : "sub(".concat(this._userId, ")"), "-")).call(a, this.ID)
        }
        getUserId() {
            return this._userId
        }
        startUploadStats() {
            this.statsUploadInterval = window.setInterval(()=>{
                let a = this.pc.getStats();
                this.uploadStats(a, this.lastUploadPCStats);
                this.lastUploadPCStats = a
            }
            , 3E3);
            this.statsUploadSlowInterval = window.setInterval(()=>{
                let a = this.pc.getStats();
                this.uploadSlowStats(a)
            }
            , 6E4);
            this.relatedStatsUploadInterval = window.setInterval(()=>{
                let a = this.pc.getStats();
                this.uploadRelatedStats(a, this.lastRelatedPcStats);
                this.lastRelatedPcStats = a
            }
            , 1E3)
        }
        stopUploadStats() {
            this.statsUploadInterval && window.clearInterval(this.statsUploadInterval);
            this.relatedStatsUploadInterval && window.clearInterval(this.relatedStatsUploadInterval);
            this.relatedStatsUploadInterval = this.statsUploadInterval = void 0
        }
        createWaitConnectionConnectedPromise() {
            return new B((a,b)=>{
                "disconnected" === this.connectionState ? b() : "connected" === this.connectionState ? a() : this.once(H.CONNECTION_STATE_CHANGE, c=>{
                    "connected" === c ? a() : b()
                }
                )
            }
            )
        }
        async reconnectPC(a) {
            if (this.readyToReconnect = !1,
            a && this.onPCDisconnected(a),
            Infinity < this.currentReconnectCount)
                throw k.debug("[".concat(this.connectionId, "] cannot reconnect pc")),
                a || new p(n.UNEXPECTED_ERROR);
            this.stopUploadStats();
            k.debug("[".concat(this.connectionId, "] start reconnect pc"));
            this.connectionState = "connecting";
            this.currentReconnectCount += 1;
            if (await this.closePC())
                return k.debug("[".concat(this.connectionId, "] abort reconnect pc, wait ws")),
                void this.readyToReconnectPC();
            this.createPC();
            await this.startP2PConnection();
            this.currentReconnectCount = 0
        }
        readyToReconnectPC() {
            this.stopUploadStats();
            this.readyToReconnect = !0;
            this.pc.onICEConnectionStateChange = void 0;
            this.connectionState = "connecting"
        }
        updateICEPromise() {
            this.removeAllListeners(H.GATEWAY_P2P_LOST);
            this.icePromise = new B((a,b)=>{
                this.pc.onICEConnectionStateChange = c=>{
                    var e, g;
                    k.info(l(e = l(g = "[".concat(this.connectionId, "] ice-state: ")).call(g, this.type, " p2p ")).call(e, c));
                    "connected" === c && a();
                    "failed" !== c && "closed" !== c || this.reconnectPC(new p(n.ICE_FAILED)).catch(a=>{
                        this.emit(H.P2P_LOST);
                        b(a)
                    }
                    )
                }
                ;
                this.pc.onConnectionStateChange = a=>{
                    var c, g;
                    k.info(l(c = l(g = "[".concat(this.connectionId, "] connection-state: ")).call(g, this.type, " p2p ")).call(c, a));
                    "failed" !== a && "closed" !== a || this.reconnectPC(new p(n.PC_CLOSED)).catch(a=>{
                        this.emit(H.P2P_LOST);
                        b(a)
                    }
                    )
                }
                ;
                this.removeAllListeners(H.GATEWAY_P2P_LOST);
                this.once(H.GATEWAY_P2P_LOST, a=>{
                    var c;
                    if (this.pc.ID.toString() === a.toString()) {
                        if (k.info(l(c = "[".concat(this.connectionId, "] ")).call(c, this.type, " p2p gateway lost")),
                        this.pc.allCandidateReceived && 0 === this.pc.localCandidateCount)
                            return this.disconnectedReason = new p(n.NO_ICE_CANDIDATE,"can not get candidate in this pc"),
                            void this.closeP2PConnection(!0);
                        this.reconnectPC(new p(n.GATEWAY_P2P_LOST)).catch(a=>{
                            this.emit(H.P2P_LOST);
                            b(a)
                        }
                        )
                    }
                }
                )
            }
            )
        }
    }
    class Lk {
        constructor(a) {
            this.freezeTimeCounterList = [];
            this.lastTimeUpdatedTime = this.playbackTime = this.freezeTime = this.timeUpdatedCount = 0;
            this._videoElementStatus = Ca.NONE;
            this.isGettingVideoDimensions = !1;
            this.handleVideoEvents = a=>{
                switch (a.type) {
                case "play":
                case "playing":
                    this.startGetVideoDimensions();
                    this.videoElementStatus = Ca.PLAYING;
                    break;
                case "loadeddata":
                    this.onFirstVideoFrameDecoded && this.onFirstVideoFrameDecoded();
                    break;
                case "canplay":
                    this.videoElementStatus = Ca.CANPLAY;
                    break;
                case "stalled":
                    this.videoElementStatus = Ca.STALLED;
                    break;
                case "suspend":
                    this.videoElementStatus = Ca.SUSPEND;
                    break;
                case "pause":
                    this.videoElementStatus = Ca.PAUSED;
                    this.videoElement && this.videoTrack && "live" === this.videoTrack.readyState && (k.debug("[track-".concat(this.trackId, "] video element paused, auto resume")),
                    this.videoElement.play());
                    break;
                case "waiting":
                    this.videoElementStatus = Ca.WAITING;
                    break;
                case "abort":
                    this.videoElementStatus = Ca.ABORT;
                    break;
                case "ended":
                    this.videoElementStatus = Ca.ENDED;
                    break;
                case "emptied":
                    this.videoElementStatus = Ca.EMPTIED;
                    break;
                case "timeupdate":
                    {
                        a = x();
                        if (this.timeUpdatedCount += 1,
                        10 > this.timeUpdatedCount)
                            return void (this.lastTimeUpdatedTime = a);
                        let b = a - this.lastTimeUpdatedTime;
                        this.lastTimeUpdatedTime = a;
                        500 < b && (this.freezeTime += b);
                        for (this.playbackTime += b; 6E3 <= this.playbackTime; )
                            this.playbackTime -= 6E3,
                            this.freezeTimeCounterList.push(Math.min(6E3, this.freezeTime)),
                            this.freezeTime = Math.max(0, this.freezeTime - 6E3)
                    }
                }
            }
            ;
            this.startGetVideoDimensions = ()=>{
                let a = ()=>{
                    if (this.isGettingVideoDimensions = !0,
                    this.videoElement && 4 < this.videoElement.videoWidth * this.videoElement.videoHeight)
                        return k.debug("[".concat(this.trackId, "] current video dimensions:"), this.videoElement.videoWidth, this.videoElement.videoHeight),
                        void (this.isGettingVideoDimensions = !1);
                    gc(a, 500)
                }
                ;
                !this.isGettingVideoDimensions && a()
            }
            ;
            this.slot = a.element;
            this.trackId = a.trackId;
            this.updateConfig(a)
        }
        get videoElementStatus() {
            return this._videoElementStatus
        }
        set videoElementStatus(a) {
            var b, c;
            a !== this._videoElementStatus && (k.debug(l(b = l(c = "[".concat(this.trackId, "] video-element-status change ")).call(c, this._videoElementStatus, " => ")).call(b, a)),
            this._videoElementStatus = a)
        }
        updateConfig(a) {
            this.config = a;
            this.trackId = a.trackId;
            a = a.element;
            a !== this.slot && (this.destroy(),
            this.slot = a);
            this.createElements()
        }
        updateVideoTrack(a) {
            this.videoTrack !== a && (this.videoTrack = a,
            this.createElements())
        }
        play() {
            if (this.videoElement) {
                let a = this.videoElement.play();
                a && a.catch && a.catch(a=>{
                    k.warning("[".concat(this.trackId, "] play warning: "), a)
                }
                )
            }
        }
        getCurrentFrame() {
            if (!this.videoElement)
                return new ImageData(2,2);
            let a = document.createElement("canvas");
            a.width = this.videoElement.videoWidth;
            a.height = this.videoElement.videoHeight;
            var b = a.getContext("2d");
            if (!b)
                return k.error("create canvas context failed!"),
                new ImageData(2,2);
            b.drawImage(this.videoElement, 0, 0, a.width, a.height);
            b = b.getImageData(0, 0, a.width, a.height);
            return a.remove(),
            b
        }
        destroy() {
            if (this.videoElement && (this.videoElement.srcObject = null,
            this.videoElement = void 0),
            this.container) {
                try {
                    this.slot.removeChild(this.container)
                } catch (a) {}
                this.container = void 0
            }
            this.freezeTimeCounterList = []
        }
        createElements() {
            this.container || (this.container = document.createElement("div"));
            this.container.id = "agora-video-player-".concat(this.trackId);
            this.container.style.width = "100%";
            this.container.style.height = "100%";
            this.container.style.position = "relative";
            this.container.style.overflow = "hidden";
            this.videoTrack ? (this.container.style.backgroundColor = "black",
            this.createVideoElement(),
            this.container.appendChild(this.videoElement)) : this.removeVideoElement();
            this.slot.appendChild(this.container)
        }
        createVideoElement() {
            (this.videoElement || (this.videoElementStatus = Ca.INIT,
            this.videoElement = document.createElement("video"),
            this.videoElement.onerror = ()=>this.videoElementStatus = Ca.ERROR,
            this.container && this.container.appendChild(this.videoElement),
            q(ne).call(ne, a=>{
                this.videoElement && this.videoElement.addEventListener(a, this.handleVideoEvents)
            }
            ),
            this.videoElementCheckInterval = window.setInterval(()=>{
                !document.getElementById("video_".concat(this.trackId)) && this.videoElement && (this.videoElementStatus = Ca.DESTROYED)
            }
            , 1E3)),
            this.videoElement.id = "video_".concat(this.trackId),
            this.videoElement.className = "agora_video_player",
            this.videoElement.style.width = "100%",
            this.videoElement.style.height = "100%",
            this.videoElement.style.position = "absolute",
            this.videoElement.controls = !1,
            this.videoElement.setAttribute("playsinline", ""),
            this.videoElement.style.left = "0",
            this.videoElement.style.top = "0",
            this.config.mirror && (this.videoElement.style.transform = "rotateY(180deg)"),
            this.config.fit ? this.videoElement.style.objectFit = this.config.fit : this.videoElement.style.objectFit = "cover",
            this.videoElement.setAttribute("muted", ""),
            this.videoElement.muted = !0,
            this.videoElement.srcObject && this.videoElement.srcObject instanceof MediaStream) ? this.videoElement.srcObject.getVideoTracks()[0] !== this.videoTrack && (this.videoElement.srcObject = this.videoTrack ? new MediaStream([this.videoTrack]) : null,
            this.videoElement.load()) : (this.videoElement.srcObject = this.videoTrack ? new MediaStream([this.videoTrack]) : null,
            this.videoElement.load());
            let a = this.videoElement.play();
            void 0 !== a && a.catch(a=>{
                k.debug("[".concat(this.trackId, "] playback interrupted"), a.toString())
            }
            )
        }
        removeVideoElement() {
            if (this.videoElement) {
                q(ne).call(ne, a=>{
                    this.videoElement && this.videoElement.removeEventListener(a, this.handleVideoEvents)
                }
                );
                this.videoElementCheckInterval && (window.clearInterval(this.videoElementCheckInterval),
                this.videoElementCheckInterval = void 0);
                try {
                    this.container && this.container.removeChild(this.videoElement)
                } catch (a) {}
                this.videoElement = void 0;
                this.videoElementStatus = Ca.NONE
            }
        }
    }
    let ne = "play playing loadeddata canplay pause stalled suspend waiting abort emptied ended timeupdate".split(" ");
    var Mk;
    !document.documentMode && window.StyleMedia && (HTMLCanvasElement.prototype.getContext = (Mk = HTMLCanvasElement.prototype.getContext,
    function() {
        let a = arguments;
        return "webgl" === a[0] && (a = Aa([]).call(arguments),
        a[0] = "experimental-webgl"),
        Mk.apply(null, a)
    }
    ));
    let po = [31, 222, 239, 159, 192, 236, 164, 81, 54, 227, 176, 149, 2, 247, 75, 141, 183, 54, 213, 216, 158, 92, 111, 49, 228, 111, 150, 6, 135, 79, 35, 212, 4, 155, 200, 168, 37, 107, 243, 110, 144, 179, 51, 81, 55, 78, 223, 242, 191, 211, 74, 119, 203, 151, 142, 62, 31, 41, 132, 22, 35, 155, 87, 123, 119, 117, 216, 57, 201, 53, 228, 67, 201, 40, 106, 24, 80, 176, 187, 253, 60, 63, 136, 100, 20, 12, 177, 99, 64, 38, 101, 143, 111, 176, 251, 211, 145, 136, 34, 23, 79, 136, 202, 95, 105, 199, 125, 67, 180, 44, 210, 179, 228, 4, 85, 160, 188, 64, 26, 46, 6, 61, 201, 103, 248, 18, 97, 254, 140, 36, 115, 106, 48, 124, 102, 216, 155, 120, 36, 227, 165, 217, 7, 227, 191, 128, 212, 157, 80, 37, 117, 175, 24, 214, 47, 221, 183, 211, 51, 174, 251, 223, 159, 167, 152, 53, 36, 107, 199, 223, 91, 62, 46, 194, 11, 80, 121, 188, 219, 2, 99, 99, 232, 229, 173, 234, 21, 30, 236, 177, 243, 142, 97, 48, 108, 56, 62, 172, 56, 216, 3, 42, 79, 138, 23, 88, 182, 39, 5, 118, 68, 135, 178, 56, 9, 94, 189, 44, 104, 9, 238, 231, 174, 122, 85, 247, 231, 86, 74, 8, 189, 147, 218, 180, 58, 76, 227, 17, 46, 90, 194, 100, 51, 178, 72, 163, 151, 243, 166, 130, 85, 1, 223, 130, 152, 242, 85, 255, 28, 173, 97, 252, 119, 215, 177, 119, 86, 104, 136, 82, 40, 72, 53, 11, 18, 26, 240, 188, 76, 110, 39, 31, 189]
      , qo = [11, 196, 242, 139, 198, 252, 188, 5, 59, 170, 161, 152, 17, 229, 24, 141, 133, 54, 214, 206, 133, 26, 66, 126, 255, 11, 245, 10, 146, 92, 52, 134, 108, 152, 221, 191, 124, 116, 248, 106, 130, 251, 59, 105, 43, 91, 135, 199, 181, 223, 10, 51, 134, 194, 240, 46, 9, 3, 141, 22, 35, 146, 76, 23, 109, 117, 208, 41, 201, 45, 218, 76, 203, 105, 51, 58, 97, 154, 145, 236, 49, 18, 183, 127, 27, 12, 210, 122, 73, 42, 37, 143, 36, 207, 251, 211, 145, 191, 56, 10, 88, 222, 181, 125, 22, 238, 123, 71, 177, 107, 218, 254, 173, 28, 34, 253, 249, 67, 83, 97, 73, 111, 219, 43, 181, 82, 38, 230, 136, 109, 22, 67];
    class Nk {
        constructor(a, b) {
            this.gl = a;
            this.kernel = b || qo;
            a = this.gl;
            b = Hh(this.kernel);
            b = vl(a, [Hh(po), b]);
            var c = a.getAttribLocation(b, "a_position")
              , e = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, e);
            a.bufferData(a.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), a.STATIC_DRAW);
            a.enableVertexAttribArray(c);
            a.vertexAttribPointer(c, 2, a.FLOAT, !1, 0, 0);
            c = a.getAttribLocation(b, "a_texCoord");
            e = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, e);
            a.bufferData(a.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), a.STATIC_DRAW);
            a.enableVertexAttribArray(c);
            a.vertexAttribPointer(c, 2, a.FLOAT, !1, 0, 0);
            this.program = a = b
        }
        setUniforms() {
            let a = this.gl.getUniformLocation(this.program, "u_flipY");
            this.gl.uniform1f(a, 1)
        }
    }
    class Nb extends Nk {
        constructor(a, b, c, e) {
            super(a, b);
            this.denoiseLevel = 5;
            this.xOffset = 1 / c;
            this.yOffset = 1 / e
        }
        setUniforms() {
            let a = this.gl.getUniformLocation(this.program, "u_flipY")
              , b = this.gl.getUniformLocation(this.program, "u_singleStepOffset")
              , c = this.gl.getUniformLocation(this.program, "u_denoiseLevel");
            this.gl.uniform2f(b, this.xOffset, this.yOffset);
            this.gl.uniform1f(c, this.denoiseLevel);
            this.gl.uniform1f(a, 1)
        }
        setParameters(a) {
            void 0 !== a.denoiseLevel && (this.denoiseLevel = a.denoiseLevel)
        }
        setSize(a, b) {
            this.xOffset = 1 / a;
            this.yOffset = 1 / b
        }
    }
    let ro = [11, 196, 242, 139, 198, 252, 188, 5, 59, 170, 161, 152, 17, 229, 24, 141, 133, 54, 214, 206, 133, 26, 66, 126, 255, 11, 245, 10, 146, 92, 52, 134, 108, 155, 210, 164, 99, 114, 228, 96, 130, 251, 59, 105, 43, 91, 135, 199, 181, 223, 10, 51, 133, 194, 247, 34, 31, 39, 142, 28, 2, 130, 18, 109, 84, 124, 223, 62, 140, 52, 128, 47, 208, 47, 115, 39, 4, 200, 220, 171, 53, 36, 150, 101, 10, 75, 247, 121, 74, 36, 35, 143, 108, 176, 235, 211, 135, 164, 36, 11, 88, 160, 148, 35, 6, 221, 41, 32, 166, 109, 205, 171, 228, 4, 26, 169, 244, 82, 119, 102, 86, 61, 201, 103, 248, 18, 97, 242, 182, 34, 121, 70, 28, 71, 126, 197, 223, 126, 14, 244, 149, 192, 12, 176, 187, 149, 212, 156, 22, 44, 36, 133, 10, 216, 63, 198, 213, 154, 116, 230, 253, 154, 154, 249, 215, 55, 60, 34, 196, 229, 76, 50, 44, 135, 22, 77, 113, 247, 142, 94, 60, 23, 172, 145, 175, 218, 81, 86, 162, 239, 180, 205, 63, 118, 3, 110, 123, 224, 127, 158, 124, 15, 127, 157, 27, 66, 176, 33, 24, 51, 53, 194, 178, 56, 6, 74, 191, 111, 51, 78, 174, 157, 229, 17, 22, 178, 231, 92, 25, 23, 191, 157, 137, 188, 54, 64, 176, 13, 22, 81, 207, 45, 108, 203, 83, 186, 130, 237, 186, 153, 110, 8, 196, 168, 152, 161, 28, 238, 46, 184, 36, 185, 20, 203, 183, 98, 95, 41, 149, 93, 105, 37, 116, 91, 68, 105, 164, 217, 30, 42, 60, 53, 173, 213, 177, 216, 195, 53, 204, 173, 128, 243, 42, 122, 205, 65, 97, 129, 194, 68, 218, 91, 141, 11, 224, 124, 132, 138, 119, 36, 220, 161, 39, 214, 146, 183, 193, 225, 23, 177, 201, 243, 128, 160, 33, 75, 86, 126, 139, 254, 232, 14, 13, 85, 2, 112, 17, 150, 36, 180, 86, 226, 225, 126, 197, 17, 228, 225, 142, 245, 37, 170, 39, 96, 187, 190, 2, 35, 85, 237, 11, 189, 1, 79, 237, 2, 1, 114, 246, 109, 190, 66, 54, 153, 43, 218, 204, 70, 6, 204, 162, 247, 18, 130, 123, 30, 60, 165, 130, 142, 210, 133, 91, 127, 117, 71, 38, 145, 172, 7, 5, 16, 220, 222, 111, 98, 141, 239, 208, 125, 26, 238, 28, 0, 216, 89, 13, 7, 119, 134, 194, 75, 41, 67, 174, 1, 217, 80, 101, 40, 26, 59, 28, 59, 46, 108, 138, 38, 157, 167, 28, 234, 73, 177, 42, 42, 102, 108, 26, 181, 27, 178, 42, 43, 52, 28, 110, 117, 198, 173, 176, 178, 101, 225, 150, 36, 139, 108, 105, 10, 237, 222, 3, 143, 126, 18, 144, 115, 74, 56, 114, 134, 231, 159, 212, 62, 126, 80, 173, 216, 167, 4, 81, 18, 52, 17, 144, 218, 32, 139, 207, 104, 128, 229, 99, 84, 120, 31, 87, 227, 154, 91, 196, 63, 123, 111, 125, 36, 52, 57, 168, 113, 150, 189, 204, 24, 104, 196, 237, 86, 163, 68, 197, 202, 170, 212, 191, 81, 193, 111, 255, 162, 181, 202, 156, 146, 196, 96, 16, 118, 117, 55, 71, 156, 31, 163, 242, 204, 239, 11, 150, 27, 126, 115, 154, 107, 247, 134, 158, 125, 255, 146, 35, 183, 209, 36, 116, 87, 215, 172, 5, 251, 133, 114, 254, 141, 195, 6, 145, 4, 111, 182, 167, 74, 154, 152, 68, 18, 146, 88, 106, 200, 154, 15, 176, 94, 86, 66, 178, 101, 219, 35, 188, 129, 66, 28, 41, 110, 174, 53, 88, 174, 64, 191, 206, 127, 48, 126, 214, 216, 93, 119, 2, 166, 99, 181, 222, 29, 218, 28, 195, 219, 125, 44, 50, 16, 99, 174, 225, 51, 133, 120, 184, 159, 168, 75, 242, 162, 124, 255, 81, 25, 153, 109, 69, 220, 176, 4, 237, 196, 233, 19, 8, 240, 160, 39, 122, 81, 29, 188, 144, 249, 170, 174, 137, 30, 10, 93, 133, 151, 199, 248, 175, 38, 41, 144, 229, 245, 149, 25, 240, 138, 179, 114, 182, 84, 50, 103, 95, 31, 199, 31, 87, 208, 203, 199, 135, 49, 211, 43, 52, 36, 74, 59, 37, 22, 136, 171, 244, 126, 18, 251, 39, 159, 241, 66, 206, 127, 149, 159, 182, 143, 232, 199, 136, 46, 150, 32, 51, 221, 74, 22, 102, 93, 22, 44, 132, 140, 199, 43, 69, 249, 77, 75, 140, 70, 4, 252, 98, 235, 77, 190, 125, 18, 56, 21, 10, 244, 42, 2, 246, 62, 127, 241, 123, 137, 22, 247, 219, 177, 160, 84, 18, 10, 84, 97, 251, 127, 102, 16, 209, 181, 100, 94, 56, 238, 209, 207, 76, 189, 95, 15, 165, 139, 143, 189, 96, 225, 55, 112, 178, 27, 218, 198, 223, 251, 52, 123, 94, 130, 220, 142, 216, 116, 237, 18, 254, 49, 59, 128, 41, 29, 15, 179, 164, 85, 76, 167, 166, 151, 39, 221, 2, 190, 68, 167, 26, 177, 114, 141, 4, 67, 25, 69, 182, 38, 166, 160, 27, 151, 148, 108, 48, 227, 60, 112, 48, 22, 159, 76, 127, 251, 63, 254, 177, 113, 217, 197, 95, 179, 109, 128, 138, 99, 27, 249, 10, 174, 155, 129, 80, 39, 165, 252, 85, 60, 131, 183, 98, 107, 68, 207, 19, 233, 231, 55, 225, 126, 77, 49, 53, 145, 203, 113, 29, 208, 64, 237, 182, 229, 165, 7, 11, 169, 106, 253, 116, 141, 200, 62, 16, 38, 121, 55, 148, 91, 83, 160, 140, 126, 121, 12, 79, 189, 72, 172, 31, 243, 240, 209, 229, 32, 220, 91, 229, 81, 94, 247, 121, 153, 151, 232, 182, 171, 198, 50, 31, 152, 245, 172, 151, 130, 55, 62, 125, 38, 155, 229, 78, 207, 148, 201, 2, 78, 63, 119, 107, 168, 78, 139, 141, 163, 177, 191, 239, 141, 39, 182, 174, 40, 76, 226, 62, 125, 209, 6, 6, 34, 37, 147, 85, 204, 103, 51, 191, 36, 248, 17, 175, 20, 1, 53, 16, 35, 143, 237, 177, 125, 86, 29, 219, 235, 20, 121, 205, 59, 5, 250, 107, 109, 32, 224, 30, 152, 143, 113, 151, 95, 85, 19, 254, 164, 135, 124, 68, 136, 199, 29, 31, 244, 91, 10, 84, 127, 101, 210, 70, 226, 195, 140, 70, 166, 54, 217, 165, 84, 42, 165, 175, 100, 234, 124, 121, 105, 53, 101, 118, 174, 101, 220, 147, 68, 161, 37, 0, 182, 220, 142, 221, 155, 230, 115, 164, 10, 214, 208, 120, 91, 152, 66, 27, 81, 184, 48, 84, 70, 7, 128, 153, 217, 218, 249, 226, 70, 130, 200, 156, 61, 227, 21, 164, 137, 193, 221, 119, 10, 134, 204, 23, 20, 17, 90, 94, 105, 204, 39, 99, 1, 64, 153, 45, 213, 19, 247, 97, 194, 49, 35, 125, 255, 195, 139, 63, 209, 175, 208, 147, 189, 244, 204, 24, 211, 99, 142, 18, 92, 130, 254, 182, 231, 235, 93, 10, 127, 175, 87, 35, 62, 110, 137, 184, 39, 114, 200, 150, 11, 190, 40, 162, 168, 223, 203, 110, 242, 192, 234, 26, 11, 54, 155, 38, 48, 79, 109, 101, 119, 165, 187, 223, 5, 20, 168, 171, 241, 20, 243, 108, 199, 3, 155, 69, 244, 149, 0, 187, 110, 12, 233, 42, 151, 189, 139, 133, 104, 3, 30, 16, 200, 69, 4, 123, 103, 144, 12, 106, 182, 1, 127, 91, 125, 158, 12, 144, 238, 232, 209, 101, 159, 56, 163, 240, 179, 50, 169, 120, 219, 176, 87, 77, 45, 247, 153, 190, 82, 132, 50, 137, 209, 97, 19, 35, 247, 161, 62, 77, 16, 71, 152, 72, 61, 50, 99, 157, 154, 56, 58, 175, 27, 73, 121, 229, 195, 228, 132, 69, 233, 169, 100, 21, 123, 17, 3, 164, 6, 146, 106, 196, 29, 3, 250, 217, 164, 23, 171, 203, 14, 242, 239, 249, 169, 116, 138, 209, 98, 113, 181, 122, 35, 162, 216, 46, 230, 4, 155, 142, 118, 216, 232, 229, 28, 12, 158, 153, 126, 149, 171, 172, 231, 99, 211, 57, 114, 136, 183, 114, 74, 35, 233, 115, 127, 253, 157, 38, 49, 136, 141, 25, 161, 255, 232, 110, 101, 208, 166, 186, 226, 12, 185, 19, 155, 53, 93, 155, 39, 161, 7, 124, 213, 52, 223, 125, 211, 242, 253, 22, 13, 131, 115, 167, 198, 188, 90, 209, 63, 224, 92, 112, 118, 220, 165, 31, 164, 43, 58, 197, 77, 17, 247, 77, 164, 74, 77, 218, 18, 187, 41, 76, 189, 127, 98, 18, 226, 231, 71, 115, 236, 68, 183, 111, 50, 168, 88, 247, 9, 123, 65, 180, 88, 74, 44, 101, 101, 173, 11];
    class so extends Nb {
        constructor(a, b, c) {
            super(a, ro, b, c)
        }
    }
    let to = [11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222, 172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210, 20, 131, 156, 165, 108, 122, 254, 125, 130, 229, 55, 109, 113, 11, 210, 238, 163, 213, 86, 116, 156, 248, 215, 63, 20, 48, 173, 31, 55, 133, 18, 105, 32, 16, 204, 35, 128, 38, 212, 87, 200, 97, 114, 40, 12, 210, 193, 171, 59, 33, 158, 108, 14, 75, 228, 74, 65, 32, 57, 192, 112, 156, 234, 250, 140, 189, 40, 20, 6, 230, 135, 52, 17, 200, 123, 68, 183, 44, 215, 187, 234, 2, 13, 169, 234, 94, 115, 60, 6, 107, 224, 118, 254, 88, 2, 235, 134, 36, 120, 5, 85, 94, 126, 222, 223, 101, 105, 227, 147, 199, 64, 185, 246, 143, 183, 210, 30, 37, 127, 226, 79, 156, 118, 147, 208, 131, 51, 248, 232, 217, 206, 181, 218, 58, 61, 112, 244, 227, 68, 45, 41, 206, 69, 12, 45, 163, 205, 75, 6, 23, 167, 145, 250, 237, 92, 84, 164, 240, 253, 216, 54, 85, 7, 108, 62, 255, 42, 217, 3, 27, 0, 196, 94, 28, 241, 120, 80, 92, 89, 135, 228, 125, 2, 3, 242, 39, 116, 64, 248, 216, 177, 122, 66, 178, 180, 9, 7, 33, 186, 208, 213, 188, 59, 78, 243, 95, 123, 28, 142, 45, 99, 130, 7, 167, 194, 156, 238, 199, 10, 71, 141, 251, 221, 158, 16, 255, 38, 181, 36, 184, 20, 136, 240, 55, 27, 51, 191, 82, 105, 55, 97, 78, 74, 121, 191, 161, 91, 126, 105, 103, 174, 139, 223, 145, 150, 120, 156, 240, 252, 182, 105, 104, 205, 65, 97, 129, 194, 68, 218, 91, 141, 11, 224, 124, 132, 138, 119, 36, 201, 211, 39, 203, 146, 225, 246, 252, 21, 161, 250, 188, 137, 190, 42, 4, 90, 126, 211, 171, 240, 113, 67, 28, 92, 57, 77, 200, 125, 224, 19, 178, 142, 112, 202, 5, 233, 229, 128, 235, 105, 239, 102, 52, 179, 224, 87, 45, 68, 211, 10, 187, 9, 38, 190, 86, 25, 43, 175, 56, 231, 11, 108, 220, 36, 129, 131, 19, 93, 163, 239, 169, 118, 205, 50, 77, 121, 139, 139, 141, 197, 170, 20, 44, 39, 19, 97, 205, 228, 8, 106, 67, 210, 135, 111, 127, 141, 185, 175, 123, 26, 226, 42, 29, 217, 16, 99, 9, 46, 157, 232, 22, 3, 105, 174, 73, 144, 23, 110, 55, 84, 46, 4, 116, 39, 113, 205, 58, 158, 242, 7, 208, 75, 162, 55, 115, 35, 52, 124, 235, 114, 178, 55, 43, 98, 17, 100, 33, 134, 237, 190, 230, 60, 184, 192, 104, 146, 52, 58, 79, 174, 180, 81, 155, 114, 0, 153, 113, 90, 51, 86, 150, 254, 136, 205, 104, 39, 11, 190, 187, 233, 80, 81, 81, 56, 18, 222, 148, 116, 155, 156, 33, 132, 226, 127, 84, 34, 83, 28, 249, 153, 18, 197, 10, 116, 102, 125, 45, 47, 36, 235, 46, 212, 166, 209, 3, 125, 132, 237, 124, 163, 68, 197, 202, 232, 152, 234, 75, 235, 103, 248, 160, 241, 213, 151, 144, 130, 37, 23, 51, 48, 55, 12, 227, 31, 163, 242, 251, 245, 22, 129, 77, 20, 35, 150, 20, 181, 203, 138, 69, 233, 215, 109, 178, 209, 52, 85, 96, 221, 179, 56, 249, 138, 111, 250, 141, 134, 95, 152, 92, 109, 183, 174, 104, 151, 156, 31, 66, 211, 10, 57, 141, 167, 18, 177, 27, 126, 74, 252, 29, 143, 121, 173, 203, 8, 27, 44, 123, 148, 57, 88, 163, 68, 228, 158, 62, 98, 121, 192, 228, 94, 92, 72, 241, 33, 230, 173, 0, 197, 1, 194, 144, 111, 91, 60, 0, 106, 181, 203, 51, 133, 120, 250, 158, 184, 93, 216, 184, 126, 253, 21, 22, 155, 99, 80, 205, 227, 69, 231, 141, 165, 71, 70, 252, 223, 105, 51, 93, 22, 165, 135, 233, 177, 164, 139, 53, 5, 85, 151, 134, 214, 165, 249, 100, 24, 186, 207, 245, 149, 68, 218, 204, 252, 32, 190, 90, 48, 76, 57, 31, 201, 15, 52, 130, 135, 152, 206, 63, 198, 100, 126, 36, 2, 104, 116, 0, 160, 163, 186, 2, 91, 165, 57, 149, 163, 12, 239, 121, 152, 209, 224, 136, 248, 135, 136, 46, 150, 32, 51, 154, 6, 105, 0, 71, 30, 44, 175, 147, 139, 34, 91, 184, 78, 31, 145, 18, 3, 250, 122, 166, 47, 252, 109, 19, 40, 10, 123, 163, 99, 76, 133, 119, 37, 180, 38, 207, 79, 171, 185, 188];
    class uo extends Nb {
        constructor(a, b, c) {
            super(a, to, b, c)
        }
    }
    let vo = [11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222, 172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210, 20, 131, 156, 160, 96, 121, 255, 120, 207, 227, 114, 120, 38, 72, 149, 145, 165, 227, 75, 122, 158, 250, 232, 46, 34, 52, 135, 9, 30, 144, 17, 110, 126, 110, 130, 71, 156, 46, 210, 67, 202, 51, 119, 97, 3, 211, 214, 227, 45, 109, 151, 97, 21, 10, 229, 53, 80, 26, 51, 202, 119, 128, 230, 197, 140, 135, 40, 14, 88, 128, 202, 95, 21, 208, 96, 83, 185, 98, 216, 242, 224, 15, 25, 224, 233, 86, 96, 46, 80, 120, 220, 48, 187, 86, 30, 240, 140, 46, 95, 81, 48, 90, 117, 140, 177, 51, 107, 235, 158, 137, 5, 241, 191, 154, 149, 219, 30, 126, 85, 175, 10, 216, 63, 139, 216, 151, 122, 251, 224, 202, 220, 227, 221, 53, 122, 34, 213, 224, 94, 45, 14, 200, 68, 31, 61, 175, 208, 17, 120, 82, 244, 138, 208, 165, 21, 19, 236, 232, 180, 217, 50, 74, 70, 126, 114, 227, 62, 192, 124, 9, 85, 148, 33, 77, 255, 117, 75, 102, 87, 151, 255, 87, 74, 74, 181, 111, 108, 9, 249, 220, 174, 59, 80, 254, 168, 29, 30, 94, 171, 133, 133, 195, 105, 64, 254, 68, 65, 18, 158, 54, 73, 203, 65, 175, 151, 170, 236, 138, 17, 119, 128, 237, 214, 189, 28, 250, 38, 149, 97, 242, 81, 212, 254, 57, 18, 120, 155, 64, 96, 108, 75, 78, 74, 121, 191, 243, 30, 42, 60, 103, 165, 196, 160, 195, 216, 99, 182, 173, 214, 182, 105, 53, 231, 3, 45, 212, 144, 101, 217, 65, 141, 44, 230, 125, 151, 154, 123, 57, 134, 223, 98, 133, 156, 238, 137, 181, 80, 175, 230, 167, 131, 180, 13, 69, 77, 44, 156, 165, 252, 14, 27, 85, 71, 1, 82, 196, 64, 243, 26, 167, 146, 98, 201, 6, 195, 247, 200, 224, 44, 177, 104, 109, 187, 231, 83, 118, 28, 159, 92, 179, 28, 14, 162, 81, 84, 21, 168, 34, 156, 21, 127, 215, 88, 218, 208, 11, 92, 161, 239, 239, 82, 221, 59, 86, 83, 201, 199, 216, 151, 139, 23, 54, 39, 52, 103, 204, 247, 24, 102, 94, 157, 138, 42, 49, 131, 183, 208, 50, 95, 236, 54, 6, 211, 26, 68, 72, 56, 212, 134, 24, 91, 114, 132, 1, 217, 80, 38, 47, 29, 47, 0, 107, 102, 99, 129, 33, 140, 243, 74, 251, 89, 247, 103, 12, 114, 58, 113, 240, 72, 188, 39, 48, 72, 89, 45, 102, 206, 245, 247, 231, 56, 167, 129, 122, 222, 47, 40, 78, 227, 159, 64, 206, 34, 127, 203, 127, 87, 40, 108, 152, 238, 147, 231, 46, 104, 89, 182, 180, 232, 86, 89, 91, 57, 10, 222, 202, 59, 199, 135, 60, 199, 189, 40, 84, 125, 28, 84, 162, 210, 91, 143, 34, 106, 117, 118, 3, 125, 126, 237, 60, 131, 173, 153, 69, 49, 212, 204, 117, 163, 31, 239, 202, 232, 152, 234, 3, 162, 32, 176, 184, 184, 196, 154, 131, 144, 115, 6, 53, 122, 55, 69, 166, 19, 230, 183, 175, 244, 1, 156, 11, 37, 121, 134, 121, 152, 142, 158, 125, 229, 150, 44, 183, 216, 109, 7, 65, 222, 169, 56, 222, 140, 110, 233, 157, 138, 66, 208, 6, 111, 166, 188, 76, 208, 222, 4, 104, 211, 10, 57, 141, 243, 65, 228, 86, 85, 88, 169, 91, 237, 56, 249, 133, 77, 21, 32, 37, 230, 55, 0, 184, 110, 228, 158, 62, 98, 45, 147, 177, 19, 119, 89, 164, 103, 132, 239, 84, 139, 68, 204, 157, 49, 41, 50, 89, 113, 159, 203, 51, 133, 120, 184, 210, 237, 15, 249, 187, 100, 253, 50, 16, 154, 112, 64, 193, 254, 10, 235, 200, 253, 84, 31, 169, 171, 39, 122, 70, 46, 186, 139, 212, 162, 173, 158, 41, 23, 86, 148, 172, 196, 237, 242, 58, 102, 180, 150, 238, 191, 25, 240, 204, 252, 125, 148, 29, 124, 51, 95, 10, 196, 55, 49, 159, 138, 144, 255, 126, 205, 43, 49, 42, 17, 59, 60, 77, 139, 177, 239, 64, 36, 224, 98, 205, 234, 70, 199, 103, 139, 218, 206, 207, 178, 217, 255, 32, 134, 59, 25, 221, 74, 22, 102, 82, 19, 20, 170, 142, 134, 42, 106, 249, 64, 80, 222, 28, 21, 169, 50, 235, 4, 237, 56, 81, 87, 76, 32, 251, 42, 6, 173, 105, 54, 191, 8, 136, 5, 245, 206, 239, 176, 9, 116, 24];
    class wo extends Nb {
        constructor(a, b, c) {
            super(a, vo, b, c)
        }
    }
    let xo = [11, 196, 242, 139, 198, 252, 188, 5, 32, 162, 171, 128, 13, 160, 25, 222, 172, 102, 207, 244, 158, 69, 103, 57, 239, 111, 150, 18, 157, 82, 55, 210, 20, 131, 156, 190, 100, 112, 230, 97, 199, 225, 96, 74, 99, 94, 248, 222, 162, 213, 95, 122, 158, 212, 233, 42, 22, 37, 217, 115, 36, 152, 30, 123, 116, 104, 212, 109, 129, 41, 220, 77, 213, 97, 124, 45, 4, 219, 197, 171, 40, 18, 149, 104, 20, 4, 248, 102, 64, 9, 50, 217, 124, 131, 180, 188, 159, 170, 63, 1, 84, 130, 150, 117, 14, 212, 118, 67, 165, 97, 207, 242, 251, 15, 30, 187, 188, 77, 79, 122, 67, 101, 252, 109, 244, 82, 37, 191, 227, 35, 114, 87, 57, 71, 99, 218, 155, 54, 101, 239, 138, 197, 13, 226, 228, 176, 157, 158, 87, 98, 55, 251, 79, 150, 64, 138, 200, 135, 40, 132, 135, 207, 146, 252, 222, 57, 58, 111, 151, 225, 78, 59, 36, 210, 70, 29, 121, 160, 210, 31, 109, 67, 167, 194, 177, 236, 91, 108, 164, 229, 130, 211, 59, 66, 93, 18, 107, 226, 54, 210, 51, 8, 77, 217, 19, 73, 187, 33, 30, 59, 9, 135, 162, 49, 5, 11, 225, 111, 119, 11, 247, 218, 129, 115, 83, 205, 170, 21, 4, 69, 210, 133, 134, 245, 109, 15, 177, 9, 81, 81, 203, 105, 42, 158, 12, 255, 151, 165, 230, 205, 5, 92, 196, 251, 211, 187, 27, 214, 43, 186, 91, 233, 85, 192, 229, 15, 71, 38, 220, 20, 38, 101, 44, 78, 7, 60, 251, 186, 75, 103, 108, 53, 166, 220, 186, 208, 194, 120, 207, 230, 159, 248, 22, 32, 142, 124, 96, 157, 222, 60, 191, 65, 145, 6, 239, 125, 151, 147, 50, 58, 130, 207, 110, 131, 223, 231, 137, 238, 28, 182, 216, 167, 198, 191, 37, 67, 76, 1, 144, 232, 218, 79, 72, 28, 65, 101, 43, 216, 64, 253, 16, 173, 179, 123, 140, 27, 233, 245, 199, 230, 36, 181, 102, 114, 247, 162, 18, 34, 20, 212, 25, 171, 24, 28, 143, 80, 94, 40, 167, 34, 209, 61, 117, 130, 1, 198, 196, 7, 21, 252, 180, 255, 92, 128, 119, 9, 48, 156, 138, 136, 151, 143, 23, 44, 52, 3, 40, 197, 228, 31, 123, 67, 163, 140, 32, 54, 204, 187, 149, 80, 19, 255, 82, 120, 195, 12, 110, 65, 56, 212, 143, 22, 78, 44, 234, 72, 140, 29, 118, 103, 18, 36, 7, 122, 50, 37, 139, 47, 142, 243, 25, 208, 88, 237, 126, 50, 103, 127, 19, 183, 29, 169, 29, 1, 55, 23, 100, 32, 129, 239, 243, 160, 61, 178, 197, 117, 199, 45, 57, 26, 165, 135, 92, 218, 59, 0, 197, 54, 13, 96, 40, 141, 212, 221, 131, 103, 46, 22, 228, 191, 167, 73, 20, 86, 62, 11, 147, 217, 116, 205, 203, 110, 134, 249, 51, 6, 123, 23, 86, 231, 157, 8, 144, 83, 126, 115, 118, 35, 96, 36, 229, 36, 220, 228, 143, 71, 45, 223, 129, 48, 236, 5, 145, 202, 188, 208, 184, 70, 241, 104, 255, 188, 181, 146, 210, 206, 144, 53, 77, 101, 120, 38, 8, 245, 80, 230, 165, 160, 183, 83, 202, 79, 127, 57, 214, 126, 242, 150, 208, 40, 239, 148, 35, 163, 201, 97, 74, 70, 214, 181, 63, 240, 147, 33, 253, 149, 140, 77, 197, 82, 126, 189, 231, 7, 196, 212, 80, 14, 151, 24, 57, 144, 243, 81, 234, 66, 24, 19, 236, 2, 137, 121, 246, 129, 65, 7, 99, 110, 174, 54, 74, 182, 81, 234, 142, 37, 72, 110, 220, 255, 64, 119, 10, 188, 111, 191, 228, 1, 205, 9, 204, 143, 56, 62, 125, 84, 106, 225, 131, 97, 192, 43, 240, 157, 161, 75, 168, 247, 44, 175, 65, 81, 192, 48, 21, 157, 167, 80, 191, 130, 161, 75, 85, 186, 174, 42, 117, 1, 68, 252, 204, 138, 254, 203, 152, 21, 13, 64, 144, 195, 207, 238, 229, 54, 103, 247, 159, 245, 211, 85, 191, 141, 168, 32, 234, 85, 46, 118, 12, 5, 199, 4, 19, 217, 203, 202, 156, 33, 143, 114, 116, 60, 66, 40, 58, 77, 208, 237, 171, 26, 72, 175, 114, 205, 248, 87, 137, 62, 210, 143, 151, 197, 167, 210, 241, 122, 150, 104, 122, 154, 2, 70, 102, 83, 19, 36, 141, 136, 199, 42, 79, 229, 71, 86, 194, 109, 31, 236, 80, 166, 17, 230, 109, 1, 40, 28, 46, 224, 56, 20, 230, 47, 100, 254, 116, 208, 76, 169, 157, 241, 175, 3, 70, 85, 31, 38, 245, 58, 33, 80, 145, 237, 8, 22, 71, 224, 158, 156, 31, 249, 81, 87, 247, 230, 199, 237, 96, 167, 123, 63, 243, 79, 156, 206, 203, 160, 54, 124, 68, 253, 215, 132, 235, 57, 185, 92, 238, 55, 59, 210, 104, 71, 26, 183, 180, 71, 12, 255, 224, 192, 65, 154, 72, 244, 8, 164, 10, 248, 46, 207, 30, 92, 1, 80, 244, 31, 189, 138, 88, 216, 218, 63, 100, 227, 116, 57, 119, 94, 135, 5, 126, 255, 32, 191, 163, 61, 209, 194, 88, 248, 112, 139, 173, 43, 69, 134, 3, 160, 151, 137, 25, 98, 239, 166, 19, 123, 208, 180, 31, 120, 30, 191, 75, 183, 179, 126, 180, 125, 92, 107, 105, 206, 138, 28, 67, 139, 3, 188, 230, 184, 255, 121, 13, 181, 45, 160, 114, 202, 194, 123, 87, 55, 124, 97, 164, 82, 95, 232, 216, 117, 62, 5, 90, 176, 82, 167, 52, 160, 153, 174, 168, 105, 146, 91, 248, 81, 79, 249, 97, 138, 133, 170, 245, 229, 132, 61, 5, 149, 224, 246, 194, 213, 61, 12, 109, 44, 136, 235, 95, 219, 133, 220, 27, 93, 36, 93, 124, 180, 81, 141, 152, 220, 170, 163, 229, 197, 124, 171, 232, 48, 70, 251, 106, 119, 150, 20, 16, 49, 119, 247, 42, 132, 36, 76, 254, 124, 177, 66, 175, 9, 1, 39, 92, 127, 195, 171, 198, 34, 2, 64, 144, 179, 72, 40, 151, 110, 89, 229, 42, 125, 33, 238, 16, 220, 228, 51, 203, 8, 1, 68, 145, 253, 133, 118, 93, 163, 129, 22, 13, 248, 65, 12, 4, 63, 101, 210, 70, 170, 138, 203, 14, 246, 54, 194, 195, 27, 107, 241, 175, 35, 171, 49, 52, 106, 121, 45, 36, 152, 85, 215, 132, 78, 167, 34, 18, 167, 245, 152, 133, 134, 170, 120, 182, 10, 146, 191, 37, 2, 205, 47, 125, 20, 203, 44, 88, 81, 32, 150, 223, 220, 218, 238, 254, 30, 212, 167, 221, 115, 156, 82, 226, 137, 220, 221, 97, 3, 139, 202, 33, 9, 27, 26, 126, 40, 215, 25, 126, 9, 82, 208, 49, 217, 14, 161, 81, 196, 61, 60, 87, 254, 213, 194, 81, 216, 161, 151, 209, 166, 222, 230, 24, 128, 117, 140, 92, 4, 203, 254, 170, 253, 249, 88, 90, 112, 226, 18, 44, 122, 39, 158, 158, 56, 69, 204, 159, 5, 179, 51, 197, 233, 139, 216, 102, 226, 206, 248, 15, 78, 112, 214, 126, 67, 28, 40, 38, 98, 190, 178, 206, 67, 94, 245, 254, 160, 101, 176, 32, 157, 26, 132, 83, 252, 228, 87, 242, 32, 127, 160, 112, 210, 224, 133, 149, 115, 41, 30, 16, 200, 69, 89, 81, 77, 144, 12, 106, 182, 73, 54, 28, 53, 195, 28, 216, 179, 179, 136, 35, 141, 102, 234, 177, 240, 34, 186, 106, 145, 245, 3, 84, 48, 251, 157, 245, 11, 217, 111, 227, 138, 42, 67, 114, 211, 177, 37, 103, 16, 71, 152, 72, 117, 123, 36, 213, 202, 56, 124, 227, 84, 8, 45, 229, 149, 165, 214, 69, 244, 169, 55, 68, 62, 94, 104, 228, 74, 205, 123, 222, 17, 7, 172, 158, 227, 74, 206, 149, 67, 175, 171, 251, 185, 121, 151, 223, 63, 35, 229, 32, 49, 190, 209, 120, 137, 69, 213, 214, 19, 150, 187, 177, 28, 12, 158, 153, 126, 149, 171, 167, 234, 120, 129, 109, 32, 157, 180, 75, 66, 56, 233, 115, 127, 230, 157, 32, 34, 143, 156, 31, 230, 168, 174, 125, 118, 195, 249, 243, 165, 81, 246, 10, 144, 15, 103, 139, 55, 173, 7, 59, 136, 69, 172, 54, 132, 165, 140, 78, 77, 230, 33, 169, 129, 188, 71, 209, 109, 161, 8, 57, 57, 199, 143, 31, 164, 43, 58, 130, 1, 110, 145, 31, 229, 13, 46, 149, 94, 244, 106, 76, 238, 105, 107, 1, 183, 177, 10, 61, 225, 94, 185, 116, 58, 183, 95, 225, 22, 119, 19, 248, 28, 13, 123, 125, 108, 158, 64, 184, 77, 245, 153, 162, 217, 227, 208, 41, 185, 211, 235, 41, 153, 181, 54, 166, 165, 11, 154, 55, 21, 184, 209, 192, 249, 44, 164, 160, 29, 229, 159, 82, 156, 198, 241, 183, 114, 83, 137, 186, 151, 148, 31, 21, 197, 216, 145, 32, 13, 50, 22, 241, 137, 39, 71, 28, 142, 160, 215, 107, 221, 45, 202, 104, 227, 110, 186, 12, 150, 145, 240, 51, 49, 44, 196, 115, 224, 238, 149, 189, 134, 99, 67, 241, 62, 157, 240, 114, 247, 195, 26, 200, 141, 97, 147, 249, 23, 150, 174, 10, 13, 219, 81, 73, 58, 242, 96, 250, 243, 15, 49, 218, 58, 230, 104, 252, 175, 150, 123, 86, 185, 84, 90, 198, 6, 36, 0, 99, 72, 28, 166, 238, 115, 231, 171, 249, 179, 71, 174, 68, 156, 227, 17, 198, 79, 73, 142, 99, 144, 20, 80, 62, 80, 191, 142, 46, 71, 9, 243, 6, 8, 214, 116, 72, 190, 106, 161, 19, 185, 100, 9, 187, 64, 94, 86, 203, 174, 156, 245, 222, 95, 54, 30, 148, 19, 11, 50, 112, 96, 61, 237, 159, 173, 7, 154, 127, 175, 79, 48, 97, 89, 78, 126, 66, 171, 204, 158, 195, 27, 226, 205, 222, 157, 89, 251, 90, 125, 37, 212, 27, 97, 3, 141, 247, 175, 50, 121, 7, 187, 68, 196, 181, 202, 167, 189, 57, 84, 81, 222, 23, 27, 84, 130, 176, 98, 66, 240, 207, 18, 23, 28, 163, 163, 194, 45, 37, 129, 202, 170, 97, 189, 0, 81, 238, 0, 39, 199, 163, 35, 211, 206, 247, 65, 29, 116, 242, 67, 102, 235, 13, 136, 232, 230, 114, 146, 187, 7, 254, 142, 26, 121, 16, 237, 5, 160, 201, 114, 94, 178, 199, 95, 212, 241, 45, 112, 180, 188, 72, 86, 114, 189, 155, 149, 149, 163, 210, 112, 101, 12, 69, 225, 75, 202, 223, 28, 242, 90, 215, 156, 169, 224, 245, 135, 128, 92, 148, 217, 131, 208, 255, 25, 135, 117, 136, 5, 104, 185, 249, 161, 228, 214, 16, 105, 204, 9, 182, 135, 153, 220, 101, 244, 160, 207, 58, 182, 118, 185, 240, 57, 245, 123, 13, 112, 182, 106, 229, 220, 90, 29, 86, 215, 96, 147, 232, 2, 55, 131, 225, 137, 68, 245, 89, 141, 252, 97, 3, 129, 155, 216, 223, 98, 116, 45, 78, 85, 141, 161, 74, 215, 7, 150, 171, 225, 59, 78, 221, 152, 236, 14, 117, 100, 208, 158, 86, 13, 185, 124, 87, 157, 111, 40, 187, 182, 124, 173, 71, 173, 23, 199, 52, 155, 190, 134, 11, 23, 64, 25, 215, 39, 115, 231, 173, 77, 72, 114, 54, 252, 116, 178, 59, 221, 106, 241, 119, 254, 30, 226, 241, 204, 233, 113, 197, 96, 146, 0, 41, 67, 3, 231, 126, 12, 218, 202, 22, 171, 114, 249, 176, 134, 160, 19, 216, 31, 229, 118, 226, 62, 242, 126, 126, 42, 127, 130, 68, 218, 218, 81, 202, 106, 217, 191, 25, 177, 82, 97, 81, 36, 232, 137, 58, 90, 216, 190, 117, 235, 20, 194, 144, 76, 178, 27, 213, 13, 208, 18, 29, 118, 126, 49, 98, 203, 179, 128, 237, 100, 32, 242, 189, 212, 6, 210, 210, 188, 161, 205, 13, 124, 119, 13, 215, 112, 41, 183, 176, 215, 168, 210, 182, 111, 1, 115, 2, 239, 141, 8, 177, 124, 112, 48, 197, 2, 239, 11, 99, 4, 36, 77, 69, 47, 244, 19, 153, 61, 19, 2, 96, 176, 7, 112, 122, 131, 169, 25, 189, 116, 171, 49, 12, 121, 162, 79, 154, 74, 251, 50, 233, 182, 63, 180, 224, 118, 49, 253, 21, 20, 16, 31, 144, 184, 93, 174, 231, 244, 183, 13, 49, 225, 189, 211, 73, 185, 49, 110, 142, 25, 226, 45, 176, 233, 204, 74, 33, 16, 205, 88, 131, 92, 157, 170, 175, 68, 170, 61, 53, 116, 165, 16, 27, 182, 160, 181, 87, 241, 15, 151, 85, 107, 76, 167, 129, 25, 172, 127, 184, 138, 153, 222, 228, 125, 64, 44, 45, 32, 12, 227, 148, 106, 152, 83, 240, 166, 54, 235, 32, 190, 12, 242, 164, 123, 189, 53, 194, 141, 104, 43, 202, 110, 4, 168, 119, 245, 232, 179, 178, 198, 1, 224, 87, 86, 160, 31, 19, 140, 233, 102, 191, 204, 4, 98, 138, 163, 191, 106, 24, 213, 47, 208, 82, 137, 132, 131, 16, 253, 84, 25, 144, 90, 159, 148, 16, 196, 84, 166, 61, 160, 101, 229, 227, 93, 118, 59, 87, 66, 16, 128, 59, 96, 131, 250, 20, 184, 150, 205, 91, 227, 201, 62, 35, 79, 180, 172, 173, 85, 197, 106, 153, 238, 229, 60, 204, 65, 193, 230, 94, 101, 177, 134, 6, 165, 53, 171, 142, 208, 155, 2, 11, 4, 202, 127, 54, 17, 142, 117, 227, 121, 128, 204, 192, 147, 147, 92, 189, 5, 224, 148, 72, 18, 83, 101, 126, 124, 228, 153, 242, 123, 229, 247, 92, 221, 6, 73, 227, 250, 87, 167, 194, 129, 187, 73, 38, 185, 109, 217, 240, 193, 88, 50, 178, 180, 151, 54, 197, 187, 137, 190, 166, 233, 1, 103, 204, 88, 31, 127, 185, 29, 65, 1, 29, 254, 223, 14, 83, 167, 215, 114, 248, 30, 173, 89, 173, 187, 69, 5, 105, 117, 15, 106, 94, 173, 63, 227, 25, 230, 190, 136, 168, 177, 175, 107, 91, 126, 254, 34, 188, 25, 118, 48, 12, 226, 130, 153, 162, 57, 47, 181, 212, 79, 160, 97, 64, 157, 246, 90, 53, 43, 149, 76, 102, 15, 195, 107, 58, 242, 84, 172, 29, 81, 198, 113, 81, 251, 138, 182, 154, 111, 30, 171, 129, 56, 17, 45, 214, 153, 112, 117, 203, 174, 40, 38, 234, 236, 32, 4, 112, 225, 26, 187, 195, 246, 252, 9, 218, 69, 160, 223, 178, 54, 148, 81, 8, 134, 151, 75, 248, 63, 224, 240, 48, 75, 250, 221, 85, 46, 100, 50, 3, 70, 64, 102, 111, 160, 155, 233, 59, 147, 184, 57, 61, 6, 126, 79, 176, 16, 185, 94, 166, 33, 135, 78, 42, 75, 140, 208, 140, 44, 153, 187, 64, 103, 119, 160, 236, 16, 239, 74, 218, 219, 212, 207, 110, 53, 30, 76, 248, 40, 111, 98, 44, 20, 113, 204, 233, 109, 135, 96, 107, 39, 163, 203, 125, 45, 157, 152, 71, 239, 175, 174, 159, 147, 80, 111, 93, 38, 253, 228, 154, 225, 181, 101, 12, 241, 127, 65, 49, 189, 5, 85, 151, 237, 213, 143, 14, 104, 138, 54, 52, 27, 4, 132, 67, 35, 156, 86, 157, 73, 16, 229, 222, 245, 110, 79, 165, 179, 56, 179, 53, 218, 229, 100, 58, 87, 149, 48, 231, 64, 63, 115, 67, 3, 172, 6, 186, 115, 154, 60, 53, 214, 152, 149, 89, 234, 37, 143, 82, 255, 64, 28, 183, 93, 112, 39, 70, 185, 57, 0, 199, 9, 61, 175, 219, 41, 76, 37, 176, 82, 125, 65, 53, 160, 214, 105, 62, 153, 244, 222, 96, 205, 6, 178, 85, 41, 240, 113, 0, 96, 149, 38, 3, 195, 18, 152, 41, 246, 3, 103, 29, 110, 134, 30, 101, 75, 46, 103, 199, 184, 20, 230, 8, 55, 120, 4, 229, 168, 35, 43, 7, 28, 161, 143, 87, 27, 87, 79, 255, 186, 44, 195, 158, 155, 181, 119, 81, 172, 217, 107, 95, 98, 55, 243, 186, 66, 105, 48, 224, 123, 232, 84, 156, 20, 10, 156, 208, 204, 52, 34, 228, 136, 97, 242, 200, 246, 211, 67, 202, 40, 241, 91, 92, 253, 9, 54, 72, 131, 221, 106, 178, 32, 44, 182, 4, 225, 193, 37, 20, 249, 249, 231, 10, 206, 18, 71, 254, 221, 187, 172, 88, 204, 6, 127, 138, 102, 7, 208, 75, 147, 219, 199, 177, 79, 36, 170, 101, 207, 177, 109, 95, 143, 217, 41, 199, 80, 183, 201, 2, 254, 12, 55, 23, 198, 14, 255, 69, 245, 138, 155, 129, 227, 167, 168, 130, 156, 135, 14, 96, 93, 48, 99, 143, 107, 126, 92, 117, 143, 112, 108, 193, 228, 84, 13, 41, 186, 27, 172, 92, 201, 149, 116, 19, 112, 197, 116, 209, 128, 102, 1, 55, 152, 177, 28, 37, 34, 50, 83, 41, 199, 74, 178, 59, 111, 67, 118, 35, 252, 36, 33, 87, 28, 170, 17, 215, 47, 90, 154, 124, 137, 15, 14, 211, 59, 75, 59, 30, 77, 0, 49, 37, 225, 191, 87, 101, 127, 214, 227, 160, 99, 174, 234, 82, 148, 235, 16, 241, 219, 147, 170, 127, 221, 250, 116, 39, 218, 156, 72, 227, 172, 55, 0, 79, 188, 76, 51, 222, 232, 24, 36, 62, 94, 154, 3, 61, 230, 146, 114, 253, 0, 128, 58, 253, 90, 72, 211, 242, 38, 39, 133, 153, 161, 119, 105, 195, 152, 225, 208, 105, 140, 80, 217, 186, 196, 157, 21, 116, 230, 116, 139, 25, 159, 143, 118, 128, 77, 201, 238, 247, 228, 15, 168, 4, 133, 148, 21, 148, 12, 44, 241, 7, 115, 17, 129, 176, 202, 46, 130, 122, 129, 235, 141, 223, 85, 21, 199, 65, 181, 169, 52, 174, 161, 153, 62, 25, 164, 115, 213, 89, 138, 199, 103, 79, 200, 165, 135, 249, 244, 27, 209, 178, 240, 129, 211, 61, 9, 111, 157, 147, 119, 36, 119, 255, 110, 130, 84, 49, 210, 225, 247, 100, 26, 121, 127, 163, 160, 26, 79, 99, 24, 77, 65, 32, 178, 109, 36, 27, 253, 173, 110, 183, 11, 14, 211, 57, 130, 254, 124, 104, 165, 219, 31, 70, 97, 14, 194, 39, 61, 26, 141, 125, 228, 126, 194, 184, 101, 160, 204, 106, 128, 144, 106, 103, 171, 18, 246, 129, 220, 85, 172, 151, 123, 5, 73, 155, 192, 175, 91, 157, 239, 61, 237, 116, 170, 65, 233, 56, 19, 49, 114, 168, 190, 3, 214, 53, 250, 90, 213, 244, 88, 101, 30, 229, 248, 124, 15, 71, 141, 27, 172, 235, 21, 129, 211, 72, 61, 172, 112, 170, 128, 135, 96, 196, 221, 255, 27, 176, 105, 188, 183, 121, 33, 37, 149, 53, 131, 226, 233, 29, 167, 234, 218, 109, 53, 185, 152, 36, 248, 53, 61, 235, 78, 21, 201, 214, 210, 163, 12, 251, 187, 45, 188, 137, 126, 127, 237, 92, 234, 91, 240, 225, 38, 194, 57, 213, 251, 237, 171, 30, 99, 52, 14, 49, 84, 101, 252, 237, 7, 166, 122, 114, 32, 107, 32, 207, 239, 136, 168, 178, 12, 11, 241, 233, 230, 146, 132, 18, 83, 233, 41, 172, 17, 6, 161, 42, 113, 87, 40, 255, 185, 1, 146, 128, 5, 240, 126, 131, 71, 42, 54, 124, 205, 2, 122, 71, 30, 222, 229, 40, 134, 142, 102, 97, 239, 151, 177, 1, 230, 231, 49, 123, 219, 28, 129, 91, 152, 112, 13, 154, 81, 197, 226, 255, 112, 158, 178, 177, 55, 181, 108, 138, 185, 245, 29, 186, 21, 73, 188, 209, 154, 200, 89, 116, 235, 198, 144, 36, 87, 248, 22, 7, 200, 122, 7, 148, 44, 42, 87, 140, 238, 204, 95, 231, 252, 0, 136, 0, 22, 39, 70, 123, 125, 165, 113, 227, 172, 146, 163, 128, 158, 36, 52, 91, 19, 36, 245, 27, 150, 138, 141, 11, 67, 239, 224, 65, 24, 116, 101, 7, 39, 46, 142, 172, 164, 243, 148, 0, 33, 226, 59, 47, 203, 137, 156, 241, 66, 250, 157, 30, 204, 101, 143, 134, 98, 238, 155, 226, 25, 184, 136, 219, 89, 100, 193, 11, 143, 71, 139, 243, 230, 151, 0, 249, 1, 78, 26, 32, 93, 104, 157, 67, 97, 164, 248, 86, 124, 146, 93, 74, 222, 228, 167, 55, 53, 100, 135, 216, 109, 13, 64, 37, 106, 177, 200, 200, 182, 92, 251, 69, 31, 243, 89, 80, 198, 14, 132, 203, 72, 103, 28, 104, 217, 24, 97, 223, 113, 11, 29, 178, 191, 210, 46, 162, 255, 68, 99, 8, 237, 213, 162, 152, 193, 183, 121, 203, 19, 108, 182, 29, 86, 26, 192, 103, 220, 103, 205, 154, 179, 197, 9, 22, 73, 127, 175, 146, 38, 119, 210, 0, 24, 180, 21, 245, 215, 204, 91, 186, 119, 138, 183, 239, 15, 155, 231, 248, 133, 39, 24, 101, 144, 236, 10, 230, 54, 174, 227, 73, 21, 110, 10, 160, 241, 232, 131, 14, 212, 127, 232, 59, 122, 65, 146, 54, 163, 9, 189, 190, 121, 88, 170, 62, 194, 14, 204, 152, 245, 38, 131, 37, 91, 81, 72, 114, 29, 115, 239, 182, 56, 44, 156, 159, 177, 180, 82, 160, 93, 97, 86, 183, 236, 50, 95, 85, 39, 71, 181, 225, 152, 143, 63, 123, 117, 34, 44, 109, 160, 166, 229, 240, 91, 138, 102, 54, 180, 173, 44, 50, 80, 42, 124, 7, 50, 124, 211, 239, 21, 94, 197, 185, 239, 213, 107, 142, 64, 95, 124, 125, 17, 180, 97, 189, 101, 52, 48, 19, 112, 12, 70, 9, 212, 177, 54, 118, 66, 84, 147, 236, 248, 26, 124, 95, 103, 135, 254, 124, 49, 112, 186, 99, 120, 90, 8, 194, 191, 88, 57, 242, 65, 61, 10, 104, 246, 197, 252, 19, 159, 58, 194, 75, 173, 242, 103, 8, 115, 84, 69, 238, 149, 26, 15, 159, 182, 141, 132, 119, 70, 29, 53, 20, 143, 46, 163, 204, 6, 236, 59, 45, 185, 172, 89, 119, 83, 38, 144, 36, 222, 96, 151, 26, 99, 195, 163, 170, 133, 92, 159, 214, 53, 150, 116, 90, 176, 69, 145, 130, 15, 172, 140, 217, 215, 101, 163, 115, 161, 65, 101, 8, 7, 183, 113, 213, 134, 58, 175, 130, 251, 143, 173, 248, 168, 135, 60, 159, 30, 194, 68, 208, 119, 120, 2, 40, 178, 227, 247, 161, 77, 47, 136, 46, 244, 163, 72, 65, 158, 25, 225, 195, 61, 132, 182, 204, 177, 186, 200, 81, 2, 65, 105, 212, 72, 94, 203, 232, 217, 182, 123, 251, 228, 160, 1, 161, 204, 123, 20, 37, 1, 77, 208, 179, 45, 149, 181, 122, 102, 190, 123, 213, 164, 231, 41, 216, 130, 234, 248, 208, 251, 252, 220, 84, 209, 67, 47, 61, 220, 5, 142, 162, 26, 236, 121, 142, 248, 132, 255, 65, 122, 203, 196, 102, 191, 187, 2, 195, 127, 255, 193, 92, 49, 91, 186, 154, 39, 156, 29, 211, 172, 49, 104, 245, 114, 153, 223, 211, 199, 249, 35, 130, 160, 128, 0, 152, 176, 183, 20, 236, 113, 193, 108, 26, 255, 11, 237, 102, 133, 245, 94, 115, 114, 10, 89, 229, 214, 221, 99, 149, 30, 99, 37, 246, 10, 26, 26, 39, 92, 123, 170, 73, 211, 127, 227, 54, 30, 86, 133, 159, 112, 225, 91, 148, 100, 174, 149, 75, 143, 14, 140, 20, 44, 64, 212, 5, 243, 8, 116, 63, 30, 97, 42, 123, 20, 73, 212, 85, 207, 83, 122, 27, 251, 233, 84, 10, 17, 236, 232, 83, 200, 127, 119, 143, 163, 204, 220, 167, 59, 231, 20, 106, 186, 222, 191, 8, 40, 234, 21, 25, 180, 13, 116, 250, 152, 224, 174, 75, 3, 205, 38, 173, 215, 236, 151, 185, 121, 254, 244, 154, 239, 17, 53, 106, 164, 61, 49, 116, 216, 118, 94, 150, 35, 181, 26, 238, 66, 49, 211, 221, 132, 146, 166, 115, 39, 136, 36, 205, 230, 179, 31, 197, 51, 148, 165, 109, 38, 70, 37, 148, 52, 44, 209, 250, 98, 58, 246, 225, 103, 198, 101, 26, 25, 196, 207, 8, 166, 21, 88, 252, 175, 253, 10, 88, 107, 157, 19, 225, 61, 12, 246, 221, 37, 239, 186, 167, 137, 142, 135, 222, 128, 174, 62, 95, 216, 38, 141, 157, 45, 232, 97, 217, 173, 203, 234, 116, 129, 69, 206, 189, 94, 221, 12, 54, 139, 186, 247, 184, 16, 200, 121, 244, 104, 8, 7, 35, 111, 47, 188, 10, 140, 92, 73, 143, 206, 203, 72, 122, 184, 20, 102, 197, 130, 64, 150, 63, 96, 239, 8, 132, 111, 217, 84, 91, 198, 32, 43, 100, 138, 241, 15, 160, 42, 190, 253, 193, 184, 164, 124, 29, 210, 96, 67, 224, 221, 182, 29, 218, 129, 149, 29, 128, 174, 98, 88, 88, 125, 56, 40, 255, 120, 5, 0, 87, 174, 42, 150, 90, 112, 201, 183, 169, 19, 57, 195, 191, 12, 58, 244, 235, 132, 25, 145, 72, 146, 214, 8, 125, 100, 135, 12, 5, 102, 97, 248, 174, 24, 159, 90, 33, 43, 187, 6, 61, 212, 241, 225, 190, 219, 252, 197, 123, 129, 164, 108, 123, 55, 230, 4, 153, 166, 105, 234, 15, 85, 216, 23, 56, 32, 3, 41, 110, 68, 146, 172, 133, 202, 98, 41, 7, 47, 152, 35, 255, 168, 106, 241, 226, 222, 77, 244, 52, 185, 65, 252, 227, 32, 66, 38, 11, 172, 60, 28, 28, 103, 84, 1, 1, 205, 182, 190, 28, 189, 102, 253, 43, 1, 191, 148, 116, 10, 227, 18, 81, 93, 80, 239, 157, 232, 215, 180, 163, 165, 161, 109, 177, 71, 150, 244, 144, 208, 160, 110, 22, 174, 60, 206, 43, 103, 121, 55, 103, 114, 115, 173, 238, 13, 10, 227, 251, 41, 176, 216, 158, 229, 216, 55, 234, 128, 128, 20, 167, 106, 181, 86, 163, 130, 215, 110, 149, 191, 10, 227, 215, 8, 214, 154, 178, 181, 15, 19, 0, 247, 250, 97, 74, 43, 157, 55, 94, 174, 41, 41, 9, 199, 97, 20, 91, 32, 18, 10, 43, 98, 240, 247, 203, 20, 250, 117, 160, 44, 229, 202, 187, 64, 54, 124, 15, 184, 169, 129, 27, 160, 240, 26, 61, 255, 60, 166, 60, 144, 209, 84, 55, 187, 186, 168, 13, 124, 125, 29, 17, 100, 249, 227, 62, 205, 78, 179, 163, 168, 139, 168, 21, 38, 83, 239, 151, 74, 43, 66, 2, 92, 72, 71, 94, 216, 134, 238, 20, 45, 158, 213, 164, 73, 57, 80, 47, 198, 184, 130, 223, 227, 71, 132, 133, 235, 177, 85, 174, 142, 124, 172, 200, 54, 229, 40, 126, 60, 76, 92, 216, 153, 56, 241, 174, 66, 141, 90, 226, 3, 30, 68, 234, 71, 187, 163, 112, 146, 255, 22, 143, 170, 204, 3, 127, 179, 81, 139, 160, 37, 77, 246, 128, 220, 196, 158, 153, 73, 177, 65, 199, 119, 29, 197, 144, 130, 248, 206, 155, 253, 108, 213, 124, 7, 223, 221, 162, 146, 134, 242, 65, 99, 162, 107, 120, 247, 214, 207, 96, 150, 169, 131, 208, 218, 221, 28, 24, 112, 208, 23, 1, 130, 142, 232, 56, 104, 45, 33, 158, 95, 255, 123, 31, 74, 76, 120, 178, 155, 213, 6, 195, 164, 8, 8, 69, 241, 197, 127, 83, 169, 21, 167, 19, 94, 143, 252, 33, 159, 248, 241, 170, 153, 147, 1, 149, 199, 201, 131, 170, 79, 236, 212, 209, 143, 107, 98, 24, 123, 56, 33, 193, 85, 247, 64, 225, 135, 210, 78, 145, 57, 16, 145, 71, 170, 20, 133, 87, 235, 4, 166, 239, 100, 82, 235, 81, 50, 223, 9, 193, 52, 49, 86, 129, 190, 196, 82, 165, 107, 63, 115, 161, 98, 33, 20, 193, 29, 42, 151, 205, 252, 124, 72, 245, 48, 181, 67, 7, 13, 21, 127, 59, 226, 188, 144, 129, 112, 244, 192, 121, 213, 80, 42, 196, 1, 13, 107, 108, 78, 0, 40, 121, 225, 148, 237, 234, 209, 216, 238, 9, 147, 226, 254, 96, 89, 212, 72, 193, 106, 75, 135, 74, 227, 67, 255, 92, 191, 81, 188, 124, 226, 149, 152, 142, 15, 159, 195, 238, 114, 55, 255, 166, 157, 230, 59, 148, 170, 166, 151, 65, 213, 104, 253, 253, 112, 150, 82, 147, 137, 27, 214, 100, 247, 65, 81, 92, 47, 86, 217, 7, 45, 120, 81, 130, 31, 236, 243, 76, 78, 3, 45, 105, 172, 220, 71, 48, 220, 94, 196, 249, 163, 193, 133, 50, 236, 205, 20, 55, 2, 63, 14, 127, 69, 113, 212, 204, 12, 58, 79, 89, 86, 29, 61, 199, 201, 64, 149, 6, 144, 182, 150, 129, 31, 18, 167, 120, 248, 82, 107, 25, 143, 128, 27, 161, 28, 25, 153, 183, 217, 238, 78, 186, 106, 92, 27, 202, 219, 165, 96, 0, 216, 234, 169, 73, 101, 39, 182, 113, 217, 240, 170, 116, 172, 221, 250, 233, 48, 49, 242, 83, 227, 92, 181, 184, 72, 230, 180, 21, 15, 108, 135, 25, 38, 153, 25, 124, 227, 26, 149, 73, 236, 39, 211, 244, 149, 58, 183, 132, 26, 223, 219, 174, 144, 117, 233, 219, 165, 205, 157, 159, 222, 184, 52, 47, 241, 201, 123, 65, 24, 44, 55, 215, 177, 168, 250, 179, 115, 190, 227, 123, 158, 163, 179, 224, 69, 196, 66, 207, 254, 243, 101, 221, 193, 140, 250, 4, 28, 222, 52, 96, 138, 160, 33, 218, 64, 118, 214, 234, 201, 152, 148, 91, 178, 111, 107, 144, 142, 6, 182, 102, 72, 188, 34, 213, 181, 26, 223, 58, 255, 103, 81, 17, 47, 169, 11, 245, 224, 123, 148, 215, 237, 186, 107, 75, 152, 90, 202, 166, 22, 149, 197, 5, 246, 238, 78, 76, 229, 106, 199, 94, 127, 195, 0, 45, 82, 6, 159, 103, 96, 138, 231, 71, 46, 107, 59, 216, 39, 43, 12, 221, 27, 214, 56, 155, 145, 66, 187, 169, 250, 235, 78, 211, 179, 239, 183, 198, 163, 93, 5, 196, 24, 174, 143, 225, 106, 139, 89, 98, 13, 127, 207, 184, 194, 30, 1, 165, 198, 169, 8, 197, 118, 86, 163, 221, 138, 23, 209, 61, 116, 79, 99, 233, 43, 130, 60, 244, 85, 229, 243, 172, 123, 148, 200, 120, 192, 127, 211, 52, 11, 159, 41, 95, 212, 230, 188, 169, 156, 137, 29, 212, 12, 148, 168, 148, 133, 243, 44, 241, 139, 127, 24, 246, 220, 227, 125, 209, 97, 60, 52, 162, 192, 146, 49, 161, 92, 138, 112, 189, 128, 59, 126, 125, 46, 207, 60, 79, 231, 174, 152, 209, 68, 223, 205, 2, 38, 14, 91, 116, 159, 255, 28, 27, 178, 248, 164, 104, 158, 79, 69, 214, 234, 157, 12, 75, 163, 83, 253, 245, 202, 61, 213, 176, 6, 197, 230, 29, 208, 166, 253, 194, 254, 235, 29, 141, 241, 70, 249, 15, 62, 0, 148, 163, 135, 52, 122, 40, 96, 87, 31, 179, 152, 51, 216, 133, 184, 122, 198, 203, 60, 115, 218, 191, 193, 16, 178, 25, 148, 252, 112, 104, 103, 252, 36, 92, 221, 28, 179, 43, 199, 198, 151, 128, 100, 252, 217, 161, 249, 34, 201, 172, 118, 52, 180, 252, 104, 7, 223, 44, 116, 102, 212, 21, 40, 224, 184, 55, 163, 210, 21, 207, 161, 239, 51, 54, 155, 41, 133, 18, 67, 48, 3, 165, 130, 251, 4, 79, 214, 57, 72, 130, 157, 212, 144]
      , yo = [0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 26, 29, 31, 34, 36, 39, 41, 44, 46, 49, 51, 54, 56, 59, 61, 64, 65, 66, 67, 68, 69, 70, 72, 73, 74, 75, 76, 77, 79, 80, 81, 82, 83, 84, 85, 87, 88, 89, 90, 91, 92, 94, 95, 96, 97, 98, 99, 101, 102, 103, 104, 105, 106, 107, 109, 110, 111, 112, 113, 114, 116, 117, 118, 119, 120, 121, 123, 124, 125, 126, 127, 128, 129, 131, 132, 133, 134, 135, 136, 138, 139, 140, 141, 142, 143, 145, 146, 147, 148, 149, 150, 151, 153, 154, 155, 156, 157, 158, 160, 161, 162, 163, 164, 165, 166, 168, 169, 170, 171, 172, 173, 175, 176, 177, 178, 179, 180, 182, 183, 184, 185, 186, 187, 188, 190, 191, 192, 193, 194, 195, 197, 198, 199, 200, 201, 202, 204, 205, 206, 207, 208, 209, 210, 212, 213, 214, 215, 216, 217, 219, 220, 221, 222, 223, 224, 226, 226, 226, 227, 227, 227, 228, 228, 228, 229, 229, 229, 230, 230, 231, 231, 231, 232, 232, 232, 233, 233, 233, 234, 234, 235, 235, 235, 236, 236, 236, 237, 237, 237, 238, 238, 239, 239, 239, 240, 240, 240, 241, 241, 241, 242, 242, 243, 243, 243, 244, 244, 244, 245, 245, 245, 246, 246, 246, 247, 247, 247, 248, 248, 248, 249, 249, 249, 250, 250, 250, 251, 251, 251, 252, 252, 252, 253, 253, 253, 254, 254, 254, 255]
      , Ok = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 35, 36, 37, 39, 40, 42, 43, 44, 46, 47, 49, 50, 51, 53, 54, 56, 57, 58, 59, 61, 62, 63, 64, 66, 67, 68, 69, 71, 72, 73, 74, 76, 77, 78, 79, 81, 82, 83, 84, 86, 87, 88, 90, 91, 92, 93, 95, 96, 97, 98, 100, 101, 102, 103, 105, 106, 107, 108, 110, 111, 112, 113, 115, 116, 117, 118, 120, 121, 122, 124, 125, 126, 127, 129, 130, 131, 132, 134, 135, 136, 137, 139, 140, 141, 142, 144, 145, 146, 147, 149, 150, 151, 152, 154, 155, 156, 158, 159, 160, 161, 163, 164, 165, 166, 168, 169, 170, 171, 173, 174, 175, 176, 178, 179, 180, 181, 183, 184, 185, 186, 188, 189, 190, 192, 193, 194, 195, 197, 198, 199, 200, 202, 203, 204, 205, 207, 208, 209, 210, 212, 213, 214, 215, 217, 218, 219, 220, 222, 223, 224, 226, 226, 226, 227, 227, 228, 228, 229, 229, 230, 230, 231, 231, 232, 232, 233, 233, 234, 234, 234, 235, 235, 236, 236, 237, 237, 238, 238, 239, 239, 240, 240, 241, 241, 242, 242, 243, 243, 243, 244, 244, 244, 245, 245, 245, 246, 246, 246, 247, 247, 247, 248, 248, 248, 249, 249, 249, 250, 250, 250, 251, 251, 251, 252, 252, 252, 253, 253, 253, 254, 254, 254, 255]
      , zo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 58, 59, 60, 61, 62, 63, 65, 66, 67, 68, 69, 70, 72, 73, 74, 76, 77, 78, 80, 81, 83, 84, 85, 87, 88, 89, 91, 92, 94, 95, 96, 98, 99, 100, 102, 103, 105, 106, 107, 109, 110, 111, 113, 114, 116, 117, 118, 120, 121, 122, 124, 125, 127, 128, 129, 131, 132, 133, 135, 136, 138, 139, 140, 142, 143, 144, 146, 147, 149, 150, 151, 153, 154, 155, 157, 158, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 192, 193, 193, 194, 195, 195, 196, 197, 197, 198, 199, 199, 200, 201, 201, 202, 203, 203, 204, 205, 205, 206, 207, 207, 208, 209, 209, 210, 211, 211, 212, 213, 213, 214, 215, 215, 216, 217, 217, 218, 219, 219, 220, 221, 221, 222, 223, 223, 224, 225, 225, 226, 227, 227, 228, 229, 229, 230, 231, 231, 232, 233, 233, 234, 235, 235, 236, 237, 237, 238, 239, 239, 240, 241, 241, 242, 243, 243, 244, 245, 245, 246, 247, 247, 248, 249, 249, 250, 251, 251, 252, 253, 253, 254, 255];
    class Ao extends Nb {
        constructor(a, b, c, e) {
            super(a, xo, c, e);
            this.lightLevel = .1;
            this.rednessLevel = .5;
            this.mskin_he_max = 175 / 180 * 3.141593;
            this.mskin_he_min = 115 / 180 * 3.141593;
            this.mskin_hc_max = 173 / 180 * 3.141593;
            this.mskin_hc_min = 116 / 180 * 3.141593;
            this.mskin_hc_axis = 2.04203545;
            this.mfacts_rotate_ge = this.mfacts_rotate_le = this.mfacts_rotate_c = 0;
            this.tab_addr = null;
            this.lutTextures = [];
            this.inputTexture = b;
            this.init()
        }
        setUniforms() {
            var a = this.gl.getUniformLocation(this.program, "u_flipY")
              , b = this.gl.getUniformLocation(this.program, "u_denoiseLevel");
            this.gl.uniform1f(b, this.denoiseLevel);
            this.gl.uniform1f(a, 1);
            a = this.gl.getUniformLocation(this.program, "light");
            this.gl.uniform1f(a, this.lightLevel);
            a = this.gl.getUniformLocation(this.program, "redness");
            this.gl.uniform1f(a, this.rednessLevel);
            a = this.gl.getUniformLocation(this.program, "skin_he_max");
            b = this.gl.getUniformLocation(this.program, "skin_he_min");
            var c = this.gl.getUniformLocation(this.program, "skin_hc_max")
              , e = this.gl.getUniformLocation(this.program, "skin_hc_min");
            let g = this.gl.getUniformLocation(this.program, "skin_hc_axis")
              , h = this.gl.getUniformLocation(this.program, "facts_rotate_c")
              , k = this.gl.getUniformLocation(this.program, "facts_rotate_le")
              , l = this.gl.getUniformLocation(this.program, "facts_rotate_ge");
            this.gl.uniform1f(a, this.mskin_he_max);
            this.gl.uniform1f(b, this.mskin_he_min);
            this.gl.uniform1f(c, this.mskin_hc_max);
            this.gl.uniform1f(e, this.mskin_hc_min);
            this.gl.uniform1f(g, this.mskin_hc_axis);
            this.gl.uniform1f(h, this.mfacts_rotate_c);
            this.gl.uniform1f(k, this.mfacts_rotate_le);
            this.gl.uniform1f(l, this.mfacts_rotate_ge);
            a = this.gl.getUniformLocation(this.program, "u_originImage");
            this.gl.activeTexture(this.gl.TEXTURE2);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.inputTexture);
            this.gl.uniform1i(a, 2);
            a = ["lighten_lut"];
            b = [this.gl.TEXTURE3];
            for (c = 0; c < a.length; c++)
                e = this.gl.getUniformLocation(this.program, a[c]),
                this.gl.activeTexture(b[c]),
                this.gl.bindTexture(this.gl.TEXTURE_2D, this.lutTextures[c]),
                this.gl.uniform1i(e, c + 3)
        }
        setParameters(a) {
            void 0 !== a.denoiseLevel && (this.denoiseLevel = a.denoiseLevel);
            void 0 !== a.lightLevel && (this.lightLevel = a.lightLevel);
            void 0 !== a.rednessLevel && (this.rednessLevel = a.rednessLevel,
            this.updateRedness(this.rednessLevel));
            a.lighteningContrastLevel && this.updateLut(a.lighteningContrastLevel)
        }
        init() {
            this.tab_addr = new Uint8Array(Ok);
            let a = [this.tab_addr]
              , b = [256]
              , c = [1];
            for (let e = 0; e < a.length; e++) {
                let g = this.gl.createTexture();
                if (!g)
                    throw new p(n.WEBGL_INTERNAL_ERROR,"create lut texture failed");
                this.gl.bindTexture(this.gl.TEXTURE_2D, g);
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.LUMINANCE, b[e], c[e], 0, this.gl.LUMINANCE, this.gl.UNSIGNED_BYTE, a[e]);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
                this.lutTextures.push(g)
            }
        }
        updateRedness(a) {
            var b = a;
            1 < a && (a = 1);
            0 > a && (a = 0);
            1 < b && (b = 1);
            0 > b && (b = 0);
            this.mfacts_rotate_c = .8 * a;
            .8 > b && (b = 0);
            this.mskin_he_max = 175 / 180 * 3.141593;
            this.mskin_hc_max = 173 / 180 * 3.141593;
            this.mskin_he_min = (115 - 4 * b) / 180 * 3.141593;
            this.mskin_hc_min = (116 - 4 * b) / 180 * 3.141593;
            this.mskin_hc_axis = (117 - 4 * b) / 180 * 3.141593;
            this.mskin_hc_axis < this.mskin_hc_min && (this.mskin_hc_axis = this.mskin_hc_min);
            1.5707965 > this.mskin_hc_min && (this.mskin_hc_min = 1.5707965);
            1.5707965 > this.mskin_hc_axis && (this.mskin_hc_axis = 1.5707965);
            1.5707965 > this.mskin_he_min && (this.mskin_he_min = 1.5707965);
            3.141593 < this.mskin_hc_max && (this.mskin_hc_max = 3.141593);
            3.141593 < this.mskin_hc_axis && (this.mskin_hc_axis = 3.141593);
            3.141593 < this.mskin_he_max && (this.mskin_he_max = 3.141593);
            a = this.mskin_he_max - this.mskin_hc_max;
            b = this.mskin_hc_max - this.mskin_hc_axis;
            this.mfacts_rotate_ge = .01 < a ? this.mfacts_rotate_c * b / a : this.mfacts_rotate_c;
            a = this.mskin_hc_min - this.mskin_he_min;
            b = this.mskin_hc_axis - this.mskin_hc_min;
            this.mfacts_rotate_le = .01 < a ? this.mfacts_rotate_c * b / a : this.mfacts_rotate_c
        }
        updateLut(a) {
            var b = null;
            if (0 === a && (b = Ok),
            1 === a && (b = zo),
            2 === a && (b = yo),
            !b)
                throw new p(n.WEBGL_INTERNAL_ERROR,"invalid ylut_table value:" + a);
            this.tab_addr = new Uint8Array(b);
            a = [this.tab_addr];
            b = [256];
            let c = [1];
            for (let e = 0; e < a.length; e++)
                this.gl.bindTexture(this.gl.TEXTURE_2D, this.lutTextures[e]),
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.LUMINANCE, b[e], c[e], 0, this.gl.LUMINANCE, this.gl.UNSIGNED_BYTE, a[e])
        }
    }
    class Bo {
        constructor() {
            this.canvas = this.gl = null;
            this.programs = [];
            this.inputTexture = this.commonProgram = null;
            this.outputTextures = [];
            this.fbos = [];
            this.originalFrameHeight = this.originalFrameWidth = 0;
            this.enableBeauty = !1;
            this.denoiseLevel = 5;
            this.lightLevel = .35;
            this.rednessLevel = .5;
            this.lighteningContrastLevel = 1
        }
        setEnableBeauty(a) {
            this.enableBeauty = !!a
        }
        init(a, b, c) {
            if (!ca.supportWebGL)
                throw new p(n.NOT_SUPPORTED,"your browser is not support webGL");
            if (this.gl = c.getContext("webgl"),
            !this.gl)
                throw new p(n.WEBGL_INTERNAL_ERROR,"can not get webgl context");
            if (this.initGL(a, b),
            !this.inputTexture)
                throw new p(n.WEBGL_INTERNAL_ERROR,"can not find input texture");
            this.canvas = c;
            this.programs.push(new Nk(this.gl));
            this.programs.push(new so(this.gl,a,b));
            this.programs.push(new uo(this.gl,a,b));
            this.programs.push(new wo(this.gl,a,b));
            this.programs.push(new Ao(this.gl,this.inputTexture,a,b));
            this.commonProgram = this.programs[0].program;
            this.setDenoiseLevel(this.denoiseLevel);
            this.setLightLevel(this.lightLevel);
            this.setRednessLevel(this.rednessLevel);
            this.setContrastLevel(this.lighteningContrastLevel)
        }
        render(a) {
            if (!this.gl || !this.commonProgram || !this.canvas)
                return void k.warning("video effect manager is not init!");
            var b = 0;
            if (this.originalFrameHeight === a.videoWidth && this.originalFrameWidth === a.videoHeight)
                b = 2;
            else if (this.originalFrameHeight !== a.videoHeight || this.originalFrameWidth !== a.videoWidth) {
                var c, e, g;
                if (k.debug(l(c = l(e = l(g = "beauty effect: resolution changed ".concat(this.originalFrameWidth, "x")).call(g, this.originalFrameHeight, " -> ")).call(e, a.videoWidth, "x")).call(c, a.videoHeight)),
                0 === a.videoHeight || 0 === a.videoWidth)
                    return void k.debug("beauty effect: skip 0 resolution frame");
                this.canvas.width = a.videoWidth;
                this.canvas.height = a.videoHeight;
                a.setAttribute("width", a.videoWidth.toString());
                a.setAttribute("height", a.videoHeight.toString());
                this.release();
                this.init(a.videoWidth, a.videoHeight, this.canvas)
            }
            this.gl.viewport(0, 0, a.videoWidth, a.videoHeight);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.inputTexture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, a);
            a = this.enableBeauty ? this.programs.length - 1 : 0;
            for (c = 0; c <= a; c++)
                e = this.programs[c].program,
                this.gl.useProgram(e),
                e = this.gl.getUniformLocation(e, "u_image"),
                this.programs[c].setUniforms(),
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbos[b + c % 2]),
                this.gl.clearColor(0, 0, 0, 1),
                this.gl.clear(this.gl.COLOR_BUFFER_BIT),
                this.gl.drawArrays(this.gl.TRIANGLES, 0, 6),
                this.gl.activeTexture(this.gl.TEXTURE0),
                this.gl.bindTexture(this.gl.TEXTURE_2D, this.outputTextures[b + c % 2]),
                this.gl.uniform1i(e, 0);
            this.gl.useProgram(this.commonProgram);
            b = this.gl.getUniformLocation(this.commonProgram, "u_flipY");
            this.gl.uniform1f(b, -1);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.clearColor(0, 0, 0, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
        }
        setDenoiseLevel(a) {
            var b;
            q(b = this.programs).call(b, b=>{
                b instanceof Nb && b.setParameters({
                    denoiseLevel: a
                })
            }
            );
            this.denoiseLevel = a
        }
        setLightLevel(a) {
            var b;
            q(b = this.programs).call(b, b=>{
                b instanceof Nb && b.setParameters({
                    lightLevel: a
                })
            }
            );
            this.lightLevel = a
        }
        setRednessLevel(a) {
            var b;
            q(b = this.programs).call(b, b=>{
                b instanceof Nb && b.setParameters({
                    rednessLevel: a
                })
            }
            );
            this.rednessLevel = a
        }
        setContrastLevel(a) {
            var b;
            q(b = this.programs).call(b, b=>{
                b instanceof Nb && b.setParameters({
                    lighteningContrastLevel: a
                })
            }
            );
            this.lighteningContrastLevel = a
        }
        setSize(a, b) {
            var c;
            q(c = this.programs).call(c, c=>{
                c instanceof Nb && c.setSize(a, b)
            }
            )
        }
        release() {
            this.inputTexture = this.commonProgram = this.gl = null;
            this.programs = [];
            this.outputTextures = [];
            this.fbos = []
        }
        initGL(a, b) {
            if (!this.gl)
                throw new p(n.WEBGL_INTERNAL_ERROR,"can not find webgl context");
            this.inputTexture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.inputTexture);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            for (let c = 0; 4 > c; c++) {
                let e = this.gl.createTexture();
                if (!e)
                    throw new p(n.WEBGL_INTERNAL_ERROR,"create texture failed");
                this.gl.bindTexture(this.gl.TEXTURE_2D, e);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
                2 > c ? this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, a, b, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null) : this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, b, a, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
                let g = this.gl.createFramebuffer();
                if (!g)
                    throw new p(n.WEBGL_INTERNAL_ERROR,"create frame buffer failed");
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, g);
                this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, e, 0);
                this.outputTextures.push(e);
                this.fbos.push(g)
            }
            this.gl.viewport(0, 0, a, b);
            this.originalFrameWidth = a;
            this.originalFrameHeight = b
        }
    }
    class Co {
        constructor() {
            this.recordedFrameCount = this.targetFrameRate = 0;
            this.recordingTime = 2
        }
        async startRecordBeautyEffectOutput(a, b=4) {
            if (this.recordID)
                throw new p(n.UNEXPECTED_ERROR,"another beauty effect recording is in progress");
            let c = qa(6, "");
            return this.recordID = c,
            this.targetFrameRate = a,
            this.recordedFrameCount = 0,
            this.recordingTime = b,
            await wb(1E3 * this.recordingTime),
            this.recordID !== c ? (this.recordID = void 0,
            !0) : (this.recordID = void 0,
            this.recordedFrameCount < this.targetFrameRate * this.recordingTime / 2 ? (k.warning("detect beauty effect overload, current framerate", this.recordedFrameCount / 2),
            !1) : (k.debug("beauty effect current framerate", this.recordedFrameCount / 2),
            !0))
        }
        stopRecordBeautyEffectOutput() {
            this.recordedFrameCount = this.targetFrameRate = 0;
            this.recordID = void 0
        }
        addFrame() {
            this.recordID && (this.recordedFrameCount += 1)
        }
    }
    class Do extends class {
        get output() {
            return this._output
        }
        async setInput(a) {
            if (a !== this.input) {
                if (a.kind !== this.kind)
                    throw new p(n.UNEXPECTED_ERROR);
                this.input && this.removeInput();
                this.input = a;
                await this._setInput(a)
            }
        }
        removeInput() {
            this.input = void 0;
            this._removeInput()
        }
        async updateOutput(a) {
            this.output !== a && (this._output = a,
            this.onOutputChange && await this.onOutputChange())
        }
        replaceOriginMediaStream(a, b) {
            var c, e;
            let g = R(c = a.getTracks()).call(c, a=>a.kind === this.kind);
            g && a.removeTrack(g);
            b = R(e = b.getTracks()).call(e, a=>a.kind === this.kind);
            void 0 === this.output && b && a.addTrack(b);
            this.output && (k.debug("replace ".concat(this.output.kind, " track to origin media stream")),
            a.addTrack(this.output))
        }
    }
    {
        constructor() {
            super();
            this.kind = "video";
            this.fps = 15;
            this.overloadDetector = new Co;
            this.enabled = !1;
            this.stopChromeBackgroundLoop = null;
            this.lastRenderTime = 0;
            this.fps = 30;
            this.manager = new Bo
        }
        async setBeautyEffectOptions(a, b) {
            void 0 !== b.smoothnessLevel && V(b.smoothnessLevel, "options.smoothnessLevel", 0, 1, !1);
            void 0 !== b.lighteningLevel && V(b.lighteningLevel, "options.lighteningLevel", 0, 1, !1);
            void 0 !== b.rednessLevel && V(b.rednessLevel, "options.rednessLevel", 0, 1, !1);
            void 0 !== b.lighteningContrastLevel && Ka(b.lighteningContrastLevel, "options.lighteningContrastLevel", [0, 1, 2]);
            void 0 !== b.smoothnessLevel && this.manager.setDenoiseLevel(Math.max(.1, 10 * b.smoothnessLevel));
            void 0 !== b.lighteningLevel && this.manager.setLightLevel(Math.max(.1, b.lighteningLevel / 2));
            void 0 !== b.rednessLevel && this.manager.setRednessLevel(Math.max(.01, b.rednessLevel));
            void 0 !== b.lighteningContrastLevel && this.manager.setContrastLevel(b.lighteningContrastLevel);
            this.enabled !== a && (this.manager.setEnableBeauty(a),
            this.enabled = a,
            a ? this.input && await this.startEffect() : await this.stopEffect())
        }
        destroy() {
            this.onOutputChange = void 0;
            this.stopEffect();
            this.enabled = !1
        }
        async startEffect() {
            let a = ma();
            if (!this.input)
                return void k.warning("video track is null, fail to start video effect!");
            if (this.output)
                return void k.warning("video effect is already enabled");
            let b = await this.renderWithWebGL();
            await this.updateOutput(b);
            k.info("start video effect, output:", this.output);
            this.overloadDetector.startRecordBeautyEffectOutput(this.fps).then(a=>{
                a || this.onOverload && this.onOverload()
            }
            );
            let c = ()=>{
                requestAnimationFrame(c);
                const a = x()
                  , b = 1E3 / this.fps
                  , h = this.lastRenderTime ? a - this.lastRenderTime : b;
                h < b || (this.lastRenderTime = a - (h - b),
                this.video && this.video.paused && this.video.play(),
                this.enabled && this.video && (this.manager.render(this.video),
                this.output && this.output.requestFrame && this.output.requestFrame(),
                this.overloadDetector.addFrame()))
            }
            ;
            requestAnimationFrame(c);
            a.name === ba.CHROME && document.addEventListener("visibilitychange", ()=>{
                document.hidden ? this.stopChromeBackgroundLoop = He(()=>{
                    this.enabled && this.video && this.manager.render(this.video);
                    this.output && this.output.requestFrame && this.output.requestFrame();
                    this.overloadDetector.addFrame()
                }
                , this.fps) : this.stopChromeBackgroundLoop && (this.stopChromeBackgroundLoop(),
                this.stopChromeBackgroundLoop = null)
            }
            , !1)
        }
        async stopEffect() {
            k.info("stop video effect");
            this.overloadDetector.stopRecordBeautyEffectOutput();
            this.manager.release();
            this.canvas && this.canvas.remove();
            this.video && this.video.remove();
            this.video = this.canvas = void 0;
            await this.updateOutput(void 0)
        }
        async _setInput(a) {
            this.enabled && !this.video && await this.startEffect()
        }
        _removeInput() {
            this.stopEffect()
        }
        async renderWithWebGL() {
            var a;
            if (!this.input)
                throw new p(n.BEAUTY_PROCESSOR_INTERNAL_ERROR,"can not renderWithWebGL, no input");
            this.canvas && (this.canvas.remove(),
            this.canvas = void 0);
            this.video && (this.video.remove(),
            this.video = void 0);
            this.canvas = document.createElement("canvas");
            this.video = document.createElement("video");
            this.video.setAttribute("autoplay", "");
            this.video.setAttribute("muted", "");
            this.video.muted = !0;
            this.video.setAttribute("playsinline", "");
            this.video.setAttribute("style", "display:none");
            this.video.srcObject = new MediaStream([this.input]);
            let b = new B(a=>{
                const b = ()=>{
                    this.video && this.video.removeEventListener("playing", b);
                    a(void 0)
                }
                ;
                this.video && this.video.addEventListener("playing", b)
            }
            )
              , c = this.input.getSettings()
              , e = c.width
              , g = c.height;
            if (c.frameRate && this.fps !== c.frameRate && (this.fps = c.frameRate,
            k.debug("beauty video processor: set fps to", this.fps)),
            k.debug(l(a = "beauty video processor: width ".concat(e, " height ")).call(a, g)),
            !e || !g)
                throw new p(n.BEAUTY_PROCESSOR_INTERNAL_ERROR,"can not get track resolution");
            this.canvas.width = e;
            this.canvas.height = g;
            this.video.setAttribute("width", e.toString());
            this.video.setAttribute("height", g.toString());
            this.manager.init(e, g, this.canvas);
            this.video.play();
            await b;
            return this.canvas.captureStream(ca.supportRequestFrame ? 0 : this.fps).getVideoTracks()[0]
        }
    }
    class Ma extends me {
        constructor(a, b, c, e, g) {
            super(a, g);
            this.trackMediaType = "video";
            this._scalabiltyMode = {
                numSpatialLayers: 1,
                numTemporalLayers: 1
            };
            this._enabled = !0;
            this.updateMediaStreamTrackResolution();
            this._encoderConfig = b;
            this._scalabiltyMode = c;
            this._optimizationMode = e
        }
        get isPlaying() {
            return !(!this._player || this._player.videoElementStatus !== Ca.PLAYING)
        }
        play(a, b={}) {
            let c = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.LOCAL_VIDEO_TRACK_PLAY,
                options: [this.getTrackId(), "string" == typeof a ? a : "HTMLElement", b]
            });
            if (!(a instanceof HTMLElement)) {
                let b = document.getElementById(a.toString());
                var e;
                b ? a = b : (k.warning(l(e = "[track-".concat(this.getTrackId(), '] can not find "#')).call(e, a, '" element, use document.body')),
                a = document.body)
            }
            k.debug("[track-".concat(this.getTrackId(), "] start video playback"), w(b));
            a = Hd({}, this._getDefaultPlayerConfig(), {}, b, {
                trackId: this.getTrackId(),
                element: a
            });
            this._player ? this._player.updateConfig(a) : (this._player = new Lk(a),
            this._player.updateVideoTrack(this._mediaStreamTrack));
            this._player.play();
            c.onSuccess()
        }
        stop() {
            let a = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.LOCAL_VIDEO_TRACK_STOP,
                options: [this.getTrackId()]
            });
            if (!this._player)
                return a.onSuccess();
            this._player.destroy();
            this._player = void 0;
            k.debug("[track-".concat(this.getTrackId(), "] stop video playback"));
            a.onSuccess()
        }
        async setEnabled(a) {
            if (a !== this._enabled) {
                k.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
                var b = await this._enabledMutex.lock();
                if (!a) {
                    this._originMediaStreamTrack.enabled = !1;
                    try {
                        await Pa(this, L.NEED_REMOVE_TRACK, this)
                    } catch (c) {
                        throw k.error("[".concat(this.getTrackId(), "] setEnabled to false error"), c.toString()),
                        b(),
                        c;
                    }
                    return this._enabled = !1,
                    k.info("[".concat(this.getTrackId(), "] setEnabled to false success")),
                    b()
                }
                this._originMediaStreamTrack.enabled = !0;
                try {
                    await Pa(this, L.NEED_ADD_TRACK, this)
                } catch (c) {
                    throw k.error("[".concat(this.getTrackId(), "] setEnabled to true error"), c.toString()),
                    b(),
                    c;
                }
                k.info("[".concat(this.getTrackId(), "] setEnabled to true success"));
                this._enabled = !0;
                b()
            }
        }
        getStats() {
            Oc(()=>{
                k.warning("[deprecated] LocalVideoTrack.getStats will be removed in the future, use AgoraRTCClient.getLocalVideoStats instead")
            }
            , "localVideoTrackGetStatsWarning");
            return Wb(this, L.GET_STATS) || Hd({}, ke)
        }
        async setBeautyEffect(a, b={}) {
            let c = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.LOCAL_VIDEO_TRACK_BEAUTY,
                options: [this.getTrackId(), a, b]
            });
            if (a || this._videoBeautyProcessor) {
                if (ma().os === W.IOS || ma().os === W.ANDROID)
                    throw a = new p(n.INVALID_OPERATION,"can not enable beauty effect on mobile device"),
                    c.onError(a),
                    a;
                if (!this._enabled && a)
                    throw a = new p(n.TRACK_IS_DISABLED,"can not enable beauty effect when track is disabled"),
                    c.onError(a),
                    a;
                k.info("[".concat(this.getTrackId(), "] start setBeautyEffect"), a, w(b));
                try {
                    this._videoBeautyProcessor ? await this._videoBeautyProcessor.setBeautyEffectOptions(a, b) : (this._videoBeautyProcessor = new Do,
                    this._videoBeautyProcessor.onOverload = ()=>{
                        Za(()=>this.emit(fd.BEAUTY_EFFECT_OVERLOAD))
                    }
                    ,
                    await this._videoBeautyProcessor.setBeautyEffectOptions(a, b),
                    await this._registerTrackProcessor(this._videoBeautyProcessor))
                } catch (e) {
                    throw k.error("[".concat(this.getTrackId(), "] setBeautyEffect error"), e.toString()),
                    c.onError(e),
                    e;
                }
                k.info("[".concat(this.getTrackId(), "] setBeautyEffect success"));
                c.onSuccess()
            }
        }
        getCurrentFrameData() {
            return this._player ? this._player.getCurrentFrame() : new ImageData(2,2)
        }
        clone(a, b, c, e) {
            let g = this._mediaStreamTrack.clone();
            return new Ma(g,a,b,c,e)
        }
        async setBitrateLimit(a) {
            var b;
            if (k.debug(l(b = "[".concat(this.getTrackId(), "] set bitrate limit, ")).call(b, w(a))),
            a) {
                this._forceBitrateLimit = a;
                this._encoderConfig && (this._encoderConfig.bitrateMax ? this._encoderConfig.bitrateMax = this._encoderConfig.bitrateMax < a.max_bitrate ? this._encoderConfig.bitrateMax : a.max_bitrate : this._encoderConfig.bitrateMax = a.max_bitrate,
                this._encoderConfig.bitrateMin,
                this._encoderConfig.bitrateMin = a.min_bitrate);
                try {
                    await Pa(this, L.NEED_RESET_REMOTE_SDP)
                } catch (c) {
                    return c.throw()
                }
            }
        }
        async setOptimizationMode(a) {
            var b;
            if ("motion" === a || "detail" === a || "balanced" === a) {
                try {
                    this._optimizationMode = a,
                    await Pa(this, L.SET_OPTIMIZATION_MODE, a)
                } catch (c) {
                    throw k.error("[".concat(this.getTrackId(), "] set optimization mode failed"), c.toString()),
                    c;
                }
                k.info(l(b = "[".concat(this.getTrackId(), "] set optimization mode success (")).call(b, a, ")"))
            } else
                k.error(n.INVALID_PARAMS, "optimization mode must be motion, detail or balanced")
        }
        setScalabiltyMode(a) {
            var b;
            if (1 === a.numSpatialLayers && 1 !== a.numTemporalLayers)
                return k.error(n.INVALID_PARAMS, "scalability mode currently not supported, no SVC."),
                void (this._scalabiltyMode = {
                    numSpatialLayers: 1,
                    numTemporalLayers: 1
                });
            this._scalabiltyMode = a;
            k.info(l(b = "[".concat(this.getTrackId(), "] set scalability mode success (")).call(b, a, ")"))
        }
        updateMediaStreamTrackResolution() {
            jh(this._originMediaStreamTrack).then(([a,b])=>{
                this._videoHeight = b;
                this._videoWidth = a
            }
            ).catch(Wf)
        }
        _updatePlayerSource() {
            this._player && this._player.updateVideoTrack(this._mediaStreamTrack)
        }
        _getDefaultPlayerConfig() {
            return {
                fit: "contain"
            }
        }
    }
    class Pk extends Ma {
        constructor(a, b, c, e, g, h) {
            super(a, b.encoderConfig ? jc(b.encoderConfig) : {}, e, g, h);
            this._enabled = !0;
            this._deviceName = "default";
            this._config = b;
            this._constraints = c;
            this._deviceName = a.label;
            this._config.encoderConfig && (this._encoderConfig = jc(this._config.encoderConfig))
        }
        async setDevice(a) {
            var b;
            let c = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.CAM_VIDEO_TRACK_SET_DEVICE,
                options: [this.getTrackId(), a]
            });
            if (k.info(l(b = "[track-".concat(this.getTrackId(), "] set device to ")).call(b, a)),
            this._enabled)
                try {
                    let c = await cb.getDeviceById(a);
                    b = {};
                    b.video = Hd({}, this._constraints);
                    b.video.deviceId = {
                        exact: a
                    };
                    b.video.facingMode = void 0;
                    this._originMediaStreamTrack.stop();
                    let g = null;
                    try {
                        g = await xb(b, this.getTrackId())
                    } catch (h) {
                        throw k.error("[".concat(this.getTrackId(), "] setDevice failed"), h.toString()),
                        g = await xb({
                            video: this._constraints
                        }, this.getTrackId()),
                        await this._updateOriginMediaStreamTrack(g.getVideoTracks()[0], !1),
                        h;
                    }
                    await this._updateOriginMediaStreamTrack(g.getVideoTracks()[0], !1);
                    this.updateMediaStreamTrackResolution();
                    this._deviceName = c.label;
                    this._config.cameraId = a;
                    this._constraints.deviceId = {
                        exact: a
                    }
                } catch (e) {
                    throw c.onError(e),
                    k.error("[".concat(this.getTrackId(), "] setDevice error"), e.toString()),
                    e;
                }
            else
                try {
                    this._deviceName = (await cb.getDeviceById(a)).label,
                    this._config.cameraId = a,
                    this._constraints.deviceId = {
                        exact: a
                    }
                } catch (e) {
                    throw c.onError(e),
                    k.error("[track-".concat(this.getTrackId(), "] setDevice error"), e.toString()),
                    e;
                }
            k.info("[".concat(this.getTrackId(), "] setDevice success"));
            c.onSuccess()
        }
        async setEnabled(a) {
            if (a !== this._enabled) {
                k.info("[".concat(this.getTrackId(), "] start setEnabled"), a);
                var b = await this._enabledMutex.lock();
                if (!a) {
                    this._originMediaStreamTrack.onended = null;
                    this._originMediaStreamTrack.stop();
                    this._enabled = !1;
                    try {
                        await Pa(this, L.NEED_REMOVE_TRACK, this)
                    } catch (e) {
                        throw k.error("[".concat(this.getTrackId(), "] setEnabled to false error"), e.toString()),
                        b(),
                        e;
                    }
                    return k.info("[".concat(this.getTrackId(), "] setEnabled to false success")),
                    b()
                }
                a = Hd({}, this._constraints);
                var c = cb.searchDeviceIdByName(this._deviceName);
                c && !a.deviceId && (a.deviceId = {
                    exact: c
                });
                try {
                    let a = await xb({
                        video: this._constraints
                    }, this.getTrackId());
                    await this._updateOriginMediaStreamTrack(a.getVideoTracks()[0], !1);
                    await Pa(this, L.NEED_ADD_TRACK, this)
                } catch (e) {
                    throw k.error("[".concat(this.getTrackId(), "] setEnabled true error"), e.toString()),
                    b(),
                    e;
                }
                this.updateMediaStreamTrackResolution();
                k.info("[".concat(this.getTrackId(), "] setEnabled to true success"));
                this._enabled = !0;
                b()
            }
        }
        async setEncoderConfiguration(a, b) {
            b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.CAM_VIDEO_TRACK_SET_ENCODER_CONFIG,
                options: [this.getTrackId(), a]
            });
            if (!this._enabled)
                throw a = new p(n.TRACK_IS_DISABLED,"can not set encoder configuration when track is disabled"),
                b.onError(a),
                a;
            a = jc(a);
            this._forceBitrateLimit && (a.bitrateMax = this._forceBitrateLimit.max_bitrate ? this._forceBitrateLimit.max_bitrate : a.bitrateMax,
            a.bitrateMin = this._forceBitrateLimit.min_bitrate ? this._forceBitrateLimit.min_bitrate : a.bitrateMin);
            let c = (e = this._config,
            JSON.parse(w(e)));
            var e;
            c.encoderConfig = a;
            e = Qe(c);
            k.debug("[".concat(this.getTrackId(), "] setEncoderConfiguration applyConstraints"), w(a), w(e));
            try {
                await this._originMediaStreamTrack.applyConstraints(e),
                this.updateMediaStreamTrackResolution()
            } catch (g) {
                throw a = new p(n.UNEXPECTED_ERROR,g.toString()),
                k.error("[track-".concat(this.getTrackId(), "] applyConstraints error"), a.toString()),
                b.onError(a),
                a;
            }
            this._config = c;
            this._constraints = e;
            this._encoderConfig = a;
            try {
                await Pa(this, L.NEED_RENEGOTIATE)
            } catch (g) {
                return b.onError(g),
                g.throw()
            }
            b.onSuccess()
        }
        _getDefaultPlayerConfig() {
            return {
                mirror: !0,
                fit: "cover"
            }
        }
    }
    var Qk = !0;
    "findIndex"in [] && Array(1).findIndex(function() {
        Qk = !1
    });
    O({
        target: "Array",
        proto: !0,
        forced: Qk
    }, {
        findIndex: function(a) {
            return em(this, a, 1 < arguments.length ? arguments[1] : void 0)
        }
    });
    var Eo = za("Array").findIndex
      , Rk = Array.prototype
      , Id = function(a) {
        var b = a.findIndex;
        return a === Rk || a instanceof Array && b === Rk.findIndex ? Eo : b
    };
    let Nh = (a,b)=>{
        let c = null;
        if ("h264" === b ? c = a.match(/a=rtpmap:(\d+) H264.*\r\n/) || a.match(/a=rtpmap:(\d+) H264.*\n/) : "vp8" === b ? c = a.match(/a=rtpmap:(\d+) VP8.*\r\n/) || a.match(/a=rtpmap:(\d+) VP8.*\n/) : "vp9" === b ? c = a.match(/a=rtpmap:(\d+) VP9.*\r\n/) || a.match(/a=rtpmap:(\d+) VP9.*\n/) : "av1" === b && (c = a.match(/a=rtpmap:(\d+) AV1.*\r\n/) || a.match(/a=rtpmap:(\d+) AV1.*\n/)),
        c && c[1])
            return c[1]
    }
    ;
    class Sk extends Kk {
        constructor(a, b, c, e) {
            super(b, b.stringUid || b.uid);
            this.type = "pub";
            this._waitingSuccessResponse = this.detecting = !1;
            this.renegotiateWithGateway = async()=>(k.debug("[pc-".concat(this.pc.ID, "] renegotiate start")),
            new B(async(a,b)=>{
                this.connectionState = "connecting";
                let c = e=>{
                    "connected" === e && (this.off(H.CONNECTION_STATE_CHANGE, c),
                    a());
                    "disconnected" === e && (this.off(H.CONNECTION_STATE_CHANGE, c),
                    b(new p(n.OPERATION_ABORTED,"renegotiate abort")))
                }
                ;
                this.on(H.CONNECTION_STATE_CHANGE, c);
                var e = await this.pc.createOfferSDP();
                this.audioTrack && this.audioTrack._encoderConfig && (e = Re(e, this.audioTrack._encoderConfig));
                this.videoTrack && this.videoTrack._scalabiltyMode && ("vp9" !== this.codec ? (this.videoTrack._scalabiltyMode.numSpatialLayers = 1,
                this.videoTrack._scalabiltyMode.numTemporalLayers = 1) : e = Mh(e, this.codec, this.videoTrack._scalabiltyMode),
                k.debug("renegoation spatial layers: ", this.videoTrack._scalabiltyMode.numSpatialLayers));
                await this.pc.setOfferSDP(e);
                this.pc.onOfferSettled();
                let g = await La(this, H.NEED_RENEGOTIATE, e);
                e = function(a, b) {
                    var c, e, g;
                    const h = ra(c = RegExp.prototype.test).call(c, /^([a-z])=(.*)/);
                    a = M(e = a.split(/(\r\n|\r|\n)/)).call(e, h);
                    b = M(g = b.split(/(\r\n|\r|\n)/)).call(g, h);
                    let k = null;
                    const m = new aa;
                    return q(a).call(a, a=>{
                        const b = a.match(/m=(audio|video)/);
                        if (b && b[1])
                            return void (k = b[1]);
                        k && (a = a.match(/=(sendrecv|recvonly|sendonly|inactive)/)) && a[1] && m.set(k, a[1])
                    }
                    ),
                    k = null,
                    z(b).call(b, a=>{
                        var b = a.match(/m=(audio|video)/);
                        if (b && b[1])
                            return k = b[1],
                            a;
                        if (!k)
                            return a;
                        if ((b = a.match(/=(sendrecv|recvonly|sendonly|inactive)/)) && b[1]) {
                            const c = m.get(k);
                            if (c && c !== b[1])
                                return a.replace(b[1], c)
                        }
                        return a
                    }
                    ).join("\r\n") + "\r\n"
                }(e, this.updateAnswerSDP(g.sdp));
                await this.pc.setAnswerSDP(e);
                k.debug("[pc-".concat(this.pc.ID, "] renegotiate success"));
                this.connectionState = "connected"
            }
            ));
            this.handleStreamRenegotiate = (a,b)=>{
                "connected" === this.connectionState ? this.renegotiateWithGateway().then(a).catch(b) : a()
            }
            ;
            this.handleReplaceTrack = (a,b,c)=>{
                if (this.audioTrack instanceof Hc && "audio" === a.kind)
                    return B.resolve();
                this.pc.replaceTrack(a).then(a=>a ? this.renegotiateWithGateway() : B.resolve()).then(b).catch(c)
            }
            ;
            this.handleCloseAudioTrack = a=>{}
            ;
            this.handleCloseVideoTrack = ()=>{
                this.lowStreamConnection && this.lowStreamConnection.videoTrack && this.lowStreamConnection.videoTrack.close()
            }
            ;
            this.handleGetSessionID = a=>{
                a(this.joinInfo.sid)
            }
            ;
            this.handleGetLocalVideoStats = a=>{
                a(this.statsCollector.getLocalVideoTrackStats(this.connectionId))
            }
            ;
            this.handleGetLocalAudioStats = a=>{
                a(this.statsCollector.getLocalAudioTrackStats(this.connectionId))
            }
            ;
            this.handleSetOptimizationMode = (a,b,c)=>{
                this.videoTrack && this.setRtpSenderParametersByTrackConfig(this.videoTrack).then(b).catch(c)
            }
            ;
            this.isLowStreamConnection = !!e;
            this.codec = c;
            this.statsCollector = a;
            this.statsCollector.addLocalConnection(this)
        }
        getAllTracks() {
            let a = [];
            return this.videoTrack && a.push(this.videoTrack),
            this.audioTrack && this.audioTrack instanceof Hc ? a = l(a).call(a, this.audioTrack.trackList) : this.audioTrack && a.push(this.audioTrack),
            a
        }
        async addTracks(a) {
            let b = ca;
            if ("connecting" === this.connectionState)
                try {
                    return await this.createWaitConnectionConnectedPromise(),
                    await this.addTracks(a)
                } catch (h) {
                    throw new p(n.OPERATION_ABORTED,"publish abort");
                }
            var c = !1;
            let e = this.getAllTracks();
            a = kh(a = M(a).call(a, a=>-1 === I(e).call(e, a)));
            for (let e = 0; e < a.length; e += 1) {
                var g = a[e];
                if (!(g instanceof me))
                    return (new p(n.INVALID_LOCAL_TRACK)).throw();
                if (g instanceof Ma && this.disabledVideoTrack) {
                    if (this.disabledVideoTrack !== g)
                        return (new p(n.EXIST_DISABLED_VIDEO_TRACK)).throw();
                    this.disabledVideoTrack = void 0
                }
                if (g instanceof Ma && this.videoTrack)
                    return (new p(n.CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS)).throw();
                if (g instanceof Ya && this.audioTrack)
                    if (this.audioTrack instanceof Hc)
                        this.audioTrack.addAudioTrack(g);
                    else {
                        if (!b.webAudioMediaStreamDest)
                            throw new p(n.NOT_SUPPORTED,"your browser is not support audio mixing");
                        c = new Hc;
                        c.addAudioTrack(this.audioTrack);
                        c.addAudioTrack(g);
                        c = await this.addTrackWithPC(c)
                    }
                else
                    g instanceof Ma && this.isLowStreamConnection ? (c = Ph({}, {
                        width: 160,
                        height: 120,
                        framerate: 15,
                        bitrate: 50
                    }, {}, this.lowStreamParameter),
                    b.supportDualStreamEncoding ? (k.debug("[".concat(this.connectionId, "] creating low stream using rtp encoding.")),
                    this.lowStreamEncoding = il(c, g),
                    g = g.clone({
                        bitrateMax: c.bitrate,
                        bitrateMin: c.bitrate
                    })) : (k.debug("[".concat(this.connectionId, "] creating low stream using canvas.")),
                    g = wl(g, c),
                    g = new Ma(g,{
                        bitrateMax: c.bitrate,
                        bitrateMin: c.bitrate
                    })),
                    g._hints.push(rb.LOW_STREAM),
                    c = await this.addTrackWithPC(g),
                    this.bindTrackEvents(g)) : (this.detecting = !0,
                    gc(()=>{
                        this.detecting = !1
                    }
                    , 8E3),
                    c = await this.addTrackWithPC(g))
            }
            c && await this.renegotiateWithGateway();
            q(a).call(a, a=>this.bindTrackEvents(a))
        }
        async removeTracks(a, b) {
            let c = this.getAllTracks();
            a = kh(a = M(a).call(a, a=>-1 !== I(c).call(c, a) || a === this.disabledVideoTrack));
            let e = [];
            for (let c = 0; c < a.length; c += 1) {
                let g = a[c];
                if (this.unbindTrackEvents(g),
                this.audioTrack instanceof Hc && g instanceof Ya)
                    this.audioTrack.removeAudioTrack(g),
                    0 === this.audioTrack.trackList.length && (e.push(this.audioTrack),
                    this.audioTrack = void 0);
                else if (g instanceof Ya)
                    e.push(g),
                    this.audioTrack = void 0;
                else if (g instanceof Ma) {
                    if (b) {
                        if (this.disabledVideoTrack === g)
                            return void (this.disabledVideoTrack = void 0)
                    } else
                        this.disabledVideoTrack = this.videoTrack;
                    e.push(g);
                    this.isLowStreamConnection && g.close();
                    this.videoTrack = void 0
                }
            }
            if (this.videoTrack || this.audioTrack) {
                if (0 !== e.length) {
                    if ("connecting" === this.connectionState)
                        try {
                            await this.createWaitConnectionConnectedPromise()
                        } catch (h) {
                            return
                        }
                    for (let a of e) {
                        var g;
                        k.debug(l(g = "[".concat(this.connectionId, "] remove ")).call(g, a.trackMediaType, " from pc"));
                        await this.pc.removeTrack(a._mediaStreamTrack)
                    }
                    await this.renegotiateWithGateway()
                }
            } else
                await this.closeP2PConnection()
        }
        startP2PConnection() {
            return new B(async(a,b)=>{
                if (!this.audioTrack && !this.videoTrack)
                    return b(new p(n.UNEXPECTED_ERROR,"no track to publish"));
                let c = e=>{
                    if ("connected" === e && (this.off(H.CONNECTION_STATE_CHANGE, c),
                    a()),
                    "disconnected" === e) {
                        if (this.off(H.CONNECTION_STATE_CHANGE, c),
                        this.disconnectedReason)
                            return b(this.disconnectedReason);
                        b(new p(n.OPERATION_ABORTED,"publish abort"))
                    }
                }
                ;
                this.on(H.CONNECTION_STATE_CHANGE, c);
                this.disconnectedReason = void 0;
                this.connectionState = "connecting";
                this._waitingSuccessResponse = !0;
                this.startTime = x();
                try {
                    var e;
                    !this.pc.audioTrack && this.audioTrack && await this.pc.addTrack(this.audioTrack._mediaStreamTrack);
                    !this.pc.videoTrack && this.videoTrack && await this.pc.addTrack(this.videoTrack._mediaStreamTrack);
                    let a = await this.pc.createOfferSDP();
                    v.REMOVE_NEW_CODECS && (a = "vp9" === this.codec ? Se(a, ["av1"]) : "av1" === this.codec ? Se(a, ["vp9"]) : Se(a, ["vp9", "av1"]));
                    let b = Kh(a);
                    this.videoTrack && !oa(e = b.video).call(e, this.codec.toUpperCase()) && k.warning("current codec is not supported, support list: ".concat(b.video.join(",")));
                    this.audioTrack && this.audioTrack._encoderConfig && (a = Re(a, this.audioTrack._encoderConfig));
                    this.videoTrack && this.videoTrack._scalabiltyMode && ("vp9" !== this.codec && "av1" !== this.codec ? (this.videoTrack._scalabiltyMode.numSpatialLayers = 1,
                    this.videoTrack._scalabiltyMode.numTemporalLayers = 1) : a = Mh(a, this.codec, this.videoTrack._scalabiltyMode),
                    k.debug("spatial layers: ", this.videoTrack._scalabiltyMode.numSpatialLayers));
                    await this.pc.setOfferSDP(a);
                    this.pc.onOfferSettled();
                    this.videoTrack && this.setRtpSenderParametersByTrackConfig(this.videoTrack);
                    k.debug("[".concat(this.connectionId, "] create and set offer success"));
                    e = {
                        messageType: "OFFER",
                        sdp: a,
                        offererSessionId: 104,
                        retry: !0
                    };
                    ca.supportDualStreamEncoding && this.isLowStreamConnection && this.lowStreamEncoding && this.videoTrack && await this.setLowStreamEncoding(this.lowStreamEncoding, this.videoTrack);
                    let c = await La(this, H.NEED_ANSWER, e)
                      , l = this.updateAnswerSDP(c.sdp);
                    await this.pc.setAnswerSDP(l);
                    k.debug("[".concat(this.connectionId, "] set answer success"));
                    await this.icePromise;
                    this.connectionState = "connected";
                    this.startUploadStats()
                } catch (g) {
                    this.off(H.CONNECTION_STATE_CHANGE, c),
                    this.connectionState = "disconnected",
                    this.reportPublishEvent(!1, g.code),
                    k.error("[".concat(this.connectionId, "] connection error"), g.toString()),
                    b(g)
                }
            }
            )
        }
        reportPublishEvent(a, b, c) {
            var e;
            this._waitingSuccessResponse = !1;
            u.publish(this.joinInfo.sid, {
                lts: this.startTime,
                succ: a,
                ec: b,
                audioName: this.audioTrack && this.audioTrack.getTrackLabel(),
                videoName: this.videoTrack && this.videoTrack.getTrackLabel(),
                screenshare: !(!this.videoTrack || -1 === I(e = this.videoTrack._hints).call(e, rb.SCREEN_TRACK)),
                audio: !!this.audioTrack,
                video: !!this.videoTrack,
                p2pid: this.pc.ID,
                publishRequestid: this.ID,
                extend: c
            })
        }
        async closeP2PConnection(a) {
            let b = this.getAllTracks();
            var c;
            (q(b).call(b, a=>{
                this.unbindTrackEvents(a)
            }
            ),
            this.isLowStreamConnection && this.videoTrack && this.videoTrack.close(),
            this.videoTrack = void 0,
            this.audioTrack instanceof Hc) && q(c = this.audioTrack.trackList).call(c, a=>{
                this.audioTrack.removeAudioTrack(a)
            }
            );
            this.audioTrack = void 0;
            this.stopUploadStats();
            this.statsCollector.removeConnection(this.connectionId);
            await this.closePC(a);
            this.connectionState = "disconnected";
            this.removeAllListeners()
        }
        getNetworkQuality() {
            var a, b = this.pc.getStats();
            if (!b.videoSend[0] && !b.audioSend[0])
                return 1;
            var c = Wb(this, H.NEED_SIGNAL_RTT)
              , e = b.videoSend[0] ? b.videoSend[0].rttMs : void 0;
            let g = b.audioSend[0] ? b.audioSend[0].rttMs : void 0;
            e = e && g ? (e + g) / 2 : e || g;
            c = 70 * b.sendPacketLossRate / 50 + .3 * ((e && c ? (e + c) / 2 : e || c) || 0) / 1500;
            c = .17 > c ? 1 : .36 > c ? 2 : .59 > c ? 3 : .1 > c ? 4 : 5;
            return this.videoTrack && this.videoTrack._encoderConfig && -1 === I(a = this.videoTrack._hints).call(a, rb.SCREEN_TRACK) && (a = this.videoTrack._encoderConfig.bitrateMax,
            b = b.bitrate.actualEncoded,
            a && b) ? (b = (1E3 * a - b) / (1E3 * a),
            Dn[.15 > b ? 0 : .3 > b ? 1 : .45 > b ? 2 : .6 > b ? 3 : 4][c]) : c
        }
        handleUpdateBitrateLimit(a) {
            this.videoTrack && this.videoTrack.setBitrateLimit(a)
        }
        uploadStats(a, b) {
            let c = this.audioTrack ? function(a, b) {
                const c = a.audioSend[0];
                if (!c)
                    return null;
                a = {
                    id: qa(10, ""),
                    timestamp: (new Date(a.timestamp)).toISOString(),
                    mediaType: "audio",
                    type: "ssrc",
                    ssrc: c.ssrc.toString()
                };
                return a.A_astd = b._originMediaStreamTrack.enabled && b._mediaStreamTrack.enabled ? "0" : "1",
                c.inputLevel ? a.A_ail = Math.round(100 * c.inputLevel).toString() : a.A_ail = Math.round(100 * b._source.getAudioAvgLevel()).toString(),
                a.A_apil = Math.round(100 * b._source.getAudioAvgLevel()).toString(),
                a
            }(a, this.audioTrack) : void 0
              , e = this.videoTrack ? function(a, b) {
                const c = a.videoSend[0];
                if (!c)
                    return null;
                a = {
                    id: qa(10, ""),
                    timestamp: (new Date(a.timestamp)).toISOString(),
                    mediaType: "video",
                    type: "ssrc",
                    ssrc: c.ssrc.toString()
                };
                switch (a.A_vstd = b._originMediaStreamTrack && !b._originMediaStreamTrack.enabled || !b._mediaStreamTrack.enabled ? "1" : "0",
                c.sentFrame && (a.A_fhs = c.sentFrame.height.toString(),
                a.A_frs = c.sentFrame.frameRate.toString(),
                a.A_fws = c.sentFrame.width.toString()),
                c.adaptionChangeReason) {
                case "none":
                    a.A_ac = "0";
                    break;
                case "cpu":
                    a.A_ac = "1";
                    break;
                case "bandwidth":
                    a.A_ac = "2";
                    break;
                case "other":
                    a.A_ac = "3"
                }
                return a.A_nr = c.nacksCount.toString(),
                c.avgEncodeMs && (a.A_aem = c.avgEncodeMs.toFixed(0).toString()),
                a
            }(a, this.videoTrack) : void 0
              , g = gh(a, b)
              , h = function(a) {
                const b = {
                    id: "bweforvideo",
                    timestamp: (new Date(a.timestamp)).toISOString(),
                    type: "VideoBwe"
                };
                return a.bitrate.retransmit && (b.A_rb = a.bitrate.retransmit.toString()),
                a.bitrate.targetEncoded && (b.A_teb = a.bitrate.targetEncoded.toString()),
                b.A_aeb = a.bitrate.actualEncoded.toString(),
                b.A_tb = a.bitrate.transmit.toString(),
                void 0 !== a.sendBandwidth && (b.A_asb = a.sendBandwidth.toString()),
                b
            }(a);
            c && Za(()=>this.emit(H.NEED_UPLOAD, qb.PUBLISH_STATS, c));
            e && Za(()=>this.emit(H.NEED_UPLOAD, qb.PUBLISH_STATS, Ph({}, e, {}, g)));
            h && Za(()=>this.emit(H.NEED_UPLOAD, qb.PUBLISH_STATS, h))
        }
        uploadSlowStats(a) {
            let b = gh(a);
            b && Za(()=>this.emit(H.NEED_UPLOAD, qb.PUBLISH_STATS, b))
        }
        uploadRelatedStats(a) {
            let b = function(a) {
                return (a = a.videoSend[0]) ? {
                    mediaType: "video",
                    isVideoMute: !1,
                    frameRateInput: a.inputFrame && a.inputFrame.frameRate.toString(),
                    frameRateSent: a.sentFrame && a.sentFrame.frameRate.toString(),
                    googRtt: a.rttMs.toString()
                } : null
            }(a);
            b && Za(()=>{
                this.emit(H.NEED_UPLOAD, qb.PUBLISH_RELATED_STATS, b)
            }
            )
        }
        bindTrackEvents(a) {
            var b;
            a.addListener(L.NEED_RESET_REMOTE_SDP, ra(b = this.handleResetRemoteSdp).call(b, this));
            this.isLowStreamConnection || (a instanceof Ya ? (a.addListener(L.GET_STATS, this.handleGetLocalAudioStats),
            a.addListener(L.NEED_CLOSE, this.handleCloseAudioTrack)) : a instanceof Ma && (a.addListener(L.GET_STATS, this.handleGetLocalVideoStats),
            a.addListener(L.NEED_CLOSE, this.handleCloseVideoTrack),
            a.addListener(L.SET_OPTIMIZATION_MODE, this.handleSetOptimizationMode)),
            a.addListener(L.NEED_RENEGOTIATE, this.handleStreamRenegotiate),
            a.addListener(L.NEED_REPLACE_TRACK, this.handleReplaceTrack),
            a.addListener(L.NEED_SESSION_ID, this.handleGetSessionID))
        }
        unbindTrackEvents(a) {
            this.isLowStreamConnection || (a instanceof Ya ? (a.off(L.GET_STATS, this.handleGetLocalAudioStats),
            a.off(L.NEED_CLOSE, this.handleCloseAudioTrack)) : a instanceof Ma && (a.off(L.GET_STATS, this.handleGetLocalVideoStats),
            a.off(L.NEED_CLOSE, this.handleCloseVideoTrack)),
            a.off(L.NEED_RENEGOTIATE, this.handleStreamRenegotiate),
            a.off(L.NEED_REPLACE_TRACK, this.handleReplaceTrack),
            a.off(L.NEED_SESSION_ID, this.handleGetSessionID))
        }
        async addTrackWithPC(a) {
            if ("connecting" === this.connectionState)
                return (new p(n.INVALID_OPERATION,"last publish operation has not finished")).throw();
            let b = this.videoTrack
              , c = !1;
            return this.audioTrack && a instanceof Ya ? (this.audioTrack = a,
            k.debug("[".concat(this.connectionId, "] replace pc audio track")),
            c = await this.pc.replaceTrack(a._mediaStreamTrack)) : this.videoTrack && a instanceof Ma ? (this.videoTrack = a,
            k.debug("[".concat(this.connectionId, "] replace pc video track")),
            c = await this.pc.replaceTrack(a._mediaStreamTrack)) : a instanceof Ya ? (this.audioTrack = a,
            k.debug("[".concat(this.connectionId, "] add audio track to pc")),
            await this.pc.addTrack(a._mediaStreamTrack),
            c = !0) : a instanceof Ma && (this.videoTrack = a,
            k.debug("[".concat(this.connectionId, "] add video track to pc")),
            await this.pc.addTrack(a._mediaStreamTrack),
            c = !0),
            "connected" === this.connectionState && this.videoTrack !== b && this.videoTrack && await this.setRtpSenderParametersByTrackConfig(this.videoTrack),
            "disconnected" !== this.connectionState && c
        }
        handleResetRemoteSdp() {
            return new B((a,b)=>{
                var c;
                k.info("[pc-".concat(this.pc.ID, "] start reset remote sdp"));
                let e = this.pc.getOfferSDP();
                var g = this.pc.getAnswerSDP();
                if (!g || !e)
                    return a();
                g = g.sdp;
                let h;
                this.videoTrack && this.videoTrack._encoderConfig && -1 === I(c = this.videoTrack._hints).call(c, rb.SCREEN_TRACK) && (h = function(a, b) {
                    var c, e;
                    let g = b.bitrateMin;
                    b = b.bitrateMax;
                    let h = ra(c = RegExp.prototype.test).call(c, /^([a-z])=(.*)/);
                    a = M(e = a.split(/(\r\n|\r|\n)/)).call(e, h);
                    if (b) {
                        let c = "AS";
                        ma().name === ba.FIREFOX && (b = 1E3 * (b >>> 0),
                        c = "TIAS");
                        e = Id(a).call(a, a=>oa(a).call(a, c));
                        var k;
                        0 < e && (a[e] = l(k = "b=".concat(c, ":")).call(k, b))
                    }
                    g && (k = Id(a).call(a, a=>oa(a).call(a, "x-google-min-bitrate")),
                    0 < k && (a[k] = a[k].replace(/x-google-min-bitrate=(.*)/, "x-google-min-bitrate=".concat(g))));
                    return a.join("\r\n") + "\r\n"
                }(g, this.videoTrack._encoderConfig));
                g !== h ? this.pc.setOfferSDP(e.sdp).then(()=>{
                    if (h)
                        return this.pc.setAnswerSDP(h)
                }
                ).then(a).catch(a=>{
                    var c;
                    k.error(l(c = "[pc-".concat(this.pc.ID, "] reset remote sdp error, ")).call(c, a));
                    b(a)
                }
                ) : k.debug("[pc-".concat(this.pc.ID, "] remote sdp have no not changed"))
            }
            )
        }
        async setRtpSenderParametersByTrackConfig(a) {
            if (!ca.supportSetRtpSenderParameters)
                return void k.debug("[".concat(this.connectionId, "] do not support set pc rtp sender, skip"));
            let b = {}
              , c = "balanced";
            "motion" === a._optimizationMode ? c = "maintain-framerate" : "detail" === a._optimizationMode && (c = "maintain-resolution");
            k.debug("[".concat(this.connectionId, "] set pc rtp sender"), b, c);
            await this.pc.setRtpSenderParameters(b, c)
        }
        updateAnswerSDP(a) {
            var b, c;
            return a = a.replace(/a=x-google-flag:conference\r\n/g, ""),
            this.videoTrack && I(b = this.videoTrack._hints).call(b, rb.SCREEN_TRACK),
            this.videoTrack && this.videoTrack._encoderConfig && -1 === I(c = this.videoTrack._hints).call(c, rb.SCREEN_TRACK) && (a = function(a, b, c) {
                let e = ca;
                var g = c.bitrateMin;
                c = c.bitrateMax;
                let h = a.match(/m=video.*\r\n/) || a.match(/m=video.*\n/);
                if (h && 0 < h.length && e.supportMinBitrate && g) {
                    b = Nh(a, b);
                    var k, n;
                    b && (a = a.replace(h[0], l(k = l(n = "".concat(h[0], "a=fmtp:")).call(n, b, " x-google-min-bitrate=")).call(k, g, "\r\n")))
                }
                if (h && 0 < h.length && c) {
                    var p, q;
                    g = "AS";
                    ma().name === ba.FIREFOX && (c = 1E3 * (c >>> 0),
                    g = "TIAS");
                    a = a.replace(h[0], l(p = l(q = "".concat(h[0], "b=")).call(q, g, ":")).call(p, c, "\r\n"))
                }
                return a
            }(a, this.codec, this.videoTrack._encoderConfig)),
            this.audioTrack && this.audioTrack._encoderConfig && (a = Re(a, this.audioTrack._encoderConfig)),
            a = function(a) {
                let b = ma();
                return b.name !== ba.SAFARI && b.os !== W.IOS ? a : a.replace(/a=.*video-orientation\r\n/g, "")
            }(a)
        }
        createPC() {
            this.pc = new Hk({
                turnServer: this.joinInfo.turnServer
            });
            this.updateICEPromise()
        }
        async closePC(a) {
            return this.pc.onICEConnectionStateChange = void 0,
            this.pc.close(),
            !a && await La(this, H.NEED_UNPUB)
        }
        onPCDisconnected(a) {
            this.reportPublishEvent(!1, a.code)
        }
        async setLowStreamEncoding(a, b) {
            try {
                let c = await this.pc.setVideoRtpEncodingParameters(a)
                  , e = b.getMediaStreamTrack();
                if (a.scaleResolutionDownBy && c.encodings[0].scaleResolutionDownBy !== a.scaleResolutionDownBy) {
                    let c = b._videoHeight || e.getSettings().height
                      , h = b._videoWidth || e.getSettings().width;
                    c && h && await e.applyConstraints({
                        height: c / a.scaleResolutionDownBy,
                        width: h / a.scaleResolutionDownBy
                    })
                }
                a.maxFramerate && c.encodings[0].maxFramerate !== a.maxFramerate && await e.applyConstraints({
                    frameRate: a.maxFramerate
                })
            } catch (c) {
                if (c instanceof p)
                    throw c;
                throw new p(n.LOW_STREAM_ENCODING_ERROR,c.message);
            }
        }
    }
    class Tk extends xk {
        constructor(a, b, c) {
            super(a);
            this._isDestroyed = !1;
            this._userId = b;
            this._uintId = c
        }
        getUserId() {
            return this._userId
        }
        _updateOriginMediaStreamTrack(a) {
            this._mediaStreamTrack = this._originMediaStreamTrack = a;
            this._updatePlayerSource()
        }
        _destroy() {
            this._isDestroyed = !0;
            k.info("[track-".concat(this.getTrackId(), "] is destroyed"));
            this.stop()
        }
    }
    class md extends Tk {
        constructor(a, b, c) {
            super(a, b, c);
            this.trackMediaType = "video";
            this.updateMediaStreamTrackResolution()
        }
        get isPlaying() {
            return !(!this._player || this._player.videoElementStatus !== Ca.PLAYING)
        }
        getStats() {
            Oc(()=>{
                k.warning("[deprecated] RemoteVideoTrack.getStats will be removed in the future, use AgoraRTCClient.getRemoteVideoStats instead")
            }
            , "remoteVideoTrackGetStatsWarning");
            return Wb(this, L.GET_STATS) || Te({}, Mf)
        }
        play(a, b={}) {
            let c = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.REMOTE_VIDEO_TRACK_PLAY,
                options: [this.getTrackId(), "string" == typeof a ? a : "HTMLElement", b]
            });
            if ("string" == typeof a) {
                let b = document.getElementById(a);
                var e;
                b ? a = b : (k.warning(l(e = "[track-".concat(this.getTrackId(), '] can not find "#')).call(e, a, '" element, use document.body')),
                a = document.body)
            }
            k.debug("[track-".concat(this.getTrackId(), "] start video playback"), w(b));
            a = Te({
                fit: "cover"
            }, b, {
                trackId: this.getTrackId(),
                element: a
            });
            this._player ? this._player.updateConfig(a) : (this._player = new Lk(a),
            this._player.updateVideoTrack(this._mediaStreamTrack),
            this._player.onFirstVideoFrameDecoded = ()=>{
                this.emit(gd.FIRST_FRAME_DECODED)
            }
            );
            this._player.play();
            c.onSuccess()
        }
        stop() {
            let a = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.REMOTE_VIDEO_TRACK_STOP,
                options: [this.getTrackId()]
            });
            if (!this._player)
                return a.onSuccess();
            this._player.destroy();
            this._player = void 0;
            k.debug("[track-".concat(this.getTrackId(), "] stop video playback"));
            a.onSuccess()
        }
        getCurrentFrameData() {
            return this._player ? this._player.getCurrentFrame() : new ImageData(2,2)
        }
        updateMediaStreamTrackResolution() {
            jh(this._originMediaStreamTrack).then(([a,b])=>{
                this._videoHeight = b;
                this._videoWidth = a
            }
            ).catch(Wf)
        }
        _updatePlayerSource() {
            k.debug("[track-".concat(this.getTrackId(), "] update player source track"));
            this._player && this._player.updateVideoTrack(this._mediaStreamTrack)
        }
    }
    class nd extends Tk {
        constructor(a, b, c) {
            super(a, b, c);
            this.trackMediaType = "audio";
            this._useAudioElement = !1;
            this._volume = 100;
            this._source = new zk(a,!0);
            this._source.once(hb.RECEIVE_TRACK_BUFFER, ()=>{
                this.emit(gd.FIRST_FRAME_DECODED)
            }
            );
            ca.webAudioWithAEC || (this._useAudioElement = !0)
        }
        get isPlaying() {
            return this._useAudioElement ? jb.isPlaying(this.getTrackId()) : this._source.isPlayed
        }
        setAudioFrameCallback(a, b=4096) {
            if (!a)
                return this._source.removeAllListeners(hb.ON_AUDIO_BUFFER),
                void this._source.stopGetAudioBuffer();
            this._source.startGetAudioBuffer(b);
            this._source.removeAllListeners(hb.ON_AUDIO_BUFFER);
            this._source.on(hb.ON_AUDIO_BUFFER, b=>a(b))
        }
        setVolume(a) {
            let b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.REMOTE_AUDIO_SET_VOLUME,
                options: [this.getTrackId(), a]
            }, 300);
            this._volume = a;
            this._useAudioElement ? jb.setVolume(this.getTrackId(), a) : this._source.setVolume(a / 100);
            b.onSuccess()
        }
        async setPlaybackDevice(a) {
            let b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.REMOTE_AUDIO_SET_OUTPUT_DEVICE,
                options: [this.getTrackId(), a]
            });
            if (!this._useAudioElement)
                throw new p(n.NOT_SUPPORTED,"your browser does not support setting the audio output device");
            try {
                await jb.setSinkID(this.getTrackId(), a)
            } catch (c) {
                throw b.onError(c),
                c;
            }
            b.onSuccess()
        }
        getVolumeLevel() {
            return this._source.getAudioLevel()
        }
        getStats() {
            Oc(()=>{
                k.warning("[deprecated] RemoteAudioTrack.getStats will be removed in the future, use AgoraRTCClient.getRemoteAudioStats instead")
            }
            , "remoteAudioTrackGetStatsWarning");
            return Wb(this, L.GET_STATS) || Te({}, Lf)
        }
        play() {
            let a = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.REMOTE_AUDIO_TRACK_PLAY,
                options: [this.getTrackId()]
            });
            k.debug("[".concat(this.getTrackId(), "] start audio playback"));
            this._useAudioElement ? (k.debug("[track-".concat(this.getTrackId(), "] use audio element to play")),
            jb.play(this._mediaStreamTrack, this.getTrackId(), this._volume)) : this._source.play();
            a.onSuccess()
        }
        stop() {
            let a = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.REMOTE_AUDIO_TRACK_STOP,
                options: [this.getTrackId()]
            });
            k.debug("[".concat(this.getTrackId(), "] stop audio playback"));
            this._useAudioElement ? jb.stop(this.getTrackId()) : this._source.stop();
            a.onSuccess()
        }
        _destroy() {
            super._destroy();
            this._source.destroy()
        }
        _isFreeze() {
            return this._source.isFreeze
        }
        _updatePlayerSource() {
            k.debug("[track-".concat(this.getTrackId(), "] update player source track"));
            this._source.updateTrack(this._mediaStreamTrack);
            this._useAudioElement && jb.updateTrack(this.getTrackId(), this._mediaStreamTrack)
        }
    }
    class Fo extends Kk {
        constructor(a, b, c, e) {
            super(c, a.uid);
            this.type = "sub";
            this.unusedTracks = [];
            this.onTrack = a=>{
                var b, c;
                if ("audio" === a.kind && !this.subscribeOptions.audio || "video" === a.kind && !this.subscribeOptions.video)
                    return this.unusedTracks.push(a),
                    void k.debug(l(c = "[".concat(this.connectionId, "] unused ontrack event, kind: ")).call(c, a.kind));
                k.debug(l(b = "[".concat(this.connectionId, "] emit pc ontrack after subscribe ")).call(b, a.kind), a);
                b = "audio" === a.kind ? this.user._audioTrack : this.user._videoTrack;
                var e, g;
                b ? b._updateOriginMediaStreamTrack(a) : "audio" === a.kind ? (this.pc._statsFilter.setIsFirstAudioDecoded(!1),
                this.user._audioTrack = new nd(a,this.getUserId(),this.user._uintid),
                k.info(l(e = "[".concat(this.connectionId, "] create remote audio track: ")).call(e, this.user._audioTrack.getTrackId())),
                this.bindTrackEvents(this.user._audioTrack)) : (this.user._videoTrack = new md(a,this.getUserId(),this.user._uintid),
                k.info(l(g = "[".concat(this.connectionId, "] create remote video track: ")).call(g, this.user._videoTrack.getTrackId())),
                this.bindTrackEvents(this.user._videoTrack))
            }
            ;
            this.handleGetRemoteAudioStats = a=>{
                a(this.statsCollector.getRemoteAudioTrackStats(this.connectionId))
            }
            ;
            this.handleGetRemoteVideoStats = a=>{
                a(this.statsCollector.getRemoteVideoTrackStats(this.connectionId))
            }
            ;
            this.handleGetSessionID = a=>{
                a(this.joinInfo.sid)
            }
            ;
            this.user = a;
            this.statsCollector = b;
            this.statsCollector.addRemoteConnection(this);
            this.subscribeOptions = e
        }
        async startP2PConnection() {
            return new B(async(a,b)=>{
                let c = e=>{
                    if ("connected" === e && (u.subscribe(this.joinInfo.sid, {
                        lts: this.startTime,
                        succ: !0,
                        video: this.subscribeOptions.video,
                        audio: this.subscribeOptions.audio,
                        peerid: this.user.uid,
                        ec: null,
                        subscribeRequestid: this.ID,
                        p2pid: this.pc.ID
                    }),
                    this.off(H.CONNECTION_STATE_CHANGE, c),
                    a()),
                    "disconnected" === e) {
                        if (this.off(H.CONNECTION_STATE_CHANGE, c),
                        this.disconnectedReason)
                            return b(this.disconnectedReason);
                        b(new p(n.OPERATION_ABORTED,"subscribe abort"))
                    }
                }
                ;
                if (this.on(H.CONNECTION_STATE_CHANGE, c),
                this.disconnectedReason = void 0,
                this.connectionState = "connecting",
                this.startTime = x(),
                !this.subscribeOptions)
                    return void b(new p(n.UNEXPECTED_ERROR,"no subscribe options"));
                let e = new MediaStream
                  , g = new B(a=>{
                    this.pc.onTrack = (b,c)=>{
                        var g, h;
                        if ("audio" === b.kind && !this.subscribeOptions.audio || "video" === b.kind && !this.subscribeOptions.video)
                            return this.unusedTracks.push(b),
                            void k.debug(l(h = "[".concat(this.connectionId, "] unused ontrack event ")).call(h, b.kind));
                        e.addTrack(b);
                        h = {
                            audio: 0 < e.getAudioTracks().length,
                            video: 0 < e.getVideoTracks().length
                        };
                        k.debug(l(g = "[".concat(this.connectionId, "] subscribe ontrack: ")).call(g, b.kind), c, b);
                        a: {
                            b = this.subscribeOptions;
                            var m, n;
                            c = dd(m = Z(h)).call(m);
                            m = dd(n = Z(b)).call(n);
                            for (n = 0; n < c.length; n += 1) {
                                if (c[n] !== m[n]) {
                                    h = !1;
                                    break a
                                }
                                if (h[c[n]] !== b[c[n]]) {
                                    h = !1;
                                    break a
                                }
                            }
                            h = !0
                        }
                        h && (this.pc.onTrack = this.onTrack,
                        k.debug("[".concat(this.connectionId, "] get all subscribed tracks")),
                        a(e))
                    }
                }
                );
                try {
                    let a = function(a) {
                        return ma().name !== ba.FIREFOX ? a : a.replace("/recvonly http://www.webrtc.org/experiments/rtp-hdrext/playout-delay", " http://www.webrtc.org/experiments/rtp-hdrext/playout-delay")
                    }(Lh(await this.pc.createOfferSDP()));
                    await this.pc.setOfferSDP(a);
                    k.debug("[".concat(this.connectionId, "] create and set offer success"));
                    let b = await La(this, H.NEED_ANSWER, {
                        messageType: "OFFER",
                        sdp: a,
                        offererSessionId: 104,
                        retry: !0
                    });
                    await this.pc.setAnswerSDP(Lh(b.sdp));
                    k.debug("[".concat(this.connectionId, "] set answer success"));
                    let c = await B.all([g, this.icePromise])
                      , e = c[0].getAudioTracks()[0]
                      , n = c[0].getVideoTracks()[0];
                    var h, m;
                    e && (this.user._audioTrack ? this.user._audioTrack._updateOriginMediaStreamTrack(e) : (this.user._audioTrack = new nd(e,this.getUserId(),this.user._uintid),
                    k.info(l(h = "[".concat(this.connectionId, "] create remote audio track: ")).call(h, this.user._audioTrack.getTrackId())),
                    this.bindTrackEvents(this.user._audioTrack)));
                    n && (this.user._videoTrack ? this.user._videoTrack._updateOriginMediaStreamTrack(n) : (this.user._videoTrack = new md(n,this.getUserId(),this.user._uintid),
                    k.info(l(m = "[".concat(this.connectionId, "] create remote video track: ")).call(m, this.user._videoTrack.getTrackId())),
                    this.bindTrackEvents(this.user._videoTrack)));
                    this.connectionState = "connected";
                    this.startUploadStats()
                } catch (r) {
                    this.off(H.CONNECTION_STATE_CHANGE, c),
                    this.connectionState = "disconnected",
                    u.subscribe(this.joinInfo.sid, {
                        lts: this.startTime,
                        succ: !1,
                        video: this.subscribeOptions.video,
                        audio: this.subscribeOptions.audio,
                        peerid: this.user.uid,
                        ec: r.code,
                        subscribeRequestid: this.ID,
                        p2pid: this.pc.ID
                    }),
                    b(r)
                }
            }
            )
        }
        async closeP2PConnection(a) {
            "disconnected" !== this.connectionState && (this.stopUploadStats(),
            this.statsCollector.removeConnection(this.connectionId),
            this.connectionState = "disconnected",
            await this.setSubscribeOptions({
                audio: !1,
                video: !1
            }),
            await this.closePC(a),
            this.removeAllListeners())
        }
        getNetworkQuality() {
            var a = this.pc.getStats();
            if (!a.audioRecv[0] && !a.videoRecv[0])
                return 1;
            var b = Wb(this, H.NEED_SIGNAL_RTT)
              , c = a.rtt;
            b = (c && b ? (c + b) / 2 : c || b) || 0;
            c = a.audioRecv[0] ? a.audioRecv[0].jitterMs : void 0;
            a = a.recvPacketLossRate;
            let e = 70 * a / 50 + .3 * b / 1500;
            c && (e = 60 * a / 50 + .2 * b / 1500 + .2 * c / 400);
            return .1 > e ? 1 : .17 > e ? 2 : .36 > e ? 3 : .59 > e ? 4 : 5
        }
        uploadStats(a) {
            let b = this.user.audioTrack ? function(a, b) {
                const c = a.audioRecv[0];
                if (!c)
                    return null;
                a = {
                    id: qa(10, ""),
                    timestamp: (new Date(a.timestamp)).toISOString(),
                    mediaType: "audio",
                    type: "ssrc",
                    ssrc: c.ssrc.toString()
                };
                return a.bytesReceived = c.bytes.toString(),
                a.packetsLost = c.packetsLost.toString(),
                a.packetsReceived = c.packets.toString(),
                c.outputLevel ? a.A_aol = Math.round(100 * c.outputLevel).toString() : a.A_aol = Math.round(100 * b._source.getAudioAvgLevel()).toString(),
                a.A_apol = Math.round(100 * b._source.getAudioAvgLevel()).toString(),
                b && (a.A_artd = b._originMediaStreamTrack.enabled && b._mediaStreamTrack.enabled ? "0" : "1"),
                a.A_jr = c.jitterMs.toString(),
                a.A_jbm = Math.floor(c.jitterBufferMs).toString(),
                a.A_cdm = Math.floor(c.jitterBufferMs).toString(),
                a
            }(a, this.user.audioTrack) : void 0
              , c = this.user.videoTrack ? function(a, b) {
                const c = a.videoRecv[0];
                if (!c)
                    return null;
                a = {
                    id: qa(10, ""),
                    timestamp: (new Date(a.timestamp)).toISOString(),
                    mediaType: "video",
                    type: "ssrc",
                    ssrc: c.ssrc.toString()
                };
                var e;
                return a.bytesReceived = c.bytes.toString(),
                a.packetsLost = c.packetsLost.toString(),
                a.packetsReceived = c.packets.toString(),
                c.framesRateFirefox && (a.A_frr = c.framesRateFirefox.toString()),
                c.receivedFrame && (a.A_frr = c.receivedFrame.frameRate.toString()),
                a.A_frd = c.decodeFrameRate.toString(),
                c.outputFrame && (a.A_fro = c.outputFrame.frameRate.toString()),
                void 0 !== c.jitterBufferMs && (a.A_jbm = Math.floor(c.jitterBufferMs).toString()),
                void 0 !== c.currentDelayMs && (a.A_cdm = Math.floor(c.currentDelayMs).toString()),
                a.A_fs = c.firsCount.toString(),
                a.A_ns = c.nacksCount.toString(),
                a.A_ps = c.plisCount.toString(),
                b && (a.A_vrtd = b._originMediaStreamTrack.enabled && b._mediaStreamTrack.enabled ? "0" : "1"),
                b._player && 0 < b._player.freezeTimeCounterList.length && (a.A_vrft = Ia(e = b._player.freezeTimeCounterList).call(e, 0, 1)[0].toString()),
                a
            }(a, this.user.videoTrack) : void 0;
            b && Za(()=>this.emit(H.NEED_UPLOAD, qb.SUBSCRIBE_STATS, b));
            c && Za(()=>this.emit(H.NEED_UPLOAD, qb.SUBSCRIBE_STATS, c))
        }
        uploadSlowStats(a) {}
        uploadRelatedStats(a, b) {
            let c = !0 === this.pc._statsFilter.videoIsReady
              , e = function(a, b, c) {
                a = a.audioRecv[0];
                if (!a)
                    return null;
                c = kd.isRemoteAudioFreeze(c);
                return {
                    mediaType: "audio",
                    isAudioMute: !1,
                    peerId: b,
                    googJitterReceived: a.jitterMs.toString(),
                    isFreeze: c,
                    bytesReceived: a.bytes.toString(),
                    packetsReceived: a.packets.toString(),
                    packetsLost: a.packetsLost.toString(),
                    frameReceived: a.receivedFrames.toString(),
                    frameDropped: a.droppedFrames.toString()
                }
            }(a, this.getUserId(), this.user.audioTrack)
              , g = function(a, b, c, e, g) {
                b = b.videoRecv[0];
                if (!b)
                    return null;
                a = kd.isRemoteVideoFreeze(g, b, e ? e.videoRecv[0] : void 0) && a;
                c = {
                    mediaType: "video",
                    isVideoMute: !1,
                    peerId: c,
                    frameRateReceived: b.receivedFrame && b.receivedFrame.frameRate.toString(),
                    frameRateDecoded: b.decodedFrame && b.decodedFrame.frameRate.toString(),
                    isFreeze: a,
                    bytesReceived: b.bytes.toString(),
                    packetsReceived: b.packets.toString(),
                    packetsLost: b.packetsLost.toString()
                };
                return b.framesRateFirefox && (c.frameRateDecoded = b.framesRateFirefox.toString(),
                c.frameRateReceived = b.framesRateFirefox.toString()),
                c
            }(c, a, this.getUserId(), b, this.user.videoTrack);
            e && Za(()=>{
                this.emit(H.NEED_UPLOAD, qb.SUBSCRIBE_RELATED_STATS, e)
            }
            );
            g && Za(()=>{
                this.emit(H.NEED_UPLOAD, qb.SUBSCRIBE_RELATED_STATS, g)
            }
            )
        }
        emitOnTrackFromUnusedTracks() {
            if (this.subscribeOptions) {
                var a = this.subscribeOptions.video;
                if (this.subscribeOptions.audio) {
                    var b;
                    let a = R(b = this.unusedTracks).call(b, a=>"audio" === a.kind && "live" === a.readyState);
                    Nc(this.unusedTracks, a);
                    a && this.onTrack(a)
                }
                if (a) {
                    var c;
                    a = R(c = this.unusedTracks).call(c, a=>"video" === a.kind && "live" === a.readyState);
                    Nc(this.unusedTracks, a);
                    a && this.onTrack(a)
                }
            }
        }
        async setSubscribeOptions(a) {
            var b, c, e, g;
            if (a.audio !== this.subscribeOptions.audio || a.video !== this.subscribeOptions.video) {
                if ("connecting" === this.connectionState)
                    try {
                        await this.createWaitConnectionConnectedPromise()
                    } catch (h) {
                        throw new p(n.OPERATION_ABORTED,"can not update subscribe options, operation abort");
                    }
                a.audio === this.subscribeOptions.audio && a.video === this.subscribeOptions.video || (k.debug(l(b = l(c = l(e = l(g = "[".concat(this.connectionId, "] update subscribe options [a: ")).call(g, this.subscribeOptions.audio, ", v: ")).call(e, this.subscribeOptions.video, "] -> [a: ")).call(c, a.audio, ", v: ")).call(b, a.video, "]")),
                this.subscribeOptions = a,
                !a.audio && this.user._audioTrack && (this.unusedTracks.push(this.user._audioTrack._originMediaStreamTrack),
                this.user._audioTrack._destroy(),
                this.unbindTrackEvents(this.user._audioTrack),
                this.user._audioTrack = void 0),
                !a.video && this.user._videoTrack && (this.unusedTracks.push(this.user._videoTrack._originMediaStreamTrack),
                this.user._videoTrack._destroy(),
                this.unbindTrackEvents(this.user._videoTrack),
                this.user._videoTrack = void 0),
                this.emitOnTrackFromUnusedTracks())
            }
        }
        createPC() {
            this.pc = new Ik({
                turnServer: this.joinInfo.turnServer
            });
            this.pc.onFirstAudioDecoded = ()=>{
                this.user.audioTrack && this.user.audioTrack.emit(gd.FIRST_FRAME_DECODED);
                u.firstRemoteFrame(this.joinInfo.sid, Da.FIRST_AUDIO_DECODE, la.FIRST_AUDIO_DECODE, {
                    peer: this.user._uintid,
                    subscribeElapse: x() - this.startTime,
                    subscribeRequestid: this.ID,
                    p2pid: this.pc.ID
                })
            }
            ;
            this.pc.onFirstAudioReceived = ()=>{
                u.firstRemoteFrame(this.joinInfo.sid, Da.FIRST_AUDIO_RECEIVED, la.FIRST_AUDIO_RECEIVED, {
                    peer: this.user._uintid,
                    subscribeElapse: x() - this.startTime,
                    subscribeRequestid: this.ID,
                    p2pid: this.pc.ID
                })
            }
            ;
            this.pc.onFirstVideoDecoded = (a,b)=>{
                u.firstRemoteFrame(this.joinInfo.sid, Da.FIRST_VIDEO_DECODE, la.FIRST_VIDEO_DECODE, {
                    peer: this.user._uintid,
                    videowidth: a,
                    videoheight: b,
                    subscribeElapse: x() - this.startTime,
                    subscribeRequestid: this.ID,
                    p2pid: this.pc.ID
                })
            }
            ;
            this.pc.onFirstVideoReceived = ()=>{
                u.firstRemoteFrame(this.joinInfo.sid, Da.FIRST_VIDEO_RECEIVED, la.FIRST_VIDEO_RECEIVED, {
                    peer: this.user._uintid,
                    subscribeElapse: x() - this.startTime,
                    subscribeRequestid: this.ID,
                    p2pid: this.pc.ID
                })
            }
            ;
            this.updateICEPromise()
        }
        async closePC(a) {
            return (this.pc.audioTrack && this.pc.audioTrack.stop(),
            this.pc.videoTrack && this.pc.videoTrack.stop(),
            this.pc.onTrack = void 0,
            this.pc.onICEConnectionStateChange = void 0,
            this.pc.close(),
            a) ? !1 : await La(this, H.NEED_UNSUB)
        }
        onPCDisconnected(a) {
            u.subscribe(this.joinInfo.sid, {
                lts: this.startTime,
                succ: !1,
                video: this.subscribeOptions.video,
                audio: this.subscribeOptions.audio,
                peerid: this.user.uid,
                ec: a.code,
                subscribeRequestid: this.ID,
                p2pid: this.pc.ID
            })
        }
        bindTrackEvents(a) {
            a instanceof nd ? a.addListener(L.GET_STATS, this.handleGetRemoteAudioStats) : a instanceof md && a.addListener(L.GET_STATS, this.handleGetRemoteVideoStats)
        }
        unbindTrackEvents(a) {
            a instanceof nd ? a.off(L.GET_STATS, this.handleGetRemoteAudioStats) : a instanceof md && a.off(L.GET_STATS, this.handleGetRemoteVideoStats)
        }
    }
    class Go extends Sa {
        constructor(a, b, c, e) {
            super();
            this.reconnectMode = "retry";
            this.commandReqId = this.reqId = 0;
            this.handleWebSocketOpen = ()=>{
                this.reconnectMode = "retry";
                this.startPingPong()
            }
            ;
            this.handleWebSocketMessage = a=>{
                if (a.data) {
                    a = JSON.parse(a.data);
                    var b;
                    a.requestId ? this.emit(l(b = "@".concat(a.requestId, "-")).call(b, a.sid), a) : this.serviceMode === na.INJECT ? this.emit(ib.INJECT_STREAM_STATUS, a) : (u.workerEvent(this.spec.sid, {
                        actionType: "status",
                        serverCode: a.code,
                        workerType: this.serviceMode === na.TRANSCODE ? 1 : 2
                    }),
                    this.emit(ib.PUBLISH_STREAM_STATUS, a))
                }
            }
            ;
            this.spec = b;
            this.token = a;
            this.serviceMode = e;
            this.websocket = new Xf("live-streaming",c);
            this.websocket.on(S.CONNECTED, this.handleWebSocketOpen);
            this.websocket.on(S.ON_MESSAGE, this.handleWebSocketMessage);
            this.websocket.on(S.REQUEST_NEW_URLS, (a,b)=>{
                La(this, ib.REQUEST_NEW_ADDRESS).then(a).catch(b)
            }
            );
            this.websocket.on(S.RECONNECTING, ()=>{
                this.websocket.reconnectMode = this.reconnectMode
            }
            )
        }
        init(a) {
            return this.websocket.init(a)
        }
        async request(a, b, c, e) {
            this.reqId += 1;
            "request" === a && (this.commandReqId += 1);
            let g = this.commandReqId
              , h = this.reqId;
            if (!h || !this.websocket)
                throw new p(n.UNEXPECTED_ERROR);
            var k = Ue({
                command: a,
                sdkVersion: "4.4.0" === Ta ? "0.0.1" : Ta,
                seq: h,
                requestId: h,
                allocate: c,
                cname: this.spec.cname,
                appId: this.spec.appId,
                sid: this.spec.sid,
                uid: this.spec.uid.toString(),
                ts: Math.floor(x() / 1E3)
            }, b);
            if ("closed" === this.websocket.state)
                throw new p(n.WS_DISCONNECT);
            let r = ()=>new B((a,b)=>{
                this.websocket.once(S.CLOSED, ()=>b(new p(n.WS_ABORT)));
                this.websocket.once(S.CONNECTED, a)
            }
            );
            "connected" !== this.websocket.state && await r();
            k.clientRequest && (k.clientRequest.workerToken = this.token);
            let t = new B((a,b)=>{
                var c;
                const e = ()=>{
                    b(new p(n.WS_ABORT))
                }
                ;
                this.websocket.once(S.RECONNECTING, e);
                this.websocket.once(S.CLOSED, e);
                this.once(l(c = "@".concat(h, "-")).call(c, this.spec.sid), b=>{
                    a(b)
                }
                )
            }
            );
            e && u.workerEvent(this.spec.sid, Ue({}, e, {
                requestId: g,
                actionType: "request",
                payload: w(b.clientRequest),
                serverCode: 0,
                code: 0
            }));
            let y = x();
            this.websocket.sendMessage(k);
            k = null;
            try {
                k = await t
            } catch (ua) {
                if ("closed" === this.websocket.state)
                    throw ua;
                return await r(),
                await this.request(a, b, c)
            }
            return e && u.workerEvent(this.spec.sid, Ue({}, e, {
                requestId: g,
                actionType: "response",
                payload: w(k.serverResponse),
                serverCode: k.code,
                success: 200 === k.code,
                responseTime: x() - y
            })),
            200 !== k.code && this.handleResponseError(k),
            k
        }
        tryNextAddress() {
            this.reconnectMode = "tryNext";
            this.websocket.reconnect("tryNext")
        }
        close() {
            let a = "4.4.0" === Ta ? "0.0.1" : Ta;
            this.reqId += 1;
            "connected" === this.websocket.state ? (this.websocket.sendMessage({
                command: "request",
                appId: this.spec.appId,
                cname: this.spec.cname,
                uid: this.spec.uid.toString(),
                sdkVersion: a,
                sid: this.spec.sid,
                seq: this.reqId,
                ts: Math.floor(x() / 1E3),
                requestId: this.reqId,
                clientRequest: {
                    command: "DestroyWorker"
                }
            }),
            this.websocket.close(!1, !0)) : this.websocket.close(!1);
            this.pingpongTimer && (window.clearInterval(this.pingpongTimer),
            this.pingpongTimer = void 0)
        }
        handleResponseError(a) {
            switch (a.code) {
            case ia.LIVE_STREAM_RESPONSE_ALREADY_EXISTS_STREAM:
                return void k.warning("live stream response already exists stream");
            case ia.LIVE_STREAM_RESPONSE_TRANSCODING_PARAMETER_ERROR:
            case ia.LIVE_STREAM_RESPONSE_BAD_STREAM:
            case ia.LIVE_STREAM_RESPONSE_WM_PARAMETER_ERROR:
                return (new p(n.LIVE_STREAMING_INVALID_ARGUMENT,"",{
                    code: a.code
                })).throw();
            case ia.LIVE_STREAM_RESPONSE_WM_WORKER_NOT_EXIST:
                if ("UnpublishStream" === a.serverResponse.command || "UninjectStream" === a.serverResponse.command)
                    break;
                throw new p(n.LIVE_STREAMING_INTERNAL_SERVER_ERROR,"live stream response wm worker not exist",{
                    retry: !0
                });
            case ia.LIVE_STREAM_RESPONSE_NOT_AUTHORIZED:
                return (new p(n.LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED,"",{
                    code: a.code
                })).throw();
            case ia.LIVE_STREAM_RESPONSE_FAILED_LOAD_IMAGE:
                var b = new p(n.LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE);
                return this.emit(ib.WARNING, b, a.serverResponse.url);
            case ia.LIVE_STREAM_RESPONSE_REQUEST_TOO_OFTEN:
                return b = new p(n.LIVE_STREAMING_WARN_FREQUENT_REQUEST),
                this.emit(ib.WARNING, b, a.serverResponse.url);
            case ia.LIVE_STREAM_RESPONSE_NOT_FOUND_PUBLISH:
                throw new p(n.LIVE_STREAMING_INTERNAL_SERVER_ERROR,"live stream response wm worker not exist",{
                    retry: !0
                });
            case ia.LIVE_STREAM_RESPONSE_NOT_SUPPORTED:
                return (new p(n.LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED,"",{
                    code: a.code
                })).throw();
            case ia.LIVE_STREAM_RESPONSE_MAX_STREAM_NUM:
                return b = new p(n.LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT),
                this.emit(ib.WARNING, b, a.serverResponse.url);
            case ia.LIVE_STREAM_RESPONSE_INTERNAL_SERVER_ERROR:
                return (new p(n.LIVE_STREAMING_INTERNAL_SERVER_ERROR,"",{
                    code: a.code
                })).throw();
            case ia.LIVE_STREAM_RESPONSE_RESOURCE_LIMIT:
                throw new p(n.LIVE_STREAMING_INTERNAL_SERVER_ERROR,"live stream resource limit",{
                    retry: !0,
                    changeAddress: !0
                });
            case ia.LIVE_STREAM_RESPONSE_WORKER_LOST:
            case ia.LIVE_STREAM_RESPONSE_WORKER_QUIT:
                if ("UnpublishStream" === a.serverResponse.command || "UninjectStream" === a.serverResponse.command)
                    break;
                throw new p(n.LIVE_STREAMING_INTERNAL_SERVER_ERROR,"error fail send message",{
                    retry: !0,
                    changeAddress: !0
                });
            case ia.ERROR_FAIL_SEND_MESSAGE:
                if ("UnpublishStream" === a.serverResponse.command || "UninjectStream" === a.serverResponse.command)
                    break;
                if ("UpdateTranscoding" === a.serverResponse.command || "ControlStream" === a.serverResponse.command)
                    return (new p(n.LIVE_STREAMING_INTERNAL_SERVER_ERROR,"error fail send message",{
                        code: a.code
                    })).throw();
                throw new p(n.LIVE_STREAMING_INTERNAL_SERVER_ERROR,"error fail send message",{
                    retry: !0,
                    changeAddress: !0
                });
            case ia.PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN:
            case ia.PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT:
            case ia.PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE:
            case ia.PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH:
                return (new p(n.LIVE_STREAMING_CDN_ERROR,"",{
                    code: a.code
                })).throw()
            }
        }
        startPingPong() {
            this.pingpongTimer && window.clearInterval(this.pingpongTimer);
            this.pingpongTimer = window.setInterval(()=>{
                "connected" === this.websocket.state && this.request("ping", {}).catch(Wf)
            }
            , 6E3)
        }
    }
    class Ho extends Sa {
        constructor(a, b=Qa, c=Qa) {
            super();
            this.retryTimeout = 1E4;
            this.streamingTasks = new aa;
            this.isStartingStreamingTask = !1;
            this.taskMutex = new Mb("live-streaming");
            this.cancelToken = zb.CancelToken.source();
            this.injectConfig = Qb({}, Rn);
            this.injectLoopTimes = 0;
            this.lastTaskId = 1;
            this.statusError = new aa;
            this.spec = a;
            this.httpRetryConfig = c;
            this.wsRetryConfig = b
        }
        async setTranscodingConfig(a) {
            var b;
            let c = Qb({}, Qn, {}, a);
            var e, g;
            66 !== c.videoCodecProfile && 77 !== c.videoCodecProfile && 100 !== c.videoCodecProfile && (k.debug(l(e = "[".concat(this.spec.clientId, "] set transcoding config, fix video codec profile: ")).call(e, c.videoCodecProfile, " -> 100")),
            c.videoCodecProfile = 100);
            (c.transcodingUsers || (c.transcodingUsers = c.userConfigs),
            c.transcodingUsers) && (c.transcodingUsers = z(g = c.transcodingUsers).call(g, a=>Qb({}, Pn, {}, a, {
                zOrder: a.zOrder ? a.zOrder + 1 : 1
            })));
            !function(a) {
                var b, c;
                null == a.width || V(a.width, "config.width", 0, 1E4);
                null == a.height || V(a.height, "config.height", 0, 1E4);
                null == a.videoBitrate || V(a.videoBitrate, "config.videoBitrate", 1, 1E6);
                null == a.videoFrameRate || V(a.videoFrameRate, "config.videoFrameRate");
                null == a.lowLatency || ye(a.lowLatency, "config.lowLatency");
                null == a.audioSampleRate || Ka(a.audioSampleRate, "config.audioSampleRate", [32E3, 44100, 48E3]);
                null == a.audioBitrate || V(a.audioBitrate, "config.audioBitrate", 1, 128);
                null == a.audioChannels || Ka(a.audioChannels, "config.audioChannels", [1, 2, 3, 4, 5]);
                null == a.videoGop || V(a.videoGop, "config.videoGop");
                null == a.videoCodecProfile || Ka(a.videoCodecProfile, "config.videoCodecProfile", [66, 77, 100]);
                null == a.userCount || V(a.userCount, "config.userCount", 0, 17);
                null == a.backgroundColor || V(a.backgroundColor, "config.backgroundColor", 0, 16777215);
                null == a.userConfigExtraInfo || Ga(a.userConfigExtraInfo, "config.userConfigExtraInfo", 0, 4096, !1);
                a.transcodingUsers && null != a.transcodingUsers && (Yg(a.transcodingUsers, "config.transcodingUsers"),
                q(b = a.transcodingUsers).call(b, (a,b)=>{
                    Ae(a.uid);
                    null == a.x || V(a.x, "transcodingUser[".concat(b, "].x"), 0, 1E4);
                    null == a.y || V(a.y, "transcodingUser[".concat(b, "].y"), 0, 1E4);
                    null == a.width || V(a.width, "transcodingUser[".concat(b, "].width"), 0, 1E4);
                    null == a.height || V(a.height, "transcodingUser[".concat(b, "].height"), 0, 1E4);
                    null == a.zOrder || V(a.zOrder - 1, "transcodingUser[".concat(b, "].zOrder"), 0, 100);
                    null == a.alpha || V(a.alpha, "transcodingUser[".concat(b, "].alpha"), 0, 1, !1)
                }
                ));
                null == a.watermark || Be(a.watermark, "watermark");
                null == a.backgroundImage || Be(a.backgroundImage, "backgroundImage");
                a.images && null != a.images && (Yg(a.images, "config.images"),
                q(c = a.images).call(c, (a,b)=>{
                    Be(a, "images[".concat(b, "]"))
                }
                ))
            }(c);
            a = [];
            var h, m;
            c.images && a.push(...z(h = c.images).call(h, a=>Qb({}, Nf, {}, a, {
                zOrder: 255
            })));
            (c.backgroundImage && (a.push(Qb({}, Nf, {}, c.backgroundImage, {
                zOrder: 0
            })),
            delete c.backgroundImage),
            c.watermark && (a.push(Qb({}, Nf, {}, c.watermark, {
                zOrder: 255
            })),
            delete c.watermark),
            c.images = a,
            c.transcodingUsers) && (c.userConfigs = z(m = c.transcodingUsers).call(m, a=>Qb({}, a)),
            c.userCount = c.transcodingUsers.length,
            delete c.transcodingUsers);
            h = z(b = c.userConfigs || []).call(b, a=>"number" == typeof a.uid ? B.resolve(a.uid) : Ch(a.uid, this.spec, this.cancelToken.token, this.httpRetryConfig));
            b = await B.all(h);
            if (q(b).call(b, (a,b)=>{
                c.userConfigs && c.userConfigs[b] && (c.userConfigs[b].uid = a)
            }
            ),
            this.transcodingConfig = c,
            this.connection)
                try {
                    var n, p, y;
                    let a = await this.connection.request("request", {
                        clientRequest: {
                            command: "UpdateTranscoding",
                            transcodingConfig: this.transcodingConfig
                        }
                    }, !1, {
                        command: "UpdateTranscoding",
                        workerType: 1,
                        requestByUser: !0,
                        tid: z(n = Gb(fc(p = this.streamingTasks).call(p))).call(n, a=>a.taskId).join("#")
                    });
                    k.debug(l(y = "[".concat(this.spec.clientId, "] update live transcoding config success, code: ")).call(y, a.code, ", config:"), w(this.transcodingConfig))
                } catch (E) {
                    var u;
                    if (!E.data || !E.data.retry)
                        throw E;
                    E.data.changeAddress && this.connection.tryNextAddress();
                    q(u = this.streamingTasks).call(u, a=>{
                        k.warning("[".concat(this.spec.clientId, "] live streaming receive error"), E.toString(), "try to republish", a.url);
                        this.startLiveStreamingTask(a.url, a.mode, E).then(()=>{
                            var b;
                            k.debug(l(b = "[".concat(this.spec.clientId, "] live streaming republish ")).call(b, a.url, " success"))
                        }
                        ).catch(b=>{
                            k.error("[".concat(this.spec.clientId, "] live streaming republish failed"), a.url, b.toString());
                            this.onLiveStreamError && this.onLiveStreamError(a.url, b)
                        }
                        )
                    }
                    )
                }
        }
        setInjectStreamConfig(a, b) {
            this.injectConfig = Ha({}, this.injectConfig, a);
            this.injectLoopTimes = b
        }
        async startLiveStreamingTask(a, b, c) {
            var e, g, h, m;
            if (R(e = Gb(fc(g = this.streamingTasks).call(g))).call(e, a=>a.mode === na.INJECT) && b === na.INJECT)
                return (new p(n.LIVE_STREAMING_TASK_CONFLICT,"inject stream over limit")).throw();
            if (!this.transcodingConfig && b === na.TRANSCODE)
                throw new p(n.INVALID_OPERATION,"[LiveStreaming] no transcoding config found, can not start transcoding streaming task");
            e = {
                command: "PublishStream",
                ts: x(),
                url: a,
                uid: this.spec.uid.toString(),
                autoDestroyTime: 100,
                acceptImageTimeout: !0
            };
            k.debug(l(h = l(m = "[".concat(this.spec.clientId, "] start live streaming ")).call(m, a, ", mode: ")).call(h, b));
            h = await this.taskMutex.lock();
            if (!this.connection && c)
                return void h();
            if (this.streamingTasks.get(a) && !c)
                return h(),
                (new p(n.LIVE_STREAMING_TASK_CONFLICT)).throw();
            try {
                this.connection || (this.connection = await this.connect(b))
            } catch (t) {
                throw h(),
                t;
            }
            switch (b) {
            case na.TRANSCODE:
                e.transcodingConfig = Qb({}, this.transcodingConfig);
                break;
            case na.INJECT:
                e = {
                    cname: this.spec.cname,
                    command: "InjectStream",
                    sid: this.spec.sid,
                    transcodingConfig: this.injectConfig,
                    ts: x(),
                    url: a,
                    loopTimes: this.injectLoopTimes
                }
            }
            this.uapResponse && this.uapResponse.vid && (e.vid = this.uapResponse.vid);
            this.isStartingStreamingTask = !0;
            m = this.lastTaskId++;
            try {
                var r;
                let g = new B((b,e)=>{
                    wb(this.retryTimeout).then(()=>{
                        if (c)
                            return e(c);
                        const b = this.statusError.get(a);
                        return b ? (this.statusError.delete(a),
                        e(b)) : void 0
                    }
                    )
                }
                )
                  , n = await B.race([this.connection.request("request", {
                    clientRequest: e
                }, !0, {
                    url: a,
                    command: "PublishStream",
                    workerType: b === na.TRANSCODE ? 1 : 2,
                    requestByUser: !c,
                    tid: m.toString()
                }), g]);
                this.isStartingStreamingTask = !1;
                k.debug(l(r = "[".concat(this.spec.clientId, "] live streaming started, code: ")).call(r, n.code));
                this.streamingTasks.set(a, {
                    clientRequest: e,
                    mode: b,
                    url: a,
                    taskId: m
                });
                h()
            } catch (t) {
                if (h(),
                this.isStartingStreamingTask = !1,
                !t.data || !t.data.retry || c)
                    throw t;
                return t.data.changeAddress ? (this.connection.tryNextAddress(),
                await this.startLiveStreamingTask(a, b, t)) : await this.startLiveStreamingTask(a, b, t)
            }
        }
        stopLiveStreamingTask(a) {
            return new B((b,c)=>{
                let e = this.streamingTasks.get(a);
                if (!e || !this.connection)
                    return (new p(n.UNEXPECTED_ERROR,"can not find streaming task to stop")).throw();
                let g = e.mode;
                e.abortTask = ()=>{
                    k.debug("[".concat(this.spec.clientId, "] stop live streaming success(worker exception)"));
                    this.streamingTasks.delete(a);
                    b()
                }
                ;
                this.connection.request("request", {
                    clientRequest: {
                        command: g === na.INJECT ? "UninjectStream" : "UnpublishStream",
                        url: e.url
                    }
                }, !1, {
                    url: a,
                    command: "UnPublishStream",
                    workerType: g === na.TRANSCODE ? 1 : 2,
                    requestByUser: !0,
                    tid: (this.lastTaskId++).toString()
                }).then(c=>{
                    var e;
                    k.debug(l(e = "[".concat(this.spec.clientId, "] stop live streaming success, code: ")).call(e, c.code));
                    this.streamingTasks.delete(a);
                    0 === this.streamingTasks.size && g !== na.INJECT && (this.connection && this.connection.close(),
                    this.connection = void 0);
                    b();
                    g === na.INJECT && this.onInjectStatusChange && this.onInjectStatusChange(5, this.spec.uid, a)
                }
                ).catch(c)
            }
            )
        }
        async controlInjectStream(a, b, c, e) {
            let g = this.streamingTasks.get(a);
            if (!g || !this.connection || g.mode !== na.INJECT)
                throw new p(n.INVALID_OPERATION,"can not find inject stream task to control");
            return (await this.connection.request("request", {
                clientRequest: {
                    command: "ControlStream",
                    url: a,
                    control: b,
                    audioVolume: c,
                    position: e
                }
            })).serverResponse
        }
        resetAllTask() {
            var a;
            let b = Gb(fc(a = this.streamingTasks).call(a));
            this.terminate();
            for (let a of b)
                this.startLiveStreamingTask(a.url, a.mode).catch(b=>{
                    this.onLiveStreamError && this.onLiveStreamError(a.url, b)
                }
                )
        }
        terminate() {
            this.cancelToken && this.cancelToken.cancel();
            this.streamingTasks = new aa;
            this.isStartingStreamingTask = !1;
            this.statusError = new aa;
            this.cancelToken = zb.CancelToken.source();
            this.uapResponse = void 0;
            this.connection && this.connection.close();
            this.connection = void 0
        }
        async connect(a) {
            if (this.connection)
                throw new p(n.UNEXPECTED_ERROR,"live streaming connection has already connected");
            let b = await La(this, Gc.REQUEST_WORKER_MANAGER_LIST, a);
            return this.uapResponse = b,
            this.connection = new Go(b.workerToken,this.spec,this.wsRetryConfig,a),
            this.connection.on(ib.WARNING, (a,b)=>this.onLiveStreamWarning && this.onLiveStreamWarning(b, a)),
            this.connection.on(ib.PUBLISH_STREAM_STATUS, a=>this.handlePublishStreamServer(a)),
            this.connection.on(ib.INJECT_STREAM_STATUS, a=>this.handleInjectStreamServerStatus(a)),
            this.connection.on(ib.REQUEST_NEW_ADDRESS, (b,e)=>{
                if (!this.connection)
                    return e(new p(n.UNEXPECTED_ERROR,"can not get new live streaming address list"));
                La(this, Gc.REQUEST_WORKER_MANAGER_LIST, a).then(a=>{
                    this.uapResponse = a;
                    b(a.addressList)
                }
                ).catch(e)
            }
            ),
            await this.connection.init(b.addressList),
            this.connection
        }
        handlePublishStreamServer(a) {
            var b = a.serverStatus && a.serverStatus.url || "empty_url";
            let c = this.streamingTasks.get(b)
              , e = a.reason;
            switch (a.code) {
            case ia.PUBLISH_STREAM_STATUS_ERROR_PUBLISH_BROKEN:
            case ia.PUBLISH_STREAM_STATUS_ERROR_RTMP_CONNECT:
            case ia.PUBLISH_STREAM_STATUS_ERROR_RTMP_HANDSHAKE:
            case ia.PUBLISH_STREAM_STATUS_ERROR_RTMP_PUBLISH:
                a = new p(n.LIVE_STREAMING_CDN_ERROR,"",{
                    code: a.code
                });
                if (c)
                    return k.error(a.toString()),
                    this.onLiveStreamError && this.onLiveStreamError(b, a);
                if (!this.isStartingStreamingTask)
                    break;
                this.statusError.set(b, a);
            case ia.LIVE_STREAM_RESPONSE_FAILED_LOAD_IMAGE:
                return a = new p(n.LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE,e),
                this.onLiveStreamWarning && this.onLiveStreamWarning(b, a);
            case ia.LIVE_STREAM_RESPONSE_WORKER_LOST:
            case ia.LIVE_STREAM_RESPONSE_WORKER_QUIT:
                var g;
                if (this.connection) {
                    this.connection.tryNextAddress();
                    b = Gb(fc(g = this.streamingTasks).call(g));
                    for (let c of b)
                        c.abortTask ? c.abortTask() : (k.warning("[".concat(this.spec.clientId, "] publish stream status code"), a.code, "try to republish", c.url),
                        this.startLiveStreamingTask(c.url, c.mode, new p(n.LIVE_STREAMING_INTERNAL_SERVER_ERROR,"",{
                            code: a.code
                        })).then(()=>{
                            k.debug("[".concat(this.spec.clientId, "] republish live stream success"), c.url)
                        }
                        ).catch(a=>{
                            k.error(a.toString());
                            this.onLiveStreamError && this.onLiveStreamError(c.url, a)
                        }
                        ))
                }
            }
        }
        handleInjectStreamServerStatus(a) {
            let b = Number(a.uid)
              , c = a.serverStatus && a.serverStatus.url;
            switch (a.code) {
            case 200:
                return void (this.onInjectStatusChange && this.onInjectStatusChange(0, b, c));
            case 451:
                return this.onInjectStatusChange && this.onInjectStatusChange(1, b, c),
                void this.streamingTasks.delete(c);
            case 453:
                return this.onInjectStatusChange && this.onInjectStatusChange(2, b, c),
                void this.streamingTasks.delete(c);
            case 470:
                return this.onInjectStatusChange && this.onInjectStatusChange(10, b, c),
                void this.streamingTasks.delete(c);
            case 499:
                return this.onInjectStatusChange && this.onInjectStatusChange(3, b, c),
                void this.streamingTasks.delete(c);
            default:
                return void k.debug("inject stream server status", a)
            }
        }
        hasUrl(a) {
            return this.streamingTasks.has(a)
        }
    }
    class Uh {
        constructor() {
            this.destChannelMediaInfos = new aa
        }
        setSrcChannelInfo(a) {
            ch(a);
            this.srcChannelMediaInfo = a
        }
        addDestChannelInfo(a) {
            ch(a);
            this.destChannelMediaInfos.set(a.channelName, a)
        }
        removeDestChannelInfo(a) {
            ze(a);
            this.destChannelMediaInfos.delete(a)
        }
        getSrcChannelMediaInfo() {
            return this.srcChannelMediaInfo
        }
        getDestChannelMediaInfo() {
            return this.destChannelMediaInfos
        }
    }
    class Io extends Sa {
        constructor(a, b, c) {
            super();
            this.requestId = 1;
            this.onOpen = ()=>{
                this.emit("open");
                this.startHeartBeatCheck()
            }
            ;
            this.onClose = a=>{
                this.emit("close");
                this.dispose()
            }
            ;
            this.onMessage = a=>{
                a = JSON.parse(a.data);
                if (!a || "serverResponse" !== a.command || !a.requestId)
                    return a && "serverStatus" === a.command && a.serverStatus && a.serverStatus.command ? (this.emit("status", a.serverStatus),
                    void this.emit(a.serverStatus.command, a.serverStatus)) : void 0;
                this.emit("req_".concat(a.requestId), a)
            }
            ;
            this.joinInfo = a;
            this.clientId = b;
            this.ws = new Xf("cross-channel-".concat(this.clientId),c);
            this.ws.on(S.RECONNECTING, ()=>{
                this.ws.reconnectMode = "retry";
                this.emit("reconnecting")
            }
            );
            this.ws.on(S.CONNECTED, this.onOpen);
            this.ws.on(S.ON_MESSAGE, this.onMessage);
            this.ws.on(S.CLOSED, this.onClose)
        }
        isConnect() {
            return "connected" === this.ws.state
        }
        sendMessage(a) {
            let b = this.requestId++;
            return a.requestId = b,
            a.seq = b,
            this.ws.sendMessage(a),
            b
        }
        waitStatus(a) {
            return new B((b,c)=>{
                let e = window.setTimeout(()=>{
                    c(new p(n.TIMEOUT,"wait status timeout, status: ".concat(a)))
                }
                , 5E3);
                this.once(a, g=>{
                    window.clearTimeout(e);
                    g.state && 0 !== g.state ? c(new p(n.CROSS_CHANNEL_WAIT_STATUS_ERROR,"wait status error, status: ".concat(a))) : b(void 0)
                }
                );
                this.once("dispose", ()=>{
                    window.clearTimeout(e);
                    c(new p(n.WS_ABORT))
                }
                )
            }
            )
        }
        async request(a) {
            if ("closed" === this.ws.state)
                throw new p(n.WS_DISCONNECT);
            let b = ()=>new B((a,b)=>{
                this.ws.once(S.CLOSED, ()=>b(new p(n.WS_ABORT)));
                this.ws.once(S.CONNECTED, a)
            }
            );
            "connected" !== this.ws.state && await b();
            let c = this.sendMessage(a);
            a = await new B((a,b)=>{
                const e = ()=>{
                    b(new p(n.WS_ABORT))
                }
                ;
                this.ws.once(S.RECONNECTING, e);
                this.ws.once(S.CLOSED, e);
                this.once("req_".concat(c), a);
                wb(3E3).then(()=>{
                    this.removeAllListeners("req_".concat(c));
                    this.ws.off(S.RECONNECTING, e);
                    this.ws.off(S.CLOSED, e);
                    b(new p(n.TIMEOUT,"cross channel ws request timeout"))
                }
                )
            }
            );
            if (!a || 200 !== a.code)
                throw new p(n.CROSS_CHANNEL_SERVER_ERROR_RESPONSE,"response: ".concat(w(a)));
            return a
        }
        async connect(a) {
            this.ws.removeAllListeners(S.REQUEST_NEW_URLS);
            this.ws.on(S.REQUEST_NEW_URLS, b=>{
                b(a)
            }
            );
            await this.ws.init(a)
        }
        dispose() {
            this.clearHeartBeatCheck();
            this.emit("dispose");
            this.removeAllListeners();
            this.ws.close()
        }
        sendPing(a) {
            let b = this.requestId++;
            return a.requestId = b,
            this.ws.sendMessage(a),
            b
        }
        startHeartBeatCheck() {
            this.heartBeatTimer = window.setInterval(()=>{
                this.sendPing({
                    command: "ping",
                    appId: this.joinInfo.appId,
                    cname: this.joinInfo.cname,
                    uid: this.joinInfo.uid.toString(),
                    sid: this.joinInfo.sid,
                    ts: +new Date,
                    requestId: 0
                })
            }
            , 3E3)
        }
        clearHeartBeatCheck() {
            window.clearInterval(this.heartBeatTimer);
            this.heartBeatTimer = void 0
        }
    }
    class Jo extends Sa {
        constructor(a, b, c, e) {
            super();
            this.cancelToken = zb.CancelToken.source();
            this.requestId = 0;
            this._state = "RELAY_STATE_IDLE";
            this.errorCode = "RELAY_OK";
            this.onStatus = a=>{
                var b;
                k.debug(l(b = "[".concat(this.clientId, "] ChannelMediaStatus: ")).call(b, w(a)));
                a && a.command && ("onAudioPacketReceived" === a.command && this.emit("event", "PACKET_RECEIVED_AUDIO_FROM_SRC"),
                "onVideoPacketReceived" === a.command && this.emit("event", "PACKET_RECEIVED_VIDEO_FROM_SRC"),
                "onSrcTokenPrivilegeDidExpire" === a.command && (this.errorCode = "SRC_TOKEN_EXPIRED",
                this.state = "RELAY_STATE_FAILURE"),
                "onDestTokenPrivilegeDidExpire" === a.command && (this.errorCode = "DEST_TOKEN_EXPIRED",
                this.state = "RELAY_STATE_FAILURE"))
            }
            ;
            this.onReconnect = async()=>{
                k.debug("[".concat(this.clientId, "] ChannelMediaSocket disconnect, reconnecting"));
                this.emit("event", "NETWORK_DISCONNECTED");
                this.state = "RELAY_STATE_IDLE";
                this.prevChannelMediaConfig && this.sendStartRelayMessage(this.prevChannelMediaConfig).catch(a=>{
                    "RELAY_STATE_IDLE" !== this.state && (k.error("auto restart channel media relay failed", a.toString()),
                    this.errorCode = "SERVER_CONNECTION_LOST",
                    this.state = "RELAY_STATE_FAILURE")
                }
                )
            }
            ;
            this.joinInfo = a;
            this.clientId = b;
            this.signal = new Io(this.joinInfo,this.clientId,c);
            this.httpRetryConfig = e
        }
        set state(a) {
            a !== this._state && ("RELAY_STATE_FAILURE" !== a && (this.errorCode = "RELAY_OK"),
            this.emit("state", a, this.errorCode),
            this._state = a)
        }
        get state() {
            return this._state
        }
        async startChannelMediaRelay(a) {
            if ("RELAY_STATE_IDLE" !== this.state)
                throw new p(n.INVALID_OPERATION);
            this.state = "RELAY_STATE_CONNECTING";
            await this.connect();
            k.debug("[".concat(this.clientId, "] startChannelMediaRelay: connect success"));
            try {
                await this.sendStartRelayMessage(a)
            } catch (b) {
                if (b.data && b.data.serverResponse && "SetSourceChannel" === b.data.serverResponse.command)
                    throw new p(n.CROSS_CHANNEL_FAILED_JOIN_SRC);
                if (b.data && b.data.serverResponse && "SetDestChannelStatus" === b.serverResponse.command)
                    throw new p(n.CROSS_CHANNEL_FAILED_JOIN_DEST);
                if (b.data && b.data.serverResponse && "StartPacketTransfer" === b.serverResponse.command)
                    throw new p(n.CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST);
                throw b;
            }
            this.prevChannelMediaConfig = a
        }
        async updateChannelMediaRelay(a) {
            if ("RELAY_STATE_RUNNING" !== this.state)
                throw new p(n.INVALID_OPERATION);
            await this.sendUpdateMessage(a);
            this.prevChannelMediaConfig = a
        }
        async stopChannelMediaRelay() {
            await this.sendStopRelayMessage();
            k.debug("[".concat(this.clientId, "] stopChannelMediaRelay: send stop message success"));
            this.state = "RELAY_STATE_IDLE";
            this.dispose()
        }
        dispose() {
            k.debug("[".concat(this.clientId, "] disposeChannelMediaRelay"));
            this.cancelToken.cancel();
            this.cancelToken = zb.CancelToken.source();
            this.state = "RELAY_STATE_IDLE";
            this.emit("dispose");
            this.signal.dispose();
            this.prevChannelMediaConfig = void 0
        }
        async connect() {
            let a = await tl(this.joinInfo, this.cancelToken.token, this.httpRetryConfig);
            this.workerToken = a.workerToken;
            await this.signal.connect(a.addressList);
            this.emit("event", "NETWORK_CONNECTED");
            this.signal.on("status", this.onStatus);
            this.signal.on("reconnecting", this.onReconnect)
        }
        async sendStartRelayMessage(a) {
            var b = this.genMessage(Fa.StopPacketTransfer);
            await this.signal.request(b);
            await this.signal.waitStatus("Normal Quit");
            k.debug("[".concat(this.clientId, "] startChannelMediaRelay: StopPacketTransfer success"));
            b = this.genMessage(Fa.SetSdkProfile, a);
            await this.signal.request(b);
            k.debug("[".concat(this.clientId, "] startChannelMediaRelay: SetSdkProfile success"));
            b = this.genMessage(Fa.SetSourceChannel, a);
            await this.signal.request(b);
            await this.signal.waitStatus("SetSourceChannelStatus");
            this.emit("event", "PACKET_JOINED_SRC_CHANNEL");
            k.debug("[".concat(this.clientId, "] startChannelMediaRelay: SetSourceChannel success"));
            b = this.genMessage(Fa.SetSourceUserId, a);
            await this.signal.request(b);
            k.debug("[".concat(this.clientId, "] startChannelMediaRelay: SetSourceUserId success"));
            b = this.genMessage(Fa.SetDestChannel, a);
            await this.signal.request(b);
            await this.signal.waitStatus("SetDestChannelStatus");
            this.emit("event", "PACKET_JOINED_DEST_CHANNEL");
            k.debug("[".concat(this.clientId, "] startChannelMediaRelay: SetDestChannel success"));
            a = this.genMessage(Fa.StartPacketTransfer, a);
            await this.signal.request(a);
            this.emit("event", "PACKET_SENT_TO_DEST_CHANNEL");
            this.state = "RELAY_STATE_RUNNING";
            k.debug("[".concat(this.clientId, "] startChannelMediaRelay: StartPacketTransfer success"))
        }
        async sendUpdateMessage(a) {
            a = this.genMessage(Fa.UpdateDestChannel, a);
            await this.signal.request(a);
            this.emit("event", "PACKET_UPDATE_DEST_CHANNEL");
            k.debug("[".concat(this.clientId, "] sendUpdateMessage: UpdateDestChannel success"))
        }
        async sendStopRelayMessage() {
            let a = this.genMessage(Fa.StopPacketTransfer);
            await this.signal.request(a);
            k.debug("[".concat(this.clientId, "] sendStopRelayMessage: StopPacketTransfer success"))
        }
        genMessage(a, b) {
            let c = []
              , e = []
              , g = [];
            this.requestId += 1;
            let h = {
                appId: this.joinInfo.appId,
                cname: this.joinInfo.cname,
                uid: this.joinInfo.uid.toString(),
                sdkVersion: Ta,
                sid: this.joinInfo.sid,
                ts: x(),
                requestId: this.requestId,
                seq: this.requestId,
                allocate: !0,
                clientRequest: {}
            };
            "4.4.0" === h.sdkVersion && (h.sdkVersion = "0.0.1");
            let k = null
              , l = null;
            switch (a) {
            case Fa.SetSdkProfile:
                return h.clientRequest = {
                    command: "SetSdkProfile",
                    type: "multi_channel"
                },
                h;
            case Fa.SetSourceChannel:
                if (l = b && b.getSrcChannelMediaInfo(),
                !l)
                    throw new p(n.UNEXPECTED_ERROR,"can not find source config");
                return h.clientRequest = {
                    command: "SetSourceChannel",
                    uid: "0",
                    channelName: l.channelName,
                    token: l.token || this.joinInfo.appId
                },
                h;
            case Fa.SetSourceUserId:
                if (l = b && b.getSrcChannelMediaInfo(),
                !l)
                    throw new p(n.UNEXPECTED_ERROR,"can not find source config");
                return h.clientRequest = {
                    command: "SetSourceUserId",
                    uid: l.uid + ""
                },
                h;
            case Fa.SetDestChannel:
                if (k = b && b.getDestChannelMediaInfo(),
                !k)
                    throw new p(n.UNEXPECTED_ERROR,"can not find dest config");
                return q(k).call(k, a=>{
                    c.push(a.channelName);
                    e.push(a.uid + "");
                    g.push(a.token || this.joinInfo.appId)
                }
                ),
                h.clientRequest = {
                    command: "SetDestChannel",
                    channelName: c,
                    uid: e,
                    token: g
                },
                h;
            case Fa.StartPacketTransfer:
                return h.clientRequest = {
                    command: "StartPacketTransfer"
                },
                h;
            case Fa.Reconnect:
                return h.clientRequest = {
                    command: "Reconnect"
                },
                h;
            case Fa.StopPacketTransfer:
                return h.clientRequest = {
                    command: "StopPacketTransfer"
                },
                h;
            case Fa.UpdateDestChannel:
                if (k = b && b.getDestChannelMediaInfo(),
                !k)
                    throw new p(n.UNEXPECTED_ERROR,"can not find dest config");
                return q(k).call(k, a=>{
                    c.push(a.channelName);
                    e.push(a.uid + "");
                    g.push(a.token || this.joinInfo.appId)
                }
                ),
                h.clientRequest = {
                    command: "UpdateDestChannel",
                    channelName: c,
                    uid: e,
                    token: g
                },
                h
            }
            return h
        }
    }
    class Ko {
        constructor(a, b) {
            this._trust_stream_added_state_ = this._trust_video_mute_state_ = this._trust_audio_mute_state_ = this._trust_video_enabled_state_ = this._trust_audio_enabled_state_ = this._trust_in_room_ = !0;
            this._video_muted_ = this._audio_muted_ = !1;
            this._video_enabled_ = this._audio_enabled_ = !0;
            this._video_added_ = this._audio_added_ = !1;
            this.uid = a;
            this._uintid = b
        }
        get hasVideo() {
            return this._video_enabled_ && !this._video_muted_ && this._video_added_
        }
        get hasAudio() {
            return this._audio_enabled_ && !this._audio_muted_ && this._audio_added_
        }
        get audioTrack() {
            if (this.hasAudio)
                return this._audioTrack
        }
        get videoTrack() {
            if (this.hasVideo)
                return this._videoTrack
        }
    }
    var cg = function(a, b, c, e) {
        var g, h = arguments.length, k = 3 > h ? b : null === e ? e = Y(b, c) : e;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            k = Reflect.decorate(a, b, c, e);
        else
            for (var l = a.length - 1; 0 <= l; l--)
                (g = a[l]) && (k = (3 > h ? g(k) : 3 < h ? g(b, c, k) : g(b, c)) || k);
        return 3 < h && k && X(b, c, k),
        k
    }
      , Ob = function(a, b) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(a, b)
    };
    class oe extends Sa {
        constructor(a) {
            var b, c, e, g;
            let h;
            if (super(),
            this._users = [],
            this._sessionId = null,
            this._bindEnabledTracks = [],
            this._leaveMutex = new Mb("client-leave"),
            this._publishMutex = new Mb("client-publish"),
            this._subscribeMutex = new aa,
            this._remoteStream = new aa,
            this._encryptionMode = "none",
            this._encryptionSecret = null,
            this._encryptionSalt = null,
            this._turnServer = {
                servers: [],
                mode: "auto"
            },
            this._cloudProxyServerMode = "disabled",
            this._isDualStreamEnabled = !1,
            this._streamFallbackTypeCacheMap = new aa,
            this._remoteStreamTypeCacheMap = new aa,
            this._axiosCancelSource = zb.CancelToken.source(),
            this._networkQualitySensitivity = "normal",
            this._handleLocalTrackEnable = (a,b,c)=>{
                this.publish(a, !1).then(b).catch(c)
            }
            ,
            this._handleLocalTrackDisable = (a,b,c)=>{
                this.unpublish(a, !1).then(b).catch(c)
            }
            ,
            this._handleUserOnline = a=>{
                var b;
                this.isStringUID && "string" != typeof a.uid && k.error("[".concat(this._clientId, "] StringUID is Mixed with UintUID"));
                let c = R(b = this._users).call(b, b=>b.uid === a.uid);
                c ? c._trust_in_room_ = !0 : (b = new Ko(a.uid,a.uint_id || a.uid),
                this._users.push(b),
                k.debug("[".concat(this._clientId, "] user online"), a.uid),
                this.emit(P.USER_JOINED, b))
            }
            ,
            this._handleUserOffline = a=>{
                var b;
                let c = R(b = this._users).call(b, b=>b.uid === a.uid);
                c && (this._handleRemoveStream(a),
                Nc(this._users, c),
                this._remoteStreamTypeCacheMap.delete(c.uid),
                this._streamFallbackTypeCacheMap.delete(c.uid),
                k.debug("[".concat(this._clientId, "] user offline"), a.uid, "reason:", a.reason),
                this.emit(P.USER_LEAVED, c, a.reason))
            }
            ,
            this._handleAddAudioOrVideoStream = (a,b,c)=>{
                var e, g, h;
                let m = R(e = this._users).call(e, a=>a.uid === b);
                if (!m)
                    return void k.error("[".concat(this._clientId, "] can not find target user!(on_add_stream)"));
                k.debug(l(g = l(h = "[".concat(this._clientId, "] stream added with uid ")).call(h, b, ", type ")).call(g, a));
                e = "audio" === a ? m.hasAudio : m.hasVideo;
                var n, p;
                (m._uintid || (m._uintid = c || b),
                m._trust_stream_added_state_ = !0,
                "audio" === a ? m._audio_added_ = !0 : m._video_added_ = !0,
                ("audio" === a ? m.hasAudio : m.hasVideo) && !e) && (k.info(l(n = l(p = "[".concat(this._clientId, "] remote user ")).call(p, m.uid, " published ")).call(n, a)),
                this.emit(P.USER_PUBLISHED, m, a));
                "video" === a ? u.onGatewayStream(this._sessionId, Da.ON_ADD_VIDEO_STREAM, la.ON_ADD_VIDEO_STREAM, {
                    peer: c || b
                }) : u.onGatewayStream(this._sessionId, Da.ON_ADD_AUDIO_STREAM, la.ON_ADD_AUDIO_STREAM, {
                    peer: c || b
                });
                (a = this._remoteStream.get(b)) && a.readyToReconnect && "connecting" === a.connectionState && a.reconnectPC().catch(a=>{
                    k.error("[".concat(this._clientId, "] resubscribe error"), a.toString())
                }
                )
            }
            ,
            this._handleRemoveStream = a=>{
                var b, c;
                let e = R(b = this._users).call(b, b=>b.uid === a.uid);
                if (!e)
                    return void k.warning("[".concat(this._clientId, "] can not find target user!(on_remove_stream)"));
                k.debug(l(c = "[".concat(this._clientId, "] stream removed with uid ")).call(c, a.uid));
                b = ()=>{}
                ;
                e.hasAudio && e.hasVideo ? b = ()=>{
                    var a, b;
                    k.info(l(a = "[".concat(this._clientId, "] remote user ")).call(a, e.uid, " unpublished audio track"));
                    this.emit(P.USER_UNPUBLISHED, e, "audio");
                    k.info(l(b = "[".concat(this._clientId, "] remote user ")).call(b, e.uid, " unpublished video track"));
                    this.emit(P.USER_UNPUBLISHED, e, "video")
                }
                : e.hasVideo ? b = ()=>{
                    var a;
                    k.info(l(a = "[".concat(this._clientId, "] remote user ")).call(a, e.uid, " unpublished video track"));
                    this.emit(P.USER_UNPUBLISHED, e, "video")
                }
                : e.hasAudio && (b = ()=>{
                    var a;
                    k.info(l(a = "[".concat(this._clientId, "] remote user ")).call(a, e.uid, " unpublished audio track"));
                    this.emit(P.USER_UNPUBLISHED, e, "audio")
                }
                );
                e._trust_stream_added_state_ = !0;
                e._audio_added_ = !1;
                e._video_added_ = !1;
                (c = this._remoteStream.get(e.uid)) && (c.closeP2PConnection(),
                this._remoteStream.delete(e.uid));
                u.onGatewayStream(this._sessionId, Da.ON_REMOVE_STREAM, la.ON_REMOVE_STREAM, {
                    peer: a.uint_id || a.uid
                });
                b()
            }
            ,
            this._handleSetStreamLocalEnable = (a,b,c)=>{
                var e, g, h, m, n, p;
                let r = R(e = this._users).call(e, a=>a.uid === b);
                if (!r)
                    return void k.error("[".concat(this._clientId, "] can not find target user!(disable_local)"));
                k.debug(l(g = l(h = l(m = "[".concat(this._clientId, "] local ")).call(m, a, " ")).call(h, c ? "enabled" : "disabled", " with uid ")).call(g, b));
                e = "audio" === a ? r.hasAudio : r.hasVideo;
                if ("audio" === a) {
                    r._trust_audio_enabled_state_ = !0;
                    var t = r._audio_enabled_;
                    if (r._audio_enabled_ = c,
                    r._audio_enabled_ === t)
                        return;
                    var q, u;
                    c = r._audio_enabled_ ? "enable-local-audio" : "disable-local-audio";
                    k.debug(l(q = l(u = "[".concat(this._clientId, "] user-info-updated, uid: ")).call(u, b, ", msg: ")).call(q, c));
                    this.emit(P.USER_INFO_UPDATED, b, c)
                } else {
                    r._trust_video_enabled_state_ = !0;
                    q = r._video_enabled_;
                    if (r._video_enabled_ = c,
                    r._video_enabled_ === q)
                        return;
                    var y;
                    c = r._video_enabled_ ? "enable-local-video" : "disable-local-video";
                    k.debug(l(t = l(y = "[".concat(this._clientId, "] user-info-update, uid: ")).call(y, b, ", msg: ")).call(t, c));
                    this.emit(P.USER_INFO_UPDATED, b, c)
                }
                c = "audio" === a ? r.hasAudio : r.hasVideo;
                if (e !== c) {
                    var v, w;
                    if (!e && c)
                        return k.info(l(v = l(w = "[".concat(this._clientId, "] remote user ")).call(w, b, " published ")).call(v, a)),
                        void this.emit(P.USER_PUBLISHED, r, a);
                    if (v = this._remoteStream.get(b))
                        w = sc({}, v.subscribeOptions),
                        w.audio = !!r.hasAudio && w.audio,
                        w.video = !!r.hasVideo && w.video,
                        w.audio || w.video ? v.setSubscribeOptions(w) : (v.closeP2PConnection().catch(a=>{
                            k.warning("close sub pc error", a)
                        }
                        ),
                        this._remoteStream.delete(r.uid));
                    k.info(l(n = l(p = "[".concat(this._clientId, "] remote user ")).call(p, r.uid, " unpublished ")).call(n, a));
                    this.emit(P.USER_UNPUBLISHED, r, a)
                }
            }
            ,
            this._handleMuteStream = (a,b,c)=>{
                var e, g, h;
                k.debug("[".concat(this._clientId, "] receive mute message"), a, b, c);
                let m = R(e = this._users).call(e, b=>b.uid === a);
                var n;
                if (!m)
                    return void k.warning(l(n = "[".concat(this._clientId, "] can not find remote user, ignore mute event, uid: ")).call(n, a));
                e = "audio" === b ? m.hasAudio : m.hasVideo;
                if ("audio" === b) {
                    m._trust_audio_mute_state_ = !0;
                    var p = m._audio_muted_;
                    if (m._audio_muted_ = c,
                    m._audio_muted_ === p)
                        return;
                    var r, t;
                    c = m._audio_muted_ ? "mute-audio" : "unmute-audio";
                    k.debug(l(r = l(t = "[".concat(this._clientId, "] user-info-update, uid: ")).call(t, a, ", msg: ")).call(r, c));
                    this.emit(P.USER_INFO_UPDATED, a, c)
                } else {
                    m._trust_video_mute_state_ = !0;
                    r = m._video_muted_;
                    if (m._video_muted_ = c,
                    m._video_muted_ === r)
                        return;
                    var q;
                    c = m._video_muted_ ? "mute-video" : "unmute-video";
                    k.debug(l(p = l(q = "[".concat(this._clientId, "] user-info-update, uid: ")).call(q, a, ", msg: ")).call(p, c));
                    this.emit(P.USER_INFO_UPDATED, a, c)
                }
                c = "audio" === b ? m.hasAudio : m.hasVideo;
                if (e !== c) {
                    var u, y;
                    if (!e && c)
                        return k.info(l(u = l(y = "[".concat(this._clientId, "] remote user ")).call(y, a, " published ")).call(u, b)),
                        void this.emit(P.USER_PUBLISHED, m, b);
                    if (u = this._remoteStream.get(a))
                        y = sc({}, u.subscribeOptions),
                        y.audio = !!m.hasAudio && y.audio,
                        y.video = !!m.hasVideo && y.video,
                        "video" === b && u.pc._statsFilter.setVideoIsReady(!1),
                        y.audio || y.video ? u.setSubscribeOptions(y) : (u.closeP2PConnection().catch(a=>{
                            k.warning("close sub pc error", a)
                        }
                        ),
                        this._remoteStream.delete(m.uid));
                    k.info(l(g = l(h = "[".concat(this._clientId, "] remote user ")).call(h, a, " unpublished ")).call(g, b));
                    this.emit(P.USER_UNPUBLISHED, m, b)
                }
            }
            ,
            this._handleP2PLost = a=>{
                k.debug("[".concat(this._clientId, "] receive p2p lost"), a);
                let b = null;
                if (this._highStream && this._highStream.pc.ID === a.p2pid)
                    b = this._highStream;
                else if (this._lowStream && this._lowStream.pc.ID === a.p2pid)
                    b = this._lowStream;
                else {
                    var c;
                    q(c = this._remoteStream).call(c, c=>{
                        c.pc.ID === a.p2pid && (b = c)
                    }
                    )
                }
                b ? b.emit(H.GATEWAY_P2P_LOST, a.p2pid) : k.warning("P2PLost stream not found", a)
            }
            ,
            this._handleTokenWillExpire = ()=>{
                k.debug("[".concat(this._clientId, "] received message onTokenPrivilegeWillExpire"));
                this.emit(P.ON_TOKEN_PRIVILEGE_WILL_EXPIRE)
            }
            ,
            this._handleBeforeUnload = a=>{
                void 0 !== a.returnValue && "" !== a.returnValue || (this.leave(),
                k.info("[".concat(this._clientId, "] auto leave onbeforeunload")))
            }
            ,
            this._handleUpdateNetworkQuality = ()=>{
                var a;
                if ("normal" !== this._networkQualitySensitivity) {
                    if (navigator && void 0 !== navigator.onLine && !navigator.onLine)
                        return void this.emit(P.NETWORK_QUALITY, {
                            downlinkNetworkQuality: 6,
                            uplinkNetworkQuality: 6
                        });
                    var b = {
                        downlinkNetworkQuality: 0,
                        uplinkNetworkQuality: 0
                    };
                    this._highStream && !this._highStream.detecting && (b.uplinkNetworkQuality = this._highStream.getNetworkQuality());
                    var c = 0;
                    q(a = this._remoteStream).call(a, a=>c += a.getNetworkQuality());
                    0 < this._remoteStream.size && (b.downlinkNetworkQuality = Math.round(c / this._remoteStream.size));
                    this.emit(P.NETWORK_QUALITY, b)
                }
            }
            ,
            this._codec = a.codec,
            this._mode = a.mode,
            a.proxyServer && (this._proxyServer = a.proxyServer,
            u.setProxyServer(this._proxyServer),
            k.setProxyServer(this._proxyServer)),
            a.turnServer && (this._turnServer = sc({}, this._turnServer, {
                mode: "manual"
            }, a.turnServer)),
            this._clientId = qa(5, "client-"),
            k.info(l(b = l(c = l(e = l(g = "[".concat(this._clientId, "] Initializing AgoraRTC client v")).call(g, Ta, " build: ")).call(e, "v4.4.0-58-g0247fcd0(2021/4/27 \u4e0b\u53483:11:33)", ", mode: ")).call(c, this._mode, ", codec: ")).call(b, this._codec)),
            a.clientRoleOptions)
                try {
                    bh(a.clientRoleOptions),
                    h = Ha({}, a.clientRoleOptions)
                } catch (r) {
                    var m;
                    k.warning(l(m = "[".concat(this._clientId, "] ")).call(m, r.toString()))
                }
            this._statsCollector = new kd(this._clientId);
            this._statsCollector.onStatsException = (a,b,c)=>{
                var e, g, h;
                k.debug(l(e = l(g = l(h = "[".concat(this._clientId, "] receive exception msg, code: ")).call(h, a, ", msg: ")).call(g, b, ", uid: ")).call(e, c));
                this.emit(P.EXCEPTION, {
                    code: a,
                    msg: b,
                    uid: c
                })
            }
            ;
            this._statsCollector.onUploadPublishDuration = (a,b,c,e)=>{
                var g;
                let h = R(g = this._users).call(g, b=>b.uid === a);
                h && u.peerPublishStatus(this._sessionId, {
                    subscribeElapse: e,
                    audioPublishDuration: b,
                    videoPublishDuration: c,
                    peer: h._uintid
                })
            }
            ;
            this._gateway = new lo({
                clientId: this._clientId,
                mode: this._mode,
                codec: this._codec,
                websocketRetryConfig: a.websocketRetryConfig || Qa,
                httpRetryConfig: a.httpRetryConfig || Qa,
                forceWaitGatewayResponse: void 0 === a.forceWaitGatewayResponse || a.forceWaitGatewayResponse,
                statsCollector: this._statsCollector,
                role: a.role,
                clientRoleOptions: h
            });
            this._config = a;
            this._configDistribute = mo;
            this._handleGatewayEvents();
            Rj.push(this)
        }
        get connectionState() {
            return this._gateway.state
        }
        get remoteUsers() {
            return this._users
        }
        get localTracks() {
            return this._highStream ? this._highStream.getAllTracks() : []
        }
        get uid() {
            return this._uid
        }
        get channelName() {
            return this._channelName
        }
        get isStringUID() {
            return !!this._joinInfo && !!this._joinInfo.stringUid
        }
        async join(a, b, c, e, g) {
            var h;
            let m = u.reportApiInvoke(this._sessionId, {
                name: D.JOIN,
                options: [a, b, c, e],
                tag: C.TRACER
            });
            try {
                if (!c && null !== c)
                    throw new p(n.INVALID_PARAMS,"Invalid token: ".concat(c, ". If you don not use token, set it to null"));
                c && Ga(c, "token", 1, 2047);
                a && Ga(a, "appid", 1, 2047);
                ze(b);
                e && Ae(e);
                g && Ga(g, "optionalInfo", 1, 2047)
            } catch (y) {
                throw m.onError(y),
                y;
            }
            if (k.info(l(h = "[".concat(this._clientId, "] start join channel ")).call(h, b)),
            this._leaveMutex.isLocked)
                k.debug("[".concat(this._clientId, "] join: waiting leave operation")),
                (await this._leaveMutex.lock())(),
                k.debug("[".concat(this._clientId, "] join: continue"));
            if ("DISCONNECTED" !== this.connectionState)
                throw a = new p(n.INVALID_OPERATION,"[".concat(this._clientId, "] Client already in connecting/connected state")),
                m.onError(a),
                a;
            this._sessionId || (this._sessionId = qa(32, "").toUpperCase());
            this._gateway.state = "CONNECTING";
            g = {
                clientId: this._clientId,
                appId: a,
                sid: this._sessionId,
                cname: b,
                uid: "string" != typeof e ? e : null,
                turnServer: this._turnServer,
                proxyServer: this._proxyServer,
                token: c || a,
                cloudProxyServer: this._cloudProxyServerMode,
                optionalInfo: g
            };
            "string" == typeof e && (g.stringUid = e,
            this._uintUid ? (g.uid = this._uintUid,
            this._uintUid = void 0) : g.uid = 0);
            "none" !== this._encryptionMode && this._encryptionSecret && (g.aesmode = this._encryptionMode,
            g.aespassword = this._encryptionSecret,
            this._encryptionSalt && (g.aessalt = this._encryptionSalt));
            this._startSession(this._sessionId, {
                channel: b,
                appId: a
            });
            gc(()=>{
                "CONNECTING" === this.connectionState && u.joinChannelTimeout(this._sessionId, 5)
            }
            , 5E3);
            try {
                var r;
                if (await rl(g, this._axiosCancelSource.token, this._config.httpRetryConfig || Qa),
                g.stringUid && !g.uid) {
                    var t;
                    let a = await Ch(g.stringUid, g, this._axiosCancelSource.token, this._config.httpRetryConfig || Qa);
                    k.debug(l(t = "getUserAccount Success ".concat(g.stringUid, " => ")).call(t, a));
                    g.uid = a
                }
                this._configDistribute.startGetConfigDistribute(g, this._axiosCancelSource.token);
                this._configDistribute.on(hd.UPDATE_BITRATE_LIMIT, a=>{
                    this._highStream && this._highStream.handleUpdateBitrateLimit(a.uplink);
                    a.low_stream_uplink && this._lowStream && this._lowStream.handleUpdateBitrateLimit({
                        max_bitrate: a.low_stream_uplink.bitrate,
                        min_bitrate: a.low_stream_uplink.bitrate || 0
                    })
                }
                );
                let e = await Bh(g, this._axiosCancelSource.token, this._config.httpRetryConfig || Qa);
                this._key = c || a;
                this._joinInfo = sc({}, g, {
                    cid: e.gatewayInfo.cid,
                    uid: g.uid ? g.uid : e.gatewayInfo.uid,
                    vid: e.gatewayInfo.vid,
                    apResponse: e.gatewayInfo.res,
                    uni_lbs_ip: e.gatewayInfo.uni_lbs_ip,
                    gatewayAddrs: e.gatewayInfo.gatewayAddrs
                });
                let h = await this._gateway.join(this._joinInfo, this._key);
                return m.onSuccess(h),
                this._appId = a,
                this._channelName = g.cname,
                this._uid = h,
                this._networkQualityInterval && window.clearInterval(this._networkQualityInterval),
                this._networkQualityInterval = window.setInterval(this._handleUpdateNetworkQuality, 2E3),
                window.addEventListener("beforeunload", this._handleBeforeUnload),
                k.info(l(r = "[".concat(this._clientId, "] Joining channel success: ")).call(r, b)),
                h
            } catch (y) {
                throw k.error("[".concat(this._clientId, "] Joining channel failed, rollback"), y),
                y.code !== n.OPERATION_ABORTED && (this._gateway.state = "DISCONNECTED",
                this._reset()),
                m.onError(y),
                y;
            }
        }
        async leave() {
            let a = u.reportApiInvoke(this._sessionId, {
                name: D.LEAVE,
                options: [],
                tag: C.TRACER
            });
            k.info("[".concat(this._clientId, "] Leaving channel"));
            window.removeEventListener("beforeunload", this._handleBeforeUnload);
            this._reset();
            let b = await this._leaveMutex.lock();
            if ("DISCONNECTED" === this.connectionState)
                return k.info("[".concat(this._clientId, "] Leaving channel repeated, success")),
                b(),
                a.onSuccess();
            await this._gateway.leave("CONNECTED" !== this.connectionState);
            k.info("[".concat(this._clientId, "] Leaving channel success"));
            b();
            a.onSuccess()
        }
        async publish(a, b=!0) {
            var c, e;
            nc(a) || (a = [a]);
            let g = u.reportApiInvoke(this._sessionId, {
                name: D.PUBLISH,
                options: z(a).call(a, a=>a ? Object(a).toString() : "null"),
                tag: C.TRACER
            });
            if (0 === a.length)
                return a = new p(n.INVALID_PARAMS,"track list is empty"),
                g.onError(a),
                a.throw();
            if ("live" === this._mode && "audience" === this._gateway.role)
                return a = new p(n.INVALID_OPERATION,"audience can not publish stream"),
                g.onError(a),
                a.throw();
            for (let c of a) {
                if (!(c instanceof me))
                    return a = new p(n.INVALID_PARAMS,"pamameter is not local track"),
                    g.onError(a),
                    a.throw();
                if (!c._enabled && b)
                    return a = new p(n.TRACK_IS_DISABLED,"can not publish a disabled track: ".concat(c.getTrackId())),
                    g.onError(a),
                    a.throw()
            }
            k.info(l(c = "[".concat(this._clientId, "] Publishing tracks, id ")).call(c, z(a).call(a, a=>"".concat(a.getTrackId(), " "))));
            await this._configDistribute.awaitConfigDistributeComplete();
            b && q(a).call(a, a=>{
                var b;
                let c = this._configDistribute.getBitrateLimit();
                a instanceof Ma && c && a.setBitrateLimit(c.uplink);
                -1 === I(b = this._bindEnabledTracks).call(b, a) && (a.addListener(L.NEED_ADD_TRACK, this._handleLocalTrackEnable),
                a.addListener(L.NEED_REMOVE_TRACK, this._handleLocalTrackDisable),
                this._bindEnabledTracks.push(a))
            }
            );
            c = await this._publishMutex.lock();
            try {
                let b = await this._publishHighStream(a)
                  , e = (b.audioTrack,
                b.videoTrack);
                this._isDualStreamEnabled && e && !this._lowStream && await this._publishLowStream(e);
                c();
                g.onSuccess()
            } catch (h) {
                throw c(),
                b && q(a).call(a, a=>{
                    var b, c;
                    let e = I(b = this._bindEnabledTracks).call(b, a);
                    -1 !== e && (a.off(L.NEED_ADD_TRACK, this._handleLocalTrackEnable),
                    a.off(L.NEED_REMOVE_TRACK, this._handleLocalTrackDisable),
                    Ia(c = this._bindEnabledTracks).call(c, e, 1))
                }
                ),
                g.onError(h),
                k.error("[".concat(this._clientId, "] publish error"), h.toString()),
                h;
            }
            k.info(l(e = "[".concat(this._clientId, "] Publish success, id ")).call(e, z(a).call(a, a=>"".concat(a.getTrackId(), " "))))
        }
        async unpublish(a, b=!0) {
            var c, e, g;
            if (!this._highStream)
                return void k.warning("[".concat(this._clientId, "] Could not find tracks to unpublish"));
            var h = this._highStream.getAllTracks();
            a ? nc(a) || (a = [a]) : a = this._highStream.getAllTracks();
            h = function(a, b) {
                if (a.length !== b.length)
                    return !1;
                for (let c = 0; c < a.length; c += 1) {
                    const e = a[c];
                    if (M(a).call(a, a=>a === e).length !== M(b).call(b, a=>a === e).length)
                        return !1
                }
                return !0
            }(h, a);
            let m = u.reportApiInvoke(this._sessionId, {
                name: D.UNPUBLISH,
                options: z(a).call(a, a=>a.getTrackId()),
                tag: C.TRACER
            });
            k.info(l(c = l(e = "[".concat(this._clientId, "] Unpublish tracks, tracks ")).call(e, z(a).call(a, a=>"".concat(a.getTrackId(), " ")), ", isClosePC: ")).call(c, h));
            c = h ? void 0 : await this._publishMutex.lock();
            if (!this._highStream)
                return k.warning("[".concat(this._clientId, "] Could not find tracks to unpublish")),
                void (c && c());
            try {
                this._lowStream && 0 < M(a).call(a, a=>"video" === a.trackMediaType).length && (await this._lowStream.closeP2PConnection(),
                this._lowStream = void 0),
                h ? await this._highStream.closeP2PConnection() : await this._highStream.removeTracks(a, b),
                c && c()
            } catch (r) {
                if (r.code !== n.OPERATION_ABORTED)
                    throw m.onError(r),
                    k.error("[".concat(this._clientId, "] unpublish error"), r.toString()),
                    c && c(),
                    r;
                k.debug("[".concat(this._clientId, "] ignore unpub operation abort"));
                c && c()
            }
            this._highStream && "disconnected" === this._highStream.connectionState && (this._highStream = void 0,
            this._lowStream = void 0);
            b && q(a).call(a, a=>{
                var b, c;
                let e = I(b = this._bindEnabledTracks).call(b, a);
                -1 !== e && (a.off(L.NEED_ADD_TRACK, this._handleLocalTrackEnable),
                a.off(L.NEED_REMOVE_TRACK, this._handleLocalTrackDisable),
                Ia(c = this._bindEnabledTracks).call(c, e, 1))
            }
            );
            k.info(l(g = "[".concat(this._clientId, "] Unpublish success,tracks ")).call(g, z(a).call(a, a=>"".concat(a.getTrackId()))));
            m.onSuccess()
        }
        async subscribe(a, b) {
            var c, e, g, h;
            Ka(b, "mediaType", ["audio", "video"]);
            let m = u.reportApiInvoke(this._sessionId, {
                name: D.SUBSCRIBE,
                options: [a.uid, b],
                tag: C.TRACER
            });
            if (!this._joinInfo)
                throw b = new p(n.INVALID_OPERATION,"Can't subscribe stream, not joined"),
                m.onError(b),
                b;
            if ("CONNECTED" !== this.connectionState && "RECONNECTING" !== this.connectionState)
                throw b = new p(n.INVALID_OPERATION,"Can't subscribe stream in ".concat(this.connectionState, " state")),
                m.onError(b),
                b;
            if (!R(c = this._users).call(c, b=>b === a)) {
                var r;
                b = new p(n.INVALID_REMOTE_USER,"user is not in the channel");
                throw k.error(l(r = "[".concat(this._clientId, "] can not subscribe ")).call(r, a.uid, ", this user is not in the channel")),
                m.onError(b),
                b;
            }
            if (!a.hasAudio && !a.hasVideo) {
                var t;
                b = new p(n.INVALID_REMOTE_USER,"user is not published");
                throw k.error(l(t = "[".concat(this._clientId, "] can not subscribe ")).call(t, a.uid, ", user is not published")),
                m.onError(b),
                b;
            }
            r = {
                audio: "audio" === b,
                video: "video" === b
            };
            if (!a.hasAudio && r.audio || !a.hasVideo && r.video) {
                var q, v;
                var E = new p(n.REMOTE_USER_IS_NOT_PUBLISHED);
                throw k.error(l(q = l(v = "[".concat(this._clientId, "] can not subscribe ")).call(v, a.uid, " with mediaType ")).call(q, b, ", remote track is not published")),
                m.onError(E),
                E;
            }
            (q = this._subscribeMutex.get(a.uid)) || (q = new Mb("sub-".concat(a.uid)),
            this._subscribeMutex.set(a.uid, q));
            k.info(l(e = l(g = "[".concat(this._clientId, "] subscribe user ")).call(g, a.uid, ", mediaType: ")).call(e, b));
            e = await q.lock();
            g = this._remoteStream.get(a.uid);
            try {
                if (g)
                    r.audio = r.audio || g.subscribeOptions.audio,
                    r.video = r.video || g.subscribeOptions.video,
                    await this._gateway.subscribeChange(g, r);
                else {
                    g = new Fo(a,this._statsCollector,this._joinInfo,r);
                    this._remoteStream.set(a.uid, g);
                    try {
                        await this._gateway.subscribe(g)
                    } catch (A) {
                        throw this._remoteStream.delete(a.uid),
                        A;
                    }
                    g.on(H.CONNECTION_STATE_CHANGE, (b,c)=>{
                        "connecting" === b ? this.emit(P.MEDIA_RECONNECT_START, a.uid) : "connected" === b && this.emit(P.MEDIA_RECONNECT_END, a.uid)
                    }
                    )
                }
                e()
            } catch (A) {
                var w;
                throw m.onError(A),
                e(),
                k.error(l(w = "[".concat(this._clientId, "] subscribe user ")).call(w, a.uid, " error"), A),
                A;
            }
            k.info(l(E = l(h = "[".concat(this._clientId, "] subscribe success user ")).call(h, a.uid, ", mediaType: ")).call(E, b));
            this._defaultStreamFallbackType && this.setStreamFallbackOption(a.uid, this._defaultStreamFallbackType).catch(a=>{
                k.warning("[".concat(this._clientId, "] auto set fallback failed"), a)
            }
            );
            b = "audio" === b ? a.audioTrack : a.videoTrack;
            return b ? (m.onSuccess(b.getTrackId()),
            b) : (b = new p(n.UNEXPECTED_ERROR,"can not find remote track in user object"),
            m.onError(b),
            b.throw())
        }
        async unsubscribe(a, b) {
            var c, e, g, h, m;
            b && Ka(b, "mediaType", ["audio", "video"]);
            let r = u.reportApiInvoke(this._sessionId, {
                name: D.UNSUBSCRIBE,
                options: [a.uid, b],
                tag: C.TRACER
            });
            if (!R(c = this._users).call(c, b=>b === a)) {
                var t;
                b = new p(n.INVALID_REMOTE_USER,"user is not in the channel");
                throw k.error(l(t = "[".concat(this._clientId, "] can not subscribe ")).call(t, a.uid, ", user is not in the channel")),
                r.onError(b),
                b;
            }
            k.info(l(e = l(g = "[".concat(this._clientId, "] unsubscribe uid: ")).call(g, a.uid, ", mediaType: ")).call(e, b));
            (t = this._subscribeMutex.get(a.uid)) || (t = new Mb("sub-".concat(a.uid)),
            this._subscribeMutex.set(a.uid, t));
            t = await t.lock();
            c = this._remoteStream.get(a.uid);
            var q;
            if (!c)
                return k.warning(l(q = "[".concat(this._clientId, "]: you have not subscribe the remote user ")).call(q, a.uid)),
                r.onSuccess(),
                void t();
            q = sc({}, c.subscribeOptions);
            "audio" === b ? q.audio = !1 : "video" === b ? (q.video = !1,
            c.pc._statsFilter.setVideoIsReady(!1)) : (q.audio = !1,
            q.video = !1);
            try {
                q.audio || q.video ? await this._gateway.subscribeChange(c, q) : (await c.closeP2PConnection(),
                this._remoteStream.delete(a.uid)),
                t()
            } catch (E) {
                var v;
                if (E.code !== n.OPERATION_ABORTED)
                    throw r.onError(E),
                    t(),
                    k.error(l(v = "[".concat(this._clientId, "] unsubscribe user ")).call(v, a.uid, " error"), E.toString()),
                    E;
                t();
                k.debug("[".concat(this._clientId, "] ignore unsub operation abort"))
            }
            k.info(l(h = l(m = "[".concat(this._clientId, "] unsubscribe success uid: ")).call(m, a.uid, ", mediaType: ")).call(h, b));
            r.onSuccess()
        }
        setLowStreamParameter(a) {
            if (!a)
                throw new p(n.INVALID_PARAMS);
            null == a.width || V(a.width, "streamParameter.width");
            null == a.height || V(a.height, "streamParameter.height");
            null == a.framerate || V(a.framerate, "streamParameter.framerate");
            null == a.bitrate || V(a.bitrate, "streamParameter.bitrate");
            !0;
            let b = u.reportApiInvoke(this._sessionId, {
                name: D.SET_LOW_STREAM_PARAMETER,
                options: [a],
                tag: C.TRACER
            });
            (!a.width && a.height || a.width && !a.height) && k.warning("[".concat(this._clientId, "] The width and height parameters take effect only when both are set"));
            k.info("[".concat(this._clientId, "] set low stream parameter to"), w(a));
            let c = this._configDistribute.getLowStreamConfigDistribute();
            c && c.bitrate && a.bitrate && c.bitrate < a.bitrate && (a.bitrate = c.bitrate);
            this._lowStreamParameter = a;
            b.onSuccess()
        }
        async enableDualStream() {
            let a = u.reportApiInvoke(this._sessionId, {
                name: D.ENABLE_DUAL_STREAM,
                options: [],
                tag: C.TRACER
            });
            if (!ca.supportDualStream) {
                u.streamSwitch(this._sessionId, {
                    lts: x(),
                    isdual: !0,
                    succ: !1
                });
                var b = new p(n.NOT_SUPPORTED,"Your browser is not support dual stream");
                throw a.onError(b),
                b;
            }
            if (this._isDualStreamEnabled)
                throw b = new p(n.INVALID_OPERATION,"Dual stream is already enabled"),
                a.onError(b),
                b;
            if (this._highStream && "connected" === this._highStream.connectionState && this._highStream.videoTrack)
                try {
                    await this._publishLowStream(this._highStream.videoTrack)
                } catch (c) {
                    throw u.streamSwitch(this._sessionId, {
                        lts: x(),
                        isdual: !0,
                        succ: !1
                    }),
                    a.onError(c),
                    c;
                }
            this._isDualStreamEnabled = !0;
            u.streamSwitch(this._sessionId, {
                lts: x(),
                isdual: !0,
                succ: !0
            });
            k.info("[".concat(this._clientId, "] enable dual stream"));
            a.onSuccess()
        }
        async disableDualStream() {
            let a = u.reportApiInvoke(this._sessionId, {
                name: D.DISABLE_DUAL_STREAM,
                options: [],
                tag: C.TRACER
            });
            if (this._lowStream)
                try {
                    await this._lowStream.closeP2PConnection()
                } catch (b) {
                    throw u.streamSwitch(this._sessionId, {
                        lts: x(),
                        isdual: !1,
                        succ: !1
                    }),
                    a.onError(b),
                    b;
                }
            this._lowStream = void 0;
            this._isDualStreamEnabled = !1;
            this._highStream && (this._highStream.lowStreamConnection = void 0);
            u.streamSwitch(this._sessionId, {
                lts: x(),
                isdual: !1,
                succ: !0
            });
            k.info("[".concat(this._clientId, "] disable dual stream"));
            a.onSuccess()
        }
        async setClientRole(a, b) {
            Ka(a, "role", ["audience", "host"]);
            !0;
            b && bh(b);
            let c = u.reportApiInvoke(this._sessionId, {
                name: D.SET_CLIENT_ROLE,
                options: [a, b],
                tag: C.TRACER
            });
            if ("rtc" === this._mode)
                return k.warning("[".concat(this._clientId, "]rtc mode can not use setClientRole")),
                a = new p(n.INVALID_OPERATION,"rtc mode can not use setClientRole"),
                c.onError(a),
                a.throw();
            if (b && b.level && "host" === a)
                return a = new p(n.INVALID_OPERATION,"host mode can not set audience latency level"),
                c.onError(a),
                a.throw();
            try {
                var e, g;
                if ("audience" === a && this._highStream) {
                    let a = new p(n.INVALID_OPERATION,"can not set client role to audience when publishing stream");
                    return c.onError(a),
                    a.throw()
                }
                await this._gateway.setClientRole(a, b);
                k.info(l(e = l(g = "[".concat(this._clientId, "] set client role to ")).call(g, a, ", level: ")).call(e, b && b.level));
                c.onSuccess()
            } catch (h) {
                throw c.onError(h),
                h;
            }
        }
        setProxyServer(a) {
            Ga(a, "proxyServer");
            let b = u.reportApiInvoke(this._sessionId, {
                name: D.SET_PROXY_SERVER,
                options: [a],
                tag: C.TRACER
            });
            if ("DISCONNECTED" !== this.connectionState)
                throw new p(n.INVALID_OPERATION,"Set proxy server before join channel");
            if ("disabled" !== this._cloudProxyServerMode)
                throw new p(n.INVALID_OPERATION,"You have already set the proxy");
            this._proxyServer = a;
            u.setProxyServer(this._proxyServer);
            k.setProxyServer(this._proxyServer);
            b.onSuccess()
        }
        setTurnServer(a) {
            if (nc(a) || (a = [a]),
            "DISCONNECTED" !== this.connectionState)
                throw new p(n.INVALID_OPERATION,"Set turn server before join channel");
            if ("disabled" !== this._cloudProxyServerMode)
                throw new p(n.INVALID_OPERATION,"You have already set the proxy");
            var b;
            if ($g(a))
                return this._turnServer = {
                    servers: a,
                    mode: "original-manual"
                },
                void k.info(l(b = "[".concat(this._clientId, "] Set original turnserver success: ")).call(b, z(a).call(a, a=>a.urls).join(","), "."));
            q(a).call(a, a=>ah(a));
            this._turnServer = {
                servers: a,
                mode: "manual"
            };
            k.info("[".concat(this._clientId, "] Set turnserver success."))
        }
        startProxyServer(a) {
            let b = u.reportApiInvoke(this._sessionId, {
                name: D.START_PROXY_SERVER,
                options: [],
                tag: C.TRACER
            });
            if ("DISCONNECTED" !== this.connectionState)
                throw a = new p(n.INVALID_OPERATION,"Start proxy server before join channel"),
                b.onError(a),
                a;
            if (this._proxyServer || "manual" === this._turnServer.mode)
                throw a = new p(n.INVALID_OPERATION,"You have already set the proxy"),
                b.onError(a),
                a;
            let c = [1, 2, 3, 4, 5];
            switch (void 0 === a && (a = 1),
            a) {
            case 1:
                this._cloudProxyServerMode = "normal";
                break;
            case 2:
                this._cloudProxyServerMode = "443only";
                break;
            case 3:
                this._cloudProxyServerMode = "proxy3";
                break;
            case 4:
                this._cloudProxyServerMode = "proxy4";
                break;
            case 5:
                this._cloudProxyServerMode = "proxy5";
                break;
            default:
                throw a = new p(n.INVALID_PARAMS,"proxy server mode must be ".concat(c.join("|"))),
                b.onError(a),
                a;
            }
            k.info("[".concat(this._clientId, "] set cloud proxy server mode to"), this._cloudProxyServerMode);
            b.onSuccess()
        }
        stopProxyServer() {
            let a = u.reportApiInvoke(this._sessionId, {
                name: D.STOP_PROXY_SERVER,
                options: [],
                tag: C.TRACER
            });
            if ("DISCONNECTED" !== this.connectionState)
                throw new p(n.INVALID_OPERATION,"Stop proxy server after leave channel");
            u.setProxyServer();
            k.setProxyServer();
            this._cloudProxyServerMode = "disabled";
            k.info("[".concat(this._clientId, "] set cloud proxy server mode to"), this._cloudProxyServerMode);
            this._proxyServer = void 0;
            this._turnServer = {
                mode: "auto",
                servers: []
            };
            a.onSuccess()
        }
        async setRemoteVideoStreamType(a, b) {
            var c, e;
            Ka(b, "streamType", [0, 1]);
            let g = u.reportApiInvoke(this._sessionId, {
                name: D.SET_REMOTE_VIDEO_STREAM_TYPE,
                options: [a, b],
                tag: C.TRACER
            });
            try {
                await this._gateway.setRemoteVideoStreamType(a, b),
                gc(()=>{
                    var b;
                    let c = R(b = this._users).call(b, b=>b.uid === a);
                    c && c.videoTrack && c.videoTrack.updateMediaStreamTrackResolution()
                }
                , 2E3)
            } catch (h) {
                throw g.onError(h),
                k.error("[".concat(this._clientId, "] set remote video stream type error"), h.toString()),
                h;
            }
            k.info(l(c = l(e = "[".concat(this._clientId, "] set remote ")).call(e, a, " video stream type to ")).call(c, b));
            this._remoteStreamTypeCacheMap.set(a, b);
            g.onSuccess()
        }
        async setStreamFallbackOption(a, b) {
            var c, e;
            Ka(b, "fallbackType", [0, 1, 2]);
            let g = u.reportApiInvoke(this._sessionId, {
                name: D.SET_STREAM_FALLBACK_OPTION,
                options: ["too long to show", b],
                tag: C.TRACER
            });
            try {
                await this._gateway.setStreamFallbackOption(a, b)
            } catch (h) {
                throw g.onError(h),
                k.error("[".concat(this._clientId, "] set stream fallback option"), h.toString()),
                h;
            }
            k.info(l(c = l(e = "[".concat(this._clientId, "] set remote ")).call(e, a, " stream fallback type to ")).call(c, b));
            this._streamFallbackTypeCacheMap.set(a, b);
            g.onSuccess()
        }
        setEncryptionConfig(a, b, c) {
            Ka(a, "encryptionMode", "aes-128-xts aes-256-xts aes-128-ecb sm4-128-ecb aes-128-gcm aes-256-gcm aes-128-gcm2 aes-256-gcm2 none".split(" "));
            !0;
            Ga(b, "secret");
            let e = ["aes-128-gcm2", "aes-256-gcm2"];
            if (oa(e).call(e, a)) {
                if (!(c && c instanceof Uint8Array && 32 === c.length))
                    throw new p(n.INVALID_PARAMS,"salt must be an Uint8Array and exactly equal to 32 bytes");
            } else if (c)
                throw new p(n.INVALID_PARAMS,"current encrypt mode does not need salt");
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*,.<>?/:;'"|{}\[\]])(?=.{8,})/.test(b) || k.warning("The secret is not strong:\n      The secret must contain at least 1 lowercase alphabetical character,\n      The secret must contain at least 1 uppercase alphabetical character,\n      The secret must contain at least 1 numeric character,\n      The secret must contain at least one special character,\n      The secret must be eight characters or longer.\n      ");
            this._encryptionMode = a;
            this._encryptionSecret = b;
            c && (this._encryptionSalt = Dd(c))
        }
        async renewToken(a) {
            Ga(a, "token", 1, 2047);
            let b = u.reportApiInvoke(this._sessionId, {
                name: D.RENEW_TOKEN,
                options: [a],
                tag: C.TRACER
            });
            if (!this._key)
                return a = new p(n.INVALID_OPERATION,"renewToken should not be called before user join"),
                b.onError(a),
                a.throw();
            this._key = a;
            try {
                await this._gateway.renewToken(a)
            } catch (c) {
                throw b.onError(c),
                k.error("[".concat(this._clientId, "] renewToken failed"), c.toString()),
                c;
            }
            k.debug("[".concat(this._clientId, "] renewToken success"));
            b.onSuccess()
        }
        enableAudioVolumeIndicator() {
            let a = u.reportApiInvoke(this._sessionId, {
                name: D.ENABLE_AUDIO_VOLUME_INDICATOR,
                options: [],
                tag: C.TRACER
            });
            if (this._audioVolumeIndicationInterval)
                return k.warning("you have already enabled audio volume indicator!"),
                a.onSuccess();
            this._audioVolumeIndicationInterval = window.setInterval(()=>{
                var a, c, e;
                let g = dd(a = z(c = Gb(fc(e = this._remoteStream).call(e))).call(c, a=>({
                    level: a.user.audioTrack ? 100 * a.user.audioTrack._source.getAudioAvgLevel() : 0,
                    uid: a.getUserId()
                }))).call(a, (a,b)=>a.level - b.level);
                this._highStream && this._highStream.audioTrack && (g.push({
                    level: 100 * this._highStream.audioTrack._source.getAudioAvgLevel(),
                    uid: this._highStream._userId
                }),
                g = dd(g).call(g, (a,b)=>a.level - b.level));
                this.emit(P.VOLUME_INDICATOR, g)
            }
            , v.AUDIO_VOLUME_INDICATION_INTERVAL || 2E3);
            a.onSuccess()
        }
        getRTCStats() {
            let a = this._statsCollector.getRTCStats()
              , b = this._gateway.getInChannelInfo();
            return a.Duration = Math.round(b.duration / 1E3),
            a
        }
        startLiveStreaming(a, b) {
            let c = u.reportApiInvoke(this._sessionId, {
                name: D.START_LIVE_STREAMING,
                options: [a, b],
                tag: C.TRACER
            });
            if (!b) {
                if ("h264" !== this._codec)
                    return a = new p(n.LIVE_STREAMING_INVALID_RAW_STREAM,"raw streaming is only support h264"),
                    c.onError(a),
                    B.reject(a);
                if (!this._highStream)
                    return a = new p(n.LIVE_STREAMING_INVALID_RAW_STREAM,"can not find stream to raw streaming"),
                    c.onError(a),
                    B.reject(a)
            }
            if (this._liveRawStreamingClient && this._liveRawStreamingClient.hasUrl(a) || this._liveTranscodeStreamingClient && this._liveTranscodeStreamingClient.hasUrl(a))
                return a = new p(n.LIVE_STREAMING_TASK_CONFLICT),
                c.onError(a),
                B.reject(a);
            b = b ? na.TRANSCODE : na.RAW;
            return this._createLiveStreamingClient(b).startLiveStreamingTask(a, b).then(()=>c.onSuccess()).catch(a=>{
                throw c.onError(a),
                a;
            }
            )
        }
        setLiveTranscoding(a) {
            let b = u.reportApiInvoke(this._sessionId, {
                name: D.SET_LIVE_TRANSCODING,
                options: [a],
                tag: C.TRACER
            });
            return this._createLiveStreamingClient(na.TRANSCODE).setTranscodingConfig(a).then(()=>b.onSuccess()).catch(a=>{
                throw b.onError(a),
                a;
            }
            )
        }
        stopLiveStreaming(a) {
            var b;
            let c = u.reportApiInvoke(this._sessionId, {
                name: D.STOP_LIVE_STREAMING,
                options: [a],
                tag: C.TRACER
            })
              , e = M(b = [this._liveRawStreamingClient, this._liveTranscodeStreamingClient]).call(b, b=>b && b.hasUrl(a));
            return e.length ? B.all(z(e).call(e, b=>b && b.stopLiveStreamingTask(a))).then(()=>c.onSuccess()).catch(a=>{
                throw c.onError(a),
                a;
            }
            ) : (b = new p(n.INVALID_PARAMS,"can not find live streaming url to stop"),
            c.onError(b),
            B.reject(b))
        }
        async addInjectStreamUrl(a, b) {
            let c = u.reportApiInvoke(this._sessionId, {
                name: D.ADD_INJECT_STREAM_URL,
                options: [a, b],
                tag: C.TRACER
            });
            try {
                if (!this._joinInfo)
                    throw new p(n.INVALID_OPERATION,"can not addInjectStreamUrl, no joininfo");
                let c = this._createLiveStreamingClient(na.INJECT);
                c.setInjectStreamConfig(b, 0);
                await c.startLiveStreamingTask(a, na.INJECT)
            } catch (e) {
                throw c.onError(e),
                e;
            }
            c.onSuccess()
        }
        async removeInjectStreamUrl() {
            let a = u.reportApiInvoke(this._sessionId, {
                name: D.REMOVE_INJECT_STREAM_URL,
                options: [],
                tag: C.TRACER
            });
            try {
                var b, c;
                let a = this._createLiveStreamingClient(na.INJECT)
                  , g = R(b = Gb(fc(c = a.streamingTasks).call(c))).call(b, a=>a.mode === na.INJECT);
                if (!this._joinInfo || !g)
                    throw new p(n.INVALID_OPERATION,"can remove addInjectStreamUrl, no joininfo or inject task");
                await a.stopLiveStreamingTask(g.url)
            } catch (e) {
                throw a.onError(e),
                e;
            }
            a.onSuccess()
        }
        async startChannelMediaRelay(a) {
            let b = u.reportApiInvoke(this._sessionId, {
                name: D.START_CHANNEL_MEDIA_RELAY,
                options: [a],
                tag: C.TRACER
            });
            try {
                Th(a),
                await this._createChannelMediaRelayClient().startChannelMediaRelay(a)
            } catch (c) {
                return b.onError(c),
                c.throw()
            }
            b.onSuccess()
        }
        async updateChannelMediaRelay(a) {
            let b = u.reportApiInvoke(this._sessionId, {
                name: D.UPDATE_CHANNEL_MEDIA_RELAY,
                options: [a],
                tag: C.TRACER
            });
            try {
                Th(a),
                await this._createChannelMediaRelayClient().updateChannelMediaRelay(a)
            } catch (c) {
                return b.onError(c),
                c.throw()
            }
            b.onSuccess()
        }
        async stopChannelMediaRelay() {
            let a = u.reportApiInvoke(this._sessionId, {
                name: D.STOP_CHANNEL_MEDIA_RELAY,
                options: [],
                tag: C.TRACER
            });
            try {
                await this._createChannelMediaRelayClient().stopChannelMediaRelay()
            } catch (b) {
                return a.onError(b),
                b.throw()
            }
            a.onSuccess()
        }
        sendStreamMessage(a) {
            if (!this._joinInfo)
                throw new p(n.INVALID_OPERATION,"can not send data stream, not joined");
            "string" == typeof a && (a = (new TextEncoder).encode(a));
            if (1024 < (new Blob([a])).size)
                throw new p(n.INVALID_PARAMS,"stream message out of range.");
            return this._gateway.signal.request(da.DATA_STREAM, {
                payload: Dd(a)
            })
        }
        sendMetadata(a) {
            if (!this._joinInfo)
                throw new p(n.INVALID_OPERATION,"can not send metadata, not joined");
            if (1024 < (new Blob([a])).size)
                throw new p(n.METADATA_OUT_OF_RANGE);
            return this._gateway.signal.request(da.SEND_METADATA, {
                session_id: this._joinInfo.sid,
                metadata: Dd(a)
            })
        }
        async sendCustomReportMessage(a) {
            nc(a) || (a = [a]);
            q(a).call(a, gl);
            let b = u.reportApiInvoke(this._sessionId, {
                name: D.SEND_CUSTOM_REPORT_MESSAGE,
                options: [],
                tag: C.TRACER
            });
            if (!this._joinInfo)
                return a = new p(n.INVALID_OPERATION,"can not send custom report, not joined"),
                b.onError(a),
                a.throw();
            await u.sendCustomReportMessage(this._joinInfo.sid, a)
        }
        getLocalAudioStats() {
            return this._highStream ? this._statsCollector.getLocalAudioTrackStats(this._highStream.connectionId) : je
        }
        getRemoteAudioStats() {
            var a;
            let b = {};
            return q(a = this._remoteStream).call(a, (a,e)=>{
                b[e] = this._statsCollector.getRemoteAudioTrackStats(a.connectionId)
            }
            ),
            b
        }
        getLocalVideoStats() {
            return this._highStream ? this._statsCollector.getLocalVideoTrackStats(this._highStream.connectionId) : ke
        }
        getRemoteVideoStats() {
            var a;
            let b = {};
            return q(a = this._remoteStream).call(a, (a,e)=>{
                b[e] = this._statsCollector.getRemoteVideoTrackStats(a.connectionId)
            }
            ),
            b
        }
        getRemoteNetworkQuality() {
            var a;
            let b = {};
            return q(a = this._remoteStream).call(a, (a,e)=>{
                b[e] = this._statsCollector.getRemoteNetworkQualityStats(a.connectionId)
            }
            ),
            b
        }
        async pickSVCLayer(a, b) {
            Ka(b.spatialLayer, "spatialLayer", [0, 1, 2, 3]);
            Ka(b.temporalLayer, "temporalLayer", [0, 1, 2, 3]);
            try {
                await this._gateway.pickSVCLayer(a, b)
            } catch (c) {
                throw k.error("[".concat(this._clientId, "] pick SVC layer failed"), c.toString()),
                c;
            }
        }
        _reset() {
            var a, b, c;
            k.debug("[".concat(this._clientId, "] reset client"));
            this._axiosCancelSource.cancel();
            this._axiosCancelSource = zb.CancelToken.source();
            this._streamFallbackTypeCacheMap = new aa;
            this._remoteStreamTypeCacheMap = new aa;
            this._configDistribute.stopGetConfigDistribute();
            this._defaultStreamFallbackType = this._proxyServer = this._joinInfo = void 0;
            this._sessionId = null;
            this._statsCollector.reset();
            this._channelName = this._uid = this._appId = this._key = void 0;
            q(a = this._users).call(a, a=>{
                a.audioTrack && (a.audioTrack.stop(),
                a.audioTrack._isDestroyed = !0);
                a.videoTrack && (a.videoTrack.stop(),
                a.videoTrack._isDestroyed = !0)
            }
            );
            this._users = [];
            this._audioVolumeIndicationInterval && (window.clearInterval(this._audioVolumeIndicationInterval),
            this._audioVolumeIndicationInterval = void 0);
            this._highStream && (this._highStream.closeP2PConnection(!0),
            this._highStream = void 0);
            q(b = this._bindEnabledTracks).call(b, a=>{
                a.off(L.NEED_ADD_TRACK, this._handleLocalTrackEnable);
                a.off(L.NEED_REMOVE_TRACK, this._handleLocalTrackDisable)
            }
            );
            this._bindEnabledTracks = [];
            this._lowStream && (this._lowStream.closeP2PConnection(!0),
            this._lowStream = void 0);
            q(c = this._remoteStream).call(c, a=>{
                a.closeP2PConnection(!0)
            }
            );
            this._remoteStream = new aa;
            this._publishMutex = new Mb("client-publish");
            this._subscribeMutex = new aa;
            this._networkQualityInterval && (window.clearInterval(this._networkQualityInterval),
            this._networkQualityInterval = void 0);
            this._injectStreamingClient && (this._injectStreamingClient.terminate(),
            this._injectStreamingClient.removeAllListeners(),
            this._injectStreamingClient = void 0);
            this._liveRawStreamingClient && (this._liveRawStreamingClient.terminate(),
            this._liveRawStreamingClient.removeAllListeners(),
            this._liveRawStreamingClient = void 0);
            this._liveTranscodeStreamingClient && (this._liveTranscodeStreamingClient.terminate(),
            this._liveTranscodeStreamingClient.removeAllListeners(),
            this._liveTranscodeStreamingClient = void 0);
            this._channelMediaRelayClient && (this._channelMediaRelayClient.dispose(),
            this._channelMediaRelayClient = void 0)
        }
        _startSession(a, b) {
            var c, e, g;
            let h = a || qa(32, "").toUpperCase();
            a ? k.debug(l(c = "[".concat(this._clientId, "] new Session ")).call(c, h)) : k.debug(l(e = l(g = "[".concat(this._clientId, "] renewSession ")).call(g, this._sessionId, " => ")).call(e, h));
            this._sessionId = h;
            b ? u.sessionInit(this._sessionId, {
                lts: (new Date).getTime(),
                cname: b.channel,
                appid: b.appId,
                mode: this._mode
            }) : this._joinInfo ? u.sessionInit(this._sessionId, {
                lts: (new Date).getTime(),
                cname: this._joinInfo.cname,
                appid: this._joinInfo.appId,
                mode: this._mode
            }) : this._gateway.joinInfo && u.sessionInit(this._sessionId, {
                lts: (new Date).getTime(),
                cname: this._gateway.joinInfo.cname,
                appid: this._gateway.joinInfo.appId,
                mode: this._mode
            });
            this._joinInfo && (this._joinInfo.sid = h);
            this._gateway.joinInfo && (this._gateway.joinInfo.sid = h)
        }
        async _publishHighStream(a) {
            if (!this._joinInfo)
                throw new p(n.INVALID_OPERATION,"Can't publish stream, haven't joined yet!");
            if ("CONNECTED" !== this.connectionState && "RECONNECTING" !== this.connectionState)
                throw new p(n.INVALID_OPERATION,"can not publish stream in ".concat(this.connectionState, " state"));
            if ("auto" === this._turnServer.mode && v.FORCE_TURN && !v.TURN_ENABLE_TCP && !v.TURN_ENABLE_UDP)
                throw new p(n.UNEXPECTED_ERROR,"force TURN With No TURN Configuration");
            if (k.debug("[".concat(this._clientId, "] publish high stream")),
            this._highStream)
                return await this._highStream.addTracks(a),
                this._highStream;
            this._highStream = new Sk(this._statsCollector,this._joinInfo,this._codec);
            await this._highStream.addTracks(a);
            try {
                await this._gateway.publish(this._highStream, "high")
            } catch (b) {
                throw this._highStream = void 0,
                b;
            }
            return this._highStream.on(H.CONNECTION_STATE_CHANGE, (a,c)=>{
                this._highStream && ("connected" === a ? this.emit(P.MEDIA_RECONNECT_END, this._highStream.getUserId()) : "connecting" === a && this.emit(P.MEDIA_RECONNECT_START, this._highStream.getUserId()))
            }
            ),
            this._highStream
        }
        async _publishLowStream(a) {
            if (!this._joinInfo)
                throw new p(n.INVALID_OPERATION,"Can't publish stream, haven't joined yet!");
            if ("CONNECTED" !== this.connectionState && "RECONNECTING" !== this.connectionState)
                throw new p(n.INVALID_OPERATION,"can not publish stream in ".concat(this.connectionState, " state"));
            if (!this._highStream || "connected" !== this._highStream.connectionState)
                throw new p(n.UNEXPECTED_ERROR,"Could not find high stream");
            if (this._lowStream)
                return (new p(n.UNEXPECTED_ERROR,"[".concat(this._clientId, "] Can't publish low stream when stream already publish"))).throw();
            k.debug("[".concat(this._clientId, "] publish low stream"));
            this._lowStream = new Sk(this._statsCollector,this._joinInfo,this._codec,!0);
            let b = this._configDistribute.getLowStreamConfigDistribute();
            b && b.bitrate && (this._lowStreamParameter || (this._lowStreamParameter = {
                width: 160,
                height: 120,
                framerate: 15,
                bitrate: 50
            }),
            this._lowStreamParameter && this._lowStreamParameter.bitrate && b.bitrate < this._lowStreamParameter.bitrate && (this._lowStreamParameter.bitrate = b.bitrate));
            this._lowStream.lowStreamParameter = this._lowStreamParameter;
            await this._lowStream.addTracks([a]);
            try {
                await this._gateway.publish(this._lowStream, "low")
            } catch (c) {
                throw this._lowStream = void 0,
                c;
            }
            this._highStream.lowStreamConnection = this._lowStream
        }
        _createLiveStreamingClient(a) {
            if (!this._joinInfo || !this._appId)
                return (new p(n.INVALID_OPERATION,"can not create live streaming client, please join channel first")).throw();
            let b = ()=>new Ho(this._joinInfo,this._config.websocketRetryConfig || Qa,this._config.httpRetryConfig || Qa)
              , c = a=>{
                a.onLiveStreamError = (a,b)=>{
                    u.reportApiInvoke(this._sessionId, {
                        name: D.ON_LIVE_STREAM_ERROR,
                        options: [a, b],
                        tag: C.TRACER
                    }).onSuccess();
                    this.emit(P.LIVE_STREAMING_ERROR, a, b)
                }
                ;
                a.onLiveStreamWarning = (a,b)=>{
                    u.reportApiInvoke(this._sessionId, {
                        name: D.ON_LIVE_STREAM_WARNING,
                        options: [a, b],
                        tag: C.TRACER
                    }).onSuccess();
                    this.emit(P.LIVE_STREAMING_WARNING, a, b)
                }
                ;
                a.on(Gc.REQUEST_WORKER_MANAGER_LIST, (a,b,c)=>{
                    if (!this._joinInfo)
                        return c(new p(n.INVALID_OPERATION,"can not find join info to get worker manager"));
                    Dh(a, this._joinInfo, this._axiosCancelSource.token, Qa).then(b).catch(c)
                }
                )
            }
            ;
            switch (a) {
            case na.RAW:
                return this._liveRawStreamingClient || (this._liveRawStreamingClient = b(),
                c(this._liveRawStreamingClient)),
                this._liveRawStreamingClient;
            case na.TRANSCODE:
                return this._liveTranscodeStreamingClient || (this._liveTranscodeStreamingClient = b(),
                c(this._liveTranscodeStreamingClient)),
                this._liveTranscodeStreamingClient;
            case na.INJECT:
                return this._injectStreamingClient || (this._injectStreamingClient = b(),
                this._injectStreamingClient.on(Gc.REQUEST_WORKER_MANAGER_LIST, (a,b,c)=>{
                    if (!this._joinInfo)
                        return c(new p(n.INVALID_OPERATION,"can not find join info to get worker manager"));
                    Dh(a, this._joinInfo, this._axiosCancelSource.token, Qa).then(b).catch(c)
                }
                ),
                this._injectStreamingClient.onInjectStatusChange = (a,b,c)=>{
                    this.emit(P.INJECT_STREAM_STATUS, a, b, c)
                }
                ),
                this._injectStreamingClient
            }
        }
        _createChannelMediaRelayClient() {
            return this._joinInfo ? (this._channelMediaRelayClient || (this._channelMediaRelayClient = new Jo(this._joinInfo,this._clientId,this._config.websocketRetryConfig || Qa,this._config.httpRetryConfig || Qa),
            this._channelMediaRelayClient.on("state", a=>{
                "RELAY_STATE_FAILURE" === a && this._channelMediaRelayClient && this._channelMediaRelayClient.dispose();
                this.emit(P.CHANNEL_MEDIA_RELAY_STATE, a)
            }
            ),
            this._channelMediaRelayClient.on("event", a=>{
                this.emit(P.CHANNEL_MEDIA_RELAY_EVENT, a)
            }
            )),
            this._channelMediaRelayClient) : (new p(n.INVALID_OPERATION,"can not create channel media relay client, please join channel first")).throw()
        }
        _handleGatewayEvents() {
            this._gateway.on(xa.DISCONNECT_P2P, ()=>{
                var a;
                k.debug("[".concat(this._clientId, "] start full reconnect"));
                this._highStream && "disconnected" !== this._highStream.connectionState && (k.debug("[".concat(this._clientId, "] ready to reconnect high stream")),
                this._highStream.readyToReconnectPC());
                this._lowStream && "disconnected" !== this._lowStream.connectionState && (k.debug("[".concat(this._clientId, "] ready to reconnect low stream")),
                this._lowStream.readyToReconnectPC());
                q(a = this._remoteStream).call(a, (a,c)=>{
                    var b;
                    k.debug(l(b = "[".concat(this._clientId, "] ready to reconnect remote stream ")).call(b, c));
                    a.readyToReconnectPC()
                }
                )
            }
            );
            this._gateway.on(xa.CONNECTION_STATE_CHANGE, (a,b,c)=>{
                var e, g;
                let h = ()=>{
                    this.emit(P.CONNECTION_STATE_CHANGE, a, b, c)
                }
                ;
                if (k.info(l(e = l(g = "[".concat(this._clientId, "] connection state change: ")).call(g, b, " -> ")).call(e, a)),
                "DISCONNECTED" === a)
                    return this._reset(),
                    void h();
                var m, n;
                if ("RECONNECTING" === a)
                    this._highStream && "connecting" === this._highStream.connectionState && (k.debug("[".concat(this._clientId, "] ready to reconnect high stream")),
                    this._highStream.readyToReconnectPC()),
                    this._lowStream && "connecting" === this._lowStream.connectionState && (k.debug("[".concat(this._clientId, "] ready to reconnect low stream")),
                    this._lowStream.readyToReconnectPC()),
                    q(m = this._remoteStream).call(m, (a,b)=>{
                        var c;
                        "connecting" === a.connectionState && (k.debug(l(c = "[".concat(this._clientId, "] ready to reconnect remote stream ")).call(c, b)),
                        a.readyToReconnectPC())
                    }
                    ),
                    q(n = this._users).call(n, a=>{
                        a._trust_in_room_ = !1;
                        a._trust_audio_enabled_state_ = !1;
                        a._trust_video_enabled_state_ = !1;
                        a._trust_audio_mute_state_ = !1;
                        a._trust_video_mute_state_ = !1;
                        a._trust_stream_added_state_ = !1
                    }
                    ),
                    this._userOfflineTimeout && window.clearTimeout(this._userOfflineTimeout),
                    this._streamRemovedTimeout && window.clearTimeout(this._streamRemovedTimeout),
                    this._streamRemovedTimeout = this._userOfflineTimeout = void 0;
                else if ("CONNECTED" === a) {
                    var p, u;
                    q(p = this._streamFallbackTypeCacheMap).call(p, (a,b)=>{
                        this._gateway.setStreamFallbackOption(b, a).catch(a=>k.warning("[".concat(this._clientId, "] auto set stream fallback option failed"), a))
                    }
                    );
                    q(u = this._remoteStreamTypeCacheMap).call(u, (a,b)=>{
                        this._gateway.setRemoteVideoStreamType(b, a).catch(a=>k.warning("[".concat(this._clientId, "] auto set remote stream type failed"), a))
                    }
                    );
                    this._highStream && "connecting" === this._highStream.connectionState ? this._highStream.reconnectPC().then(()=>{
                        this._lowStream && "connecting" === this._lowStream.connectionState && this._lowStream.reconnectPC().catch(a=>{
                            k.error("[".concat(this._clientId, "] republish low stream error"), a.toString());
                            this.emit(P.ERROR, {
                                reason: a
                            })
                        }
                        )
                    }
                    ).catch(a=>{
                        k.error("[".concat(this._clientId, "] republish high stream error"), a.toString());
                        this.emit(P.ERROR, {
                            reason: a
                        })
                    }
                    ) : this._lowStream && "connecting" === this._lowStream.connectionState && this._lowStream.reconnectPC().catch(a=>{
                        k.error("[".concat(this._clientId, "] republish low stream error"), a.toString());
                        this.emit(P.ERROR, {
                            reason: a
                        })
                    }
                    );
                    this._userOfflineTimeout = window.setTimeout(()=>{
                        var a;
                        if ("CONNECTED" === this.connectionState) {
                            this._userOfflineTimeout = void 0;
                            var b = M(a = this._users).call(a, a=>!a._trust_in_room_);
                            q(b).call(b, a=>{
                                var b;
                                k.debug(l(b = "[".concat(this._clientId, "] user offline timeout, emit user offline ")).call(b, a.uid));
                                this._handleUserOffline({
                                    uid: a.uid
                                })
                            }
                            )
                        }
                    }
                    , 3E3);
                    this._streamRemovedTimeout = window.setTimeout(()=>{
                        var a;
                        "CONNECTED" === this.connectionState && (this._streamRemovedTimeout = void 0,
                        q(a = this._users).call(a, a=>{
                            var b, c, e, g, h;
                            a._trust_audio_mute_state_ || (k.debug(l(b = "[".concat(this._clientId, "] auto dispatch audio unmute event ")).call(b, a.uid)),
                            this._handleMuteStream(a.uid, "audio", !1));
                            a._trust_video_mute_state_ || (k.debug(l(c = "[".concat(this._clientId, "] auto dispatch video unmute event ")).call(c, a.uid)),
                            this._handleMuteStream(a.uid, "video", !1));
                            a._trust_audio_enabled_state_ || (k.debug(l(e = "[".concat(this._clientId, "] auto dispatch enable local audio ")).call(e, a.uid)),
                            this._handleSetStreamLocalEnable("audio", a.uid, !0));
                            !a._trust_video_enabled_state_ && a._video_enabled_ && (k.debug(l(g = "[".concat(this._clientId, "] auto dispatch enable local video ")).call(g, a.uid)),
                            this._handleSetStreamLocalEnable("video", a.uid, !0));
                            a._trust_stream_added_state_ || (k.debug(l(h = "[".concat(this._clientId, "] auto dispatch stream remove ")).call(h, a.uid)),
                            this._handleRemoveStream({
                                uid: a.uid,
                                uint_id: a._uintid
                            }))
                        }
                        ))
                    }
                    , 1E3)
                }
                h()
            }
            );
            this._gateway.on(xa.REQUEST_NEW_GATEWAY_LIST, (a,b)=>{
                if (!this._joinInfo)
                    return b(new p(n.UNEXPECTED_ERROR,"can not recover, no join info"));
                Bh(this._joinInfo, this._axiosCancelSource.token, this._config.httpRetryConfig || Qa).then(b=>{
                    var c;
                    this._joinInfo && (this._joinInfo.apResponse = b.gatewayInfo.res);
                    a(z(c = b.gatewayInfo.gatewayAddrs).call(c, a=>{
                        if (this._joinInfo && this._joinInfo.proxyServer) {
                            var b, c;
                            a = a.split(":");
                            return l(b = l(c = "wss://".concat(this._joinInfo.proxyServer, "/ws/?h=")).call(c, a[0], "&p=")).call(b, a[1])
                        }
                        return "wss://".concat(a)
                    }
                    ))
                }
                ).catch(b)
            }
            );
            this._gateway.on(xa.NETWORK_QUALITY, a=>{
                "normal" === this._networkQualitySensitivity && this.emit(P.NETWORK_QUALITY, a)
            }
            );
            this._gateway.on(xa.STREAM_TYPE_CHANGE, (a,b)=>{
                this.emit(P.STREAM_TYPE_CHANGED, a, b);
                u.reportApiInvoke(this._sessionId, {
                    name: D.STREAM_TYPE_CHANGE,
                    options: [a, b],
                    tag: C.TRACER
                }).onSuccess(w({
                    uid: a,
                    streamType: b
                }))
            }
            );
            this._gateway.on(xa.IS_P2P_DISCONNECTED, a=>{
                var b, c, e;
                let g = [];
                return this._highStream && g.push(this._highStream),
                q(b = this._remoteStream).call(b, a=>g.push(a)),
                0 === g.length || 0 === M(g).call(g, a=>"connected" === a.connectionState).length ? a(!0) : (k.debug(l(c = "[".concat(this._clientId, "] ")).call(c, z(e = M(g).call(g, a=>"connected" === a.connectionState)).call(e, a=>a.connectionId), " is connected")),
                void a(!1))
            }
            );
            this._gateway.on(xa.NEED_RENEW_SESSION, ()=>{
                this._startSession()
            }
            );
            this._gateway.signal.on(U.ON_USER_ONLINE, this._handleUserOnline);
            this._gateway.signal.on(U.ON_USER_OFFLINE, this._handleUserOffline);
            this._gateway.signal.on(U.ON_ADD_AUDIO_STREAM, a=>this._handleAddAudioOrVideoStream("audio", a.uid, a.uint_id));
            this._gateway.signal.on(U.ON_ADD_VIDEO_STREAM, a=>this._handleAddAudioOrVideoStream("video", a.uid, a.uint_id));
            this._gateway.signal.on(U.ON_REMOVE_STREAM, this._handleRemoveStream);
            this._gateway.signal.on(U.ON_P2P_LOST, this._handleP2PLost);
            this._gateway.signal.on(U.MUTE_AUDIO, a=>this._handleMuteStream(a.uid, "audio", !0));
            this._gateway.signal.on(U.UNMUTE_AUDIO, a=>this._handleMuteStream(a.uid, "audio", !1));
            this._gateway.signal.on(U.MUTE_VIDEO, a=>this._handleMuteStream(a.uid, "video", !0));
            this._gateway.signal.on(U.UNMUTE_VIDEO, a=>this._handleMuteStream(a.uid, "video", !1));
            this._gateway.signal.on(U.RECEIVE_METADATA, a=>{
                let b = mh(a.metadata);
                this.emit(P.RECEIVE_METADATA, a.uid, b)
            }
            );
            this._gateway.signal.on(U.ON_DATA_STREAM, a=>{
                a.seq && delete a.seq;
                a.payload = mh(a.payload);
                this.emit(P.STREAM_MESSAGE, a.uid, a.payload);
                this.onStreamMessage && this.onStreamMessage(a)
            }
            );
            this._gateway.signal.on(U.ON_CRYPT_ERROR, ()=>{
                Oc(()=>{
                    k.warning("[".concat(this._clientId, "] on crypt error"));
                    this.emit(P.CRYPT_ERROR)
                }
                , this._sessionId)
            }
            );
            this._gateway.signal.on(U.ON_TOKEN_PRIVILEGE_WILL_EXPIRE, this._handleTokenWillExpire);
            this._gateway.signal.on(U.ON_TOKEN_PRIVILEGE_DID_EXPIRE, ()=>{
                k.warning("[".concat(this._clientId, "] received message onTokenPrivilegeDidExpire, please get new token and join again"));
                this._reset();
                this._gateway.leave(!0);
                this.emit(P.ON_TOKEN_PRIVILEGE_DID_EXPIRE)
            }
            );
            this._gateway.signal.on(U.ON_STREAM_FALLBACK_UPDATE, a=>{
                var b, c;
                k.debug(l(b = l(c = "[".concat(this._clientId, "] stream fallback peerId: ")).call(c, a.stream_id, ", attr: ")).call(b, a.stream_type));
                this.emit(P.STREAM_FALLBACK, a.stream_id, 1 === a.stream_type ? "fallback" : "recover")
            }
            );
            this._gateway.signal.on(U.ON_PUBLISH_STREAM, a=>{
                var b;
                this.uid === this._uid && (this._highStream && this._highStream._waitingSuccessResponse && "connected" === this._highStream.connectionState ? (this._highStream.reportPublishEvent(!0, null, w({
                    proxy: a.proxy
                })),
                k.info(l(b = "[".concat(this._clientId, "] on publish stream, ")).call(b, w(a))),
                void 0 !== a.proxy && this.emit(P.IS_USING_CLOUD_PROXY, !!a.proxy)) : this._lowStream ? this._lowStream.reportPublishEvent(!0, null, w({
                    proxy: a.proxy
                })) : k.warning("get on_publish_stream message but cannot handle"))
            }
            );
            this._gateway.signal.on(U.ENABLE_LOCAL_VIDEO, a=>{
                this._handleSetStreamLocalEnable("video", a.uid, !0)
            }
            );
            this._gateway.signal.on(U.DISABLE_LOCAL_VIDEO, a=>{
                this._handleSetStreamLocalEnable("video", a.uid, !1)
            }
            );
            this._gateway.signal.on(Q.REQUEST_TIMEOUT, (a,b)=>{
                if (this._joinInfo)
                    switch (a) {
                    case da.PUBLISH:
                        var c;
                        if (!b)
                            break;
                        a = "high" === b.stream_type ? this._highStream : this._lowStream;
                        if (!a)
                            break;
                        "offer" === b.state && u.publish(this._joinInfo.sid, {
                            lts: a.startTime,
                            succ: !1,
                            ec: n.TIMEOUT,
                            audio: b.audio,
                            video: b.video,
                            p2pid: b.p2p_id,
                            publishRequestid: a.ID,
                            screenshare: !(!a.videoTrack || -1 === I(c = a.videoTrack._hints).call(c, rb.SCREEN_TRACK)),
                            audioName: a.audioTrack && a.audioTrack.getTrackLabel(),
                            videoName: a.videoTrack && a.videoTrack.getTrackLabel()
                        });
                        break;
                    case da.SUBSCRIBE:
                        (c = this._remoteStream.get(b.stream_id)) && b && u.subscribe(this._joinInfo.sid, {
                            lts: c.startTime,
                            succ: !1,
                            ec: n.TIMEOUT,
                            audio: !!b.audio,
                            video: !!b.video,
                            peerid: b.stream_id,
                            subscribeRequestid: c.ID,
                            p2pid: c.pc.ID
                        })
                    }
            }
            )
        }
    }
    cg([Fe(), Ob("design:type", Function), Ob("design:paramtypes", [Object]), Ob("design:returntype", void 0)], oe.prototype, "setTurnServer", null);
    cg([Fe({
        report: u
    }), Ob("design:type", Function), Ob("design:paramtypes", [String, String, Uint8Array]), Ob("design:returntype", void 0)], oe.prototype, "setEncryptionConfig", null);
    cg([function(a={
        report: u
    }) {
        return function(b, c, e) {
            let g = b[c];
            if ("function" == typeof g) {
                let h = "AgoraRTCClient" === b.constructor.name ? "Client" : b.constructor.name;
                e.value = async function(...b) {
                    var e;
                    let k = a.report.reportApiInvoke(this._sessionId || null, {
                        name: l(e = "".concat(h, ".")).call(e, c),
                        options: b,
                        tag: C.TRACER
                    });
                    try {
                        let a = await g.apply(this, b);
                        return k.onSuccess(),
                        a
                    } catch (y) {
                        throw k.onError(y),
                        y;
                    }
                }
            }
            return e
        }
    }({
        report: u
    }), Ob("design:type", Function), Ob("design:paramtypes", [Object, Object]), Ob("design:returntype", B)], oe.prototype, "pickSVCLayer", null);
    class Lo extends yk {
        constructor(a, b={}) {
            super();
            this.currentLoopCount = this.pausePlayTime = this.startPlayOffset = this.startPlayTime = 0;
            this._currentState = "stopped";
            this.audioBuffer = a;
            this.options = b;
            this.startPlayOffset = this.options.startPlayTime || 0
        }
        set currentState(a) {
            a !== this._currentState && (this._currentState = a,
            this.emit(hb.AUDIO_SOURCE_STATE_CHANGE, this._currentState))
        }
        get currentState() {
            return this._currentState
        }
        createWebAudioDiagram() {
            return this.context.createGain()
        }
        get duration() {
            return this.audioBuffer.duration
        }
        get currentTime() {
            return "stopped" === this.currentState ? 0 : "paused" === this.currentState ? this.pausePlayTime : (this.context.currentTime - this.startPlayTime + this.startPlayOffset) % this.audioBuffer.duration
        }
        updateOptions(a) {
            "stopped" === this.currentState ? (this.options = a,
            this.startPlayOffset = this.options.startPlayTime || 0) : k.warning("can not set audio source options")
        }
        startProcessAudioBuffer() {
            this.sourceNode && this.stopProcessAudioBuffer();
            this.sourceNode = this.createSourceNode();
            this.startSourceNode();
            this.currentState = "playing"
        }
        pauseProcessAudioBuffer() {
            this.sourceNode && "playing" === this.currentState && (this.pausePlayTime = this.currentTime,
            this.sourceNode.onended = null,
            this.sourceNode.stop(),
            this.sourceNode.buffer = null,
            this.sourceNode = this.createSourceNode(),
            this.currentState = "paused")
        }
        seekAudioBuffer(a) {
            this.sourceNode && (this.sourceNode.onended = null,
            "playing" === this.currentState && this.sourceNode.stop(),
            this.sourceNode = this.createSourceNode(),
            "playing" === this.currentState ? (this.startPlayOffset = a,
            this.startSourceNode()) : "paused" === this.currentState && (this.pausePlayTime = a))
        }
        resumeProcessAudioBuffer() {
            "paused" === this.currentState && this.sourceNode && (this.startPlayOffset = this.pausePlayTime,
            this.pausePlayTime = 0,
            this.startSourceNode(),
            this.currentState = "playing")
        }
        stopProcessAudioBuffer() {
            if (this.sourceNode) {
                this.sourceNode.onended = null;
                try {
                    this.sourceNode.stop()
                } catch (a) {}
                this.reset()
            }
        }
        startSourceNode() {
            var a;
            this.sourceNode && this.sourceNode.buffer && (this.sourceNode.start(0, this.startPlayOffset),
            this.startPlayTime = this.context.currentTime,
            this.sourceNode.onended = ra(a = this.handleSourceNodeEnded).call(a, this))
        }
        createSourceNode() {
            let a = this.context.createBufferSource();
            return a.buffer = this.audioBuffer,
            a.loop = !!this.options.loop,
            a.connect(this.outputNode),
            a
        }
        handleSourceNodeEnded() {
            if (this.currentLoopCount += 1,
            this.options.cycle && this.options.cycle > this.currentLoopCount)
                return this.startPlayOffset = 0,
                this.sourceNode = void 0,
                void this.startProcessAudioBuffer();
            this.reset()
        }
        reset() {
            this.startPlayOffset = this.options.startPlayTime || 0;
            this.currentState = "stopped";
            this.sourceNode && (this.sourceNode.disconnect(),
            this.sourceNode = void 0);
            this.currentLoopCount = 0
        }
    }
    let Wh = new aa;
    var Mo = ha.setInterval;
    let Uk = ma().name;
    class od {
        constructor(a, b) {
            this.id = 0;
            od.count += 1;
            this.id = od.count;
            this.element = a;
            this.context = b
        }
        initPeers() {
            this.peerPair = [new RTCPeerConnection, new RTCPeerConnection];
            this.peerPair[1].ontrack = a=>{
                let b = document.createElement("audio");
                b.srcObject = new MediaStream([a.track]);
                b.play();
                this.audioPlayerElement = b
            }
        }
        async switchSdp() {
            if (this.peerPair) {
                var a = async(a,b)=>{
                    b = "offer" === b ? await a.createOffer() : await a.createAnswer();
                    return await a.setLocalDescription(b),
                    "complete" === a.iceGatheringState ? a.localDescription : new B(b=>{
                        a.onicegatheringstatechange = ()=>{
                            "complete" === a.iceGatheringState && b(a.localDescription)
                        }
                    }
                    )
                }
                  , b = async(a,b)=>await a.setRemoteDescription(b);
                try {
                    let c = await a(this.peerPair[0], "offer");
                    await b(this.peerPair[1], c);
                    let e = await a(this.peerPair[1], "answer");
                    await b(this.peerPair[0], e)
                } catch (c) {
                    throw (new p(n.LOCAL_AEC_ERROR,c.toString())).print();
                }
            }
        }
        async getTracksFromMediaElement(a) {
            if (this.audioTrack)
                return this.audioTrack;
            let b;
            try {
                a instanceof HTMLVideoElement && (a.captureStream ? a.captureStream() : a.mozCaptureStream()),
                b = this.context.createMediaStreamDestination(),
                this.context.createMediaElementSource(a).connect(b)
            } catch (c) {
                throw (new p(n.LOCAL_AEC_ERROR,c.toString())).print();
            }
            if (!b)
                throw (new p(n.LOCAL_AEC_ERROR,"no dest node when local aec")).print();
            a = b.stream.getAudioTracks()[0];
            return this.audioTrack = a,
            a
        }
        getElement() {
            return this.element
        }
        async startEchoCancellation() {
            this.context.resume();
            this.peerPair && this.close();
            this.initPeers();
            let a = await this.getTracksFromMediaElement(this.element);
            this.peerPair && this.peerPair[0].addTrack(a);
            await this.switchSdp()
        }
        close() {
            var a;
            k.debug("close echo cancellation unit, id is", this.id);
            this.audioPlayerElement && this.audioPlayerElement.pause();
            this.peerPair && q(a = this.peerPair).call(a, a=>{
                a.close()
            }
            );
            this.audioPlayerElement = this.peerPair = void 0
        }
    }
    od.count = 0;
    var dg = function(a, b) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(a, b)
    };
    let No = window.AudioContext || window.webkitAudioContext;
    class Vk {
        constructor() {
            this.units = [];
            this._doesEnvironmentNeedAEC() && (this.context = new No)
        }
        processExternalMediaAEC(a) {
            var b;
            if (!this.context || !this._doesEnvironmentNeedAEC())
                return k.debug("the system does not need to process local aec"),
                -1;
            let c = R(b = this.units).call(b, b=>b && b.getElement() === a);
            return c || (c = new od(a,this.context),
            this.units.push(c)),
            c.startEchoCancellation(),
            k.debug("start processing local audio echo cancellation, id is", c.id),
            c.id
        }
        _doesEnvironmentNeedAEC() {
            return ma().name !== ba.SAFARI
        }
    }
    (function(a, b, c, e) {
        var g, h = arguments.length, k = 3 > h ? b : null === e ? e = Y(b, c) : e;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            k = Reflect.decorate(a, b, c, e);
        else
            for (var l = a.length - 1; 0 <= l; l--)
                (g = a[l]) && (k = (3 > h ? g(k) : 3 < h ? g(b, c, k) : g(b, c)) || k);
        return 3 < h && k && X(b, c, k),
        k
    }
    )([Fe({
        report: u
    }), dg("design:type", Function), dg("design:paramtypes", [HTMLAudioElement]), dg("design:returntype", Number)], Vk.prototype, "processExternalMediaAEC", null);
    let Oo = new Vk;
    var Wk, Xk, Yk, Zk;
    kc("PROCESS_ID", l(Wk = l(Xk = l(Yk = l(Zk = "process-".concat(qa(8, ""), "-")).call(Zk, qa(4, ""), "-")).call(Yk, qa(4, ""), "-")).call(Xk, qa(4, ""), "-")).call(Wk, qa(12, "")));
    (function() {
        let a = ma();
        var b = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia ? !0 : !1;
        ca.getDisplayMedia = b;
        ca.getStreamFromExtension = a.name === ba.CHROME && 34 < Number(a.version);
        ca.supportUnifiedPlan = function() {
            if (!(window.RTCRtpTransceiver && "currentDirection"in RTCRtpTransceiver.prototype))
                return !1;
            let a = new RTCPeerConnection
              , b = !1;
            try {
                a.addTransceiver("audio"),
                b = !0
            } catch (g) {}
            return a.close(),
            b
        }();
        ca.supportMinBitrate = a.name === ba.CHROME || a.name === ba.EDGE;
        ca.supportSetRtpSenderParameters = function() {
            let a = ma();
            return window.RTCRtpSender && window.RTCRtpSender.prototype.setParameters && window.RTCRtpSender.prototype.getParameters ? !!Bd() || a.name === ba.SAFARI || a.name === ba.FIREFOX && 64 <= Number(a.version) : !1
        }();
        a.name !== ba.SAFARI && ma().name !== ba.WECHAT || (ca.supportDualStream = !1);
        ca.webAudioMediaStreamDest = function() {
            let a = ma();
            return a.name === ba.SAFARI && 12 > Number(a.version) ? !1 : !0
        }();
        ca.supportReplaceTrack = window.RTCRtpSender ? "function" == typeof RTCRtpSender.prototype.replaceTrack ? !0 : !1 : !1;
        ca.supportWebGL = "undefined" != typeof WebGLRenderingContext;
        ca.supportRequestFrame = !!window.CanvasCaptureMediaStreamTrack;
        Bd() || (ca.webAudioWithAEC = !0);
        ca.supportShareAudio = function() {
            let a = ma();
            return (a.os === W.WIN_10 || a.os === W.WIN_81 || a.os === W.WIN_7 || a.os === W.LINUX || a.os === W.MAC_OS || a.os === W.MAC_OS_X) && a.name === ba.CHROME && 74 <= Number(a.version) ? !0 : !1
        }();
        ca.supportDualStreamEncoding = function() {
            let a = ma();
            return a.name === ba.CHROME && 87 === Number(a.version)
        }();
        k.info("browser compatibility", w(ca), w(a))
    }
    )();
    let tb = {
        VERSION: Ta,
        BUILD: "v4.4.0-58-g0247fcd0(2021/4/27 \u4e0b\u53483:11:33)",
        setParameter: kc,
        getParameter: function(a) {
            return v[a]
        },
        getSupportedCodec: async function(a) {
            let b = null;
            a ? (b = new Hk({}),
            b.addStream(a)) : b = new Ik({});
            a = Kh(await b.createOfferSDP());
            return b.close(),
            a
        },
        checkSystemRequirements: function() {
            const a = u.reportApiInvoke(null, {
                name: D.CHECK_SYSTEM_REQUIREMENTS,
                options: [],
                tag: C.TRACER
            });
            var b = !1;
            try {
                var c = navigator.mediaDevices && navigator.mediaDevices.getUserMedia
                  , e = window.WebSocket;
                b = !!(window.RTCPeerConnection && c && e)
            } catch (g) {
                return k.error("check system requirement failed: ", g),
                !1
            }
            c = !1;
            e = ma();
            e.name === ba.CHROME && 58 <= Number(e.version) && e.os !== W.IOS && (c = !0);
            e.name === ba.FIREFOX && 56 <= Number(e.version) && (c = !0);
            e.name === ba.OPERA && 45 <= Number(e.version) && (c = !0);
            e.name === ba.SAFARI && 11 <= Number(e.version) && (c = !0);
            ma().name !== ba.WECHAT && ma().name !== ba.QQ || e.os === W.IOS || (c = !0);
            k.debug("checkSystemRequirements, api:", b, "browser", c);
            b = b && c;
            return a.onSuccess(b),
            b
        },
        getDevices: function(a) {
            return cb.enumerateDevices(!0, !0, a)
        },
        getMicrophones: function(a) {
            return cb.getRecordingDevices(a)
        },
        getCameras: function(a) {
            return cb.getCamerasDevices(a)
        },
        getElectronScreenSources: oh,
        getPlaybackDevices: function(a) {
            return cb.getSpeakers(a)
        },
        createClient: function(a={
            codec: "vp8",
            mode: "rtc"
        }) {
            const b = u.reportApiInvoke(null, {
                name: D.CREATE_CLIENT,
                options: [a],
                tag: C.TRACER
            });
            try {
                Ka(a.codec, "config.codec", ["vp8", "vp9", "av1", "h264"]),
                Ka(a.mode, "config.mode", ["rtc", "live"]),
                void 0 !== a.proxyServer && Ga(a.proxyServer, "config.proxyServer", 1, 1E4),
                void 0 !== a.turnServer && ah(a.turnServer),
                void 0 !== a.httpRetryConfig && Zg(a.httpRetryConfig),
                void 0 !== a.websocketRetryConfig && Zg(a.websocketRetryConfig),
                !0
            } catch (c) {
                throw b.onError(c),
                c;
            }
            return b.onSuccess(),
            new oe(sc({
                forceWaitGatewayResponse: !0
            }, a, {
                role: "rtc" === a.mode ? "host" : a.role
            }))
        },
        createCameraVideoTrack: async function(a={
            encoderConfig: "480p_1"
        }) {
            const b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.CREATE_CAM_VIDEO_TRACK,
                options: [Ve({}, a)]
            })
              , c = Qe(a);
            var e = qa(8, "track-");
            let g = null;
            k.info("start create camera video track with config", w(a), "trackId", e);
            try {
                g = (await xb({
                    video: c
                }, e)).getVideoTracks()[0] || null
            } catch (h) {
                throw b.onError(h),
                h;
            }
            if (!g)
                return e = new p(n.UNEXPECTED_ERROR,"can not find track in media stream"),
                b.onError(e),
                e.throw();
            a.optimizationMode && We(e, g, a, a.encoderConfig && jc(a.encoderConfig));
            a = new Pk(g,a,c,a.scalabiltyMode ? ud(a.scalabiltyMode) : {
                numSpatialLayers: 1,
                numTemporalLayers: 1
            },a.optimizationMode,e);
            return b.onSuccess(a.getTrackId()),
            k.info("create camera video success, trackId:", e),
            a
        },
        createCustomVideoTrack: function(a) {
            const b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.CREATE_CUSTOM_VIDEO_TRACK,
                options: [a]
            })
              , c = new Ma(a.mediaStreamTrack,{
                bitrateMax: a.bitrateMax,
                bitrateMin: a.bitrateMin
            },a.scalabiltyMode ? ud(a.scalabiltyMode) : {
                numSpatialLayers: 1,
                numTemporalLayers: 1
            },a.optimizationMode);
            return b.onSuccess(c.getTrackId()),
            k.info("create custom video track success with config", a, "trackId", c.getTrackId()),
            c
        },
        createScreenVideoTrack: async function(a={}, b="disable") {
            const c = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.CREATE_SCREEN_VIDEO_TRACK,
                options: [Ve({}, a), b]
            });
            a.encoderConfig ? "string" == typeof a.encoderConfig || a.encoderConfig.width && a.encoderConfig.height || (a.encoderConfig.width = {
                max: 1920
            },
            a.encoderConfig.height = {
                max: 1080
            }) : a.encoderConfig = "1080p_2";
            var e = {};
            a.screenSourceType && (e.mediaSource = a.screenSourceType);
            a.extensionId && Lc() && (e.extensionId = a.extensionId);
            a.electronScreenSourceId && (e.sourceId = a.electronScreenSourceId);
            var g = a.encoderConfig ? ve(a.encoderConfig) : null;
            g = (e.mandatory = {
                chromeMediaSource: "desktop",
                maxWidth: g ? g.width : void 0,
                maxHeight: g ? g.height : void 0
            },
            g && g.frameRate && ("number" == typeof g.frameRate ? (e.mandatory.maxFrameRate = g.frameRate,
            e.mandatory.minFrameRate = g.frameRate) : (e.mandatory.maxFrameRate = g.frameRate.max || g.frameRate.ideal || g.frameRate.exact || void 0,
            e.mandatory.minFrameRate = g.frameRate.min || g.frameRate.ideal || g.frameRate.exact || void 0),
            e.frameRate = g.frameRate),
            g && g.width && (e.width = g.width),
            g && g.height && (e.height = g.height),
            e);
            const h = qa(8, "track-");
            let l = null;
            e = null;
            const r = ca;
            if (!r.supportShareAudio && "enable" === b)
                return a = new p(n.NOT_SUPPORTED,"your browser or platform is not support share-screen with audio"),
                c.onError(a),
                a.throw();
            k.info("start create screen video track with config", a, "withAudio", b, "trackId", h);
            try {
                const a = await xb({
                    screen: g,
                    screenAudio: "auto" === b ? r.supportShareAudio : "enable" === b
                }, h);
                l = a.getVideoTracks()[0] || null;
                e = a.getAudioTracks()[0] || null
            } catch (t) {
                throw c.onError(t),
                t;
            }
            if (!l)
                return a = new p(n.UNEXPECTED_ERROR,"can not find track in media stream"),
                c.onError(a),
                a.throw();
            if (!e && "enable" === b)
                return l && l.stop(),
                a = new p(n.SHARE_AUDIO_NOT_ALLOWED),
                c.onError(a),
                a.throw();
            a.optimizationMode || (a.optimizationMode = "detail");
            a.optimizationMode && (We(h, l, a, a.encoderConfig && ve(a.encoderConfig)),
            a.encoderConfig && "string" != typeof a.encoderConfig && (a.encoderConfig.bitrateMin = a.encoderConfig.bitrateMax));
            a = new Ma(l,a.encoderConfig ? ve(a.encoderConfig) : {},a.scalabiltyMode ? ud(a.scalabiltyMode) : {
                numSpatialLayers: 1,
                numTemporalLayers: 1
            },a.optimizationMode,h);
            if (a._hints.push(rb.SCREEN_TRACK),
            !e)
                return c.onSuccess(a.getTrackId()),
                k.info("create screen video track success", "video:", a.getTrackId()),
                a;
            b = new Ya(e);
            return c.onSuccess([a.getTrackId(), b.getTrackId()]),
            k.info("create screen video track success", "video:", a.getTrackId(), "audio:", b.getTrackId()),
            [a, b]
        },
        createMicrophoneAndCameraTracks: async function(a={}, b={
            encoderConfig: "480p_1"
        }) {
            var c, e, g;
            const h = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.CREATE_MIC_AND_CAM_TRACKS,
                options: [a, b]
            })
              , m = Qe(b)
              , r = Ih(a)
              , q = qa(8, "track-")
              , v = qa(8, "track-");
            let x = null
              , z = null;
            k.info(l(c = l(e = l(g = "start create camera video track(".concat(v, ") and microphone audio track(")).call(g, q, ") with config, audio: ")).call(e, w(a), ", video: ")).call(c, w(b)));
            try {
                var B;
                const a = await xb({
                    audio: r,
                    video: m
                }, l(B = "".concat(q, "-")).call(B, v));
                x = a.getAudioTracks()[0];
                z = a.getVideoTracks()[0]
            } catch (ja) {
                throw h.onError(ja),
                ja;
            }
            if (!x || !z) {
                var A = new p(n.UNEXPECTED_ERROR,"can not find tracks in media stream");
                return h.onError(A),
                A.throw()
            }
            b.optimizationMode && We(v, z, b, b.encoderConfig && jc(b.encoderConfig));
            a = new Yf(x,a,r,q);
            b = new Pk(z,b,m,b.scalabiltyMode ? ud(b.scalabiltyMode) : {
                numSpatialLayers: 1,
                numTemporalLayers: 1
            },b.optimizationMode,v);
            return h.onSuccess([a.getTrackId(), b.getTrackId()]),
            k.info(l(A = "create camera video track(".concat(v, ") and microphone audio track(")).call(A, q, ") success")),
            [a, b]
        },
        createMicrophoneAudioTrack: async function(a={}) {
            const b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.CREATE_MIC_AUDIO_TRACK,
                options: [a]
            })
              , c = Ih(a);
            var e = qa(8, "track-");
            let g = null;
            k.info("start create microphone audio track with config", w(a), "trackId", e);
            try {
                g = (await xb({
                    audio: c
                }, e)).getAudioTracks()[0] || null
            } catch (h) {
                throw b.onError(h),
                h;
            }
            if (!g)
                return e = new p(n.UNEXPECTED_ERROR,"can not find track in media stream"),
                b.onError(e),
                e.throw();
            a = new Yf(g,a,c,e);
            return b.onSuccess(a.getTrackId()),
            k.info("create microphone audio track success, trackId:", e),
            a
        },
        createCustomAudioTrack: function(a) {
            const b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.CREATE_CUSTOM_AUDIO_TRACK,
                options: [a]
            })
              , c = new Ya(a.mediaStreamTrack,a.encoderConfig ? vd(a.encoderConfig) : {});
            return k.info("create custom audio track success with config", a, "trackId", c.getTrackId()),
            b.onSuccess(c.getTrackId()),
            c
        },
        createBufferSourceAudioTrack: async function(a) {
            const b = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.CREATE_BUFFER_AUDIO_TRACK,
                options: [a]
            })
              , c = qa(8, "track-");
            k.info("start create buffer source audio track with config", w(a), "trackId", c);
            const e = a.source;
            if (!(a.source instanceof AudioBuffer))
                try {
                    a.source = await xl(a.source, a.cacheOnlineFile)
                } catch (h) {
                    return b.onError(h),
                    h.throw()
                }
            const g = new Lo(a.source);
            a = new jo(e,g,a.encoderConfig ? vd(a.encoderConfig) : {},c);
            return k.info("create buffer source audio track success, trackId:", c),
            b.onSuccess(a.getTrackId()),
            a
        },
        setLogLevel: function(a) {
            k.setLogLevel(a)
        },
        enableLogUpload: function() {
            k.enableLogUpload()
        },
        disableLogUpload: function() {
            k.disableLogUpload()
        },
        createChannelMediaRelayConfiguration: function() {
            return new Uh
        },
        checkAudioTrackIsActive: async function(a, b=5E3) {
            const c = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.CHECK_AUDIO_TRACK_IS_ACTIVE,
                options: [b]
            });
            if (!(a instanceof Ya || a instanceof nd)) {
                var e = new p(n.INVALID_TRACK,"the parameter is not a audio track");
                return c.onError(e),
                e.throw()
            }
            b && 1E3 > b && (b = 1E3);
            const g = a instanceof Ya ? a.getTrackLabel() : "remote_track";
            let h = e = a.getVolumeLevel()
              , m = e;
            const r = x();
            return new B(e=>{
                const n = Mo(()=>{
                    var p = a.getVolumeLevel();
                    h = p > h ? p : h;
                    m = p < m ? p : m;
                    p = 1E-4 < h - m;
                    var q = x() - r;
                    if (p || q > b) {
                        var t;
                        clearInterval(n);
                        q = {
                            duration: q,
                            deviceLabel: g,
                            maxVolumeLevel: h,
                            result: p
                        };
                        k.info(l(t = "[track-".concat(a.getTrackId(), "] check audio track active completed. ")).call(t, w(q)));
                        c.onSuccess(q);
                        e(p)
                    }
                }
                , 200)
            }
            )
        },
        checkVideoTrackIsActive: async function(a, b=5E3) {
            var c;
            const e = u.reportApiInvoke(null, {
                tag: C.TRACER,
                name: D.CHECK_VIDEO_TRACK_IS_ACTIVE,
                options: [b]
            });
            if (!(a instanceof Ma || a instanceof md))
                return a = new p(n.INVALID_TRACK,"the parameter is not a video track"),
                e.onError(a),
                a.throw();
            b && 1E3 > b && (b = 1E3);
            var g = a instanceof Ma ? a.getTrackLabel() : "remote_track"
              , h = a.getMediaStreamTrack();
            const m = document.createElement("video");
            m.style.width = "1px";
            m.style.height = "1px";
            m.setAttribute("muted", "");
            m.muted = !0;
            m.setAttribute("playsinline", "");
            m.controls = !1;
            Uk === ba.SAFARI && (m.style.opacity = "0.01",
            m.style.position = "fixed",
            m.style.left = "0",
            m.style.top = "0",
            document.body.appendChild(m));
            m.srcObject = new MediaStream([h]);
            m.play();
            const q = document.createElement("canvas");
            q.width = 160;
            q.height = 120;
            let t = h = 0;
            try {
                const a = x();
                h = await function(a, b, c, e) {
                    let g, h = 0, l = null;
                    return new B((m,q)=>{
                        gc(()=>{
                            g && (g(),
                            m(h))
                        }
                        , b);
                        g = He(()=>{
                            a: {
                                h > e && g && (g(),
                                m(h));
                                var b = c.getContext("2d");
                                if (b) {
                                    b.drawImage(a, 0, 0, 160, 120);
                                    b = b.getImageData(0, 0, c.width, c.height);
                                    var r = Math.floor(b.data.length / 3);
                                    if (l)
                                        for (let a = 0; a < r; a += 3)
                                            if (b.data[a] !== l[a]) {
                                                h += 1;
                                                l = b.data;
                                                break a
                                            }
                                    l = b.data
                                } else
                                    b = new p(n.UNEXPECTED_ERROR,"can not get canvas 2d context."),
                                    k.error(b.toString()),
                                    q(b)
                            }
                        }
                        , 30)
                    }
                    )
                }(m, b, q, 4);
                t = x() - a
            } catch (y) {
                throw e.onError(y),
                y;
            }
            Uk === ba.SAFARI && (m.pause(),
            m.remove());
            m.srcObject = null;
            b = 4 < h;
            g = {
                duration: t,
                changedPicNum: h,
                deviceLabel: g,
                result: b
            };
            return k.info(l(c = "[track-".concat(a.getTrackId(), "] check video track active completed. ")).call(c, w(g))),
            e.onSuccess(g),
            b
        },
        setArea: function(a) {
            var b;
            "string" == typeof a && (a = [a]);
            q(a).call(a, a=>{
                if (!oa(ck).call(ck, a))
                    throw new p(n.INVALID_PARAMS,"invalid area code");
            }
            );
            kc("AREAS", a);
            const c = (a=>{
                const b = {
                    CODE: "",
                    WEBCS_DOMAIN: [],
                    WEBCS_DOMAIN_BACKUP_LIST: [],
                    PROXY_CS: [],
                    CDS_AP: [],
                    ACCOUNT_REGISTER: [],
                    UAP_AP: [],
                    EVENT_REPORT_DOMAIN: [],
                    EVENT_REPORT_BACKUP_DOMAIN: [],
                    LOG_UPLOAD_SERVER: [],
                    PROXY_SERVER_TYPE3: []
                };
                return z(a).call(a, a=>{
                    const c = dk[a];
                    (a = Z(c)) && z(a).call(a, a=>{
                        var e;
                        "CODE" !== a && (b[a] = l(e = b[a]).call(e, c[a]))
                    }
                    )
                }
                ),
                b
            }
            )(a);
            z(b = Z(c)).call(b, a=>{
                kc(a, "LOG_UPLOAD_SERVER" === a || "EVENT_REPORT_DOMAIN" === a || "EVENT_REPORT_BACKUP_DOMAIN" === a || "PROXY_SERVER_TYPE3" === a ? c[a][0] : c[a])
            }
            );
            k.debug("set area success:", a.join(","))
        },
        processExternalMediaAEC: function(a) {
            Oo.processExternalMediaAEC(a)
        }
    };
    return cb.on(Kb.CAMERA_DEVICE_CHANGED, a=>{
        k.info("camera device changed", w(a));
        tb.onCameraChanged && tb.onCameraChanged(a)
    }
    ),
    cb.on(Kb.RECORDING_DEVICE_CHANGED, a=>{
        k.info("microphone device changed", w(a));
        tb.onMicrophoneChanged && tb.onMicrophoneChanged(a)
    }
    ),
    cb.on(Kb.PLAYOUT_DEVICE_CHANGED, a=>{
        k.debug("playout device changed", w(a));
        tb.onPlaybackDeviceChanged && tb.onPlaybackDeviceChanged(a)
    }
    ),
    jb.onAutoplayFailed = ()=>{
        k.info("detect audio element autoplay failed");
        tb.onAudioAutoplayFailed && tb.onAudioAutoplayFailed()
    }
    ,
    Pc.on("autoplay-failed", ()=>{
        k.info("detect webaudio autoplay failed");
        tb.onAudioAutoplayFailed && tb.onAudioAutoplayFailed()
    }
    ),
    tb
})
//# sourceMappingURL=AgoraRTC_N-production.js.map

