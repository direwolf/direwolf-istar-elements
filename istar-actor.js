import { ModelShapeCircle } from 'direwolf-modeler/model-shape-circle.js';

export class IStarActor extends ModelShapeCircle {

  constructor(id, createdLocally, title = 'Actor') {
    super(id, createdLocally);

    this._title = title;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.circle.fill('#D1FEC7');

    this.titleNode = group.text(this._title).font({'family': 'monospace'}).attr({'text-anchor': 'middle'}).cx(this._diameter / 2).cy(this._diameter / 2);

    return group;
  }

  get properties() {
    return Object.assign(super.properties, {
      title: {
        type: String,
        multiline: true,
      }
    });
  }

  get descriptiveName() {
    return `Actor`;
  }

  get resizable() {
    return true;
  }

  _resize() {
    let diameter = this.diameter;
    this.circle.radius(diameter / 2);
    this.circle.x(0);
    this.circle.y(0);
    this._updateTitle();
  }

  _updateTitle() {
    this.titleNode.text(this.title).cx(this.diameter / 2).cy(this.diameter / 2);
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
