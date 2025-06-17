// on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    document
        .querySelectorAll('[data-callout-type="readaloud"], [data-callout-type="readaloud-serif"]')
        .forEach(el => {
            ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(pos => {
                const dot = document.createElement('span');
                dot.className = `corner-circle ${pos}`;
                el.appendChild(dot);
            });
        });
});

