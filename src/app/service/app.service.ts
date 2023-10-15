import { Injectable } from '@angular/core';
import { AppConfig } from './config/app.config.service';
import { PrideController } from './controller/pride.controller.service';
import { environment } from 'src/enviroments/enviroment';
import { ServiceConfigService } from './config/service.config.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private appConfig: AppConfig,
    private prideController: PrideController,
    private serviceConfigService: ServiceConfigService
  ) { }

  public setup(): void {
    this.initAppConfig();

    this.initServiceConfig();
  }

  private initAppConfig(): void {
    const appConfigObj = require('../../../config/app/app-config.js')
    this.appConfig.loadConfig(appConfigObj.appconfig);
  }

  private initServiceConfig(): void {
    let serviceConfig: any;

    if (environment.production) {
      serviceConfig = require('../../../config/app/srv-config.prod').config;
    } else {
      serviceConfig = require('../../../config/app/srv-config.dev').config;
    }
    const dynamicApiUrl = this.getDynamicApiUrl();
    if (dynamicApiUrl) {
      serviceConfig.apiServerUrl = dynamicApiUrl;
    }
    this.serviceConfigService.setServiceConfig(serviceConfig);
  }

  public getDynamicApiUrl(): string {
    let urlPort = window.location.port;
    urlPort = (urlPort && '' !== urlPort.trim()) ? ':' + urlPort : '';
    const dynamicApiUrl = window.location.protocol + '//' + window.location.hostname + urlPort;
    if (dynamicApiUrl && dynamicApiUrl.indexOf('localhost') < 0) {
      return dynamicApiUrl;
    }
    return null as any;
  }
}
