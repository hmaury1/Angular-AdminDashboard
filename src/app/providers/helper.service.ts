import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class Helper {
  constructor() { }

  public convertDateToString(d: Date): string {
    const dt = d || null;
    if (d == null) {
      return null;
    }
    const fechaConvert = new Date(dt.toString());
    const _year = fechaConvert.getFullYear();
    const _month = fechaConvert.getMonth() + 1;
    let _monthString;
    if (_month <= 9) {
      _monthString = '0' + _month;
    } else {
      _monthString = _month;
    }
    const _day = fechaConvert.getDate();
    let _dayString;
    if (_day <= 9) {
      _dayString = '0' + _day;
    } else {
      _dayString = _day;
    }
    return _year + '/' + _monthString + '/' + _dayString;
  }

  public convertDateTimeToString(_date): string {
    if (_date != null) {

      const fechaConvert = new Date(_date.toString());
      const _year = fechaConvert.getFullYear();
      const _month = fechaConvert.getMonth() + 1;
      let _monthString;
      let _hourString;
      let _minutesString;
      let _secondString;
      const _seconds = fechaConvert.getSeconds();
      const _minutes = fechaConvert.getMinutes();
      const _hours = fechaConvert.getHours();

      if (_hours <= 9) {
        _hourString = '0' + _hours;
      } else {
        _hourString = _hours;
      }

      if (_minutes <= 9) {
        _minutesString = '0' + _minutes;
      } else {
        _minutesString = _minutes;
      }

      if (_seconds <= 9) {
        _secondString = '0' + _seconds;
      } else {
        _secondString = _seconds;
      }

      const _hour = _hourString + ':' + _minutesString + ':' + _secondString;
      if (_month <= 9) {
        _monthString = '0' + _month;
      } else {
        _monthString = _month;
      }
      const _day = fechaConvert.getDate();
      let _dayString;
      if (_day <= 9) {
        _dayString = '0' + _day;
      } else {
        _dayString = _day;
      }
      return _dayString + '/' + _monthString + '/' + _year + ' ' + _hour.toString();
    } else {
      return null;
    }
  }
}
