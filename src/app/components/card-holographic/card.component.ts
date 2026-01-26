import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
})
export class CardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardWrapper') cardWrapper!: ElementRef<HTMLElement>;
  @ViewChild('card') card!: ElementRef<HTMLElement>;

  private easer: { cancel: () => void } | null = null;
  private halfW = 0;
  private halfH = 0;

  ngAfterViewInit(): void {
    this.initCard();
  }

  ngOnDestroy(): void {
    if (this.easer) {
      this.easer.cancel();
    }
    this.removeEventListeners();
  }

  private initCard(): void {
    const wrap = this.cardWrapper.nativeElement;
    const card = this.card.nativeElement;

    this.halfW = wrap.clientWidth / 2;
    this.halfH = wrap.clientHeight / 2;

    // Add event listeners
    card.addEventListener('pointerenter', this.onPointerEnter);
    card.addEventListener('pointermove', this.onPointerMove);
    card.addEventListener('pointerout', this.onPointerOut);

    // Initial animation
    this.cardUpdate({ offsetX: wrap.clientWidth - 70, offsetY: 60 });

    setTimeout(() => {
      this.easer = this.easedFunc(
        3000,
        (p) => {
          const x = this.adjust(p, 0, 1, wrap.clientWidth - 70, this.halfW);
          const y = this.adjust(p, 0, 1, 60, this.halfH);
          this.cardUpdate({ offsetX: x, offsetY: y });
        },
        () => {
          card.classList.remove('active');
          wrap.classList.remove('active');
        }
      );
    }, 1000);
  }

  private removeEventListeners(): void {
    const card = this.card?.nativeElement;
    if (card) {
      card.removeEventListener('pointerenter', this.onPointerEnter);
      card.removeEventListener('pointermove', this.onPointerMove);
      card.removeEventListener('pointerout', this.onPointerOut);
    }
  }

  private onPointerEnter = (): void => {
    if (this.easer) {
      this.easer.cancel();
    }
  };

  private onPointerMove = (e: PointerEvent): void => {
    this.cardUpdate(e);
  };

  private onPointerOut = (e: PointerEvent): void => {
    const wrap = this.cardWrapper.nativeElement;
    const card = this.card.nativeElement;

    this.easer = this.easedFunc(
      1000,
      (p) => {
        const x = this.adjust(p, 0, 1, e.offsetX, this.halfW);
        const y = this.adjust(p, 0, 1, e.offsetY, this.halfH);
        this.cardUpdate({ offsetX: x, offsetY: y });
      },
      () => {
        card.classList.remove('active');
        wrap.classList.remove('active');
      }
    );
  };

  private cardUpdate(e: { offsetX: number; offsetY: number }): void {
    const wrap = this.cardWrapper.nativeElement;
    const card = this.card.nativeElement;

    const pos = [e.offsetX, e.offsetY];
    const dimensions = card.getBoundingClientRect();

    const l = pos[0];
    const t = pos[1];
    const h = dimensions.height;
    const w = dimensions.width;
    const px = this.clamp(Math.abs((100 / w) * l), 0, 100);
    const py = this.clamp(Math.abs((100 / h) * t), 0, 100);
    const cx = px - 50;
    const cy = py - 50;

    wrap.setAttribute(
      'style',
      `
        --pointer-x: ${px}%;
        --pointer-y: ${py}%;
        --background-x: ${this.adjust(px, 0, 100, 35, 65)}%;
        --background-y: ${this.adjust(py, 0, 100, 35, 65)}%;
        --pointer-from-center: ${this.clamp(
          Math.sqrt((py - 50) * (py - 50) + (px - 50) * (px - 50)) / 50,
          0,
          1
        )};
        --pointer-from-top: ${py / 100};
        --pointer-from-left: ${px / 100};
        --rotate-x: ${this.round(-(cx / 5))}deg;
        --rotate-y: ${this.round(cy / 4)}deg;
      `
    );
  }

  private ease(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  private easedFunc(
    durationMs: number,
    onProgress: (progress: number) => void,
    onComplete?: () => void
  ): { cancel: () => void } {
    const startTime = performance.now();
    let canceled = false;

    const loop = (): void => {
      if (canceled) return;
      const currentTime = performance.now();
      const progress = (currentTime - startTime) / durationMs;
      const easedProgress = this.ease(progress);
      onProgress(easedProgress);
      if (progress < 1) {
        requestAnimationFrame(loop);
      } else {
        if (onComplete) onComplete();
      }
    };

    loop();

    return {
      cancel: () => {
        canceled = true;
      },
    };
  }

  /**
   * Return a value that has been rounded to a set precision
   */
  private round(value: number, precision = 3): number {
    return parseFloat(value.toFixed(precision));
  }

  /**
   * Return a value that has been limited between min & max
   */
  private clamp(value: number, min = 0, max = 100): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Return a value that has been re-mapped according to the from/to
   */
  private adjust(
    value: number,
    fromMin: number,
    fromMax: number,
    toMin: number,
    toMax: number
  ): number {
    return this.round(
      toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin)
    );
  }
}
