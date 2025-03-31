document.lastScrollPosition = 0;
document.lastCentered = 0;
document.onWayTo = null;

document.addEventListener('scroll', () => {
    const sections = [...document.querySelectorAll('section')];
    const direction = window.pageYOffset - document.lastScrollPosition > 0 ? 'down' : 'up';

    if (document.onWayTo === null) {
        const currentSection = sections[document.lastCentered];
        const nextIndex = direction === 'down' ? document.lastCentered + 1 : document.lastCentered - 1;

        if (
            nextIndex >= 0 &&
            nextIndex < sections.length &&
            Math.abs(window.pageYOffset - currentSection.offsetTop) > currentSection.clientHeight / 2
        ) {
            document.onWayTo = nextIndex;
            window.scrollTo({ top: sections[nextIndex].offsetTop, behavior: 'smooth' });

            setTimeout(() => {
                document.onWayTo = null;
            }, 500); // Prevents immediate re-triggering
        }
    }

    sections.forEach((section, index) => {
        if (Math.abs(window.pageYOffset - section.offsetTop) < 5) {
            document.lastCentered = index;
            sections.forEach((s) => s.classList.remove('active'));
            section.classList.add('active');
        }
    });

    document.lastScrollPosition = window.pageYOffset;
});
