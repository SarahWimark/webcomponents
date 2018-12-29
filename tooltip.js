class Tooltip extends HTMLElement {
    constructor() {
        super()
        this._tooltipContainer
        this._tooltipIcon
        this._toolTipText = 'Default tooltip text.'
        this.attachShadow({
            mode: 'open'
        })
        this.shadowRoot.innerHTML = /*html*/ `
        <style>
            :host {
               background: green;
            }

            :host(.important) {
               background: var(--color-primary, #ccc);
            }

            :host-context(p) {
               background: blue;
            }

            div {
                background-color: black;
                color: white;
                position: absolute;
                z-index: 10;
                padding: 0.15rem;
                border-radius: 3px;
                box-shadow: 1px 1px 6px rgba(0,0,0,0.26);

            }

            ::slotted(.highlight) {
                border-bottom: 1px dotted black;
            }
        </style>
        <slot>Default slot text</slot>
        <span> (?)</span>
        `
    }

    static get observedAttributes() {
        return ['text']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text') {
            this._toolTipText = newValue
        }
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._toolTipText = this.getAttribute('text')
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span')
        this._tooltipIcon.textContent = ' (?)'
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip)
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip)
    }

    _render() {

    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div')
        this._tooltipContainer.textContent = this._toolTipText
        this.shadowRoot.appendChild(this._tooltipContainer)
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer)
    }
}

customElements.define('sw-tooltip', Tooltip)