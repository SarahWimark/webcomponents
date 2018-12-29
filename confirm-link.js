class ConfirmLink extends HTMLAnchorElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.addEventListener('click', event => {
            if(!confirm('Do you really want to leave this page?')) {
                event.preventDefault()
            }
        })
    }
}

customElements.define('sw-confirm-link', ConfirmLink, { extends: 'a'})