let qt;
let boundary 
let spawnMultiplePoints = true;
let drawPoints = false;
let showPoints = true;
let selectPoints = false;
let treeCapacity = 10;

function setup() {
  createCanvas(1000, 1000);

  boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  qt = new QuadTree(boundary, treeCapacity);


  setupLayout();
}

function setupLayout() {
  let btnToggleMultipleSpawn = createButton("Spawn multiple points");
  let enCol = color(25, 23, 200, 50);
  let disCol = color(112, 112, 112, 255);
  btnToggleMultipleSpawn.style('background', enCol);
  btnToggleMultipleSpawn.mousePressed(() => {
    spawnMultiplePoints = !spawnMultiplePoints;
    if (spawnMultiplePoints) {
      btnToggleMultipleSpawn.style('background', enCol);
    } else {
      btnToggleMultipleSpawn.style('background', disCol);
    }
  });

  let btnToggleDrawPoints = createButton("Draw by mouse");
  btnToggleDrawPoints.style('background', disCol);
  btnToggleDrawPoints.mousePressed(() => {
    drawPoints = !drawPoints;
    if (drawPoints) {
      btnToggleDrawPoints.style('background', enCol);
    } else {
      btnToggleDrawPoints.style('background', disCol);
    }
  });

  let btnToggleShowPoints = createButton("Show points");
  btnToggleShowPoints.style('background', enCol);
  btnToggleShowPoints.mousePressed(() => {
    showPoints = !showPoints;
    if (showPoints) {
      btnToggleShowPoints.style('background', enCol);
    } else {
      btnToggleShowPoints.style('background', disCol);
    }
  });
  

  let btnToggleSelection = createButton("Toggle selection");
  btnToggleSelection.style('background', disCol);
  btnToggleShowPoints.mousePressed(() => {
    selectPoints = !selectPoints;
    if (selectPoints) {
      btnToggleSelection.style('background', enCol);
    } else {
      btnToggleSelection.style('background', disCol);
    }
  });

  let btnClear = createButton("Clear");
  btnClear.mousePressed(()=>{
    qt = new QuadTree(boundary, treeCapacity);
  })
}

function mouseClicked() {
  if (spawnMultiplePoints) {
    for (let i = 0; i < 5; i++) {
      let m = new Point(mouseX + random(-15, 15), mouseY + random(-15, 15));
      qt.insert(m);
    }
  }
  else {
    let m = new Point(mouseX, mouseY);
    qt.insert(m);
  }
  console.log(qt);
}

function draw() {
  if (mouseIsPressed && drawPoints) {
    mouseClicked();
  }
  background(0);
  qt.show(showPoints);
}
