import { IFMLAction } from 'direwolf-ifml-elements/ifml-action';

export class IStarTask extends IFMLAction {

  constructor(id, createdLocally, title = 'Task') {
    super(id, createdLocally, title);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.polygon.fill('#D1FEC7');

    return group;
  }

  /*
  get properties() {
    return Object.assign(super.properties, {

    });
  }

  _resize() {
    let diameter = this.diameter;
    this.titleNode.x(diameter / 2);
    this.titleNode.attr({y: ((diameter / 2) + 3)});
  }

  _updateTitle() {
    this.titleNode.plain(this.title).font({'family': 'monospace'}).attr({y:((this.diameter / 2) + 3), 'text-anchor': 'middle'}).x(this.diameter / 2);
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
  */


  /**
   * Direwolf-specific methods
   */

  sharedStateAvailable(sharedState) {
    super.sharedStateAvailable(sharedState);
  }

  handleSharedStateChanged(event) {
    super.handleSharedStateChanged(event);
  }

}
