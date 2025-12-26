import { inject, Injectable } from '@angular/core';
import { ToastType } from '../utils/enums';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

/**
 * Service to manage the toasts messages
 */
export class ToastMessageService {
  private toastService = inject(ToastrService);
  /**
   * Render a toast message
   */
  renderToast(
    title: string,
    content: string,
    type: ToastType,
    options: object = {
      closeButton: true,
      tapToDismiss: true,
      timeOut: 3000,
    }
  ) {
   const toastMethods = {
    [ToastType.Success]: this.toastService.success,
    [ToastType.Error]: this.toastService.error,
    [ToastType.Warning]: this.toastService.warning,
  };

  const method = toastMethods[type];

  if (method) {
    method.call(this.toastService, content, title, options);
  }
  }
}
