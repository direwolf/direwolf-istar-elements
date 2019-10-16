import { ModelShapePath } from 'direwolf-modeler/model-shape-path';

export class IStarQualification extends ModelShapePath {

  constructor(id, createdLocally, pathArray = []) {
    super(id, createdLocally, pathArray);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.path.stroke({dasharray: '11.26,6.76'});

    return group;
  }

  get properties() {
    return Object.assign(super.properties, {
    });
  }


  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);

    if (this._createdLocally) {

    }
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);
  }

}
