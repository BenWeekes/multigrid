
import vision from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3'; 
let camera;
let deviceId = null;
let blendshapesNeutral = [0.1456766, 0.14509096, 0.04416631, 0, 0, 0.02075958, 0.05995359, 0.05044997, 0, 0, 0, 0, 0.06333958, 0.06059476, 0, 0, 0.1233948, 0.1233262, 0.2249145, 0.2248967, 0.1552135, 0.1565699, 0.1084167, 0.01461025, 0.1069989, 0, 0.0935045, 0.08081174, 0.06888802, 0, 0, 0.02572375, 0.02300292, 0.1214991, 0.1276631, 0.0682996, 0.06274197, 0.04613221, 0, 0.0765766, 0.077179, 0.1069419, 0.04396585, 0.1304866, 0.06028794, 0.1125906, 0.1049666, 0.0104436, 0.008164653, 0.05508019, 0.04577279, 3.348952e-07, -0.033934776, 0.010706255, 0.0024019803];
let rpm_blendshapes = ["browDownLeft", "browDownRight", "browInnerUp", "browOuterUpLeft", "browOuterUpRight", "cheekPuff", "cheekSquintLeft", "cheekSquintRight", "eyeBlinkLeft", "eyeBlinkRight", "eyeLookDownLeft", "eyeLookDownRight", "eyeLookInLeft", "eyeLookInRight", "eyeLookOutLeft", "eyeLookOutRight", "eyeLookUpLeft", "eyeLookUpRight", "eyeSquintLeft", "eyeSquintRight", "eyeWideLeft", "eyeWideRight", "jawForward", "jawLeft", "jawOpen", "jawRight", "mouthClose", "mouthDimpleLeft", "mouthDimpleRight", "mouthFrownLeft", "mouthFrownRight", "mouthFunnel", "mouthLeft", "mouthLowerDownLeft", "mouthLowerDownRight", "mouthPressLeft", "mouthPressRight", "mouthPucker", "mouthRight", "mouthRollLower", "mouthRollUpper", "mouthShrugLower", "mouthShrugUpper", "mouthSmileLeft", "mouthSmileRight", "mouthStretchLeft", "mouthStretchRight", "mouthUpperUpLeft", "mouthUpperUpRight", "noseSneerLeft", "noseSneerRight", "tongueOut"];
let BS_YAW = 52;
let BS_PITCH = 53;
let BS_ROLL = 54;
var faceLandmarker;
let MorphData = {};

function isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

document.getElementById("mesh").addEventListener('model-loaded', (e, f) => {
        init2();
});

const readBlendshapesFromAvatar = function (meshMorphData, mesh) {
    meshMorphData['bs'] = [];
    mesh.traverse((o) => {
        if (o.type == 'Bone') {
            if (o.name == 'Neck' || o.name == 'Neck01' || o.name == 'Neck1_M') {
                meshMorphData['neck'] = o;
            } else if (o.name == 'Head' || o.name == 'Head_M') {
                meshMorphData['head'] = o;
            } else {
                meshMorphData[o.name] = o;
            }
        }
        if (o.type == 'SkinnedMesh') {
            meshMorphData[o.name] = o;
        }
        if (o.morphTargetInfluences && o.userData.targetNames) {
            meshMorphData['bs'].push(o);
        }
    });
}

function getMeshMorphData(obj) {
    let meshMorphData = MorphData[obj.uuid];
    if (!meshMorphData) {
        meshMorphData = [];
        MorphData[obj.uuid] = meshMorphData
        readBlendshapesFromAvatar(meshMorphData, obj);
    }
    return meshMorphData;
}

const getBone = function (obj, bone) {
    let meshMorphData = getMeshMorphData(obj);
    return meshMorphData[bone];
}

let init2done=false;

