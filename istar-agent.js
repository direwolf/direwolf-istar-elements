import { IStarActor } from './istar-actor';

export class IStarAgent extends IStarActor {

  constructor(id, createdLocally, title = 'Agent') {
    super(id, createdLocally, title);
  }

  createSVGElement(viewport) {
    let group = super.createSVGElement(viewport);

    this.dash = group.path('M10,14l60,0').stroke({ width: 1, color: 'black' });

    return group;
  }

  get resizable() {
    return false;
  }


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
