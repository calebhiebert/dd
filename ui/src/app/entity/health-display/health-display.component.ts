import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {
  IHealth,
  IHealthPreset,
  HealthColorType
} from 'src/app/entity.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { FormControl } from '@angular/forms';
import { throttle, throttleTime } from 'rxjs/operators';

interface IBarStats {
  max: number;
  current: number;

  // Will be a value like: 30%
  percentCSS: string;

  // Will be a hex color code like: #ffffff
  colorCSS: string;
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
  SET
}

@Component({
  selector: 'dd-health-display',
  templateUrl: './health-display.component.html',
  styleUrls: ['./health-display.component.scss']
})
export class HealthDisplayComponent implements OnInit {
  @Input()
  public editable: boolean;

  @Input()
  public health: IHealth;

  @Input()
  public preset: IHealthPreset;

  @Output()
  public healthChange = new EventEmitter<IHealth>();

  @ViewChild('editmodal')
  public editModal: ModalComponent<IHealth>;

  @ViewChild('hpinput')
  public hpInput: ElementRef<HTMLInputElement>;

  public operationControl: FormControl;

  public sliderControl: FormControl;

  private operationRegex = /^(\+([0-9]+))|(-([0-9]+))|(\/([0-9]+))|(\*([0-9]+))|(\+\+)|([0-9]+)$/;

  constructor() {}

  ngOnInit() {
    this.operationControl = new FormControl(null);
    this.sliderControl = new FormControl(this.health.current);

    this.sliderControl.valueChanges.pipe(throttleTime(40)).subscribe(v => {
      this.updateOperationFromSliderValue(v);
    });
  }

  /**
   * Generates an operation from a slider value
   * @param v current slider value (corresponds to current hp)
   */
  private updateOperationFromSliderValue(v: any) {
    let operation = '';

    if (v === this.health.current) {
      operation = v;
    } else if (v < this.health.current) {
      operation = `-${this.health.current - v}`;
    } else if (v > this.health.current) {
      operation = `+${v - this.health.current}`;
    }

    this.operationControl.setValue(operation);
  }

  // Should only be called when the slider is released
  public onSliderChange(e) {
    // Wait for one tick so that the control value cannot overwrite
    // this one
    setTimeout(() => {
      this.updateOperationFromSliderValue(this.sliderControl.value);
    }, 1);
  }

  public editHP() {
    if (!this.editable) {
      return;
    }

    this.sliderControl.setValue(this.health.current);

    this.editModal.open().then(hp => {
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
      amount: 10
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
      set
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

  public trackBarElement(idx: number, element: IBarStats) {
    return idx.toString();
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
    let colorCSS;
    const hpPercent = (this.health.current / this.health.max) * 100;

    switch (this.preset.colorType) {
      case HealthColorType.DYNAMIC:
        if (hpPercent > 80) {
          colorCSS = '#64ad53';
        } else if (hpPercent > 60) {
          colorCSS = '#84bb47';
        } else if (hpPercent > 40) {
          colorCSS = '#d2ae2b';
        } else if (hpPercent > 20) {
          colorCSS = '#d86e54';
        } else {
          colorCSS = '#d8545b';
        }
        break;
      case HealthColorType.STATIC:
        colorCSS = this.preset.staticColor || '#5755d9';
        break;
    }

    return [
      {
        max: this.health.max,
        current: this.health.current,
        percentCSS: hpPercent.toFixed(2) + '%',
        colorCSS: colorCSS
      }
    ];
  }

  public get sliderTooltip() {
    return `${this.sliderControl.value}/${this.health.max}`;
  }
}
