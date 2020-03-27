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

  get descriptiveName() {
    return `Agent`;
  }

  get resizable() {
    return true;
  }

  _resize() {
    super._resize();

    // calculate the chord on top
    // thx to https://www.arndt-bruenner.de/mathe/scripts/kreissehnen.htm
    const alpha = 97.180755781458;
    const radius = this.diameter / 2;

    // length of the chord
    const s = 2 * radius * Math.sin((alpha * Math.PI / 180) / 2);
    const a = (2 * radius - Math.sqrt(4 * Math.pow(radius, 2) - Math.pow(s, 2))) / 2;
    const crossx = (this.diameter - s) / 2;

    const path = `M${Math.round(crossx)},${Math.round(a)}l${Math.round(s)},0`;
    this.dash.plot(path);
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
