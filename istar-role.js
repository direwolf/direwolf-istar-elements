import { IStarActor } from './istar-actor';

export class IStarRole extends IStarActor {

  constructor(id, createdLocally, title = 'Role') {
    super(id, createdLocally, title);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.bow = group.path('M5,60C28,70 51,70 75,60').fill('none').stroke({ width: 1, color: 'black' });

    return group;
  }

  get descriptiveName() {
    return `Role`;
  }

  get resizable() {
    return false;
  }

  /*
  get properties() {
    return Object.assign(super.properties, {
      title: {
        type: String
      }
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
