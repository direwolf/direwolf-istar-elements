import { ModelShapeRect } from 'direwolf-modeler/model-shape-rect';
import {ShapeInfo} from 'kld-intersections';

export class IStarGoal extends ModelShapeRect {

  constructor(id, createdLocally, title = 'Goal') {
    super(id, createdLocally);

    this._title = title;
    this._minWidth = 100;
    this._minHeight = 50;
    this._width = 100;
    this._height = 50;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.rect.fill('#D1FEC7').radius(25);

    this.titleNode = group.text(this._title).font({'family': 'monospace'}).attr({'text-anchor': 'middle'}).cx(this._width / 2).cy(this._height / 2);

    return group;
  }

  get descriptiveName() {
    return `Goal`;
  }

  get properties() {
    return Object.assign(super.properties, {
      title: {
        type: String,
        multiline: true,
      }
    });
  }

  _resize() {
    let width = this.width;
    let height = this.height;
    this._updateTitle();
  }

  _updateTitle() {
    this.titleNode.text(this.title).cx(this.width / 2).cy(this.height / 2);
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

  getOuterShape(offset) {
    let shape = ShapeInfo.rectangle({x: (offset.x + this.x), y: (offset.y + this.y), width: this.width, height: this.height, rx: 25, ry: 25});
    return shape;
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
        case 'width':
          this._resize();
          break;
        case 'height':
          this._resize();
          break;
        case 'title':
          this._updateTitle();
          break;
      }
    });
  }

}
