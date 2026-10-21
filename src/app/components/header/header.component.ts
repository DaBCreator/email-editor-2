import { Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TuiButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 scrollToEditor() {
    const el = document.getElementById('cm-editor-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
