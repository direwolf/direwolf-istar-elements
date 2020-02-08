import { ModelElement } from 'direwolf-modeler/model-element';
import {ShapeInfo} from 'kld-intersections';

export class IStarQuality extends ModelElement {

  constructor(id, createdLocally, title = 'Quality') {
    super(id, createdLocally);

    this._title = title;
    this._minWidth = 100;
    this._minHeight = 57;
    this._width = 100;
    this._height = 57;
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);
    group.addClass('model-node');

    this.path = group.path('m16.656634,0.924c1.065207,0.030606 2.192719,0 3.289079,0c7.690368,0.015303 13.389143,2.254479 20.199034,3.474356c6.718073,1.204575 14.500806,1.436308 22.083505,0.432313c8.539691,-1.127513 16.81759,-3.829607 23.95158,-2.60973c4.015431,0.694653 7.659762,2.640882 9.868331,5.652319c3.072649,4.200162 3.366141,10.470071 2.81031,16.291818c-0.539982,5.945811 -1.976836,11.39755 -3.983732,16.493492c-2.223872,5.635923 -5.158793,10.840626 -11.041753,13.249775c-4.447745,1.821619 -10.578286,2.068655 -15.5048,0.86408c-3.428447,-0.817624 -6.270456,-2.362693 -9.868331,-3.026193c-4.338983,-0.83402 -9.790722,-0.401161 -14.083796,0c-4.771843,0.431767 -8.138531,0.818717 -12.693944,1.29694c-5.63647,0.586438 -13.1115,1.31279 -18.562146,-0.431767c-7.428028,-2.393846 -11.103512,-9.404865 -11.983441,-16.941108c-0.757505,-6.501643 0.570588,-13.404993 2.995041,-19.380317c1.375095,-3.397841 3.104349,-6.502189 4.664174,-8.896036c1.776256,-2.717398 3.335535,-4.509504 7.860888,-6.469943z');
    this.path.fill('#D1FEC7');
    this.path.stroke({ width: 1, color: 'black' });
    this.titleNode = group.plain(this._title).font({'family': 'monospace'}).attr({y:((this._height / 2) + 3), 'text-anchor': 'middle'}).x(this._width / 2);

    return group;
  }

  get properties() {
    return Object.assign(super.properties, {
      x: {
        type: Number
      },
      y: {
        type: Number
      },
      height: {
        type: Number
      },
      width: {
        type: Number
      },
      title: {
        type: String
      }
    });
  }

  get resizable() {
    return false;
  }

  get minWidth() {
    return this._minWidth;
  }

  get minHeight() {
    return this._minHeight;
  }

  /*
  _resize() {
    let width = this.width;
    let height = this.height;
    this.titleNode.x(width / 2);
    this.titleNode.attr({y: ((height / 2) + 3)});
  }
  */

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

  getOuterShape(offset) {
    offset.x += this.x;
    offset.y += this.y;
    const shape = ShapeInfo.path('m' + offset.x + ',' + offset.y + ' ' + this.path.attr('d'));
    return shape;
  }


  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);

    if (this._createdLocally) {
      if (this.width === undefined) {
        this.width = this._width;
      }
      if (this.height === undefined) {
        this.height = this._height;
      }
      if (this.title === undefined) {
        this.title = this._title;
      }
    }

    this._updateTitle();

    this.element.transform({translateX: this.x, translateY: this.y});
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);

    event.keysChanged.forEach((key) => {
      switch (key) {
        case 'x':
          this.element.transform({translateX: event.target.get(key), translateY: this.y});
          break;
        case 'y':
          this.element.transform({translateX: this.x, translateY: event.target.get(key)});
          break;
        case 'title':
          this._updateTitle();
      }
    });
  }

}
