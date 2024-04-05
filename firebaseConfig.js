
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAWABMzjyrbtZNWgKAg1dF0x5r44a1ET7o",
  authDomain: "cuzdanapp-fe2fd.firebaseapp.com",
  projectId: "cuzdanapp-fe2fd",
  storageBucket: "cuzdanapp-fe2fd.appspot.com",
  messagingSenderId: "970331204744",
  appId: "1:970331204744:web:46467c40a96aec7b39c33d",
  measurementId: "G-PYXZSLN032"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
