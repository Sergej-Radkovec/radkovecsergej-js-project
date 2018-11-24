function initApp() {
  const helicopterParam = {
    size: 80,
    speed: 0.5,
    typeBase: 2,
    cost: 2,
  };

  const planeParam = {
    size: 80,
    speed: 0.7,
    typeBase: 1,
    cost: 1,
  };

  const helicopter = new airPlaneMVC.HelicopterModel(helicopterParam);
  const plane = new airPlaneMVC.PlaneModel(planeParam);

  const helicopterView = new airPlaneMVC.HelicopterView(helicopter);
  const planeView = new airPlaneMVC.PlaneView(plane);

  console.log(planeView);
}

initApp();
