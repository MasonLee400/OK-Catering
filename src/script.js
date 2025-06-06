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

window.addEventListener("load", initSlider);