export class SelectedParts {
  constructor(data = {}) {
    this.cpu = data.cpu || null;
    this.mainboard = data.mainboard || null;
    this.ram = data.ram || null;
    this.hdd = data.hdd || null;
    this.ssd = data.ssd || null;
    this.gpu = data.gpu || null;
    this.psu = data.psu || null;
    this.case = data.case || null;
    this.cooler = data.cooler || null;
    this.monitor = data.monitor || null;
    this.headphone = data.headphone || null;
    this.keyboard = data.keyboard || null;
    this.mouse = data.mouse || null;
    this.speaker = data.speaker || null;
  }
}

export const INITIAL_SELECTED = new SelectedParts();
