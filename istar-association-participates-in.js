import { ModelShapePath } from 'direwolf-modeler/model-shape-path';

export class IStarAssociationParticipatesIn extends ModelShapePath {

  constructor(id, createdLocally, pathArray = []) {
    super(id, createdLocally, pathArray);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    // add arrow head
    this.path.marker('end', 15, 15, function(add) {
      add.polyline('0,0 5,3 0,6').fill('none').stroke({ width: 1, color: 'black' });
      this.ref(5, 3);
      this.size(25, 25);
    });

    // add relationship attribute
    this.text = group.text('participates-in');

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
