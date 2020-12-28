const express = require("express");
const os = require("os");
const k8s = require("@kubernetes/client-node");
const { BatchV1Api, V1ObjectMeta, V1Job } = require("@kubernetes/client-node");

const app = express();

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApi2 = kc.makeApiClient(k8s.BatchV1Api);

app.get("/", (req, res) => {
  k8sApi2.listNamespacedJob("default").then((data) => {
    temp = [];
    data.body.items.forEach((element) => {
      console.log(element.metadata.name);
      temp.push(element.metadata.name);
    });
    res.send(temp);
  });
});

async function call() {
  for (let i = 0; i < 5; i++) {
    if (i === 3) await sleep(2000);
    console.log(i);
  }
}

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

function makeid(length) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.get("/createJob", (req, res) => {
  postFix = makeid(5);
  var job = {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: {
      name: "my-job-" + postFix,
      //   labels: {
      //     name: "healthchecker-0002",
      //     deep: "healthchecker",
      //   },
    },
    spec: {
      template: {
        metadata: {
          name: "my-job-" + postFix,
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

  k8sApi2
    .createNamespacedJob("default", job)
    .then((data) => {
      console.log("done");
      res.send(data);
    })
    .catch((err) => console.log(err));
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
