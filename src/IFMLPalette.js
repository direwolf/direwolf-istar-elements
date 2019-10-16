import { html, css, LitElement } from 'lit-element';

import '../ifml-action.js';
import '../ifml-data-flow.js';
import '../ifml-event.js';
import '../ifml-navigation-flow.js';
import '../ifml-view-component.js';
import '../ifml-view-component-form.js';
import '../ifml-view-component-list.js';
import { IFMLViewContainer } from '../ifml-view-container.js';

/**
 * `ifml-palette`
 *
 *
 * @customElement ifml-palette
 * @demo demo/index.html
 */
export default class IFMLPalette extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        /*@apply(--layout-vertical);
        @apply(--layout-center);*/
        margin-top: 10px;
      }

      #title {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 12px;
      }

      .item {
        display: inline-block;
        cursor: move;
        margin-top: 10px;
      }

      svg text {
        /* do not show text cursor when hovering */
        pointer-events: none;
        /* deactivate selection when dragging */
        user-select: none;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'IFML Elements';
  }

  render() {
    return html`
      <div id="title">${this.title}</div>

      <div id="palette-event" class="item"
        @touchmove=${this._handleTouchMove}
        draggable="true"
        @dragstart=${this._handleDragStart}
        @dragend=${this._handleDragEnd}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <g class="model-node">
            <circle r="10" fill="white" cx="10" cy="10" stroke="black" stroke-width="1"></circle>
          </g>
        </svg>
      </div>

      <div class="item" on-track="_handleTrack" id="palette-view-container"
        @touchmove=${this._handleTouchMove}
        draggable="true"
        @dragstart=${this._handleDragStart}
        @dragend=${this._handleDragEnd}>
        <svg xmlns="http://www.w3.org/2000/svg" width="156" height="126">
          <g class="model-node">
            <rect width="156" height="126" fill="white" stroke="black" stroke-width="1"></rect>
            <text x="7" y="15" font-family="monospace">View Container</text>
            <line x1="0" y1="23" x2="156" y2="23" stroke="black" stroke-width="1" shape-rendering="crispEdges"></line>
          </g>
        </svg>
      </div>

      <div class="item" on-track="_handleTrack" id="palette-action">
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="40">
          <g class="model-node">
            <polygon points="10,0 0,20 10,40 60,40 70,20 60,0" fill="lightgray" stroke="#000000" stroke-width="1" height="134"></polygon>
            <text font-family="monospace" family="monospace" y="23" text-anchor="middle" x="35">Action</text>
          </g>
        </svg>
      </div>

      <div class="item" on-track="_handleTrack" id="palette-view-component">
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="80">
          <g class="model-element model-node">
            <rect width="150" height="80" fill="lightgray" stroke="black" stroke-width="1" rx="15" ry="15"></rect>
            <text font-family="monospace" family="monospace" y="43" text-anchor="middle" x="75">View Component</text>
          </g>

        </svg>
      </div>

      <div class="item" on-track="_handleTrack" id="palette-view-component-form">
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="80">
          <g class="model-element model-node">
            <rect width="150" height="80" fill="lightgray" stroke="black" stroke-width="1" rx="15" ry="15"></rect>
            <text font-family="monospace" family="monospace" y="45" text-anchor="middle" x="75">«Form»</text>
          </g>

        </svg>
      </div>

      <div class="item" on-track="_handleTrack" id="palette-view-component-list">
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="80">
          <g class="model-element model-node">
            <rect width="150" height="80" fill="lightgray" stroke="black" stroke-width="1" rx="15" ry="15"></rect>
            <text font-family="monospace" family="monospace" y="25" text-anchor="middle" x="75">«List»</text>

            <g transform="matrix(1,0,0,1,25,40)">
              <rect width="100" height="23" stroke="black" stroke-width="0.5" fill="white"></rect>
              <text font-family="monospace" font-size="11" color="gray" family="monospace" size="11" y="14.5" text-anchor="middle" x="50">
                «DataBinding»
              </text>
            </g>
          </g>

        </svg>
      </div>
    `;
  }

  _handleTouchMove(e) {
    const clientRect = e.currentTarget.getBoundingClientRect();
    let detail = {};
    detail.offsetX = e.targetTouches[0].clientX - clientRect.left;
    detail.offsetY = e.targetTouches[0].clientY - clientRect.top;
    detail.type = e.currentTarget.id.substr(8);

    this.dispatchEvent(new CustomEvent('dragitemstart', {detail: detail}));
  }

  _handleDragStart(e) {
    console.log('dragstart');
    var img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    e.dataTransfer.setDragImage(img, 0, 0);

    let detail = {};
    detail.offsetX = e.offsetX;
    detail.offsetY = e.offsetY;
    detail.type = e.currentTarget.id.substr(8);
    e.dataTransfer.setData('direwolf/model', JSON.stringify(detail));

    this.dispatchEvent(new CustomEvent('dragitemstart', {detail: detail}));
  }

  _handleDragEnd(e) {
    console.log('dragend');
    let detail = {};
    detail.x = e.detail.x;
    detail.y = e.detail.y;
    //this.dispatchEvent(new CustomEvent('dragitemend', {detail: detail}));
  }

}
