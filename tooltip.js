class Tooltip extends HTMLElement {
    constructor() {
        super()
        this._tooltipContainer
        this._toolTipText = 'Default tooltip text.'
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            div {
                background-color: black;
                color: white;
                position: absolute;
                z-index: 10;
            }
        </style>
        <slot>Default slot text</slot>
        <span> (?)</span>
        `
    }

    connectedCallback() {
        if(this.hasAttribute('text')) {
            this._toolTipText = this.getAttribute('text')
        }
        const tooltipIcon = this.shadowRoot.querySelector('span')
        tooltipIcon.textContent = ' (?)'
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.shadowRoot.appendChild(tooltipIcon)
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