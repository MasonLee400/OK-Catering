const initSlider = () =>{
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".slider-container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const vwToPixels = (vw) => {
        return (vw / 100) * window.innerWidth;
    };

    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            console.log(button.id)
            const scrollAmount = (vwToPixels(22)) * direction;
            imageList.scrollBy({left: scrollAmount, behavior: "smooth"});
        })
    })

    const handleSlideButtons =() => {
        slideButtons[0].style.display = imageList.scrollLeft <= vwToPixels(1) ? "none" : "block"; 
        slideButtons[1].style.display = imageList.scrollLeft >= (maxScrollLeft - vwToPixels(5)) ? "none" : "block"; 
    }

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    })
}

const imageList      = document.querySelector(".image-list");
const scrollbarTrack = document.querySelector(".scrollbar-track");
const scrollbarThumb = document.querySelector(".scrollbar-thumb");

function updateThumbPosition() {
  const maxScrollLeft   = imageList.scrollWidth - imageList.clientWidth;
  const scrollLeft      = imageList.scrollLeft;

  const scrollProgress  = maxScrollLeft === 0 ? 0 : scrollLeft / maxScrollLeft;

  const trackWidth      = scrollbarTrack.clientWidth;
  const thumbWidth      = scrollbarThumb.offsetWidth;
  const maxThumbX       = trackWidth - thumbWidth;

  // Clamp between 0 and maxThumbX
  const thumbX = Math.max(0, Math.min(maxThumbX, scrollProgress * maxThumbX));

  scrollbarThumb.style.left = `${thumbX}px`;
}

imageList.addEventListener("scroll", updateThumbPosition);
window.addEventListener("resize", updateThumbPosition);

// Call once at start
updateThumbPosition();

window.addEventListener("load", initSlider);