const container = document.querySelector(".container");
let DELAY_TIME = document.querySelector(".speed input").value;

// helps Functions
function randomize() {
  let len = document.querySelector(".length input").value;
  container.innerHTML = "";
  for (let i = 0; i < len; i++) {
    let bar = document.createElement("div");
    bar.style.height = `${Math.random() * 100}%`;
    bar.style.width = `${1200 / len}px`;
    bar.classList.add("bar");
    container.appendChild(bar);
  }
  enableBtnsAndSizeSlider();
}
randomize();
function sleep(ms) {
  return new Promise((r) => {
    setTimeout(() => {
      r();
    }, Math.abs(ms - 1000));
  });
}

function swap(b1, b2) {
  let tmp = b1.style.height;
  b1.style.height = b2.style.height;
  b2.style.height = tmp;
}

function enableBtnsAndSizeSlider() {
  const btns = document.querySelectorAll(".btns input");
  for (let btn of btns) {
    btn.disabled = false;
  }
  document.querySelector(".length input").disabled = false;
}

function disableBtnsAndSizeSlider() {
  const btns = document.querySelectorAll(".btns input");
  for (let btn of btns) {
    btn.disabled = true;
  }
  document.querySelector(".length input").disabled = true;
}

let bubbleSortBtn = document.querySelector(".bubble-sort");
bubbleSortBtn.addEventListener("click", async function () {
  disableBtnsAndSizeSlider();
  await bubbleSort();
  enableBtnsAndSizeSlider();
});

let selectionSortBtn = document.querySelector(".selection-sort");
selectionSortBtn.addEventListener("click", async function () {

  disableBtnsAndSizeSlider();
  await selectionSort();
  enableBtnsAndSizeSlider();
});
let insertionSortBtn = document.querySelector(".insertion-sort");
insertionSortBtn.addEventListener("click", async function () {
  disableBtnsAndSizeSlider();
  await insertionSort();
  enableBtnsAndSizeSlider();
});

let mergeSortBtn = document.querySelector(".merge-sort");
mergeSortBtn.addEventListener("click", async function () {
  let bars = document.querySelectorAll(".bar"),
    l = 0,
    r = bars.length - 1;
  disableBtnsAndSizeSlider();
  await mergeSort(bars, l, r);
  enableBtnsAndSizeSlider();
});

let quickSortBtn = document.querySelector(".quick-sort");
quickSortBtn.addEventListener("click", async function () {
  let bars = document.querySelectorAll(".bar"),
    l = 0,
    r = bars.length - 1;

  disableBtnsAndSizeSlider();
  await quickSort(bars, l, r);
  enableBtnsAndSizeSlider();
});

// let heapSortbtn = document.querySelector(".heap-sort");
// heapSortbtn.addEventListener("click", async function () {

//   let bars = document.querySelectorAll(".bar");
//   disableBtnsAndSizeSlider();
//   await heapSort(bars, bars.length);
//   enableBtnsAndSizeSlider();
// });

// Algorithms

async function bubbleSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].style.background = "blue";
      bars[j + 1].style.background = "blue";
      await sleep(DELAY_TIME);
      if (
        parseFloat(bars[j].style.height) > parseFloat(bars[j + 1].style.height)
      ) {
        bars[j].style.background = "red";
        bars[j + 1].style.background = "red";
        await sleep(DELAY_TIME);
        swap(bars[j], bars[j + 1]);
      }
      bars[j].style.background = "black";
      bars[j + 1].style.background = "black";
    }
    bars[bars.length - 1 - i].style.background = "#8c11a1";
  }
  bars[0].style.background = "#8c11a1";
}

async function selectionSort() {
  const bars = document.querySelectorAll(".bar");
  let min_idx;

  for (let i = 0; i < bars.length - 1; i++) {
    min_idx = i;
    for (let j = i + 1; j < bars.length; j++) {
      bars[j].style.background = "blue";
      bars[min_idx].style.background = "yellow";

      await sleep(DELAY_TIME);

      if (
        parseFloat(bars[j].style.height) <
        parseFloat(bars[min_idx].style.height)
      ) {
        bars[min_idx].style.background = "black";
        min_idx = j;
      }
      bars[j].style.background = "black";
    }

    bars[i].style.background = "red";
    bars[min_idx].style.background = "red";
    await sleep(DELAY_TIME);
    swap(bars[i], bars[min_idx]);
    bars[min_idx].style.background = "black";
    bars[i].style.background = "#8c11a1";
  }
  bars[bars.length - 1].style.background = "#8c11a1";
}