async function init2() {
   
    if (init2done) {
        MorphData = {};
        return;
    }
    else {
        init2done=true;
    }
    const { FaceLandmarker, FilesetResolver } = vision;
    const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver,
        {
            baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                delegate: "GPU"
            },
            outputFaceBlendshapes: true,
            outputFacialTransformationMatrixes: true,
            minFacePresenceConfidence:0.9,
            minTrackingConfidence:0.9,
            minFaceDetectionConfidence:0.9,
            runningMode: 'VIDEO',
            numFaces: 1
        }
    );
}
const transform = new THREE.Object3D();
function onResultsFaceLM(results) {
    let blendshapes = [...blendshapesNeutral];
    if (results.faceBlendshapes.length > 0) {
        const faceBlendshapes = results.faceBlendshapes[0].categories;;
        for (let i = 0; i < faceBlendshapes.length - 1; i++) {
            blendshapes[i] = +faceBlendshapes[i + 1].score.toFixed(9); //faceBlendshapes[i + 1].score;
        }
    }

    if (results.facialTransformationMatrixes.length > 0) {
        const facialTransformationMatrixes = results.facialTransformationMatrixes[0].data;
        transform.matrix.fromArray(facialTransformationMatrixes);
        transform.matrix.decompose(transform.position, transform.quaternion, transform.scale);
        blendshapes[BS_PITCH] = transform.rotation.x;
        blendshapes[BS_YAW] = -transform.rotation.y;
        blendshapes[BS_ROLL] = -transform.rotation.z;

    }
    //console.warn('onResultsFaceLM',results);
    handleMocap(blendshapes.join());
}

function headLimit(val) {
    if (val > 0.4) return 0.4;
    if (val < -0.4) return -0.4;
    return val;
}

var bsLimits = { 'mouthUpperUpLeft': 0.4, 'mouthUpperUpRight': 0.4, 'mouthShrugUpper': 1.0, 'mouthPucker': 1.0 };

function blendshapeLimit(bs, val) {
    let limit =0.8;
    let bslimit=bsLimits[bs];
    if (bslimit) {
        limit=bslimit;
    }    
    if (val > limit) return limit;
    if (val < 0) return 0;
    return val;
}


const playMorphTarget = function (obj, blendshape, amount) {
    amount = blendshapeLimit(blendshape, amount);
    //if (blendshape==='mouthPucker')
    let meshMorphData = getMeshMorphData(obj);
    meshMorphData['bs'].map(function (o, i) {
        if (o.morphTargetInfluences && o.userData.targetNames) {
            //            var pos = o.userData.targetNames.findIndex(item => blendshape.toLowerCase() === item.toLowerCase());
            var pos = o.userData.targetNames.findIndex(item => blendshape === item);
            if (pos === -1) return;
            o.morphTargetInfluences[pos] = amount;
        }

    });
}


let neckOffset= -0.45;

function applyMocap(obj, blendshapes_values, mirror) {
    if (!obj) {
        return;
    }

    for (let i = 0; i < rpm_blendshapes.length; i++) {
        playMorphTarget(obj, rpm_blendshapes[i], blendshapes_values[i]);
    }

    let head = getBone(obj, 'head');
    let neck = getBone(obj, 'neck');

    let pitch = headLimit(blendshapes_values[BS_PITCH]);
    let yaw = headLimit(blendshapes_values[BS_YAW]);
    let roll = headLimit(blendshapes_values[BS_ROLL]);

    let head_rotation_x = -0.6 * roll;
    let neck_rotation_x = - 0.4 * roll;
    let head_rotation_y = -0.6 * yaw;
    let neck_rotation_y = -0.4 * yaw;
    let head_rotation_z = neckOffset - 0.6 * pitch;
    let neck_rotation_z = neckOffset - 0.4 * pitch;

    console.warn(Math.abs(head.rotation.x-head_rotation_x),Math.abs( head.rotation.y -head_rotation_y),Math.abs(head.rotation.z - head_rotation_z));
    if (Math.abs(head.rotation.x-head_rotation_x)>0.1)
    {
        head_rotation_x
    }

    let limit=0.03;
    head.rotation.x =blerp(head.rotation.x,head_rotation_x,limit);
    neck.rotation.x =blerp(neck.rotation.x,neck_rotation_x,limit);
    head.rotation.y =blerp(head.rotation.y,head_rotation_y,limit);
    neck.rotation.y =blerp(neck.rotation.y,neck_rotation_y,limit);
    head.rotation.z =blerp(head.rotation.z,head_rotation_z,limit);
    neck.rotation.z =blerp(neck.rotation.z,neck_rotation_z,limit);
}

function blerp(current,proposed,limit) {
    if (Math.abs(current-proposed)>limit)
    {
        if (proposed>current)
            return current+limit;
        else
            return current-limit;
    }  
    else {
        return proposed;
    }



}
function handleMocap(bs_csv) {
    let blendshapes_values = bs_csv.split(',');
    let obj = document.getElementById("mesh").object3D;
    applyMocap(obj, blendshapes_values, 1);
}

