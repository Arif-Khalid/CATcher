import { Injectable } from '@angular/core';
import { TableSettings } from '../models/table-settings.model';
@Injectable({
  providedIn: 'root'
})
export class IssueTableSettingsService {
  private _tableSettingsMap = {};

  public getTableSettings(tableName: string) {
    return this._tableSettingsMap[tableName] || new TableSettings();
  }

  public setTableSettings(tableName: string, tableSettings: TableSettings) {
    this._tableSettingsMap[tableName] = tableSettings;
  }

  public clearTableSettings() {
    this._tableSettingsMap = {};
  }
}