async function insertionSort() {
  const bars = document.querySelectorAll(".bar");
  bars[0].style.background = "#8c11a1";
  let tmp, j;
  for (let i = 1; i < bars.length; i++) {
    tmp = parseFloat(bars[i].style.height);
    bars[i].style.background = "yellow";

    await sleep(DELAY_TIME);
    j = i - 1;

    while (j >= 0 && parseFloat(bars[j].style.height) > tmp) {
      bars[j].style.background = "blue";
      bars[j + 1].style.height = bars[j].style.height;
      await sleep(DELAY_TIME);
      bars[j].style.background = "#8c11a1";
      j--;
    }

    bars[j + 1].style.height = `${tmp}%`;
    bars[i].style.background = "#8c11a1";
  }
  bars[bars.length - 1].style.background = "#8c11a1";
}

async function mergeSort(bars, l, r) {
  if (l < r) {
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(bars, l, m);
    await mergeSort(bars, m + 1, r);
    await merge(bars, l, m, r);
  }
}

async function merge(bars, l, m, r) {
  let i, j, k;
  const n1 = m - l + 1;
  const n2 = r - m;
  let L = new Array(n1);
  let R = new Array(n2);

  for (i = 0; i < n1; i++) {
    bars[l + i].style.background = "red";
    L[i] = bars[l + i].style.height;
    await sleep(DELAY_TIME);
  }
  for (i = 0; i < n2; i++) {
    bars[m + 1 + i].style.background = "blue";
    R[i] = bars[m + 1 + i].style.height;
    await sleep(DELAY_TIME);
  }

  i = 0;
  j = 0;
  k = l;

  while (i < n1 && j < n2) {
    await sleep(DELAY_TIME);

    if (n1 + n2 === bars.length) {
      bars[k].style.background = "#8c11a1";
    } else {
      bars[k].style.background = "#da00ff";
    }
    if (parseFloat(L[i]) <= parseFloat(R[j])) {
      bars[k].style.height = L[i];
      i++;
    } else {
      bars[k].style.height = R[j];
      j++;
    }
    k++;
  }
  while (i < n1) {
    await sleep(DELAY_TIME);
    if (n1 + n2 === bars.length) {
      bars[k].style.background = "#8c11a1";
    } else {
      bars[k].style.background = "#da00ff";
    }

    bars[k].style.height = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    await sleep(DELAY_TIME);
    if (n1 + n2 === bars.length) {
      bars[k].style.background = "#8c11a1";
    } else {
      bars[k].style.background = "#da00ff";
    }

    bars[k].style.height = R[j];
    j++;
    k++;
  }
}

async function quickSort(bars, l, h) {
  if (l < h) {
    let pi = await partition(bars, l, h);
    await quickSort(bars, l, pi - 1);
    await quickSort(bars, pi + 1, h);
  }
  for (let i = l; i <= h; i++) {
    bars[i].style.background = "#8c11a1";
  }
}

async function partition(bars, l, h) {
  let pivot = bars[h];
  let i = l - 1;
  pivot.style.background = "yellow";

  for (let j = l; j < h; j++) {
    bars[j].style.background = "blue";
    bars[i + 1].style.background = "green";
    await sleep(DELAY_TIME);

    if (parseFloat(bars[j].style.height) < parseFloat(pivot.style.height)) {
      i++;
      bars[i].style.background = "red";
      bars[j].style.background = "red";
      swap(bars[i], bars[j]);
      await sleep(DELAY_TIME);
      bars[i].style.background = "black";
    }
    bars[j].style.background = "black";
  }

  bars[i + 1].style.background = "red";
  pivot.style.background = "red";

  swap(bars[i + 1], pivot);

  await sleep(DELAY_TIME);

  pivot.style.background = "black";
  bars[i + 1].style.background = "#8c11a1";

  return i + 1;
}

// async function heapSort(bars, n) {
//   for (let i = n / 2 - 1; i >= 0; i--) {
//     await heapify(bars, n, i);
//   }

//   for (let i = n - 1; i > 0; i--) {
//     var temp = bars[0];
//     bars[0] = bars[i];
//     bars[i] = temp;
//     swap(bars[0], bars[i]);
//     await heapify(bars, i, 0);
//   }
// }

// async function heapify(bars, n, i) {
//   let largest = i;
//   let l = 2 * i + 1;
//   let r = 2 * i + 2;

//   if (
//     l < n &&
//     parseFloat(bars[l].style.height) > parseFloat(bars[largest].style.height)
//   ) {
//     largest = l;
//     swap(bars[largest], bars[l]);
//   }

//   if (
//     r < n &&
//     parseFloat(bars[r].style.height) > parseFloat(bars[largest].style.height)
//   ) {
//     largest = r;
//     swap(bars[largest], bars[r]);
//   }
  
//   if (largest != i) {
//     let tmp = bars[i];
//     bars[i] = bars[largest];
//     bars[largest] = tmp;
//     swap(bars[i], bars[largest]);

//     heapify(bars, n, largest);
//   }
// }