let video;
async function init() {
    video = document.getElementById('l_v');
    if (!isMobile()) {
        let cams = await AgoraRTC.getCameras();
        for (var i = 0; i < cams.length; i++) {
            if (cams[i].label.indexOf("FaceTime") == 0) {
                console.warn("select FaceTime camera", cams[i].deviceId);
                deviceId = cams[i].deviceId;
            }
        }
    }

    const constraints = {
        video: {
            deviceId: deviceId ? { exact: deviceId } : {}, width: 320, height: 180, rameRate: 24
        },
        audio: true
    };

    camera = new Camera(video, {
        onFrame: async () => {
                if (faceLandmarker) {
                    const results = await faceLandmarker.detectForVideo(video, Date.now());
                    onResultsFaceLM(results);
                }
        },
        width: 320,
        height: 180,
        frameRate: 24
    });

    navigator.mediaDevices.getUserMedia(constraints).then(async (stream) => {
        window.gum_stream = stream;
        video.srcObject = stream;
        camera.start();
    });
}

document.querySelector('a-scene').addEventListener('loaded', function () {
    init();
})

if (document.querySelector('a-scene').hasLoaded) {
    init();
}

var avatarConfigs = {
   'Amir': {url:'https://digitalhuman.uk/assets/characters/Amir_Rigged/Amir_Rigged.gltf', height:1.64, neckOffset:-0.48}
   ,'Bes': {url:'https://digitalhuman.uk/assets/characters/Bes_Rigged/Bes_Rigged.gltf', height:1.65, neckOffset:-0.38}
   ,'Cooper': {url:'https://digitalhuman.uk/assets/characters/Cooper_Rigged/Cooper_Rigged.gltf', height:1.65, neckOffset:-0.42}
   ,'Emanuel': {url:'https://digitalhuman.uk/assets/characters/Emanuel_Rigged/Emanuel_Rigged.gltf', height:1.65, neckOffset:-0.42}
   ,'Jesse': {url:'https://digitalhuman.uk/assets/characters/Jesse_Rigged/Jesse_Rigged.gltf', height:1.71, neckOffset:-0.48}
   ,'Nasim': {url:'https://digitalhuman.uk/assets/characters/Nasim_Rigged/Nasim_Rigged.gltf', height:1.65, neckOffset:-0.42}
   ,'Khaled': {url:'https://digitalhuman.uk/assets/characters/Khaled_Rigged/Khaled_Rigged.gltf', height:1.63, neckOffset:-0.48}
   ,'Hannah': {url:'https://digitalhuman.uk/assets/characters/Hana_Rigged/Hana_Rigged.gltf', height:1.46, neckOffset:-0.48}
   ,'Bernice': {url:'https://digitalhuman.uk/assets/characters/Bernice_Rigged/Bernice_Rigged.gltf', height:1.52, neckOffset:-0.48}
   ,'Kendra': {url:'https://digitalhuman.uk/assets/characters/Kendra_Rigged/Kendra_Rigged.gltf', height:1.52, neckOffset:-0.48}
   ,'Natalia': {url:'https://digitalhuman.uk/assets/characters/Natalia_Rigged/Natalia_Rigged.gltf', height:1.52, neckOffset:-0.42}
   ,'Vivian': {url:'https://digitalhuman.uk/assets/characters/vivian_rigged/VivianRigged.gltf', height:1.6, neckOffset:-0.48}
};

function loadAvatar(aid) {
    let conf=avatarConfigs[aid];
    document.getElementById("mesh").setAttribute('gltf-model',  conf.url);
    let cam = document.getElementById("camera").object3D;
    cam.position.set(0.0, conf.height, 0.85);
    neckOffset=conf.neckOffset;
    $(".avatar-input").val(aid);
}

function loadAvatarTest(aid, height, necko) {
    let conf=avatarConfigs[aid];
    document.getElementById("mesh").setAttribute('gltf-model', conf.url);
    let cam = document.getElementById("camera").object3D;
    cam.position.set(0.0, height, 0.85);
    neckOffset=necko;
}

window.loadAvatar=loadAvatar;
window.loadAvatarTest=loadAvatarTest;