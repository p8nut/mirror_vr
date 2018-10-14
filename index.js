const express = require('express')
const app = express()

app.get('/', (req, res) => res.redirect('/index.html'));
app.use(express.static('static'));

app.use('/modules', express.static('node_modules'));

const server = app.listen(8080)
try {
    const openvr = require("openvr");
    openvr.k_unMaxTrackedDeviceCount = 64;
    var vr = openvr.VR_Init(openvr.EVRApplicationType.Background)
} catch(e) {
    console.log(e)
}

function convert_to_quaternion(_pose_mat) {
    let pose_mat = Array.from(_pose_mat)
    let r_w = Math.sqrt(Math.abs(1 + pose_mat[0][0] + pose_mat[1][1] + pose_mat[2][2]))/2
    let r_x = (pose_mat[2][1]-pose_mat[1][2])/(4*r_w)
    let r_y = (pose_mat[0][2]-pose_mat[2][0])/(4*r_w)
    let r_z = (pose_mat[1][0]-pose_mat[0][1])/(4*r_w)

    let x = pose_mat[0][3]
    let y = pose_mat[1][3]
    let z = pose_mat[2][3]
    return {
	'x':x,
	'y':y,
	'z':z,
	'qw':r_w,
	'qx':r_x,
	'qy':r_y,
	'qz':r_z
    };
}

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9090 });

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

if (vr) {
const interval = setInterval(function updateClientsPosition() {
    let poses = vr.GetDeviceToAbsoluteTrackingPose(openvr.ETrackingUniverseOrigin.Standing, 0)
    for (let i = 0; i < openvr.k_unMaxTrackedDeviceCount; ++i) {
    	if (poses[i] !== undefined && poses[i].poseIsValid === true) {
    	    switch (vr.GetTrackedDeviceClass(i)) {
    	    case openvr.ETrackedDeviceClass.Invalid:
    		console.error('INVALID DEVICE');
    		break;
    	    case openvr.ETrackedDeviceClass.HMD:
    		console.log('HMD');
    	    	break;
    	    case openvr.ETrackedDeviceClass.Controller:
    		console.log('CONTROLLER');
    		let quat = convert_to_quaternion(poses[i].deviceToAbsoluteTracking)
    		let msg = JSON.stringify(quat)
    		console.log(msg)
    		wss.clients.forEach(function each(ws) {
    		    if (ws.readyState == ws.OPEN)
    			ws.send(msg);
    		})
    		return;
    		break;
    	    case openvr.ETrackedDeviceClass.GenericTracker:
    		console.log('GENERIC TRACKER');
    		break;
    	    case openvr.ETrackedDeviceClass.TrackingReference:
    		console.log('TRACKING REFERENCE');		
    		break;
    	    case openvr.ETrackedDeviceClass.DisplayRedirect:
    		console.log('DISPLAY REDIRECT');
    		break;
    	    default:
    		console.error("ERROR UNKNOWN DEVICE")
    	    }
    	}
    }
}, 50);
}
function shutdown(code) {
    console.log('SIGNAL received...');
    clearInterval(interval);
    wss.close();
    server.close();
    openvr.VR_Shutdown();
};

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
