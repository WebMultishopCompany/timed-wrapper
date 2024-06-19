document.addEventListener('DOMContentLoaded', function() {
    if (typeof wp === 'undefined' || !wp.blockEditor) {
        const blocks = document.querySelectorAll('.timed-wrapper');
        blocks.forEach(block => {
            const start = block.dataset.start ? new Date(block.dataset.start).getTime() : null;
            const end = block.dataset.end ? new Date(block.dataset.end).getTime() : null;
            const now = new Date().getTime();

            if ((start && now < start) || (end && now > end)) {
                block.style.display = 'none';
            } else {
                block.style.display = 'block';
            }
        });
    }
});
