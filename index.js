const openvr = require("node-openvr");
var vr = null;
try{
    vr = openvr.system.VR_Init(openvr.EVRApplicationType.Background)
}catch(e) {
    vr = null;
    console.error("VR Error", e);
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


function convert_to_quaternion(_pose_mat) {
    pose_mat = Array.from(_pose_mat)
    let r_w = Math.sqrt(Math.abs(1 + pose_mat[0] + pose_mat[5] + pose_mat[10]))/2
    let r_x = (pose_mat[6]-pose_mat[9])/(4*r_w)
    let r_y = (pose_mat[8]-pose_mat[2])/(4*r_w)
    let r_z = (pose_mat[1]-pose_mat[4])/(4*r_w)

    let x = pose_mat[3]
    let y = pose_mat[7]
    let z = pose_mat[11]
    return [x,y,z,r_w,r_x,r_y,r_z]
}


let matrice = new Float32Array(16);

const interval = setInterval(function updateClientsPosition() {
    if (vr !== null) {
	// get data from VIVE !!!
	console.log(vr.GetDeviceToAbsoluteTrackingPose(openvr.ETrackingUniverseOrigin.Standing, 0))

    } else {
	// generate data for testing and demo
    }

    let quat = convert_to_quaternion(matrice);
    wss.clients.forEach(function each(ws) {
	ws.send(JSON.stringify({
	    'x': quat[0],
	    'y': quat[1],
	    'z': quat[2],
	    'rw':quat[3],
	    'rx':quat[4],
	    'ry':quat[5],
	    'rz':quat[6]	    
	}));
    });
}, 500);

function shutdown(code) {
    console.log('SIGINT received...');
    clearInterval(interval);
    wss.close();
    if (vr) {
	openvr.system.VR_Shutdown();
    }
};

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
//shutdown();
