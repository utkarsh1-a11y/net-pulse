let startTime, endTime;
let imageSize = "";
let bitSpeed = document.getElementById("bits"),
  kbSpeed = document.getElementById("kbs"),
  mbSpeed = document.getElementById("mbs"),
  info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 3;
let testCompleted = 0;

// Use fixed test file instead of Unsplash
const imageApi = "https://speed.cloudflare.com/__down?bytes=5000000";

// Function to calculate speed
function calculateSpeed() {
  // Time taken in seconds
  let timeDuration = (endTime - startTime) / 1000;
  let loadedBits = imageSize * 8;
  // 1MB file size in bytes × 8
  let speedInBts = loadedBits / timeDuration;
  let speedInKbs = speedInBts / 1024;
  let speedInMbs = speedInKbs / 1024;

  totalBitSpeed += speedInBts;
  totalKbSpeed += speedInKbs;
  totalMbSpeed += speedInMbs;

  testCompleted++;

  // If all tests completed (we get 5 image then calculate average)
  if (testCompleted === numTests) {
    let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
    let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
    let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

    // Display average speeds
    bitSpeed.innerHTML = averageSpeedInBps;
    kbSpeed.innerHTML = averageSpeedInKbps;
    mbSpeed.innerHTML = averageSpeedInMbps;
    info.innerHTML = "Test Completed!";
  } else {
    // Run the next test
    init();
  }
}

const init = async () => {
  try {
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();

    let response = await fetch(imageApi, { cache: "no-store" });
    let blob = await response.blob();

    endTime = new Date().getTime();
    imageSize = blob.size;

    calculateSpeed();
  } catch (error) {
    info.innerHTML = "Error testing speed!";
    console.log(error);
  }
};
// Run tests when window loads
window.onload = () => {
  init();
};
