// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Check if the window width is greater than 1000 pixels
if (window.innerWidth > 1000) {
  // Select DOM elements
  const dotBorder = document.querySelectorAll(".dot");
  const dot = document.querySelectorAll(".dotsst");
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const transring = document.getElementById("transring");

  // Ensure window scrolls to top when unloaded
  window.addEventListener("unload", () => {
    window.scrollTo(0, 0);
  });

  // Set initial styles for dotBorder and dot elements
  dotBorder[0].style.strokeWidth = "2px";
  dot[0].style.opacity = 1;
  dot[0].style.fill = "rgb(0, 146, 255)";

  // Function to change colors of specified elements
  const colorChanger = (leftColor, rightColor) => {
    left.style.background = leftColor;
    transring.style.background = leftColor;
    right.style.background = rightColor;
  };

  // Function to handle page animations
  const pages = (enterIn, pageNo, direction) => {
    const page = document.getElementById(`page${pageNo}`);
    const leftHeader = document.getElementById(`page${pageNo}_header`);
    const leftInfo = document.getElementById(`page${pageNo}_info`);
    const leftFooter = document.getElementById(`page${pageNo}_footer`);
    const colors = {
      1: ["#7200bf", "rgb(0, 0, 0, 15%)"],
      2: ["#4d26cd", "#1c0361"],
      3: ["#0d1039", "#151748"],
      4: ["#16273b", "rgb(13 21 30 / 99%)"],
      5: ["#1358c0", "#2dcddd"],
      6: ["#012c92", "transparent"],
      7: ["#00834d", "#00b669"],
    };
    if (enterIn) {
      colorChanger(...colors[pageNo]);
      leftFooter.className = "enlarge";
      page.className = `right_imgContainer page${pageNo}_animation`;
      leftHeader.className = `page${pageNo}_animation_enterIn_${direction}`;
      leftInfo.className = `page${pageNo}_animation_enterIn_${direction}`;
    } else {
      leftFooter.className = "shrink";
      page.className = `right_imgContainer page${pageNo}_animation_rev`;
      leftHeader.className = `page${pageNo}_animation_enterOut_${direction}`;
      leftInfo.className = `page${pageNo}_animation_enterOut_${direction}`;
    }
  };

  // Select the ring element
  const ring = document.getElementById("Opaque_Ring");
  let stopPoint = 0;

  // Create GSAP timeline for scroll animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "4000",
      scrub: 1,
      ease: "none",
      onUpdate: (self) => {
        // Update stopPoint based on scroll progress
        let prevStopPoint = stopPoint;
        stopPoint = Math.floor(self.progress.toFixed(3) * 7);
        let strokeDasharray = stopPoint * (814 / 6);
        if (stopPoint + 1 === 3) {
          strokeDasharray += 7;
        }
        if (stopPoint + 1 === 5) {
          strokeDasharray -= 10;
        }
        ring.style.strokeDasharray = `${strokeDasharray}, 814`;
        if (stopPoint === 7) {
          return;
        }
        if (stopPoint > prevStopPoint) {
          // Animate forward
          pages(false, stopPoint, "forward");
          pages(true, stopPoint + 1, "forward");
          dotBorder.forEach((border, i) => {
            if (i <= stopPoint) {
              border.style.transitionDelay = "0.6s";
              dot[i].style.transition =
                "opacity 0.2s 0.6s ease-in-out, fill 0.2s 0.8s ease-in-out";
              border.style.strokeWidth = window.innerWidth <= 1368 ? "3px" : "2px";
              dot[i].style.opacity = 1;
              dot[i].style.fill = "rgb(0, 146, 255)";
            }
          });
        } else if (stopPoint < prevStopPoint) {
          // Animate backward
          if (prevStopPoint !== 7) {
            pages(true, stopPoint + 1, "backward");
            pages(false, stopPoint + 2, "backward");
          }
          dotBorder.forEach((border, i) => {
            if (i > stopPoint) {
              border.style.transitionDelay = "0s";
              border.style.strokeWidth = "0px";
              dot[i].style.fill = "white";
              dot[i].style.opacity = 0.6;
            }
          });
        }
      },
      pin: true,
    },
  });
}
