document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".movable-image");

    // Connect to the WebSocket server
    const socket = io('https://jdrmap.glitch.me');

    // Function to handle dragging for an image
    function handleDragging(image) {
        let isDragging = false;
        let offsetX, offsetY;

        image.addEventListener("mousedown", function (e) {
            isDragging = true;
            offsetX = e.clientX - image.getBoundingClientRect().left;
            offsetY = e.clientY - image.getBoundingClientRect().top;
            image.style.cursor = "grabbing";

            // Notify the server that an image is being dragged
            socket.emit('moveImage', { 
                id: image.id, // Assuming each image has a unique ID
                startX: e.clientX,
                startY: e.clientY
            });
        });

        document.addEventListener("mousemove", function (e) {
            if (isDragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;

                image.style.position = "absolute";
                image.style.left = `${x}px`;
                image.style.top = `${y}px`;

                // Notify the server about the updated position
                socket.emit('moveImage', { 
                    id: image.id, // Assuming each image has a unique ID
                    x,
                    y
                });
            }
        });

        document.addEventListener("mouseup", function () {
            isDragging = false;
            image.style.cursor = "grab";
        });
    }

    // Apply dragging for all images
    images.forEach(handleDragging);

    // Listen for updates from the server and move images accordingly
    socket.on('updateImage', function (data) {
        const movedImage = document.getElementById(data.id);

        if (movedImage) {
            movedImage.style.left = `${data.x}px`;
            movedImage.style.top = `${data.y}px`;
        }
    });
});
