const openvr = require("openvr");
openvr.k_unMaxTrackedDeviceCount = 64;
var vr = openvr.VR_Init(openvr.EVRApplicationType.Background)

function convert_to_quaternion(_pose_mat) {
    let pose_mat = Array.from(_pose_mat)
    let r_w = Math.sqrt(Math.abs(1 + pose_mat[0][0] + pose_mat[1][1] + pose_mat[2][2]))/2
    let r_x = (pose_mat[2][1]-pose_mat[1][2])/(4*r_w)
    let r_y = (pose_mat[0][2]-pose_mat[2][0])/(4*r_w)
    let r_z = (pose_mat[1][0]-pose_mat[0][1])/(4*r_w)

    let x = pose_mat[0][3]
    let y = pose_mat[1][3]
    let z = pose_mat[2][3]
    return [x,y,z,r_w,r_x,r_y,r_z]
}

function convert_to_euler(_pose_mat) {
    let pose_mat = Array.from(_pose_mat)
    let yaw = 180 / Math.PI * Math.atan(pose_mat[1][0] /pose_mat[0][0])
    let pitch = 180 / Math.PI * Math.atan(-1 * pose_mat[2][0] / Math.sqrt(Math.pow(pose_mat[2][1], 2) + Math.pow(pose_mat[2][2], 2)))
    let roll = 180 / Math.PI * Math.atan(pose_mat[2][1] /pose_mat[2][2])
    let x = pose_mat[0][3]
    let y = pose_mat[1][3]
    let z = pose_mat[2][3]
    return [x,y,z,yaw,pitch,roll]
}


const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log("SRV connection");
    
    ws.on('open', function(event){
	console.log("CLT Open", event);
    });

    ws.on('message', function(event){
	console.log("CLT Message", event);
    });

    ws.on('error', function(event){
	console.error("CLT Error", event);
    });

    ws.on('close', function(event){
	console.log("CLT Close", event);
    });
});

wss.on('close', function(event){
    console.log("SRV Close", event);    
})

wss.on('error', function(event){
    console.error("SRV Error", event);    
})

const interval = setInterval(function updateClientsPosition() {
    let poses = vr.GetDeviceToAbsoluteTrackingPose(openvr.ETrackingUniverseOrigin.Standing, 0)
    for (let i = 0; i < openvr.k_unMaxTrackedDeviceCount; ++i) {
	if (poses[i] !== undefined) {
	    switch (vr.GetTrackedDeviceClass(i)) {
	    case openvr.ETrackedDeviceClass.Invalid:
		//console.error('INVALID DEVICE');
		break;
	    case openvr.ETrackedDeviceClass.HMD:
		//console.log('HMD');
		break;
	    case openvr.ETrackedDeviceClass.Controller:
		console.log('CONTROLLER');
		//console.log(poses[i])
		let quat = convert_to_quaternion(poses[i].deviceToAbsoluteTracking)
		wss.clients.forEach(function each(ws) {
		    ws.send(JSON.stringify({
			'x': quat[0] * 1000,
			'y': quat[1] * 1000,
			'z': quat[2] * 1000,
			'rw':quat[3],
			'rx':quat[4],
			'ry':quat[5],
			'rz':quat[6]	    
		    }));
		});
		return;
		break;
	    case openvr.ETrackedDeviceClass.GenericTracker:
		//console.log('GENERIC TRACKER');
		break;
	    case openvr.ETrackedDeviceClass.TrackingReference:
		//console.log('TRACKING REFERENCE');		
		break;
	    case openvr.ETrackedDeviceClass.DisplayRedirect:
		//console.log('DISPLAY REDIRECT');
		break;
	    default:
		console.error("ERROR UNKNOWN DEVICE")
	    }
	}
    }
}, 50);

function shutdown(code) {
    console.log('SIGNAL received...');
    clearInterval(interval);
    wss.close();
    openvr.VR_Shutdown();
};

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
