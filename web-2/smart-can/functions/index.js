const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const admin = require('firebase-admin');

var serviceAccount = require('./admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

// db.collection('activity').document();

exports.helloWorld = functions.https.onRequest((request, response) => {

	var type = request.body.type;
	var labels = request.body.labels;

	db.collection('activity').add({
		category: request.body.type,
    	tags: request.body.labels,
    	timestamp: Date.now()//admin.firestore().FieldValue.serverTimestamp()
	});

	// var trash_count;
	// var recycle_count;

	var docRef = db.collection("global").doc("stats");
	//get original values
	var count = docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data().trashCount);

        var trash_count = doc.data().trashCount + 1;
        var recycle_count = doc.data().recycleCount + 1;

        console.log(trash_count, ",", recycle_count);

        if(type === "trash")
		{
			db.collection('global').doc('stats').update({
	    		trashCount: trash_count
	    	});
		}
		else
		{
			db.collection('global').doc('stats').update({
	    		recycleCount: recycle_count
	    	});
		}

		return "";
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return "";
    }
	}).catch(function(error) {
	    console.log("Error getting document:", error);
	});

	response.send("whtsup");
});

exports.update = functions.https.onRequest((request, response) => {
	var type = request.body.type;

	response.send("done" + type);
})

function update_activity(type, labels)
{
	db.collection('activity').doc().add({
		category: type,
    	tags: labels,
    	timestamp: admin.firestore.FieldValue.serverTimestamp()
	});
}