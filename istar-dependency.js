import { ModelShapePath } from 'direwolf-modeler/model-shape-path';

export class IStarDependency extends ModelShapePath {

  constructor(id, createdLocally, pathArray = []) {
    super(id, createdLocally, pathArray);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    // add dependency label
    this.text = group.text('D').font({weight: 'bold', size: '16px'});

    this.redrawPath();

    return group;
  }

  get descriptiveName() {
    return `Dependency`;
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

        // calculate angle
        // kudos https://bl.ocks.org/shancarter/1034db3e675f2d3814e6006cf31dbfdc
        const source = {x: 1, y: 0};
        const compare = {x: (this._pathArray[1][0] - this._pathArray[0][0]), y: (this._pathArray[0][1]) - this._pathArray[1][1]};
        const a2 = Math.atan2(source.y, source.x);
        const a1 = Math.atan2(compare.y, compare.x);
        const sign = a1 > a2 ? 1 : -1;
        let angle = a1 - a2;
        const K = -sign * Math.PI * 2;
        angle = (Math.abs(K + angle) < Math.abs(angle))? K + angle : angle;
        let degree = Math.abs(Math.round(360 * angle / (Math.PI * 2)));
        degree = (angle < 0) ? (360 - degree) : degree;
        this.text.transform({rotate: (360 - degree)});
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
