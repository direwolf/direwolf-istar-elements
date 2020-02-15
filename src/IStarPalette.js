import { html, css, LitElement } from 'lit-element';
import { GestureEventListeners } from 'direwolf-modeler/src/utils/gesture-event-listeners.js';
import * as Gestures from 'direwolf-modeler/src/utils/gestures.js';

import { IStarActor } from '../istar-actor';
import { IStarRole } from '../istar-role';
import { IStarAgent } from '../istar-agent';
import { IStarBoundary } from '../istar-boundary';
import { IStarGoal } from '../istar-goal';
import { IStarQuality } from '../istar-quality';
import { IStarTask } from '../istar-task';
import { IStarResource } from '../istar-resource';
import { IStarRefinementAnd } from '../istar-refinement-and';
import { IStarRefinementOr } from '../istar-refinement-or';
import { IStarAssociationIsA } from '../istar-association-is-a';
import { IStarAssociationParticipatesIn } from '../istar-association-participates-in';
import { IStarRelationshipNeededBy } from '../istar-relationship-needed-by';
import { IStarDependency } from '../istar-dependency';
import { IStarContribution } from '../istar-contribution';
import { IStarQualification } from '../istar-qualification';

import { SVG } from '@svgdotjs/svg.js'

/**
 * `istar-palette`
 *
 *
 * @customElement istar-palette
 * @demo demo/index.html
 */
export default class IStarPalette extends GestureEventListeners(LitElement) {

  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'iStar 2.0';
  }

  static get styles() {
    return css`
     :host {
        display: block;
      }

      #title {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 12px;
      }

      #palette-items {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .item {
        display: inline-block;
        cursor: move;
        margin-top: 10px;
      }

      #title, svg text {
        /* do not show text cursor when hovering */
        pointer-events: none;
        /* deactivate selection when dragging */
        user-select: none;
      }
    `;
  }

  render() {
    return html`
      <div id="title">${this.title}</div>

      <div id="palette-items">
      </div>
    `;
  }

  firstUpdated(changedProperties) {
    let paletteItems = this.shadowRoot.getElementById('palette-items');

    let actor = this._createNodeElement('istar-actor', IStarActor, '80px', '80px');
    paletteItems.appendChild(actor);

    let role = this._createNodeElement('istar-role', IStarRole, '80px', '80px');
    paletteItems.appendChild(role);

    let agent = this._createNodeElement('istar-agent', IStarAgent, '80px', '80px');
    paletteItems.appendChild(agent);

    let boundary = this._createNodeElement('istar-boundary', IStarBoundary, '80px', '80px');
    paletteItems.appendChild(boundary);

    let goal = this._createNodeElement('istar-goal', IStarGoal, '100px', '50px');
    paletteItems.appendChild(goal);

    let quality = this._createNodeElement('istar-quality', IStarQuality, '100px', '57px');
    paletteItems.appendChild(quality);

    let task = this._createNodeElement('istar-task', IStarTask, '70px', '40px');
    paletteItems.appendChild(task);

    let resource = this._createNodeElement('istar-resource', IStarResource, '100px', '50px');
    paletteItems.appendChild(resource);

    let refinementAnd = this._createEdgeElement('istar-refinement-and', IStarRefinementAnd, '100px', '30px');
    paletteItems.appendChild(refinementAnd);

    let refinementOr = this._createEdgeElement('istar-refinement-or', IStarRefinementOr, '100px', '30px');
    paletteItems.appendChild(refinementOr);

    let associationIsA = this._createEdgeElement('istar-association-is-a', IStarAssociationIsA, '100px', '30px');
    paletteItems.appendChild(associationIsA);

    let associationParticipatesIn = this._createEdgeElement('istar-association-participates-in', IStarAssociationParticipatesIn, '100px', '30px');
    paletteItems.appendChild(associationParticipatesIn);

    let relationshipNeededBy = this._createEdgeElement('istar-relationship-needed-by', IStarRelationshipNeededBy, '100px', '30px');
    paletteItems.appendChild(relationshipNeededBy);

    let dependency = this._createEdgeElement('istar-dependency', IStarDependency, '100px', '30px');
    paletteItems.appendChild(dependency);

    let contribution = this._createEdgeElement('istar-contribution', IStarContribution, '100px', '30px');
    paletteItems.appendChild(contribution);

    let qualification = this._createEdgeElement('istar-qualification', IStarQualification, '100px', '30px');
    paletteItems.appendChild(qualification);
  }

  _createNodeElement(elementType, classType, width, height) {
    let div = document.createElement('div');
    div.classList.add('item');
    div.dataset.type = elementType;
    let drawing = SVG(div).size(width, height);

    let node = new classType();
    node.createSVGElement(drawing);

    Gestures.addListener(div, 'track', e => this._handleTrack(e));

    return div;
  }

  _createEdgeElement(elementType, classType, width, height) {
    let div = document.createElement('div');
    div.classList.add('item');
    div.dataset.type = elementType;
    let drawing = SVG(div).size(width, height);

    let edge = new classType(null, true, [[0,15], [100,15]]);
    edge.createSVGElement(drawing);

    div.addEventListener('click', this._handleClick);

    return div;
  }

  _handleTrack(e) {
    if (e.detail.state === 'start') {
      let detail = {};
      detail.x = e.detail.x;
      detail.y = e.detail.y;

      // get where the dragged element was touched
      let clientRect = e.currentTarget.getBoundingClientRect();
      detail.offsetX = e.detail.x -  clientRect.left;
      detail.offsetY = e.detail.y -  clientRect.top;

      detail.type = e.currentTarget.dataset.type;
      detail.title = e.currentTarget.dataset.title;

      this.dispatchEvent(new CustomEvent('dragitemstart', {detail: detail}));
    } else if (e.detail.state === 'track') {
      let detail = {};
      detail.x = e.detail.x;
      detail.y = e.detail.y;
      this.dispatchEvent(new CustomEvent('dragitemtrack', {detail: detail}));
    } else if (e.detail.state === 'end') {
      let detail = {};
      detail.x = e.detail.x;
      detail.y = e.detail.y;
      this.dispatchEvent(new CustomEvent('dragitemend', {detail: detail}));
    }
  }

  _handleClick(e) {
    let detail = {};
    detail.type = e.currentTarget.dataset.type;
    this.dispatchEvent(new CustomEvent('itemclick', {detail: detail, bubbles: true, composed: true}));
  }

}
