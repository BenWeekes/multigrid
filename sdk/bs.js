
import vision from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0'; 
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


async function init2() {
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
    handleMocap(blendshapes.join());
}

function headLimit(val) {
    if (val > 0.4) return 0.4;
    if (val < -0.4) return -0.4;
    return val;
}

function blendshapeLimit(val) {
    if (val > 0.8) return 0.8;
    if (val < 0) return 0;
    return val;
}


const playMorphTarget = function (obj, blendshape, amount) {
    amount = blendshapeLimit(amount);
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

    head.rotation.x = -0.6 * roll;
    neck.rotation.x = - 0.4 * roll;
    head.rotation.y = 0.6 * yaw;
    neck.rotation.y = 0.4 * yaw;
    head.rotation.z = -0.4 - 0.6 * pitch;
    neck.rotation.z = -0.4 - 0.4 * pitch;
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
            deviceId: deviceId ? { exact: deviceId } : {}, width: 320, height: 180, rameRate: 15
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
        frameRate: 15
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