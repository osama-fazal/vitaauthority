document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.rSlider');
    const boxes = document.querySelectorAll('.box');
    const boxWidth = boxes[0].offsetWidth;
    const totalBoxes = boxes.length;
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;

    function updateSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function dragStart(event) {
        isDragging = true;
        startPosition = event.clientX - slider.offsetLeft;
    }

    function dragEnd() {
        isDragging = false;
    }

    function drag(event) {
        if (!isDragging) return;

        event.preventDefault();

        const currentPosition = event.clientX - slider.offsetLeft;
        const diff = currentPosition - startPosition;
        currentTranslate = currentTranslate + diff;

        // Restrict sliding beyond limits
        currentTranslate = Math.max(-1 * (totalBoxes - 3) * boxWidth, Math.min(0, currentTranslate));

        updateSliderPosition();

        startPosition = currentPosition;
    }

    function moveSlider(direction) {
        if (direction === 'left') {
            currentTranslate = Math.min(0, currentTranslate + boxWidth);
        } else {
            currentTranslate = Math.max(-1 * (totalBoxes - 3) * boxWidth, currentTranslate - boxWidth);
        }

        updateSliderPosition();
    }

    document.querySelector('.leftButton').addEventListener('click', function () {
        moveSlider('left');
    });

    document.querySelector('.rightButton').addEventListener('click', function () {
        moveSlider('right');
    });

    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);
    slider.addEventListener('mousemove', drag);
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
