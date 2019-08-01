import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';

export class CustomDateFormatter extends CalendarDateFormatter {
  // you can override any of the methods defined in the parent class

  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    switch (date.getDay()) {
        case 0: {
            return 'Nedelja';
        }
        case 1: {
            return 'Ponedeljak';
        }
        case 2: {
            return 'Utorak';
        }
        case 3: {
            return 'Sreda';
        }
        case 4: {
            return 'Četvrtak';
        }
        case 5: {
            return 'Petak';
        }
        case 6: {
            return 'Subota';
        }
    }
    return new DatePipe(locale).transform(date, 'EEEE', locale);
  }

  weekViewColumnSubHeader({ date: Date }: DateFormatterParams): string {
      return '';
  }

}