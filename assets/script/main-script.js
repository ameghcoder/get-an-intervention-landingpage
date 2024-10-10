const $ = e => document.querySelector(e);
const $all = e => document.querySelectorAll(e);
const $id = e => document.getElementById(e);
const component = {
    "error-tool-tip": '<div class="error-tooltip-content paragraph">This field can’t be empty. Please fill it in.</div>'
}

/**
 * This is function use to slide a container element using it's position like 0, 1, 2, 3
 * @param {*} pos in which position you want to slide your element
 * @param {*} container slider main parent container class that contains all element that able slide
 * @param {*} child the main child element class that slide
 */
const changeSliderPosition = (pos, container, child) => {
    const slide__container = $(container);
    const slide__child = $all(child);

    // calculate element
    const total__element = slide__child.length;

    // transformX px calculation
    const x__axis_px = slide__child[0].clientWidth * pos;

    slide__container.style.transform = `translateX(${(x__axis_px * -1) + "px"})`;
}

/**
 * The function reset the position based on current active slide
 * @param {string} dotContainer Slider dot btn container class 
 * @param {number} pos Current active slider position
 * @param {string} classForDot Class for dot button that you want to change on buttona active
 */

const resetClassInDot = (dotContainer, pos, classForDot) => {
    for (let i = 0; i < dotContainer.length; i++) {
        if (i == pos) {
            dotContainer[i].classList.add(classForDot);
        } else {
            dotContainer[i].classList.remove(classForDot);
        }
    }
}

const init = () => {
    // add focus state in input fields for change the label position and also show the error tool tip
    const inputFields = $all("input");
    inputFields.forEach(input => {
        const label = input.previousElementSibling;
        const label2 = input.nextElementSibling;

        let finalLabel = "", checkLabelExists = false;

        if (label && label.tagName == "LABEL") {
            finalLabel = label;
            checkLabelExists = true;
        } else if (label2 && label2.tagName == "LABEL") {
            finalLabel = label2;
            checkLabelExists = true;
        }

        if (checkLabelExists) {
            // Check on load if the input has a value
            if (input.value) {
                finalLabel.classList.add('input-group__label__focused');
            }

            // Add focus and blur event listeners
            input.addEventListener('focus', () => {
                finalLabel.classList.add('input-group__label__focused');
            });

            input.addEventListener('blur', () => {
                let parentEle = finalLabel.parentElement;
                if (input.value === "") {
                    parentEle.classList.add("input-group__danger");

                    if (parentEle.nextElementSibling === null) {
                        parentEle.insertAdjacentHTML("afterend", component["error-tool-tip"]);
                    }
                } else {
                    parentEle.classList.remove("input-group__danger");
                }
            });
        }

    })

    // testimonials slider
    const sliderContainerClass = ".slider-container__1";
    const sliderChildClass = ".slider-element__1";
    const sliderDotBtn__1 = $all(".slider_dot_btn_1");
    sliderDotBtn__1.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let pos = e.target.getAttribute("data-slide-number");
            changeSliderPosition(pos, sliderContainerClass, sliderChildClass);
            resetClassInDot(sliderDotBtn__1, pos, "active-dot");
        })
    })

    const sliderArrowBtn = $all(".testimonials-slider-btn");
    sliderArrowBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let btnFor = btn.getAttribute("data-btn-for");
            // grab position for active dot btn
            let pos = +$(".slider_dot_btn_1.active-dot").getAttribute("data-slide-number");
            // calculate position for change the current active dot
            let calculatePos = 0;
            let sliderMaxLength = $all(sliderChildClass).length - 1; // calculating max length based on the index like 0,1,2 (length is 2)

            if (btnFor == "next") {
                calculatePos = pos == sliderMaxLength ? 0 : pos + 1;
                changeSliderPosition(calculatePos, sliderContainerClass, sliderChildClass);
            } else if (btnFor == "previous") {
                calculatePos = pos == 0 ? sliderMaxLength : pos - 1;
                changeSliderPosition(calculatePos, sliderContainerClass, sliderChildClass);
            }

            resetClassInDot(sliderDotBtn__1, calculatePos, "active-dot");
        })
    })

    // hamburger click code
    const hamburger = $id("hamburger");
    hamburger.addEventListener("click", () => {
        $(".nav-links").classList.toggle("nav-links-show")
    })

}

document.readyState === "complete" ? init() : document.addEventListener("DOMContentLoaded", init);