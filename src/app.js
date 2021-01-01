const express = require("express");
// var async = require("async");
const mongoose = require("mongoose");
const config = require("./db"); 


mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to database" + config.uri);
});

mongoose.connection.on("erorr", (err) => {
  console.log("erorr");
});

// const Log = require("./log");

// const k8s = require("@kubernetes/client-node");

// const { BatchV1Api, V1ObjectMeta, V1Job } = require("@kubernetes/client-node");

const app = express();

// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();

// const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// const k8sApi2 = kc.makeApiClient(k8s.BatchV1Api);

// function k8Listerner() {
//   k8sApi2.listNamespacedJob("default").then((data) => {
//     // temp = [];
//     console.clear();
//     data.body.items.forEach((element) => {
//       if (element.status.active > 0) {
//         console.log("Running : " + element.metadata.name);
//       } else {
//         if (element.status.succeeded > 0) {
//           k8sApi2
//             .deleteNamespacedJob(element.metadata.name, "default")
//             .then((reuslt) => {
//               Log.editLog(element.metadata.name, (err, log) => {
//                 if (err) {
//                   console.log({ data: err, success: false, msg: "Error" });
//                 }
//                 {
//                   console.log({ data: log, success: true, msg: "Success" });
//                 }
//               });
//               console.log("Job Deleted: " + element.metadata.name);
//             });
//         } else {
//           fmt.Printf("Failed - %s\n", job.Name);
//         }
//       }

//       // temp.push(element.metadata.name);
//     });
//   });
// }

// function k8Listerner2() {
//   console.log("Hi");
// }
// setInterval(k8Listerner, 5000);

app.get("/", (req, res) => {
  // async.parallel(
  //   [
  //     function () {
  //       setInterval(k8Listerner, 2000);
  //     },
  //     function () {
  //       setInterval(k8Listerner2, 1500);
  //     },
  //   ],
  //   console.log("DONE")
  // );
  // k8sApi2.listNamespacedJob("default").then((data) => {
  //   temp = [];
  //   data.body.items.forEach((element) => {
  //     console.log(element.metadata.name);
  //     temp.push(element.metadata.name);
  //   });
  res.send("Started");
  // });
});

app.get("/getPods", (req, res) => {
  k8sApi.listNamespacedPod("kube-system").then((data) => {
    temp = [];
    data.body.items.forEach((element) => {
      console.log(element.metadata.name);
      temp.push(element.metadata.name);
    });
    res.send(temp);
  });
});

app.get("/createJob", (req, res) => {
  var job = {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: {
      generateName: "my-job-",
      //   labels: {
      //     name: "healthchecker-0002",
      //     deep: "healthchecker",
      //   },
    },
    spec: {
      template: {
        metadata: {
          generateName: "my-job-",
          //   labels: {
          //     name: "healthchecker-0002",
          //     deep: "healthchecker",
          //   },
        },
        spec: {
          restartPolicy: "Never",
          containers: [
            {
              name: "busybox",
              image: "busybox",
              //   env: [
              //     {
              //       name: "APIHOST",
              //       value: "https://www.shuttlecloud.com",
              //     },
              //   ],
              command: ["sleep", "20"],
            },
          ],
        },
      },
    },
  };

  // k8sApi2
  //   .createNamespacedJob("default", job)
  //   .then((data) => {
  //     // Log.addLog(data.body.metadata.name);

  //     let newLog = new Log({
  //       name: data.body.metadata.name,
  //       status: 0,
  //     });
  //     Log.addLog(newLog, (err, log) => {
  //       if (err) {
  //         console.log({ data: err, success: false, msg: "Error" });
  //       }
  //       {
  //         console.log({ data: log, success: true, msg: "Success" });
  //       }
  //     });

  //     console.log("done");
  //     res.send(data);
  //   })
  //   .catch((err) => console.log(err));
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
