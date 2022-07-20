let duration = 1000;
let tries = document.querySelector(".info .tries span");
document.querySelector(".control-button span").onclick = function () {
  "use strict";
  let yourName = prompt("what is your name?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "unknow";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-button").remove();
};
let blockContainer = document.querySelector(".memory-game-block");
let blocks = Array.from(blockContainer.children);
//let orderRange = [...Array(block.length).keys()]; Ecma6 js
let orderRange = Array.from(Array(blocks.length).keys());
let orderRangeRundom = shuffle(orderRange);

//forEach
blocks.forEach((block, index) => {
  block.style.order = orderRangeRundom[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
//shuffle function
function shuffle(array) {
  let current = array.length,
    random,
    temp;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
//event

//flip block function
function flipBlock(selectBlock) {
  selectBlock.classList.add("isflipped");

  let allflippedBlock = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("isflipped")
  );
  if (allflippedBlock.length === 2) {
    //stop clicking function
    stopClick();
    //check matched block function
    checkMatchedBlock(allflippedBlock[0], allflippedBlock[1]);
  }
}
//stop clicking function
function stopClick() {
  blockContainer.classList.add("no-click");

  setTimeout(() => {
    blockContainer.classList.remove("no-click");
  }, duration);
}
//check matched block function
function checkMatchedBlock(firstBlock, secondBlock) {
  if (firstBlock.dataset.frute === secondBlock.dataset.frute) {
    firstBlock.classList.remove("isflipped");
    secondBlock.classList.remove("isflipped");
    firstBlock.classList.add("is-match");
    secondBlock.classList.add("is-match");
    document.getElementById("succses").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("isflipped");
      secondBlock.classList.remove("isflipped");
    }, duration);
    document.getElementById("fail").play();
  }
}
