import { ModelShapePath } from 'direwolf-modeler/model-shape-path';

export class IStarDependency extends ModelShapePath {

  constructor(id, createdLocally, pathArray = []) {
    super(id, createdLocally, pathArray);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    // add dependency label
    this.text = group.text('D').font({weight: 'bold', size: '16px'});

    return group;
  }

  get properties() {
    return Object.assign(super.properties, {
    });
  }

  redrawPath() {
    super.redrawPath();

    if (this._pathArray && (this._pathArray.length > 0)) {
      let mid = this._midPoint(this._pathArray[0], this._pathArray[1]);
      if (this.text) {
        this.text.cx(mid[0]);
        this.text.cy(mid[1]);
      }
    }
  }

  _midPoint(start, end) {
    // kudos https://stackoverflow.com/questions/43920474/svg-js-line-marker-mid/44010722
    return [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2
    ];
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
