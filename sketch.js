let qt;
let boundary
let spawnMultiplePoints = true;
let drawPoints = false;
let showPoints = true;
let selectPoints = false;
let treeCapacity = 4;

function setup() {
  createCanvas(900, 900);

  boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  qt = new QuadTree(boundary, treeCapacity);


  setupLayout();
}
// todo: move to separate widget manager 
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
  btnToggleSelection.mousePressed(() => {
    selectPoints = !selectPoints;
    if (selectPoints) {
      btnToggleSelection.style('background', enCol);
    } else {
      btnToggleSelection.style('background', disCol);
    }
  });

  let btnClear = createButton("Clear");
  btnClear.mousePressed(() => {
    qt = new QuadTree(boundary, treeCapacity);
  });

  let inputTreeCapacity = createInput();
  let btnInputSubmit = createButton("Submit");
  btnInputSubmit.position(inputTreeCapacity.x + inputTreeCapacity.width, inputTreeCapacity.y);
  btnInputSubmit.mousePressed(() => {
    treeCapacity = Number(inputTreeCapacity.value());
  });
  inputTreeCapacity.value(treeCapacity);


  textSize(width / 10);

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
}

function draw() {
  if (mouseIsPressed && drawPoints) {
    mouseClicked();
  }
  background(0);
  qt.show(showPoints);
  drawSelection(100, 50);
}

function drawSelection(width, height) {
  if (selectPoints) {
    stroke(0, 255, 0, 255);
    strokeWeight(2);
    noFill();
    rectMode(CENTER)
    rect(mouseX, mouseY, width * 2, height * 2)
    let found = qt.query(new Rectangle(mouseX, mouseY, width, height))
    for (let p of found) {
      stroke(0, 255, 0, 255);
      strokeWeight(5);
      point(p.x, p.y)
    }
    text(found.length, 100, 100)
  }
}
