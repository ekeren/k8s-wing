class Pod {
  init(podfile: str) {  }
}
class Service {
  init(pod: Pod){}
}
class Ingress {
  addRule(path: str, service: Service){}
  onStart(fn: inflight (str):void) { }
}