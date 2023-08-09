bring cloud;
bring "./lib/vite.w" as vite;
bring "./lib/k8s.w" as k8s;

let queue = new cloud.Queue() as "device messages queue";
let ingress = new k8s.Ingress();
let devicePod = new k8s.Pod("./src/device/docker.file") as "devicePod";
let deviceService = new k8s.Service(devicePod) as "deviceService";
let webPod = new k8s.Pod("./src/web/docker.file");
let webAppService = new k8s.Service(webPod) as "webAppService";
ingress.addRule("/device", deviceService);
ingress.addRule("/public", webAppService);

let website = new vite.Website("./src/public/vite.config");

website.onStart(inflight (port: str) => {
  log("website started on port ${port}");
});

