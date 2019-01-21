import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { IHealth } from 'src/app/entity.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'dd-health-display',
  templateUrl: './health-display.component.html',
  styleUrls: ['./health-display.component.css'],
})
export class HealthDisplayComponent implements OnInit {
  @Input()
  public editable: boolean;

  @Input()
  public health: IHealth;

  @Output()
  public healthChange = new EventEmitter<IHealth>();

  @ViewChild('editmodal')
  public editModal: ModalComponent<IHealth>;

  @ViewChild('hpinput')
  public hpInput: ElementRef<HTMLInputElement>;

  public operationControl: FormControl;

  private operationRegex = /^(\+([0-9]+))|(-([0-9]+))|(\/([0-9]+))|(\*([0-9]+))|(\+\+)|([0-9]+)$/;

  constructor() {}

  ngOnInit() {
    this.operationControl = new FormControl(null);

    this.operationControl.valueChanges.subscribe((v) => this.parseOperation(v));
  }

  public editHP() {
    this.editModal.open().then((hp) => {
      if (hp !== null) {
        this.healthChange.emit(hp);
      }
    });

    setTimeout(() => {
      this.operationControl.reset();
      this.hpInput.nativeElement.focus();
    }, 1);
  }

  public submitEdit() {
    this.editModal.close(this.hpAfterOperation);
  }

  public parseOperation(op: string): IHPOperation {
    const matches = this.operationRegex.exec(op);

    if (matches === null) {
      return null;
    }

    const operation: IHPOperation = {
      type: HPOperation.ADD,
      amount: 10,
    };

    const [
      full,
      add,
      addValue,
      sub,
      subValue,
      div,
      divValue,
      mul,
      mulValue,
      fill,
      set,
    ] = matches;

    if (add) {
      (operation.type = HPOperation.ADD),
        (operation.amount = parseInt(addValue, 10));
    } else if (sub) {
      operation.type = HPOperation.SUBTRACT;
      operation.amount = parseInt(subValue, 10);
    } else if (div) {
      operation.type = HPOperation.DIVIDE;
      operation.amount = parseInt(divValue, 10);
    } else if (mul) {
      operation.type = HPOperation.MULTIPLY;
      operation.amount = parseInt(mulValue, 10);
    } else if (fill) {
      operation.type = HPOperation.FILL;
      operation.amount = 0;
    } else if (set) {
      operation.type = HPOperation.SET;
      operation.amount = parseInt(set, 10);
    }

    return operation;
  }

  public applyOperation(operation: IHPOperation, health: IHealth): IHealth {
    const newHealth: IHealth = { ...health };

    switch (operation.type) {
      case HPOperation.ADD:
        newHealth.current += operation.amount;
        break;
      case HPOperation.SUBTRACT:
        newHealth.current -= operation.amount;
        break;
      case HPOperation.SET:
        newHealth.current = operation.amount;
        break;
      case HPOperation.DIVIDE:
        newHealth.current = Math.round(newHealth.current / operation.amount);
        break;
      case HPOperation.MULTIPLY:
        newHealth.current = Math.round(newHealth.current * operation.amount);
        break;
      case HPOperation.FILL:
        newHealth.current = newHealth.max;
        break;
    }

    if (newHealth.current < 0) {
      newHealth.current = 0;
    } else if (newHealth.current > newHealth.max) {
      newHealth.current = newHealth.max;
    }

    return newHealth;
  }

  public get hpAfterOperation(): IHealth {
    if (!this.health || this.operationControl.invalid) {
      return null;
    }

    const operation = this.parseOperation(this.operationControl.value);

    if (operation === null) {
      return this.health;
    }

    return this.applyOperation(operation, this.health);
  }

  public get bars(): IBarStats[] {
    return [
      {
        max: this.health.max,
        current: this.health.current,
        percentCSS:
          ((this.health.current / this.health.max) * 100)
            .toFixed(2)
            .toString() + '%',
      },
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
  SET,
}