const express = require("express");
const cors = require("cors");
const util = require("util");
const exec = require("child_process").exec;
const extract = require("extract-zip");

const app = express();
app.use(cors());

const command =
  "git clone https://github.com/LuisJoseSanchez/hello-world-java.git";



const buildCommand = "javac HelloWorld.java";
// const runCommand = "cd hello-world-java && java HelloWorld";

// const responseAPI = `curl --location --request POST 'http://2886795282-3000-ollie07.environments.katacoda.com/job' --header 'Content-Type: application/json'  --data-raw '{ "name":"kam" }'`;

exec(command, function (error, stdout, stderr) {
  if (error !== null) {
    console.log("exec error CLONE: " + error);
  } else {
    buildCommandFn();
    // console.log(process.env.NAME);
    console.log("Clone Done");
  }
});

function buildCommandFn() {
  exec(buildCommand, function (error, stdout, stderr) {
    //   console.log("stdout: " + stdout);
    //   console.log("stderr: " + stderr);
    if (error !== null) {
      console.log("exec error EXEC: " + error);
      responseAPIFn("ERROR");
    } else {
      responseAPIFn("Success");
        // console.log("Build Done");
    }
  });
}

function responseAPIFn(msg) {
  console.log(msg)
  const responseAPI = `curl --location --request POST 'http://2886795273-3000-cykoria04.environments.katacoda.com/job' --header 'Content-Type: application/json'  --data-raw '{ "name": "${msg}" }'`;

  exec(responseAPI, function (error, stdout, stderr) {
    if (error !== null) {
      console.log("exec error api call: " + error);
    } else {
    }
  });
}

// function runCommandFn() {
//   exec(runCommand, function (error, stdout, stderr) {
//     //   console.log("stdout: " + stdout);
//     //   console.log("stderr: " + stderr);
//     if (error !== null) {
//       console.log("exec error EXEC: " + error);
//     } else {
//       //   extractZip();
//       console.log("stdout: " + stdout);
//       console.log("RUN Done");
//       //   res.send("DONE");
//     }
//   });
// }

// async function extractZip() {
//   console.log("Extraction started");
//   try {
//     await extract("master.zip", { dir: __dirname });
//     console.log("Extraction complete");
//     exec(
//       "cd angular-basics-master  && npm i",
//       function callback(error, stdout, stderr) {
//         console.log("stdout: " + stdout);
//         console.log("stderr: " + stderr);
//         if (error !== null) {
//           console.log("exec error: " + error);
//         } else {
//           console.log("Build");
//           exec(
//             "cd angular-basics-master && dir && ng build --prod",
//             function callback(error, stdout, stderr) {
//               console.log("stdout: " + stdout);
//               console.log("stderr: " + stderr);
//               if (error !== null) {
//                 console.log("exec error: " + error);
//               } else {
//                 console.log("Done");
//               }
//             }
//           );
//         }
//       }
//     );
//   } catch (err) {
//     // handle any errors
//     console.log(err);
//   }
// }

// const port = 3000;
// app.listen(port, () => console.log(`listening on port ${port}`));
