import { ModelShapeRect } from 'direwolf-modeler/model-shape-rect';

export class IStarResource extends ModelShapeRect {

  constructor(id, createdLocally, title = 'Resource') {
    super(id, createdLocally);

    this._title = title;
    this._minWidth = 100;
    this._minHeight = 50;
    this._width = 100;
    this._height = 50;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.rect.fill('#D1FEC7');

    this.titleNode = group.plain(this._title).font({'family': 'monospace'}).attr({y:((this._height / 2) + 3), 'text-anchor': 'middle'}).cx(this._width / 2);

    return group;
  }

  get properties() {
    return Object.assign(super.properties, {
      title: {
        type: String
      }
    });
  }

  _resize() {
    let width = this.width;
    let height = this.height;
    this.titleNode.cx(width / 2);
    this.titleNode.attr({y: ((height / 2) + 3)});
  }

  _updateTitle() {
    this.titleNode.plain(this.title).font({'family': 'monospace'}).attr({y:((this.height / 2) + 3), 'text-anchor': 'middle'}).cx(this.width / 2);
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
        case 'width':
          this._resize();
          break;
        case 'height':
          this._resize();
          break;
        case 'title':
            this._updateTitle();
      }
    });
  }

}
