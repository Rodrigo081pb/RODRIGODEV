import { Component, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('skillsTrack') skillsTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('trackContainer') trackContainer!: ElementRef<HTMLDivElement>;
  
  isMenuOpen = signal(false);
  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  isPaused = false;
  animationId: number | null = null;
  currentTransform = 0;
  animationSpeed = 0.5;
  trackWidth = 0;
  resumeTimeout: any = null;

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.skillsTrack) {
        this.trackWidth = this.skillsTrack.nativeElement.scrollWidth / 2;
        this.startAnimation();
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
  }

  startAnimation() {
    const animate = () => {
      if (!this.isPaused && this.skillsTrack && this.trackWidth > 0) {
        this.currentTransform -= this.animationSpeed;
        
        // Reset loop infinito
        if (Math.abs(this.currentTransform) >= this.trackWidth) {
          this.currentTransform = this.currentTransform % this.trackWidth;
        }
        
        this.skillsTrack.nativeElement.style.transform = `translateX(${this.currentTransform}px)`;
      }
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  onMouseDown(e: MouseEvent) {
    // Prevenir seleção de texto
    e.preventDefault();
    
    this.isDragging = true;
    this.isPaused = true;
    
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
    
    this.startX = e.pageX;
    this.scrollLeft = this.currentTransform;
    
    if (this.trackContainer) {
      this.trackContainer.nativeElement.style.cursor = 'grabbing';
    }
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    
    e.preventDefault();
    
    const x = e.pageX;
    const walk = (x - this.startX) * 1.5;
    this.currentTransform = this.scrollLeft + walk;
    
    // Atualizar posição imediatamente
    if (this.skillsTrack) {
      this.skillsTrack.nativeElement.style.transform = `translateX(${this.currentTransform}px)`;
    }
  }

  onMouseUp() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    
    if (this.trackContainer) {
      this.trackContainer.nativeElement.style.cursor = 'grab';
    }
    
    // Normalizar posição para loop
    if (this.trackWidth > 0) {
      while (this.currentTransform > 0) {
        this.currentTransform -= this.trackWidth;
      }
      while (this.currentTransform < -this.trackWidth) {
        this.currentTransform += this.trackWidth;
      }
    }
    
    // Resume animation após 2 segundos
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
    this.resumeTimeout = setTimeout(() => {
      this.isPaused = false;
    }, 2000);
  }

  onMouseLeave() {
    if (this.isDragging) {
      this.onMouseUp();
    }
  }

  onTouchStart(e: TouchEvent) {
    // Prevenir scroll da página
    if (e.cancelable) {
      e.preventDefault();
    }
    
    this.isDragging = true;
    this.isPaused = true;
    
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
    
    this.startX = e.touches[0].clientX;
    this.scrollLeft = this.currentTransform;
  }

  onTouchMove(e: TouchEvent) {
    if (!this.isDragging) return;
    
    if (e.cancelable) {
      e.preventDefault();
    }
    
    const x = e.touches[0].clientX;
    const walk = (x - this.startX) * 1.5;
    this.currentTransform = this.scrollLeft + walk;
    
    // Atualizar posição imediatamente
    if (this.skillsTrack) {
      this.skillsTrack.nativeElement.style.transform = `translateX(${this.currentTransform}px)`;
    }
  }

  onTouchEnd() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    
    // Normalizar posição para loop
    if (this.trackWidth > 0) {
      while (this.currentTransform > 0) {
        this.currentTransform -= this.trackWidth;
      }
      while (this.currentTransform < -this.trackWidth) {
        this.currentTransform += this.trackWidth;
      }
    }
    
    // Resume animation após 2 segundos
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
    this.resumeTimeout = setTimeout(() => {
      this.isPaused = false;
    }, 2000);
  }

  pauseAnimation() {
    if (!this.isDragging) {
      this.isPaused = true;
    }
  }

  resumeAnimation() {
    if (!this.isDragging) {
      if (this.resumeTimeout) {
        clearTimeout(this.resumeTimeout);
      }
      this.resumeTimeout = setTimeout(() => {
        this.isPaused = false;
      }, 500);
    }
  }
}
