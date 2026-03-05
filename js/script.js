// Grain and light effect on mockup cards
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".mockup-card");

    cards.forEach((card) => {
        card.addEventListener("mousemove", function (e) {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty("--mouse-x", `${x}%`);
            card.style.setProperty("--mouse-y", `${y}%`);
        });
    });
});

// Interactive Demo: Drag & Drop
(function () {
    const draggableFile = document.getElementById("draggableFile");
    const dropZone = document.getElementById("dropZone");
    const initialState = document.getElementById("initialState");
    const timelineState = document.getElementById("timelineState");
    const resetBtn = document.getElementById("resetDemo");

    // Drag events
    draggableFile.addEventListener("dragstart", (e) => {
        e.dataTransfer.effectAllowed = "move";
        draggableFile.style.opacity = "0.5";
    });

    draggableFile.addEventListener("dragend", (e) => {
        draggableFile.style.opacity = "1";
    });

    // Drop zone events
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        dropZone.classList.add("drop-zone-active");
    });

    dropZone.addEventListener("dragleave", (e) => {
        dropZone.classList.remove("drop-zone-active");
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("drop-zone-active");

        // Transition to timeline
        initialState.style.opacity = "0";
        initialState.style.transform = "scale(0.95)";

        setTimeout(() => {
            initialState.classList.add("hidden");
            timelineState.classList.remove("hidden");

            // Fade in timeline
            setTimeout(() => {
                timelineState.style.opacity = "1";

                // Animate timeline items
                const items = timelineState.querySelectorAll(".timeline-item");
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add("timeline-item-animate");
                    }, index * 150);
                });
            }, 50);
        }, 300);
    });

    // Reset demo
    resetBtn.addEventListener("click", () => {
        // Hide timeline
        timelineState.style.opacity = "0";

        setTimeout(() => {
            timelineState.classList.add("hidden");

            // Reset timeline items
            const items = timelineState.querySelectorAll(".timeline-item");
            items.forEach((item) => {
                item.classList.remove("timeline-item-animate");
            });

            // Show initial state
            initialState.classList.remove("hidden");
            initialState.style.opacity = "1";
            initialState.style.transform = "scale(1)";
        }, 300);
    });
})();

// OS Detection for download button
function detectOS() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const downloadText = document.getElementById("download-text");

    if (downloadText) {
        if (userAgent.indexOf("win") > -1) {
            downloadText.textContent = "Get ZenTxt for Windows";
        } else if (userAgent.indexOf("linux") > -1) {
            downloadText.textContent = "Get ZenTxt for Linux";
        } else if (userAgent.indexOf("mac") > -1) {
            downloadText.textContent = "Get ZenTxt for macOS";
        } else {
            downloadText.textContent = "Get ZenTxt";
        }
    }
}

detectOS();

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
        }
    });
}, observerOptions);

document.querySelectorAll(".scroll-reveal").forEach((el) => {
    observer.observe(el);
});
