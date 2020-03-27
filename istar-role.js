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
    return true;
  }

  _resize() {
    super._resize();

    // calculate the chord on top
    // thx to https://www.arndt-bruenner.de/mathe/scripts/kreissehnen.htm
    const alpha = 122.08995125628;
    const radius = this.diameter / 2;

    // length of the chord
    const s = 2 * radius * Math.sin((alpha * Math.PI / 180) / 2);
    const a = (2 * radius - Math.sqrt(4 * Math.pow(radius, 2) - Math.pow(s, 2))) / 2;
    const crossx1 = (this.diameter - s) / 2;
    const crossx2 = this.diameter - crossx1;
    const crossy = this.diameter - a;

    const curvex1 = (3/8) * this.diameter;
    const curvex2 = (5/8) * this.diameter;
    const curvey = radius + (6.5/8) * radius;

    const path = `M${Math.round(crossx1)},${Math.round(crossy)}C${Math.round(curvex1)},${Math.round(curvey)} ${Math.round(curvex2)},${Math.round(curvey)} ${Math.round(crossx2)},${Math.round(crossy)}`;
    this.bow.plot(path);
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
