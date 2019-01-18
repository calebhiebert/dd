import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IHealth } from 'src/app/entity.service';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'dd-health-display',
  templateUrl: './health-display.component.html',
  styleUrls: ['./health-display.component.css']
})
export class HealthDisplayComponent implements OnInit {
  @Input()
  public editable: boolean;

  @Input()
  public health: IHealth;

  @ViewChild('editmodal')
  public editModal: ModalComponent<IHPOperation>;

  constructor() {}

  ngOnInit() {}

  public editHP() {
    this.editModal.open().then(console.log);
  }

  public parseOperation(op: string) {
    const regex = /^(\+([0-9]+))|(-([0-9]+))|(\/([0-9]+))|(\*([0-9]+))|(\+\+)|([0-9]+)$/;

    console.log(regex.exec(op));
  }

  public get bars(): IBarStats[] {
    return [
      {
        max: this.health.max,
        current: this.health.current,
        percentCSS:
          ((this.health.current / this.health.max) * 100)
            .toFixed(2)
            .toString() + '%'
      }
    ];
  }
}

interface IBarStats {
  max: number;
  current: number;

  // Will be a value like: 30%
  percentCSS: string;
}

interface IHPOperation {
  type: HPOperation;
  amount: number;
}

enum HPOperation {
  ADD,
  SUBTRACT,
  DIVIDE,
  MULTIPLY,
  FILL,
  HALF,
  QUARTER
}
