import { ModelShapeHexagon } from 'direwolf-modeler/model-shape-hexagon';

export class IStarTask extends ModelShapeHexagon {

  constructor(id, createdLocally, title = 'Task') {
    super(id, createdLocally, title);

    this._title = title;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.polygon.fill('#D1FEC7');

    this.titleNode = group.plain(this._title).font({'family': 'monospace'}).attr({y:((this._height / 2) + 3), 'text-anchor': 'middle'}).x(this._width / 2);

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
    const width = this.width;
    const height = this.height;

    // a resize only makes sense if both width and height are already defined...
    if (width && height) {
      this.titleNode.x(width / 2);
      this.titleNode.attr({y: ((height / 2) + 3)});
    }
  }

  _updateTitle() {
    this.titleNode.plain(this.title).font({'family': 'monospace'}).attr({y:((this.height / 2) + 3), 'text-anchor': 'middle'}).x(this.width / 2);
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
          break;
      }
    });
  }

}
