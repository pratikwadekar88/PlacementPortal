import aptitudeSmallImage from "../images/quizzes/aptitude-small.jpg";
import aptitudeImage from "../images/quizzes/aptitude.jpg";
import cnsSmallImage from "../images/quizzes/cns-small.jpg";
import cnsImage from "../images/quizzes/cns.jpg";
import dbmsSmallImage from "../images/quizzes/dbms-small.jpg";
import dbmsImage from "../images/quizzes/dbms.jpg";
import osSmallImage from "../images/quizzes/os-small.jpg";
import osImage from "../images/quizzes/os.jpg";
import bny from "../images/quizzes/bny.jpg"
import db from "../images/quizzes/db.png"
import phonepe from "../images/quizzes/phone pe.png"
import tcs from "../images/quizzes/tcs.jpg"


export const quizTopics = [
  {
    topic: "BNY MELLON",
    title: "BNY MELLON",
    description: "Apply before 8th aug",
    image: bny,
    smallImage: aptitudeSmallImage,
  },
  {
    topic: "DEUTSCHE BANK",
    title: "DEUTSCHE BANK",
    description: "Apply before 8th aug",
    image: db,
    smallImage: cnsSmallImage,
  },
  {
    topic: "PHONEPE",
    title: "PHONEPE",
    description: "Apply before 8th aug",
    image: phonepe,
    smallImage: dbmsSmallImage,
  },
  {
    topic: "TCS",
    title: "TCS",
    description: "Apply before 8th aug",
    image: tcs,
    smallImage: osSmallImage,
  },
];


export const quizTopicList = quizTopics.map(({ topic }) => topic);
