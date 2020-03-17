import { ModelShapePath } from 'direwolf-modeler/model-shape-path';

export class IStarRefinementOr extends ModelShapePath {

  constructor(id, createdLocally, pathArray = []) {
    super(id, createdLocally, pathArray);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.path.marker('end', 15, 15, function(add) {
      add.path('M0,0 L0,6 L9,3 z').attr({
        markerUnits: 'strokeWidth',
        orient: 'auto'
      });
      this.ref(8, 3);
      this.size(25, 25);
    });

    return group;
  }

  get descriptiveName() {
    return `Or-Refinement`;
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
