document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".movable-image");

    // Function to handle dragging for an image
    function handleDragging(image) {
        let isDragging = false;
        let offsetX, offsetY;

        image.addEventListener("mousedown", function (e) {
            isDragging = true;
            offsetX = e.clientX - image.getBoundingClientRect().left;
            offsetY = e.clientY - image.getBoundingClientRect().top;
            image.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", function (e) {
            if (isDragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;

                image.style.position = "absolute";
                image.style.left = `${x}px`;
                image.style.top = `${y}px`;
            }
        });

        document.addEventListener("mouseup", function () {
            isDragging = false;
            image.style.cursor = "grab";
        });
    }

    // Apply dragging for all images
    images.forEach(handleDragging);
});
