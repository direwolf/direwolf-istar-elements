import { ModelShapePath } from 'direwolf-modeler/model-shape-path';

export class IStarRelationshipNeededBy extends ModelShapePath {

  constructor(id, createdLocally, pathArray = []) {
    super(id, createdLocally, pathArray);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.path.marker('end', 15, 15, function(add) {
      add.circle(8);
      this.ref(8,4);
    });

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
