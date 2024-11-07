import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as admin from 'firebase-admin';
import { FcmSimpleEvent } from './events/fcm-simple.event';
import { FcmMetricEvent } from './events/fcm-metric.event';

@Injectable()
export class FcmService {
  constructor() {}

  @OnEvent('fcm.simple', { async: true })
  async sendSimpleNotification(fcmSimpleEvent: FcmSimpleEvent) {
    const { topic, title, body } = fcmSimpleEvent;

    await admin.messaging().send({
      notification: {
        title,
        body,
      },
      topic,
    });
  }

  @OnEvent('fcm.metric', { async: true })
  async sendMetricRealtime(fcmMetricEvent: FcmMetricEvent) {
    const {
      topic,
      temperatureString,
      phString,
      tdoString,
      tdsString,
      turbidityString,
    } = fcmMetricEvent;

    await admin.messaging().send({
      data: {
        temperature: temperatureString,
        ph: phString,
        tdo: tdoString,
        tds: tdsString,
        turbidity: turbidityString,
      },
      topic,
    });
  }
}
