var admin = require("firebase-admin");
var serviceAccount = require("./config/tidedemo-96abf-credentials-template");

function setupFirebaseSDK() {
  return new Promise((resolve, reject) => {
    if (process.env.firebase_tidedemo_96abf_private_key_id && process.env.firebase_tidedemo_96abf_private_key) {
      serviceAccount.private_key_id = process.env.firebase_tidedemo_96abf_private_key_id;
      serviceAccount.private_key = process.env.firebase_tidedemo_96abf_private_key;
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      
      resolve();
    } else {
      console.error("Environment variables firebase_tidedemo_96abf_private_key_id & firebase_tidedemo_96abf_private_key must be set");
      reject(new Error("No private key environment variables"))
    }
  })
}

setupFirebaseSDK()
.then(() => {
  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    console.log('User ID', uid);
    console.log(decodedToken);
  }).catch(function(error) {
    console.log(error);
  });
})


