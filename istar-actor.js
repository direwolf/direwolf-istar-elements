import { ModelShapeCircle } from 'direwolf-modeler/model-shape-circle.js';

export class IStarActor extends ModelShapeCircle {

  constructor(id, createdLocally, title = 'Actor') {
    super(id, createdLocally);

    this._title = title;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.circle.fill('#D1FEC7');

    this.titleNode = group.plain(this._title).font({'family': 'monospace'}).attr({y:((this._diameter / 2) + 3), 'text-anchor': 'middle'}).x(this._diameter / 2);

    return group;
  }

  get properties() {
    return Object.assign(super.properties, {
      title: {
        type: String
      }
    });
  }

  get resizable() {
    return false;
  }

  _resize() {
    let diameter = this.diameter;
    this.titleNode.x(diameter / 2);
    this.titleNode.attr({y: ((diameter / 2) + 3)});
  }

  _updateTitle() {
    this.titleNode.plain(this.title).font({'family': 'monospace'}).attr({y:((this.diameter / 2) + 3), 'text-anchor': 'middle'}).x(this.diameter / 2);
  }

  showPortOnHover() {
    return false;
  }

  acceptsChild(modelElementType) {
    return false;
  }

  modelElementDragOver(modelElementType) {
    return this.acceptsChild(modelElementType);
  }


  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);

    if (this._createdLocally && !this.title) {
      this.title = this._title;
    }

    this._updateTitle();
    this._resize();
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);

    event.keysChanged.forEach((key) => {
      switch (key) {
        case 'title':
          this._updateTitle();
          break;
        case 'diameter':
          this._resize();
          break;
      }
    });
  }

}
