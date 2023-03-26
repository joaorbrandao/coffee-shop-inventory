import { HealthController } from './health.controller';

describe('HealthController Unit Test', () => {
  const controller = new HealthController();

  it('should say it is healthy', () => {
    expect(controller.healthCheck()).toEqual('Service is healthy!');
  });
});
