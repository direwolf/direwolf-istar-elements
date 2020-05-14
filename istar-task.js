import { ModelShapeHexagon } from 'direwolf-modeler/model-shape-hexagon';

export class IStarTask extends ModelShapeHexagon {

  constructor(id, createdLocally, title = 'Task') {
    super(id, createdLocally, title);

    this._title = title;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.polygon.fill('#D1FEC7');

    this.titleNode = group.text(this._title).font({'family': 'monospace'}).attr({'text-anchor': 'middle'}).cx(this._width / 2).cy(this._height / 2);

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
    return `Task`;
  }

  _resize() {
    super._resize();

    const width = this.width;
    const height = this.height;
    const title = this.title;

    // a resize only makes sense if both width and height are already defined...
    if (width && height && title) {
      this._updateTitle();
    }
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


  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);

    if (this._createdLocally && !this.title) {
      this.title = this._title;
    }

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
