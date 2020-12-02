export class LazyLoadingImg {

    onSCrollShow;
    onDestroyEvent;

    constructor(anchor) {
        // On scroll reveal sections
        let options = {
            root: null,
            rootMargin: "0px 0px -20px 0px",
            threshold: [0, 0.8]
        };
        
        this.onSCrollShow = () => {
            // Observe on scroll and show element in the middle of the screen
            const onIntersection = (entries) => {
                entries.forEach(entry => {
                // Are we in viewport?
                if (entry.intersectionRatio > 0) {
                    
                    if (entry.target.classList.contains("parralax")) {
                        entry.target.classList.add('overlay-parralax-animation');
                    }
                    if (entry.target.classList.contains("anchor-img")) {
                        const img = entry.target.firstElementChild;
                        const src = img.getAttribute('data-src');
                        img.setAttribute('src', src);
                    } 
                    if ((entry.target.classList.contains("has")) && (window.innerWidth > 700)) {
                        entry.target.firstElementChild.classList.add('overlay-img-animation');
                        entry.target.lastElementChild.classList.add('inner-content-after');
                    }
                    
                }
                observer.unobserve(entry.target);     
                });
            }
            
            let observer = new IntersectionObserver(onIntersection, options);
            anchor.forEach(element => {
                observer.observe(element);
            });
        }
        window.addEventListener('scroll', this.onSCrollShow, {passive: true});
        window.addEventListener('mouseover', this.onSCrollShow);
        // // touch events
        window.addEventListener('touchmove', this.onSCrollShow);

        this.onDestroyEvent = () => {
            window.removeEventListener('scroll', this.onSCrollShow);
            window.removeEventListener('mouseover', this.onSCrollShow);
            window.removeEventListener('touchmove', this.onSCrollShow);
        }
    }
};