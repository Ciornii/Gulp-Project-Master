import calcScroll from './calcScroll';

export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('#close');
        this.scroll = calcScroll();
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${this.scroll}px`;

                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';

                    if (this.path !== btn.getAttribute('data-url')) {
                        this.path = btn.getAttribute('data-url');
                        this.player.loadVideoById({
                            videoId: this.path
                        });
                    }
                } else {
                    this.path = btn.getAttribute('data-url');
                    this.createPlayer(this.path);
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        });
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.overlay.style.display = "none";
                this.player.stopVideo();
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`
        });

        this.overlay.style.display = 'flex';
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}