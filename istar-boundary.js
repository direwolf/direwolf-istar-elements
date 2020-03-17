import { ModelShapeCircle } from 'direwolf-modeler/model-shape-circle.js';

export class IStarBoundary extends ModelShapeCircle {

  constructor(id, createdLocally) {
    super(id, createdLocally);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.circle.fill('#E6E6E6').stroke({dasharray: '11.26,6.76'});

    return group;
  }

  get descriptiveName() {
    return `Boundary`;
  }

  get properties() {
    return Object.assign(super.properties, {
    });
  }

  get resizable() {
    return true;
  }

  _resize() {
    let diameter = this.diameter;
    this.circle.radius(diameter / 2);
    this.circle.x(0);
    this.circle.y(0);
  }

  showPortOnHover() {
    return false;
  }

  acceptsChild(modelElementType) {
    return true;
  }

  modelElementDragOver(modelElementType) {
    if (modelElementType) {
      if (this.acceptsChild(modelElementType)) {
        this.circle.stroke({width: 2.5, color: 'red'});
      }
    } else {
      this.circle.stroke({width: 1, color: 'black'});
    }
  }


  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);

    this._resize();
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);

    event.keysChanged.forEach((key) => {
      switch (key) {
        case 'diameter':
          this._resize();
          break;
      }
    });
  }

}
